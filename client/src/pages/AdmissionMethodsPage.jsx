import { FileText, Table, List, Info, TrendingUp, Globe } from 'lucide-react';

import imgAnh1 from "../assets/anh1.jpg";
import imgAnh2 from "../assets/anh2.jpg";
import imgAnh3 from "../assets/anh3.jpg";
import imgAnh4 from "../assets/anh4.jpg";
import imgAnh5 from "../assets/anh5.jpg";
import imgAnh6 from "../assets/anh6.jpg";
import imgAnh7 from "../assets/anh7.jpg";

function AdmissionMethodsPage() {
  return (
    <div className="bg-white space-y-12 pb-20">
      <section>
        <div className="flex items-center gap-3 mb-6 border-l-4 border-[#007d75] pl-4">
          <FileText className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-2xl font-black text-[#00558d] uppercase tracking-tighter">
            Phương thức xét tuyển năm 2025
          </h2>
        </div>
        <div className="border-2 border-gray-100 p-2 bg-gray-50">
          <img 
            src={imgAnh1} 
            alt="Tổng quan phương thức xét tuyển 2025" 
            className="w-full h-auto shadow-sm"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6 border-l-4 border-[#007d75] pl-4">
          <List className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-2xl font-black text-[#00558d] uppercase tracking-tighter">
            Quy định chi tiết các đối tượng xét tuyển
          </h2>
        </div>
        <div className="border-2 border-gray-100 p-4 bg-gray-50">
          <img 
            src={imgAnh2} 
            alt="Quy định chi tiết đối tượng xét tuyển" 
            className="w-full h-auto shadow-sm"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6 border-l-4 border-[#007d75] pl-4">
          <Table className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-2xl font-black text-[#00558d] uppercase tracking-tighter">
            Bảng 1: Thông tin xét tuyển Đại học chính quy 2025
          </h2>
        </div>
        <div className="border-2 border-gray-100 p-4 bg-gray-50">
          <img 
            src={imgAnh3} 
            alt="Bảng 1 chi tiết thông tin xét tuyển" 
            className="w-full h-auto shadow-sm"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6 border-l-4 border-[#007d75] pl-4">
          <TrendingUp className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-2xl font-black text-[#00558d] uppercase tracking-tighter">
            Ngưỡng chất lượng đầu vào (Điểm sàn)
          </h2>
        </div>
        <div className="border-2 border-gray-100 p-4 bg-gray-50">
          <img 
            src={imgAnh4} 
            alt="Ngưỡng chất lượng đầu vào 2025" 
            className="w-full h-auto shadow-sm"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6 border-l-4 border-[#007d75] pl-4">
          <Info className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-2xl font-black text-[#00558d] uppercase tracking-tighter">
            Bảng 2, 3 & 4: Quy định điểm cộng ưu tiên
          </h2>
        </div>
        <div className="border-2 border-gray-100 p-4 bg-gray-50">
          <img 
            src={imgAnh5} 
            alt="Quy định điểm cộng ưu tiên" 
            className="w-full h-auto shadow-sm"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6 border-l-4 border-[#007d75] pl-4">
          <Table className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-2xl font-black text-[#00558d] uppercase tracking-tighter">
            Bảng 5: Chỉ tiêu tuyển sinh chi tiết 2025
          </h2>
        </div>
        <div className="border-2 border-gray-100 p-4 bg-gray-50">
          <img 
            src={imgAnh6} 
            alt="Bảng 5 chỉ tiêu tuyển sinh" 
            className="w-full h-auto shadow-sm"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6 border-l-4 border-[#007d75] pl-4">
          <Globe className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-2xl font-black text-[#00558d] uppercase tracking-tighter">
            Chương trình cử nhân liên kết quốc tế 2025
          </h2>
        </div>
        <div className="border-2 border-gray-100 p-4 bg-gray-50">
          <img 
            src={imgAnh7} 
            alt="Tuyển sinh liên kết quốc tế" 
            className="w-full h-auto shadow-sm"
          />
        </div>
      </section>
    </div>
  );
}

export default AdmissionMethodsPage;
