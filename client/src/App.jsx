import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MajorList from './pages/MajorList';
import MajorDetail from './pages/MajorDetail';
import NewsListPage from './pages/NewsListPage';
import NewsDetailPage from './pages/NewsDetailPage';
import EventsPage from './pages/EventsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import AdmissionMethodsPage from './pages/AdmissionMethodsPage';
import ScoreLookupPage from './pages/ScoreLookupPage';
import ScoreCalculatorPage from './pages/ScoreCalculatorPage';
import FAQPage from './pages/FAQPage';
import ApplicationForm from './pages/ApplicationForm';
import AIConsultantPage from './pages/AIConsultantPage';
import AdmissionQuotaPage from './pages/AdmissionQuotaPage';
import InternationalLinkagePage from './pages/InternationalLinkagePage';
import StudentExchangePage from './pages/StudentExchangePage';
import Login from './pages/Login';

import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminApplicationList from './pages/AdminApplicationList';
import AdminMajorList from './pages/AdminMajorList';
import AdminMajorDetail from './pages/AdminMajorDetail';
import RegisterAdmin from './pages/RegisterAdmin';
import AdminNews from './pages/AdminNews';
import AdminEvents from './pages/AdminEvents';
import AdminBanners from './pages/AdminBanners';
import AdminSpecializations from './pages/AdminSpecializations';
import AdminFaculties from './pages/AdminFaculties';
import AdminChatData from './pages/AdminChatData';
import AdminChatDataManager from './pages/AdminChatDataManager';
import AdminUsers from './pages/AdminUsers';
import AdminSettings from './pages/AdminSettings';
import MaintenancePage from './pages/MaintenancePage';
import FacultyPage from './pages/FacultyPage';
import BaseLayout from './layouts/BaseLayout';

import ChatWidget from './components/ChatWidget';
import { ConfigProvider, useConfig } from './contexts/ConfigContext';
import AdmissionPredictor from './components/AdmissionPredictor';
import { AuthProvider } from './context/AuthContext';

function PredictPage() {
  return (
    <div className="bg-white py-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-[#00558d] uppercase tracking-tighter">Dự đoán điểm chuẩn</h1>
        <p className="text-lg text-gray-500 font-medium">Sử dụng AI để dự đoán khả năng trúng tuyển</p>
      </div>
      <AdmissionPredictor />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/tin-tuc" element={<NewsListPage />} />
            <Route path="/tin-tuc/:slug" element={<NewsDetailPage />} />
            <Route path="/khoa/:slug" element={<FacultyPage />} />
            <Route path="/su-kien" element={<EventsPage />} />
            <Route path="/thong-bao" element={<AnnouncementsPage />} />

            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/gioi-thieu" element={<AboutPage />} />
              <Route path="/lien-he" element={<ContactPage />} />
              
              <Route path="/nganh-dao-tao" element={<MajorList />} />
              <Route path="/nganh-dao-tao/:id" element={<MajorDetail />} />
              <Route path="/phuong-thuc-xet-tuyen" element={<AdmissionMethodsPage />} />
              <Route path="/phuong-thuc" element={<AdmissionMethodsPage />} />
              <Route path="/tra-cuu-diem-chuan" element={<ScoreLookupPage />} />
              <Route path="/tinh-diem-xet-tuyen" element={<ScoreCalculatorPage />} />
              <Route path="/chi-tieu-tuyen-sinh" element={<AdmissionQuotaPage />} />
              <Route path="/chi-tieu" element={<AdmissionQuotaPage />} /> 
              <Route path="/lien-ket-quoc-te" element={<InternationalLinkagePage />} />
              <Route path="/trao-doi-sinh-vien" element={<StudentExchangePage />} />
              <Route path="/hoc-bong-chinh-sach" element={<div className="p-8">Học bổng và chế độ chính sách (Đang cập nhật)</div>} />
              
              <Route path="/dang-ky-xet-tuyen" element={<ApplicationForm />} />
              <Route path="/du-bao-kha-nang-do" element={<PredictPage />} />
              <Route path="/hoi-dap-faq" element={<FAQPage />} />
              <Route path="/tu-van-truc-tuyen" element={<AIConsultantPage />} />
              
              <Route path="/majors" element={<MajorList />} />
              <Route path="/applications" element={<ApplicationForm />} />
              <Route path="/predict" element={<PredictPage />} />

              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/register" element={<RegisterAdmin />} />
            </Route>
          </Route>

          <Route path="/ai-consultant" element={<AIConsultantPage />} />
          <Route path="/tu-van-truc-tuyen" element={<AIConsultantPage />} />

          <Route path="/admin/*" element={
            <AuthProvider>
              <Routes>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="applications" element={<AdminApplicationList />} />
                  <Route path="majors" element={<AdminMajorList />} />
                  <Route path="majors/:id" element={<AdminMajorDetail />} />
                  <Route path="specializations" element={<AdminSpecializations />} />
                  <Route path="faculties" element={<AdminFaculties />} />
                  <Route path="news" element={<AdminNews />} />
                  <Route path="events" element={<AdminEvents />} />
                  <Route path="banners" element={<AdminBanners />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="chat-data" element={<AdminChatDataManager />} />
<Route path="chat-data/new" element={<AdminChatData />} />
<Route path="chat-data/edit/:id" element={<AdminChatData />} />
                </Route>
              </Routes>
            </AuthProvider>
          } />
        </Routes>
        
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
