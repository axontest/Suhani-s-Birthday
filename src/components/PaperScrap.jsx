import React from 'react';
import { WashiTape, SunflowerSVG } from './CustomIcons';

export const PaperScrap = ({ 
  children, 
  className = '', 
  tapeColor = "#f7d6c8",
  showSunflower = false,
  sunflowerPos = "top-right",
  rotation = 0
}) => {
  return (
    <div 
      className={`relative bg-[#f6efe0] text-[#1c1917] p-6 sm:p-8 rounded-lg shadow-xl border border-[#e5d9c2] transition-transform duration-300 ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        backgroundImage: `radial-gradient(#e2d5bd 1px, transparent 0)`,
        backgroundSize: '16px 16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Top Washi Tape Clip */}
      <WashiTape width={100} height={26} color={tapeColor} rotation={-2} />

      {/* Optional Sunflower Accent */}
      {showSunflower && (
        <div 
          className={`absolute ${
            sunflowerPos === 'top-right' ? '-top-8 -right-8' : 
            sunflowerPos === 'top-left' ? '-top-8 -left-8' : 
            sunflowerPos === 'bottom-right' ? '-bottom-8 -right-8' : '-bottom-8 -left-8'
          } pointer-events-none z-30 animate-pulse-slow`}
        >
          <SunflowerSVG size={72} />
        </div>
      )}

      {/* Torn Edge Top Detail */}
      <div 
        className="absolute top-0 left-0 right-0 h-2 bg-[#ebdcb8] opacity-60"
        style={{
          clipPath: 'polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0)'
        }}
      />

      {children}
    </div>
  );
};
