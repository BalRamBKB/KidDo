import React from 'react';
import { Play } from 'lucide-react';

export default function LessonGrid({ lessons, onJumpToLessons }) {
  return (
    <div className="bg-white rounded-3xl border-4 border-slate-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
          🎒 Continue Learning
        </h2>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-3 border-slate-100 bg-slate-50/50 rounded-2xl p-4 gap-4 transition-all">
            <div className="flex items-center gap-4">
              <span className="text-4xl bg-white p-2.5 rounded-2xl shadow-sm border border-slate-100">{lesson.icon}</span>
              <div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase bg-white border ${lesson.color}`}>
                  {lesson.tag}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-700 mt-1">{lesson.name}</h3>
                
                {/* Visual Progress Bar */}
                <div className="w-48 sm:w-64 bg-slate-200 h-3 rounded-full mt-2 overflow-hidden border border-slate-100">
                  <div 
                    className={`${lesson.barBg} h-full rounded-full transition-all duration-500`} 
                    style={{ width: `${lesson.progress}%` }}
                  ></div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-1">
                  Progress: {lesson.progress}%
                </p>
              </div>
            </div>

            {/* 🌟 FIX: Pass the lesson.id ('Math', 'Science', 'English') when clicked */}
            <button 
              onClick={() => onJumpToLessons(lesson.id)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-md text-sm hover:bg-slate-700"
            >
              <Play size={14} fill="white"/> Resume
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}