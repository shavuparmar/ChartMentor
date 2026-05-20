import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/student/notifications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotifications(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  if (loading) return <div>Loading notifications...</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
      
      <div className="space-y-4">
        {notifications.map(item => (
          <div key={item.id} className="p-6 bg-white border border-black hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold">{item.notification.title}</h2>
              <span className="text-xs text-gray-500">{new Date(item.notification.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700">{item.notification.message}</p>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300">
            No notifications available.
          </div>
        )}
      </div>
    </div>
  );
}
