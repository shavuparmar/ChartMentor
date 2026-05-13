import { motion } from "framer-motion";
import {
    Users,
    MessageCircle,
    Send,
    ShieldCheck,
    TrendingUp,
    BellRing,
    Globe,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

export default function ChartMentorCommunityPage() {
    const communityFeatures = [
        {
            icon: MessageCircle,
            title: "Private WhatsApp Groups",
            description:
                "Connect directly with traders, mentors, and premium members through exclusive WhatsApp communities.",
        },
        {
            icon: Send,
            title: "Telegram Trading Channels",
            description:
                "Get instant trade alerts, market updates, mentorship notes, and live session announcements.",
        },
        {
            icon: TrendingUp,
            title: "Live Market Discussions",
            description:
                "Discuss live charts, strategies, and market psychology with experienced traders daily.",
        },
        {
            icon: BellRing,
            title: "Instant Notifications",
            description:
                "Receive important trading alerts and mentorship updates directly to your devices.",
        },
        {
            icon: Globe,
            title: "Global Trading Network",
            description:
                "Join a growing community of traders from different countries and trading markets.",
        },
        {
            icon: ShieldCheck,
            title: "Secure Member Access",
            description:
                "Only verified premium members can access private groups and mentorship discussions.",
        },
    ];

    const stats = [
        {
            title: "25K+",
            subtitle: "Community Members",
        },
        {
            title: "120+",
            subtitle: "Daily Trade Alerts",
        },
        {
            title: "24/7",
            subtitle: "Community Activity",
        },
        {
            title: "98%",
            subtitle: "Positive Feedback",
        },
    ];

    return (
        <main id="community" className="relative overflow-hidden bg-[#050816] text-white">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_30%)]" />


            <section className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-20 px-6 py-24 lg:grid-cols-2 lg:px-10">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md">
                        <Users className="h-4 w-4" />
                        Premium Trading Community Access
                    </div>

                    <h1 className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
                        Join The Most
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            {" "}
                            Active Trading Community
                        </span>
                    </h1>

                    <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
                        Connect with serious traders, get instant trade alerts, participate
                        in live discussions, and access premium mentorship communities on
                        WhatsApp and Telegram.
                    </p>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <button className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50">
                            Join Community
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>

                        <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10">
                            Explore Channels
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
                        {stats.map((item, index) => (
                            <div key={index}>
                                <h3 className="text-3xl font-black">{item.title}</h3>
                                <p className="mt-2 text-sm text-slate-400">
                                    {item.subtitle}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Community UI */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl">
                        {/* Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold">Community Dashboard</h3>
                                <p className="mt-1 text-sm text-slate-400">
                                    Live mentorship community overview
                                </p>
                            </div>

                            <div className="rounded-xl bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-400">
                                Online
                            </div>
                        </div>

                        {/* Chat Cards */}
                        <div className="space-y-5">
                            <div className="rounded-3xl border border-white/10 bg-[#0b1023] p-5">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20">
                                        <Send className="h-6 w-6 text-cyan-400" />
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold">
                                            Telegram Premium Channel
                                        </h4>
                                        <p className="mt-2 text-sm leading-7 text-slate-400">
                                            Live trade alerts, mentorship updates, and market analysis.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20">
                                        <MessageCircle className="h-6 w-6 text-emerald-400" />
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold">
                                            WhatsApp Mentorship Group
                                        </h4>
                                        <p className="mt-2 text-sm leading-7 text-slate-400">
                                            Direct discussions with mentors and active trading members.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20">
                                        <BellRing className="h-6 w-6 text-purple-400" />
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold">
                                            Instant Trade Notifications
                                        </h4>
                                        <p className="mt-2 text-sm leading-7 text-slate-400">
                                            Stay updated with every important market movement instantly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-4xl font-black sm:text-5xl lg:text-6xl">
                        Why Our
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            {" "}
                            Community Stands Out
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        Built for traders who want growth, discipline, and real mentorship.
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {communityFeatures.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                                viewport={{ once: true }}
                                className="rounded-[30px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-cyan-400/5"
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

            {/* Membership CTA */}
            <section className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-10 backdrop-blur-2xl"
                >
                    <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
                        <div className="max-w-2xl">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300">
                                <CheckCircle2 className="h-4 w-4" />
                                Verified Premium Membership Access
                            </div>

                            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
                                Ready To Join Our Trading Community?
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-300">
                                Unlock private channels, mentorship groups, live trade alerts,
                                and connect with thousands of traders worldwide.
                            </p>
                        </div>

                        <button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50">
                            Get Community Access
                        </button>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
