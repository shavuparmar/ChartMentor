import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
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
                        Terms & Conditions
                    </h1>

                    {/* Spacer */}
                    <div className="w-16" />
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-8">

                {/* Intro */}
                <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                    By accessing or purchasing{" "}
                    <span className="font-semibold text-white">Chart Mentor</span>{" "}
                    membership, you agree to the following terms and conditions.
                </p>

                {/* Terms List */}
                <section className="bg-[#161616] border border-gray-800 rounded-xl p-5 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">
                        Terms of Use
                    </h2>

                    <ol className="list-decimal pl-5 space-y-3 text-sm sm:text-base leading-relaxed">
                        <li>Chart Mentor is an educational and mentorship platform only.</li>
                        <li>We do not provide any guaranteed profits or fixed returns.</li>
                        <li>Trading and investing involve market risks.</li>
                        <li>Members are responsible for their own trading decisions.</li>
                        <li>Membership access is non-transferable.</li>
                        <li>Sharing private group content without permission is strictly prohibited.</li>
                        <li>Misuse, abuse, or disrespectful behavior may lead to membership removal.</li>
                        <li>All educational content provided is for learning purposes only.</li>
                        <li>Refunds are subject to our Refund Policy.</li>
                        <li>Chart Mentor reserves the right to update policies and services anytime.</li>
                        <li>
                            Live market sessions are strictly for educational purposes only.
                            Members are fully responsible for their trading decisions, profits, and losses.
                        </li>
                    </ol>
                </section>

                {/* Agreement */}
                <section className="bg-[#161616] border border-gray-800 rounded-xl p-5 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                        Agreement
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        By joining Chart Mentor, you acknowledge and accept these terms.
                    </p>
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