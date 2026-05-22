import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  return context || { socket: null, unreadNotifications: 0, setUnreadNotifications: () => {}, markAsRead: async () => {} };
};

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Fetch initial unread count
  useEffect(() => {
    if (user && user.role === 'student') {
      const fetchNotifications = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/student/notifications`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const unread = res.data.data.filter(n => !n.isRead).length;
          setUnreadNotifications(unread);
        } catch (error) {
          console.error('Failed to fetch initial notifications', error);
        }
      };
      fetchNotifications();
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role === 'student') {
      const newSocket = io(import.meta.env.VITE_API_URL, {
        withCredentials: true
      });

      newSocket.on('connect', () => {
        newSocket.emit('join_student_room', user.id);
      });

      newSocket.on('new_notification', (notification) => {
        toast.custom((t) => (
          <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-[#0a0f1c] border border-blue-500/20 shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}>
            <div className="flex-1 w-0 p-1">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-bold text-white">
                    {notification.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-400 line-clamp-2">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ));
        setUnreadNotifications(prev => prev + 1);
      });

      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [user]);

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/api/student/notifications/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUnreadNotifications(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, unreadNotifications, setUnreadNotifications, markAsRead }}>
      {children}
    </SocketContext.Provider>
  );
};
