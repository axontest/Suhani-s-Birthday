import React, { useState, useRef, useEffect } from 'react';

export const YouTubeAudioPlayer = ({ 
  videoId = "KfpbIG_py-Y", 
  startSeconds = 30, 
  onConfetti,
  activeStage = 3 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef(null);

  // Pre-buffer and start audio when activeStage is Party (3) or when toggled
  useEffect(() => {
    if (activeStage === 3 && !isPlaying) {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
          '*'
        );
        setIsPlaying(true);
      }
    }
  }, [activeStage]);

  const togglePlay = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Hidden YouTube Iframe Player Preloaded Globally */}
      <iframe
        ref={iframeRef}
        width="0"
        height="0"
        src={`https://www.youtube.com/embed/${videoId}?start=${startSeconds}&autoplay=1&enablejsapi=1&loop=1&playlist=${videoId}`}
        title="Birthday Song"
        allow="autoplay"
        className="hidden pointer-events-none"
      />

      {/* Tilted Music Player Badge Pinned ON TOP OF The Top-Left Sunflower (z-index 100) */}
      <div className="absolute -top-3 left-1 sm:left-4 z-[100] bg-[#1c1917] text-white backdrop-blur-md px-4 py-2 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.5)] border-2 border-[#f59e0b] flex items-center gap-2.5 transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all cursor-pointer">
        {/* Pink Washi Tape Accent */}
        <div className="absolute -top-3 left-4 w-10 h-3.5 bg-[#f472b6] backdrop-blur-xs transform -rotate-12 shadow-md pointer-events-none rounded-xs border-dashed border-t border-b border-white/60 z-[101]" />

        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-[#ec4899] hover:bg-[#db2777] flex items-center justify-center text-white transition-transform active:scale-95 shadow cursor-pointer text-base"
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        
        <div className="text-left">
          <div className="text-[10px] uppercase font-black text-[#facc15] tracking-wider leading-tight">
            BIRTHDAY MUSIC 🎵
          </div>
          <div className="font-['Caveat'] text-base font-bold text-gray-200 leading-none">
            {isPlaying ? "Playing 🎶" : "Paused ⏸️"}
          </div>
        </div>

        {onConfetti && (
          <button
            onClick={onConfetti}
            className="bg-[#ec4899] hover:bg-[#db2777] text-white px-3 py-1.5 rounded-full font-['Outfit'] font-black text-xs shadow cursor-pointer transition-all hover:scale-110 active:scale-95 flex items-center gap-1 ml-1"
          >
            <span>🎉</span>
            <span className="hidden xs:inline sm:inline">CONFETTI!</span>
          </button>
        )}
      </div>
    </>
  );
};
