import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
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
                        Refund Policy
                    </h1>

                    {/* Spacer */}
                    <div className="w-16" />
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-8">

                {/* Intro */}
                <p className="text-sm sm:text-base leading-relaxed">
                    At <span className="font-semibold text-white">Chart Mentor</span>, we believe in providing genuine value and support to our members.
                </p>

                {/* Policy Card */}
                <section className="bg-[#161616] border border-gray-800 rounded-xl p-5 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">
                        Refund Eligibility
                    </h2>

                    <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base leading-relaxed">
                        <li>Refund requests must be made within 7 days of purchase.</li>
                        <li>Refunds are applicable only for genuine cases.</li>
                        <li>After 7 days, no refund request will be accepted.</li>
                        <li>Refund processing time is 5–7 working days.</li>
                    </ul>
                </section>

                {/* Contact Card */}
                <section className="bg-[#161616] border border-gray-800 rounded-xl p-5 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                        How to Request a Refund
                    </h2>

                    <p className="text-sm sm:text-base leading-relaxed mb-3">
                        To request a refund, please contact us:
                    </p>

                    <div className="space-y-2 text-sm sm:text-base">
                        <p>
                            📩 Email:{" "}
                            <span className="text-white font-medium">
                                support.chartmentor@gmail.com
                            </span>
                        </p>
                        <p>
                            📱 WhatsApp:{" "}
                            <span className="text-white font-medium">
                                +91 7801825312
                            </span>
                        </p>
                    </div>
                </section>

                {/* Agreement */}
                <section className="bg-[#161616] border border-gray-800 rounded-xl p-5 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                        Agreement
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        By purchasing our membership, you agree to this Refund Policy.
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