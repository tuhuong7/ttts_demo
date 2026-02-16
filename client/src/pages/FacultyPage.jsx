import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Phone, Mail, Globe, Users, BookOpen } from 'lucide-react';
import facultyService from '../services/facultyService';
import api from '../services/api';

const FacultyPage = () => {
    const { slug } = useParams();
    const [faculty, setFaculty] = useState(null);
    const [banner, setBanner] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFacultyData();
    }, [slug]);

    const loadFacultyData = async () => {
        setLoading(true);
        try {
            const facultyData = await facultyService.getFacultyBySlug(slug);
            setFaculty(facultyData);

            if (facultyData) {
                const bannersRes = await api.get(`/banners?faculty_id=${facultyData.id}&position=main_top&is_active=true`);
            
                if (bannersRes.data && bannersRes.data.length > 0) {
                    setBanner(bannersRes.data[0]);
                } else {
                    setBanner(null);
                }

                const postsRes = await api.get(`/posts?faculty_id=${facultyData.id}&limit=5&status=published`);
                setPosts(postsRes.data.data || []);
            }
        } catch (error) {
            console.error('Error loading faculty page:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-[#004a99] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!faculty) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <h1 className="text-2xl font-bold text-slate-800 mb-4">Không tìm thấy thông tin khoa</h1>
                <Link to="/" className="text-[#004a99] hover:underline">Quay về trang chủ</Link>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 relative">
                            <img 
                                src={faculty.logo_url || "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Logo_Truong_Dai_hoc_Kinh_te_-_Dai_hoc_Da_Nang.png/1200px-Logo_Truong_Dai_hoc_Kinh_te_-_Dai_hoc_Da_Nang.png"} 
                                alt="Logo" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trường Đại học Kinh tế</span>
                            <span className="text-xl md:text-2xl font-black text-[#004a99] uppercase leading-none group-hover:text-[#003d7a] transition">
                                {faculty.name}
                            </span>
                        </div>
                    </Link>
                    
                </div>
            </div>

            <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden bg-slate-200 group">
                <img 
                    src={banner?.image_url || 'https://via.placeholder.com/1920x600?text=Faculty+Banner'} 
                    alt={banner?.title || faculty.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="container mx-auto px-4 pb-12">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg animate-in slide-in-from-bottom-4 duration-500">
                            {banner?.title || `Chào mừng đến với ${faculty.name}`}
                        </h1>
                        <p className="text-white/90 text-lg md:text-xl max-w-2xl drop-shadow-md line-clamp-2">
                            {faculty.introduction || 'Nơi đào tạo nguồn nhân lực chất lượng cao, nghiên cứu khoa học và chuyển giao công nghệ uy tín.'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-12 gap-8">
                    
                    <main className="col-span-12 lg:col-span-9 space-y-12">
                        
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-[#004a99] uppercase border-l-4 border-[#004a99] pl-4">
                                    Tin tức - Sự kiện
                                </h2>
                                <Link to={`/tin-tuc?faculty=${faculty.id}`} className="text-sm font-semibold text-slate-500 hover:text-[#004a99] flex items-center">
                                    Xem tất cả <span className="ml-1">→</span>
                                </Link>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {posts.length > 0 ? (
                                    posts.map(post => (
                                        <Link 
                                            key={post.id} 
                                            to={`/tin-tuc/${post.slug}`}
                                            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-slate-100"
                                        >
                                            <div className="aspect-[16/9] overflow-hidden">
                                                <img 
                                                    src={post.image_url || 'https://via.placeholder.com/400x225'} 
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                                />
                                            </div>
                                            <div className="p-5">
                                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                                                </div>
                                                <h3 className="font-bold text-lg text-slate-800 group-hover:text-[#004a99] line-clamp-2 mb-2 transition">
                                                    {post.title}
                                                </h3>
                                                <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                                                    {post.excerpt}
                                                </p>
                                                <span className="text-[#004a99] text-sm font-semibold group-hover:underline">Đọc tiếp</span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-2 text-center py-10 bg-white rounded-lg border border-dashed border-slate-300">
                                        <p className="text-slate-500">Chưa có tin tức nào được cập nhật.</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#004a99] uppercase border-l-4 border-[#004a99] pl-4 mb-8">
                                Hình ảnh hoạt động
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map(idx => (
                                    <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-slate-200 cursor-pointer hover:opacity-90 transition">
                                        <img 
                                            src={`https://source.unsplash.com/random/400x400?education,student&sig=${idx}`} 
                                            alt="Activity" 
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/400'}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>
                    <aside className="col-span-12 lg:col-span-3 space-y-6">
                        
                        <div className="bg-[#004a99] rounded-xl overflow-hidden shadow-lg p-6 text-white space-y-4">
                            <h3 className="font-bold text-lg border-b border-white/20 pb-2 mb-2">DANH MỤC</h3>
                            <Link to="#" className="flex items-center gap-3 hover:translate-x-1 transition p-2 rounded hover:bg-white/10">
                                <div className="p-2 bg-white/20 rounded-full"><BookOpen className="w-5 h-5" /></div>
                                <span className="font-semibold">Chương trình đào tạo</span>
                            </Link>
                            <Link to="#" className="flex items-center gap-3 hover:translate-x-1 transition p-2 rounded hover:bg-white/10">
                                <div className="p-2 bg-white/20 rounded-full"><Users className="w-5 h-5" /></div>
                                <span className="font-semibold">Đội ngũ giảng viên</span>
                            </Link>
                            <Link to="#" className="flex items-center gap-3 hover:translate-x-1 transition p-2 rounded hover:bg-white/10">
                                <div className="p-2 bg-white/20 rounded-full"><Globe className="w-5 h-5" /></div>
                                <span className="font-semibold">Nghiên cứu khoa học</span>
                            </Link>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6 border border-slate-100">
                             <h3 className="font-bold text-[#004a99] uppercase mb-4 border-b pb-2">Liên hệ</h3>
                             <div className="space-y-3 text-sm text-slate-600">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-[#004a99] mt-1 shrink-0" />
                                    <span>Tầng 3, Khu nhà hiệu bộ, 71 Ngũ Hành Sơn, Đà Nẵng</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-[#004a99] shrink-0" />
                                    <span>0236 3950 111</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-[#004a99] shrink-0" />
                                    <span>{faculty.code?.toLowerCase()}@due.edu.vn</span>
                                </div>
                             </div>
                        </div>

                        <div className="rounded-xl overflow-hidden shadow-sm">
                            <img src="https://via.placeholder.com/300x400?text=Ad+Banner" alt="Advertisement" className="w-full h-auto" />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default FacultyPage;
