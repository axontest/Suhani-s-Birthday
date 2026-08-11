import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audioSynth';

export const ExplosiveBombCake = ({ size = 240, onBlast }) => {
  const [stage, setStage] = useState('normal'); // 'normal' -> 'ignited' -> 'detonating' -> 'exploded'

  const handleIgnite = (e) => {
    e.stopPropagation();
    if (stage !== 'normal') return;

    soundFx.playSuccess();
    setStage('ignited');

    // Countdown 3... 2... 1... Boom!
    setTimeout(() => {
      soundFx.playTroll();
      setStage('detonating');

      setTimeout(() => {
        soundFx.playFanfare();
        setStage('exploded');

        // MASSIVE CONFETTI BOMB EXPLOSION (500+ Particles!)
        confetti({
          particleCount: 300,
          spread: 160,
          startVelocity: 60,
          origin: { y: 0.5 },
          colors: ['#ef4444', '#f59e0b', '#10b981', '#ec4899', '#38bdf8', '#ffc82c', '#a855f7']
        });

        // Left Cannon Spray
        setTimeout(() => {
          confetti({
            particleCount: 180,
            angle: 55,
            spread: 90,
            origin: { x: 0, y: 0.65 },
            colors: ['#ffd700', '#ffb703', '#f59e0b', '#ec4899']
          });
        }, 120);

        // Right Cannon Spray
        setTimeout(() => {
          confetti({
            particleCount: 180,
            angle: 125,
            spread: 90,
            origin: { x: 1, y: 0.65 },
            colors: ['#38bdf8', '#10b981', '#ffd700', '#f43f5e']
          });
        }, 240);

        // Notify parent stage to complete
        setTimeout(() => {
          if (onBlast) onBlast();
        }, 500);

      }, 800);
    }, 1000);
  };

  return (
    <div 
      onClick={handleIgnite}
      className="relative inline-block cursor-pointer select-none group py-2"
    >
      {/* Outer Glowing Bomb Aura */}
      <div className={`absolute -inset-4 rounded-full blur-xl transition-all opacity-80 ${
        stage === 'ignited' || stage === 'detonating' 
          ? 'bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 animate-ping'
          : 'bg-gradient-to-tr from-amber-400/50 via-pink-400/40 to-sky-400/50 animate-pulse'
      }`} />

      {/* Pure Code 3D Vector Layered Bomb Cake SVG */}
      <div className={`relative transition-all duration-300 transform ${
        stage === 'detonating' 
          ? 'animate-ping scale-150 text-red-500' 
          : stage === 'ignited' 
          ? 'scale-110 animate-bounce' 
          : 'group-hover:scale-105 active:scale-95'
      }`}>
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 200 200" 
          className="drop-shadow-2xl mx-auto overflow-visible"
        >
          <defs>
            {/* Dark Obsidian & Gold Bomb Gradients */}
            <linearGradient id="bombBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#292524" />
              <stop offset="50%" stopColor="#1c1917" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>

            <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <radialGradient id="sparkGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#ef4444" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Golden Stand Plate */}
          <ellipse cx="100" cy="180" rx="90" ry="16" fill="#fbbf24" stroke="#b45309" strokeWidth="4" />
          <ellipse cx="100" cy="176" rx="84" ry="12" fill="#fffbeb" />

          {/* 3D Birthday Bomb Sphere Base */}
          <circle cx="100" cy="115" r="55" fill="url(#bombBody)" stroke="#f59e0b" strokeWidth="4" />
          {/* Shiny Highlight */}
          <ellipse cx="80" cy="85" rx="16" ry="10" fill="#ffffff" opacity="0.25" transform="rotate(-25 80 85)" />

          {/* Decorative Gold & Pink Festive Stripes */}
          <path d="M48 115 Q 100 145 152 115" fill="none" stroke="url(#goldRibbon)" strokeWidth="8" strokeLinecap="round" />
          <path d="M52 95 Q 100 120 148 95" fill="none" stroke="#ec4899" strokeWidth="5" strokeLinecap="round" />

          {/* "HAPPY BIRTHDAY" Gold Engraving on Bomb */}
          <text 
            x="100" 
            y="118" 
            fill="#fbbf24" 
            fontSize="11" 
            fontWeight="900" 
            fontFamily="Bungee, sans-serif" 
            textAnchor="middle"
          >
            HAPPY BIRTHDAY
          </text>

          {/* Bomb Fuse Cap */}
          <rect x="90" y="52" width="20" height="14" rx="4" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />

          {/* Bomb Fuse Rope */}
          <path 
            d="M100 52 Q 115 35 130 40 Q 145 45 140 25" 
            fill="none" 
            stroke="#d97706" 
            strokeWidth="4" 
            strokeLinecap="round" 
          />

          {/* SPARKS / IGNITION ON THE FUSE! */}
          <g className={stage === 'ignited' || stage === 'detonating' ? 'animate-ping' : 'animate-pulse'}>
            <circle cx="140" cy="25" r="14" fill="url(#sparkGlow)" />
            <path d="M140 10 L140 40 M125 25 L155 25 M130 15 L150 35 M130 35 L150 15" stroke="#ef4444" strokeWidth="3" />
            <circle cx="140" cy="25" r="6" fill="#fff" />
          </g>

          {/* Floating Warning Tag */}
          <g transform="translate(25, 60) rotate(-15)">
            <rect x="0" y="0" width="48" height="22" rx="4" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <text x="24" y="15" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">BOOM! 💥</text>
          </g>
        </svg>
      </div>

      {/* Interactive Trigger Button */}
      <div className="mt-3 inline-flex items-center gap-2 bg-[#dc2626] group-hover:bg-[#b91c1c] text-white px-7 py-3 rounded-full font-['Outfit'] font-black text-sm uppercase tracking-wider shadow-2xl transition-all transform hover:scale-105 active:scale-95">
        <span>
          {stage === 'normal' && "TAP BOMB TO LIGHT FUSE! 💣🔥"}
          {stage === 'ignited' && "FUSE LIT! DETONATING... ⏳"}
          {stage === 'detonating' && "BOOM! 💥💥💥"}
          {stage === 'exploded' && "EXPLODED! 🎉"}
        </span>
      </div>
    </div>
  );
};
