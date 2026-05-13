import { motion } from "framer-motion";
import {
    ShieldCheck,
    TrendingUp,
    Users,
    BarChart3,
    BadgeDollarSign,
    BookOpen,
    BellRing,
    Smartphone,
} from "lucide-react";

export default function ChartMentorFeatures() {
    const features = [
        {
            icon: TrendingUp,
            title: "Live Trading Analysis",
            description:
                "Get real-time market breakdowns, chart patterns, and expert trade setups every day.",
        },
        {
            icon: Users,
            title: "Private Community Access",
            description:
                "Join exclusive Telegram and WhatsApp groups with active traders and mentors.",
        },
        {
            icon: ShieldCheck,
            title: "Premium Membership",
            description:
                "Unlock premium educational resources, mentorship calls, and advanced strategies.",
        },
        {
            icon: BarChart3,
            title: "Advanced Chart Strategies",
            description:
                "Learn institutional trading concepts, price action, and smart money strategies.",
        },
        {
            icon: BadgeDollarSign,
            title: "Coupon & Discounts",
            description:
                "Apply membership coupons and get instant discounts on premium plans.",
        },
        {
            icon: BookOpen,
            title: "Trading Learning Hub",
            description:
                "Step-by-step trading lessons, PDFs, recorded sessions, and practical guidance.",
        },
        {
            icon: BellRing,
            title: "Instant Trade Alerts",
            description:
                "Receive important market updates and trading alerts directly to your devices.",
        },
        {
            icon: Smartphone,
            title: "Fully Mobile Friendly",
            description:
                "Access your dashboard, mentorship, and community seamlessly on every device.",
        },
    ];

    return (
        <section id="features" className="relative overflow-hidden bg-[#050816] py-24 text-white">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_28%)]" />

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
                        <span className="h-2 w-2 rounded-full bg-cyan-400" />
                        Powerful Features For Modern Traders
                    </div>

                    <h2 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                        Everything You Need To
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            {" "}
                            Master Trading
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        ChartMentor provides advanced mentorship tools, premium resources,
                        and professional trading guidance designed for serious traders.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-cyan-400/5"
                            >
                                {/* Glow */}
                                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.18),transparent_55%)]" />

                                {/* Icon */}
                                <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/20">
                                    <Icon className="h-8 w-8 text-cyan-400" />
                                </div>

                                {/* Content */}
                                <div className="relative">
                                    <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-slate-400">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Bottom Border Glow */}
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mt-24 overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-10 backdrop-blur-2xl"
                >
                    <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
                        <div className="max-w-2xl">
                            <h3 className="text-3xl font-black leading-tight text-white sm:text-4xl">
                                Start Your Professional Trading Journey Today
                            </h3>

                            <p className="mt-5 text-lg leading-8 text-slate-300">
                                Join thousands of traders already learning with ChartMentor and
                                gain access to premium mentorship resources.
                            </p>
                        </div>

                        <button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50">
                            Join Membership
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
