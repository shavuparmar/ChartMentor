import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  BarChart3, 
  BookOpen, 
  Zap, 
  Target, 
  MessageCircle, 
  LineChart,
  Globe,
  Lock,
  Cpu
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Daily Market Analysis",
    description: "In-depth institutional breakdowns of Nifty, BankNifty and Global Markets every morning.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    title: "Live Doubt Sessions",
    description: "Personalized weekend live sessions to decode your charts and solve trading queries.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Target,
    title: "High Probability Setups",
    description: "Access to high R:R institutional setups based on Price Action & SMC logic.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: BookOpen,
    title: "Premium Study Vault",
    description: "Exclusive library of e-books, strategy blueprints, and advanced video modules.",
    color: "from-orange-500 to-yellow-500"
  },
  {
    icon: MessageCircle,
    title: "Elite Community",
    description: "Network with India's most disciplined 5,000+ traders in our private circle.",
    color: "from-accent-blue to-accent-cyan"
  },
  {
    icon: ShieldCheck,
    title: "Personal Mentorship",
    description: "Direct access to mentors for building your personalized risk-management roadmap.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: LineChart,
    title: "Psychology Training",
    description: "Master your trading emotions and learn the institutional mindset of professional players.",
    color: "from-red-500 to-orange-500"
  },
  {
    icon: Cpu,
    title: "Algorithmic Insights",
    description: "Understand the math behind the markets with data-driven institutional insights.",
    color: "from-cyan-500 to-blue-500"
  }
];

export default function MembershipBenefits() {
  return (
    <section id="membership" className="py-32 bg-[#040816] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-2 rounded-full glass border-white/10 mb-8 shadow-xl"
          >
             <span className="text-[10px] font-black tracking-[0.4em] text-accent-cyan uppercase">Unfair Advantage</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 uppercase leading-[1.1] tracking-tight"
          >
            Why Join Our <br />
            <span className="text-gradient italic">Inner Circle?</span>
          </motion.h2>
          <p className="text-slate-gray text-xl max-w-2xl mx-auto font-medium">
            We provide the tools, the logic, and the community. You provide the discipline. Together, we master the markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20 rounded-[45px] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative h-full glass-dark p-10 rounded-[45px] border border-white/5 transition-all duration-700 group-hover:border-white/20 group-hover:-translate-y-3 flex flex-col">
                <div className={`w-16 h-16 rounded-[22px] bg-white/5 p-4 mb-8 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-inner flex items-center justify-center`}>
                    <benefit.icon className="text-white w-8 h-8 group-hover:text-accent-cyan transition-colors" />
                </div>
                
                <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tighter group-hover:text-accent-cyan transition-colors duration-500 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-slate-gray text-base leading-relaxed font-medium mb-8">
                  {benefit.description}
                </p>
                
                <div className="mt-auto pt-6 flex items-center gap-3 text-white/20 group-hover:text-accent-blue transition-colors duration-500">
                  <div className="h-[1px] flex-1 bg-current opacity-20" />
                  <Zap size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
