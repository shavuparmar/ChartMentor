import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function ChartMentorHeader() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [active, setActive] = useState("home");

    const navLinks = [
        { name: "Home", id: "home" },
        { name: "Features", id: "features" },
        { name: "Pricing", id: "pricing" },
        { name: "Mentorship", id: "mentorship" },
        { name: "Community", id: "community" },
        { name: "Contact", id: "contact" },
    ];

    // Smooth scroll
    const handleScroll = (id) => {
        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            setActive(id);
            setMobileMenu(false);
        }
    };

    // Active section on scroll
    useEffect(() => {
        const handleActiveSection = () => {
            const scrollPosition = window.scrollY + 150;

            navLinks.forEach((link) => {
                const section = document.getElementById(link.id);

                if (section) {
                    const offsetTop = section.offsetTop;
                    const height = section.offsetHeight;

                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + height
                    ) {
                        setActive(link.id);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleActiveSection);

        return () => {
            window.removeEventListener("scroll", handleActiveSection);
        };
    }, []);

    return (
        <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050816]/80 backdrop-blur-2xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">

                {/* Logo */}
                <div
                    onClick={() => handleScroll("home")}
                    className="flex cursor-pointer items-center gap-3"
                >
                    <Logo
                        size={60}
                        color="#ffffff"
                        backgroundColor="transparent"
                    />

                    <div className="leading-tight">
                        <h1 className="text-2xl font-black tracking-tight text-white">
                            Chart
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Mentor
                            </span>
                        </h1>

                        <p className="text-xs tracking-wide text-slate-400">
                            Trading • Learning • Community
                        </p>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleScroll(link.id)}
                            className={`relative text-sm font-semibold transition-all duration-300 ${active === link.id
                                ? "text-cyan-400"
                                : "text-slate-300 hover:text-cyan-400"
                                }`}
                        >
                            {link.name}

                            <span
                                className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${active === link.id
                                    ? "w-full"
                                    : "w-0 group-hover:w-full"
                                    }`}
                            />
                        </button>
                    ))}

                    {/* CTA */}
                    <button
                        onClick={() => handleScroll("pricing")}
                        className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
                    >
                        Join Membership
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenu(!mobileMenu)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 lg:hidden"
                >
                    {mobileMenu ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`overflow-hidden border-t border-white/10 bg-[#050816]/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${mobileMenu ? "max-h-[500px] py-6" : "max-h-0"
                    }`}
            >
                <div className="flex flex-col gap-2 px-6">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleScroll(link.id)}
                            className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${active === link.id
                                ? "bg-cyan-500/10 text-cyan-400"
                                : "text-slate-300 hover:bg-white/5 hover:text-cyan-400"
                                }`}
                        >
                            {link.name}
                        </button>
                    ))}

                    <button
                        onClick={() => handleScroll("pricing")}
                        className="mt-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
                    >
                        Join Membership
                    </button>
                </div>
            </div>
        </header>
    );
}