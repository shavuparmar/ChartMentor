import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Users, PlayCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-32 bg-[#040816] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="relative rounded-[70px] overflow-hidden border border-white/10 group shadow-2xl">

          {/* Background Image with Premium Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1611974714024-4607ad03d63b?auto=format&fit=crop&q=80&w=2000"
              alt="Trading Background"
              className="w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-[3000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040816] via-[#040816]/90 to-accent-blue/30" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          </div>

          <div className="relative z-10 p-12 md:p-28 grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass border-white/10 mb-10 shadow-2xl"
              >
                <div className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </div>
                <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase">Last 10 Seats Remaining</span>
              </motion.div>

              <h2 className="text-5xl md:text-8xl font-black text-white leading-[1] mb-10 uppercase italic tracking-tighter">
                Stop Losing, <br />
                <span className="text-gradient">Start Dominating.</span>
              </h2>

              <p className="text-slate-gray text-2xl max-w-xl mb-14 font-medium leading-relaxed">
                Unlock the institutional secrets of the market. Join India's most <span className="text-white font-bold">elite trading circle</span> and redefine your future.
              </p>

              <div className="flex flex-wrap gap-12">
                <div className="flex items-center gap-4 group/item">
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-accent-cyan group-hover/item:bg-accent-cyan/10 transition-colors">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <p className="text-white font-black text-lg uppercase italic tracking-tighter">Verified Results</p>
                    <p className="text-[10px] text-slate-gray font-bold uppercase tracking-widest">100% Transparency</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group/item">
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-accent-blue group-hover/item:bg-accent-blue/10 transition-colors">
                    <Users size={28} />
                  </div>
                  <div>
                    <p className="text-white font-black text-lg uppercase italic tracking-tighter">Elite Community</p>
                    <p className="text-[10px] text-slate-gray font-bold uppercase tracking-widest">Lifetime Networking</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8 lg:items-end"
            >
              <button className="group relative w-full lg:w-[400px] py-10 rounded-[35px] bg-white text-background font-black text-3xl shadow-[0_30px_60px_rgba(255,255,255,0.1)] hover:shadow-[0_40px_100px_rgba(255,255,255,0.2)] transition-all duration-700 hover:-translate-y-2 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-5 uppercase tracking-tighter italic">
                  GET ACCESS NOW <ArrowRight size={36} className="group-hover:translate-x-3 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              </button>

              <div className="flex items-center gap-6 px-10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#040816] bg-slate-800" />
                  ))}
                </div>
                <p className="text-slate-gray text-[10px] font-black uppercase tracking-[0.2em]">
                  Join <span className="text-white">500+ Traders</span> Joining Today
                </p>
              </div>
            </motion.div>
          </div>

          {/* Luxury Corner Effect */}
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent-blue/20 blur-[150px] rounded-full pointer-events-none opacity-50" />
        </div>
      </div>
    </section>
  );
}
