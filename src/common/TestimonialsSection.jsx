import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const testimonials = [
  {
    name: "Rahul Mehta",
    role: "Intraday Trader",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    review:
      "ChartMentors helped me understand market psychology and risk management properly. The mentorship sessions are practical and extremely valuable for serious traders.",
    rating: 5,
    screenshot:
      "https://images.unsplash.com/photo-1642790551116-18e150f248e5?auto=format&fit=crop&w=1000&q=80",
  },

  {
    name: "Arjun Singh",
    role: "Options Trader",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    review:
      "The live trading sessions and mentorship support completely improved my confidence. I finally started following a disciplined trading system.",
    rating: 5,
    screenshot:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80",
  },

  {
    name: "Aman Patel",
    role: "Forex Trader",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
    review:
      "Best trading community I’ve joined so far. The strategies are easy to understand and the mentors genuinely help every student grow consistently.",
    rating: 5,
    screenshot:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80",
  },

  {
    name: "Sanjay Verma",
    role: "Swing Trader",
    image:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=400&q=80",
    review:
      "I joined as a beginner and within months my understanding of charts and entries improved massively. Highly recommended for new traders.",
    rating: 5,
    screenshot:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=80",
  },

  {
    name: "Karan Malhotra",
    role: "Crypto Trader",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    review:
      "Professional mentorship with genuine guidance. The support team and trading community always motivate you to stay focused and disciplined.",
    rating: 5,
    screenshot:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1000&q=80",
  },

  {
    name: "Rohit Sharma",
    role: "Scalping Trader",
    image:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=400&q=80",
    review:
      "The mentorship quality is amazing. Every concept is explained clearly with proper market examples and practical trading psychology.",
    rating: 5,
    screenshot:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32 bg-[#020617]"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-200px] left-[-100px] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

        <div className="absolute bottom-[-200px] right-[-100px] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-600/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur-xl mb-6 sm:mb-8"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />

            <span className="text-[10px] sm:text-xs font-black tracking-[0.25em] sm:tracking-[0.4em] uppercase text-cyan-300">
              Trusted By Traders
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight"
          >
            What Our <br />

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">
              Students Say
            </span>
          </motion.h2>

          <p className="mt-6 sm:mt-8 text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2">
            Real feedback from traders learning and growing with ChartMentors.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
              }}
              viewport={{ once: true }}
              className="group relative rounded-[28px] sm:rounded-[35px] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-2xl hover:border-cyan-400/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />

              {/* Screenshot */}
              <div className="relative h-52 sm:h-60 overflow-hidden">
                <img
                  src={item.screenshot}
                  alt="Trading Screenshot"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-7 flex flex-col h-full">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(item.rating)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Review */}
                <div className="relative mb-8">
                  <Quote
                    className="absolute -top-4 left-0 text-cyan-500/10"
                    size={55}
                  />

                  <p className="relative text-slate-300 leading-7 text-sm sm:text-[15px] font-medium z-10">
                    {item.review}
                  </p>
                </div>

                {/* User Section */}
                <div className="mt-auto pt-5 border-t border-white/10 flex items-center gap-4">
                  {/* User Image */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-cyan-400/30 bg-[#0f172a] shadow-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Verified Badge */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cyan-500 flex items-center justify-center border-2 border-[#020617]">
                      <ShieldCheck
                        size={11}
                        className="text-white"
                      />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-base sm:text-lg font-black tracking-tight truncate">
                      {item.name}
                    </h4>

                    <p className="text-cyan-300 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold mt-1 truncate">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}