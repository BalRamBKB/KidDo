import React from 'react';
import { Trophy, Lock, CheckCircle, Star } from 'lucide-react';

const BADGES_REQUIREMENTS = [
  { id: 'bronze', name: 'Star Novice', scoreRequired: 400, emoji: '🌱', color: 'from-amber-600 to-amber-800', accent: 'bg-amber-100 text-amber-800' },
  { id: 'silver', name: 'Brainy Voyager', scoreRequired: 600, emoji: '🚀', color: 'from-slate-400 to-slate-600', accent: 'bg-slate-100 text-slate-800' },
  { id: 'gold', name: 'Trivia Titan', scoreRequired: 850, emoji: '👑', color: 'from-yellow-400 to-amber-500', accent: 'bg-amber-100 text-amber-900' },
  { id: 'diamond', name: 'Grandmaster Explorer', scoreRequired: 1200, emoji: '💎', color: 'from-cyan-400 to-blue-500', accent: 'bg-cyan-100 text-cyan-800' },
];

export default function TrophyRoom({ currentScore }) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Dynamic Summary Cards Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border-4 border-slate-100 p-5 flex items-center gap-4 shadow-sm">
          <div className="bg-amber-400 p-3 rounded-2xl text-white shadow-md animate-pulse">
            <Trophy size={28} fill="currentColor"/>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Badges Unlocked</h3>
            <p className="text-2xl font-black text-slate-800 mt-0.5">
              {BADGES_REQUIREMENTS.filter(b => currentScore >= b.scoreRequired).length} / {BADGES_REQUIREMENTS.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border-4 border-slate-100 p-5 flex items-center gap-4 shadow-sm">
          <div className="bg-indigo-500 p-3 rounded-2xl text-white shadow-md">
            <Star size={28} fill="currentColor"/>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Reward Target</h3>
            <p className="text-xl font-black text-slate-800 mt-0.5">
              {BADGES_REQUIREMENTS.find(b => currentScore < b.scoreRequired) 
                ? `${BADGES_REQUIREMENTS.find(b => currentScore < b.scoreRequired).scoreRequired - currentScore} pts left`
                : 'Maximum Rank Reached! 👑'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Trophies Dynamic Layout Shelf */}
      <div className="bg-white rounded-3xl border-4 border-rose-100 p-6 sm:p-8 shadow-xl">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">My Trophy Showroom</h2>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">Keep exploring lessons and minigames to break limits and open chests!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {BADGES_REQUIREMENTS.map((badge) => {
            const isUnlocked = currentScore >= badge.scoreRequired;
            const progressPercent = Math.min(Math.round((currentScore / badge.scoreRequired) * 100), 100);

            return (
              <div 
                key={badge.id}
                className={`relative rounded-2xl p-5 border-3 transition-all duration-300 flex flex-col justify-between
                  ${isUnlocked 
                    ? 'border-emerald-200 bg-gradient-to-br from-white to-emerald-50/20 shadow-md transform hover:-translate-y-1' 
                    : 'border-slate-100 bg-slate-50/40 opacity-80'
                  }`}
              >
                <div className="flex items-start gap-4">
                  {/* Badge Rounded Circle Badge Illustration */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-md transform group-hover:scale-110 shrink-0
                    ${isUnlocked ? `bg-gradient-to-tr ${badge.color} text-white` : 'bg-slate-200 text-slate-400'}`}>
                    {isUnlocked ? badge.emoji : <Lock size={24} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${isUnlocked ? badge.accent : 'bg-slate-100 text-slate-400'}`}>
                      {badge.scoreRequired} PTS Required
                    </span>
                    <h3 className="text-lg font-black text-slate-700 truncate mt-1.5">{badge.name}</h3>
                  </div>
                </div>

                {/* Progress Indicators bar if locked vs Check icon if unlocked */}
                <div className="mt-5 pt-3 border-t border-slate-100/80">
                  {isUnlocked ? (
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                      <CheckCircle size={16} fill="currentColor" stroke="white" /> Unlocked & active on your profile card!
                    </div>
                  ) : (
                    <div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden p-0.5">
                        <div 
                          className="bg-indigo-500 h-full rounded-full transition-all" 
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[11px] font-extrabold text-slate-400 mt-1.5">
                        <span>Progress</span>
                        <span>{currentScore} / {badge.scoreRequired}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}