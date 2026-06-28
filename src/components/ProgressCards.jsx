import React from 'react';
import { Target, Star, Flame } from 'lucide-react';

export default function ProgressCards({ currentScore, currentStreak, completedCount }) {
  const stats = [
    { title: 'Points Total', value: `${currentScore} pts`, icon: Target, border: 'border-emerald-400', iconBg: 'bg-emerald-500' },
    { title: 'Quests Done', value: `${completedCount} Task(s)`, icon: Star, border: 'border-sky-400', iconBg: 'bg-sky-500' },
    { title: 'Daily Streak', value: `${currentStreak} Days 🔥`, icon: Flame, border: 'border-orange-400', iconBg: 'bg-orange-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className={`bg-white border-b-8 ${stat.border} rounded-2xl p-4 flex items-center justify-between shadow-sm`}>
            <div>
              <p className="text-slate-400 font-extrabold text-xs uppercase tracking-wider">{stat.title}</p>
              <p className="text-xl font-black text-slate-800 mt-0.5">{stat.value}</p>
            </div>
            <div className={`${stat.iconBg} text-white p-2.5 rounded-xl`}>
              <Icon size={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
}