import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageCircle,
    Clock3,
    ArrowRight,
    PhoneForwarded,
} from "lucide-react";

export default function ChartMentorContactPage() {
    const contactCards = [
        {
            icon: Mail,
            title: "Email Support",
            value: "support.chartmentor@gamil.com",
            description: "Get assistance for memberships, payments, and mentorship.",
        },
        {
            icon: Phone,
            title: "Help Line",
            value: "+91 78018 25312 ",
            description: "Available Monday to Saturday for premium members.",
        },


        {
            icon: MapPin,
            title: "Office Location",
            value: "Ahmedabad, Gujarat, India",
            description: "Serving traders globally with online mentorship.",
        },
    ];

    return (
        <main id="contact" className="relative overflow-hidden bg-[#050816] text-white">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_30%)]" />

            {/* Hero */}
            <section className="relative mx-auto max-w-7xl px-6 pt-28 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mx-auto max-w-4xl text-center"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md">
                        <MessageCircle className="h-4 w-4" />
                        Contact Our Mentorship Team
                    </div>

                    <h1 className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
                        Let’s Build Your
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            {" "}
                            Trading Journey
                        </span>
                    </h1>

                    <p className="mt-8 text-lg leading-8 text-slate-400 sm:text-xl">
                        Need help with memberships, mentorship access, payments, or trading
                        guidance? Our team is here to support you.
                    </p>
                </motion.div>
            </section>

            {/* Contact Section */}
            <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-24 lg:grid-cols-2 lg:px-10">
                {/* Left Side */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-black sm:text-5xl">
                        Contact Information
                    </h2>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                        Reach out to our mentorship support team anytime for assistance,
                        trading guidance, or premium membership inquiries.
                    </p>

                    {/* Cards */}
                    <div className="mt-10 space-y-6">
                        {contactCards.map((card, index) => {
                            const Icon = card.icon;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-5 rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/5"
                                >
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                                        <Icon className="h-8 w-8 text-cyan-400" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold">{card.title}</h3>
                                        <p className="mt-2 text-base text-cyan-300">
                                            {card.value}
                                        </p>
                                        <p className="mt-2 text-sm leading-7 text-slate-400">
                                            {card.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Availability */}
                    <div className="mt-10 rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/20">
                                <Clock3 className="h-7 w-7 text-purple-400" />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold">Support Availability</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    Monday – Saturday: 9:00 AM – 9:00 PM IST
                                    <br />
                                    Sunday: Community support only.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Form */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl"
                >
                    <h2 className="text-3xl font-black">Send Us A Message</h2>

                    <p className="mt-4 text-sm leading-7 text-slate-400">
                        Fill out the form below and our mentorship support team will get
                        back to you shortly.
                    </p>

                    <form className="mt-10 space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="John"
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Subject
                            </label>

                            <input
                                type="text"
                                placeholder="Membership Support"
                                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Message
                            </label>

                            <textarea
                                rows={6}
                                placeholder="Write your message here..."
                                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/50"
                        >
                            Send Message
                            <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </form>
                </motion.div>
            </section>
        </main>
    );
}
