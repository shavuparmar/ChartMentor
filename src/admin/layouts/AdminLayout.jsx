import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, CreditCard, Bell, MessageSquare, Settings, LogOut, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../common/Logo';

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('admin_sidebar_collapsed');
    return saved === 'true';
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('admin_sidebar_collapsed', isCollapsed);
  }, [isCollapsed]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#040816] text-white">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400 font-bold tracking-wider animate-pulse">LOADING ADMIN PORTAL...</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Students', path: '/admin/students', icon: <Users size={20} /> },
    { name: 'Payments', path: '/admin/payments', icon: <CreditCard size={20} /> },
    { name: 'Plans', path: '/admin/plans', icon: <CreditCard size={20} /> },
    { name: 'Channels', path: '/admin/channels', icon: <MessageSquare size={20} /> },
    { name: 'Coupons', path: '/admin/coupons', icon: <CreditCard size={20} /> }, // Maybe change icon later
    { name: 'Notifications', path: '/admin/notifications', icon: <Bell size={20} /> },
    { name: 'Support Tickets', path: '/admin/support', icon: <MessageSquare size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const sidebarContent = (isMobile = false) => (
    <div className="flex flex-col h-full bg-[#080d1a] text-white">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative rounded-xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md">
            <Logo size={32} color="#818cf8" backgroundColor="#0f172a" />
          </div>
          {(!isCollapsed || isMobile) && (
            <div className="flex flex-col items-start leading-none">
              <h1 className="text-sm font-black uppercase tracking-tight text-white">
                CHART<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">MENTOR</span>
              </h1>
              <span className="text-[7px] font-bold uppercase tracking-[0.25em] text-indigo-400">ADMIN</span>
            </div>
          )}
        </Link>
        {isMobile && (
          <button onClick={() => setIsMobileOpen(false)} className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 relative group ${isActive
                  ? 'bg-gradient-to-r from-indigo-600/35 to-purple-600/20 text-white border border-indigo-500/30'
                  : 'text-gray-400 hover:bg-white/[0.03] hover:text-white border border-transparent'
                }`}
            >
              {/* Active glow dot */}
              {isActive && (
                <div className="absolute left-0 w-1 h-5 bg-indigo-500 rounded-r-md" />
              )}
              <div className={isActive ? 'text-indigo-400' : 'text-gray-400 group-hover:text-white transition-colors'}>
                {item.icon}
              </div>
              {(!isCollapsed || isMobile) && (
                <span className="font-semibold text-sm tracking-wide">{item.name}</span>
              )}
              {/* Tooltip for collapsed desktop state */}
              {isCollapsed && !isMobile && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#030712] border border-white/10 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-white/5 bg-[#060a14]">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 p-3 w-full text-left rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all duration-300 group relative`}
        >
          <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
          {(!isCollapsed || isMobile) && (
            <span className="font-semibold text-sm tracking-wide">Logout</span>
          )}
          {isCollapsed && !isMobile && (
            <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#030712] border border-white/10 text-red-400 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#040816] text-white font-sans overflow-hidden">
      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden lg:flex flex-col border-r border-white/5 relative z-30 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
          }`}
      >
        {sidebarContent(false)}
        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-16 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full p-1 border border-white/10 shadow-lg cursor-pointer z-40 transition-transform duration-300"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 bottom-0 left-0 w-72 z-50 lg:hidden shadow-2xl border-r border-white/5"
            >
              {sidebarContent(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header Bar */}
        <header className="flex lg:hidden items-center justify-between p-4 bg-[#080d1a]/80 border-b border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative rounded-xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md">
              <Logo size={28} color="#818cf8" backgroundColor="#0f172a" />
            </div>
            <span className="text-sm font-black uppercase tracking-tight text-white">
              CHART<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">MENTOR</span>
            </span>
          </div>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 text-gray-400 hover:text-white rounded-xl border border-white/10 bg-white/[0.02]"
          >
            <Menu size={22} />
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#040816]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
