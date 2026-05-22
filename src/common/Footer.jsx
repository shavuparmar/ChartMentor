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
  { name: "Terms & Conditions", path: "/terms" },
  { name: "Refund Policy", path: "/refund-policy" },
];

export default function Footer() {
  const navigate = useNavigate();

  const handleLinkClick = (e, path) => {
    if (path.startsWith("/")) {
      const sectionId = path === "/" ? "home" : path.replace("/", "");
      const section = document.getElementById(sectionId);
      if (section) {
        e.preventDefault();
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        e.preventDefault();
        navigate("/");
        setTimeout(() => {
          const targetSection = document.getElementById(sectionId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#030712] text-white">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-[120px]" />

      {/* CTA SECTION */}
      <div className="relative z-20 mx-auto max-w-7xl px-5 pt-20 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl">

          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={laptopBg}
              alt="Trading Setup"
              className="h-full w-full object-cover object-center opacity-20 lg:opacity-40"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/90 to-[#030712]/30" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-10 px-6 py-14 md:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-20">
            
            {/* Left */}
            <div className="max-w-2xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-blue-400">
                AB AAPKI BAARI HAI
              </p>

              <h2 className="text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Akele Mat Seekho.
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Sahi Guidance Ke Saath
                </span>
                <br />
                Fast Grow Karo.
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
                Join India’s fast growing trading mentorship community and
                learn professional trading with real guidance and live support.
              </p>
            </div>

            {/* Right Button */}
            <div className="flex lg:justify-end">
              <button
                onClick={(e) => handleLinkClick(e, "/membership")}
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-5 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] cursor-pointer"
              >
                JOIN NOW
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="relative z-10 mx-auto mt-24 max-w-7xl px-5 pb-10 lg:px-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-black uppercase tracking-tight">
                CHART
              </h2>

              <div className="mt-1 flex items-center gap-2">
                <div className="h-[2px] w-5 bg-blue-500" />

                <span className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400">
                  MENTOR
                </span>

                <div className="h-[2px] w-5 bg-blue-500" />
              </div>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              Helping traders learn, grow, and become consistently profitable
              with professional mentorship and community support.
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
              <a
                href="mailto:hello@chartmentor.in"
                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                  <FaEnvelope />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Email
                  </p>

                  <p className="text-sm font-medium text-gray-300">
                    hello@chartmentor.in
                  </p>
                </div>
              </a>

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

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-5 text-center sm:flex-row">
          <p className="text-xs tracking-wide text-gray-500">
            © 2026 Chart Mentor. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5 text-xs text-gray-500">
            <Link to="/privacy-policy" className="hover:text-blue-400">
              Privacy
            </Link>

            <Link to="/terms" className="hover:text-blue-400">
              Terms
            </Link>

            <Link to="/refund-policy" className="hover:text-blue-400">
              Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}