import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Clock, ChevronRight } from 'lucide-react';
import postService from '../services/postService';

const NewsDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [slug]);

    const loadData = async () => {
        setLoading(true);
        try {
            const postData = await postService.getPostBySlug(slug);
            setPost(postData);

            const categoriesData = await postService.getCategories();
            setCategories(categoriesData);

            if (postData && postData.Category) {
                const relatedData = await postService.getPosts({
                    limit: 3,
                    category_id: postData.Category.id,
                });
                
                const filtered = (relatedData.data || relatedData)
                    .filter(p => p.id !== postData.id)
                    .slice(0, 3);
                    
                setRelatedPosts(filtered);
            }
        } catch (error) {
            console.error('Error loading post:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#004a99] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Không tìm thấy bài viết</h2>
                <Link to="/tin-tuc" className="text-[#004a99] hover:underline">
                    ← Quay lại trang tin tức
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-slate-600 flex items-center flex-wrap gap-2">
                    <Link to="/" className="hover:text-[#004a99]">Trang chủ</Link>
                    <span>›</span>
                    <Link to="/tin-tuc" className="hover:text-[#004a99]">Tin tức & Sự kiện</Link>
                    <span>›</span>
                    <span className="text-slate-900 font-medium truncate max-w-[300px]">{post.title}</span>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* Left Sidebar - Categories (25%) */}
                    <aside className="col-span-12 lg:col-span-3">
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm sticky top-4">
                            <div className="bg-[#004a99] text-white p-4 border-b-4 border-[#003d7a]">
                                <h3 className="font-bold text-lg uppercase tracking-wide">
                                    DANH MỤC
                                </h3>
                            </div>
                            <ul className="bg-white">
                                <li className="border-b border-slate-100 p-0">
                                     <Link to="/tin-tuc" className="block px-4 py-3 hover:bg-slate-50 hover:text-[#004a99] transition">
                                        Tất cả tin tức
                                     </Link>
                                </li>
                                {categories.map(cat => (
                                    <li key={cat.id} className="border-b border-slate-100 last:border-0 p-0">
                                        <Link 
                                            to={`/tin-tuc?category=${cat.slug}`}
                                            className={`block px-4 py-3 hover:bg-slate-50 hover:text-[#004a99] transition ${
                                                post.Category?.slug === cat.slug ? 'text-[#004a99] font-bold bg-slate-50' : ''
                                            }`}
                                        >
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <main className="col-span-12 lg:col-span-9">
                        <article className="bg-white rounded-lg shadow-sm p-6 lg:p-10">
                            {/* Post Header */}
                            <header className="mb-8">
                                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                                    {post.title}
                                </h1>
                                
                                <div className="flex items-center text-slate-500 text-sm gap-4 border-b border-slate-100 pb-6">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {formatDate(post.published_at || post.createdAt)}
                                    </div>
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 mr-1" />
                                        {post.User?.fullName || 'Admin'}
                                    </div>
                                    {post.Category && (
                                        <span className="bg-blue-100 text-[#004a99] px-2 py-0.5 rounded text-xs font-semibold uppercase">
                                            {post.Category.name}
                                        </span>
                                    )}
                                </div>
                            </header>

                            {post.image_url && (
                                <div className="mb-8 rounded-lg overflow-hidden">
                                    <img 
                                        src={post.image_url} 
                                        alt={post.title}
                                        className="w-full object-cover max-h-[500px]" 
                                    />
                                </div>
                            )}

                            <div 
                                className="prose prose-lg max-w-none prose-headings:text-[#004a99] prose-a:text-[#004a99] prose-img:rounded-lg"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </article>

                        {relatedPosts.length > 0 && (
                            <div className="mt-12">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 uppercase border-l-4 border-[#004a99] pl-3">
                                    Tin tức liên quan
                                </h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {relatedPosts.map(relPost => (
                                        <Link 
                                            key={relPost.id} 
                                            to={`/tin-tuc/${relPost.slug}`}
                                            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                                        >
                                            <div className="aspect-video overflow-hidden">
                                                <img 
                                                    src={relPost.image_url || 'https://via.placeholder.com/300x200'} 
                                                    alt={relPost.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <div className="text-xs text-slate-500 mb-2 flex items-center">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {formatDate(relPost.createdAt)}
                                                </div>
                                                <h4 className="font-bold text-slate-900 group-hover:text-[#004a99] transition line-clamp-2 leading-snug">
                                                    {relPost.title}
                                                </h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default NewsDetailPage;
