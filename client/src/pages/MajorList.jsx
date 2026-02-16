import { useState, useEffect, useCallback } from 'react';
import { Breadcrumbs, SearchBar, MajorCard, Pagination, LoadingSpinner, FilterSidebar } from '../components/common';
import { majorService, facultyService } from '../services';

function MajorListPage() {
  const [loading, setLoading] = useState(true);
  const [majors, setMajors] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    faculty_id: '',
    tuition_max: 20000000,
  });

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Ngành đào tạo' },
  ];

  useEffect(() => {
    loadFaculties();
  }, []);

  useEffect(() => {
    loadMajors();
  }, [currentPage, searchTerm, filters]);

  const loadFaculties = async () => {
    try {
      const response = await facultyService.getAllFaculties();
      setFaculties(response.data || (Array.isArray(response) ? response : []));
    } catch (error) {
      console.error('Error loading faculties:', error);
    }
  };

  const loadMajors = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 12,
        search: searchTerm,
        faculty_id: filters.faculty_id || undefined,
      };
      const data = await majorService.getAllMajors(params);
      setMajors(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error loading majors:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ faculty_id: '', tuition_max: 20000000 });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const filterConfig = [
    {
      key: 'faculty_id',
      label: 'Khoa',
      type: 'select',
      value: filters.faculty_id,
      options: faculties.map(f => ({ value: f.id.toString(), label: f.name })),
      placeholder: 'Tất cả các khoa'
    },
    {
      key: 'tuition_max',
      label: 'Học phí tối đa',
      type: 'range',
      value: filters.tuition_max,
      min: 5000000,
      max: 20000000,
    },
  ];

  return (
    <div className="min-h-screen bg-background-light">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        {/* Header */}
        <div className="bg-primary text-white p-12 mb-8">
          <h1 className="text-5xl font-bold mb-4">Ngành đào tạo</h1>
          <p className="text-xl text-blue-100">
            Khám phá 45+ chương trình đào tạo chất lượng cao
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Tìm kiếm ngành học..."
          />
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Filter */}
          <div className="md:col-span-1">
            <FilterSidebar
              filters={filterConfig}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearFilters}
            />
          </div>

          {/* Majors Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : majors.length === 0 ? (
              <div className="text-center py-20 bg-white border border-gray-200 p-12">
                <p className="text-gray-500 text-lg">Không tìm thấy ngành học nào</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Tìm thấy <span className="font-bold text-primary">{majors.length}</span> ngành học
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {majors.map((major) => (
                    <MajorCard
                      key={major.id}
                      id={major.id}
                      code={major.code}
                      name={major.name}
                      tuition={major.tuition}
                      quota={major.quota}
                      faculty={major.Faculty?.name}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MajorListPage;
