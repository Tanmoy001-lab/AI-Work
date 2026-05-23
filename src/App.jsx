import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';

// Pages import
import Home from './pages/Home';
import AISearch from './pages/AISearch';
import FormAssistant from './pages/FormAssistant';
import StatusChecker from './pages/StatusChecker';
import SchemeFinder from './pages/SchemeFinder';
import CollegeExamInfo from './pages/CollegeExamInfo';
import DocumentTools from './pages/DocumentTools';
import DeadlineReminders from './pages/DeadlineReminders';
import Profile from './pages/Profile';
import InfoPages from './pages/InfoPages';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [activePage, setActivePage] = useState('home');
  
  // Shared queries between Home search and specific search views
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local biographical profile cache
  const [userProfile, setUserProfile] = useState(null);
  
  // Speech capture states
  const [isListening, setIsListening] = useState(false);

  // Load language and profile on start
  useEffect(() => {
    const savedLang = localStorage.getItem('jan_sahayak_lang');
    if (savedLang) {
      setCurrentLang(savedLang);
    }

    const savedProfile = localStorage.getItem('jan_sahayak_profile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save language changes
  const handleSetLanguage = (langCode) => {
    setCurrentLang(langCode);
    localStorage.setItem('jan_sahayak_lang', langCode);
  };

  // Hands-free voice speech-to-text recognition
  const handleStartListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Voice speech recognition is not supported on this browser. Please try on Google Chrome for Android/Desktop.");
      return;
    }

    if (isListening) {
      return; // already active
    }

    try {
      const recognition = new SpeechRecognition();
      
      // Auto-detect language mappings
      const langSpeechMap = {
        en: 'en-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        bn: 'bn-IN',
        mr: 'mr-IN',
        gu: 'gu-IN',
        kn: 'kn-IN',
        ml: 'ml-IN'
      };

      recognition.lang = langSpeechMap[currentLang] || 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        setIsListening(false);
        alert(`Voice recognition error: ${event.error}. Please ensure mic permission is enabled.`);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          setSearchQuery(transcript);
          setActivePage('ai');
        }
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  return (
    <Layout
      currentLang={currentLang}
      setCurrentLang={handleSetLanguage}
      activePage={activePage}
      setActivePage={setActivePage}
      isListeningGlobal={isListening}
    >
      {/* Dynamic Viewport Routing */}
      {activePage === 'home' && (
        <Home 
          currentLang={currentLang} 
          setActivePage={setActivePage} 
          setSearchQuery={setSearchQuery}
          handleStartListening={handleStartListening}
        />
      )}

      {activePage === 'ai' && (
        <AISearch 
          currentLang={currentLang}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleStartListening={handleStartListening}
          isListeningGlobal={isListening}
          userProfile={userProfile}
        />
      )}

      {activePage === 'form' && (
        <FormAssistant 
          currentLang={currentLang}
          userProfile={userProfile}
        />
      )}

      {activePage === 'status' && (
        <StatusChecker 
          currentLang={currentLang}
        />
      )}

      {activePage === 'scheme' && (
        <SchemeFinder 
          currentLang={currentLang}
          userProfile={userProfile}
          searchQuery={searchQuery}
        />
      )}

      {activePage === 'college' && (
        <CollegeExamInfo 
          currentLang={currentLang}
          searchQuery={searchQuery}
        />
      )}

      {activePage === 'tools' && (
        <DocumentTools 
          currentLang={currentLang}
        />
      )}

      {activePage === 'reminders' && (
        <DeadlineReminders 
          currentLang={currentLang}
        />
      )}

      {activePage === 'profile' && (
        <Profile 
          currentLang={currentLang}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
        />
      )}

      {/* Auxiliary Supplemental Pages (About, FAQ, privacy links redirect here) */}
      {activePage === 'about' && <InfoPages currentLang={currentLang} activeSection="about" />}
      {activePage === 'privacy' && <InfoPages currentLang={currentLang} activeSection="privacy" />}
      {activePage === 'disclaimer' && <InfoPages currentLang={currentLang} activeSection="disclaimer" />}
      {activePage === 'faq' && <InfoPages currentLang={currentLang} activeSection="faq" />}
      {activePage === 'contact' && <InfoPages currentLang={currentLang} activeSection="contact" />}

    </Layout>
  );
}
