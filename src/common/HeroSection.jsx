import { motion } from "framer-motion";
import {
    ArrowRight,
    Play,
    TrendingUp,
    ShieldCheck,
    Users,
    BarChart3,
} from "lucide-react";

export default function ChartMentorHero() {
    return (
        <section id="home" className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_28%)]" />

            <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

            {/* Grid */}
            <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-20 px-6 py-24 lg:grid-cols-2 lg:px-10">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Badge */}
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-cyan-400" />
                        India’s Premium Trading Mentorship Platform
                    </div>

                    {/* Heading */}
                    <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                        Learn Smart Trading
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            {" "}
                            With Experts
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
                        Join ChartMentor and unlock advanced market strategies, live chart
                        analysis, private trading communities, mentorship sessions, and
                        professional guidance built for serious traders.
                    </p>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <button className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50">
                            Join Membership
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>

                        <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10">
                            <Play className="h-5 w-5" />
                            Watch Demo
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
                        <div>
                            <h3 className="text-3xl font-black text-white">25K+</h3>
                            <p className="mt-2 text-sm text-slate-400">Members</p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-black text-white">98%</h3>
                            <p className="mt-2 text-sm text-slate-400">Success Rate</p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-black text-white">24/7</h3>
                            <p className="mt-2 text-sm text-slate-400">Support</p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-black text-white">150+</h3>
                            <p className="mt-2 text-sm text-slate-400">Strategies</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side UI */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex items-center justify-center"
                >
                    {/* Main Card */}
                    <div className="relative w-full max-w-2xl overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl">
                        {/* Top */}
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    Live Market Dashboard
                                </h3>
                                <p className="mt-1 text-sm text-slate-400">
                                    Real-time trading mentorship insights
                                </p>
                            </div>

                            <div className="rounded-xl bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-400">
                                Market Live
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="relative h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-[#0b1023] p-6">
                            {/* Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

                            {/* SVG Chart */}
                            <svg
                                viewBox="0 0 600 300"
                                className="relative z-10 h-full w-full"
                            >
                                <defs>
                                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#22d3ee" />
                                        <stop offset="100%" stopColor="#3b82f6" />
                                    </linearGradient>
                                </defs>

                                <path
                                    d="M0 260 C 60 180, 120 200, 180 120 S 320 40, 420 120 S 520 220, 600 50"
                                    fill="none"
                                    stroke="url(#lineGradient)"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                />
                            </svg>

                            {/* Floating Cards */}
                            <div className="absolute left-5 top-5 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                                    <div>
                                        <p className="text-xs text-slate-400">Monthly Profit</p>
                                        <h4 className="mt-1 text-2xl font-bold text-emerald-400">
                                            +248%
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-5 right-5 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <BarChart3 className="h-5 w-5 text-cyan-400" />
                                    <div>
                                        <p className="text-xs text-slate-400">Winning Trades</p>
                                        <h4 className="mt-1 text-2xl font-bold text-cyan-400">
                                            84%
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Features */}
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <ShieldCheck className="mb-3 h-6 w-6 text-cyan-400" />
                                <h4 className="font-semibold text-white">Secure Access</h4>
                                <p className="mt-1 text-sm text-slate-400">
                                    Protected member-only community.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <Users className="mb-3 h-6 w-6 text-purple-400" />
                                <h4 className="font-semibold text-white">Private Community</h4>
                                <p className="mt-1 text-sm text-slate-400">
                                    Telegram & WhatsApp access.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <TrendingUp className="mb-3 h-6 w-6 text-emerald-400" />
                                <h4 className="font-semibold text-white">Live Analysis</h4>
                                <p className="mt-1 text-sm text-slate-400">
                                    Daily expert trading insights.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
