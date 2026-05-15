import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Crown,
  Zap,
} from "lucide-react";

const features = [
  "Daily Market Analysis",
  "Trading Roadmap",
  "High Probability Setups",
  "Risk Management",
  "Live Doubt Sessions",
  "Mindset & Discipline",
  "Personal Guidance & Support",
  "Premium Community Access",
];

const plans = [
  {
    name: "MONTHLY PLAN",
    oldPrice: "₹4000",
    price: "₹1999",
    duration: "/month",
    icon: Zap,
    popular: false,
  },
  {
    name: "QUARTERLY PLAN",
    oldPrice: "₹11000",
    price: "₹4999",
    duration: "/3 months",
    icon: Crown,
    popular: true,
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#030712] px-5 py-24 text-white lg:px-10"
    >
      {/* BACKGROUND GLOWS */}
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
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-blue-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            MEMBERSHIP PLANS
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Simple Pricing,
            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Big Value
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Get access to premium mentorship, market analysis,
            live sessions, and a complete trading ecosystem.
          </p>
        </motion.div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {plans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-[36px] border p-8 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 sm:p-10 ${
                  plan.popular
                    ? "border-blue-500/30 bg-gradient-to-b from-blue-500/[0.08] to-transparent shadow-[0_0_80px_rgba(59,130,246,0.15)]"
                    : "border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02]"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute right-5 top-5 rounded-full border border-blue-500/30 bg-blue-500/20 px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">
                    Most Popular
                  </div>
                )}

                {/* Glow */}
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

                {/* ICON */}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10 text-blue-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-10 w-10" />
                </div>

                {/* PLAN NAME */}
                <h3 className="relative mt-8 text-sm font-black uppercase tracking-[0.35em] text-gray-400">
                  {plan.name}
                </h3>

                {/* PRICE */}
                <div className="relative mt-8">
                  <span className="text-xl text-gray-500 line-through">
                    {plan.oldPrice}
                  </span>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-5xl font-black sm:text-6xl">
                      {plan.price}
                    </span>

                    <span className="pb-2 text-sm text-gray-400">
                      {plan.duration}
                    </span>
                  </div>
                </div>

                {/* OFFER */}
                <div className="mt-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">
                  LIMITED OFFER
                </div>

                <p className="mt-3 text-sm text-gray-400">
                  For First 200 Members Only
                </p>

                {/* FEATURES */}
                <div className="mt-10 space-y-4">

                  {features.slice(0, 5).map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                        <Check className="h-4 w-4" />
                      </div>

                      <span className="text-sm text-gray-300 sm:text-base">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* BUTTON */}
                <button className="group/button mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-5 text-sm font-black uppercase tracking-[0.25em] text-white shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(59,130,246,0.4)]">
                  JOIN NOW

                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-1" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* ALL FEATURES */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-14 rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-8 backdrop-blur-2xl sm:p-10"
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-2xl font-black uppercase tracking-wide">
                Everything Included
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Premium trading mentorship features
              </p>
            </div>
          </div>

          {/* FEATURES GRID */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/[0.04]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Check className="h-4 w-4" />
                </div>

                <span className="text-sm font-medium text-gray-200">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* REFUND BOX */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-14 overflow-hidden rounded-[36px] border border-blue-500/20 bg-gradient-to-r from-blue-500/[0.08] to-indigo-500/[0.05] p-8 backdrop-blur-2xl sm:p-10"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

            {/* ICON */}
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-500/10 text-blue-400">
              <ShieldCheck className="h-12 w-12" />
            </div>

            {/* CONTENT */}
            <div className="flex-1">
              <h3 className="text-2xl font-black uppercase tracking-wide text-blue-300">
                7 Days Refund Guarantee
              </h3>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-300">
                Agar aapko 7 days ke andar membership worth it nahi
                laga, to aapka pura paisa refund kar diya jayega.
                No Questions Asked.
              </p>
            </div>

            {/* CTA */}
            <button className="rounded-2xl border border-blue-500/20 bg-blue-600 px-8 py-5 text-sm font-black uppercase tracking-[0.25em] text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700">
              JOIN TODAY
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}