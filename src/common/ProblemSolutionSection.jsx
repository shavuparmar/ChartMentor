import React from "react";
import { motion } from "framer-motion";
import {
  XCircle,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const ProblemSolution = () => {
  const navigate = useNavigate();
  const problems = [
    "YouTube videos increasing your confusion",
    "Expensive courses but no proper guidance",
    "Having doubts, but no one to clear them",
    "Unable to maintain trading consistency",
    "Taking losses without understanding the reason",
    "Having the right strategy, but wrong execution",
  ];

  const solutions = [
    "Daily Support & Guidance",
    "Live Doubt Solving Sessions",
    "Clear Trading Roadmap",
    "Next Day Market Analysis",
    "High Probability Setups",
    "Discipline & Mindset Building",
    "Personal Attention",
  ];

  return (
    <section
      id="problems"
      className="relative overflow-hidden bg-[#030712] px-5 py-24 text-white lg:px-10"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-red-500/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-red-300 backdrop-blur-xl">
            <TrendingDown className="h-4 w-4" />
            EVERY TRADER FACES THESE CHALLENGES
          </div>

          <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Are You Also Facing
            <span className="mt-3 block bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
              These Common Issues?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Learning to trade might seem easy, but without proper guidance,
            everyone eventually faces confusion, unexpected losses, and
            inconsistency.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT SIDE - PROBLEMS */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-[32px] border border-red-500/10 bg-gradient-to-b from-red-500/[0.04] to-transparent p-6 backdrop-blur-2xl sm:p-8"
          >
            {/* TOP */}
            <div className="mb-10 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                <TrendingDown className="h-8 w-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black uppercase tracking-wide text-white">
                  Problems
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  Most traders face these issues
                </p>
              </div>
            </div>

            {/* LIST */}
            <div className="space-y-5">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                  }}
                  viewport={{ once: true }}
                  className="group flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/[0.04]"
                >
                  {/* ICON */}
                  <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white">
                    <XCircle className="h-5 w-5" />
                  </div>

                  {/* TEXT */}
                  <p className="flex-1 text-sm font-medium leading-relaxed text-gray-300 sm:text-base lg:text-lg">
                    {problem}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE - SOLUTION */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[32px] border border-blue-500/20 bg-gradient-to-b from-blue-500/[0.06] to-transparent p-6 shadow-[0_0_80px_rgba(59,130,246,0.08)] backdrop-blur-2xl sm:p-8"
          >
            {/* Glow */}
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

            {/* TOP */}
            <div className="relative mb-10 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                <ShieldCheck className="h-8 w-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black uppercase tracking-wide text-white">
                  Chart Mentor
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  Your trading solution
                </p>
              </div>
            </div>

            {/* SOLUTIONS */}
            <div className="relative space-y-5">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                  }}
                  viewport={{ once: true }}
                  className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/[0.05]"
                >
                  {/* ICON */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  {/* TEXT */}
                  <p className="flex-1 text-sm font-semibold leading-relaxed text-gray-100 sm:text-base lg:text-lg">
                    {solution}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate("/login?redirect=/student/dashboard")}
              className="group mt-10 cursor-pointer flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_10px_40px_rgba(59,130,246,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_60px_rgba(59,130,246,0.45)] active:scale-[0.98] sm:px-8 sm:py-5 sm:text-sm"
            >
              Join Membership
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
