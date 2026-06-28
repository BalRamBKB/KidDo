import React, { useState, useEffect } from 'react';
import { Sparkles, HelpCircle, RefreshCw, CheckCircle, ArrowRight } from 'lucide-react';

const WORDS_POOL = [
  { word: 'APPLE', hint: '🍎 A sweet, crunchy fruit!' },
  { word: 'SPACE', hint: '🚀 Where stars and planets live.' },
  { word: 'DINO', hint: '🦕 A giant creature from long ago.' },
  { word: 'OCEAN', hint: '🌊 Huge body of blue water.' },
  { word: 'MAGIC', hint: '🔮 Wizard tricks and sparkles!' },
];

export default function WordGame({ onAwardPoints }) {
  const [level, setLevel] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [gameState, setGameState] = useState('playing'); // playing, correct, wrong
  const [showHint, setShowHint] = useState(false);

  const currentItem = WORDS_POOL[level % WORDS_POOL.length];

  // Helper to scramble words natively
  const scrambleWord = (word) => {
    let arr = word.split('');
    // Ensure it doesn't accidentally scramble back into the original word
    while (arr.join('') === word && arr.length > 1) {
      arr.sort(() => Math.random() - 0.5);
    }
    return arr.join(' ');
  };

  // Initialize level
  useEffect(() => {
    setScrambled(scrambleWord(currentItem.word));
    setGuess('');
    setGameState('playing');
    setShowHint(false);
  }, [level]);

  const handleCheckGuess = (e) => {
    e.preventDefault();
    const cleanGuess = guess.trim().toUpperCase();

    if (cleanGuess === currentItem.word) {
      setGameState('correct');
      if (onAwardPoints) onAwardPoints(150); // Give kid points instantly!
    } else {
      setGameState('wrong');
    }
  };

  const handleNextLevel = () => {
    setLevel((prev) => prev + 1);
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-emerald-200 p-6 shadow-xl max-w-xl mx-auto transform rotate-[0.5deg]">
      {/* Game Header */}
      <div className="flex justify-between items-center border-b-2 border-slate-100 pb-4 mb-6">
        <div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            🎮 Play Zone - Word Scramble
          </span>
          <h2 className="text-xl font-black text-slate-800 mt-1">Unscramble the Magic!</h2>
        </div>
        <div className="bg-amber-400 text-white font-bold px-3 py-1 rounded-xl text-sm shadow-sm">
          Lvl {level + 1}
        </div>
      </div>

      {/* Scrambled Word Box */}
      <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl p-6 text-center text-white shadow-inner mb-6 relative">
        <p className="text-xs font-bold text-emerald-100 tracking-widest uppercase">Mix up letters:</p>
        <h3 className="text-4xl sm:text-5xl font-black tracking-widest mt-2 drop-shadow-md select-none font-mono">
          {scrambled}
        </h3>
        
        {gameState === 'correct' && (
          <div className="absolute inset-0 bg-emerald-500 rounded-2xl flex items-center justify-center animate-pulse">
            <span className="text-5xl">🎉 AWESOME! 🎉</span>
          </div>
        )}
      </div>

      {/* Hints System */}
      <div className="mb-6">
        {showHint ? (
          <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-xl p-3 text-amber-900 text-sm font-bold flex items-center gap-2 animate-fadeIn">
            <span>💡</span> {currentItem.hint}
          </div>
        ) : (
          <button
            onClick={() => setShowHint(true)}
            className="text-xs font-black text-indigo-500 flex items-center gap-1.5 hover:underline"
          >
            <HelpCircle size={14} /> Need a clever hint?
          </button>
        )}
      </div>

      {/* Game Actions Input Form */}
      {gameState !== 'correct' ? (
        <form onSubmit={handleCheckGuess} className="space-y-4">
          <input
            type="text"
            value={guess}
            onChange={(e) => {
              setGuess(e.target.value);
              if (gameState === 'wrong') setGameState('playing');
            }}
            placeholder="Type your answer here..."
            className={`w-full bg-slate-50 border-3 rounded-2xl px-4 py-3.5 text-center font-black text-xl tracking-wide uppercase focus:outline-none transition-all
              ${gameState === 'wrong' 
                ? 'border-rose-400 bg-rose-50 text-rose-700 animate-shake' 
                : 'border-slate-200 focus:border-emerald-400'
              }`}
          />
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setScrambled(scrambleWord(currentItem.word))}
              className="p-3 bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 text-slate-600 rounded-xl transition-all"
              title="Rescramble letters"
            >
              <RefreshCw size={20} />
            </button>

            <button
              type="submit"
              className="flex-1 bg-emerald-400 border-b-4 border-emerald-600 text-white font-black py-3 rounded-xl shadow-md hover:bg-emerald-500 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Check Answer 🌟
            </button>
          </div>
          
          {gameState === 'wrong' && (
            <p className="text-center text-xs font-bold text-rose-500">Oops! Not quite right. Try arranging them again!</p>
          )}
        </form>
      ) : (
        /* Level Win State Banner */
        <div className="space-y-4 text-center">
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border-2 border-emerald-200 flex items-center justify-center gap-2 font-bold text-sm">
            <CheckCircle className="text-emerald-500" /> You unlocked +150 points! Great vocabulary explorer!
          </div>
          <button
            onClick={handleNextLevel}
            className="w-full bg-indigo-500 border-b-4 border-indigo-700 text-white font-black py-4 rounded-xl shadow-lg hover:bg-indigo-600 active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
          >
            Play Next Word <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}