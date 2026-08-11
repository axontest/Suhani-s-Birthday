import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Stage0Verification } from './components/Stage0Verification';
import { Stage1SpamDodger } from './components/Stage1SpamDodger';
import { Stage2ModQuiz } from './components/Stage2ModQuiz';
import { Stage3Celebration } from './components/Stage3Celebration';

export function App() {
  const [currentStage, setCurrentStage] = useState(0);

  const fireConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#ffb703', '#ec4899', '#38bdf8', '#10b981', '#a855f7']
    });

    setTimeout(() => {
      confetti({
        particleCount: 150,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.7 }
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 150,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.7 }
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#7fd1fc] font-['Plus_Jakarta_Sans'] text-[#1c1917] relative overflow-x-hidden selection:bg-[#ffc82c] selection:text-[#1c1917]">
      {/* Background aesthetics matching user uploaded image */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `radial-gradient(#ffffff 2px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Header Bar */}
      <header className="relative z-20 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto border-b border-white/30 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src="suhani_pfp.png" 
              alt="Suhani" 
              className="w-11 h-11 rounded-full border-2 border-[#f59e0b] shadow-md object-cover"
            />
            <span className="absolute -top-2 -right-1 text-base">👑</span>
          </div>
          <div>
            <h1 className="font-['Outfit'] font-black text-lg sm:text-xl text-[#1c1917] tracking-tight">
              SUHANI'S BIRTHDAY
            </h1>
            <span className="text-xs font-bold text-[#0284c7] uppercase">
              STUDY WITH ME EDITION 🌻
            </span>
          </div>
        </div>

        {/* Stage Navigator pills */}
        <div className="flex items-center gap-1 sm:gap-2 bg-white/70 backdrop-blur-md p-1.5 rounded-full border border-white/50 shadow-sm">
          {[
            { id: 0, label: "Gift Box 🎁" },
            { id: 1, label: "Treat Run 🌻" },
            { id: 2, label: "Quiz ✨" },
            { id: 3, label: "Party 🎉" }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setCurrentStage(s.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentStage === s.id
                  ? 'bg-[#1c1917] text-white shadow-md'
                  : 'text-[#44403c] hover:bg-white/80'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 py-6">
        {currentStage === 0 && (
          <Stage0Verification onComplete={() => setCurrentStage(1)} />
        )}
        {currentStage === 1 && (
          <Stage1SpamDodger onComplete={() => setCurrentStage(2)} />
        )}
        {currentStage === 2 && (
          <Stage2ModQuiz onComplete={() => setCurrentStage(3)} />
        )}
        {currentStage === 3 && (
          <Stage3Celebration fireConfetti={fireConfetti} />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-xs text-[#0369a1] font-bold">
        Made with ❤️ for Suhani by the STUDY WITH ME Team • 2026
      </footer>
    </div>
  );
}

export default App;
