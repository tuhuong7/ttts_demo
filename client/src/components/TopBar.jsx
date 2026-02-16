import { Link } from 'react-router-dom';
import { Facebook, Mail, Phone, Globe, User } from 'lucide-react';

function TopBar() {
  return (
    <div className="bg-[#004a99] text-white py-1 text-[11px] font-medium border-b border-blue-800">
      <div className="container mx-auto px-4 flex justify-between items-center h-8">
        <div className="flex items-center space-x-6">
          <Link to="/tin-tuc" className="hover:underline flex items-center gap-1.5">
            Tin tức & Sự kiện
          </Link>
          <span className="text-blue-300">|</span>
          <Link to="/thong-bao" className="hover:underline">
            Thông báo
          </Link>
          <span className="text-blue-300">|</span>
          <Link to="/hoi-dap-faq" className="hover:underline">
            Góc chia sẻ
          </Link>
          <span className="text-blue-300">|</span>
          <Link to="#" className="hover:underline">
            Văn bản - Tài liệu pháp luật
          </Link>
        
         
        </div>
        
      </div>
    </div>
  );
}

export default TopBar;
