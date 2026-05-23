import React from 'react';
import {
  BarChart3,
  TrendingUp,
  MessagesSquare,
  UserRoundCheck,
  Map,
  BrainCircuit,
  Users,
  Video,
  Smile,
  Clock
} from 'lucide-react';

const MembershipFeatures = () => {
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
      title: "Daily Market Analysis",
      desc: "Next day market prediction & analysis"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      title: "High Probability Setups",
      desc: "Best setups with proper entry, SL & Target"
    },
    {
      icon: <MessagesSquare className="w-8 h-8 text-blue-500" />,
      title: "Live Doubt Sessions",
      desc: "Regular live sessions for doubt solving"
    },
    {
      icon: <UserRoundCheck className="w-8 h-8 text-blue-500" />,
      title: "Personal Guidance",
      desc: "Direct support from me and team"
    },
    {
      icon: <Map className="w-8 h-8 text-blue-500" />,
      title: "Roadmap & Learning",
      desc: "Step by step roadmap for consistent growth"
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-blue-500" />,
      title: "Mindset & Discipline",
      desc: "Focus on trader mindset & risk management"
    }
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "1500+", label: "Happy Members" },
    { icon: <Video className="w-6 h-6" />, value: "200+", label: "Live Sessions" },
    { icon: <Smile className="w-6 h-6" />, value: "95%", label: "Satisfaction Rate" },
    { icon: <Clock className="w-6 h-6" />, value: "5+ Years", label: "Of Experience" }
  ];

  return (
    <section className="bg-[#030712] py-20 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-blue-500 uppercase tracking-[0.2em] text-xs font-bold mb-4">
            KYU CHOOSE KARE
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Chart Mentor Membership?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-12">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-white/[0.06] hover:border-blue-500/50 hover:-translate-y-1 group"
            >
              <div className="mb-6 p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-3 leading-tight">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-center gap-4 group">
                <div className="p-3 rounded-full bg-blue-600/10 text-blue-400 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-black text-white">{stat.value}</h4>
                  <p className="text-gray-400 text-xs md:text-sm font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipFeatures;