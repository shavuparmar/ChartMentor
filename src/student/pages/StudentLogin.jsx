import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import Logo from "../common/Logo";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Password Validation Rules
  const passwordRules = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const isPasswordValid =
    passwordRules.length &&
    passwordRules.lowercase &&
    passwordRules.number;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error(
        "Password must be at least 8 characters and include lowercase and number"
      );
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      const { token, role } = res.data.data;

      login(res.data.data, token);

      toast.success("Login successful");

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        const searchParams = new URLSearchParams(location.search);
        const redirectUrl =
          searchParams.get("redirect") || "/student/dashboard";

        navigate(redirectUrl);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#040816] px-4 py-12 relative overflow-hidden font-sans">

      {/* Background Glows */}
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
                CHART
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  MENTOR
                </span>
              </h1>

              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400">
                MEMBERSHIP
              </span>
            </div>
          </Link>

          <h2 className="text-3xl font-black tracking-tight text-white">
            Welcome Back
          </h2>

          <p className="text-gray-400 mt-2 text-sm">
            Sign in to access your trading dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Email Address
            </label>

            <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl px-4 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
              <Mail className="text-gray-500 w-5 h-5 flex-shrink-0" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
                className="w-full bg-transparent outline-none px-3 py-4 text-white text-sm placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl px-4 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
              <Lock className="text-gray-500 w-5 h-5 flex-shrink-0" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-transparent outline-none px-3 py-4 text-white text-sm placeholder:text-gray-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Suggestions */}
            {password.length > 0 && (
              <div className="mt-4 space-y-2 bg-white/[0.02] border border-white/5 rounded-2xl p-4">

                <div
                  className={`flex items-center gap-2 text-xs transition-all ${passwordRules.length
                      ? "text-green-400"
                      : "text-gray-500"
                    }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Minimum 8 characters
                </div>

                <div
                  className={`flex items-center gap-2 text-xs transition-all ${passwordRules.lowercase
                      ? "text-green-400"
                      : "text-gray-500"
                    }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  At least 1 lowercase letter
                </div>

                <div
                  className={`flex items-center gap-2 text-xs transition-all ${passwordRules.number
                      ? "text-green-400"
                      : "text-gray-500"
                    }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  At least 1 number
                </div>
              </div>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <label className="flex items-center gap-2.5 text-xs text-gray-400 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-lg bg-white/5 border-white/10 text-blue-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-blue-500"
              />
              Remember my session
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:shadow-none hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-all duration-300 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? "Logging in..." : "Sign In"}

            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 font-bold hover:underline transition"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
}