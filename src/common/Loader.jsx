import React from "react";

// Deterministic particles — no Math.random() in render
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: 2 + (i * 7 % 5),
  left: ((i * 37 + 11) % 100),
  top: ((i * 53 + 7) % 100),
  duration: 6 + (i * 17 % 8),
  delay: -(i * 1.4 % 8),
  opacity: 0.12 + (i % 4) * 0.06,
}));

const LOADING_LETTERS = "LOADING".split("");

// Candlestick data for the logo — [x, bodyTop, bodyBot, wickTop, wickBot]
const CANDLES = [
  { x: 0, open: 56, close: 72, high: 52, low: 78, bull: false },
  { x: 18, open: 68, close: 50, high: 45, low: 74, bull: true },
  { x: 36, open: 52, close: 62, high: 48, low: 68, bull: false },
  { x: 54, open: 58, close: 36, high: 30, low: 63, bull: true },
  { x: 72, open: 38, close: 20, high: 14, low: 44, bull: true },
];

export default function Loader() {
  return (
    <div style={styles.root}>
      <style>{CSS}</style>

      {/* Deep background glows */}
      <div style={styles.glow1} />
      <div style={styles.glow2} />
      <div style={styles.glow3} />

      {/* Floating particles */}
      <div style={styles.particleLayer} aria-hidden="true">
        {PARTICLES.map(p => (
          <span
            key={p.id}
            style={{
              ...styles.particle,
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div style={styles.center}>

        {/* Logo ring system */}
        <div style={styles.logoWrapper}>

          {/* Rotating rings */}
          <div style={{ ...styles.ring, ...styles.ringOuter }} className="loader-ring-cw" />
          <div style={{ ...styles.ring, ...styles.ringMid }} className="loader-ring-ccw" />
          <div style={{ ...styles.ring, ...styles.ringInner }} className="loader-ring-cw-slow" />

          {/* Orbit dots */}
          <div style={styles.orbitTrack} className="loader-ring-cw">
            <div style={styles.orbitDot} />
          </div>
          <div style={{ ...styles.orbitTrack, ...styles.orbitTrack2 }} className="loader-ring-ccw">
            <div style={{ ...styles.orbitDot, ...styles.orbitDot2 }} />
          </div>

          {/* Center ambient glow */}
          <div style={styles.centerGlow} />

          {/* Logo mark */}
          <div style={styles.logoMark} className="loader-float">
            {/* Hex background plate */}
            <svg
              viewBox="0 0 120 120"
              style={styles.hexSvg}
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="hexGrad" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#0e3a4a" stopOpacity="1" />
                  <stop offset="100%" stopColor="#020c12" stopOpacity="1" />
                </radialGradient>
                <linearGradient id="lineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id="bearGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e2594a" />
                  <stop offset="100%" stopColor="#c0392b" />
                </linearGradient>
                <linearGradient id="bullGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Hexagon plate */}
              <polygon
                points="60,6 108,30 108,90 60,114 12,90 12,30"
                fill="url(#hexGrad)"
                stroke="#22d3ee"
                strokeWidth="1"
                strokeOpacity="0.35"
              />

              {/* Candlesticks — centered group */}
              <g transform="translate(17, 18)" filter="url(#glow)">
                {CANDLES.map((c, i) => {
                  const isLastThree = i >= 2;
                  return (
                    <g key={i} style={{ animationDelay: `${i * 0.2}s` }}>
                      {/* Wick */}
                      <line
                        x1={c.x + 5} y1={c.high}
                        x2={c.x + 5} y2={c.low}
                        stroke={c.bull ? "#22d3ee" : "#e2594a"}
                        strokeWidth="1.2"
                        strokeOpacity="0.7"
                      />
                      {/* Body */}
                      <rect
                        x={c.x + 1}
                        y={Math.min(c.open, c.close)}
                        width="8"
                        height={Math.abs(c.close - c.open)}
                        rx="1.5"
                        fill={c.bull ? "url(#bullGrad)" : "url(#bearGrad)"}
                        style={
                          c.bull
                            ? { animation: "pulse-candle 2s ease-in-out infinite", animationDelay: `${i * 0.3}s` }
                            : {}
                        }
                      />
                    </g>
                  );
                })}

                {/* Trend line */}
                <polyline
                  points="5,68 23,46 41,56 59,32 77,17"
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.9"
                />

                {/* Arrow tip */}
                <polyline
                  points="71,13 77,17 73,23"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Brand name */}
        <div style={styles.brand}>
          <div style={styles.brandRow}>
            <span style={styles.brandChart}>CHART</span>
            <span style={styles.brandSep} />
            <span style={styles.brandMentor}>MENTOR</span>
          </div>
          <div style={styles.tagline}>
            <span style={styles.tagDot} />
            <span>ANALYZE</span>
            <span style={styles.tagDot} />
            <span>LEARN</span>
            <span style={styles.tagDot} />
            <span>GROW</span>
            <span style={styles.tagDot} />
          </div>
        </div>

        {/* Progress track */}
        <div style={styles.progressTrack} role="progressbar" aria-label="Loading">
          <div style={styles.progressGlow} />
          <div style={styles.progressBar} className="loader-bar" />
          <div style={styles.progressShimmer} className="loader-shimmer" />
        </div>

        {/* Loading letters */}
        <div style={styles.loadingLetters} aria-label="Loading">
          {LOADING_LETTERS.map((ch, i) => (
            <span
              key={i}
              style={styles.loadingLetter}
              className="loader-letter"
              // inline delay so each letter pulses in sequence
              // eslint-disable-next-line react/no-unknown-property
              data-delay={i}
            >
              {ch}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}

export function Skeleton({ className = "" }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        borderRadius: 12,
        animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
      }}
      className={className}
    />
  );
}

/* ─── Styles ─────────────────────────────────────────────── */

const styles = {
  root: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "#020817",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  glow1: {
    position: "absolute",
    width: "clamp(300px, 55vw, 700px)",
    height: "clamp(300px, 55vw, 700px)",
    background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
    borderRadius: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -55%)",
    pointerEvents: "none",
  },
  glow2: {
    position: "absolute",
    width: "clamp(200px, 40vw, 500px)",
    height: "clamp(200px, 40vw, 500px)",
    background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
    borderRadius: "50%",
    bottom: "10%",
    right: "5%",
    pointerEvents: "none",
  },
  glow3: {
    position: "absolute",
    width: "clamp(150px, 30vw, 400px)",
    height: "clamp(150px, 30vw, 400px)",
    background: "radial-gradient(circle, rgba(226,89,74,0.06) 0%, transparent 70%)",
    borderRadius: "50%",
    top: "15%",
    left: "10%",
    pointerEvents: "none",
  },
  particleLayer: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },
  particle: {
    position: "absolute",
    background: "#22d3ee",
    borderRadius: "50%",
    animation: "particle-float linear infinite",
  },
  center: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 0,
  },
  logoWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "clamp(200px, 30vw, 340px)",
    height: "clamp(200px, 30vw, 340px)",
  },
  ring: {
    position: "absolute",
    borderRadius: "50%",
    border: "1px solid transparent",
  },
  ringOuter: {
    inset: 0,
    borderColor: "rgba(34,211,238,0.12)",
    borderTopColor: "rgba(34,211,238,0.4)",
  },
  ringMid: {
    inset: "12%",
    borderColor: "rgba(255,255,255,0.04)",
    borderBottomColor: "rgba(255,255,255,0.15)",
  },
  ringInner: {
    inset: "24%",
    borderColor: "rgba(34,211,238,0.07)",
    borderLeftColor: "rgba(34,211,238,0.25)",
  },
  orbitTrack: {
    position: "absolute",
    inset: "2%",
    borderRadius: "50%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  orbitTrack2: {
    inset: "14%",
  },
  orbitDot: {
    width: 5,
    height: 5,
    background: "#22d3ee",
    borderRadius: "50%",
    boxShadow: "0 0 8px #22d3ee, 0 0 16px rgba(34,211,238,0.5)",
    marginTop: 0,
  },
  orbitDot2: {
    width: 4,
    height: 4,
    background: "#38bdf8",
    boxShadow: "0 0 6px #38bdf8",
  },
  centerGlow: {
    position: "absolute",
    inset: "30%",
    background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)",
    borderRadius: "50%",
    pointerEvents: "none",
  },
  logoMark: {
    position: "relative",
    zIndex: 2,
  },
  hexSvg: {
    width: "clamp(90px, 14vw, 150px)",
    height: "clamp(90px, 14vw, 150px)",
    filter: "drop-shadow(0 0 18px rgba(34,211,238,0.35))",
  },
  brand: {
    marginTop: "clamp(16px, 3vw, 28px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(8px, 1.5vw, 16px)",
    letterSpacing: "0.22em",
  },
  brandChart: {
    fontSize: "clamp(22px, 4.5vw, 52px)",
    fontWeight: 900,
    color: "#ffffff",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  brandSep: {
    display: "block",
    width: 2,
    height: "clamp(20px, 3vw, 38px)",
    background: "linear-gradient(to bottom, transparent, #22d3ee, transparent)",
    borderRadius: 2,
    opacity: 0.6,
  },
  brandMentor: {
    fontSize: "clamp(22px, 4.5vw, 52px)",
    fontWeight: 900,
    color: "#22d3ee",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    textShadow: "0 0 30px rgba(34,211,238,0.5)",
  },
  tagline: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(6px, 1.2vw, 12px)",
    fontSize: "clamp(8px, 1.2vw, 11px)",
    fontWeight: 600,
    letterSpacing: "0.35em",
    color: "rgba(34,211,238,0.5)",
    fontFamily: "system-ui, sans-serif",
  },
  tagDot: {
    display: "block",
    width: 3,
    height: 3,
    background: "rgba(34,211,238,0.4)",
    borderRadius: "50%",
  },
  progressTrack: {
    position: "relative",
    overflow: "hidden",
    marginTop: "clamp(20px, 3.5vw, 36px)",
    borderRadius: 999,
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(34,211,238,0.12)",
    width: "clamp(200px, 35vw, 480px)",
    height: 4,
  },
  progressGlow: {
    position: "absolute",
    inset: 0,
    background: "rgba(34,211,238,0.03)",
  },
  progressBar: {
    position: "absolute",
    top: 0, bottom: 0,
    width: "40%",
    borderRadius: 999,
    background: "linear-gradient(90deg, #06b6d4, #22d3ee, #38bdf8)",
    boxShadow: "0 0 20px rgba(34,211,238,0.7), 0 0 40px rgba(34,211,238,0.3)",
  },
  progressShimmer: {
    position: "absolute",
    top: 0, bottom: 0,
    width: "20%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
    borderRadius: 999,
  },
  loadingLetters: {
    display: "flex",
    gap: "clamp(2px, 0.6vw, 6px)",
    marginTop: "clamp(14px, 2.5vw, 22px)",
    fontFamily: "system-ui, sans-serif",
    fontWeight: 700,
    letterSpacing: "clamp(0.2em, 0.4vw, 0.4em)",
    fontSize: "clamp(10px, 1.6vw, 14px)",
    color: "#22d3ee",
  },
  loadingLetter: {
    display: "inline-block",
    animation: "letter-pulse 1.4s ease-in-out infinite",
  },
};

/* ─── Keyframes ──────────────────────────────────────────── */

const CSS = `
  @keyframes loader-cw {
    to { transform: rotate(360deg); }
  }
  @keyframes loader-ccw {
    to { transform: rotate(-360deg); }
  }
  @keyframes loader-float {
    0%, 100% { transform: translateY(0px) scale(1); }
    50%       { transform: translateY(-8px) scale(1.015); }
  }
  @keyframes loader-bar {
    0%   { transform: translateX(-120%); }
    100% { transform: translateX(280%); }
  }
  @keyframes loader-shimmer {
    0%   { transform: translateX(-200%); }
    100% { transform: translateX(700%); }
  }
  @keyframes particle-float {
    0%   { transform: translateY(0px) scale(1); opacity: var(--op, 0.15); }
    50%  { transform: translateY(-20px) scale(1.1); opacity: calc(var(--op, 0.15) * 1.8); }
    100% { transform: translateY(0px) scale(1); opacity: var(--op, 0.15); }
  }
  @keyframes letter-pulse {
    0%, 100% { opacity: 0.25; transform: translateY(0); }
    50%       { opacity: 1;    transform: translateY(-2px); }
  }
  @keyframes pulse-candle {
    0%, 100% { opacity: 0.85; }
    50%       { opacity: 1; }
  }

  .loader-ring-cw      { animation: loader-cw  12s linear infinite; }
  .loader-ring-cw-slow { animation: loader-cw  20s linear infinite; }
  .loader-ring-ccw     { animation: loader-ccw  8s linear infinite; }
  .loader-float        { animation: loader-float 5s ease-in-out infinite; }
  .loader-bar          { animation: loader-bar 2.2s cubic-bezier(0.4,0,0.6,1) infinite; }
  .loader-shimmer      { animation: loader-shimmer 2.2s cubic-bezier(0.4,0,0.6,1) infinite 0.6s; }

  .loader-letter[data-delay="0"] { animation-delay: 0s; }
  .loader-letter[data-delay="1"] { animation-delay: 0.1s; }
  .loader-letter[data-delay="2"] { animation-delay: 0.2s; }
  .loader-letter[data-delay="3"] { animation-delay: 0.3s; }
  .loader-letter[data-delay="4"] { animation-delay: 0.4s; }
  .loader-letter[data-delay="5"] { animation-delay: 0.5s; }
  .loader-letter[data-delay="6"] { animation-delay: 0.6s; }

  @media (prefers-reduced-motion: reduce) {
    .loader-ring-cw, .loader-ring-cw-slow, .loader-ring-ccw,
    .loader-float, .loader-bar, .loader-shimmer, .loader-letter {
      animation: none !important;
    }
  }
`;
