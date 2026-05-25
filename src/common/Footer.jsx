import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaTelegramPlane,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
} from "react-icons/fa";

import laptopBg from "../assets/Laptop.jpg";

const socialLinks = [
  {
    icon: FaInstagram,
    link: "https://instagram.com",
  },
  {
    icon: FaYoutube,
    link: "https://youtube.com",
  },
  {
    icon: FaTwitter,
    link: "https://twitter.com",
  },
  {
    icon: FaTelegramPlane,
    link: "https://telegram.org",
  },
];

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Membership", path: "/membership" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "FAQ", path: "/faq" },
  { name: "Contact", path: "/contact" },
];

const legalLinks = [
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms & Conditions", path: "/terms-and-conditions" },
  { name: "Refund Policy", path: "/refund-policy" },
];

export default function Footer() {
  const navigate = useNavigate();

  const handleLinkClick = (e, path) => {
    if (!path.startsWith("/")) return;

    const sectionId = path === "/" ? "home" : path.replace("/", "");

    const section = document.getElementById(sectionId);

    if (section) {
      e.preventDefault();

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    e.preventDefault();

    navigate("/");

    setTimeout(() => {
      const targetSection = document.getElementById(sectionId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#030712] text-white">

      {/* Glow Effects */}
      <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-[120px]" />

      {/* CTA SECTION */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl">

          {/* Background */}
          <div className="absolute inset-0">
            <img
              src={laptopBg}
              alt="Trading Setup"
              className="h-full w-full object-cover object-center opacity-20 lg:opacity-40"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/90 to-[#030712]/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-10 px-6 py-12 sm:px-8 md:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-20">

            {/* Left */}
            <div className="max-w-2xl">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-blue-400 sm:text-xs">
                AB AAPKI BAARI HAI
              </p>

              <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-6xl">
                Akele Mat Seekho.
                <br />

                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Sahi Guidance Ke Saath
                </span>

                <br />
                Fast Grow Karo.
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
                Join India’s growing trading mentorship community and learn
                professional trading with live sessions, expert guidance,
                and real trader support.
              </p>
            </div>

            {/* Button */}
            <div className="flex w-full lg:w-auto lg:justify-end">
              <button
                onClick={(e) => handleLinkClick(e, "/membership")}
                className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-5 text-sm font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] active:scale-[0.98] sm:w-auto"
              >
                JOIN NOW

                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="relative z-10 mx-auto mt-20 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-black uppercase tracking-tight">
                CHART
              </h2>

              <div className="mt-2 flex items-center gap-2">
                <div className="h-[2px] w-5 bg-blue-500" />

                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
                  MENTOR
                </span>

                <div className="h-[2px] w-5 bg-blue-500" />
              </div>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              Helping traders learn, grow, and become consistently profitable
              with mentorship, trading psychology, and real market knowledge.
            </p>

            {/* Social */}
            <div className="mt-8 flex flex-wrap gap-4">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;

                return (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                  >
                    <Icon className="text-lg" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-all duration-300 hover:text-blue-400"
                  >
                    <span className="h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-4" />

                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-white">
              Legal
            </h3>

            <ul className="space-y-4">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-all duration-300 hover:text-blue-400"
                  >
                    <span className="h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-4" />

                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-white">
              Contact
            </h3>

            <div className="space-y-5">

              {/* Email */}
              <a
                href="mailto:support.chartmentor@gmail.com"
                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                  <FaEnvelope />
                </div>

                <div className="overflow-hidden">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Email
                  </p>

                  <p className="truncate text-sm font-medium text-gray-300">
                    support.chartmentor@gmail.com
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+911234567890"
                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                  <FaPhoneAlt />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Phone
                  </p>

                  <p className="text-sm font-medium text-gray-300">
                    +91 12345 67890
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 rounded-[2rem] border border-yellow-500/10 bg-yellow-500/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

            <div className="max-w-4xl">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
                Important Disclaimer
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                Chart Mentor is an educational platform created for learning
                purposes only. We do not provide financial advice or guaranteed
                profit services.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                Trading in stocks, forex, and crypto involves financial risk.
                Please trade responsibly and consult your financial advisor
                before investing.
              </p>

              <p className="mt-4 text-sm font-semibold leading-relaxed text-yellow-300">
                We are NOT SEBI Registered. All mentorship, sessions, and
                educational content are strictly for informational and learning
                purposes only.
              </p>
            </div>


          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-white/5 bg-white/[0.02] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="text-center sm:text-left">
            <p className="text-xs tracking-wide text-gray-500">
              © 2026 Chart Mentor. All Rights Reserved.
            </p>

            <p className="mt-2 text-[11px] leading-relaxed text-gray-600">
              Educational Platform Only • Not Financial Advice • Not SEBI Registered
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-gray-500 sm:justify-end">
            <Link
              to="/privacy-policy"
              className="transition-colors hover:text-blue-400"
            >
              Privacy
            </Link>

            <Link
              to="/terms-and-conditions"
              className="transition-colors hover:text-blue-400"
            >
              Terms
            </Link>

            <Link
              to="/refund-policy"
              className="transition-colors hover:text-blue-400"
            >
              Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}