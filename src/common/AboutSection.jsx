import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

import aboutImage from "../assets/Chartheroback.png";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#030712] px-5 py-24 text-white lg:px-10"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-indigo-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-blue-300 backdrop-blur-xl">
            <BadgeCheck className="h-4 w-4" />
            ABOUT MENTOR
          </div>

          <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Main Kaun Hu?
          </h2>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* OUTER GLOW */}
            <div className="absolute -inset-5 rounded-[40px] bg-blue-600/10 blur-3xl" />

            {/* IMAGE CONTAINER */}
            <div className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl">

              {/* IMAGE */}
              <img
                src={aboutImage}
                alt="Chart Mentor"
                className="h-[500px] w-full object-cover transition-all duration-700 group-hover:scale-105 sm:h-[600px]"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent" />

              {/* BOTTOM INFO CARD */}
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
                    <TrendingUp className="h-7 w-7" />
                  </div>

                  <div>
                    <h4 className="text-lg font-black uppercase tracking-wide text-white">
                      Consistent Trader
                    </h4>

                    <p className="mt-1 text-sm text-gray-400">
                      5+ Years of Trading Experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CONTENT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* SMALL TAG */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-blue-300 backdrop-blur-xl">
              <ShieldCheck className="h-4 w-4" />
              MY JOURNEY
            </div>

            {/* HEADING */}
            <h3 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Trading Journey
              <span className="mt-2 block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Se Real Learning
              </span>
            </h3>

            {/* DESCRIPTION */}
            <div className="mt-8 space-y-6 text-base leading-relaxed text-gray-300 sm:text-lg">

              <p>
                Mera naam {""}
                <span className="font-bold text-white">
                  Arun
                </span> {"Gupta"}
                hai aur pichhle 5+ saalon se main actively trading kar raha hu.
              </p>

              <p>
                Maine khud bohot losses dekhe, emotional mistakes ki,
                strategies change ki aur market ko deeply samjha.
                Aaj main disciplined aur consistently profitable
                trading approach follow karta hu.
              </p>

              {/* QUOTE CARD */}
              <div className="rounded-3xl border border-blue-500/10 bg-blue-500/[0.05] p-6 backdrop-blur-xl">
                <p className="text-lg italic leading-relaxed text-gray-200">
                  “Mera mission hai ki jo galtiyan maine ki,
                  wo aap na karein. Aapka time, paisa aur
                  energy dono bache.”
                </p>
              </div>

              <p>
                Chart Mentor sirf ek trading community nahi hai —
                yeh ek complete mentorship ecosystem hai jahan
                aapko roadmap, support aur real guidance milti hai.
              </p>
            </div>

            {/* STATS */}
            <div className="mt-10 grid grid-cols-2 gap-5">

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                <h4 className="text-3xl font-black text-blue-400">
                  1500+
                </h4>

                <p className="mt-2 text-sm uppercase tracking-wide text-gray-400">
                  Traders Community
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                <h4 className="text-3xl font-black text-blue-400">
                  5+ Years
                </h4>

                <p className="mt-2 text-sm uppercase tracking-wide text-gray-400">
                  Market Experience
                </p>
              </div>
            </div>

            {/* CTA BUTTON */}
            <button className="group mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-5 text-sm font-black uppercase tracking-[0.25em] text-white shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(59,130,246,0.4)]">
              Join Chart Mentor

              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* BRAND SIGN */}
            <div className="mt-12">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text font-serif text-4xl italic text-transparent opacity-90">
                Chart Mentor
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}