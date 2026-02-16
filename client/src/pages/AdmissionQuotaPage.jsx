import { FileText, Coins } from 'lucide-react';
import imgX9 from "../assets/X9fIHq.jpg";

import imgX10 from "../assets/Hocphi202502.jpg"; 
function AdmissionQuotaPage() {
  return (
    <div className="bg-white space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-6 border-l-4 border-[#007d75] pl-4">
          <FileText className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-2xl font-black text-[#00558d] uppercase tracking-tighter">
            Chỉ tiêu tuyển sinh Đại học chính quy 2025
          </h2>
        </div>
        <div className="border-2 border-gray-100 p-2 bg-gray-50">
          <img 
            src={imgX9} 
            alt="Bảng chỉ tiêu tuyển sinh 2025" 
            className="w-full h-auto shadow-sm"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6 border-l-4 border-[#007d75] pl-4">
          <Coins className="w-8 h-8 text-[#007d75]" />
          <h2 className="text-2xl font-black text-[#00558d] uppercase tracking-tighter">
            Thông tin Học phí (Dự kiến)
          </h2>
        </div>
        <div className="border-2 border-gray-100 p-4 bg-gray-50">
          <img 
            src={imgX10}
            alt="Thông tin học phí 2025-2029" 
            className="w-full h-auto shadow-sm"
          />
          <div className="mt-4 text-sm text-gray-600 bg-white p-4 border border-gray-100 italic">
            <p>* Ghi chú: Mức thu học phí được xác định dựa trên số tín chỉ học thực tế của sinh viên trong mỗi học kỳ và đơn giá tín chỉ theo thông báo của Nhà trường.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdmissionQuotaPage;
