import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Zap, CheckCircle, XCircle } from 'lucide-react';

export default function MathSprint({ onAwardPoints }) {
  const [question, setQuestion] = useState({ num1: 0, num2: 0, operation: '+', answer: 0, options: [] });
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);

  // Generate a random math equation natively
  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const isAddition = Math.random() > 0.5;
    const operation = isAddition ? '+' : '-';
    
    // Ensure positive numbers for subtraction to keep it fun for kids
    const realNum1 = !isAddition && num1 < num2 ? num2 : num1;
    const realNum2 = !isAddition && num1 < num2 ? num1 : num2;
    
    const answer = isAddition ? realNum1 + realNum2 : realNum1 - realNum2;

    // Generate clever fake options nearby
    const optionsSet = new Set([answer]);
    while (optionsSet.size < 4) {
      const fake = Math.max(0, answer + (Math.floor(Math.random() * 5) - 2));
      optionsSet.add(fake);
    }

    setQuestion({
      num1: realNum1,
      num2: realNum2,
      operation,
      answer,
      options: Array.from(optionsSet).sort(() => Math.random() - 0.5),
    });
    setSelectedOption(null);
    setIsAnswered(false);
  };

  // Setup the first question on load
  useEffect(() => {
    generateQuestion();
  }, []);

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === question.answer) {
      setStreak(prev => prev + 1);
      onAwardPoints(50); // Reward kids instantly!
    } else {
      setStreak(0); // Reset streak on incorrect answer
    }
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-amber-200 p-6 shadow-xl max-w-xl mx-auto transform rotate-[-0.5deg]">
      
      {/* Game Header */}
      <div className="flex justify-between items-center border-b-2 border-slate-100 pb-4 mb-6">
        <div>
          <span className="bg-amber-100 text-amber-800 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Zap size={12} fill="currentColor"/> Math Sprint Zone
          </span>
          <h2 className="text-xl font-black text-slate-800 mt-1">Pop the Right Answer!</h2>
        </div>
        <div className="bg-orange-400 text-white font-bold px-3 py-1 rounded-xl text-xs shadow-sm flex items-center gap-1">
          🔥 Streak: {streak}
        </div>
      </div>

      {/* Dynamic Equation Blackboard Box */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-6 text-center text-white shadow-inner mb-6">
        <p className="text-xs font-bold text-amber-100 uppercase tracking-widest">Solve the Puzzle:</p>
        <h3 className="text-5xl font-black mt-2 tracking-wide drop-shadow-md select-none">
          {question.num1} {question.operation} {question.num2} = ?
        </h3>
      </div>

      {/* Multiple Choice Options List */}
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, idx) => {
          const isCurrent = selectedOption === option;
          const isCorrect = option === question.answer;

          let cardStyles = "border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-400 hover:bg-amber-50/20";
          if (isAnswered) {
            if (isCorrect) cardStyles = "border-emerald-400 bg-emerald-50 text-emerald-800 scale-105 shadow-sm";
            else if (isCurrent) cardStyles = "border-rose-400 bg-rose-50 text-rose-800";
            else cardStyles = "border-slate-100 bg-slate-50 text-slate-300 opacity-40";
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleOptionClick(option)}
              className={`p-5 rounded-2xl border-3 font-black text-2xl text-center transition-all transform active:scale-95 ${cardStyles}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Action Banner Controls Container */}
      {isAnswered && (
        <div className="mt-6 pt-4 border-t-2 border-slate-50 flex justify-between items-center animate-fadeIn">
          <div className="flex items-center gap-2">
            {selectedOption === question.answer ? (
              <span className="text-emerald-600 font-black text-sm flex items-center gap-1">
                <CheckCircle size={18} fill="currentColor" stroke="white"/> Perfect! +50 pts
              </span>
            ) : (
              <span className="text-rose-500 font-black text-sm flex items-center gap-1">
                <XCircle size={18} fill="currentColor" stroke="white"/> Oops! Answer was {question.answer}
              </span>
            )}
          </div>
          <button
            onClick={generateQuestion}
            className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-md flex items-center gap-1.5 transition-all active:scale-95"
          >
            Next Run <ArrowRight size={14} />
          </button>
        </div>
      )}

    </div>
  );
}