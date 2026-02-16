import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import Pagination from '../components/common/Pagination';
import api from '../services/api';

const NewsListPage = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const selectedCategory = searchParams.get('category');

    useEffect(() => {
        loadData();
    }, [currentPage, selectedCategory]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [postsRes, categoriesRes] = await Promise.all([
                api.get(`/posts?page=${currentPage}&limit=10${selectedCategory ? `&category_slug=${selectedCategory}` : ''}`),
                api.get('/categories')
            ]);
            
            setPosts(postsRes.data.data || postsRes.data || []);
            setTotalPages(postsRes.data.totalPages || 1);
            setCategories(categoriesRes.data || []);
        } catch (error) {
            console.error('Error loading news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (slug) => {
        setCurrentPage(1);
        if (slug) {
            setSearchParams({ category: slug });
        } else {
            setSearchParams({});
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div className="bg-slate-50 py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-slate-600">
                    <Link to="/" className="hover:text-[#004a99]">Trang chủ</Link>
                    <span className="mx-2">›</span>
                    <span className="text-slate-900 font-medium">Tin tức & Sự kiện</span>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <aside className="col-span-12 lg:col-span-3">
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm sticky top-4">
                            
                            <div className="bg-[#004a99] text-white p-4 border-b-4 border-[#003d7a]">
                                <h3 className="font-bold text-lg uppercase tracking-wide">
                                    TIN TỨC - SỰ KIỆN
                                </h3>
                            </div>

                            <ul className="bg-slate-50">
                                <li
                                    onClick={() => handleCategoryClick(null)}
                                    className={`px-4 py-3 border-b border-slate-200 cursor-pointer transition ${
                                        !selectedCategory
                                            ? 'bg-[#004a99] text-white font-bold'
                                            : 'hover:bg-[#004a99] hover:text-white'
                                    }`}
                                >
                                    Tất cả tin tức
                                </li>
                                {categories.map(category => (
                                    <li
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.slug)}
                                        className={`px-4 py-3 border-b border-slate-200 cursor-pointer transition ${
                                            selectedCategory === category.slug
                                                ? 'bg-[#004a99] text-white font-bold'
                                                : 'hover:bg-[#004a99] hover:text-white'
                                        }`}
                                    >
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <main className="col-span-12 lg:col-span-9">
                        
                        <div className="mb-6">
                            <h1 className="text-3xl font-black text-[#004a99] uppercase flex items-center">
                                <span className="w-2 h-8 bg-[#004a99] mr-3"></span>
                                TIN TỨC & SỰ KIỆN
                            </h1>
                        </div>

                        {/* Posts List */}
                        {loading ? (
                            <div className="text-center py-20">
                                <div className="w-12 h-12 border-4 border-[#004a99] border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="mt-4 text-slate-600">Đang tải...</p>
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="bg-white rounded-lg p-12 text-center">
                                <p className="text-slate-500 text-lg">Chưa có bài viết nào</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {posts.map(post => (
                                    <Link
                                        key={post.id}
                                        to={`/tin-tuc/${post.slug}`}
                                        className="flex gap-6 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group"
                                    >
                                        {/* Post Image */}
                                        <div className="w-48 h-36 flex-shrink-0 overflow-hidden">
                                            <img
                                                src={post.image_url || 'https://via.placeholder.com/200x150'}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                        </div>

                                        {/* Post Content */}
                                        <div className="flex-1 py-4 pr-4">
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#004a99] transition mb-2 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            
                                            <div className="flex items-center text-sm text-slate-500 mb-3">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>{formatDate(post.createdAt)}</span>
                                            </div>

                                            <p className="text-slate-600 line-clamp-2 mb-3">
                                                {post.excerpt || post.content?.substring(0, 150) + '...'}
                                            </p>

                                            <span className="text-[#004a99] font-medium text-sm group-hover:underline">
                                                Đọc thêm →
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default NewsListPage;
