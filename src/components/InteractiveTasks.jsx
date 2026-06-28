import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export default function InteractiveTasks({ tasks, onToggleTask }) {
  return (
    <div className="bg-white rounded-3xl border-4 border-slate-100 p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          🎯 Daily Quests
        </h2>
        <p className="text-xs font-medium text-slate-400">Complete them all to unlock today's secret surprise!</p>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => onToggleTask(task.id)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left transform active:scale-[0.99]
              ${task.completed 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 line-through decoration-emerald-300 decoration-2' 
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-300'
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl select-none">{task.emoji}</span>
              <div>
                <p className="font-extrabold text-sm sm:text-base">{task.title}</p>
                <p className={`text-xs font-bold ${task.completed ? 'text-emerald-500' : 'text-amber-500'}`}>
                  +{task.points} Points
                </p>
              </div>
            </div>
            
            <div>
              {task.completed ? (
                <CheckCircle2 className="text-emerald-500" size={24} fill="currentColor" stroke="white" />
              ) : (
                <Circle className="text-slate-300 hover:text-amber-400" size={24} />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}