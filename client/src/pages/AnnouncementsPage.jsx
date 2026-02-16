import { useState, useEffect } from 'react';
import { Breadcrumbs, NewsCard, LoadingSpinner, Badge } from '../components/common';
import { postService } from '../services';
import { Bell } from 'lucide-react';

function AnnouncementsPage() {
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Thông báo' },
  ];

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await postService.getPublishedPosts({ category: 'announcement', limit: 20 });
      setAnnouncements(data.data || []);
    } catch (error) {
      console.error('Error loading announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        <div className="bg-red-600 text-white p-12 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Bell className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Thông báo</h1>
          </div>
          <p className="text-xl text-red-100">
            Các thông báo quan trọng từ nhà trường
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-200">
            <p className="text-gray-500">Chưa có thông báo nào</p>
          </div>
        ) : (
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-white border border-gray-200 p-6 hover:border-red-600 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-600 p-3">
                    <Bell className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge variant="error" size="sm">QUAN TRỌNG</Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(announcement.published_at).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {announcement.title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {announcement.excerpt}
                    </p>
                    <a 
                      href={`/tin-tuc/${announcement.slug || announcement.id}`}
                      className="text-red-600 hover:text-red-700 font-semibold"
                    >
                      Xem chi tiết →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AnnouncementsPage;
