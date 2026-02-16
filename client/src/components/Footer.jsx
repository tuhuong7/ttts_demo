import { Link } from 'react-router-dom';
import { Facebook, Mail, Phone, MapPin, GraduationCap, ExternalLink } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 border-t-8 border-primary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 border-2 border-white">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-none">ĐH Kinh tế</h3>
                <p className="text-xs text-blue-100">ĐH Đà Nẵng</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Trường Đại học Kinh tế - Đại học Đà Nẵng là cơ sở đào tạo uy tín hàng đầu khu vực miền Trung về kinh tế và quản trị kinh doanh.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary p-3 border border-primary hover:bg-primary-dark transition-colors"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a
                href="mailto:tuyensinh@due.edu.vn"
                className="bg-primary p-3 border border-primary hover:bg-primary-dark transition-colors"
              >
                <Mail className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 border-b-2 border-primary pb-2 uppercase tracking-wider">
              Liên kết nhanh
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Trang chủ' },
                { to: '/nganh-dao-tao', label: 'Danh sách ngành học' },
                { to: '/dang-ky-xet-tuyen', label: 'Nộp hồ sơ trực tuyến' },
                { to: '/du-bao-kha-nang-do', label: 'Dự đoán điểm chuẩn' },
                { to: '/hoi-dap-faq', label: 'Câu hỏi thường gặp' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-2 h-2 bg-primary group-hover:bg-white transition-colors"></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 border-b-2 border-primary pb-2 uppercase tracking-wider">
              Tuyển sinh
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/phuong-thuc-xet-tuyen', label: 'Phương thức xét tuyển' },
                { to: '/tra-cuu-diem-chuan', label: 'Chỉ tiêu tuyển sinh' },
                { to: '/tra-cuu-diem-chuan', label: 'Điểm chuẩn các năm' },
                { to: '/tinh-diem-xet-tuyen', label: 'Tính điểm xét tuyển' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-2 h-2 bg-primary group-hover:bg-white transition-colors"></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://due.edu.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                >
                  <span className="w-2 h-2 bg-primary group-hover:bg-white transition-colors"></span>
                  <span className="flex items-center space-x-1">
                    <span>Website chính thức</span>
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 border-b-2 border-primary pb-2 uppercase tracking-wider">
              Liên hệ
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <div className="bg-primary p-2 border border-primary flex-shrink-0 mt-1">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-white mb-1">Địa chỉ:</p>
                  <p className="text-gray-400">71 Ngũ Hành Sơn, Đà Nẵng</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="bg-green-600 p-2 border border-green-600 flex-shrink-0 mt-1">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-white mb-1">Hotline:</p>
                  <a href="tel:0911223777" className="text-gray-400 hover:text-white transition-colors">
                    0911 223 777
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="bg-yellow-600 p-2 border border-yellow-600 flex-shrink-0 mt-1">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-white mb-1">Email:</p>
                  <a
                    href="mailto:tuyensinh@due.edu.vn"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    tuyensinh@due.edu.vn
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-900 bg-black py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500 font-medium">
              © 2026 Trường Đại học Kinh tế - Đại học Đà Nẵng.
            </p>
            <div className="flex space-x-8 text-sm uppercase tracking-widest font-bold">
              <Link to="/privacy" className="text-gray-500 hover:text-primary transition-colors">
                Bảo mật
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-primary transition-colors">
                Điều khoản
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
