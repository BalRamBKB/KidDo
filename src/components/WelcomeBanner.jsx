import React from 'react';
import { Sparkles } from 'lucide-react';

// 🌟 FIX: Pull the child's registered name dynamically
export default function WelcomeBanner({ kidName = 'Explorer' }) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
      <div className="relative z-10 max-w-lg">
        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1 w-max mb-3">
          <Sparkles size={14}/> TODAY'S MISSION
        </span>
        <h1 className="text-3xl sm:text-4xl font-black mb-2 tracking-tight">
          Ready to learn, {kidName}? 🌟
        </h1>
        <p className="text-indigo-100 font-medium text-sm">
          You are doing amazing today! Complete 2 more activities to hit your daily goal and unlock the Golden Chest! 🏴‍☠️
        </p>
      </div>
      <div className="absolute right-6 bottom-4 text-7xl select-none opacity-80 hidden sm:block animate-bounce">
        🦕
      </div>
    </div>
  );
}