import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, ShieldCheck, KeyRound } from 'lucide-react';

export default function StudentSettings() {
  const { user } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords don't match");
    }
    // API Call to update password could go here
    toast.success('Password update functionality pending backend integration');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-8 max-w-4xl font-sans text-white">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
          <User className="w-8 h-8 text-blue-400" />
          Profile Settings
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Manage your account information and security preferences.
        </p>
      </div>
      
      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-xl divide-y divide-white/5">
        
        {/* Personal Information */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Personal Information</h2>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Non-editable details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">First Name</label>
              <div className="flex items-center gap-3 bg-black/20 border border-white/5 rounded-2xl px-4 py-3.5 text-gray-400 cursor-not-allowed">
                <User className="w-4 h-4 opacity-50" />
                <span className="text-sm">{user?.firstName}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Last Name</label>
              <div className="flex items-center gap-3 bg-black/20 border border-white/5 rounded-2xl px-4 py-3.5 text-gray-400 cursor-not-allowed">
                <User className="w-4 h-4 opacity-50" />
                <span className="text-sm">{user?.lastName}</span>
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
              <div className="flex items-center gap-3 bg-black/20 border border-white/5 rounded-2xl px-4 py-3.5 text-gray-400 cursor-not-allowed">
                <Mail className="w-4 h-4 opacity-50" />
                <span className="text-sm">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Password */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Security</h2>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Update your password</p>
            </div>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-5 max-w-lg">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300">New Password</label>
              <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-2xl px-4 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
                <Lock className="text-gray-500 w-4 h-4 flex-shrink-0" />
                <input 
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
                className="px-8 py-3.5 rounded-xl bg-white text-black hover:bg-gray-200 font-bold text-sm uppercase tracking-wide hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
