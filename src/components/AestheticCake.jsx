import React from 'react';
import cakeImg from '../assets/aesthetic_cake.jpg';

export const AestheticCake = ({ className = '', size = 200, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`inline-block cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:rotate-1 active:scale-95 ${className}`}
    >
      <div className="relative group">
        {/* Glowing golden halo aura behind the cake */}
        <div className="absolute -inset-3 bg-gradient-to-tr from-amber-400/50 via-pink-400/40 to-sky-400/50 rounded-full blur-xl group-hover:opacity-100 transition-all opacity-70" />

        {/* 3D Royal Butterfly Cake with rounded elegant border */}
        <img
          src={cakeImg}
          alt="Aesthetic Royal Birthday Cake"
          style={{ width: `${size}px`, height: `${size}px` }}
          className="relative rounded-3xl object-cover shadow-2xl border-4 border-[#ffc82c] select-none mx-auto transform transition"
        />
      </div>
    </div>
  );
};
