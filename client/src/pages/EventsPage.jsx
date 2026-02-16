import { useState, useEffect } from 'react';
import { Breadcrumbs, EventCard, SearchBar, LoadingSpinner } from '../components/common';
import { postService } from '../services';

function EventsPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Sự kiện' },
  ];

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await postService.getPublishedPosts({ category: 'event', limit: 20 });
      setEvents(data.data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockEvents = [
    {
      title: 'Ngày hội tư vấn tuyển sinh 2025',
      date: '2025-03-15',
      time: '8:00 - 17:00',
      location: 'Hội trường A, Trường ĐH Kinh tế',
      description: 'Tư vấn trực tiếp về các ngành học, phương thức xét tuyển, học bổng và cơ hội việc làm.',
      type: 'event'
    },
    {
      title: 'Hạn chót nộp hồ sơ xét tuyển sớm',
      date: '2025-03-31',
      time: '23:59',
      location: 'Online',
      description: 'Hạn cuối cùng để nộp hồ sơ xét tuyển sớm đợt 1.',
      type: 'deadline'
    },
    {
      title: 'Hội thảo "Khởi nghiệp trong thời đại số"',
      date: '2025-04-10',
      time: '14:00 - 17:00',
      location: 'Phòng hội thảo B2',
      description: 'Chia sẻ kinh nghiệm từ các doanh nhân thành công và cơ hội kết nối.',
      type: 'event'
    },
    {
      title: 'Công bố điểm chuẩn xét tuyển sớm',
      date: '2025-04-15',
      time: '10:00',
      location: 'Website chính thức',
      description: 'Công bố kết quả và điểm chuẩn xét tuyển sớm đợt 1.',
      type: 'announcement'
    },
  ];

  const displayEvents = events.length > 0 ? events : mockEvents;
  const filteredEvents = displayEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-light">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        {/* Header */}
        <div className="bg-primary text-white p-12 mb-8">
          <h1 className="text-5xl font-bold mb-4">Sự kiện</h1>
          <p className="text-xl text-blue-100">
            Lịch các sự kiện, hội thảo và hoạt động của trường
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Tìm kiếm sự kiện..."
          />
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-200">
            <p className="text-gray-500">Không có sự kiện nào</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                description={event.description}
                type={event.type || 'event'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsPage;
