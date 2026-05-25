import React from "react";
import {
  ArrowRight,
  Play,
  BarChart3,
  Users,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

import heroBg from "../assets/Chartheroback.png";

import { indianUsers } from "../assets/imageexport";

const features = [
  {
    icon: BarChart3,
    title: "Daily Analysis",
    desc: "Professional market insights & trading breakdowns everyday.",
  },
  {
    icon: Users,
    title: "Live Doubt Sessions",
    desc: "Direct mentor support with live trading discussions.",
  },
  {
    icon: BadgeCheck,
    title: "Personal Guidance",
    desc: "Step-by-step learning roadmap for consistent growth.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    desc: "Build discipline, confidence & trading consistency.",
  },
];

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HeroSection() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#030712] text-white"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0">
        {/* IMAGE */}
        <img
          src={heroBg}
          alt="Trading Background"
          className="h-full w-full object-cover object-center lg:object-right"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/90 to-[#030712]/30 lg:via-[#030712]/75 lg:to-transparent" />

        {/* EXTRA DEPTH */}
        <div className="absolute inset-0 bg-black/30" />

        {/* MOBILE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent lg:hidden" />
      </div>

      {/* ================= GLOW EFFECTS ================= */}
      <div className="absolute left-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="absolute bottom-[-100px] right-[-100px] h-[280px] w-[280px] rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* ================= HERO CONTENT ================= */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-24 pt-32 sm:pt-36 lg:px-10 lg:pb-20">
        <div className="max-w-3xl">
          {/* BADGE */}
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-300 backdrop-blur-xl sm:px-5 sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)]" />

            India’s Fast Growing Trading Community
          </div>

          {/* HEADING */}
          <h1 className="mt-7 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Trading Sikhna muskil nhi

            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Akele Sikhna muskil hain
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg lg:text-xl">
            Beginner traders ke liye proper guidance, live support, daily analysis aur step-by-step roadmap - taki aap market ko confidence ke saath samajh sako.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {/* PRIMARY BUTTON */}
            <button
              onClick={() => {
                if (user) {
                  navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
                } else {
                  navigate('/login?redirect=/student/dashboard');
                }
              }}
              className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(59,130,246,0.45)] sm:px-8 sm:py-5 sm:text-sm"
            >
              Join Membership

              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* SECONDARY BUTTON */}
            <button className="group flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] sm:px-8 sm:py-5 sm:text-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
              </div>

              Watch Demo
            </button>
          </div>

          {/* TRUSTED USERS */}
          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
            {/* AVATARS */}
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <img
                  key={item}
                  src={indianUsers[item % indianUsers.length]}
                  alt="Indian Trader"
                  className="h-11 w-11 rounded-full border-2 border-[#030712] object-cover shadow-xl sm:h-12 sm:w-12"
                />
              ))}
            </div>

            {/* TEXT */}
            <div>
              <p className="text-sm font-bold text-white sm:text-base">
                Trusted by 3000+ Traders
              </p>

              <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                Learn • Grow • Trade • Earn Together
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FEATURES ================= */}
      <div className="relative z-10 px-5 pb-14 lg:px-10 lg:pb-16">
        {/* CENTER GLOW */}
        <div className="absolute left-1/2 top-10 h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

        {/* GRID */}
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:bg-white/[0.07] hover:shadow-[0_20px_70px_rgba(59,130,246,0.15)]"
              >
                {/* TOP GLOW */}
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

                {/* ICON */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/10 bg-blue-600/10 text-blue-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>

                {/* CONTENT */}
                <div className="relative mt-6">
                  <h3 className="text-lg font-black uppercase tracking-wide text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-[15px]">
                    {feature.desc}
                  </p>
                </div>

                {/* BOTTOM LINE */}
                <div className="mt-6 h-[2px] w-12 rounded-full bg-blue-500/40 transition-all duration-500 group-hover:w-24 group-hover:bg-blue-400" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}