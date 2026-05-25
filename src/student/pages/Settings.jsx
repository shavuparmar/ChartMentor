import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, ShieldCheck, KeyRound, CreditCard, Send, Calendar, Clock, DownloadCloud } from 'lucide-react';
import { Skeleton } from '../../common/Loader';

export default function StudentSettings() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [profile, setProfile] = useState(null);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const [profileRes, channelsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/student/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/channel/my-channels`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setProfile(profileRes.data.data);
        setChannels(channelsRes.data.data || []);
      } catch (error) {
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords don't match");
    }
    
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/change-password`, {
        currentPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="space-y-8 max-w-6xl font-sans text-white">
        <Skeleton className="h-10 w-64 rounded-xl" />
        <Skeleton className="h-96 w-full rounded-[2rem]" />
      </div>
    );
  }

  const membership = profile.membership;
  const currentPlan = profile.currentPlan;
  const isActive = membership?.status === 'ACTIVE';

  return (
    <div className="space-y-8 max-w-6xl font-sans text-white">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
          <User className="w-8 h-8 text-blue-400" />
          My Profile
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Manage your personal information, membership status, and security.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Personal Info & Membership Summary */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Identity Card */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-xl p-8 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
            
            <div className="flex flex-col items-center text-center">
              {/* Note: Removed avatar as requested */}
              <h2 className="text-2xl font-black tracking-tight text-white mb-1">
                {profile.firstName} {profile.lastName}
              </h2>
              <div className="inline-flex items-center gap-1.5 text-gray-400 text-sm mb-6 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/5">
                <Mail className="w-4 h-4" />
                {profile.email}
              </div>
              
              <div className="w-full pt-6 border-t border-white/5 flex flex-col gap-3 text-sm">
                <div className="flex justify-between items-center text-gray-400">
                  <span>Joined Date</span>
                  <span className="text-white font-medium">{new Date(profile.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Role</span>
                  <span className="text-white font-medium uppercase text-xs tracking-wider bg-white/10 px-2 py-0.5 rounded">{profile.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Membership Status Card */}
          <div className={`relative overflow-hidden rounded-[2rem] border transition-all duration-500 backdrop-blur-xl p-8 flex flex-col justify-between ${
              isActive 
                ? 'bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-transparent border-indigo-500/20 shadow-[0_0_50px_rgba(99,102,241,0.1)]' 
                : 'bg-white/[0.02] border-white/5 shadow-2xl'
            }`}
          >
            {isActive && (
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />
            )}
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${isActive ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-white">Membership</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {membership?.status || 'INACTIVE'}
                  </span>
                </div>
              </div>
              
              {isActive ? (
                <div className="space-y-4 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Active Plan</span>
                    <span className="text-white font-bold">{currentPlan?.name || 'Lifetime Plan'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expires On</span>
                    <span className="text-white font-bold">{membership?.endDate ? new Date(membership.endDate).toLocaleDateString() : 'Never (Lifetime)'}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400">You currently do not have an active membership. Head to the dashboard to subscribe.</p>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Security & Password */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">Security Settings</h2>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Change your password</p>
              </div>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-5 max-w-lg">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Current Password</label>
                <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-2xl px-4 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <Lock className="text-gray-500 w-4 h-4 flex-shrink-0" />
                  <input 
                    type="password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-transparent outline-none px-3 py-3.5 text-white text-sm placeholder:text-gray-600"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">New Password</label>
                <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-2xl px-4 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <Lock className="text-gray-500 w-4 h-4 flex-shrink-0" />
                  <input 
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-transparent outline-none px-3 py-3.5 text-white text-sm placeholder:text-gray-600"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Confirm New Password</label>
                <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-2xl px-4 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <Lock className="text-gray-500 w-4 h-4 flex-shrink-0" />
                  <input 
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-transparent outline-none px-3 py-3.5 text-white text-sm placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3.5 rounded-xl bg-white text-black hover:bg-gray-200 font-bold text-sm uppercase tracking-wide hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  {submitting ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>

          {/* Accessible Channels */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">Accessible Channels</h2>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Included in your plan</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {channels.length > 0 ? channels.map(channel => (
                <div key={channel.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-1 text-sm">
                  <span className="font-bold text-white">{channel.name}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">{channel.type}</span>
                </div>
              )) : (
                <div className="col-span-1 sm:col-span-2 text-sm text-gray-500 py-4 border border-white/5 rounded-xl bg-white/[0.01] px-4">
                  No channels available currently.
                </div>
              )}
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">Payment History</h2>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Recent transactions</p>
              </div>
            </div>

            <div className="space-y-3">
              {profile.payments && profile.payments.length > 0 ? profile.payments.map(payment => (
                <div key={payment.id} className="flex justify-between items-center p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-white">{payment.plan?.name || 'Lifetime Plan'}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(payment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-bold text-white">₹{payment.amount}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${payment.status === 'SUCCESS' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              )) : (
                <div className="text-sm text-gray-500 py-4 border border-white/5 rounded-xl bg-white/[0.01] px-4">
                  No payment history found.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
