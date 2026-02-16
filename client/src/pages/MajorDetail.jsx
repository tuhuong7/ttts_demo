import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs, LoadingSpinner } from '../components/common';
import { majorService } from '../services';
import { ArrowLeft, Info } from 'lucide-react';

function MajorDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [major, setMajor] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadMajorData();
  }, [id]);

  const loadMajorData = async () => {
    try {
      setLoading(true);
      const majorData = await majorService.getMajorById(id);
      setMajor(majorData);

      const imagesData = await majorService.getMajorImages(id);
      setImages(imagesData || []);
    } catch (error) {
      console.error('Error loading major detail:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!major) {
    return (
      <div className="min-h-screen bg-background-light">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Không tìm thấy ngành học</h1>
          <Link to="/nganh-dao-tao" className="text-primary hover:text-primary-dark font-semibold">
            ← Quay lại danh sách ngành
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Ngành đào tạo', href: '/nganh-dao-tao' },
    { label: major.name },
  ];

  const API_URL = 'http://localhost:5000';

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs items={breadcrumbs} className="mb-4" />
        
        <Link to="/nganh-dao-tao" className="inline-flex items-center text-[#00558d] hover:text-[#004a99] font-bold text-sm mb-6 uppercase tracking-tighter">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại danh sách
        </Link>

        <div className="mb-8">
            <h1 className="text-3xl font-black text-[#00558d] uppercase tracking-tighter mb-2">{major.name}</h1>
            <div className="flex items-center gap-3">
                <span className="bg-blue-50 text-[#00558d] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest border border-blue-100">
                    Mã ngành: {major.code}
                </span>
                {major.Faculty && (
                    <span className="text-slate-500 text-sm font-medium">| {major.Faculty.name}</span>
                )}
            </div>
        </div>

        <div className="w-full border border-gray-100 shadow-sm overflow-hidden">
          {images.length > 0 ? (
            <div className="w-full flex flex-col gap-0">
              {images.map(img => (
                <img
                  key={img.id}
                  src={`${API_URL}${img.image_url}`}
                  alt={`${major.name} - Thông tin chi tiết`}
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                />
              ))}
            </div>
          ) : (
            <div className="py-32 flex flex-col items-center justify-center text-center bg-gray-50 border-2 border-dashed border-gray-200">
                <Info className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">Thông tin đang được cập nhật</h3>
                <p className="text-gray-400 max-w-md">Chúng tôi đang chuẩn bị nội dung chi tiết cho ngành {major.name}. Quý phụ huynh và học sinh vui lòng quay lại sau.</p>
                <div className="mt-8">
                    <Link 
                        to="/dang-ky-xet-tuyen"
                        className="bg-[#ff8a00] hover:bg-[#e67c00] text-white px-8 py-3 rounded-none font-bold uppercase tracking-tighter transition-colors shadow-md"
                    >
                        Đăng ký tư vấn ngay
                    </Link>
                </div>
            </div>
          )}
        </div>

        <div className="mt-12 p-8 bg-blue-50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h4 className="text-xl font-bold text-[#00558d] mb-1 uppercase tracking-tighter">Bạn cần tư vấn thêm về ngành này?</h4>
                <p className="text-slate-600 text-sm">Để lại thông tin hoặc trò chuyện ngay với trợ lý AI của chúng tôi.</p>
            </div>
            <div className="flex gap-4">
                <Link to="/ai-consultant" className="bg-[#007d75] hover:bg-[#006a64] text-white px-6 py-3 rounded-none font-bold uppercase tracking-tighter transition-colors">
                    Chat với AI Consulting
                </Link>
                <Link to="/dang-ky-xet-tuyen" className="bg-[#004a99] hover:bg-[#003d7c] text-white px-6 py-3 rounded-none font-bold uppercase tracking-tighter transition-colors">
                    Đăng ký xét tuyển
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default MajorDetailPage;
