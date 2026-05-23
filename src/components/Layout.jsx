import React, { useState } from 'react';
import { languages, translations } from '../utils/translations';
import { 
  Home, 
  MessageSquare, 
  FileText, 
  Search, 
  BookOpen, 
  Briefcase, 
  Wrench, 
  Calendar, 
  User, 
  Menu, 
  X, 
  ShieldAlert,
  Mic
} from 'lucide-react';

export default function Layout({ 
  children, 
  currentLang, 
  setCurrentLang, 
  activePage, 
  setActivePage,
  isListeningGlobal 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang] || translations.en;

  const navItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'ai', label: t.navAI, icon: MessageSquare },
    { id: 'form', label: t.navForm, icon: FileText },
    { id: 'status', label: t.navStatus, icon: Search },
    { id: 'scheme', label: t.navScheme, icon: Briefcase },
    { id: 'college', label: t.navCollege, icon: BookOpen },
    { id: 'tools', label: t.navTools, icon: Wrench },
    { id: 'reminders', label: t.navReminders, icon: Calendar },
    { id: 'profile', label: t.navProfile, icon: User },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-primary-blue/10 selection:text-primary-blue">
      {/* Indian Flag Accent Bar */}
      <div className="tricolor-bar" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 sm:space-x-3 text-left focus:outline-none"
          >
            <div className="bg-gradient-to-tr from-saffron to-primary-blue p-2.5 rounded-xl shadow-md flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="block text-lg sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary-blue to-saffron bg-clip-text text-transparent leading-none">
                {t.appName}
              </span>
              <span className="block text-[10px] sm:text-xs font-semibold text-slate-400 mt-0.5 tracking-wider uppercase">
                AI जन सेवा सहायक
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.slice(0, 8).map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-50 text-primary-blue shadow-sm shadow-blue-50/50' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary-blue' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Languages, Profile, Mic Status */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Listening Indicator */}
            {isListeningGlobal && (
              <div className="flex items-center space-x-1 bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs font-bold border border-red-100 animate-pulse">
                <Mic className="w-3.5 h-3.5 animate-bounce" />
                <span className="hidden sm:inline">LISTENING</span>
              </div>
            )}

            {/* Language Selection Dropdown */}
            <div className="relative">
              <select
                id="language-selector"
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 pr-8 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all cursor-pointer shadow-sm"
                aria-label="Select Language"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.native}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>

            {/* Profile Trigger (Desktop) */}
            <button
              onClick={() => handleNavClick('profile')}
              className={`hidden sm:flex items-center justify-center p-2 rounded-xl border transition-all ${
                activePage === 'profile'
                  ? 'bg-blue-50 border-primary-blue/30 text-primary-blue shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
              }`}
              title={t.navProfile}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-blue/30"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="fixed top-16 right-0 bottom-0 w-72 bg-white shadow-2xl p-6 flex flex-col justify-between border-l border-slate-100 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Menu Navigation
              </span>
              <div className="flex flex-col space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full px-4 py-3 rounded-xl text-left font-semibold flex items-center space-x-3.5 transition-all ${
                        isActive
                          ? 'bg-blue-50 text-primary-blue shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-primary-blue' : 'text-slate-400'}`} />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <div className="flex items-center space-x-3 text-slate-400 text-xs">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{t.disclaimerText.slice(0, 60)}...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Dynamic Content */}
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            
            {/* Brand Intro */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-tr from-saffron to-primary-blue p-2 rounded-xl text-white">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  {t.appName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
                {t.tagline}
              </p>
              <div className="flex space-x-1.5">
                <span className="w-3 h-1.5 rounded-full bg-saffron" />
                <span className="w-3 h-1.5 rounded-full bg-white" />
                <span className="w-3 h-1.5 rounded-full bg-tricolor-green" />
              </div>
            </div>

            {/* Help Links */}
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3.5">
                Quick Assistance
              </span>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button onClick={() => handleNavClick('ai')} className="hover:text-white transition">
                    {t.navAI}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('form')} className="hover:text-white transition">
                    {t.navForm}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('tools')} className="hover:text-white transition">
                    {t.navTools}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('scheme')} className="hover:text-white transition">
                    {t.navScheme}
                  </button>
                </li>
              </ul>
            </div>

            {/* Mandatory Legal & Information Links */}
            <div>
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3.5">
                Security & Policies
              </span>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button onClick={() => handleNavClick('about')} className="hover:text-white transition text-left">
                    {t.aboutTitle}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('privacy')} className="hover:text-white transition text-left">
                    {t.privacyTitle}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('disclaimer')} className="hover:text-white transition text-left">
                    Disclaimer (अस्वीकरण)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('faq')} className="hover:text-white transition text-left">
                    {t.faqTitle}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('contact')} className="hover:text-white transition text-left">
                    {t.contactUs}
                  </button>
                </li>
              </ul>
            </div>

          </div>

          <hr className="border-slate-800 my-8 sm:my-10" />

          {/* Absolute Trust & Privacy Disclaimer */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-slate-950 p-4 rounded-2xl border border-slate-800/60 max-w-4xl mx-auto">
              <ShieldAlert className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wider mb-0.5">
                  Important Security Guarantee & Disclaimer
                </span>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  {t.disclaimerText} <strong>JanSahayak AI will NEVER store your actual Aadhaar Card numbers, PAN details, or uploaded documentation on our servers.</strong> Every tool in the PDF/Image Toolkit runs exclusively in your browser locally.
                </p>
              </div>
            </div>
            
            <p className="text-center text-[10px] sm:text-xs text-slate-500 mt-4">
              © {new Date().getFullYear()} {t.appName}. Designed for Digital India Accessibility. All official logos and site assets are intellectual properties of respective departments.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
