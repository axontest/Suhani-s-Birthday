import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PaperScrap } from './PaperScrap';
import { CrownSVG, SparkleSVG, SunflowerSVG, HeartSVG, GiftBoxSVG, RibbonBowSVG } from './CustomIcons';
import { soundFx } from '../utils/audioSynth';
import suhaniPfp from '../assets/suhani_pfp.png';

export const Stage0Verification = ({ onComplete }) => {
  const [boxState, setBoxState] = useState(0);

  const handleUnwrap = () => {
    if (boxState === 0) {
      soundFx.playSuccess();
      setBoxState(1);
    } else if (boxState === 1) {
      soundFx.playFanfare();
      confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 } });
      setBoxState(2);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-center animate-fade-in relative">
      <PaperScrap showSunflower={true} sunflowerPos="top-right" rotation={-1}>
        <div className="flex flex-col items-center justify-center gap-2 mb-3">
          <div className="relative mb-2">
            <img 
              src={suhaniPfp} 
              alt="Suhani PFP" 
              className="w-20 h-20 rounded-full border-4 border-[#f59e0b] shadow-xl object-cover"
            />
            <span className="absolute -top-3 -right-2">
              <CrownSVG size={32} />
            </span>
          </div>
          <h1 className="font-['Outfit'] font-black text-3xl sm:text-5xl text-[#1c1917] tracking-tight flex items-center justify-center gap-2">
            <span>HAPPY BIRTHDAY SUHANI!</span>
            <SunflowerSVG size={44} />
          </h1>
        </div>

        <div className="inline-flex items-center gap-2 bg-[#ffeaad] text-[#8a5d00] font-['Plus_Jakarta_Sans'] font-extrabold px-5 py-2 rounded-full text-xs sm:text-sm mb-6 border border-[#f3d178]">
          <SparkleSVG size={16} fill="#d97706" />
          <span>YOUR STUDY WITH ME GIFT BOX HAS ARRIVED</span>
          <SparkleSVG size={16} fill="#d97706" />
        </div>

        <p className="font-['Plus_Jakarta_Sans'] text-base text-[#44403c] font-semibold mb-8 max-w-md mx-auto">
          {boxState === 0 && "Your STUDY WITH ME team packed a special birthday surprise box just for you! Click the gift box below to unwrap it!"}
          {boxState === 1 && "Ribbon untied! Click once more to open your birthday surprise!"}
          {boxState === 2 && "SURPRISE! You are officially crowned the Birthday Queen today!"}
        </p>

        {/* Interactive 3D Gift Box Unboxing */}
        <div className="my-6 flex flex-col items-center justify-center min-h-[220px]">
          {boxState < 2 ? (
            <button
              onClick={handleUnwrap}
              className="group relative cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
            >
              <div className="absolute -inset-4 bg-amber-300/40 rounded-full blur-xl group-hover:bg-amber-400/60 transition-all" />

              <div className="relative bg-[#fffbeb] border-4 border-[#f59e0b] p-8 sm:p-10 rounded-3xl shadow-2xl flex flex-col items-center gap-3">
                <GiftBoxSVG size={110} className="animate-bounce" />
                <span className="font-['Outfit'] font-black text-base text-[#b45309] uppercase tracking-wider flex items-center gap-2">
                  <span>{boxState === 0 ? "CLICK TO UNWRAP GIFT" : "CLICK TO OPEN BOX"}</span>
                  <SparkleSVG size={18} fill="#b45309" />
                </span>
              </div>
            </button>
          ) : (
            <div className="bg-[#fffbeb] border-2 border-[#fcd34d] p-6 sm:p-8 rounded-3xl shadow-xl max-w-md w-full animate-fade-in text-center space-y-4">
              <div className="flex justify-center gap-4">
                <CrownSVG size={48} />
                <SunflowerSVG size={48} />
                <SparkleSVG size={48} fill="#ec4899" />
              </div>

              <h3 className="font-['Bungee'] text-2xl sm:text-3xl text-[#d97706]">
                OFFICIAL BIRTHDAY QUEEN!
              </h3>

              <div className="space-y-2 font-['Caveat'] text-2xl text-[#44403c] font-bold">
                <p className="flex items-center justify-center gap-2">
                  <SparkleSVG size={20} fill="#f59e0b" />
                  <span>100% Happiness & Zero Stress Guaranteed!</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span>🎂 Unlimited Cake & Coffee Rights Activated!</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <HeartSVG size={22} fill="#ef4444" />
                  <span>Messages from your STUDY WITH ME team waiting inside!</span>
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    soundFx.playSuccess();
                    onComplete();
                  }}
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-['Outfit'] font-black text-lg py-4 rounded-2xl shadow-xl cursor-pointer transform transition hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>START YOUR BIRTHDAY PARTY</span>
                  <SparkleSVG size={22} fill="#ffffff" />
                </button>
              </div>
            </div>
          )}
        </div>

        {boxState < 2 && (
          <div className="font-['Caveat'] text-2xl text-[#d97706] font-bold mt-4 flex items-center justify-center gap-2">
            <RibbonBowSVG size={28} />
            <span>{boxState === 0 ? "Golden ribbon tied" : "Ready to reveal your surprise!"}</span>
          </div>
        )}
      </PaperScrap>
    </div>
  );
};
