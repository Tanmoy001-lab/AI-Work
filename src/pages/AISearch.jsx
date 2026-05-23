import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../utils/translations';
import { getAIAnswer } from '../utils/aiService';
import { 
  Mic, 
  Search, 
  Volume2, 
  VolumeX, 
  CornerDownRight, 
  Sparkles, 
  ExternalLink, 
  ShieldAlert, 
  RotateCcw,
  ArrowRight,
  Bot,
  User
} from 'lucide-react';

export default function AISearch({ 
  currentLang, 
  searchQuery, 
  setSearchQuery,
  handleStartListening,
  isListeningGlobal,
  userProfile 
}) {
  const t = translations[currentLang] || translations.en;
  const [query, setQuery] = useState(searchQuery || '');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const chatEndRef = useRef(null);

  // Sync searchQuery prop changes
  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
      handleQuestionSubmit(searchQuery);
      setSearchQuery(''); // clear prop
    }
  }, [searchQuery]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  // Handle TTS text to speech
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      // Remove markdown chars for cleaner speech
      const cleanText = text.replace(/[*#`_\-]/g, '');
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Auto-detect language voice mapping
      const langVoiceMap = {
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

      utterance.lang = langVoiceMap[currentLang] || 'en-IN';
      
      utterance.onend = () => {
        setIsPlayingAudio(false);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported on this browser.");
    }
  };

  // Stop speech on page change
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleQuestionSubmit = async (questionText) => {
    if (!questionText.trim()) return;

    // Add user question to history
    const userMsg = { role: 'user', text: questionText };
    setChatHistory(prev => [...prev, userMsg]);
    setIsLoading(true);
    setQuery('');

    try {
      const result = await getAIAnswer(questionText, currentLang, userProfile);
      
      // Add assistant response to history
      const assistantMsg = {
        role: 'assistant',
        text: result.text,
        source: result.source,
        officialLink: result.officialLink,
        updated: result.updated,
        related: result.related || []
      };

      setChatHistory(prev => [...prev, assistantMsg]);
    } catch (e) {
      console.error(e);
      const errorMsg = {
        role: 'assistant',
        text: currentLang === 'hi'
          ? "क्षमा करें, वर्तमान में सर्वर व्यस्त है। कृपया पुनः प्रयास करें।"
          : "Sorry, the assistant is currently experiencing high load. Please try again."
      };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleQuestionSubmit(query);
  };

  const handleChipClick = (chipText) => {
    handleQuestionSubmit(chipText);
  };

  const handleResetChat = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setChatHistory([]);
  };

  const exampleChips = [
    t.appName === "जनसहायक AI" 
      ? "NEET के लिए क्या दस्तावेज चाहिए?"
      : "NEET ke liye kya documents chahiye?",
    t.appName === "जनसहायक AI" 
      ? "PM किसान योजना की पात्रता क्या है?"
      : "PM Kisan scheme eligibility kya hai?",
    "Aadhaar link to PAN card status",
    "DU admission procedure"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in flex flex-col h-[calc(100vh-12rem)]">
      
      {/* Top Banner Dashboard Actions */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <Sparkles className="w-5.5 h-5.5 text-primary-blue animate-pulse" />
            <span>{t.navAI}</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Powered by JanSahayak Gemini Hybrid Intelligence
          </p>
        </div>
        
        {chatHistory.length > 0 && (
          <button
            onClick={handleResetChat}
            className="flex items-center space-x-1 text-slate-500 hover:text-slate-900 text-xs sm:text-sm font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition shadow-sm hover:shadow"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Chat</span>
          </button>
        )}
      </div>

      {/* Conversational Screen Viewer */}
      <div className="flex-grow bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-0">
        
        {/* Chat Log Window */}
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-6">
          {chatHistory.length === 0 ? (
            /* Blank Welcome Board */
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto py-12">
              <div className="bg-blue-50 text-primary-blue p-4 rounded-3xl animate-bounce">
                <Bot className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">
                {t.appName === "जनसहायक AI" ? "आप मुझसे कुछ भी पूछ सकते हैं!" : "Ask me anything!"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                {t.appName === "जनसहायक AI" 
                  ? "मैं आधार लिंक करने, छात्रवृत्ति, प्रवेश तिथि, और परीक्षा नियमों से जुड़े प्रश्नों के सीधे, चरण-दर-चरण उत्तर हिंदी तथा अन्य भारतीय भाषाओं में दे सकता हूँ।"
                  : "I can answer questions regarding Aadhaar updates, scholarships, exam guidelines, and bank seeding. Type a query or click the mic button below to start."}
              </p>
              
              <div className="w-full pt-4 space-y-2">
                <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">
                  Try asking:
                </span>
                <div className="flex flex-col space-y-2">
                  {exampleChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChipClick(chip)}
                      className="w-full text-left bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-primary-blue px-4 py-2.5 rounded-xl border border-slate-100 text-xs font-bold transition flex items-center justify-between"
                    >
                      <span>"{chip}"</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* Active Conversation logs */
            chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`flex items-start space-x-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                  
                  {/* Chat Avatar */}
                  <div className={`p-2 rounded-xl shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-primary-blue text-white' : 'bg-gradient-to-tr from-saffron to-amber-500 text-white'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Text Container bubble */}
                  <div className={`p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white rounded-tr-none'
                      : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none space-y-3'
                  }`}>
                    {/* Content text */}
                    <div className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line prose max-w-none">
                      {msg.text}
                    </div>

                    {/* AI extra components: Source, TTS readback speaker, Action redirects */}
                    {msg.role === 'assistant' && (
                      <div className="border-t border-slate-200/60 pt-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
                        
                        {/* Audio speaker trigger */}
                        <button
                          onClick={() => speakText(msg.text)}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm border ${
                            isPlayingAudio 
                              ? 'bg-red-50 border-red-100 text-red-600 hover:bg-red-100' 
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {isPlayingAudio ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5" />
                              <span>{t.ttsStop}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Listen (सुनें)</span>
                            </>
                          )}
                        </button>

                        {/* Source indicators */}
                        {msg.source && (
                          <div className="text-[10px] text-slate-400 font-bold bg-slate-200/50 px-2 py-1 rounded-md">
                            Source: {msg.source} • {msg.updated}
                          </div>
                        )}

                        {/* Official site anchor */}
                        {msg.officialLink && (
                          <a
                            href={msg.officialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-xs font-bold text-primary-blue hover:underline"
                          >
                            <span>{t.officialSite}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                      </div>
                    )}
                  </div>

                </div>
              </div>
            ))
          )}

          {/* Loading Skeletons */}
          {isLoading && (
            <div className="flex justify-start items-start space-x-3 animate-pulse">
              <div className="p-2 bg-slate-200 rounded-xl text-slate-200">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-none w-72 space-y-3">
                <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                <div className="h-3 bg-slate-200 rounded-md w-5/6" />
                <div className="h-3 bg-slate-200 rounded-md w-1/2" />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar Form container */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 shrink-0">
          <form onSubmit={handleFormSubmit} className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm p-1 transition focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue">
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder.slice(0, 50) + "..."}
              disabled={isLoading}
              className="w-full bg-transparent border-0 outline-none text-slate-800 text-xs sm:text-sm px-3 py-2 sm:py-3 placeholder:text-slate-400 font-medium disabled:opacity-50"
            />

            <div className="flex items-center space-x-1 pr-1.5">
              
              {/* Mic trigger button */}
              <button
                type="button"
                onClick={handleStartListening}
                className={`p-2 rounded-xl transition ${
                  isListeningGlobal
                    ? 'bg-red-50 text-red-600 animate-pulse border border-red-100'
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                }`}
                title={t.micTooltip}
              >
                <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Submit query button */}
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="p-2 sm:p-2.5 bg-primary-blue text-white rounded-xl shadow-md shadow-blue-500/10 hover:brightness-105 active:scale-95 disabled:opacity-30 disabled:scale-100 transition flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </form>

          {/* AI warnings / disclaimer */}
          <div className="flex items-center justify-center space-x-1.5 text-[10px] text-slate-400 text-center mt-2.5 font-bold">
            <ShieldAlert className="w-3.5 h-3.5 text-saffron shrink-0" />
            <span>{t.verifyWarning}</span>
          </div>

        </div>

      </div>

    </div>
  );
}
