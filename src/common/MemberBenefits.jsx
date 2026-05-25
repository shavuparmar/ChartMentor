import React from "react";
import { motion } from "framer-motion";
import {
  Send,
  MonitorPlay,
  FileText,
  LineChart,
  MessageCircleQuestion,
  Sparkles,
} from "lucide-react";

const benefits = [
  {
    icon: Send,
    title: "Telegram Premium Group",
    desc: "Get daily updates, setups & mentor support.",
    telegram: true,
  },
  {
    icon: MonitorPlay,
    title: "Weekly Live Sessions",
    desc: "Interactive live mentorship and market learning.",
  },
  {
    icon: FileText,
    title: "Study Material & PDFs",
    desc: "Premium resources, notes & trading guides.",
  },
  {
    icon: LineChart,
    title: "Trade Setups & Analysis",
    desc: "High probability setups with clear analysis.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Q&A & Doubt Support",
    desc: "Get all your trading doubts solved instantly.",
  },
];

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MemberBenefits() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section
      id="membership"
      className="relative overflow-hidden bg-[#030712] px-5 py-24 text-white lg:px-10"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-blue-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            YOU WILL GET ACCESS TO
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Exclusive
            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Member Benefits
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Everything you need to learn trading professionally with guidance,
            support, analysis, and a powerful trader community.
          </p>
        </motion.div>

        {/* BENEFITS GRID */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">

          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-7 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[0_20px_80px_rgba(59,130,246,0.15)]"
              >
                {/* Glow */}
                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

                {/* ICON */}
                <div
                  className={`relative flex h-20 w-20 items-center justify-center rounded-3xl transition-all duration-500 group-hover:scale-110 ${
                    benefit.telegram
                      ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-[0_0_35px_rgba(59,130,246,0.35)]"
                      : "bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white"
                  }`}
                >
                  <Icon className="h-10 w-10" />
                </div>

                {/* CONTENT */}
                <div className="relative mt-8">
                  <h3 className="text-xl font-black leading-tight text-white">
                    {benefit.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-[15px]">
                    {benefit.desc}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="mt-7 h-[2px] w-14 rounded-full bg-blue-500/40 transition-all duration-500 group-hover:w-28 group-hover:bg-blue-400" />
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <button 
            onClick={() => {
              if (user) {
                navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
              } else {
                navigate('/login?redirect=/student/dashboard');
              }
            }}
            className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-5 text-sm font-black uppercase tracking-[0.25em] text-white shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(59,130,246,0.4)]"
          >
            JOIN MEMBERSHIP NOW

            <div className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </div>
          </button>

          <p className="mt-5 text-sm text-gray-500">
            Limited Seats • Live Community • Lifetime Learning Experience
          </p>
        </motion.div>
      </div>
    </section>
  );
}