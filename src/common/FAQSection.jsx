import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Trading seekhne mein kitna time lagega?",
    answer:
      "Yeh aapki mehnat aur discipline par depend karta hai. Hamara roadmap 3 mahine mein aapko basics se advanced level tak le jaane ke liye design kiya gaya hai.",
  },
  {
    question: "Kya mujhe bohot bade capital ki zaroorat hai?",
    answer:
      "Nahi, aap chote capital se seekhna shuru kar sakte hain. Pehle learning aur risk management par focus karein, capital gradually grow hoga.",
  },
  {
    question: "Telegram group mein kya access milega?",
    answer:
      "Aapko exclusive trade setups, daily analysis, premium learning resources aur mentor support milega.",
  },
  {
    question: "Refund policy kya hai?",
    answer:
      "Hum 7-days refund guarantee provide karte hain. Agar aapko membership valuable nahi lagti, toh aapka refund process kar diya jayega.",
  },
  {
    question: "Live sessions kab hote hain?",
    answer:
      "Weekly live sessions conduct kiye jaate hain jahan market analysis aur doubt solving hota hai. Recordings bhi available rehti hain.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#030712] px-5 py-24 text-white lg:px-10"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-4xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-blue-300 backdrop-blur-xl">
            <HelpCircle className="h-4 w-4" />
            SUPPORT & HELP
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Frequently Asked
            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Trading mentorship aur membership related sabhi important
            questions ke answers yahan available hain.
          </p>
        </motion.div>

        {/* FAQ LIST */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              className={`group overflow-hidden rounded-[28px] border backdrop-blur-2xl transition-all duration-500 ${
                activeIndex === index
                  ? "border-blue-500/30 bg-white/[0.05] shadow-[0_15px_60px_rgba(59,130,246,0.12)]"
                  : "border-white/10 bg-white/[0.02] hover:border-blue-500/20 hover:bg-white/[0.03]"
              }`}
            >
              {/* QUESTION */}
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between gap-5 p-6 text-left sm:p-7"
              >
                {/* LEFT */}
                <div className="flex items-start gap-4">
                  {/* ICON */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                      activeIndex === index
                        ? "bg-blue-600 text-white shadow-[0_0_30px_rgba(59,130,246,0.35)]"
                        : "bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white"
                    }`}
                  >
                    <HelpCircle className="h-5 w-5" />
                  </div>

                  {/* QUESTION */}
                  <div>
                    <h3
                      className={`text-base font-bold leading-relaxed transition-all duration-300 sm:text-lg ${
                        activeIndex === index
                          ? "text-blue-300"
                          : "text-white"
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>
                </div>

                {/* ARROW */}
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 ${
                    activeIndex === index
                      ? "rotate-180 border-blue-500/30 bg-blue-500/10 text-blue-400"
                      : "border-white/10 bg-white/[0.03] text-gray-400"
                  }`}
                >
                  <ChevronDown className="h-5 w-5" />
                </div>
              </button>

              {/* ANSWER */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <div className="border-t border-white/5 px-6 pb-7 pt-5 sm:px-7">
                      <p className="pl-16 text-sm leading-relaxed text-gray-400 sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-5 rounded-[32px] border border-white/10 bg-white/[0.03] px-8 py-8 backdrop-blur-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/10 text-blue-400">
              <MessageCircle className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">
                Still Have Questions?
              </h3>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-400">
                Hamari support team se connect karke apne doubts clear karein.
              </p>
            </div>

            <button className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              CONTACT SUPPORT

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}