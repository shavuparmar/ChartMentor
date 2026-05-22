import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, CheckCircle, Clock, Sparkles, Send, ShieldAlert, Award } from 'lucide-react';
import CheckoutButton from '../../components/CheckoutButton';
import { Skeleton } from '../../common/Loader';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [settings, setSettings] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [dashboardRes, settingsRes, plansRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/student/dashboard`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/student/settings`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/plan`)
        ]);
        
        setData(dashboardRes.data.data);
        setSettings(settingsRes.data.data);
        setPlans(plansRes.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 max-w-6xl">
        <div className="space-y-2">
          <Skeleton className="h-9 w-64 rounded-xl" />
          <Skeleton className="h-4 w-40 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-64 rounded-[2rem]" />
          <Skeleton className="h-64 rounded-[2rem]" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-48 rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-56 rounded-2xl" />
            <Skeleton className="h-56 rounded-2xl" />
            <Skeleton className="h-56 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const isActive = data?.membership?.status === 'ACTIVE';

  const handleJoin = (platform) => {
    if (!isActive) return;
    const link = platform === 'discord' ? settings?.discordLink : settings?.telegramLink;
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      alert(`${platform} link is not configured by the admin yet.`);
    }
  };

  return (
    <div className="space-y-10 max-w-6xl font-sans text-white">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
          Welcome back, <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">{user?.firstName}</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Track your subscription details and community integrations here.
        </p>
      </div>

      {/* Grid Status Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Membership Status Card */}
        <div 
          className={`relative overflow-hidden rounded-[2rem] border transition-all duration-500 backdrop-blur-xl p-8 flex flex-col justify-between min-h-[220px] ${
            isActive 
              ? 'bg-gradient-to-br from-blue-950/40 via-indigo-950/20 to-transparent border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]' 
              : 'bg-white/[0.02] border-white/5 shadow-2xl'
          }`}
        >
          {/* Accent glow top-right */}
          {isActive && (
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          )}

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold tracking-wide uppercase text-gray-400">
                Membership Status
              </h2>
              {isActive ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <CheckCircle className="w-4 h-4" /> Active
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/25">
                  <Clock className="w-4 h-4" /> Inactive
                </div>
              )}
            </div>

            <p className="text-4xl sm:text-5xl font-black tracking-tight mt-2 text-white">
              {isActive ? 'PRO Member' : 'No Active Plan'}
            </p>
          </div>

          <div className="mt-8 border-t border-white/5 pt-5">
            <p className="text-sm text-gray-400 flex items-center gap-2">
              {isActive ? (
                <>
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>Valid until <strong className="text-white font-bold">{new Date(data.membership.endDate).toLocaleDateString()}</strong></span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>Please subscribe to a membership plan below to get access.</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Community Access Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 flex flex-col justify-between min-h-[220px]">
          <div>
            <h2 className="text-lg font-bold tracking-wide uppercase text-gray-400 mb-2">
              Community Access
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Connect to our premium communities for real-time alerts and trading mentoring logs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleJoin('discord')}
              disabled={!isActive}
              className={`w-full py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-[0.1em] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
                isActive 
                  ? 'bg-[#5865F2] hover:bg-[#5865F2]/90 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(88,101,242,0.3)] text-white' 
                  : 'bg-white/[0.02] text-gray-600 border border-white/5 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5A48.65,48.65,0,0,0,29,79.83a75.7,75.7,0,0,0,69.13,0,48.65,48.65,0,0,0,1,6.72,68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.87,48.63,124.08,25.86,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
              </svg>
              Join Discord
            </button>
            <button
              onClick={() => handleJoin('telegram')}
              disabled={!isActive}
              className={`w-full py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-[0.1em] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
                isActive 
                  ? 'bg-[#0088cc] hover:bg-[#0088cc]/90 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,136,204,0.3)] text-white' 
                  : 'bg-white/[0.02] text-gray-600 border border-white/5 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
              Join Telegram
            </button>
          </div>
        </div>
      </div>

      {/* Available Plans Section (shown always or when inactive) */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {isActive ? 'Upgrade or Renew Plan' : 'Explore Membership Plans'}
          </h2>
        </div>

        {plans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map(plan => (
              <div 
                key={plan.id} 
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-6 flex flex-col justify-between gap-6 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500 group"
              >
                {/* Visual Glow */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-blue-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors">
                      {plan.name}
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-gray-400">
                      PRO
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed min-h-[40px]">
                    {plan.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 flex flex-col gap-5 mt-auto">
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-400 text-sm font-semibold">INR</span>
                    <span className="text-3xl font-black text-white">
                      ₹{plan.price}
                    </span>
                  </div>
                  <CheckoutButton amount={plan.price} planId={plan.id} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-10 text-center">
            <ShieldAlert className="w-8 h-8 text-gray-500 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No mentorship plans available right now. Please check back later.</p>
          </div>
        )}
      </div>

    </div>
  );
}
