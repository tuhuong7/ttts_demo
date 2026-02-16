import { useState } from 'react';
import { Breadcrumbs, SharpCard, SearchBar } from '../components/common';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Câu hỏi thường gặp' },
  ];

  const faqs = [
    {
      category: 'Tuyển sinh',
      questions: [
        {
          q: 'Trường có bao nhiêu phương thức xét tuyển?',
          a: 'Trường có 4 phương thức xét tuyển chính: Xét tuyển theo kết quả thi THPT Quốc gia, xét tuyển học bạ THPT, xét tuyển sớm, và xét tuyển ưu tiên theo quy định.'
        },
        {
          q: 'Điểm chuẩn năm nay là bao nhiêu?',
          a: 'Điểm chuẩn phụ thuộc vào từng ngành và phương thức xét tuyển. Bạn có thể tra cứu điểm chuẩn các năm trước tại trang "Tra cứu điểm chuẩn" để tham khảo.'
        },
        {
          q: 'Làm thế nào để nộp hồ sơ xét tuyển?',
          a: 'Bạn có thể nộp hồ sơ trực tuyến qua website hoặc nộp trực tiếp tại phòng tuyển sinh. Hồ sơ bao gồm: Đơn đăng ký, Học bạ THPT, Giấy khai sinh, và các giấy tờ liên quan.'
        },
      ]
    },
    {
      category: 'Học phí',
      questions: [
        {
          q: 'Học phí một năm là bao nhiêu?',
          a: 'Học phí dao động từ 5-20 triệu đồng/năm tùy theo ngành học. Bạn có thể xem chi tiết học phí của từng ngành tại trang "Ngành đào tạo".'
        },
        {
          q: 'Có chính sách miễn giảm học phí không?',
          a: 'Có. Trường có chính sách miễn giảm học phí cho sinh viên thuộc diện chính sách, sinh viên có hoàn cảnh khó khăn, và sinh viên có thành tích học tập xuất sắc.'
        },
        {
          q: 'Có thể trả học phí theo đợt không?',
          a: 'Có. Sinh viên có thể đóng học phí theo học kỳ (2 đợt/năm) hoặc theo tháng đối với một số trường hợp đặc biệt.'
        },
      ]
    },
    {
      category: 'Học bổng',
      questions: [
        {
          q: 'Trường có những loại học bổng nào?',
          a: 'Trường có học bổng khuyến khích học tập, học bổng tài trợ từ doanh nghiệp, học bổng cho sinh viên nghèo vượt khó, và học bổng quốc tế.'
        },
        {
          q: 'Điều kiện để nhận học bổng là gì?',
          a: 'Tùy loại học bổng, điều kiện bao gồm: Kết quả học tập tốt (GPA >= 3.2), không vi phạm nội quy, tham gia hoạt động tích cực, hoặc thuộc diện chính sách.'
        },
      ]
    },
    {
      category: 'Đời sống sinh viên',
      questions: [
        {
          q: 'Trường có ký túc xá không?',
          a: 'Có. Trường có ký túc xá với đầy đủ tiện nghi, phòng ở 4-6 người, giá từ 300,000-500,000đ/tháng.'
        },
        {
          q: 'Sinh viên có được tham gia các câu lạc bộ không?',
          a: 'Có rất nhiều câu lạc bộ: Câu lạc bộ Tiếng Anh, Kỹ năng mềm, Khởi nghiệp, Thể thao, Nghệ thuật, v.v. Sinh viên được khuyến khích tham gia.'
        },
      ]
    },
  ];

  const filteredFAQs = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      item => 
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  const toggleQuestion = (catIndex, qIndex) => {
    const index = `${catIndex}-${qIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background-light">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        {/* Header */}
        <div className="bg-primary text-white p-12 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <HelpCircle className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Câu hỏi thường gặp</h1>
          </div>
          <p className="text-xl text-blue-100">
            Tìm câu trả lời cho các thắc mắc của bạn
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Tìm kiếm câu hỏi..."
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-8">
          {filteredFAQs.map((category, catIndex) => (
            <SharpCard key={catIndex} title={category.category}>
              <div className="space-y-4">
                {category.questions.map((item, qIndex) => {
                  const index = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex === index;

                  return (
                    <div key={qIndex} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                      <button
                        onClick={() => toggleQuestion(catIndex, qIndex)}
                        className="w-full flex items-start justify-between text-left hover:text-primary transition-colors"
                      >
                        <span className="font-bold text-gray-900 flex-1 pr-4">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="mt-3 text-gray-700 leading-relaxed pl-4 border-l-4 border-primary">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </SharpCard>
          ))}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-20 bg-white border border-gray-200">
              <p className="text-gray-500">Không tìm thấy câu hỏi phù hợp</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <SharpCard className="mt-8 bg-gray-50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Không tìm thấy câu trả lời?
            </h3>
            <p className="text-gray-600 mb-6">
              Liên hệ với chúng tôi để được hỗ trợ trực tiếp
            </p>
            <div className="flex justify-center gap-4">
              <a href="/lien-he" className="px-6 py-3 bg-primary text-white border border-primary font-semibold hover:bg-primary-dark transition-colors">
                Liên hệ ngay
              </a>
              <a href="/ai-consultant" className="px-6 py-3 bg-white text-primary border-2 border-primary font-semibold hover:bg-gray-50 transition-colors">
                Chat với AI
              </a>
            </div>
          </div>
        </SharpCard>
      </div>
    </div>
  );
}

export default FAQPage;
