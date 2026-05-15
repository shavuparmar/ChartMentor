import React from "react";
import ChartMentorNavbar from "../common/Header";
import HeroSection from "../common/HeroSection";
import ProblemSolution from "../common/ProblemSolutionSection";
import MembershipFeatures from "../common/MentorShipSection";
import AboutSection from "../common/AboutSection";
import PricingSection from "../common/PricingSection";
import HowItWorks from "../common/ThreeSteps";
import MemberBenefits from "../common/MemberBenefits";
import FAQSection from "../common/FAQSection";
import ChartMentorContactPage from "../common/ContactPage";
import Footer from "../common/Footer";
import TestimonialsSection from "../common/TestimonialsSection";

export default function LandingPage() {
  return (
    <div className="bg-[#040816] min-h-screen">
      <ChartMentorNavbar />
      <HeroSection />
      <ProblemSolution/>
      <MembershipFeatures/>
      <AboutSection/>
      <HowItWorks/>
      <MemberBenefits/>
      <PricingSection/>
      <TestimonialsSection/>
      <FAQSection/>
      <ChartMentorContactPage/>
      <Footer/>
    </div>
  );
}
