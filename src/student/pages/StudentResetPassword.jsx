import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Logo from '../../common/Logo';

export default function StudentResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      return toast.error('Invalid or missing reset token');
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, { token, newPassword });
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      if (error.response?.data?.errors && error.response.data.errors.length > 0) {
        toast.error(error.response.data.errors[0].msg);
      } else {
        toast.error(error.response?.data?.message || 'Failed to reset password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#040816] px-4 py-12 relative overflow-hidden font-sans">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2rem] p-8 sm:p-10 shadow-2xl relative z-10 hover:border-white/15 transition-all duration-500">
        
        {/* Logo / Heading */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link to="/" className="group flex items-center gap-3 mb-6">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-md group-hover:scale-105 transition-transform duration-300">
              <Logo size={40} color="white" backgroundColor="#0f172a" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <h1 className="text-lg font-black uppercase tracking-tight text-white">
                CHART<span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">MENTOR</span>
              </h1>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400">MEMBERSHIP</span>
            </div>
          </Link>
          <h2 className="text-3xl font-black tracking-tight text-white">
            Reset Password
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Enter your new secure password below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* New Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
              New Password
            </label>
            <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl px-4 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
              <Lock className="text-gray-500 w-4 h-4 flex-shrink-0" />
              <input 
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                placeholder="New Password"
                className="w-full bg-transparent outline-none px-2.5 py-3.5 text-white text-sm placeholder:text-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Confirm New Password
            </label>
            <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl px-4 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
              <Lock className="text-gray-500 w-4 h-4 flex-shrink-0" />
              <input 
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"
                className="w-full bg-transparent outline-none px-2.5 py-3.5 text-white text-sm placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:shadow-none hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-all duration-300 py-4 mt-2 rounded-2xl text-white font-black text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
