import { useState } from 'react';
import { SharpCard, Breadcrumbs, FlatInput, FlatTextarea, PrimaryButton, InfoAlert } from '../components/common';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Liên hệ' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Địa chỉ',
      content: '71 Ngũ Hành Sơn, Đà Nẵng, Việt Nam'
    },
    {
      icon: Phone,
      title: 'Điện thoại',
      content: '(0236) 3653 561'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'tuyensinh@due.edu.vn'
    },
    {
      icon: Clock,
      title: 'Giờ làm việc',
      content: 'Thứ 2 - Thứ 6: 7:30 - 17:00\nThứ 7: 7:30 - 11:30'
    },
  ];

  return (
    <div className="min-h-screen bg-background-light">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        <div className="bg-primary text-white p-12 mb-8">
          <h1 className="text-5xl font-bold mb-4">Liên hệ</h1>
          <p className="text-xl text-blue-100">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2">
            <SharpCard title="Gửi tin nhắn cho chúng tôi">
              {submitted && (
                <InfoAlert
                  type="success"
                  title="Gửi thành công!"
                  message="Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất có thể."
                  className="mb-6"
                />
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FlatInput
                    label="Họ và tên"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    required
                  />
                  <FlatInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FlatInput
                    label="Số điện thoại"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0123456789"
                  />
                  <FlatInput
                    label="Tiêu đề"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Tư vấn tuyển sinh"
                    required
                  />
                </div>

                <FlatTextarea
                  label="Nội dung"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                  rows={6}
                  required
                />

                <PrimaryButton type="submit" className="w-full md:w-auto px-8">
                  Gửi tin nhắn
                </PrimaryButton>
              </form>
            </SharpCard>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <SharpCard key={index}>
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary p-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{info.content}</p>
                    </div>
                  </div>
                </SharpCard>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <SharpCard title="Bản đồ">
            <div className="bg-gray-200 h-96 flex items-center justify-center border border-gray-300">
              <p className="text-gray-500">Google Maps Integration</p>
            </div>
          </SharpCard>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
