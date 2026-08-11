import React, { useState } from 'react';
import { PaperScrap } from './PaperScrap';
import { SparkleSVG, SunflowerSVG, CrownSVG, HeartSVG } from './CustomIcons';
import { soundFx } from '../utils/audioSynth';

export const Stage2ModQuiz = ({ onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const quiz = [
    {
      question: "What is your #1 official Birthday Rule today?",
      options: [
        { text: "100% Zero Mod Stress Allowed 🛋️", comment: "Granted! Relax & enjoy your day!" },
        { text: "Eat 5 slices of birthday cake without guilt 🎂", comment: "Approved! Extra cake for you!" },
        { text: "Receive non-stop love from your entire team ❤️", comment: "We love you so much!" },
        { text: "ALL OF THE ABOVE! (Granted by your team!) ✨", comment: "TRUTH! Everything is granted today!" }
      ]
    },
    {
      question: "What birthday treat are you claiming right now?",
      options: [
        { text: "Iced Coffee ☕", comment: "Coffee powers activated!" },
        { text: "Matcha Latte 🍵", comment: "Wholesome vibes incoming!" },
        { text: "Boba Milk Tea 🧋", comment: "Sweet treat unlocked!" },
        { text: "All the drinks in the world! 🥤", comment: "Unlimited drinks for the Birthday Queen!" }
      ]
    },
    {
      question: "Are you ready to open your team's birthday messages?",
      options: [
        { text: "YES! Show me my team messages! ❤️", comment: "GET READY FOR THE BIG REVEAL! 🚀" },
        { text: "ABSOLUTELY YES! Bring on the love! 🎉", comment: "GET READY FOR THE BIG REVEAL! 🚀" }
      ]
    }
  ];

  const handleSelectOption = (option) => {
    soundFx.playSuccess();
    setPopupMessage(option.comment);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      if (currentQ < quiz.length - 1) {
        setCurrentQ(prev => prev + 1);
      } else {
        soundFx.playFanfare();
        onComplete();
      }
    }, 1200);
  };

  const q = quiz[currentQ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-center animate-fade-in">
      <PaperScrap showSunflower={true} sunflowerPos="top-right" rotation={-1}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <HeartSVG size={32} fill="#e63946" />
          <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-[#1c1917]">
            YOUR BIRTHDAY PERKS & WISHES 🌻
          </h2>
        </div>

        <p className="font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-wider font-extrabold text-[#d97706] mb-6">
          BIRTHDAY CHOICE {currentQ + 1} OF {quiz.length}
        </p>

        <div className="bg-[#fffbeb] border border-[#fde68a] p-6 rounded-2xl mb-6 shadow-sm">
          <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg sm:text-xl text-[#292524]">
            "{q.question}"
          </h3>
        </div>

        <div className="space-y-3 mb-6">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt)}
              className="w-full text-left p-4 rounded-xl bg-white hover:bg-[#ffe49e] border-2 border-[#e5d9c2] hover:border-[#f59e0b] font-['Plus_Jakarta_Sans'] font-bold text-base text-[#1c1917] transition-all shadow-sm flex items-center justify-between cursor-pointer group"
            >
              <span>{opt.text}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">✨</span>
            </button>
          ))}
        </div>

        {showPopup && (
          <div className="p-4 bg-[#10b981] text-white rounded-xl font-['Caveat'] text-2xl font-bold animate-bounce shadow-lg">
            🎉 {popupMessage}
          </div>
        )}
      </PaperScrap>
    </div>
  );
};
