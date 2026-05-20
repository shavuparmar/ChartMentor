import React from 'react';
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Receipt, Bell, MessageSquare, LogOut, Settings } from 'lucide-react';

export default function StudentLayout() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-black text-white">Loading...</div>;
  if (!user || user.role !== 'student') return <Navigate to="/login" />;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Invoices', path: '/student/invoices', icon: <Receipt size={20} /> },
    { name: 'Notifications', path: '/student/notifications', icon: <Bell size={20} /> },
    { name: 'Support', path: '/student/support', icon: <MessageSquare size={20} /> },
    { name: 'Settings', path: '/student/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-white text-black font-sans">
      <aside className="w-64 border-r border-black flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-black">
            <h1 className="text-2xl font-bold tracking-tighter">ChartMentor</h1>
          </div>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-3 p-3 hover:bg-black hover:text-white transition-colors duration-200 border border-transparent hover:border-black"
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-black">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 w-full text-left hover:bg-black hover:text-white transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  );
}
