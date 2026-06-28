import React from 'react';

export default function Achievements({ earnedBadges, onJumpToAwards }) {
  return (
    <div className="bg-white rounded-3xl border-4 border-slate-100 p-6 shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
          🏆 Shiny Badges
        </h2>
        <button onClick={onJumpToAwards} className="text-xs font-bold text-rose-500 hover:underline">
          Trophy Room
        </button>
      </div>

      {earnedBadges.length === 0 ? (
        /* Empty feedback state if score is below 400 */
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-400">
          <span className="text-3xl block mb-1">🔒</span>
          <p className="text-xs font-bold">No badges earned yet!</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Reach 400 points to unlock your first trophy!</p>
        </div>
      ) : (
        /* Active Earned grid shelf */
        <div className="grid grid-cols-2 gap-3">
          {earnedBadges.map((badge, idx) => (
            <div 
              key={idx} 
              className="bg-gradient-to-b from-amber-50/40 to-white p-3 rounded-2xl border-2 border-amber-200 flex flex-col items-center text-center group transition-transform hover:scale-105"
            >
              <span className="text-3xl mb-1 filter drop-shadow-sm transition-transform group-hover:rotate-12 duration-200">
                {badge.emoji}
              </span>
              <h4 className="font-extrabold text-xs text-slate-700 leading-tight">{badge.name}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}