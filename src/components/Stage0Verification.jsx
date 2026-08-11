import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PaperScrap } from './PaperScrap';
import { CrownSVG, SparkleSVG, SunflowerSVG, HeartSVG, RibbonBowSVG, WashiTape } from './CustomIcons';
import { TransparentCat } from './TransparentCat';
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
      confetti({ 
        particleCount: 240, 
        spread: 130, 
        origin: { y: 0.5 },
        colors: ['#ffb703', '#ec4899', '#38bdf8', '#10b981', '#a855f7']
      });
      setBoxState(2);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 text-center animate-fade-in relative">
      {/* Aesthetic Paper Scrap Container with Sunflowers & Washi Tapes */}
      <PaperScrap showSunflower={true} sunflowerPos="top-right" rotation={-1} className="relative">
        <WashiTape width={110} height={28} color="#f472b6" rotation={-5} />

        {/* Crowned Avatar Header */}
        <div className="flex flex-col items-center justify-center gap-2 mb-3 pt-2">
          <div className="relative mb-2">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#f59e0b] to-[#ec4899] rounded-full blur-md opacity-70 animate-pulse" />
            <img 
              src={suhaniPfp} 
              alt="Suhani PFP" 
              className="relative w-24 h-24 rounded-full border-4 border-[#f59e0b] shadow-2xl object-cover"
            />
            <span className="absolute -top-4 -right-2 transform rotate-12 drop-shadow-md">
              <CrownSVG size={36} />
            </span>
          </div>

          <h1 className="font-['Outfit'] font-black text-3xl sm:text-5xl text-[#1c1917] tracking-tight flex items-center justify-center gap-3">
            <span>HAPPY BIRTHDAY SUHANI!</span>
            <SunflowerSVG size={48} className="transform rotate-12" />
          </h1>
        </div>

        {/* STUDY WITH ME Badge */}
        <div className="inline-flex items-center gap-2 bg-[#fffbeb] text-[#b45309] font-['Plus_Jakarta_Sans'] font-extrabold px-6 py-2 rounded-full text-xs sm:text-sm mb-4 border-2 border-[#fde68a] shadow-sm">
          <SparkleSVG size={18} fill="#d97706" />
          <span className="uppercase tracking-wide">YOUR STUDY WITH ME BIRTHDAY SURPRISE</span>
          <SparkleSVG size={18} fill="#d97706" />
        </div>

        <p className="font-['Plus_Jakarta_Sans'] text-base text-[#44403c] font-semibold mb-4 max-w-md mx-auto leading-relaxed">
          {boxState === 0 && "Look who brought your birthday cake & balloons! Click the floating birthday kitten below to unwrap your surprise!"}
          {boxState === 1 && "Balloons untied! Click once more to reveal your birthday royal scroll!"}
          {boxState === 2 && "SURPRISE! You are officially crowned the Birthday Queen of STUDY WITH ME today! 👑"}
        </p>

        {/* Floating Transparent Birthday Kitten with Blue Cake & Balloons (Animates Bottom to Top!) */}
        <div className="my-4 flex flex-col items-center justify-center min-h-[300px] relative">
          {boxState < 2 ? (
            <div className="flex flex-col items-center gap-3">
              {/* Floating Kitten with transparent background floating bottom to top */}
              <div className="animate-float-up">
                <TransparentCat size={270} onClick={handleUnwrap} />
              </div>

              {/* Click button pill */}
              <button
                onClick={handleUnwrap}
                className="bg-[#1c1917] hover:bg-[#d97706] text-white px-7 py-3 rounded-full font-['Outfit'] font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer mt-2"
              >
                <span>{boxState === 0 ? "CLICK TO UNWRAP SURPRISE 🎁" : "CLICK TO OPEN SURPRISE ✨"}</span>
                <SparkleSVG size={18} fill="#facc15" />
              </button>
            </div>
          ) : (
            <div className="relative bg-[#fffbeb] border-3 border-[#fcd34d] p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full animate-fade-in text-center space-y-5">
              <WashiTape width={90} height={24} color="#38bdf8" rotation={4} />

              <div className="flex justify-center items-center gap-4 pt-2">
                <CrownSVG size={52} />
                <SunflowerSVG size={52} />
                <SparkleSVG size={48} fill="#ec4899" />
              </div>

              <h3 className="font-['Bungee'] text-2xl sm:text-3xl text-[#d97706] tracking-wide">
                OFFICIAL BIRTHDAY QUEEN!
              </h3>

              <div className="space-y-3 font-['Caveat'] text-2xl text-[#292524] font-bold bg-white/70 p-4 rounded-2xl border border-[#fef08a] shadow-inner">
                <p className="flex items-center justify-center gap-2">
                  <SparkleSVG size={22} fill="#f59e0b" />
                  <span>100% Happiness & Zero Stress Guaranteed!</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span>🎂 Unlimited Cake & Coffee Rights Activated!</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <HeartSVG size={24} fill="#ef4444" />
                  <span>Messages from your STUDY WITH ME team waiting inside!</span>
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    soundFx.playSuccess();
                    onComplete();
                  }}
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-['Outfit'] font-black text-xl py-4 rounded-2xl shadow-xl cursor-pointer transform transition hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>START YOUR BIRTHDAY PARTY</span>
                  <SparkleSVG size={24} fill="#ffffff" />
                </button>
              </div>
            </div>
          )}
        </div>

        {boxState < 2 && (
          <div className="font-['Caveat'] text-2xl text-[#d97706] font-bold mt-2 flex items-center justify-center gap-2">
            <RibbonBowSVG size={32} />
            <span>{boxState === 0 ? "Balloons floating gently ✨" : "Ready to reveal your birthday scroll! 🎉"}</span>
          </div>
        )}
      </PaperScrap>
    </div>
  );
};
