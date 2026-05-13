import { motion } from "framer-motion";
import {
    CalendarDays,
    Users,
    TrendingUp,
    ShieldCheck,
    PlayCircle,
    ArrowRight,
    Star,
    MessageSquare,
} from "lucide-react";

export default function ChartMentorMentorshipPage() {
    const mentorshipFeatures = [
        {
            icon: TrendingUp,
            title: "Live Market Sessions",
            description:
                "Daily live chart analysis with real market breakdowns and trading psychology guidance.",
        },
        {
            icon: Users,
            title: "Private Trading Community",
            description:
                "Join serious traders in exclusive Telegram and WhatsApp mentorship groups.",
        },
        {
            icon: CalendarDays,
            title: "Weekly Mentorship Calls",
            description:
                "Interactive Q&A sessions and strategy discussions with experienced mentors.",
        },
        {
            icon: ShieldCheck,
            title: "Premium Strategy Access",
            description:
                "Get advanced smart money concepts, price action setups, and risk management systems.",
        },
    ];

    const testimonials = [
        {
            name: "Rahul Mehta",
            role: "Forex Trader",
            review:
                "ChartMentor completely changed my trading discipline and helped me become consistently profitable.",
        },
        {
            name: "Priya Shah",
            role: "Stock Market Learner",
            review:
                "The mentorship calls and community support are incredible. I learned more here than anywhere else.",
        },
        {
            name: "Arjun Patel",
            role: "Crypto Trader",
            review:
                "Professional guidance, powerful strategies, and a very active trading community.",
        },
    ];

    return (
        <main id="mentorship" className="relative overflow-hidden bg-[#050816] text-white">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_30%)]" />
            {/* Features */}
            <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-4xl font-black sm:text-5xl lg:text-6xl">
                        Why Traders Choose
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            {" "}
                            ChartMentor
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        Everything you need to grow from beginner to professional trader.
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {mentorshipFeatures.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                                viewport={{ once: true }}
                                className="rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-cyan-400/5"
                            >
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                                    <Icon className="h-8 w-8 text-cyan-400" />
                                </div>

                                <h3 className="text-xl font-bold">{feature.title}</h3>

                                <p className="mt-4 text-sm leading-7 text-slate-400">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Testimonials */}
            <section className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-10">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-4xl font-black sm:text-5xl">
                        What Our Members Say
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        Thousands of traders trust ChartMentor for professional mentorship.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
                        >
                            <div className="mb-5 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="h-5 w-5 fill-cyan-400 text-cyan-400"
                                    />
                                ))}
                            </div>

                            <p className="text-sm leading-8 text-slate-300">
                                “{item.review}”
                            </p>

                            <div className="mt-8">
                                <h4 className="text-lg font-bold">{item.name}</h4>
                                <p className="text-sm text-slate-400">{item.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
