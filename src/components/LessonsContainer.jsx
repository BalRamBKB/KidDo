import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

const LESSONS_DATA = {
  Math: [
    { question: "What is 5 + 4?", options: ["7", "9", "12", "8"], answer: "9", reward: 50 },
    { question: "Double 6 makes what number?", options: ["10", "12", "14", "16"], answer: "12", reward: 50 },
    { question: "If you have 3 apples and buy 4 more, how many do you have?", options: ["6", "7", "8", "9"], answer: "7", reward: 50 }
  ],
  Science: [
    { question: "Which planet is closest to the Sun?", options: ["Mars", "Earth", "Mercury", "Venus"], answer: "Mercury", reward: 60 },
    { question: "What turns into a beautiful butterfly?", options: ["Frog", "Caterpillar", "Bee", "Ant"], answer: "Caterpillar", reward: 60 },
    { question: "What do plants need to make their own food?", options: ["Candy", "Darkness", "Sunlight & Water", "Milk"], answer: "Sunlight & Water", reward: 60 }
  ],
  English: [
    { question: "Which word rhymes with 'CAT'?", options: ["DOG", "BAT", "BALL", "TREE"], answer: "BAT", reward: 40 },
    { question: "Pick the action word (Verb):", options: ["RUN", "APPLE", "BLUE", "HAPPY"], answer: "RUN", reward: 40 },
    { question: "Capital letter belongs at the _____ of a sentence.", options: ["Middle", "End", "Beginning", "Bottom"], answer: "Beginning", reward: 40 }
  ]
};

export default function LessonsContainer({ initialSubject = 'Math', onAwardPoints }) {
  // 🌟 FIX: Initialize active subject with the prop coming from home page resume button
  const [activeSubject, setActiveSubject] = useState(initialSubject);
  
  // Tracks question position separately for each subject
  const [subjectProgress, setSubjectProgress] = useState({
    Math: 0,
    Science: 0,
    English: 0
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);

  // 🌟 FIX: Listen to changes if the user clicks a specific subject from the homepage card
  useEffect(() => {
    setActiveSubject(initialSubject);
    setSelectedOption(null);
    setIsAnswered(false);
    setScoreEarned(0);
  }, [initialSubject]);

  const currentIdx = subjectProgress[activeSubject];
  const subjectData = LESSONS_DATA[activeSubject];
  const activeQuiz = subjectData[currentIdx] || subjectData[subjectData.length - 1];
  const isLastQuestion = currentIdx === subjectData.length - 1;
  const isFinished = currentIdx >= subjectData.length;

  const handleSubjectChange = (subject) => {
    setActiveSubject(subject);
    setSelectedOption(null);
    setIsAnswered(false);
    setScoreEarned(0);
  };

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === activeQuiz.answer;
    const pointsAwarded = isCorrect ? activeQuiz.reward : 0;

    if (isCorrect) {
      setScoreEarned(prev => prev + pointsAwarded);
    }

    onAwardPoints(activeSubject, currentIdx + 1, subjectData.length, pointsAwarded);
  };

  const handleNext = () => {
    setSubjectProgress(prev => {
      const nextIdx = prev[activeSubject] + 1;
      if (nextIdx >= subjectData.length) {
        onAwardPoints(activeSubject, subjectData.length, subjectData.length, 0);
      }
      return { ...prev, [activeSubject]: nextIdx };
    });
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleReset = () => {
    setSubjectProgress(prev => ({ ...prev, [activeSubject]: 0 }));
    setSelectedOption(null);
    setIsAnswered(false);
    setScoreEarned(0);
    onAwardPoints(activeSubject, 0, subjectData.length, 0);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Subject Filter Tabs */}
      <div className="flex bg-slate-100 p-2 rounded-2xl gap-2 border border-slate-200">
        {Object.keys(LESSONS_DATA).map((subject) => (
          <button
            key={subject}
            onClick={() => handleSubjectChange(subject)}
            className={`flex-1 text-center font-black py-2.5 rounded-xl transition-all capitalize text-sm sm:text-base
              ${activeSubject === subject 
                ? 'bg-indigo-500 text-white shadow-sm scale-105' 
                : 'text-slate-600 hover:bg-slate-200/70'}`}
          >
            {subject === 'Math' ? '🔢 ' : subject === 'Science' ? '🚀 ' : '📚 '}
            {subject}
          </button>
        ))}
      </div>

      {/* Main Flashcard Body */}
      <div className="bg-white rounded-3xl border-4 border-indigo-100 p-6 sm:p-8 shadow-xl">
        {isFinished ? (
          <div className="text-center py-8 space-y-4">
            <span className="text-6xl">👑</span>
            <h3 className="text-2xl font-black text-slate-800">{activeSubject} Adventure Cleared!</h3>
            <button
              onClick={handleReset}
              className="bg-slate-800 text-white font-black px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-sm mx-auto shadow-md"
            >
              <RotateCcw size={16} /> Restart Subject
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 border-b-2 border-slate-50 pb-4">
              <span className="uppercase tracking-wide">💡 Topic: {activeSubject}</span>
              <span>Card {currentIdx + 1} of {subjectData.length}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              {activeQuiz.question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeQuiz.options.map((option, idx) => {
                const isCurrent = selectedOption === option;
                const isCorrectOption = option === activeQuiz.answer;

                let btnStyles = "border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300";
                if (isAnswered) {
                  if (isCorrectOption) btnStyles = "border-emerald-400 bg-emerald-50 text-emerald-800";
                  else if (isCurrent) btnStyles = "border-rose-400 bg-rose-50 text-rose-800";
                  else btnStyles = "border-slate-100 bg-slate-50 text-slate-300 opacity-40";
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionClick(option)}
                    className={`w-full p-4 rounded-2xl border-3 text-left font-extrabold transition-all flex items-center justify-between ${btnStyles}`}
                  >
                    <span>{option}</span>
                    {isAnswered && isCorrectOption && <CheckCircle className="text-emerald-500" size={20} />}
                    {isAnswered && isCurrent && !isCorrectOption && <XCircle className="text-rose-500" size={20} />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="pt-4 flex justify-between items-center border-t-2 border-slate-50">
                <p className={`text-sm font-black ${selectedOption === activeQuiz.answer ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {selectedOption === activeQuiz.answer ? "🎉 Correct! Points added." : "💡 Good try! Let's try the next one."}
                </p>
                <button
                  onClick={handleNext}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-md flex items-center gap-1.5"
                >
                  {isLastQuestion ? "Finish Track" : "Next Question"} <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}