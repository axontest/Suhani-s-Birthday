import React from 'react';
import cakeImg from '../assets/aesthetic_cake.jpg';

export const AestheticCake = ({ className = '', size = 210, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`inline-block cursor-pointer transition-transform hover:scale-105 active:scale-95 ${className}`}
    >
      <div className="relative group">
        {/* Glowing golden halo aura behind the cake */}
        <div className="absolute -inset-3 bg-gradient-to-tr from-amber-400/50 via-pink-400/40 to-sky-400/50 rounded-full blur-xl group-hover:opacity-100 transition-all opacity-80 animate-pulse" />

        {/* 3D Royal Butterfly Cake with rounded elegant border */}
        <img
          src={cakeImg}
          alt="Aesthetic Royal Birthday Cake"
          style={{ width: `${size}px`, height: `${size}px` }}
          className="relative rounded-3xl object-cover shadow-2xl border-4 border-[#ffc82c] select-none mx-auto transform transition group-hover:rotate-1"
        />
      </div>
    </div>
  );
};
