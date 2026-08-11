import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PaperScrap } from './PaperScrap';
import { CrownSVG, SparkleSVG, SunflowerSVG, HeartSVG, RibbonBowSVG, WashiTape } from './CustomIcons';
import { AestheticCake } from './AestheticCake';
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
    <div className="max-w-xl mx-auto px-4 py-3 text-center animate-fade-in relative">
      {/* Compact Paper Scrap Container */}
      <PaperScrap showSunflower={true} sunflowerPos="top-right" rotation={-1} className="relative p-5 sm:p-6">
        <WashiTape width={100} height={24} color="#f472b6" rotation={-5} />

        {/* Crowned Avatar Header */}
        <div className="flex flex-col items-center justify-center gap-1.5 pt-1 mb-2">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#f59e0b] to-[#ec4899] rounded-full blur-md opacity-70 animate-pulse" />
            <img 
              src={suhaniPfp} 
              alt="Suhani PFP" 
              className="relative w-20 h-20 rounded-full border-4 border-[#f59e0b] shadow-xl object-cover"
            />
            <span className="absolute -top-3 -right-2 transform rotate-12 drop-shadow-md">
              <CrownSVG size={32} />
            </span>
          </div>

          <h1 className="font-['Outfit'] font-black text-2xl sm:text-4xl text-[#1c1917] tracking-tight flex items-center justify-center gap-2">
            <span>HAPPY BIRTHDAY SUHANI!</span>
            <SunflowerSVG size={40} className="transform rotate-12" />
          </h1>
        </div>

        {/* STUDY WITH ME Badge */}
        <div className="inline-flex items-center gap-2 bg-[#fffbeb] text-[#b45309] font-['Plus_Jakarta_Sans'] font-extrabold px-5 py-1.5 rounded-full text-xs mb-3 border border-[#fde68a] shadow-xs">
          <SparkleSVG size={14} fill="#d97706" />
          <span className="uppercase tracking-wide">STUDY WITH ME BIRTHDAY CAKE</span>
          <SparkleSVG size={14} fill="#d97706" />
        </div>

        <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-[#44403c] font-semibold mb-3 max-w-md mx-auto leading-snug">
          {boxState === 0 && "Your STUDY WITH ME team prepared a royal 3-tiered birthday cake for you! Click the cake to make a wish!"}
          {boxState === 1 && "Candles lit! Click once more to blow out candles and open your birthday scroll!"}
          {boxState === 2 && "SURPRISE! You are officially crowned the Birthday Queen of STUDY WITH ME today! 👑"}
        </p>

        {/* Floating 3D Royal Butterfly Cake Container (Compact Height) */}
        <div className="my-3 flex flex-col items-center justify-center relative min-h-[220px]">
          {boxState < 2 ? (
            <div className="flex flex-col items-center gap-3">
              {/* Floating Aesthetic Royal Cake */}
              <div className="animate-float-up">
                <AestheticCake size={200} onClick={handleUnwrap} />
              </div>

              {/* Action Button */}
              <button
                onClick={handleUnwrap}
                className="bg-[#1c1917] hover:bg-[#d97706] text-white px-6 py-2.5 rounded-full font-['Outfit'] font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{boxState === 0 ? "CLICK TO MAKE A WISH 🎂" : "CLICK TO BLOW CANDLES ✨"}</span>
                <SparkleSVG size={16} fill="#facc15" />
              </button>
            </div>
          ) : (
            <div className="relative bg-[#fffbeb] border-2 border-[#fcd34d] p-5 rounded-2xl shadow-xl max-w-md w-full animate-fade-in text-center space-y-3">
              <WashiTape width={80} height={20} color="#38bdf8" rotation={4} />

              <div className="flex justify-center items-center gap-3 pt-1">
                <CrownSVG size={44} />
                <SunflowerSVG size={44} />
                <SparkleSVG size={40} fill="#ec4899" />
              </div>

              <h3 className="font-['Bungee'] text-xl sm:text-2xl text-[#d97706] tracking-wide">
                OFFICIAL BIRTHDAY QUEEN!
              </h3>

              <div className="space-y-2 font-['Caveat'] text-xl text-[#292524] font-bold bg-white/70 p-3 rounded-xl border border-[#fef08a] shadow-inner">
                <p className="flex items-center justify-center gap-2">
                  <SparkleSVG size={18} fill="#f59e0b" />
                  <span>100% Happiness & Zero Stress Guaranteed!</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span>🎂 Unlimited Cake & Coffee Rights Activated!</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <HeartSVG size={20} fill="#ef4444" />
                  <span>Messages from your STUDY WITH ME team waiting inside!</span>
                </p>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => {
                    soundFx.playSuccess();
                    onComplete();
                  }}
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-['Outfit'] font-black text-lg py-3 rounded-xl shadow-lg cursor-pointer transform transition hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>START YOUR BIRTHDAY PARTY</span>
                  <SparkleSVG size={20} fill="#ffffff" />
                </button>
              </div>
            </div>
          )}
        </div>

        {boxState < 2 && (
          <div className="font-['Caveat'] text-xl text-[#d97706] font-bold mt-1 flex items-center justify-center gap-2">
            <RibbonBowSVG size={24} />
            <span>{boxState === 0 ? "Golden candles lit ✨" : "Make a wish! 🎉"}</span>
          </div>
        )}
      </PaperScrap>
    </div>
  );
};
