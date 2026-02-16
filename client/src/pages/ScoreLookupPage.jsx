import { Search, History, BarChart2 } from 'lucide-react';
import imgDiem1 from "../assets/diem1.jpg";
import imgDiem2 from "../assets/diem2.jpg";
import imgDiem3 from "../assets/diem3.jpg";

function ScoreLookupPage() {
  return (
    <div className="bg-white space-y-12 pb-20">
      
      <section>
        <div className="flex items-center gap-3 mb-8 border-l-4 border-[#007d75] pl-4">
          <History className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-3xl font-black text-[#00558d] uppercase tracking-tighter">
            Điểm trúng tuyển các năm (2022 - 2024)
          </h2>
        </div>
        <div className="border border-gray-100 p-2 bg-gray-50/50">
          <img 
            src={imgDiem1} 
            alt="Bảng điểm trúng tuyển các năm" 
            className="w-full h-auto shadow-md"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-8 border-l-4 border-[#007d75] pl-4">
          <Search className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-3xl font-black text-[#00558d] uppercase tracking-tighter">
            Điểm chuẩn 2024 - Xét học tập & Năng lực ngoại ngữ
          </h2>
        </div>
        <div className="border border-gray-100 p-2 bg-gray-50/50">
          <img 
            src={imgDiem2} 
            alt="Điểm chuẩn 2024 xét học tập" 
            className="w-full h-auto shadow-md"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-8 border-l-4 border-[#007d75] pl-4">
          <BarChart2 className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-3xl font-black text-[#00558d] uppercase tracking-tighter">
            Điểm chuẩn 2024 - Xét điểm thi ĐGNL ĐHQG TP.HCM
          </h2>
        </div>
        <div className="border border-gray-100 p-2 bg-gray-50/50">
          <img 
            src={imgDiem3} 
            alt="Điểm chuẩn 2024 xét ĐGNL" 
            className="w-full h-auto shadow-md"
          />
        </div>
      </section>
      <div className="p-6 bg-blue-50 border-l-4 border-blue-500 text-blue-800 text-sm">
        <p className="font-bold mb-2">Lưu ý:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Điểm chuẩn trên đây là điểm trúng tuyển chính thức cho các phương thức xét tuyển tương ứng.</li>
          <li>Thí sinh cần kiểm tra kỹ mã ngành và phương thức xét tuyển khi tra cứu.</li>
          <li>Kết quả tra cứu chỉ mang tính chất tham khảo dựa trên dữ liệu công bố của Nhà trường.</li>
        </ul>
      </div>
    </div>
  );
}

export default ScoreLookupPage;
