import React from "react";
import { motion } from "framer-motion";
import { Send, Video, FileText, Target, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Send,
    title: "Premium Telegram",
    desc: "Access to our main institutional trading community."
  },
  {
    icon: Video,
    title: "Weekly Live Sessions",
    desc: "Interactive webinars to review market moves and charts."
  },
  {
    icon: FileText,
    title: "Exclusive PDFs",
    desc: "Cheat sheets, strategy guides, and psychological blueprints."
  },
  {
    icon: Target,
    title: "High-Logic Setups",
    desc: "Institutional order block and SMC based setups."
  },
  {
    icon: Headphones,
    title: "Priority Support",
    desc: "Dedicated support team to help you 24/7."
  }
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-32 bg-[#040816] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-2 rounded-full glass border-white/10 mb-8 shadow-xl"
          >
             <span className="text-[10px] font-black tracking-[0.4em] text-accent-cyan uppercase">Membership Perks</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 uppercase leading-[1.1] tracking-tight"
          >
            Everything You <br />
            <span className="text-gradient italic">Need To Win</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                 <div className="absolute inset-0 bg-accent-blue/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="relative w-full h-full glass rounded-3xl flex items-center justify-center border-white/10 group-hover:border-accent-blue/40 transition-all duration-500 shadow-2xl">
                    <benefit.icon size={32} className="text-white group-hover:text-accent-cyan transition-colors" />
                 </div>
              </div>
              <h4 className="text-white font-black text-lg uppercase italic tracking-tighter mb-3">{benefit.title}</h4>
              <p className="text-slate-gray text-xs font-bold uppercase tracking-widest leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
