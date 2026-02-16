import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import { facultyService } from '../services';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [showFacultyDropdown, setShowFacultyDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    fetchFaculties();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFacultyDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await facultyService.getFaculties();
      const facultyList = Array.isArray(response) ? response : (response.data || []);
      setFaculties(facultyList);
    } catch (error) {
      console.error('Error fetching faculties in navbar:', error);
      setFaculties([]); 
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { label: 'CỔNG THÔNG TIN TUYỂN SINH', path: '/' },
    { 
      label: 'GIỚI THIỆU VỀ KHOA', 
      path: '#',
      hasDropdown: true 
    },
    { label: 'DÀNH CHO SINH VIÊN', path: '/#sinh-vien' },
    { label: 'GÓC CHIA SẺ', path: '/tin-tuc' },
    { label: 'GIẢI ĐÁP - TƯ VẤN', path: '/ai-consultant' },
  ];

  return (
    <div className="flex flex-col">
      <div className="bg-white py-4 border-b border-gray-100">
        <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
          <Link to="/" className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[#00558d] font-bold text-lg leading-tight uppercase">ĐẠI HỌC ĐÀ NẴNG</span>
              <span className="text-[#00558d] font-black text-2xl leading-tight uppercase">TRƯỜNG ĐẠI HỌC KINH TẾ</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center">
              <div className="bg-gray-100 p-2 flex items-center border border-gray-200">
                <span className="text-[#ff5c00] font-black text-xl px-2">DDQ</span>
                <div className="h-8 w-[2px] bg-gray-300 mx-2"></div>
                <div className="flex flex-col pr-4">
                   <span className="text-[#00558d] font-bold text-[10px] leading-tight uppercase">MÃ TRƯỜNG</span>
                   <span className="text-[#00558d] font-black text-sm leading-tight uppercase">2025</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#007d75] w-48"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - TEAL (#007d75) */}
      <nav className="bg-[#007d75] sticky top-0 z-40">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center h-14">
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center h-full w-full">
              {menuItems.map((item, idx) => (
                <div
                    key={idx}
                    className="h-full flex items-center relative group"
                    onMouseEnter={() => item.hasDropdown && setShowFacultyDropdown(true)}
                    onMouseLeave={() => item.hasDropdown && setShowFacultyDropdown(false)}
                    ref={item.hasDropdown ? dropdownRef : null}
                >
                    {item.hasDropdown ? (
                        <>
                            <div className={`
                                h-full flex items-center px-6 text-white text-[13px] font-black tracking-tight cursor-pointer
                                hover:bg-[#006660] transition-colors
                                ${showFacultyDropdown ? 'bg-[#006660]' : ''}
                            `}>
                                {item.label}
                                <ChevronDown className="w-3 h-3 ml-1" />
                            </div>
                            
                            {/* Dropdown */}
                            {showFacultyDropdown && (
                                <div className="absolute top-full left-0 mt-0 w-64 bg-white shadow-xl border-t-2 border-[#ff5c00] z-50 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="py-2">
                                        {faculties.length > 0 ? (
                                            faculties.map(faculty => (
                                                <Link
                                                    key={faculty.id}
                                                    to={`/khoa/${faculty.slug}`}
                                                    className="block px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#007d75] transition border-b border-slate-50 last:border-0"
                                                    onClick={() => setShowFacultyDropdown(false)}
                                                >
                                                    {faculty.name}
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="px-4 py-3 text-sm text-slate-500 italic">Đang cập nhật...</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link
                            to={item.path}
                            className={`
                                h-full flex items-center px-6 text-white text-[13px] font-black tracking-tight
                                hover:bg-[#006660] transition-colors relative
                                ${isActive(item.path) ? 'bg-[#006660]' : ''}
                            `}
                        >
                            {item.label}
                            {isActive(item.path) && (
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white"></div>
                            )}
                        </Link>
                    )}
                </div>
              ))}
              
              <div className="ml-auto flex items-center gap-2 h-full">
                <Link 
                  to="/dang-ky-xet-tuyen" 
                  className="bg-yellow-400 text-[#00558d] font-black text-xs px-6 h-full flex items-center hover:bg-yellow-300 transition-colors uppercase"
                >
                  Nộp hồ sơ ngay
                </Link>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex justify-between items-center w-full h-full">
              <span className="text-white font-bold text-sm uppercase">Menu</span>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#007d75] border-t border-[#006660] py-4">
            {menuItems.map((item, idx) => (
                <div key={idx}>
                    {item.hasDropdown ? (
                         <div className="block px-6 py-3 text-white text-sm font-bold border-b border-[#006660]">
                            <div className="mb-2">{item.label}</div>
                            <div className="pl-4 border-l border-white/20">
                                {faculties.map(fac => (
                                    <Link 
                                        key={fac.id}
                                        to={`/khoa/${fac.slug}`}
                                        className="block py-2 text-white/90 hover:text-white text-xs uppercase"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        - {fac.name}
                                    </Link>
                                ))}
                            </div>
                         </div>
                    ) : (
                        <Link
                            to={item.path}
                            className="block px-6 py-3 text-white text-sm font-bold border-b border-[#006660] last:border-0"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
            <Link
              to="/dang-ky-xet-tuyen"
              className="block mx-6 mt-4 p-3 bg-yellow-400 text-[#00558d] text-center font-black text-xs uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Nộp hồ sơ ngay
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
