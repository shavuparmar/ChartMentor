import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, BellRing, Info } from 'lucide-react';
import { Skeleton } from '../../common/Loader';
import { useSocket } from '../../context/SocketContext';

export default function StudentNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const { markAsRead } = useSocket();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/student/notifications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotifications(res.data.data);
        
        // Mark all fetched unread notifications as read
        if (markAsRead) {
          res.data.data.forEach(n => {
            if (!n.isRead) {
              markAsRead(n.notificationId);
            }
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl">
        <Skeleton className="h-10 w-64 rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl font-sans text-white">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
          <BellRing className="w-8 h-8 text-blue-400" />
          Notifications
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Stay updated with the latest community announcements.
        </p>
      </div>
      
      <div className="space-y-4">
        {notifications.map(item => (
          <div key={item.id} className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:border-blue-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] transition-all duration-300 group">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Info className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <h2 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                  {item.notification.title}
                </h2>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg whitespace-nowrap">
                  {new Date(item.notification.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                {item.notification.message}
              </p>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="rounded-[2rem] border border-white/5 bg-white/[0.01] p-16 text-center">
            <Bell className="w-16 h-16 text-gray-600 mx-auto mb-6" />
            <p className="text-lg font-bold tracking-wide text-gray-300">You're all caught up!</p>
            <p className="text-sm text-gray-500 mt-2">No new notifications available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
