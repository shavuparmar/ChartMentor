export function ChartMentorFooter() {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-[#050816] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_30%)]" />

            <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-4 lg:px-10">
                {/* Brand */}
                <div>
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-lg shadow-cyan-500/20">
                            <span className="text-xl font-black text-white">C</span>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black tracking-tight">
                                Chart<span className="text-cyan-400">Mentor</span>
                            </h2>
                            <p className="text-xs text-slate-400">
                                Learn Trading Professionally
                            </p>
                        </div>
                    </div>

                    <p className="max-w-sm text-sm leading-7 text-slate-400">
                        Premium trading mentorship platform with live market learning,
                        private communities, strategy sharing, and advanced educational
                        resources for modern traders.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="mb-5 text-lg font-semibold text-white">Navigation</h3>

                    <ul className="space-y-3 text-sm text-slate-400">
                        <li>
                            <a href="#" className="transition hover:text-cyan-400">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition hover:text-cyan-400">
                                Features
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition hover:text-cyan-400">
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition hover:text-cyan-400">
                                Mentorship
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Community */}
                <div>
                    <h3 className="mb-5 text-lg font-semibold text-white">Community</h3>

                    <ul className="space-y-3 text-sm text-slate-400">
                        <li>
                            <a href="#" className="transition hover:text-cyan-400">
                                Telegram Access
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition hover:text-cyan-400">
                                WhatsApp Group
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition hover:text-cyan-400">
                                Discord Server
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition hover:text-cyan-400">
                                Trading Support
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="mb-5 text-lg font-semibold text-white">
                        Join Newsletter
                    </h3>

                    <p className="mb-5 text-sm leading-6 text-slate-400">
                        Get premium trading insights, market updates, and mentorship news.
                    </p>

                    <div className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                        />

                        <button className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/40">
                            Subscribe Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="relative border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500 lg:flex-row lg:px-10">
                    <p>© 2026 ChartMentor. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <a href="#" className="transition hover:text-cyan-400">
                            Privacy Policy
                        </a>
                        <a href="#" className="transition hover:text-cyan-400">
                            Terms of Service
                        </a>
                        <a href="#" className="transition hover:text-cyan-400">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function ChartMentorHeader() {
    const navLinks = [
        "Home",
        "Features",
        "Pricing",
        "Mentorship",
        "Community",
        "Contact",
    ];

    return (
        <header className="w-full border-b border-white/10 bg-[#050816]/95 backdrop-blur-xl sticky top-0 z-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
                {/* Logo */}
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-lg shadow-cyan-500/20">
                        <span className="text-xl font-black text-white">C</span>
                    </div>

                    <div className="leading-tight">
                        <h1 className="text-2xl font-black tracking-tight text-white">
                            Chart<span className="text-cyan-400">Mentor</span>
                        </h1>
                        <p className="text-xs text-slate-400">
                            Trading • Learning • Community
                        </p>
                    </div>
                </div>

                {/* Right Side Navigation */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="relative text-sm font-medium text-slate-300 transition-all duration-300 hover:text-cyan-400"
                        >
                            {link}
                        </a>
                    ))}

                    <button className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40">
                        Join Membership
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button>
            </div>
        </header>
    );
}
