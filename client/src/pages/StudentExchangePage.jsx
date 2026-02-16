import { Share2, School, GraduationCap, ClipboardList, Info } from 'lucide-react';
import imgSongngu1 from "../assets/songngu1.jpg";
import imgSongngu2 from "../assets/songngu2.jpg";
import imgSongngu3 from "../assets/songngu3.jpg";
import imgSongngu4 from "../assets/songngu4.jpg";
import imgSongngu5 from "../assets/songngu5.jpg";

function StudentExchangePage() {
  return (
    <div className="bg-white space-y-12 pb-20">
      <section>
        <div className="flex items-center gap-3 mb-8 border-l-4 border-[#ff8a00] pl-4">
          <School className="w-8 h-8 text-[#ff8a00]" />
          <h2 className="text-3xl font-black text-[#00558d] uppercase tracking-tighter">
            Giới thiệu các trường đối tác liên kết
          </h2>
        </div>
        <div className="space-y-6">
          <div className="border border-gray-100 p-2 bg-gray-50/50">
            <img 
              src={imgSongngu1} 
              alt="Đối tác: George Mason, Coventry, Hull" 
              className="w-full h-auto shadow-md"
            />
          </div>
          <div className="border border-gray-100 p-2 bg-gray-50/50">
            <img 
              src={imgSongngu2} 
              alt="Đối tác: Monash, Lincoln, Ball State, Seattle" 
              className="w-full h-auto shadow-md"
            />
          </div>
          <div className="border border-gray-100 p-2 bg-gray-50/50">
            <img 
              src={imgSongngu3} 
              alt="Đối tác: Nottingham Trent, Swinburne, Illinois" 
              className="w-full h-auto shadow-md"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-8 border-l-4 border-[#ff8a00] pl-4">
          <Share2 className="w-8 h-8 text-[#ff8a00]" />
          <h2 className="text-3xl font-black text-[#00558d] uppercase tracking-tighter">
            Các trường đối tác chấp nhận chuyển tiếp
          </h2>
        </div>
        <div className="border border-gray-100 p-2 bg-gray-50/50">
          <img 
            src={imgSongngu4} 
            alt="Bảng tổng hợp các ngành và trường chuyển tiếp" 
            className="w-full h-auto shadow-md"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-8 border-l-4 border-[#ff8a00] pl-4">
          <ClipboardList className="w-8 h-8 text-[#ff8a00]" />
          <h2 className="text-3xl font-black text-[#00558d] uppercase tracking-tighter">
            Điều kiện chuyển tiếp đến các trường đối tác
          </h2>
        </div>
        <div className="border border-gray-100 p-2 bg-gray-50/50">
          <img 
            src={imgSongngu5} 
            alt="Điều kiện GPA, Tiếng Anh, Học phí và Học bổng" 
            className="w-full h-auto shadow-md"
          />
        </div>
      </section>

      <div className="p-6 bg-orange-50 border-l-4 border-[#ff8a00] flex gap-4">
        <Info className="w-6 h-6 text-[#ff8a00] shrink-0" />
        <div>
          <p className="font-bold text-[#ff8a00] mb-1">Lưu ý quan trọng:</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Chương trình trao đổi và chuyển tiếp sinh viên được cập nhật hàng năm theo thỏa thuận hợp tác giữa Trường Đại học Kinh tế - ĐHĐN và các đối tác quốc tế. Sinh viên cần liên kết với Trung tâm Đào tạo Quốc tế (CIE) để được hỗ trợ hồ sơ chi tiết.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentExchangePage;
