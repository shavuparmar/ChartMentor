import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

export default function ChartMentorPricing() {
    const plans = [
        {
            name: "Starter",
            price: "₹499",
            duration: "/month",
            description: "Perfect for beginners entering the trading world.",
            features: [
                "Basic Trading Lessons",
                "Telegram Community Access",
                "Daily Market Updates",
                "Beginner Strategies",

            ],
            popular: false,
            button: "Get Started",
        },
        {
            name: "Pro Mentor",
            price: "₹1499",
            duration: "/month",
            description: "Advanced mentorship for serious traders and investors.",
            features: [
                "Everything In Starter",
                "Live Trading Sessions",
                "Advanced Chart Analysis",
                "Private WhatsApp Group",
                "Premium Trading Strategies",
                "Direct Mentor Guidance",
                "Priority Support",
            ],
            popular: true,
            button: "Join Pro Membership",
        },
        {
            name: "Elite Lifetime",
            price: "₹9999",
            duration: "one time",
            description: "Lifetime premium access for professional traders.",
            features: [
                "Lifetime Membership",
                "All Future Courses Included",
                "VIP Community Access",
                "Exclusive Market Webinars",
                "1-on-1 Mentorship Sessions",
                "Priority Trade Alerts",
                "Lifetime Premium Support",
            ],
            popular: false,
            button: "Get Lifetime Access",
        },
    ];

    return (
        <section id="pricing" className="relative overflow-hidden bg-[#050816] py-24 text-white">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_30%)]" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md">
                        <Sparkles className="h-4 w-4" />
                        Flexible Membership Plans
                    </div>

                    <h2 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                        Choose Your
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            {" "}
                            Trading Plan
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        Unlock premium trading mentorship, private communities, and expert
                        market guidance with plans designed for every trader.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`group relative overflow-hidden rounded-[36px] border p-8 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-3 ${plan.popular
                                ? "border-cyan-400/40 bg-gradient-to-b from-cyan-500/10 to-blue-500/10 shadow-2xl shadow-cyan-500/20"
                                : "border-white/10 bg-white/5 hover:border-cyan-400/20"
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-cyan-500/30">
                                    Most Popular
                                </div>
                            )}

                            {/* Glow */}
                            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.16),transparent_55%)]" />

                            {/* Content */}
                            <div className="relative">
                                <h3 className="text-2xl font-black text-white">
                                    {plan.name}
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-slate-400">
                                    {plan.description}
                                </p>

                                {/* Price */}
                                <div className="mt-8 flex items-end gap-2">
                                    <span className="text-5xl font-black text-white">
                                        {plan.price}
                                    </span>
                                    <span className="pb-2 text-sm text-slate-400">
                                        {plan.duration}
                                    </span>
                                </div>

                                {/* Divider */}
                                <div className="my-8 h-px w-full bg-white/10" />

                                {/* Features */}
                                <ul className="space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20">
                                                <Check className="h-3.5 w-3.5 text-cyan-400" />
                                            </div>

                                            <span className="text-sm leading-7 text-slate-300">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <button
                                    className={`mt-10 w-full rounded-2xl px-6 py-4 text-sm font-semibold transition-all duration-300 ${plan.popular
                                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/30 hover:scale-[1.02] hover:shadow-cyan-500/50"
                                        : "border border-white/10 bg-white/5 text-white hover:border-cyan-400/30 hover:bg-cyan-400/10"
                                        }`}
                                >
                                    {plan.button}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Note */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm leading-7 text-slate-500">
                        Secure payments powered by Razorpay. Cancel or upgrade your
                        membership anytime.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
