import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export default function ClockMaster({ onAwardPoints }) {
  const [time, setTime] = useState({ hour: 12, minute: 0 });
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Array of all 12 hours with their exact positional angles for placement around the circle
  const CLOCK_NUMBERS = [
    { num: 12, angle: 0 }, { num: 1, angle: 30 }, { num: 2, angle: 60 },
    { num: 3, angle: 90 }, { num: 4, angle: 120 }, { num: 5, angle: 150 },
    { num: 6, angle: 180 }, { num: 7, angle: 210 }, { num: 8, angle: 240 },
    { num: 9, angle: 270 }, { num: 10, angle: 300 }, { num: 11, angle: 330 }
  ];

  const generateNewTime = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    const randomHour = Math.floor(Math.random() * 12) + 1;
    const randomMinute = Math.random() > 0.5 ? 0 : 30;
    
    setTime({ hour: randomHour, minute: randomMinute });

    const correctString = `${randomHour}:${randomMinute === 0 ? '00' : '30'}`;

    const choicesSet = new Set([correctString]);
    while (choicesSet.size < 4) {
      const fakeHour = Math.floor(Math.random() * 12) + 1;
      const fakeMinute = Math.random() > 0.5 ? 0 : 30;
      choicesSet.add(`${fakeHour}:${fakeMinute === 0 ? '00' : '30'}`);
    }

    setOptions(Array.from(choicesSet).sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generateNewTime();
  }, []);

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const correctString = `${time.hour}:${time.minute === 0 ? '00' : '30'}`;
    if (option === correctString) {
      onAwardPoints(50);
    }
  };

  const hourAngle = (time.hour * 30) + (time.minute === 30 ? 15 : 0);
  const minuteAngle = time.minute * 6;

  return (
    <div className="bg-white rounded-3xl border-4 border-amber-200 p-6 shadow-xl max-w-xl mx-auto transform rotate-[-0.5deg]">
      
      {/* Header Area */}
      <div className="flex justify-between items-center border-b-2 border-slate-100 pb-3 mb-6">
        <span className="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
          <Sparkles size={12} fill="currentColor"/> Clock Master
        </span>
        <span className="text-xs font-bold text-slate-400">Read the numbers to find the time!</span>
      </div>

      {/* 🕒 UPDATED ANALOG CLOCK FACE (Now displaying 1 to 12 completely) */}
      <div className="w-56 h-56 rounded-full border-8 border-indigo-500 bg-slate-50 mx-auto relative shadow-inner flex items-center justify-center mb-6">
        
        {/* Center Pivot Pin Dot */}
        <div className="w-4 h-4 bg-slate-800 rounded-full z-30 shadow-md"></div>
        
        {/* Hour Hand (Shorter, Dark Blue) */}
        <div 
          className="w-2.5 h-16 bg-indigo-900 rounded-full absolute origin-bottom bottom-1/2 z-10 transition-transform duration-500"
          style={{ transform: `rotate(${hourAngle}deg)` }}
        ></div>

        {/* Minute Hand (Longer, Bright Rose) */}
        <div 
          className="w-1.5 h-24 bg-rose-500 rounded-full absolute origin-bottom bottom-1/2 z-20 transition-transform duration-500"
          style={{ transform: `rotate(${minuteAngle}deg)` }}
        ></div>

        {/* 🌟 Dynamic Number Layer Mapping (Positioned beautifully using trigonometry angles) */}
        {CLOCK_NUMBERS.map((item) => {
          // Calculate polar position spacing relative to the clock's radius
          const radiusOffset = 82; 
          const radians = (item.angle * Math.PI) / 180;
          const x = Math.sin(radians) * radiusOffset;
          const y = -Math.cos(radians) * radiusOffset;

          return (
            <span
              key={item.num}
              className="absolute font-black text-slate-700 text-base select-none transition-all duration-300"
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
            >
              {item.num}
            </span>
          );
        })}
      </div>

      {/* Choices Options Mapping Grid */}
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, idx) => {
          const correctString = `${time.hour}:${time.minute === 0 ? '00' : '30'}`;
          const isSelected = selectedOption === option;
          const isCorrect = option === correctString;

          let cardStyles = "border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-400 hover:bg-amber-50/10";
          if (isAnswered) {
            if (isCorrect) cardStyles = "border-emerald-500 bg-emerald-50 text-emerald-800 scale-102 shadow-sm";
            else if (isSelected) cardStyles = "border-rose-400 bg-rose-50 text-rose-800";
            else cardStyles = "border-slate-100 bg-slate-50 text-slate-300 opacity-40";
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleOptionClick(option)}
              className={`p-4 rounded-xl border-3 text-center font-black text-2xl transition-all active:scale-95 ${cardStyles}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Actions Result Feed strip */}
      {isAnswered && (
        <div className="mt-6 pt-4 border-t-2 border-slate-50 flex justify-between items-center animate-fadeIn">
          <div className="flex items-center gap-2">
            {selectedOption === `${time.hour}:${time.minute === 0 ? '00' : '30'}` ? (
              <span className="text-emerald-600 font-black text-sm flex items-center gap-1">
                <CheckCircle size={18} fill="currentColor" stroke="white"/> Brilliant! +50 pts
              </span>
            ) : (
              <span className="text-rose-500 font-black text-sm flex items-center gap-1">
                <XCircle size={18} fill="currentColor" stroke="white"/> Keep practicing!
              </span>
            )}
          </div>
          <button
            onClick={generateNewTime}
            className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-md flex items-center gap-1.5"
          >
            Next Clock <ArrowRight size={14} />
          </button>
        </div>
      )}

    </div>
  );
}