import React, { useState } from 'react';
import { translations } from '../utils/translations';
import { 
  Info, 
  HelpCircle, 
  ShieldCheck, 
  AlertTriangle, 
  Mail, 
  Compass, 
  Check, 
  MessageSquare,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export default function InfoPages({ currentLang, activeSection = 'about' }) {
  const t = translations[currentLang] || translations.en;
  
  const [activeTab, setActiveTab] = useState(activeSection);
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // Feedback form states
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const subTabs = [
    { id: 'about', label: "About Us", icon: Info },
    { id: 'workings', label: "How It Works", icon: Compass },
    { id: 'privacy', label: "Privacy Policy", icon: ShieldCheck },
    { id: 'disclaimer', label: "Disclaimer", icon: AlertTriangle },
    { id: 'faq', label: "FAQs", icon: HelpCircle },
    { id: 'contact', label: "Contact Us", icon: Mail }
  ];

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedbackName && feedbackEmail && feedbackMsg) {
      setFeedbackSuccess(true);
      setFeedbackName('');
      setFeedbackEmail('');
      setFeedbackMsg('');
      setTimeout(() => setFeedbackSuccess(false), 4000);
    }
  };

  const faqItems = [
    {
      q: "Is JanSahayak AI associated with the Indian Government?",
      a: "No. JanSahayak AI is a completely independent, open-source educational guidance platform. It is NOT affiliated with, sponsored by, or linked to the Unique Identification Authority of India (UIDAI), Income Tax Department, Ministry of External Affairs, or any other government body. Always check official sites for absolute legal verification."
    },
    {
      q: "How does the platform ensure my Aadhaar and PAN privacy?",
      a: "We prioritize security by using absolute browser sandboxing. Every input, uploaded PDF, image crop, or drawing signature runs exclusively in your device memory locally. We do not possess any backend databases, sync scripts, or third-party tracking APIs. Your records never leave your phone/computer."
    },
    {
      q: "Can this website automatically submit forms for me on other portals?",
      a: "No. Browser cross-origin security (CORS) blocks third-party websites from injecting inputs or control scripts on official government portals. JanSahayak AI guides you exactly how to fill details step-by-step and provides the official submission links so you can fill them yourself safely without paying agents."
    },
    {
      q: "How does the offline-mode fallback system work?",
      a: "Our app scaffolds a massive offline indexing database covering common schemes, exam timelines, and document checklists. If you do not possess internet connectivity or do not supply a Gemini API Key in Settings, our semantic search engine can still resolve typical Indian documentation questions instantly."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 pb-16 animate-fade-in">
      
      {/* Sidebar Navigation (1/4) */}
      <div className="space-y-2 h-fit lg:sticky lg:top-24 bg-white border border-slate-100 p-4 sm:p-5 rounded-3xl shadow-sm">
        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 pl-2">
          Info Directory
        </span>
        <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar space-x-1 lg:space-x-0 lg:space-y-1">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-bold flex items-center space-x-3 transition whitespace-nowrap focus:outline-none ${
                  isActive
                    ? 'bg-blue-50 text-primary-blue shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary-blue' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace (3/4) */}
      <div className="lg:col-span-3 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm">
        
        {/* TAB A: ABOUT */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2 border-b border-slate-50 pb-3">
              <Info className="w-5.5 h-5.5 text-primary-blue" />
              <span>About JanSahayak AI (जन सहायक)</span>
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
              JanSahayak AI is a non-governmental, open-source educational workspace developed to tackle a major practical problem: **constant citizen confusion regarding Indian government portals and college admissions.**
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Indian portals like DigiLocker, UMANG, Sarathi, and NSP host essential resources, but are frequently cluttered, jargon-heavy, and difficult to access on low-end Android mobile devices. JanSahayak AI supplies a conversational **Guidance Layer** on top of these resources, helping students, farmers, senior citizens, and first-time applicants fill forms accurately in their native regional languages.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 space-y-2">
                <span className="block font-bold text-slate-800 text-xs sm:text-sm">🎯 Our Mission</span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Bridge the digital divide by translating complex government guidelines into spoken regional dialects, helping users complete documentation independently without paying agents.
                </p>
              </div>
              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 space-y-2">
                <span className="block font-bold text-slate-800 text-xs sm:text-sm">🔒 Absolute Security</span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We leverage strict device isolation. Your names, DOBs, signature drawings, and attachments never touch an external cloud server, ensuring 100% data confidentiality.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB B: HOW IT WORKS */}
        {activeTab === 'workings' && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2 border-b border-slate-50 pb-3">
              <Compass className="w-5.5 h-5.5 text-saffron" />
              <span>How JanSahayak AI Works</span>
            </h2>

            <div className="space-y-6 pt-4">
              
              {/* Step 1 */}
              <div className="flex items-start space-x-4">
                <span className="w-8 h-8 rounded-full bg-orange-50 text-saffron flex items-center justify-center font-extrabold text-sm border border-orange-100 shrink-0 mt-0.5">
                  1
                </span>
                <div className="space-y-1">
                  <span className="block font-extrabold text-slate-800 text-xs sm:text-sm">
                    Ask or Speak in Your Native Language
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Type a query or speak directly using our Web Speech Mic trigger (e.g. in Tamil: "நீட் விண்ணப்ப கட்டணம் எவ்வளவு?"). JanSahayak AI explains dates, fees, and requirements instantly.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-4">
                <span className="w-8 h-8 rounded-full bg-blue-50 text-primary-blue flex items-center justify-center font-extrabold text-sm border border-blue-100 shrink-0 mt-0.5">
                  2
                </span>
                <div className="space-y-1">
                  <span className="block font-extrabold text-slate-800 text-xs sm:text-sm">
                    Walkthrough Step-by-Step Guided Wizards
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Access our Guided Form Assistant. Each field is highlighted individually, spoken aloud in your chosen language, checked for common errors, and pre-filled using your secure local profile details.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-4">
                <span className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-extrabold text-sm border border-green-100 shrink-0 mt-0.5">
                  3
                </span>
                <div className="space-y-1">
                  <span className="block font-extrabold text-slate-800 text-xs sm:text-sm">
                    Format Documents Safely
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Use our local Document Toolkit to resize passport pictures, wipe background gray shadows with scanned high-contrast filters, compile image attachments, split pages, draw signatures, and stamp PDFs in-browser.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB C: PRIVACY */}
        {activeTab === 'privacy' && (
          <div className="space-y-6 text-xs sm:text-sm">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2 border-b border-slate-50 pb-3">
              <ShieldCheck className="w-5.5 h-5.5 text-green-600" />
              <span>Secure Privacy Policy</span>
            </h2>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-600 font-bold leading-relaxed mb-4">
              🔒 <strong>Device Sandboxing Guarantee</strong>: JanSahayak AI executes every PDF merging, image cropping, canvas filter, and profile storage action directly in your web browser. No uploaded records leave your device.
            </div>

            <div className="space-y-4 text-slate-500 font-medium leading-relaxed">
              <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm">1. Document and File Security</h3>
              <p>
                Every toolkit element in the PDF/Image editor operates locally. When you select a document or draw a signature, the canvas transforms the file directly inside your browser container.
              </p>

              <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm">2. Personal Profile Data</h3>
              <p>
                Your biological fields (FullName, Category, Occupation, Aadhaar Last-4-Digits) are stored solely inside `window.localStorage` inside your browser. No registration forms or server databases exist. Wiping local data deletes all records instantly.
              </p>

              <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm">3. Speech API Integration</h3>
              <p>
                The Web Speech API executes using native browser translation kits, maintaining confidentiality over verbal search queries.
              </p>
            </div>
          </div>
        )}

        {/* TAB D: DISCLAIMER */}
        {activeTab === 'disclaimer' && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2 border-b border-slate-50 pb-3">
              <AlertTriangle className="w-5.5 h-5.5 text-saffron" />
              <span>Legal Disclaimer (अस्वीकरण)</span>
            </h2>

            <div className="bg-red-50/50 border border-red-100 p-5 rounded-2xl flex items-start space-x-3 text-xs sm:text-sm">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="text-slate-600 leading-relaxed font-semibold space-y-3">
                <p>
                  <strong>JanSahayak AI (जन सहायक) is NOT affiliated with, sponsored by, or associated in any capacity with UIDAI, the Income Tax Department, Ministry of Road Transport (Parivahan), NPCI, NTA, or any state/central government body in India.</strong>
                </p>
                <p>
                  Our services act solely as a secondary educational guidance handbook. Information regarding scheme eligibility, admissions cutoffs, and status checking methods is structured from publicly accessible, standard portals to guide first-time users.
                </p>
                <p>
                  While we utilize daily scrapes to maintain timeline correctness, dates, fee budgets, and rules change frequently. <strong>Always crosscheck facts and submit final applications on the respective official government websites.</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB E: FAQS */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2 border-b border-slate-50 pb-3">
              <HelpCircle className="w-5.5 h-5.5 text-primary-blue" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="space-y-3 pt-2">
              {faqItems.map((faq, idx) => {
                const isExpanded = expandedFaq === idx;
                return (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden transition shadow-sm">
                    <div
                      onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                      className="p-4.5 cursor-pointer flex items-center justify-between space-x-4 hover:bg-slate-100/50 transition font-extrabold text-slate-800 text-xs sm:text-sm leading-snug"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${isExpanded ? 'rotate-180 text-primary-blue' : ''}`} />
                    </div>
                    {isExpanded && (
                      <div className="p-4.5 bg-white border-t border-slate-100 text-xs text-slate-500 font-semibold leading-relaxed animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB F: CONTACT */}
        {activeTab === 'contact' && (
          <div className="space-y-6 max-w-xl">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center space-x-2 border-b border-slate-50 pb-3">
              <Mail className="w-5.5 h-5.5 text-primary-blue" />
              <span>Contact Us & Feedback</span>
            </h2>

            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Positively impacted by JanSahayak AI? Spot a dates typo or incorrect documents requirement? Drop us a feedback message. We respond within 48 hours.
            </p>

            {feedbackSuccess && (
              <div className="bg-green-50 border border-green-100 text-green-700 p-4 rounded-2xl flex items-center space-x-2.5 text-xs sm:text-sm font-bold animate-pulse">
                <Check className="w-5 h-5 shrink-0" />
                <span>Feedback submitted successfully locally! Thank you.</span>
              </div>
            )}

            <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs sm:text-sm font-semibold text-slate-500">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">Your Full Name:</label>
                <input
                  type="text"
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                  placeholder="e.g. Sunita Devi"
                  required
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">Email Address:</label>
                <input
                  type="email"
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                  placeholder="e.g. sunita@gmail.com"
                  required
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">Message / Suggestion:</label>
                <textarea
                  value={feedbackMsg}
                  onChange={(e) => setFeedbackMsg(e.target.value)}
                  placeholder="Tell us what document status checker guides we should catalog next..."
                  rows={4}
                  required
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 text-white rounded-2xl font-bold shadow-md hover:brightness-105 transition flex items-center justify-center space-x-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Submit Feedback Response</span>
              </button>
            </form>
          </div>
        )}

      </div>

    </div>
  );
}
