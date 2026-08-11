import React from 'react';

// Sunflower SVG Component matching the user's uploaded image style
export const SunflowerSVG = ({ className = '', size = 64, style = {} }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={`inline-block drop-shadow-md ${className}`} 
    style={style}
  >
    <g>
      {/* Leaves */}
      <path d="M20 70 Q 5 50 30 40 Q 35 60 20 70 Z" fill="#4a7c36" />
      <path d="M80 70 Q 95 50 70 40 Q 65 60 80 70 Z" fill="#588e40" />
      <path d="M50 85 Q 30 95 30 75 Q 45 70 50 85 Z" fill="#3f6d2d" />

      {/* Outer Petals Layer 1 */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
        <path
          key={`p1-${i}`}
          d="M 50 50 C 42 20, 44 5, 50 2 C 56 5, 58 20, 50 50 Z"
          fill={i % 2 === 0 ? "#ffc82c" : "#ffb703"}
          transform={`rotate(${deg} 50 50)`}
        />
      ))}

      {/* Inner Petals Layer 2 */}
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg, i) => (
        <path
          key={`p2-${i}`}
          d="M 50 50 C 45 28, 47 12, 50 10 C 53 12, 55 28, 50 50 Z"
          fill="#fb8500"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}

      {/* Center Disk / Seed Head */}
      <circle cx="50" cy="50" r="21" fill="#4a2810" />
      <circle cx="50" cy="50" r="18" fill="#361c09" />
      
      {/* Texture on disk */}
      <circle cx="50" cy="50" r="14" fill="none" stroke="#683b16" strokeDasharray="3 3" strokeWidth="2" />
      <circle cx="50" cy="50" r="8" fill="none" stroke="#251305" strokeDasharray="2 2" strokeWidth="1.5" />
      
      <circle cx="43" cy="43" r="3" fill="#ffb703" opacity="0.4" />
    </g>
  </svg>
);

// High Quality 3D Cake SVG Box Designs
export const Deluxe3DCakeSVG = ({ type = 'strawberry', size = 80 }) => {
  const themes = {
    strawberry: { top: '#ff758f', base: '#ff4d6d', drip: '#fff0f3', accent: '#c9184a' },
    golden: { top: '#ffc82c', base: '#f59e0b', drip: '#fef3c7', accent: '#b45309' },
    chocolate: { top: '#7f5539', base: '#9c6644', drip: '#ddb892', accent: '#582f0e' },
    rainbow: { top: '#38bdf8', base: '#c084fc', drip: '#fef08a', accent: '#f43f5e' },
    velvet: { top: '#a855f7', base: '#7e22ce', drip: '#f3e8ff', accent: '#581c87' }
  };

  const theme = themes[type] || themes.strawberry;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg">
      <defs>
        <linearGradient id={`cakeGrad-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={theme.top} />
          <stop offset="100%" stopColor={theme.base} />
        </linearGradient>
      </defs>
      <g>
        {/* Base shadow */}
        <ellipse cx="50" cy="88" rx="40" ry="8" fill="rgba(0,0,0,0.15)" />
        
        {/* Plate */}
        <ellipse cx="50" cy="85" rx="42" ry="7" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        
        {/* Cake Bottom Layer */}
        <rect x="18" y="52" width="64" height="30" rx="6" fill={`url(#cakeGrad-${type})`} />
        
        {/* Frosting Drips */}
        <path 
          d="M18 52 C24 64 30 52 36 62 C42 52 48 64 54 52 C60 62 66 52 72 64 C78 52 82 52 82 52 L82 42 L18 42 Z" 
          fill={theme.drip} 
        />
        
        {/* Top Cake Layer */}
        <rect x="26" y="32" width="48" height="22" rx="4" fill={theme.top} />
        <ellipse cx="50" cy="32" rx="24" ry="6" fill={theme.drip} />

        {/* Candles with glowing flames */}
        <rect x="38" y="16" width="4" height="16" rx="2" fill="#38bdf8" />
        <ellipse cx="40" cy="11" rx="3" ry="5" fill="#fbbf24" className="animate-pulse" />

        <rect x="48" y="12" width="4" height="20" rx="2" fill="#f43f5e" />
        <ellipse cx="50" cy="7" rx="3.5" ry="6" fill="#fbbf24" className="animate-pulse" />

        <rect x="58" y="16" width="4" height="16" rx="2" fill="#a855f7" />
        <ellipse cx="60" cy="11" rx="3" ry="5" fill="#fbbf24" className="animate-pulse" />

        {/* Decorative Berries/Sprinkles */}
        <circle cx="30" cy="46" r="2.5" fill={theme.accent} />
        <circle cx="50" cy="48" r="3" fill={theme.accent} />
        <circle cx="70" cy="46" r="2.5" fill={theme.accent} />
      </g>
    </svg>
  );
};

// 3D Styled Birthday Cake SVG
export const BirthdayCakeSVG = ({ size = 80, lit = true, onClick }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    onClick={onClick}
    className="cursor-pointer transition-transform hover:scale-105"
  >
    <g>
      <ellipse cx="50" cy="85" rx="42" ry="10" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
      <rect x="18" y="55" width="64" height="28" rx="6" fill="#f4a261" />
      <path d="M18 55 Q 34 68 50 55 Q 66 68 82 55 L82 62 Q 66 75 50 62 Q 34 75 18 62 Z" fill="#e76f51" />
      <rect x="22" y="38" width="56" height="24" rx="4" fill="#fff" />
      <path d="M22 38 Q 30 46 36 38 Q 44 46 50 38 Q 58 46 64 38 Q 72 46 78 38 L 78 44 Q 72 52 64 44 Q 58 52 50 44 Q 44 52 36 44 Q 30 52 22 44 Z" fill="#ffb703" />

      <rect x="34" y="20" width="5" height="20" rx="2" fill="#e63946" />
      {lit && (
        <g className="animate-pulse">
          <ellipse cx="36.5" cy="14" rx="3.5" ry="6" fill="#ffb703" />
          <ellipse cx="36.5" cy="15" rx="2" ry="3.5" fill="#ffffff" />
        </g>
      )}

      <rect x="47.5" y="16" width="5" height="24" rx="2" fill="#2a9d8f" />
      {lit && (
        <g className="animate-pulse">
          <ellipse cx="50" cy="10" rx="4" ry="7" fill="#ffb703" />
          <ellipse cx="50" cy="11" rx="2" ry="4" fill="#ffffff" />
        </g>
      )}

      <rect x="61" y="20" width="5" height="20" rx="2" fill="#e63946" />
      {lit && (
        <g className="animate-pulse">
          <ellipse cx="63.5" cy="14" rx="3.5" ry="6" fill="#ffb703" />
          <ellipse cx="63.5" cy="15" rx="2" ry="3.5" fill="#ffffff" />
        </g>
      )}
      
      <circle cx="28" cy="50" r="3" fill="#e63946" />
      <circle cx="50" cy="50" r="3.5" fill="#2a9d8f" />
      <circle cx="72" cy="50" r="3" fill="#e63946" />
    </g>
  </svg>
);

export const ModShieldSVG = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <defs>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5865F2" />
        <stop offset="100%" stopColor="#404EED" />
      </linearGradient>
    </defs>
    <path d="M50 8 L90 22 V50 C90 72 72 88 50 95 C28 88 10 72 10 50 V22 Z" fill="url(#shieldGrad)" stroke="#ffffff" strokeWidth="4" />
    <path d="M32 58 L37 42 L50 50 L63 42 L68 58 Z" fill="#ffc82c" />
    <circle cx="50" cy="38" r="4" fill="#ffc82c" />
    <circle cx="34" cy="38" r="3" fill="#ffc82c" />
    <circle cx="66" cy="38" r="3" fill="#ffc82c" />
  </svg>
);

export const CrownSVG = ({ size = 40, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <path d="M15 75 L20 30 L40 50 L50 20 L60 50 L80 30 L85 75 Z" fill="#ffb703" stroke="#d48806" strokeWidth="3" />
    <rect x="15" y="75" width="70" height="10" rx="3" fill="#fb8500" />
    <circle cx="20" cy="26" r="5" fill="#e63946" />
    <circle cx="50" cy="16" r="6" fill="#2a9d8f" />
    <circle cx="80" cy="26" r="5" fill="#e63946" />
  </svg>
);

export const WashiTape = ({ width = 120, height = 30, color = "#f7d6c8", rotation = -3 }) => (
  <div 
    style={{
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: color,
      opacity: 0.85,
      transform: `rotate(${rotation}deg)`,
      boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
      clipPath: "polygon(0% 10%, 5% 0%, 95% 0%, 100% 12%, 98% 88%, 100% 100%, 0% 100%, 2% 50%)",
      borderLeft: "2px stroke rgba(255,255,255,0.4)"
    }}
    className="absolute pointer-events-none z-20"
  />
);

export const SparkleSVG = ({ size = 24, fill = "#ffb703" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0 Z" fill={fill} />
  </svg>
);

export const CoffeeSVG = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x="25" y="35" width="45" height="48" rx="8" fill="#e76f51" />
    <path d="M70 45 C82 45 82 65 70 65" fill="none" stroke="#e76f51" strokeWidth="8" strokeLinecap="round" />
    <rect x="20" y="30" width="55" height="8" rx="4" fill="#f4a261" />
    <path d="M35 24 Q 40 18 35 12" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    <path d="M48 24 Q 53 18 48 12" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    <path d="M60 24 Q 65 18 60 12" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
  </svg>
);

export const HeartSVG = ({ size = 24, fill = "#e63946" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 88 C20 65 5 45 5 28 C5 15 15 5 28 5 C38 5 45 12 50 20 C55 12 62 5 72 5 C85 5 95 15 95 28 C95 45 80 65 50 88 Z" fill={fill} />
  </svg>
);
