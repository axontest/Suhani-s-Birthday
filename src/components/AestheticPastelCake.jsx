import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audioSynth';

export const AestheticPastelCake = ({ size = 230, onEat }) => {
  const [isSliced, setIsSliced] = useState(false);

  const handleCakeClick = () => {
    if (isSliced) return;
    setIsSliced(true);
    soundFx.playFanfare();

    // 500+ Confetti Blast
    confetti({
      particleCount: 260,
      spread: 130,
      origin: { y: 0.5 },
      colors: ['#ffb703', '#ec4899', '#38bdf8', '#10b981', '#a855f7', '#fbbf24', '#f472b6']
    });

    setTimeout(() => {
      confetti({
        particleCount: 160,
        angle: 60,
        spread: 90,
        origin: { x: 0.1, y: 0.6 }
      });
    }, 150);

    setTimeout(() => {
      confetti({
        particleCount: 160,
        angle: 120,
        spread: 90,
        origin: { x: 0.9, y: 0.6 }
      });
    }, 300);

    setTimeout(() => {
      if (onEat) onEat();
    }, 500);
  };

  return (
    <div 
      onClick={handleCakeClick}
      className="relative inline-block cursor-pointer select-none group py-2"
    >
      {/* Outer Pastel Soft Glow Aura */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-pink-300/60 via-amber-300/50 to-purple-300/60 rounded-full blur-xl group-hover:opacity-100 transition-all opacity-80 animate-pulse" />

      {/* Pure Code 3D Aesthetic Pastel Birthday Cake SVG */}
      <div className={`relative transition-all duration-300 transform group-hover:scale-105 group-active:scale-95 ${isSliced ? 'animate-bounce scale-110' : ''}`}>
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 200 200" 
          className="drop-shadow-2xl mx-auto overflow-visible"
        >
          <defs>
            {/* Soft Pastel Gradients */}
            <linearGradient id="pastelBottom" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
            <linearGradient id="pastelMid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
            <linearGradient id="pastelTop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="creamDrip" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
          </defs>

          {/* Golden Stand Plate */}
          <ellipse cx="100" cy="180" rx="92" ry="16" fill="#fbbf24" stroke="#d97706" strokeWidth="4" />
          <ellipse cx="100" cy="176" rx="86" ry="12" fill="#ffffff" />

          {/* Tier 1 (Bottom Pastel Pink Layer) */}
          <rect x="24" y="124" width="152" height="52" rx="10" fill="url(#pastelBottom)" stroke="#f472b6" strokeWidth="2" />
          {/* Cream Drips Tier 1 */}
          <path d="M24 124 C38 140 52 124 66 138 C80 124 94 140 108 124 C122 138 136 124 150 140 C162 124 176 124 176 124 L176 118 L24 118 Z" fill="url(#creamDrip)" />

          {/* Tier 2 (Middle Pastel Lavender Layer) */}
          <rect x="42" y="80" width="116" height="46" rx="8" fill="url(#pastelMid)" stroke="#c084fc" strokeWidth="2" />
          {/* Cream Drips Tier 2 */}
          <path d="M42 80 C55 94 68 80 81 93 C94 80 107 94 120 80 C133 93 146 80 158 93 L158 76 L42 76 Z" fill="url(#creamDrip)" />

          {/* Tier 3 (Top Pastel Sky Layer) */}
          <rect x="60" y="42" width="80" height="40" rx="6" fill="url(#pastelTop)" stroke="#38bdf8" strokeWidth="2" />
          <ellipse cx="100" cy="42" rx="40" ry="10" fill="#eff6ff" />

          {/* Strawberries & Cherries on Top */}
          <circle cx="70" cy="40" r="6" fill="#ef4444" />
          <circle cx="100" cy="38" r="7" fill="#f43f5e" />
          <circle cx="130" cy="40" r="6" fill="#ef4444" />

          {/* Cute Gold & Pink Sprinkles */}
          <circle cx="50" cy="155" r="3" fill="#fbbf24" />
          <circle cx="85" cy="158" r="3.5" fill="#ffffff" />
          <circle cx="130" cy="152" r="3" fill="#fbbf24" />
          <circle cx="70" cy="105" r="3" fill="#ffffff" />
          <circle cx="110" cy="110" r="3.5" fill="#fbbf24" />

          {/* Glowing Animated Birthday Candles */}
          {[76, 92, 108, 124].map((x, i) => (
            <g key={`candle-${i}`}>
              <rect x={x - 2} y="16" width="5" height="24" rx="2" fill={i % 2 === 0 ? "#f43f5e" : "#fbbf24"} />
              <circle cx={x.toString()} cy="10" r="6" fill="#fbbf24" opacity="0.6" className="animate-pulse" />
              <ellipse cx={x.toString()} cy="10" rx="2.5" ry="5" fill="#ffffff" className="animate-bounce" />
            </g>
          ))}

          {/* Golden "HAPPY BIRTHDAY" Banner Topper */}
          <text 
            x="100" 
            y="14" 
            fill="#d97706" 
            fontSize="10" 
            fontWeight="900" 
            fontFamily="Outfit, sans-serif" 
            textAnchor="middle"
          >
            HAPPY BIRTHDAY SUHANI
          </text>
        </svg>
      </div>

      {/* Tap Button Pill */}
      <div className="mt-3 inline-flex items-center gap-2 bg-[#ec4899] group-hover:bg-[#db2777] text-white px-7 py-3 rounded-full font-['Outfit'] font-black text-sm uppercase tracking-wider shadow-xl transition-all transform hover:scale-105 active:scale-95">
        <span>EAT THE CAKE! (0 CALORIES GUARANTEED!) 🍰✨</span>
      </div>
    </div>
  );
};
