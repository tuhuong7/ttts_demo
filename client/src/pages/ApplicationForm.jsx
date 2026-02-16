import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Breadcrumbs, 
  SharpCard, 
  FlatInput, 
  FlatSelect, 
  FlatTextarea,
  FlatCheckbox,
  PrimaryButton, 
  SecondaryButton,
  InfoAlert,
  ProgressBar,
  LoadingSpinner
} from '../components/common';
import { applicationService, majorService } from '../services';
import { FileText, CheckCircle, User, GraduationCap, Upload } from 'lucide-react';
import { useEffect } from 'react';

function ApplicationForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [majors, setMajors] = useState([]);
  
  const [formData, setFormData] = useState({
    full_name: '',
    date_of_birth: '',
    gender: '',
    id_number: '',
    phone: '',
    email: '',
    address: '',
    
    major_id: '',
    admission_method_id: '1',
    high_school: '',
    graduation_year: new Date().getFullYear().toString(),
    gpa: '',
    
    notes: '',
    agree_terms: false
  });

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Đăng ký xét tuyển' },
  ];

  useEffect(() => {
    loadMajors();
  }, []);

  const loadMajors = async () => {
    try {
      setLoading(true);
      const data = await majorService.getAllMajors({ limit: 100 });
      setMajors(data.data || []);
    } catch (error) {
      console.error('Error loading majors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agree_terms) {
      alert('Vui lòng đồng ý với điều khoản');
      return;
    }

    try {
      setSubmitting(true);
      await applicationService.submitApplication(formData);
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, title: 'Thông tin cá nhân', icon: User },
    { number: 2, title: 'Thông tin học tập', icon: GraduationCap },
    { number: 3, title: 'Xác nhận', icon: CheckCircle },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background-light">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <SharpCard>
              <div className="text-center py-12">
                <div className="bg-green-600 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Nộp hồ sơ thành công!
                </h1>
                <p className="text-gray-600 mb-8">
                  Chúng tôi đã nhận được hồ sơ của bạn. Vui lòng kiểm tra email để xem thông tin chi tiết.
                </p>
                <div className="flex justify-center gap-4">
                  <PrimaryButton onClick={() => navigate('/')}>
                    Về trang chủ
                  </PrimaryButton>
                  <SecondaryButton onClick={() => navigate('/nganh-dao-tao')}>
                    Xem ngành học
                  </SecondaryButton>
                </div>
              </div>
            </SharpCard>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        <div className="bg-primary text-white p-12 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <FileText className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Đăng ký xét tuyển</h1>
          </div>
          <p className="text-xl text-blue-100">
            Điền thông tin để nộp hồ sơ xét tuyển trực tuyến
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;

                return (
                  <div key={step.number} className="flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`
                        w-16 h-16 flex items-center justify-center border-4 mb-2
                        ${isActive ? 'bg-primary border-primary text-white' : ''}
                        ${isCompleted ? 'bg-green-600 border-green-600 text-white' : ''}
                        ${!isActive && !isCompleted ? 'bg-white border-gray-300 text-gray-400' : ''}
                      `}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <span className={`text-sm font-bold text-center ${isActive ? 'text-primary' : 'text-gray-600'}`}>
                        {step.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <ProgressBar value={(currentStep / 3) * 100} color="primary" />
          </div>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <SharpCard title="Bước 1: Thông tin cá nhân">
                <div className="space-y-6">
                  <FlatInput
                    label="Họ và tên"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    required
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FlatInput
                      label="Ngày sinh"
                      name="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      required
                    />

                    <FlatSelect
                      label="Giới tính"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      options={[
                        { value: 'male', label: 'Nam' },
                        { value: 'female', label: 'Nữ' },
                        { value: 'other', label: 'Khác' }
                      ]}
                      placeholder="Chọn giới tính"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FlatInput
                      label="CMND/CCCD"
                      name="id_number"
                      value={formData.id_number}
                      onChange={handleChange}
                      placeholder="001234567890"
                      required
                    />

                    <FlatInput
                      label="Số điện thoại"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0123456789"
                      required
                    />
                  </div>

                  <FlatInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                  />

                  <FlatTextarea
                    label="Địa chỉ"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    rows={3}
                    required
                  />

                  <div className="flex justify-end">
                    <PrimaryButton type="button" onClick={nextStep}>
                      Tiếp theo →
                    </PrimaryButton>
                  </div>
                </div>
              </SharpCard>
            )}

            {currentStep === 2 && (
              <SharpCard title="Bước 2: Thông tin học tập">
                <div className="space-y-6">
                  <FlatSelect
                    label="Ngành đăng ký"
                    name="major_id"
                    value={formData.major_id}
                    onChange={handleChange}
                    options={majors.map(m => ({ value: m.id.toString(), label: `${m.name} (${m.code})` }))}
                    placeholder="Chọn ngành học"
                    required
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FlatInput
                      label="Trường THPT"
                      name="high_school"
                      value={formData.high_school}
                      onChange={handleChange}
                      placeholder="THPT Nguyễn Huệ"
                      required
                    />

                    <FlatInput
                      label="Năm tốt nghiệp"
                      name="graduation_year"
                      type="number"
                      value={formData.graduation_year}
                      onChange={handleChange}
                      min="2000"
                      max={new Date().getFullYear() + 1}
                      required
                    />
                  </div>

                  <FlatInput
                    label="Điểm trung bình"
                    name="gpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={formData.gpa}
                    onChange={handleChange}
                    placeholder="8.50"
                  />

                  <FlatTextarea
                    label="Ghi chú (nếu có)"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Thành tích, chứng chỉ, hoặc thông tin bổ sung..."
                    rows={4}
                  />

                  <div className="flex justify-between">
                    <SecondaryButton type="button" onClick={prevStep}>
                      ← Quay lại
                    </SecondaryButton>
                    <PrimaryButton type="button" onClick={nextStep}>
                      Tiếp theo →
                    </PrimaryButton>
                  </div>
                </div>
              </SharpCard>
            )}

            {currentStep === 3 && (
              <SharpCard title="Bước 3: Xác nhận thông tin">
                <div className="space-y-6">
                  <InfoAlert
                    type="info"
                    message="Vui lòng kiểm tra kỹ thông tin trước khi nộp hồ sơ"
                  />

                  <div className="bg-gray-50 p-6 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Thông tin cá nhân</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Họ tên:</span>
                        <span className="ml-2 font-semibold">{formData.full_name}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Ngày sinh:</span>
                        <span className="ml-2 font-semibold">{formData.date_of_birth}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">CMND/CCCD:</span>
                        <span className="ml-2 font-semibold">{formData.id_number}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Điện thoại:</span>
                        <span className="ml-2 font-semibold">{formData.phone}</span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-gray-600">Email:</span>
                        <span className="ml-2 font-semibold">{formData.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Thông tin học tập</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Ngành:</span>
                        <span className="ml-2 font-semibold">
                          {majors.find(m => m.id.toString() === formData.major_id)?.name || 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Trường THPT:</span>
                        <span className="ml-2 font-semibold">{formData.high_school}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Năm tốt nghiệp:</span>
                        <span className="ml-2 font-semibold">{formData.graduation_year}</span>
                      </div>
                      {formData.gpa && (
                        <div>
                          <span className="text-gray-600">Điểm TB:</span>
                          <span className="ml-2 font-semibold">{formData.gpa}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <FlatCheckbox
                    name="agree_terms"
                    checked={formData.agree_terms}
                    onChange={handleChange}
                    label="Tôi xác nhận rằng tất cả thông tin trên là chính xác và đồng ý với điều khoản của trường"
                  />

                  <div className="flex justify-between">
                    <SecondaryButton type="button" onClick={prevStep}>
                      ← Quay lại
                    </SecondaryButton>
                    <PrimaryButton type="submit" loading={submitting} disabled={!formData.agree_terms}>
                      {submitting ? 'Đang nộp...' : 'Nộp hồ sơ'}
                    </PrimaryButton>
                  </div>
                </div>
              </SharpCard>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplicationForm;
