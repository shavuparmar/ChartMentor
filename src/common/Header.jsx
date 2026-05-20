import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Logo from "./Logo";

const navLinks = [
  { name: "Home", href: "home" },
  { name: "Problems", href: "problems" },
  { name: "About", href: "about" },
  { name: "Benefits", href: "membership" },
  { name: "Pricing", href: "pricing" },
  { name: "FAQ", href: "faq" },
  { name: "Contact", href: "contact" },
];

export default function ChartMentorNavbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      navLinks.forEach((link) => {
        const section = document.getElementById(link.href);

        if (section) {
          const top = section.offsetTop - 140;
          const height = section.offsetHeight;

          if (window.scrollY >= top && window.scrollY < top + height) {
            setActive(link.href);
          }
        }
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth Scroll
  const handleScrollTo = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }

    setMobileMenu(false);
  };

  return (
    <header
      className={`fixed left-0 top-0 z-[999] w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#030712]/75 py-3 backdrop-blur-2xl"
          : "bg-transparent py-5"
      }`}
    >
      {/* TOP GLOW */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[180px] w-[180px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* LOGO */}
        <motion.button
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => handleScrollTo("home")}
          className="group flex items-center gap-3"
        >
          {/* Logo Image */}
          <div className="group relative flex items-center justify-center">
            {/* Animated Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/30 to-cyan-400/20 blur-2xl transition-all duration-700 group-hover:scale-125" />

            {/* Rotating Border */}
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-2xl">
              <Logo size={48} color="white" backgroundColor="#0f172a" />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-start leading-none">
            <h1 className="text-base font-black uppercase tracking-tight text-white sm:text-lg">
              CHART
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                MENTOR
              </span>
            </h1>

            <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.28em] text-gray-400 sm:text-[9px]">
              MASTER THE MARKET
            </span>
          </div>
        </motion.button>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-2 backdrop-blur-2xl lg:flex">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleScrollTo(link.href)}
              className={`relative overflow-hidden rounded-full px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 xl:px-5 ${
                active === link.href
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {/* ACTIVE GLOW */}
              {active === link.href && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_30px_rgba(59,130,246,0.35)]"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}

              <span className="relative z-10">{link.name}</span>
            </motion.button>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex items-center gap-3"
        >
          {user ? (
            <button
              onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard')}
              className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-[0_0_30px_rgba(59,130,246,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(59,130,246,0.35)] xl:px-6"
            >
              Dashboard
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-2xl transition-all duration-300 hover:bg-white/[0.08] hover:scale-105 xl:px-6"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('/student/register')}
                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-[0_0_30px_rgba(59,130,246,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(59,130,246,0.35)] xl:px-6"
              >
                Sign Up
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </>
          )}
        </motion.div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.08] lg:hidden"
        >
          {mobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 top-full w-full border-b border-white/10 bg-[#030712]/95 backdrop-blur-3xl lg:hidden"
          >
            <div className="flex flex-col gap-3 px-5 py-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleScrollTo(link.href)}
                  className={`rounded-2xl px-5 py-4 text-left text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    active === link.href
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-white/[0.03] text-gray-400 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}

              {/* MOBILE CTA */}
              {user ? (
                <button
                  onClick={() => {
                    setMobileMenu(false);
                    navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
                  }}
                  className="mt-2 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-blue-600/20"
                >
                  Dashboard
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="mt-2 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setMobileMenu(false);
                      navigate('/login');
                    }}
                    className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenu(false);
                      navigate('/student/register');
                    }}
                    className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-blue-600/20"
                  >
                    Sign Up
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
