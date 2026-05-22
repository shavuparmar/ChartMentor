import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-[#020617] flex items-center justify-center overflow-hidden z-[9999]">
      
      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full animate-pulse"></div>

      {/* Main Wrapper */}
      <div className="relative flex flex-col items-center">

        {/* Logo Circle */}
        <div className="relative flex items-center justify-center">

          {/* Rotating Ring */}
          <div className="absolute 
            w-[280px] h-[280px]
            sm:w-[340px] sm:h-[340px]
            md:w-[420px] md:h-[420px]
            lg:w-[520px] lg:h-[520px]
            rounded-full border border-cyan-400/30
            animate-[spin_12s_linear_infinite]"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_25px_#22d3ee]"></div>
          </div>

          {/* Inner Glow */}
          <div className="absolute 
            w-[220px] h-[220px]
            sm:w-[280px] sm:h-[280px]
            md:w-[340px] md:h-[340px]
            lg:w-[420px] lg:h-[420px]
            bg-cyan-500/10 blur-3xl rounded-full"
          ></div>

          {/* Logo */}
          <div className="relative flex items-center justify-center">
            
            {/* C Shape */}
            <div className="
              absolute
              w-[170px] h-[170px]
              sm:w-[220px] sm:h-[220px]
              md:w-[270px] md:h-[270px]
              lg:w-[340px] lg:h-[340px]
              border-[14px]
              sm:border-[16px]
              md:border-[20px]
              border-white
              border-r-transparent
              rounded-full
              rotate-[35deg]
              shadow-[0_0_30px_rgba(255,255,255,0.35)]
            "></div>

            {/* M + Arrow */}
            <svg
              viewBox="0 0 300 300"
              className="
                w-[180px]
                sm:w-[240px]
                md:w-[300px]
                lg:w-[380px]
                drop-shadow-[0_0_25px_rgba(34,211,238,0.7)]
              "
            >
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>

              {/* M Shape */}
              <path
                d="M40 220 L40 120 L110 190 L260 40"
                fill="none"
                stroke="url(#blueGradient)"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Arrow */}
              <path
                d="M230 40 L260 40 L260 70"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Animated Candles */}
              <rect
                x="120"
                y="120"
                width="18"
                height="70"
                rx="4"
                fill="white"
                className="animate-pulse"
              />
              <rect
                x="155"
                y="95"
                width="18"
                height="95"
                rx="4"
                fill="#38bdf8"
                className="animate-[pulse_1.2s_infinite]"
              />
              <rect
                x="190"
                y="65"
                width="18"
                height="120"
                rx="4"
                fill="white"
                className="animate-[pulse_1.4s_infinite]"
              />

              {/* Chart Bars */}
              <rect
                x="55"
                y="240"
                width="18"
                height="40"
                fill="#0ea5e9"
                className="animate-[bounce_1s_infinite]"
              />
              <rect
                x="85"
                y="220"
                width="18"
                height="60"
                fill="#38bdf8"
                className="animate-[bounce_1.2s_infinite]"
              />
              <rect
                x="115"
                y="200"
                width="18"
                height="80"
                fill="#60a5fa"
                className="animate-[bounce_1.4s_infinite]"
              />
              <rect
                x="145"
                y="180"
                width="18"
                height="100"
                fill="#93c5fd"
                className="animate-[bounce_1.6s_infinite]"
              />
            </svg>
          </div>
        </div>

        {/* Brand Text */}
        <div className="mt-10 text-center">
          <h1 className="
            text-white font-black tracking-[0.25em]
            text-2xl sm:text-3xl md:text-5xl lg:text-6xl
          ">
            CHART <span className="text-cyan-400">MENTOR</span>
          </h1>

          <p className="
            mt-4 text-cyan-300/80 tracking-[0.4em]
            text-[10px] sm:text-xs md:text-sm
          ">
            GUIDANCE • SUPPORT • GROWTH
          </p>
        </div>

        {/* Animated Bars */}
        <div className="flex items-end gap-2 mt-10 h-20">
          <div className="w-3 bg-cyan-500 rounded-full h-6 animate-[bounce_1s_infinite]"></div>
          <div className="w-3 bg-cyan-400 rounded-full h-10 animate-[bounce_1.2s_infinite]"></div>
          <div className="w-3 bg-cyan-300 rounded-full h-14 animate-[bounce_1.4s_infinite]"></div>
          <div className="w-3 bg-cyan-500 rounded-full h-20 animate-[bounce_1.6s_infinite]"></div>
          <div className="w-3 bg-cyan-400 rounded-full h-12 animate-[bounce_1.8s_infinite]"></div>
        </div>

        {/* Loading Bar */}
        <div className="
          relative mt-8
          w-[260px]
          sm:w-[340px]
          md:w-[420px]
          lg:w-[520px]
          h-3 rounded-full
          bg-white/10 overflow-hidden
          border border-cyan-500/20
        ">
          <div className="
            absolute top-0 left-0 h-full
            w-1/2
            bg-gradient-to-r from-cyan-400 to-blue-500
            rounded-full
            animate-loading
            shadow-[0_0_20px_#22d3ee]
          "></div>
        </div>

        {/* Loading Text */}
        <p className="
          mt-5 text-cyan-400 tracking-[0.5em]
          text-sm sm:text-base md:text-lg
          animate-pulse
        ">
          LOADING...
        </p>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes loading {
            0% {
              left: -40%;
            }
            100% {
              left: 100%;
            }
          }

          .animate-loading {
            animation: loading 2s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

export function Skeleton({ className = "" }) {
  return <div className={`skeleton ${className}`} />;
}