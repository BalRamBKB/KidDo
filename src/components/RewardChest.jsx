import React, { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';

export default function RewardChest({ totalTasks, completedTasks }) {
  const [isClaimed, setIsClaimed] = useState(false);
  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const isUnlocked = percent === 100;

  return (
    <div className="bg-white rounded-3xl border-4 border-slate-100 p-6 shadow-sm flex flex-col justify-between h-full relative overflow-hidden">
      <div>
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          🎁 Mystery Chest
        </h2>
        <div className="w-full bg-slate-100 h-4 rounded-full mt-4 overflow-hidden border border-slate-200 p-0.5">
          <div 
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <p className="text-xs font-extrabold text-slate-500 mt-2 text-right">{percent}% Charged</p>
      </div>

      <div className="my-6 flex flex-col items-center justify-center relative">
        {isClaimed ? (
          <div className="text-center animate-bounce">
            <span className="text-6xl">🦖</span>
            <h3 className="font-black text-emerald-600 mt-2">Dino Companion Unlocked!</h3>
          </div>
        ) : (
          <>
            <span className={`text-7xl transition-transform duration-300 select-none
              ${isUnlocked ? 'animate-wiggle scale-110 cursor-pointer hover:scale-120' : 'opacity-40 grayscale'}
            `}>
              {isUnlocked ? '🧰' : '🔒'}
            </span>
            {isUnlocked && (
              <span className="absolute -top-2 text-amber-400 animate-ping"><Sparkles size={32}/></span>
            )}
          </>
        )}
      </div>

      <button
        disabled={!isUnlocked || isClaimed}
        onClick={() => setIsClaimed(true)}
        className={`w-full py-3.5 rounded-2xl font-black text-center shadow-md border-b-4 transition-all uppercase tracking-wide text-sm
          ${isUnlocked && !isClaimed
            ? 'bg-amber-400 border-amber-600 text-white hover:bg-amber-500 active:scale-95' 
            : 'bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed border-b-2'
          }`}
      >
        {isClaimed ? 'Claimed!' : isUnlocked ? 'Tap to Open! 🎉' : 'Locked'}
      </button>
    </div>
  );
}