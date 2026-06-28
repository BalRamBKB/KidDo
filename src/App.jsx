import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, Trophy, Gamepad2, Menu, X, LogOut, Star } from 'lucide-react';

// Import Subcomponents
import AuthScreen from './components/AuthScreen';
import WelcomeBanner from './components/WelcomeBanner';
import ProgressCards from './components/ProgressCards';
import LessonGrid from './components/LessonGrid';
import Achievements from './components/Achievements';
import InteractiveTasks from './components/InteractiveTasks';
import RewardChest from './components/RewardChest';
import LessonsContainer from './components/LessonsContainer';
import WordGame from './components/WordGame';
import TrophyRoom from './components/TrophyRoom';
import MathSprint from './components/MathSprint';
import SpellingBee from './components/SpellingBee';
import ClockMaster from './components/ClockMaster';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // 🔐 Authentication & Profile States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Explorer');

  // Dashboard & Tracking States
  const [score, setScore] = useState(350);
  const [streak, setStreak] = useState(4);
  const [selectedLessonSubject, setSelectedLessonSubject] = useState('Math');
  const [currentGame, setCurrentGame] = useState('menu'); // 'menu', 'scramble', or 'math'

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Read 1 Story Book Chapter', points: 50, emoji: '📖', completed: false },
    { id: 2, title: 'Finish Magic Math Level 2', points: 100, emoji: '🔢', completed: false },
    { id: 3, title: 'Learn 5 Space Vocabulary words', points: 50, emoji: '🪐', completed: false },
  ]);

  const [lessons, setLessons] = useState([
    { id: 'Math', name: 'Magic Math: Addition', icon: '🔢', progress: 0, totalCards: 3, currentCard: 0, color: 'border-amber-400', barBg: 'bg-amber-400', tag: 'Math' },
    { id: 'Science', name: 'Space Explorers: Planets', icon: '🚀', progress: 0, totalCards: 3, currentCard: 0, color: 'border-indigo-400', barBg: 'bg-indigo-400', tag: 'Science' },
    { id: 'English', name: 'Phonics & Rhyming Words', icon: '📚', progress: 0, totalCards: 3, currentCard: 0, color: 'border-rose-400', barBg: 'bg-rose-400', tag: 'English' },
  ]);

  const badgeRequirements = [
    { id: 'bronze', name: 'Star Novice', scoreRequired: 400, emoji: '🌱', desc: 'Earned 400 total points' },
    { id: 'silver', name: 'Brainy Voyager', scoreRequired: 600, emoji: '🚀', desc: 'Explored past 600 points' },
    { id: 'gold', name: 'Trivia Titan', scoreRequired: 850, emoji: '👑', desc: 'Mastered 850 points' },
    { id: 'diamond', name: 'Grandmaster', scoreRequired: 1200, emoji: '💎', desc: 'Ultimate rank at 1200 points' },
  ];

  const completedCount = tasks.filter(t => t.completed).length;
  const earnedBadges = badgeRequirements.filter(badge => score >= badge.scoreRequired);

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const nextState = !task.completed;
        setScore(prev => nextState ? prev + task.points : prev - task.points);
        return { ...task, completed: nextState };
      }
      return task;
    }));
  };

  const handleAwardLessonPoints = (subject, currentCardIndex, totalCards, pointsAwarded) => {
    setScore(prev => prev + pointsAwarded);
    setLessons(prevLessons => prevLessons.map(lesson => {
      if (lesson.id === subject) {
        const calculatedProgress = Math.round((currentCardIndex / totalCards) * 100);
        return { ...lesson, currentCard: currentCardIndex, progress: calculatedProgress };
      }
      return lesson;
    }));
  };

  // 🚀 LOGOUT HANDLER
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('Explorer');
    setScore(350); // Optional: Reset or persist score based on preference
    setActiveTab('dashboard');
    setIsSidebarOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <AuthScreen
        onLoginSuccess={(kidName) => {
          setUserName(kidName);
          setIsLoggedIn(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/60 via-indigo-50/20 to-emerald-50/40 text-slate-800 font-sans antialiased">

      {/* MOBILE NAVBAR HEADER */}
      <header className="lg:hidden bg-white border-b-4 border-slate-100 px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <span className="bg-amber-400 text-white font-black text-lg px-3 py-1 rounded-xl shadow-sm">✨ KidDo</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="p-2 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-colors"
            title="Log Out"
          >
            <LogOut size={18} />
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-50 rounded-xl text-slate-700">
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* DESKTOP & MOBILE DRAWER SIDEBAR */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r-4 border-amber-100 p-5 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen flex flex-col justify-between shrink-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="space-y-8">
            <div className="hidden lg:flex items-center gap-2">
              <span className="bg-amber-400 text-white font-black text-2xl px-4 py-1.5 rounded-2xl shadow-md rotate-[-1deg] inline-block">
                ✨ KidDo
              </span>
            </div>

            <nav className="space-y-2.5">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-amber-500' },
                { id: 'lessons', label: 'My Lessons', icon: BookOpen, color: 'text-indigo-500' },
                { id: 'games', label: 'Play Zone', icon: Gamepad2, color: 'text-emerald-500' },
                { id: 'awards', label: 'Awards', icon: Trophy, color: 'text-rose-500' }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-black text-md transition-all transform hover:scale-[1.02] text-left
                      ${isActive ? 'bg-amber-400 text-white shadow-sm' : 'bg-slate-50/60 hover:bg-amber-50 text-slate-600'}`}
                  >
                    <Icon className={isActive ? 'text-white' : item.color} size={22} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* LOWER SIDEBAR WORKSPACE: USER CARD & LOGOUT */}
          <div className="space-y-3 mt-auto">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-2xl text-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-inner">🦊</div>
                <div className="min-w-0">
                  <h4 className="font-bold truncate text-sm">{userName}</h4>
                  <p className="text-[10px] text-purple-100 flex items-center gap-0.5"><Star size={10} fill="currentColor" /> Explorer Lvl {Math.floor(score / 300) + 1}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all border-2 border-transparent hover:border-rose-200"
            >
              <LogOut size={16} />
              Log Out Game
            </button>
          </div>
        </aside>

        {/* VIEW ROUTER BODY WRAPPER CONTAINER */}
        <main className="flex-1 max-h-screen overflow-y-auto w-full bg-gradient-to-b from-amber-50/60 via-indigo-50/20 to-emerald-50/40 flex flex-col justify-between">

          {/* TOP PART: ALL ACTIVE CONTENT VIEWS */}
          <div className="p-4 sm:p-6 lg:p-8 flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6 max-w-7xl mx-auto">
                <WelcomeBanner kidName={userName} />
                <ProgressCards currentScore={score} currentStreak={streak} completedCount={completedCount} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <InteractiveTasks tasks={tasks} onToggleTask={handleToggleTask} />
                    <LessonGrid
                      lessons={lessons}
                      onJumpToLessons={(subjectId) => {
                        setSelectedLessonSubject(subjectId);
                        setActiveTab('lessons');
                      }}
                    />
                  </div>

                  <div className="space-y-6">
                    <RewardChest totalTasks={tasks.length} completedTasks={completedCount} />
                    <Achievements earnedBadges={earnedBadges} onJumpToAwards={() => setActiveTab('awards')} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lessons' && (
              <div className="space-y-6 max-w-4xl mx-auto pt-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-2xl flex justify-between items-center shadow-md">
                  <span className="font-black text-lg">🏫 Homework Explorer Academy</span>
                  <span className="bg-white/20 backdrop-blur-md text-white font-extrabold px-3 py-1 rounded-full text-sm">🌟 {score} pts</span>
                </div>
                <LessonsContainer
                  key={selectedLessonSubject}
                  initialSubject={selectedLessonSubject}
                  onAwardPoints={(subj, cardIdx, total, pts) => handleAwardLessonPoints(subj, cardIdx, total, pts)}
                />
              </div>
            )}

            {/* TAB 3: ARCADE MINIGAME HUB */}
            {activeTab === 'games' && (
              <div className="space-y-6 max-w-4xl mx-auto pt-4">

                {/* Arcade Interactive Sub-Header bar */}
                <div className="bg-emerald-500 text-white px-6 py-4 rounded-2xl flex justify-between items-center shadow-md">
                  <div className="flex items-center gap-3">
                    {currentGame !== 'menu' && (
                      <button
                        onClick={() => setCurrentGame('menu')}
                        className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-all"
                      >
                        ⬅ Back to Arcade Menu
                      </button>
                    )}
                    <span className="font-black text-lg">🎈 Star Arcade Zone</span>
                  </div>
                  <span className="bg-white text-emerald-600 font-extrabold px-3 py-1 rounded-full text-sm">
                    My Score: {score} pts
                  </span>
                </div>

                {/* VIEW 1: CENTRAL ARCADE CHOOSE MENU */}
                {currentGame === 'menu' && (
                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl border-4 border-slate-100 text-center sm:text-left">
                      <h3 className="font-black text-xl text-slate-700">Choose Your Game Challenge!</h3>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">Pick a magical game track to level up your scores.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Game Choice Card 1: Word Scramble */}
                      <div className="bg-white rounded-2xl p-5 border-3 border-emerald-200 shadow-sm flex flex-col justify-between items-start gap-4">
                        <div>
                          <span className="text-4xl">🔠</span>
                          <h4 className="font-black text-lg text-slate-700 mt-2">Word Scramble Puzzles</h4>
                          <p className="text-xs text-slate-400 font-medium mt-1">Unscramble mixed-up letters to find hidden words and unlock massive vocab secrets!</p>
                        </div>
                        <button
                          onClick={() => setCurrentGame('scramble')}
                          className="w-full bg-emerald-400 border-b-4 border-emerald-600 text-white font-black py-2.5 rounded-xl text-sm shadow-md hover:bg-emerald-500 transition-all text-center"
                        >
                          Play Word Game 🚀
                        </button>
                      </div>

                      {/* Game Choice Card 2: Math Sprint */}
                      <div className="bg-white rounded-2xl p-5 border-3 border-amber-200 shadow-sm flex flex-col justify-between items-start gap-4">
                        <div>
                          <span className="text-4xl">⚡</span>
                          <h4 className="font-black text-lg text-slate-700 mt-2">Math Sprint Blitz</h4>
                          <p className="text-xs text-slate-400 font-medium mt-1">Test your math superpowers! Solve rapid addition and subtraction problems to stack high win streaks.</p>
                        </div>
                        <button
                          onClick={() => setCurrentGame('math')}
                          className="w-full bg-amber-400 border-b-4 border-amber-600 text-white font-black py-2.5 rounded-xl text-sm shadow-md hover:bg-amber-500 transition-all text-center"
                        >
                          Play Math Blitz 🎯
                        </button>
                      </div>

                      {/* Game Choice Card 3: Spelling Bee */}
                      <div className="bg-white rounded-2xl p-5 border-3 border-indigo-200 shadow-sm flex flex-col justify-between items-start gap-4">
                        <div>
                          <span className="text-4xl">🐝</span>
                          <h4 className="font-black text-lg text-slate-700 mt-2">Spelling Bee Magic</h4>
                          <p className="text-xs text-slate-400 font-medium mt-1">Listen to standard spoken voice modulations and check your typing accuracy. Perfect for practicing audio phonics!</p>
                        </div>
                        <button
                          onClick={() => setCurrentGame('bee')}
                          className="w-full bg-indigo-500 border-b-4 border-indigo-700 text-white font-black py-2.5 rounded-xl text-sm shadow-md hover:bg-indigo-600 transition-all text-center"
                        >
                          Play Spelling Bee 🎧
                        </button>
                      </div>


                      {/* Game Choice Card 4: Clock Master */}
                      <div className="bg-white rounded-2xl p-5 border-3 border-amber-200 shadow-sm flex flex-col justify-between items-start gap-4">
                        <div>
                          <span className="text-4xl">⏰</span>
                          <h4 className="font-black text-lg text-slate-700 mt-2">Clock Master Time</h4>
                          <p className="text-xs text-slate-400 font-medium mt-1">Practice reading interactive analog clock needles to level up real-world matching competencies!</p>
                        </div>
                        <button
                          onClick={() => setCurrentGame('clock')}
                          className="w-full bg-amber-400 border-b-4 border-amber-600 text-white font-black py-2.5 rounded-xl text-sm shadow-md hover:bg-amber-500 transition-all text-center"
                        >
                          Play Clock Master ⏰
                        </button>
                      </div>


                    </div>
                  </div>
                )}

                {/* VIEW 2: WORD GAME RENDER VIEW */}
                {currentGame === 'scramble' && (
                  <WordGame onAwardPoints={(points) => setScore(prev => prev + points)} />
                )}

                {/* VIEW 3: MATH SPRINT RENDER VIEW */}
                {currentGame === 'math' && (
                  <MathSprint onAwardPoints={(points) => setScore(prev => prev + points)} />
                )}
                {/* 🌟 ADD THIS: VIEW 4: SPELLING BEE AUDIO QUEST */}
                {currentGame === 'bee' && (
                  <SpellingBee onAwardPoints={(points) => setScore(prev => prev + points)} />
                )}
                 {/* 🌟 ADD THIS: VIEW 5: Clock Master */}
                {currentGame === 'clock' && (
                  <ClockMaster onAwardPoints={(points) => setScore(prev => prev + points)} />
                )}

              </div>
            )}

            {activeTab === 'awards' && (
              <div className="space-y-6 max-w-4xl mx-auto pt-4">
                <div className="bg-rose-500 text-white px-6 py-4 rounded-2xl flex justify-between items-center shadow-md">
                  <span className="font-black text-lg">🏆 My Hall of Fame Rewards</span>
                  <span className="bg-white text-rose-600 font-extrabold px-3 py-1 rounded-full text-sm">Balance: {score} pts</span>
                </div>
                <TrophyRoom currentScore={score} />
              </div>
            )}
          </div>

        </main>

      </div>
    </div>

  );
}