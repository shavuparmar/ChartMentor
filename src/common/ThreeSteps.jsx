import React from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    id: "01",
    icon: UserPlus,
    title: "Join Membership",
    description:
      "Plan choose karo aur secure payment complete karke instantly community ka part bano.",
  },
  {
    id: "02",
    icon: ShieldCheck,
    title: "Get Instant Access",
    description:
      "Telegram premium group, live sessions aur study materials ka immediate access milega.",
  },
  {
    id: "03",
    icon: TrendingUp,
    title: "Learn & Grow",
    description:
      "Daily guidance follow karo, discipline build karo aur consistent profitable trader bano.",
  },
];

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HowItWorks() {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#030712] px-5 py-24 text-white lg:px-10"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          {/* Badge */}
          <div className="mb-5 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-blue-300 backdrop-blur-xl">
            HOW IT WORKS
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Start in
            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Simple process follow karo aur trading journey ko
            next level par le jao with proper mentorship.
          </p>
        </motion.div>

        {/* STEPS */}
        <div className="relative">

          {/* DESKTOP LINE */}
          <div className="absolute left-0 right-0 top-28 hidden h-[2px] lg:block">
            <div className="mx-auto h-full max-w-5xl bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                  }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col items-center"
                >
                  {/* MOBILE CONNECTOR */}
                  {index !== steps.length - 1 && (
                    <div className="absolute top-full z-0 h-10 w-[2px] bg-blue-500/20 lg:hidden" />
                  )}

                  {/* NUMBER + ICON */}
                  <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-blue-500/20 bg-[#08101f] shadow-[0_0_50px_rgba(59,130,246,0.08)] transition-all duration-500 group-hover:scale-105 group-hover:border-blue-500/40 group-hover:shadow-[0_0_60px_rgba(59,130,246,0.2)]">

                    {/* INNER CIRCLE */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shadow-[0_0_40px_rgba(59,130,246,0.35)]">
                      <Icon className="h-9 w-9 text-white" />
                    </div>

                    {/* STEP NUMBER */}
                    <div className="absolute -right-1 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/30 bg-[#030712] text-sm font-black text-blue-300">
                      {step.id}
                    </div>
                  </div>

                  {/* CARD */}
                  <div className="mt-8 w-full rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 text-center backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/20 hover:bg-white/[0.06]">

                    {/* TITLE */}
                    <h3 className="text-2xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-blue-400">
                      {step.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="mt-5 text-sm leading-relaxed text-gray-400 sm:text-base">
                      {step.description}
                    </p>

                    {/* ARROW */}
                    <div className="mt-8 flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-blue-400 transition-all duration-300 group-hover:border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <button 
            onClick={() => {
              if (user) {
                navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
              } else {
                navigate('/login?redirect=/student/dashboard');
              }
            }}
            className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-5 text-sm font-black uppercase tracking-[0.25em] text-white shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_70px_rgba(59,130,246,0.45)]"
          >
            JOIN MEMBERSHIP

            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}