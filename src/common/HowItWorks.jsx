import React from "react";
import { motion } from "framer-motion";
import { LogIn, Tv, TrendingUp, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: LogIn,
    title: "Join Membership",
    description: "Choose your preferred plan and complete the secure payment process to get instant access."
  },
  {
    icon: Tv,
    title: "Access Dashboard",
    description: "Get instant access to private community, premium study materials, and all recorded sessions."
  },
  {
    icon: TrendingUp,
    title: "Start Trading Pro",
    description: "Join daily live sessions, follow expert setups, and master the institutional trading art."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 bg-[#040816] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent-blue/5 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent-cyan/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-2 rounded-full glass border-white/10 mb-8 shadow-xl"
          >
             <span className="text-[10px] font-black tracking-[0.4em] text-accent-cyan uppercase">Process Flow</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 uppercase leading-[1.1] tracking-tight"
          >
            Your Path To <br />
            <span className="text-gradient italic">Profitable</span> Trading
          </motion.h2>
          <p className="text-slate-gray text-xl max-w-2xl mx-auto font-medium">
            We've simplified the journey. Follow these three steps to transition from a retail trader to an institutional player.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-16">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-20 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0">
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: "100%" }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="h-full bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-blue opacity-50"
             />
          </div>
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10 text-center group"
            >
              {/* Icon Container */}
              <div className="relative w-32 h-32 mx-auto mb-10">
                 <div className="absolute inset-0 bg-accent-blue/10 rounded-[35px] rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-white/5 rounded-[35px] -rotate-3 group-hover:rotate-0 transition-transform duration-500 border border-white/10" />
                 <div className="relative w-full h-full glass rounded-[35px] flex items-center justify-center border-white/20 shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <step.icon size={44} className="text-white group-hover:scale-110 transition-transform duration-500 relative z-10" />
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-1 -right-1 w-10 h-10 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center text-white font-black text-sm shadow-lg shadow-accent-blue/30 rotate-12">
                      0{i + 1}
                    </div>
                 </div>
              </div>

              <h3 className="text-3xl font-black text-white mb-6 uppercase italic tracking-tighter group-hover:text-accent-cyan transition-colors">{step.title}</h3>
              <p className="text-slate-gray text-lg leading-relaxed font-medium px-4">
                {step.description}
              </p>

              {/* Mobile Arrow */}
              {i < steps.length - 1 && (
                <div className="md:hidden mt-12 flex justify-center">
                   <ChevronRight className="text-white/20 rotate-90" size={32} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
