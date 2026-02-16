import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="relative h-[280px] w-full overflow-hidden mb-8">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://due.udn.vn/Portals/0/Users/banner_tuyensinh.jpg" 
            alt="University Banner" 
            className="w-full h-full object-cover"
            onError={(e) => e.target.src = "https://images.unsplash.com/photo-1541339907198-e08756ebafe1?q=80&w=2000"}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#007d75] via-[#007d75]/80 to-transparent opacity-90"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center max-w-7xl">
          <div className="max-w-2xl">
            <h1 className="text-white font-black text-4xl lg:text-5xl uppercase tracking-tighter leading-tight drop-shadow-md">
              Chương trình cử nhân chính quy
            </h1>
            <p className="mt-4 text-white text-sm lg:text-base font-medium opacity-90 leading-relaxed italic border-l-4 border-yellow-400 pl-4">
              Sinh viên sau khi hoàn thành chương trình đào tạo và có đủ điều kiện tốt nghiệp sẽ được Trường Đại học Kinh tế - Đại học Đà Nẵng xét công nhận tốt nghiệp, cấp văn bằng.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="container mx-auto px-4 flex-grow pb-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Column 1: Sidebar (w-1/4) */}
          <aside className="lg:w-1/4 flex-shrink-0">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>

          {/* Column 2: Main Content (w-3/4) */}
          <main className="lg:w-3/4">
            <div className="bg-white min-h-[600px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default PublicLayout;


