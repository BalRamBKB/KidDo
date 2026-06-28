import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Sparkles, CheckCircle, XCircle, ArrowRight, HelpCircle } from 'lucide-react';

const WORD_BANK = [
  'apple', 'happy', 'bright', 'planet', 'garden', 
  'castle', 'rocket', 'kitten', 'monkey', 'wizard'
];

export default function SpellingBee({ onAwardPoints }) {
  const [currentWord, setCurrentWord] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hintUsed, setHintUsed] = useState(false);
  
  const audioRef = useRef(null);

  const fetchWordAudio = async () => {
    setLoading(true);
    setUserInput('');
    setIsAnswered(false);
    setHintUsed(false);

    // Pick a random word for the child to spell
    const randomWord = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
    setCurrentWord(randomWord);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
      const data = await response.json();
      
      // Look through the data array to find a valid US or UK audio file URL path
      if (data && data[0]?.phonetics) {
        const audioObj = data[0].phonetics.find(p => p.audio && p.audio !== '');
        if (audioObj) {
          setAudioUrl(audioObj.audio);
          // Auto-play the audio once it loads up
          setTimeout(() => playAudio(audioObj.audio), 300);
        } else {
          fallbackAudio(randomWord);
        }
      }
    } catch (err) {
      console.error("Audio API error:", err);
      fallbackAudio(randomWord);
    } finally {
      setLoading(false);
    }
  };

  const fallbackAudio = (word) => {
    // Uses structural browser speech synthesis engine if external API endpoint is blocked
    setAudioUrl('native_synth');
  };

  const playAudio = (urlPath = audioUrl) => {
    if (!urlPath) return;

    if (urlPath === 'native_synth') {
      const utterance = new SpeechSynthesisUtterance(currentWord);
      utterance.rate = 0.85; // Slow down slightly for easier child comprehension
      window.speechSynthesis.speak(utterance);
    } else {
      if (audioRef.current) {
        audioRef.current.src = urlPath;
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser config:", e));
      }
    }
  };

  useEffect(() => {
    fetchWordAudio();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAnswered || userInput.trim() === '') return;

    const finalAnswer = userInput.trim().toLowerCase();
    const isRight = finalAnswer === currentWord.toLowerCase();
    
    setIsCorrect(isRight);
    setIsAnswered(true);

    if (isRight) {
      // Award full 70 points, or 30 points if they checked the shortcut hint
      onAwardPoints(hintUsed ? 30 : 70); 
    }
  };

  return (
    <div className="bg-white rounded-3xl border-4 border-indigo-200 p-6 shadow-xl max-w-xl mx-auto transform rotate-[0.5deg]">
      
      {/* Module Title Header */}
      <div className="flex justify-between items-center border-b-2 border-slate-100 pb-3 mb-5">
        <span className="bg-indigo-100 text-indigo-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
          <Sparkles size={12} fill="currentColor"/> Spelling Bee Magic
        </span>
        <button 
          onClick={() => setHintUsed(true)}
          disabled={isAnswered || hintUsed}
          className="text-xs font-bold text-slate-400 hover:text-indigo-500 disabled:opacity-40"
        >
          {hintUsed ? `Clue: Starts with "${currentWord[0]?.toUpperCase()}"` : "❓ Need a Hint?"}
        </button>
      </div>

      {/* Main Speaker Action Button Panel */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-center text-white shadow-md mb-6 relative overflow-hidden">
        <p className="text-xs font-extrabold text-indigo-100 uppercase tracking-widest mb-2">Listen & Spell:</p>
        
        <audio ref={audioRef} className="hidden" />

        <button
          onClick={() => playAudio()}
          disabled={loading}
          className="bg-white text-indigo-600 p-5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all mx-auto flex items-center justify-center border-4 border-indigo-100 animate-pulse"
        >
          <Volume2 size={36} fill="currentColor" />
        </button>
        
        <p className="text-xs font-bold text-indigo-100 mt-3">Click the bubble to repeat out loud</p>
      </div>

      {/* Input Core Form System */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          disabled={isAnswered || loading}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.replace(/[^a-zA-Z]/g, ''))} // Filter to text only
          placeholder="Type your answer here..."
          className="w-full text-center bg-slate-50 border-3 border-slate-200 rounded-2xl py-3.5 px-4 text-2xl font-black text-slate-700 focus:outline-none focus:border-indigo-400 tracking-wide uppercase placeholder:text-slate-300 placeholder:normal-case"
        />

        {!isAnswered ? (
          <button
            type="submit"
            disabled={loading || userInput.trim() === ''}
            className="w-full bg-indigo-500 border-b-4 border-indigo-700 text-white font-black py-3 rounded-2xl text-sm shadow-md hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-40"
          >
            Check My Spelling! Check
          </button>
        ) : (
          <div className="pt-4 border-t-2 border-slate-50 flex justify-between items-center animate-fadeIn">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <span className="text-emerald-600 font-black text-sm flex items-center gap-1">
                  <CheckCircle size={18} fill="currentColor" stroke="white"/> Perfect! +{hintUsed ? '30' : '70'} pts
                </span>
              ) : (
                <span className="text-rose-500 font-black text-sm flex items-center gap-1">
                  <XCircle size={18} fill="currentColor" stroke="white"/> Correction: {currentWord.toUpperCase()}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={fetchWordAudio}
              className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-md flex items-center gap-1.5 transition-all"
            >
              Next Word <ArrowRight size={14} />
            </button>
          </div>
        )}
      </form>

    </div>
  );
}