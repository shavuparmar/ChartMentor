import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle2, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import Logo from '../../common/Logo';
import { motion, AnimatePresence } from 'framer-motion';

export default function StudentRegister() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(pass);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (!validatePassword(password)) {
      return toast.error("Password must be at least 8 characters, with 1 uppercase, 1 lowercase, and 1 number.");
    }

    // Split full name logically
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '_'; // Use underscore to pass validation if no last name provided

    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        firstName, lastName, email, password
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setStep(2);
        setResendCooldown(60); // start cooldown
      }
    } catch (error) {
      if (error.response?.data?.errors && error.response.data.errors.length > 0) {
        // Express-validator error array
        toast.error(error.response.data.errors[0].msg);
      } else {
        toast.error(error.response?.data?.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resend-otp`, { email });
      if (res.data.success) {
        toast.success(res.data.message);
        setResendCooldown(60);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      return toast.error('Please enter a valid 6-digit OTP');
    }
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-email`, {
        email, otp
      });
      // Do not auto-login to prevent session state desync issues. Force them to login page.
      toast.success('Registration successful! Please login to continue.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#040816] px-4 py-12 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2rem] p-8 sm:p-10 shadow-2xl relative z-10 hover:border-white/15 transition-all duration-500 overflow-hidden">

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
            {step === 1 ? 'Create Account' : 'Verify Email'}
          </h2>
          <p className="text-gray-400 mt-2 text-sm px-4">
            {step === 1 ? 'Join the premium trading mentorship program' : `Enter the 6-digit code sent to ${email}`}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form
              key="register"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleRegister}
              className="space-y-5"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Full Name</label>
                <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl px-4 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <User className="text-gray-500 w-4 h-4 flex-shrink-0" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                    placeholder="John Doe"
                    className="w-full bg-transparent outline-none px-2.5 py-3.5 text-white text-sm placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Email Address</label>
                <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl px-4 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <Mail className="text-gray-500 w-4 h-4 flex-shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-transparent outline-none px-2.5 py-3.5 text-white text-sm placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Password</label>
                <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl px-4 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <Lock className="text-gray-500 w-4 h-4 flex-shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-transparent outline-none px-2.5 py-3.5 text-white text-sm placeholder:text-gray-600"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-white transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Confirm Password</label>
                <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl px-4 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <Lock className="text-gray-500 w-4 h-4 flex-shrink-0" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-transparent outline-none px-2.5 py-3.5 text-white text-sm placeholder:text-gray-600"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-gray-500 hover:text-white transition-colors">
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:shadow-none hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-all duration-300 py-4 mt-2 rounded-2xl text-white font-black text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Processing...' : 'Continue'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="mt-8 text-center text-xs text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-bold hover:underline transition">
                  Sign In
                </Link>
              </div>
            </motion.form>
          ) : (
            <motion.form
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleVerifyOTP}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 text-center block">One-Time Password</label>
                <div className="flex items-center justify-center bg-white/[0.03] border border-white/5 rounded-2xl px-4 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <ShieldCheck className="text-gray-500 w-5 h-5 flex-shrink-0" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                    required
                    placeholder="123456"
                    className="w-full bg-transparent outline-none px-4 py-4 text-white text-2xl tracking-[0.5em] text-center font-mono placeholder:text-gray-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:shadow-none hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all duration-300 py-4 mt-2 rounded-2xl text-white font-black text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
                {!loading && <CheckCircle2 className="w-4 h-4" />}
              </button>

              <div className="flex items-center justify-between mt-6 px-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-gray-500 hover:text-white transition"
                >
                  Change Email
                </button>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={resendCooldown > 0 || loading}
                  className="text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-blue-400 hover:text-blue-300"
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
