import React, { useState } from 'react';
import { translations } from '../utils/translations';
import { mockStatusChecks } from '../utils/mockDatabase';
import { 
  Search, 
  ExternalLink, 
  HelpCircle, 
  AlertTriangle, 
  FileText, 
  Compass, 
  ChevronRight, 
  X,
  ShieldCheck
} from 'lucide-react';

export default function StatusChecker({ currentLang }) {
  const t = translations[currentLang] || translations.en;
  
  const [selectedGuideId, setSelectedGuideId] = useState(null);
  
  const activeGuide = mockStatusChecks.find(g => g.id === selectedGuideId);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Title Panel */}
      <div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2.5">
          <ShieldCheck className="w-6 sm:w-8 h-6 sm:h-8 text-primary-blue" />
          <span>{t.navStatus}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
          Verify your document seeding status and portal updates. Choose a document to open step-by-step official status tracking directions.
        </p>
      </div>

      {/* Grid of status items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStatusChecks.map((item) => (
          <div 
            key={item.id}
            className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md hover:border-slate-200 transition flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3.5">
              <span className="inline-block text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                Portal Tracker Guide
              </span>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-800 leading-tight">
                {item.name}
              </h2>
              
              <div className="space-y-1.5 text-xs text-slate-500 font-medium">
                <span className="block font-bold text-slate-400 uppercase text-[9px] tracking-wider">
                  Details Required:
                </span>
                <ul className="list-disc pl-4 space-y-0.5">
                  {item.requiredDocs.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2 border-t border-slate-50">
              <button
                onClick={() => setSelectedGuideId(item.id)}
                className="flex-grow py-2.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-primary-blue rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 border border-slate-100"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{t.howToCheck}</span>
              </button>

              <a
                href={item.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 bg-primary-blue hover:brightness-105 active:scale-95 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 shrink-0 shadow shadow-blue-500/10"
              >
                <span>Track Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* Guide Slide Modal */}
      {selectedGuideId && activeGuide && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedGuideId(null)}>
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Step-by-Step Status Instructions
                </span>
                <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
                  {activeGuide.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedGuideId(null)}
                className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-full transition focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Requirements */}
              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 space-y-2">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  What details to keep ready:
                </span>
                <ul className="list-disc pl-4 text-xs font-bold text-slate-600 space-y-1">
                  {activeGuide.requiredDocs.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Check Procedure (चरण-दर-चरण प्रक्रिया):
                </span>
                <div className="space-y-3">
                  {activeGuide.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3.5">
                      <span className="w-6 h-6 rounded-full bg-blue-50 text-primary-blue flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 border border-blue-100">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mismatch warnings / Common Issues */}
              <div className="space-y-3 border-t border-slate-100 pt-4">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5 text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Important Resolution Guidelines</span>
                </span>
                <div className="space-y-2.5">
                  {activeGuide.issues.map((issue, idx) => (
                    <div key={idx} className="bg-red-50/20 border border-red-100 p-4 rounded-2xl text-xs space-y-1">
                      <span className="block font-extrabold text-slate-800">
                        ⚠️ Issue: {issue.problem}
                      </span>
                      <p className="font-semibold text-slate-600 leading-relaxed">
                        👉 <strong>Solution:</strong> {issue.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Redirect Action Bar */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-end">
              <a
                href={activeGuide.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 bg-primary-blue text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/10 hover:brightness-105 active:scale-95 transition flex items-center space-x-1.5"
              >
                <span>Open official status checker page</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
