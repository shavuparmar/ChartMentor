import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Sitemap() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-gray-300">

            {/* Header */}
            <div className="fixed top-0 left-0 w-full z-50 bg-[#0f0f0f] border-b border-gray-800">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">

                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                    >
                        <ArrowLeft size={18} />
                        <span className="text-sm sm:text-base">Back</span>
                    </button>

                    {/* Title */}
                    <h1 className="text-base sm:text-lg font-semibold text-white">
                        Sitemap
                    </h1>

                    {/* Spacer */}
                    <div className="w-16" />
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-8">

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    Explore all important pages of{" "}
                    <span className="font-semibold text-white">Chart Mentor</span>.
                </p>

                {/* Main Pages */}
                <section className="bg-[#161616] border border-gray-800 rounded-xl p-5 sm:p-6">
                    <h2 className="text-lg font-semibold mb-4 text-white">
                        Main Pages
                    </h2>

                    <ul className="space-y-2 text-sm sm:text-base">
                        <li className="hover:text-white cursor-pointer">Home</li>
                        <li className="hover:text-white cursor-pointer">About Us</li>
                        <li className="hover:text-white cursor-pointer">Courses / Membership</li>
                        <li className="hover:text-white cursor-pointer">Dashboard</li>
                    </ul>
                </section>

                {/* Legal Pages */}
                <section className="bg-[#161616] border border-gray-800 rounded-xl p-5 sm:p-6">
                    <h2 className="text-lg font-semibold mb-4 text-white">
                        Legal Pages
                    </h2>

                    <ul className="space-y-2 text-sm sm:text-base">
                        <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                        <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
                        <li className="hover:text-white cursor-pointer">Refund Policy</li>
                    </ul>
                </section>

                {/* Support */}
                <section className="bg-[#161616] border border-gray-800 rounded-xl p-5 sm:p-6">
                    <h2 className="text-lg font-semibold mb-4 text-white">
                        Support
                    </h2>

                    <ul className="space-y-2 text-sm sm:text-base">
                        <li className="hover:text-white cursor-pointer">
                            Contact Support
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            FAQs
                        </li>
                        <li className="hover:text-white cursor-pointer">
                            WhatsApp Help
                        </li>
                    </ul>
                </section>

                {/* Footer */}
                <div className="text-center pt-6 border-t border-gray-800">
                    <p className="text-xs sm:text-sm text-gray-500">
                        Last updated: May 2026
                    </p>
                </div>

            </div>
        </div>
    );
}