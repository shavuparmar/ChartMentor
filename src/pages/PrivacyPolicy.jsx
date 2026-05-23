import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>

          {/* Spacer */}
          <div className="w-16" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-8">

        {/* Intro */}
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          At <span className="font-semibold text-white">Chart Mentor</span>, we respect your privacy and are committed to protecting your personal information.
        </p>

        {/* Section Card */}
        <section className="bg-[#161616] border border-gray-800 rounded-xl p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white">
            Information We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
            <li>Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Payment Details</li>
            <li>Communication Information</li>
          </ul>
        </section>

        <section className="bg-[#161616] border border-gray-800 rounded-xl p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
            <li>To provide membership access</li>
            <li>To offer support and guidance</li>
            <li>To send important updates</li>
            <li>To improve our services</li>
          </ul>
        </section>

        <section className="bg-[#161616] border border-gray-800 rounded-xl p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white">
            Data Protection
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            We implement appropriate security measures to protect your personal
            information. Your data is stored securely and used only for business
            and support purposes.
          </p>
        </section>

        <section className="bg-[#161616] border border-gray-800 rounded-xl p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white">
            Third-Party Sharing
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            We do not sell or share your personal information with third parties
            without permission, except when required by law.
          </p>
        </section>

        <section className="bg-[#161616] border border-gray-800 rounded-xl p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-white">
            Your Consent
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            By using Chart Mentor services, you agree to this Privacy Policy.
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