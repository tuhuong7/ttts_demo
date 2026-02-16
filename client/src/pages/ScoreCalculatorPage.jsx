import { useState } from 'react';
import { Breadcrumbs, SharpCard, PrimaryButton } from '../components/common';
import { Calculator, ChevronDown, Info } from 'lucide-react';

function ScoreCalculatorPage() {
  const [admissionPlan, setAdmissionPlan] = useState('');
  const [resultType, setResultType] = useState('to-hop');
  
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tính kết quả học tập', active: true },
  ];

  const subjects = [
    { id: ' toán', label: 'Toán' },
    { id: 'lý', label: 'Lý' },
    { id: 'hóa', label: 'Hóa' },
    { id: 'sinh', label: 'Sinh' },
    { id: 'văn', label: 'Văn' },
    { id: 'sử', label: 'Sử' },
    { id: 'địa', label: 'Địa' },
    { id: 'n-ngữ', label: 'N.ngữ' },
    { id: 'gdcd', label: 'GDCD' },
  ];

  const renderGradeColumn = (title) => (
    <div className="flex-1 min-w-[120px]">
      <div className="bg-[#e8f5e9] text-[#2e7d32] font-bold text-center py-2 mb-4 border border-[#c8e6c9]">
        {title}
      </div>
      <div className="space-y-2">
        {subjects.map((sub) => (
          <div key={sub.id} className="flex border border-gray-200">
            <span className="w-16 bg-gray-50 text-gray-600 text-xs flex items-center justify-center border-r border-gray-200 font-medium">
              {sub.label}
            </span>
            <input 
              type="number" 
              defaultValue="0.00" 
              className="w-full px-2 py-1 text-sm text-center focus:outline-none focus:bg-blue-50"
              step="0.01"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#00558d] uppercase tracking-tighter mb-6 flex items-center gap-2">
          TÍNH KẾT QUẢ HỌC TẬP CHO CÁC TỔ HỢP XÉT TUYỂN
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          <div className="space-y-4">
            <div className="bg-[#e8f5e9] text-[#2e7d32] font-bold text-center py-2 border border-[#c8e6c9]">
              Phương án nhập điểm
            </div>
            <div className="flex border border-gray-300 overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 border-r border-gray-300 flex items-center font-medium whitespace-nowrap">
                Chọn cách nhập
              </div>
              <select 
                className="w-full px-4 py-2 text-sm focus:outline-none bg-white cursor-pointer"
                value={admissionPlan}
                onChange={(e) => setAdmissionPlan(e.target.value)}
              >
                <option value="">-- Chọn phương án --</option>
                <option value="plan1">Lớp 10, Lớp 11, HK1 lớp 12</option>
                <option value="plan2">Cả năm lớp 12</option>
                <option value="plan3">Học kỳ 1, 2 Lớp 12</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#e8f5e9] text-[#2e7d32] font-bold text-center py-2 border border-[#c8e6c9]">
              Điểm ưu tiên
            </div>
            <p className="text-sm text-gray-700 leading-relaxed italic">
              Thí sinh cộng điểm Khu vực và điểm Ưu tiên theo quy định mới nhất của Bộ Giáo dục & Đào tạo
            </p>
          </div>
        </div>

        {admissionPlan ? (
          <div className="flex flex-col lg:flex-row gap-8 mt-12 animate-in fade-in slide-in-from-top-4 duration-500">
            
            <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
              {admissionPlan === 'plan1' && (
                <>
                  {renderGradeColumn('Lớp 10')}
                  {renderGradeColumn('Lớp 11')}
                  {renderGradeColumn('HK 1 Lớp 12')}
                </>
              )}
              {admissionPlan === 'plan2' && (
                <>
                  {renderGradeColumn('Cả năm lớp 12')}
                </>
              )}
              {admissionPlan === 'plan3' && (
                <>
                  {renderGradeColumn('Điểm TB HK1 lớp 12')}
                  {renderGradeColumn('Điểm TB HK2 lớp 12')}
                </>
              )}
            </div>

            <div className="w-full lg:w-[350px] space-y-4">
              <div className="bg-[#e8f5e9] text-[#2e7d32] font-bold text-center py-2 border border-[#c8e6c9]">
                Kết quả
              </div>
              <div className="flex border border-gray-300 overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 border-r border-gray-300 flex items-center font-medium">
                  Kết quả
                </div>
                <select 
                  className="w-full px-4 py-2 text-sm focus:outline-none bg-white cursor-pointer"
                  value={resultType}
                  onChange={(e) => setResultType(e.target.value)}
                >
                  <option value="to-hop">Tổ hợp</option>
                  <option value="to-hop-priority">Tổ hợp (cộng điểm UT)</option>
                  <option value="mon">Môn</option>
                </select>
              </div>

              <div className="mt-8">
                <PrimaryButton className="w-full py-4 text-lg font-bold">
                  BẮT ĐẦU TÍNH TOÁN
                </PrimaryButton>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-none flex gap-3">
                  <Info className="w-5 h-5 text-blue-500 shrink-0" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Hệ thống sẽ tự động tính toán điểm trung bình dựa trên phương án nhập điểm bạn đã chọn ở trên.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-gray-200 bg-gray-50">
            <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium italic">Vui lòng chọn phương án nhập điểm để bắt đầu</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScoreCalculatorPage;
