import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import Logo from "../../common/Logo";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [otp, setOtp] = useState("");
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

  // Password Rules
  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const isPasswordValid =
    passwordRules.length &&
    passwordRules.uppercase &&
    passwordRules.lowercase &&
    passwordRules.number;

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!isPasswordValid) {
      return toast.error(
        "Password must contain uppercase, lowercase, number and 8 characters."
      );
    }

    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName =
      nameParts.length > 1
        ? nameParts.slice(1).join(" ")
        : "_";

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setStep(2);
        setResendCooldown(60);
      }
    } catch (error) {
      if (
        error.response?.data?.errors &&
        error.response.data.errors.length > 0
      ) {
        toast.error(error.response.data.errors[0].msg);
      } else {
        toast.error(
          error.response?.data?.message ||
          "Registration failed"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/resend-otp`,
        { email }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setResendCooldown(60);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to resend OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      return toast.error(
        "Please enter a valid 6-digit OTP"
      );
    }

    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-email`,
        {
          email,
          otp: otp.toString().trim(),
        }
      );

      toast.success(
        "Registration successful! Please login."
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] relative overflow-hidden flex items-center justify-center px-4 py-10">

      {/* Background Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-100px] w-[320px] h-[320px] bg-violet-500/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-md relative z-10">

        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[32px] shadow-2xl p-6 sm:p-8">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">

            <Link
              to="/"
              className="flex items-center gap-3 mb-6"
            >
              <div className="p-2 rounded-2xl bg-white/[0.04] border border-white/10">
                <Logo
                  size={38}
                  color="white"
                  backgroundColor="#0f172a"
                />
              </div>

              <div className="flex flex-col items-start">
                <h1 className="text-white font-black text-lg leading-none">
                  CHART
                  <span className="text-cyan-400">
                    MENTOR
                  </span>
                </h1>

                <span className="text-[9px] tracking-[0.3em] text-gray-500 font-bold mt-1">
                  MEMBERSHIP
                </span>
              </div>
            </Link>

            <h2 className="text-3xl font-black text-white">
              {step === 1
                ? "Create Account"
                : "Verify Email"}
            </h2>

            <p className="text-sm text-gray-400 mt-2 max-w-xs">
              {step === 1
                ? "Join the premium trading mentorship platform."
                : `Enter the OTP sent to ${email}`}
            </p>
          </div>

          <AnimatePresence mode="wait">

            {/* REGISTER */}
            {step === 1 ? (
              <motion.form
                key="register"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleRegister}
                className="space-y-5"
              >

                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                    Full Name
                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 focus-within:border-cyan-400/50 focus-within:bg-white/[0.05] transition-all">
                    <User className="w-4 h-4 text-gray-500" />

                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) =>
                        setFullName(e.target.value)
                      }
                      required
                      placeholder="John Doe"
                      className="w-full bg-transparent px-3 py-4 text-sm text-white outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                    Email Address
                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 focus-within:border-cyan-400/50 focus-within:bg-white/[0.05] transition-all">
                    <Mail className="w-4 h-4 text-gray-500" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                      placeholder="john@example.com"
                      className="w-full bg-transparent px-3 py-4 text-sm text-white outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                    Password
                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 focus-within:border-cyan-400/50 focus-within:bg-white/[0.05] transition-all">
                    <Lock className="w-4 h-4 text-gray-500" />

                    <input
                      type={
                        showPassword ? "text" : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                      placeholder="••••••••"
                      className="w-full bg-transparent px-3 py-4 text-sm text-white outline-none placeholder:text-gray-600"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="text-gray-500 hover:text-white transition"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Suggestions */}
                  {password.length > 0 && (
                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 space-y-2 mt-3">

                      <div className={`flex items-center gap-2 text-xs ${passwordRules.length ? "text-emerald-400" : "text-gray-500"}`}>
                        <CheckCircle2 className="w-4 h-4" />
                        Minimum 8 characters
                      </div>

                      <div className={`flex items-center gap-2 text-xs ${passwordRules.uppercase ? "text-emerald-400" : "text-gray-500"}`}>
                        <CheckCircle2 className="w-4 h-4" />
                        1 uppercase letter
                      </div>

                      <div className={`flex items-center gap-2 text-xs ${passwordRules.lowercase ? "text-emerald-400" : "text-gray-500"}`}>
                        <CheckCircle2 className="w-4 h-4" />
                        1 lowercase letter
                      </div>

                      <div className={`flex items-center gap-2 text-xs ${passwordRules.number ? "text-emerald-400" : "text-gray-500"}`}>
                        <CheckCircle2 className="w-4 h-4" />
                        1 number
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                    Confirm Password
                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 focus-within:border-cyan-400/50 focus-within:bg-white/[0.05] transition-all">
                    <Lock className="w-4 h-4 text-gray-500" />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      required
                      placeholder="••••••••"
                      className="w-full bg-transparent px-3 py-4 text-sm text-white outline-none placeholder:text-gray-600"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="text-gray-500 hover:text-white transition"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black hover:bg-gray-200 transition-all py-4 rounded-2xl font-black text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading
                    ? "Processing..."
                    : "Continue"}

                  {!loading && (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>

                {/* Footer */}
                <div className="text-center text-xs text-gray-400 pt-2">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    Sign In
                  </Link>
                </div>
              </motion.form>
            ) : (

              /* OTP */
              <motion.form
                key="otp"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleVerifyOTP}
                className="space-y-6"
              >

                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-bold block text-center">
                    One-Time Password
                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 focus-within:border-cyan-400/50 transition-all">
                    <ShieldCheck className="w-5 h-5 text-gray-500" />

                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) =>
                        setOtp(
                          e.target.value.replace(
                            /\D/g,
                            ""
                          )
                        )
                      }
                      placeholder="123456"
                      className="w-full bg-transparent px-4 py-5 text-center text-2xl tracking-[0.5em] font-mono text-white outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-400 text-black hover:bg-cyan-300 transition-all py-4 rounded-2xl font-black text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading
                    ? "Verifying..."
                    : "Verify Account"}

                  {!loading && (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                </button>

                <div className="flex items-center justify-between text-xs px-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-gray-500 hover:text-white transition"
                  >
                    Change Email
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={
                      resendCooldown > 0 || loading
                    }
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`w-3 h-3 ${loading ? "animate-spin" : ""
                        }`}
                    />

                    {resendCooldown > 0
                      ? `${resendCooldown}s`
                      : "Resend OTP"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}