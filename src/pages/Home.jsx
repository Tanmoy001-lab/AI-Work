import React, { useState } from 'react';
import { translations } from '../utils/translations';
import { 
  Mic, 
  Search, 
  FileText, 
  CreditCard, 
  Compass, 
  TrendingUp, 
  Sparkles,
  BookOpen, 
  GraduationCap, 
  Clock, 
  Award 
} from 'lucide-react';

export default function Home({ 
  currentLang, 
  setActivePage, 
  setSearchQuery, 
  handleStartListening 
}) {
  const t = translations[currentLang] || translations.en;
  const [typedQuery, setTypedQuery] = useState('');

  const trendingQuestions = [
    { text: "DU admission kab se shuru hogi?", langCode: "hi" },
    { text: "NEET ke liye kya documents chahiye?", langCode: "hi" },
    { text: "PM Kisan scheme eligibility kya hai?", langCode: "hi" },
    { text: "Aadhaar link to PAN card status check", langCode: "en" },
    { text: "How to check Voter ID name in roll", langCode: "en" },
  ];

  const recentSearches = [
    "Aadhaar-Bank Seeding status",
    "Post Matric SC Scholarship last date",
    "Driving Licence renewal guide"
  ];

  const quickCards = [
    { id: 'status', query: 'Aadhaar linking status', label: "Aadhaar Card Help", icon: CreditCard, color: "from-orange-500 to-amber-500" },
    { id: 'status', query: 'PAN update guide', label: "PAN Card Help", icon: FileText, color: "from-blue-500 to-indigo-500" },
    { id: 'status', query: 'Passport track', label: "Passport Status", icon: Compass, color: "from-teal-500 to-emerald-500" },
    { id: 'form', query: 'PAN Card Form Guidance', label: "PAN Form Assistant", icon: Sparkles, color: "from-purple-500 to-pink-500" },
    { id: 'scheme', query: 'Post Matric Scholarship', label: "Scholarship Schemes", icon: Award, color: "from-red-500 to-rose-500" },
    { id: 'college', query: 'CUET admission', label: "University Entrance", icon: GraduationCap, color: "from-blue-600 to-cyan-500" }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (typedQuery.trim()) {
      setSearchQuery(typedQuery);
      setActivePage('ai');
    }
  };

  const handleChipClick = (queryText) => {
    setSearchQuery(queryText);
    setActivePage('ai');
  };

  return (
    <div className="space-y-12 animate-fade-in">
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-6 sm:pt-10">
        
        {/* Tri-color Accent Badge */}
        <div className="inline-flex items-center space-x-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-saffron" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-tricolor-green" />
          <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
            Digital India Guidance System
          </span>
        </div>

        {/* Hero Headlines */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Sarkar Aur Education Ki Har <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-primary-blue via-indigo-600 to-saffron bg-clip-text text-transparent">
            Uljhan Ka AI Hal
          </span>
        </h1>
        
        <p className="text-sm sm:text-lg text-slate-500 max-w-xl mx-auto font-medium">
          {t.tagline}
        </p>

        {/* Main Google-like Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mt-8 relative">
          <div className="relative flex items-center bg-white shadow-xl shadow-slate-100/50 rounded-2xl border border-slate-200/80 p-1.5 sm:p-2 transition-all duration-300 focus-within:ring-4 focus-within:ring-primary-blue/10 focus-within:border-primary-blue">
            
            <Search className="w-5 h-5 text-slate-400 ml-3" />
            
            <input
              type="text"
              value={typedQuery}
              onChange={(e) => setTypedQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent border-0 outline-none text-slate-800 text-sm sm:text-base px-3 py-2.5 sm:py-3.5 placeholder:text-slate-400 font-medium"
            />
            
            {/* Mic trigger buttons */}
            <button
              type="button"
              onClick={handleStartListening}
              className="p-2.5 sm:p-3.5 bg-gradient-to-r from-primary-blue to-indigo-600 text-white rounded-xl shadow-md shadow-blue-500/20 hover:brightness-105 active:scale-95 transition flex items-center justify-center shrink-0"
              title={t.micTooltip}
            >
              <Mic className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse-ring" />
            </button>

          </div>
        </form>

        {/* Security / Privacy Banner */}
        <p className="text-[11px] sm:text-xs text-slate-400 max-w-md mx-auto">
          🔒 <strong>Privacy Guarantee</strong>: {t.privacyNotice}
        </p>

      </section>

      {/* Quick Services access matrix grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-saffron" />
            <span>Quick Services Portal Help</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {quickCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActivePage(card.id);
                  if (card.id === 'status' || card.id === 'scheme') {
                    setSearchQuery(card.query);
                  }
                }}
                className="group bg-white border border-slate-100 p-4 sm:p-5 rounded-2xl shadow-sm text-left hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between h-36 focus:outline-none focus:ring-2 focus:ring-primary-blue/30"
              >
                <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${card.color} text-white shadow-sm w-fit group-hover:scale-110 transition duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-extrabold text-slate-800 leading-tight">
                    {card.label}
                  </span>
                  <span className="block text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                    Guides & Forms
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Trending & Recent Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Trending Searches */}
        <div className="bg-white border border-slate-100 p-6 sm:p-7 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center space-x-2 border-b border-slate-50 pb-3">
            <TrendingUp className="w-4 h-4 text-primary-blue" />
            <span>{t.trending}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {trendingQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(q.text)}
                className="bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-primary-blue px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-100 hover:border-blue-100 transition duration-150 text-left flex items-center space-x-1.5 focus:outline-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary-blue" />
                <span>{q.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="bg-white border border-slate-100 p-6 sm:p-7 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center space-x-2 border-b border-slate-50 pb-3">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>{t.recent}</span>
          </h3>
          <div className="flex flex-col space-y-2">
            {recentSearches.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(s)}
                className="w-full text-left bg-white hover:bg-slate-50 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-800 transition flex items-center space-x-2 border border-slate-50"
              >
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{s}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
