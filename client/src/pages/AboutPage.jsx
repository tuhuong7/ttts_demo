import { SharpCard, Breadcrumbs } from '../components/common';
import { GraduationCap, Target, Users, Award, Globe, BookOpen } from 'lucide-react';

function AboutPage() {
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu' },
  ];

  const features = [
    {
      icon: Target,
      title: 'Sứ mệnh',
      description: 'Đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực kinh tế, đáp ứng nhu cầu phát triển của đất nước và hội nhập quốc tế.'
    },
    {
      icon: Globe,
      title: 'Hợp tác quốc tế',
      description: 'Liên kết với các trường đại học hàng đầu thế giới, tạo cơ hội học tập và làm việc tại nước ngoài cho sinh viên.'
    },
    {
      icon: Users,
      title: 'Đội ngũ giảng viên',
      description: 'Giảng viên giàu kinh nghiệm, nhiều tiến sĩ và chuyên gia đầu ngành trong và ngoài nước.'
    },
    {
      icon: Award,
      title: 'Chất lượng đào tạo',
      description: 'Chương trình đào tạo được thiết kế theo chuẩn quốc tế, cập nhật liên tục theo xu hướng phát triển.'
    },
    {
      icon: BookOpen,
      title: 'Cơ sở vật chất',
      description: 'Trang thiết bị hiện đại, thư viện phong phú, phòng thí nghiệm đạt chuẩn quốc tế.'
    },
    {
      icon: GraduationCap,
      title: 'Đầu ra chất lượng',
      description: 'Tỷ lệ sinh viên có việc làm sau tốt nghiệp đạt trên 90%, mức lương khởi điểm cạnh tranh.'
    },
  ];

  return (
    <div className="min-h-screen bg-background-light">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        <div className="bg-primary text-white p-12 mb-8">
          <h1 className="text-5xl font-bold mb-4">Giới thiệu</h1>
          <p className="text-xl text-blue-100">
            Trường Đại học Kinh tế - Đại học Đà Nẵng
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <SharpCard className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Về chúng tôi</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Trường Đại học Kinh tế - Đại học Đà Nẵng (DUE) là một trong những trường đại học hàng đầu 
                  tại miền Trung Việt Nam, chuyên đào tạo các ngành kinh tế, quản trị kinh doanh và các lĩnh vực liên quan.
                </p>
                <p>
                  Với hơn 30 năm xây dựng và phát triển, DUE đã khẳng định vị thế là trung tâm đào tạo nguồn nhân lực 
                  chất lượng cao, đáp ứng nhu cầu phát triển kinh tế - xã hội của khu vực và cả nước.
                </p>
                <p>
                  Trường hiện có hơn 5,000 sinh viên đang theo học tại 45+ chương trình đào tạo từ đại học đến sau đại học, 
                  với đội ngũ giảng viên giàu kinh nghiệm và cơ sở vật chất hiện đại.
                </p>
              </div>
            </SharpCard>

            <SharpCard>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tầm nhìn</h2>
              <p className="text-gray-700 leading-relaxed">
                Trở thành trường đại học kinh tế hàng đầu Việt Nam, có uy tín trong khu vực ASEAN, 
                đào tạo nguồn nhân lực chất lượng cao, góp phần thúc đẩy phát triển kinh tế - xã hội bền vững.
              </p>
            </SharpCard>
          </div>

          <div>
            <SharpCard>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Thông tin liên hệ</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-900">Địa chỉ:</p>
                  <p>71 Ngũ Hành Sơn, Đà Nẵng</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Điện thoại:</p>
                  <p>(0236) 3653 561</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email:</p>
                  <p>tuyensinh@due.edu.vn</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Website:</p>
                  <p>www.due.edu.vn</p>
                </div>
              </div>
            </SharpCard>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-4 border-primary pb-4">
            Điểm nổi bật
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <SharpCard key={index}>
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary p-3">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </SharpCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
