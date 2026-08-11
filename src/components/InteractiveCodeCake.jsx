import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audioSynth';

export const InteractiveCodeCake = ({ size = 240, onBlast }) => {
  const [isExploding, setIsExploding] = useState(false);

  const handleCakeClick = () => {
    soundFx.playFanfare();
    setIsExploding(true);

    // Blast Cannon 1: Main Center Explosion
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#ffb703', '#ec4899', '#38bdf8', '#10b981', '#a855f7', '#fbbf24']
    });

    // Blast Cannon 2: Left Golden Streamers
    setTimeout(() => {
      confetti({
        particleCount: 150,
        angle: 60,
        spread: 90,
        origin: { x: 0.1, y: 0.6 },
        colors: ['#ffd700', '#ffb703', '#f59e0b', '#ec4899']
      });
    }, 150);

    // Blast Cannon 3: Right Sparkle Explosion
    setTimeout(() => {
      confetti({
        particleCount: 150,
        angle: 120,
        spread: 90,
        origin: { x: 0.9, y: 0.6 },
        colors: ['#38bdf8', '#10b981', '#ffd700', '#f43f5e']
      });
    }, 300);

    // Trigger parent blast reveal after explosion animation
    setTimeout(() => {
      if (onBlast) onBlast();
    }, 600);
  };

  return (
    <div 
      onClick={handleCakeClick}
      className="relative inline-block cursor-pointer select-none group"
    >
      {/* Outer Golden Aura Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/50 via-pink-400/40 to-sky-400/50 rounded-full blur-xl group-hover:opacity-100 transition-all opacity-70 animate-pulse" />

      {/* Pure Code 3D Vector Layered Cake SVG */}
      <div className={`relative transition-all duration-300 transform group-hover:scale-105 group-active:scale-95 ${isExploding ? 'animate-bounce scale-125 opacity-80' : ''}`}>
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 200 200" 
          className="drop-shadow-2xl mx-auto overflow-visible"
        >
          <defs>
            {/* Cake Layer Gradients */}
            <linearGradient id="tierBottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="tierMidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="tierTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
            <linearGradient id="goldDrip" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Golden Stand Plate */}
          <ellipse cx="100" cy="180" rx="90" ry="16" fill="#fbbf24" stroke="#b45309" strokeWidth="4" />
          <ellipse cx="100" cy="176" rx="84" ry="12" fill="#fffbeb" />

          {/* Tier 1 (Bottom Tier) */}
          <rect x="25" y="125" width="150" height="50" rx="10" fill="url(#tierBottomGrad)" stroke="#1d4ed8" strokeWidth="2" />
          {/* Gold Drips Tier 1 */}
          <path d="M25 125 C40 142 55 125 70 140 C85 125 100 142 115 125 C130 140 145 125 160 142 C170 125 175 125 175 125 L175 120 L25 120 Z" fill="url(#goldDrip)" />

          {/* Tier 2 (Middle Tier) */}
          <rect x="42" y="80" width="116" height="46" rx="8" fill="url(#tierMidGrad)" stroke="#3b82f6" strokeWidth="2" />
          {/* Gold Drips Tier 2 */}
          <path d="M42 80 C55 95 68 80 81 94 C94 80 107 95 120 80 C133 94 146 80 158 94 L158 76 L42 76 Z" fill="url(#goldDrip)" />

          {/* Tier 3 (Top Tier) */}
          <rect x="60" y="42" width="80" height="40" rx="6" fill="url(#tierTopGrad)" stroke="#60a5fa" strokeWidth="2" />
          <ellipse cx="100" cy="42" rx="40" ry="10" fill="#eff6ff" />

          {/* Golden Edible Butterflies (Pure Vector Code) */}
          {/* Butterfly 1 */}
          <path d="M45 140 C35 125 35 150 45 145 C55 150 55 125 45 140 Z" fill="#fbbf24" transform="rotate(-15 45 140)" />
          {/* Butterfly 2 */}
          <path d="M150 100 C140 85 140 110 150 105 C160 110 160 85 150 100 Z" fill="#f59e0b" transform="rotate(20 150 100)" />
          {/* Butterfly 3 */}
          <path d="M125 60 C118 48 118 70 125 65 C132 70 132 48 125 60 Z" fill="#fbbf24" transform="rotate(-10 125 60)" />

          {/* Golden Sprinkles */}
          <circle cx="50" cy="155" r="2.5" fill="#facc15" />
          <circle cx="90" cy="158" r="3" fill="#ec4899" />
          <circle cx="135" cy="152" r="2.5" fill="#38bdf8" />
          <circle cx="70" cy="105" r="3" fill="#facc15" />
          <circle cx="110" cy="110" r="2.5" fill="#10b981" />

          {/* Glowing Animated Birthday Candles */}
          {[72, 86, 100, 114, 128].map((x, i) => (
            <g key={`candle-${i}`}>
              {/* Candle Body */}
              <rect x={x - 2} y="18" width="5" height="24" rx="2" fill={i % 2 === 0 ? "#f43f5e" : "#38bdf8"} />
              {/* Flame Outer Glow */}
              <circle cx={x.toString()} cy="12" r="6" fill="#fbbf24" opacity="0.5" className="animate-pulse" />
              {/* Flame Center */}
              <ellipse cx={x.toString()} cy="12" rx="2.5" ry="5" fill="#fff" className="animate-bounce" />
            </g>
          ))}

          {/* Glowing "Happy Birthday" Gold Topper */}
          <text 
            x="100" 
            y="14" 
            fill="#d97706" 
            fontSize="10" 
            fontWeight="bold" 
            fontFamily="Bungee, sans-serif" 
            textAnchor="middle"
          >
            HAPPY BIRTHDAY
          </text>
        </svg>
      </div>

      {/* Tap Instruction Pill */}
      <div className="mt-3 inline-flex items-center gap-2 bg-[#1c1917] group-hover:bg-[#d97706] text-white px-6 py-2.5 rounded-full font-['Outfit'] font-black text-xs uppercase tracking-wider shadow-2xl transition-all">
        <span>CLICK CAKE TO BLAST! 💥🎉</span>
      </div>
    </div>
  );
};
