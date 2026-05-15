import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Mehra",
    role: "Full-time Trader",
    image: "https://i.pravatar.cc/100?img=12",
    review: "Chart Mentor changed my life. I was losing money for 2 years, but after joining the mentorship, I became profitable within 3 months. The live sessions are golden!",
    rating: 5,
    screenshot: "https://images.unsplash.com/photo-1611974714024-4607ad03d63b?auto=format&fit=crop&q=80&w=500",
    profit: "+₹45,000"
  },
  {
    name: "Priya Singh",
    role: "Part-time Trader",
    image: "https://i.pravatar.cc/100?img=5",
    review: "The logic-based trading approach is what I needed. No indicators, just pure price action and SMC. Thank you Chart Mentor team for the support!",
    rating: 5,
    screenshot: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=500",
    profit: "+₹22,800"
  },
  {
    name: "Amit Patel",
    role: "Forex Trader",
    image: "https://i.pravatar.cc/100?img=33",
    review: "Best community in India. The trade alerts are highly accurate and the psychological support is something no one else provides. Highly recommended!",
    rating: 5,
    screenshot: "https://images.unsplash.com/photo-1611974714024-4607ad03d63b?auto=format&fit=crop&q=80&w=500",
    profit: "+$1,200"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 bg-[#040816] relative overflow-hidden">
      {/* Cinematic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-blue/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-2 rounded-full glass border-white/10 mb-8 shadow-xl"
          >
             <span className="text-[10px] font-black tracking-[0.4em] text-accent-cyan uppercase">Verified Success</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 uppercase leading-[1.1] tracking-tight"
          >
            What Our <span className="text-gradient italic">Traders</span> Say
          </motion.h2>
          <p className="text-slate-gray text-xl max-w-2xl mx-auto font-medium">
            Join thousands of successful students who have mastered the institutional footprints.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="group glass-dark rounded-[50px] border-white/5 overflow-hidden hover:border-white/20 transition-all duration-700 shadow-2xl flex flex-col"
            >
              {/* Screenshot Preview - Top */}
              <div className="relative h-64 overflow-hidden border-b border-white/10">
                 <img src={item.screenshot} alt="Profit Screenshot" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80" />
                 <div className="absolute top-6 right-6 bg-emerald-500/20 px-4 py-2 rounded-2xl border border-emerald-500/20 backdrop-blur-xl shadow-xl">
                   <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                     <CheckCircle2 size={12} />
                     Verified Profit: {item.profit}
                   </p>
                 </div>
              </div>

              <div className="p-10 flex-1 flex flex-col">
                <div className="flex gap-1 mb-8">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-accent-cyan text-accent-cyan" />
                  ))}
                </div>
                
                <p className="text-slate-gray leading-relaxed mb-10 italic font-medium text-lg relative">
                  <Quote className="absolute -top-6 -left-6 text-white/5" size={48} />
                  "{item.review}"
                </p>

                <div className="mt-auto flex items-center gap-5 pt-8 border-t border-white/5">
                  <div className="relative">
                     <img src={item.image} alt={item.name} className="w-16 h-16 rounded-2xl object-cover border border-white/10" />
                     <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-accent-blue flex items-center justify-center border-2 border-[#0B1120]">
                        <ShieldCheck size={12} className="text-white" />
                     </div>
                  </div>
                  <div>
                    <h4 className="text-white font-black text-xl uppercase italic tracking-tighter">{item.name}</h4>
                    <p className="text-[10px] text-accent-cyan font-black uppercase tracking-[0.3em]">{item.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <button className="relative group px-12 py-5 overflow-hidden rounded-[25px] transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-accent-blue/20">
            <span className="absolute inset-0 bg-white/5 border border-white/10" />
            <span className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex items-center gap-3 text-lg font-black text-white uppercase tracking-widest">
              VIEW MORE REVIEWS
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
