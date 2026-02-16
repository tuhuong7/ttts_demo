import { Globe, Users, FileText, Award } from 'lucide-react';
import imgQuocte1 from "../assets/quocte1.jpg";
import imgQuocte2 from "../assets/quocte2.jpg";
import imgQuocte3 from "../assets/quocte3.jpg";
import imgQuocte4 from "../assets/quocte4.jpg";

function InternationalLinkagePage() {
  return (
    <div className="bg-white space-y-12 pb-20">
      <section>
        <div className="flex items-center gap-3 mb-8 border-l-4 border-[#007d75] pl-4">
          <Globe className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-3xl font-black text-[#00558d] uppercase tracking-tighter">
            Chương trình cử nhân liên kết quốc tế 2025
          </h2>
        </div>
        <div className="border border-gray-100 p-2 bg-gray-50/50">
          <img 
            src={imgQuocte1} 
            alt="Tuyển sinh liên kết quốc tế 2025" 
            className="w-full h-auto shadow-md"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-8 border-l-4 border-[#007d75] pl-4">
          <Users className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-3xl font-black text-[#00558d] uppercase tracking-tighter">
            Điều kiện dự tuyển chương trình liên kết
          </h2>
        </div>
        <div className="border border-gray-100 p-2 bg-gray-50/50">
          <img 
            src={imgQuocte2} 
            alt="Điều kiện dự tuyển" 
            className="w-full h-auto shadow-md"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-8 border-l-4 border-[#007d75] pl-4">
          <FileText className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-3xl font-black text-[#00558d] uppercase tracking-tighter">
            Phương thức tuyển sinh liên kết quốc tế
          </h2>
        </div>
        <div className="border border-gray-100 p-2 bg-gray-50/50">
          <img 
            src={imgQuocte3} 
            alt="Phương thức tuyển sinh" 
            className="w-full h-auto shadow-md"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-8 border-l-4 border-[#007d75] pl-4">
          <Award className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-3xl font-black text-[#00558d] uppercase tracking-tighter">
            Quy định điểm cộng ưu tiên (IELTS, VSTEP, TOEIC)
          </h2>
        </div>
        <div className="border border-gray-100 p-2 bg-gray-50/50">
          <img 
            src={imgQuocte4} 
            alt="Điểm cộng ưu tiên chứng chỉ tiếng Anh" 
            className="w-full h-auto shadow-md"
          />
        </div>
      </section>

      <div className="bg-[#f0f9ff] p-8 border-2 border-[#1877f2]/20">
        <h3 className="text-xl font-bold text-[#1877f2] mb-4 flex items-center gap-2">
          THÔNG TIN LIÊN HỆ TƯ VẤN
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div className="space-y-2">
            <p><strong>Địa chỉ:</strong> Phòng E203, Tòa nhà E, 71 Ngũ Hành Sơn, TP. Đà Nẵng</p>
            <p><strong>Hotline:</strong> 02363 952 904 - 0916 820 577</p>
          </div>
          <div className="space-y-2">
            <p><strong>Email:</strong> cie.tuyensinh@due.edu.vn</p>
            <p><strong>Facebook:</strong> facebook.com/cie.dn</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InternationalLinkagePage;
