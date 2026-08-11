import React, { useEffect, useState } from 'react';
import { PaperScrap } from './PaperScrap';
import { SunflowerSVG, BirthdayCakeSVG, CrownSVG, HeartSVG, ModShieldSVG } from './CustomIcons';
import { YouTubeAudioPlayer } from './YouTubeAudioPlayer';

export const Stage3Celebration = ({ fireConfetti }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('suhani_bday_messages');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved); 
        if (!parsed.some(m => m.author === 'Basmallah')) {
          parsed.push({
            id: 3,
            author: "Basmallah",
            role: "STUDY WITH ME Teammate",
            color: "#ec4899",
            text: "Happppy birthdayyyy chatpati Enjoy ur day Hopefully it’s a new year filled with so many wonderful memories amazing opportunities and u get to achieve whatever u want 💗"
          });
        }
        return parsed;
      } catch(e){}
    }
    return [
      {
        id: 1,
        author: "Nixie",
        role: "STUDY WITH ME Teammate",
        color: "#ec4899",
        text: "Happy birthday di. Thank you for always being here for me❤️"
      },
      {
        id: 2,
        author: "Rajit",
        role: "STUDY WITH ME Founder",
        color: "#3b82f6",
        text: "Happy Birthday Suhani! 🎉 Thank you so much for helping this community so much. You are an absolute legendary moderator, and your dedication and warmth mean the world to us. Enjoy your special day to the fullest! ✨"
      },
      {
        id: 3,
        author: "Basmallah",
        role: "STUDY WITH ME Teammate",
        color: "#ec4899",
        text: "Happppy birthdayyyy chatpati Enjoy ur day Hopefully it’s a new year filled with so many wonderful memories amazing opportunities and u get to achieve whatever u want 💗"
      }
    ];
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (fireConfetti) {
      fireConfetti();
    }
  }, []);

  const handleToggleCandles = () => {
    setCandlesLit(!candlesLit);
    if (candlesLit && fireConfetti) {
      fireConfetti();
    }
  };

  const handleAddMessage = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newMessage.trim()) return;

    const newMsgObj = {
      id: Date.now(),
      author: newAuthor.trim(),
      role: newRole.trim() || "STUDY WITH ME Teammate",
      color: "#10b981",
      text: newMessage.trim()
    };

    const updated = [...messages, newMsgObj];
    setMessages(updated);
    localStorage.setItem('suhani_bday_messages', JSON.stringify(updated));

    setNewAuthor("");
    setNewRole("");
    setNewMessage("");
    setShowAddModal(false);
    if (fireConfetti) fireConfetti();
  };

  return (
    <div className="min-h-screen pb-20 pt-6 px-4 max-w-4xl mx-auto animate-fade-in relative">
      {/* Sunflowers Side Framing (Left & Right) matching image */}
      <div className="fixed top-12 left-2 sm:left-6 pointer-events-none z-10 opacity-90 hidden sm:block">
        <SunflowerSVG size={130} className="rotate-[-12deg]" />
        <SunflowerSVG size={100} className="rotate-[25deg] -mt-8 ml-4" />
      </div>

      <div className="fixed top-12 right-2 sm:right-6 pointer-events-none z-10 opacity-90 hidden sm:block">
        <SunflowerSVG size={140} className="rotate-[15deg]" />
        <SunflowerSVG size={90} className="rotate-[-20deg] -mt-10 mr-4" />
      </div>

      {/* Main Collage Card matching user's image layout */}
      <PaperScrap showSunflower={false} rotation={0} className="mb-10 text-center relative">
        {/* Tilted Music Player Badge Pinned to Top-Left Corner of Paper Card */}
        <YouTubeAudioPlayer 
          videoId="KfpbIG_py-Y" 
          startSeconds={30} 
          onConfetti={fireConfetti} 
          activeStage={3}
        />

        <div className="flex justify-between items-center text-xs font-['Caveat'] text-[#78716c] mb-2 px-4 pt-4 sm:pt-2">
          <span>stories & memories</span>
          <span>study with me family</span>
          <span>august 11</span>
        </div>

        {/* 3D Inflated Black Balloon Header matching uploaded image */}
        <div className="relative my-6 py-4">
          <h1 className="font-['Bungee'] text-4xl sm:text-6xl md:text-7xl tracking-wider uppercase text-[#111] drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] leading-none select-none">
            HAPPIEST<br />BIRTHDAY
          </h1>
          <h2 className="font-['Caveat'] text-4xl sm:text-6xl font-bold text-[#d97706] -mt-3 transform -rotate-3">
            Suhani! 🌻
          </h2>
        </div>

        {/* Cake Section with Blowout candles */}
        <div className="my-8 bg-[#fffbeb] p-6 rounded-2xl border-2 border-dashed border-[#fcd34d] flex flex-col items-center">
          <p className="font-['Plus_Jakarta_Sans'] text-xs font-extrabold uppercase text-[#b45309] mb-3">
            CLICK THE CAKE TO {candlesLit ? "BLOW OUT YOUR CANDLES 🕯️" : "LIGHT YOUR CANDLES ✨"}
          </p>
          
          <BirthdayCakeSVG size={120} lit={candlesLit} onClick={handleToggleCandles} />

          <p className="font-['Caveat'] text-2xl font-bold text-[#78350f] mt-3">
            {candlesLit ? "Make a wish, Suhani! 🌟" : "Wish granted! Happy Birthday! 🎉"}
          </p>
        </div>
      </PaperScrap>

      {/* Team Messages Section */}
      <div className="my-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ModShieldSVG size={40} />
            <h3 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-[#1c1917]">
              MESSAGES FROM YOUR STUDY WITH ME TEAM
            </h3>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#10b981] hover:bg-[#059669] text-white font-['Plus_Jakarta_Sans'] font-extrabold px-4 py-2 rounded-xl shadow cursor-pointer transition-all hover:scale-105 text-sm flex items-center gap-2"
          >
            <span>+ Add Message</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((msg, index) => (
            <PaperScrap
              key={msg.id}
              rotation={index % 2 === 0 ? -1.5 : 1.5}
              tapeColor={index % 3 === 0 ? "#f7d6c8" : index % 3 === 1 ? "#dbeafe" : "#fef08a"}
              className="text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-[#e5d9c2] pb-2">
                  <div>
                    <span className="font-['Outfit'] font-black text-xl text-[#1c1917] block">
                      {msg.author}
                    </span>
                    <span className="text-xs font-['Plus_Jakarta_Sans'] font-bold text-[#78716c] uppercase">
                      {msg.role}
                    </span>
                  </div>
                  <HeartSVG size={28} fill={msg.color || "#e63946"} />
                </div>

                <p className="font-['Caveat'] text-2xl sm:text-3xl text-[#292524] leading-relaxed font-semibold">
                  "{msg.text}"
                </p>
              </div>

              <div className="mt-4 pt-3 text-right">
                <span className="text-xs font-['Caveat'] text-[#a8a29e] font-bold">
                  ~ With lots of love & respect
                </span>
              </div>
            </PaperScrap>
          ))}
        </div>
      </div>

      {/* Modal to Add New Team Message */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#fcf8f2] border-2 border-[#e5d9c2] p-6 sm:p-8 rounded-2xl max-w-md w-full shadow-2xl relative animate-fade-in">
            <h3 className="font-['Outfit'] font-black text-2xl text-[#1c1917] mb-2">
              Add STUDY WITH ME Message 💌
            </h3>
            <p className="text-xs text-[#78716c] mb-6">
              Write a message for Suhani's birthday wall!
            </p>

            <form onSubmit={handleAddMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#44403c] uppercase mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mod Alex"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white font-['Plus_Jakarta_Sans'] text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#44403c] uppercase mb-1">Role / Tag</label>
                <input
                  type="text"
                  placeholder="e.g. STUDY WITH ME Teammate"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white font-['Plus_Jakarta_Sans'] text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#44403c] uppercase mb-1">Birthday Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Happy birthday Suhani! Thanks for being an awesome part of STUDY WITH ME..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white font-['Caveat'] text-xl text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-[#78716c] hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg text-sm font-extrabold bg-[#10b981] hover:bg-[#059669] text-white shadow cursor-pointer"
                >
                  Post Message 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
