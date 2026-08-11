import React, { useEffect, useRef, useState } from 'react';
import { PaperScrap } from './PaperScrap';
import { soundFx } from '../utils/audioSynth';

export const Stage1SpamDodger = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing');
  const [commentary, setCommentary] = useState("Move mouse, touch, or use Arrow Keys to collect Birthday Treats!");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Load Suhani's PFP image
    const pfpImage = new Image();
    pfpImage.src = '/suhani_pfp.png';

    let animationId;
    let playerX = canvas.width / 2;
    const playerY = canvas.height - 45;
    const playerRadius = 32;

    let items = [];
    let currentScore = 0;
    let lastSpawn = Date.now();
    let keys = {};

    const goodTypes = [
      { text: '🎂 Cake', color: '#ec4899', pts: 10, type: 'good' },
      { text: '🌻 Sunflower', color: '#eab308', pts: 15, type: 'good' },
      { text: '☕ Coffee', color: '#f97316', pts: 10, type: 'good' },
      { text: '👑 Crown', color: '#8b5cf6', pts: 20, type: 'good' },
      { text: '❤️ Love', color: '#ef4444', pts: 15, type: 'good' }
    ];

    const badTypes = [
      { text: 'Mod Stress', color: '#ef4444', pts: -5, type: 'bad' },
      { text: 'Chaos 🚨', color: '#dc2626', pts: -5, type: 'bad' },
      { text: 'No Cake ❌', color: '#b91c1c', pts: -10, type: 'bad' }
    ];

    const updatePlayerPos = (clientX) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const relativeX = (clientX - rect.left) * scaleX;
      
      // Allow full movement right up to the far right wall
      playerX = Math.max(playerRadius - 10, Math.min(canvas.width - playerRadius + 10, relativeX));
    };

    const handlePointerMove = (e) => {
      updatePlayerPos(e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0));
    };

    const handleKeyDown = (e) => {
      keys[e.key] = true;
    };

    const handleKeyUp = (e) => {
      keys[e.key] = false;
    };

    // Attach listeners globally to track mouse/touch movement everywhere
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Keyboard movement support
      if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        playerX = Math.max(playerRadius - 10, playerX - 7);
      }
      if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        playerX = Math.min(canvas.width - playerRadius + 10, playerX + 7);
      }

      // Grid dots background
      ctx.fillStyle = '#e2d5bd';
      for (let x = 20; x < canvas.width; x += 40) {
        for (let y = 20; y < canvas.height; y += 40) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Spawn falling items
      if (Date.now() - lastSpawn > 550) {
        const isGood = Math.random() > 0.3;
        const pool = isGood ? goodTypes : badTypes;
        const template = pool[Math.floor(Math.random() * pool.length)];

        items.push({
          x: Math.random() * (canvas.width - 80) + 40,
          y: -20,
          speed: 2.5 + Math.random() * 2.5,
          ...template
        });
        lastSpawn = Date.now();
      }

      // Update & draw items
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.y += item.speed;

        ctx.save();
        ctx.fillStyle = item.color;
        ctx.shadowColor = 'rgba(0,0,0,0.15)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.roundRect(item.x - 45, item.y - 15, 90, 30, 15);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.text, item.x, item.y);
        ctx.restore();

        // Check collision
        const dist = Math.hypot(item.x - playerX, item.y - playerY);
        if (dist < playerRadius + 22) {
          if (item.type === 'good') {
            soundFx.playSuccess();
            currentScore += item.pts;
            setScore(currentScore);
            setCommentary(`YAY! You caught ${item.text} (+${item.pts} pts)!`);
          } else {
            soundFx.playTroll();
            currentScore = Math.max(0, currentScore + item.pts);
            setScore(currentScore);
            setCommentary(`Dodged ${item.text}! Keep enjoying your Birthday!`);
          }
          items.splice(i, 1);

          if (currentScore >= 100) {
            soundFx.playFanfare();
            setGameState('won');
            return;
          }
        } else if (item.y > canvas.height + 30) {
          items.splice(i, 1);
        }
      }

      // Draw Suhani's Avatar using her actual Pixel Art PFP!
      ctx.save();
      ctx.shadowColor = 'rgba(245, 158, 11, 0.5)';
      ctx.shadowBlur = 14;

      // Golden Halo Ring
      ctx.beginPath();
      ctx.arc(playerX, playerY, playerRadius + 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffc82c';
      ctx.fill();

      // Circular PFP Clipping
      ctx.beginPath();
      ctx.arc(playerX, playerY, playerRadius, 0, Math.PI * 2);
      ctx.clip();

      if (pfpImage.complete && pfpImage.naturalWidth !== 0) {
        ctx.drawImage(
          pfpImage, 
          playerX - playerRadius, 
          playerY - playerRadius, 
          playerRadius * 2, 
          playerRadius * 2
        );
      } else {
        ctx.fillStyle = '#ec4899';
        ctx.fill();
      }
      ctx.restore();

      // Crown on top of avatar
      ctx.fillStyle = '#ffb703';
      ctx.font = '20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👑', playerX, playerY - playerRadius - 2);

      animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-center animate-fade-in">
      <PaperScrap showSunflower={true} sunflowerPos="top-left" rotation={1}>
        <div className="flex items-center justify-center gap-3 mb-2">
          <img 
            src="/suhani_pfp.png" 
            alt="Suhani PFP" 
            className="w-12 h-12 rounded-full border-2 border-[#f59e0b] shadow-md object-cover"
          />
          <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-[#1c1917]">
            YOUR BIRTHDAY TREAT RUN 🌻
          </h2>
        </div>

        <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#57534e] mb-4">
          Move mouse/touch anywhere, or use ⬅️ ➡️ arrow keys to catch treats!
        </p>

        <div className="flex items-center justify-between bg-[#fffbeb] border border-[#fef3c7] px-6 py-3 rounded-xl mb-4 shadow-sm">
          <div className="text-left">
            <span className="text-xs font-extrabold text-[#b45309] block uppercase">YOUR HAPPINESS SCORE</span>
            <span className="font-['Outfit'] font-extrabold text-2xl text-[#d97706]">{score} / 100 PTS</span>
          </div>
          <div className="w-1/2 bg-gray-200 h-4 rounded-full overflow-hidden border border-gray-300">
            <div 
              className="bg-gradient-to-r from-[#f59e0b] to-[#ec4899] h-full transition-all duration-300"
              style={{ width: `${Math.min(100, (score / 100) * 100)}%` }}
            />
          </div>
        </div>

        <div ref={containerRef} className="relative rounded-2xl overflow-hidden border-2 border-[#e5d9c2] bg-[#fbf8f1] shadow-inner flex justify-center touch-none">
          <canvas 
            ref={canvasRef} 
            width={540} 
            height={340} 
            className="w-full h-[320px] cursor-crosshair touch-none select-none"
          />

          {gameState === 'won' && (
            <div className="absolute inset-0 bg-[#1c1917]/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-white animate-fade-in">
              <img 
                src="/suhani_pfp.png" 
                alt="Suhani PFP" 
                className="w-20 h-20 rounded-full border-4 border-[#facc15] shadow-2xl mb-2 animate-bounce object-cover"
              />
              <h3 className="font-['Bungee'] text-3xl text-[#facc15] mb-2">YOU WON!</h3>
              <p className="font-['Plus_Jakarta_Sans'] text-lg text-gray-200 mb-6">
                100 PTS Achieved! Your birthday happiness is maxed out! 👑
              </p>
              <button
                onClick={() => {
                  soundFx.playSuccess();
                  onComplete();
                }}
                className="bg-[#10b981] hover:bg-[#059669] text-white font-['Outfit'] font-black text-lg px-8 py-3.5 rounded-xl shadow-lg cursor-pointer transform transition hover:scale-105"
              >
                PROCEED TO YOUR QUIZ ➔
              </button>
            </div>
          )}
        </div>

        <p className="font-['Caveat'] text-2xl text-[#d97706] font-bold mt-3">
          {commentary}
        </p>
      </PaperScrap>
    </div>
  );
};
