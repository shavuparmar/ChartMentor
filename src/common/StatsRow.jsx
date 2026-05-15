import React from "react";
import { motion } from "framer-motion";
import { Users, Video, Star, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "5000+",
    label: "Active Members",
    color: "text-accent-blue"
  },
  {
    icon: Video,
    value: "200+",
    label: "Live Sessions",
    color: "text-accent-cyan"
  },
  {
    icon: Star,
    value: "95%",
    label: "Satisfaction",
    color: "text-emerald-500"
  },
  {
    icon: Clock,
    value: "2+",
    label: "Years Exp.",
    color: "text-orange-500"
  }
];

export default function StatsRow() {
  return (
    <section className="py-20 bg-[#0B1120] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-inner">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase italic tracking-tighter">
                {stat.value}
              </h3>
              <p className="text-slate-gray text-xs font-black uppercase tracking-[0.3em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
