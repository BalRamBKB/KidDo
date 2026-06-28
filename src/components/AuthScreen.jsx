import React, { useState } from 'react';
import { Sparkles, ArrowRight, Smile, Shield, Mail, AlertCircle, BookOpen, Gamepad2, Trophy, Heart } from 'lucide-react';

export default function AuthScreen({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    kidName: '',
    parentEmail: '',
    avatar: '🦊'
  });

  const avatars = ['🦊', '🦖', '🦄', '🦁', '🐼', '🐸'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    const formattedName = formData.kidName.trim().toUpperCase();
    const displayKidName = formData.kidName.trim().charAt(0).toUpperCase() + formData.kidName.trim().slice(1);
    const registeredUsers = JSON.parse(localStorage.getItem('registered_kids') || "[]");

    if (isSignUp) {
      if (registeredUsers.includes(formattedName)) {
        setErrorMsg('✨ That name is already registered! Try logging in instead.');
        return;
      }
      registeredUsers.push(formattedName);
      localStorage.setItem('registered_kids', JSON.stringify(registeredUsers));
      onLoginSuccess(displayKidName);
    } else {
      if (!registeredUsers.includes(formattedName)) {
        setErrorMsg('🔍 Name not found! Click the link below to join the Academy first.');
        return;
      }
      onLoginSuccess(displayKidName);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-indigo-50/50 to-emerald-50 flex flex-col justify-between font-sans">
      
      {/* 1. MARKETING HEADER/NAVBAR */}
      <header className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 select-none">
          <span className="bg-amber-400 text-white font-black text-xl sm:text-2xl px-4 py-1.5 rounded-2xl shadow-md rotate-[-1deg] inline-block">
            ✨ KidDo
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs sm:text-sm font-bold text-slate-500">
          <span className="hidden sm:inline">🚀 Made for Young Explorers</span>
          <button 
            onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); }}
            className="bg-white border-2 border-slate-200 hover:border-amber-300 text-slate-700 px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
          >
            {isSignUp ? "Sign In" : "Register"}
          </button>
        </div>
      </header>

      {/* 2. MAIN HERO & AUTH GRID */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: HERO MARKETING TEXT (Visible nicely on desktop, collapses to top on mobile) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="bg-indigo-100 text-indigo-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              🎉 Learning Made Magical
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 leading-tight tracking-tight">
              Play. Learn. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500">
                Unlock Trophies!
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Welcome to KidDo! A fully gamified learning universe built for kids. Conquer magical math puzzles, explore the solar system, and level up your custom profile companion.
            </p>

            {/* Application Features Mini-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-2xl mx-auto lg:mx-0">
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border-2 border-amber-100 shadow-sm flex items-start gap-3">
                <div className="bg-amber-400 text-white p-2 rounded-xl shrink-0"><Gamepad2 size={18}/></div>
                <div>
                  <h4 className="font-bold text-slate-700 text-sm">Play Zone</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Brainy word games & arcade puzzles.</p>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border-2 border-indigo-100 shadow-sm flex items-start gap-3">
                <div className="bg-indigo-500 text-white p-2 rounded-xl shrink-0"><BookOpen size={18}/></div>
                <div>
                  <h4 className="font-bold text-slate-700 text-sm">Academy</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Bite-sized flashcard study quests.</p>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border-2 border-rose-100 shadow-sm flex items-start gap-3">
                <div className="bg-rose-500 text-white p-2 rounded-xl shrink-0"><Trophy size={18}/></div>
                <div>
                  <h4 className="font-bold text-slate-700 text-sm">Trophy Shelf</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Unlock custom dynamic badges.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE AUTHENTICATION CONTAINER BOX */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="bg-white rounded-3xl border-4 border-amber-200 p-6 sm:p-8 shadow-2xl transform lg:rotate-[1deg] relative overflow-hidden">
              
              <div className="text-center mb-6">
                <h2 className="text-xl font-black text-slate-700">
                  {isSignUp ? "Create Student Profile" : "Explorer Login"}
                </h2>
                <p className="text-xs font-semibold text-slate-400 mt-1">
                  {isSignUp ? "Set up your character to start earning score points." : "Type your chosen first name to jump right back in!"}
                </p>
              </div>

              {/* Dynamic Error Messaging Alert Bar */}
              {errorMsg && (
                <div className="bg-rose-50 border-2 border-rose-200 text-rose-700 p-3.5 rounded-2xl flex items-start gap-2.5 font-bold text-xs mb-4 animate-shake">
                  <AlertCircle className="shrink-0 mt-0.5" size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Auth Core Interactive Form Input Wrapper */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wide flex items-center gap-1">
                    <Smile size={14} className="text-amber-500" /> Kid's First Name
                  </label>
                  <div className="relative mt-1">
                    <Sparkles className="absolute left-3 top-3.5 text-amber-400" size={18} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan"
                      value={formData.kidName}
                      onChange={(e) => {
                        setFormData({ ...formData, kidName: e.target.value });
                        if(errorMsg) setErrorMsg('');
                      }}
                      className="w-full bg-slate-50 border-3 border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-base focus:outline-none focus:border-amber-400 font-bold placeholder:text-slate-300"
                    />
                  </div>
                </div>

                {isSignUp && (
                  <div className="space-y-4 pt-2 border-t-2 border-dashed border-slate-100">
                    <div>
                      <label className="text-xs font-black text-slate-400 uppercase tracking-wide flex items-center gap-1">
                        <Shield size={14} className="text-indigo-500" /> Parent's Email (For Saving Badges)
                      </label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                        <input
                          type="email"
                          required={isSignUp}
                          placeholder="parent@example.com"
                          value={formData.parentEmail}
                          onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                          className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-400 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-black text-slate-500 uppercase tracking-wide">Select Character Avatar</label>
                      <div className="grid grid-cols-6 gap-2 mt-1.5">
                        {avatars.map((av) => (
                          <button
                            key={av}
                            type="button"
                            onClick={() => setFormData({ ...formData, avatar: av })}
                            className={`text-2xl p-2 rounded-xl transition-all border-2 
                              ${formData.avatar === av ? 'border-amber-400 bg-amber-50 scale-110 shadow-sm' : 'border-slate-100 bg-slate-50'}`}
                          >
                            {av}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-amber-400 border-b-4 border-amber-600 text-white font-black py-3.5 rounded-2xl mt-2 shadow-md hover:bg-amber-500 active:scale-95 transition-all flex items-center justify-center gap-2 text-md"
                >
                  {isSignUp ? "Start My Adventure!" : "Enter Learning Zone!"} <ArrowRight size={18} />
                </button>
              </form>

              {/* Mode Toggle Footer Action Bar */}
              <div className="mt-6 text-center pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setErrorMsg('');
                  }}
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  {isSignUp ? "Already registered? Sign In here" : "First time exploring? Create account"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* 3. LANDING PAGE FOOTER */}
      <footer className="w-full py-4 bg-white/40 border-t border-slate-100 mt-auto text-center text-xs font-bold text-slate-400 flex items-center justify-center gap-1">
        Developed By BalRam & Made with <Heart size={12} className="text-rose-400" fill="currentColor"/> for early childhood learning
      </footer>

    </div>
  );
}