import React, { useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import { mockFormTemplates } from '../utils/mockDatabase';
import { 
  Sparkles, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle, 
  Play, 
  ArrowLeft, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Volume2,
  FileCheck,
  UserCheck
} from 'lucide-react';

export default function FormAssistant({ currentLang, userProfile }) {
  const t = translations[currentLang] || translations.en;
  
  const [selectedFormId, setSelectedFormId] = useState(mockFormTemplates[0].id);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [wizardActive, setWizardActive] = useState(false);
  
  // Filled form data
  const [formData, setFormData] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const activeForm = mockFormTemplates.find(f => f.id === selectedFormId) || mockFormTemplates[0];
  const steps = activeForm.steps;
  const currentStep = steps[currentStepIndex];

  // Reset wizard on form select
  useEffect(() => {
    setCurrentStepIndex(0);
    setWizardActive(false);
    setFormData({});
    setIsCompleted(false);
  }, [selectedFormId]);

  // Read out instructions in target language
  const speakInstruction = () => {
    if ('speechSynthesis' in window && wizardActive && currentStep) {
      window.speechSynthesis.cancel();
      const txt = currentStep.localTooltip || currentStep.englishTooltip;
      const utterance = new SpeechSynthesisUtterance(txt);
      
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
      window.speechSynthesis.speak(utterance);
    }
  };

  // Speak instruction every time a new step is loaded
  useEffect(() => {
    if (wizardActive && !isCompleted) {
      // Small timeout to allow user transition
      const timer = setTimeout(() => {
        speakInstruction();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, wizardActive, isCompleted]);

  // Autofill current field from local storage profile
  const handleAutofill = () => {
    if (!userProfile) return;
    
    let keyToMap = currentStep.fieldId;
    let val = '';

    if (keyToMap === 'fullName' || keyToMap === 'candidateName') {
      val = userProfile.fullName;
    } else if (keyToMap === 'dob') {
      val = userProfile.dob;
    } else if (keyToMap === 'email') {
      val = userProfile.email || 'user@example.com';
    } else if (keyToMap === 'mobile') {
      val = userProfile.mobile || '';
    } else if (keyToMap === 'aadhaarNum') {
      val = userProfile.aadhaarDigits || '';
    } else if (keyToMap === 'categorySelect') {
      val = userProfile.category || 'General';
    }

    if (val) {
      setFormData(prev => ({
        ...prev,
        [keyToMap]: val
      }));
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const progressPercentage = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Title Header */}
      <div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2.5">
          <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-saffron animate-pulse" />
          <span>{t.navForm}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
          Select any university, entrance, or government form. We will highlight each field, speak the exact guidance in your language, and pre-fill details using your safe local profile.
        </p>
      </div>

      {/* Selector & Mistake panel */}
      {!wizardActive && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Form Picker Grid */}
          <div className="md:col-span-2 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 border-b border-slate-50 pb-3 flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-primary-blue" />
              <span>Choose Application Form</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Select Category & Template:
                </label>
                <select
                  value={selectedFormId}
                  onChange={(e) => setSelectedFormId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent cursor-pointer shadow-sm transition"
                >
                  {mockFormTemplates.map((form) => (
                    <option key={form.id} value={form.id}>
                      [{form.category}] {form.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-start space-x-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                <HelpCircle className="w-5 h-5 text-primary-blue shrink-0 mt-0.5" />
                <div>
                  Our assistant acts as a floating layer. It simulates the target website form field-by-field, explains instructions verbally, and guides you how to answer correctly.
                </div>
              </div>

              <button
                onClick={() => setWizardActive(true)}
                className="w-full py-4 bg-primary-blue text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:brightness-105 active:scale-98 transition flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Guided Assistance Now</span>
              </button>
            </div>
          </div>

          {/* Sizing Rules / Mistake Alerts panel */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center space-x-2 text-red-600 border-b border-slate-50 pb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>Common Rejection Mistakes</span>
            </h3>
            <ul className="space-y-3 text-xs text-slate-500 leading-relaxed">
              {activeForm.mistakes.map((mistake, i) => (
                <li key={i} className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-red-100">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-slate-600">{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}

      {/* Interactive Wizard Workspace */}
      {wizardActive && !isCompleted && (
        <div className="bg-white border border-slate-100 rounded-3xl shadow-md overflow-hidden flex flex-col">
          
          {/* Wizard Header Progress Bar */}
          <div className="bg-slate-900 text-white p-5 sm:p-6 space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Guided Wizard Application
                </span>
                <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
                  {activeForm.title}
                </h3>
              </div>
              <span className="text-xs sm:text-sm font-extrabold bg-slate-800 px-3 py-1 rounded-full text-saffron shadow border border-slate-700/50">
                Step {currentStepIndex + 1} of {steps.length}
              </span>
            </div>

            {/* Visual Bar percentage */}
            <div className="space-y-1.5">
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700/50">
                <div 
                  className="bg-gradient-to-r from-saffron to-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Registration</span>
                <span>{progressPercentage}% Completed</span>
              </div>
            </div>
          </div>

          {/* Interactive Screen Splitter */}
          <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-100 min-h-[16rem]">
            
            {/* Left: Input focus zone */}
            <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-center space-y-4">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Active Field Input Preview:
              </label>

              {/* Input wrapper with pulse highlight */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl shadow-inner step-active space-y-2">
                <span className="block text-xs font-bold text-slate-500">
                  {currentStep.label}
                </span>

                {currentStep.type === 'select' ? (
                  <select
                    className="w-full bg-white border border-slate-200 px-3.5 py-3.5 rounded-xl text-slate-700 text-sm font-bold focus:outline-none ring-2 ring-primary-blue/30"
                    value={formData[currentStep.fieldId] || ''}
                    onChange={(e) => setFormData({ ...formData, [currentStep.fieldId]: e.target.value })}
                  >
                    <option value="">Select Category...</option>
                    {currentStep.options.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={currentStep.type}
                    value={formData[currentStep.fieldId] || ''}
                    onChange={(e) => setFormData({ ...formData, [currentStep.fieldId]: e.target.value })}
                    placeholder={currentStep.placeholder || ''}
                    className="w-full bg-white border border-slate-200 px-3.5 py-3.5 rounded-xl text-slate-800 text-sm font-extrabold focus:outline-none focus:ring-0"
                  />
                )}
                
                {currentStep.warning && (
                  <p className="text-[10px] text-red-500 font-extrabold flex items-center space-x-1 pl-0.5">
                    <span>⚠️ Warning:</span>
                    <span>{currentStep.warning}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Right: Regional Voice Guidance Assistant Bubble */}
            <div className="md:col-span-2 p-6 sm:p-8 bg-blue-50/20 flex flex-col justify-between space-y-6">
              
              {/* Guidance Speech Bubble */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100/50 pb-2">
                  <span className="block text-[10px] font-bold text-primary-blue uppercase tracking-wider">
                    Voice Assistant Guide
                  </span>
                  
                  {/* Speak button trigger */}
                  <button
                    onClick={speakInstruction}
                    className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-primary-blue rounded-lg shadow-sm hover:shadow transition"
                    title="Repeat voice guide"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm relative rounded-tl-none">
                  {/* Speech bubble caret */}
                  <div className="absolute top-0 -left-2 w-0 h-0 border-t-[8px] border-t-white border-r-[8px] border-r-white border-l-[8px] border-l-transparent border-b-[8px] border-b-transparent" />
                  
                  <p className="text-xs sm:text-sm font-extrabold text-slate-800 leading-relaxed italic">
                    "{currentStep.localTooltip || currentStep.englishTooltip}"
                  </p>
                  
                  <p className="text-[10px] text-slate-400 font-semibold mt-2.5 block leading-normal border-t border-slate-50 pt-2">
                    💡 <strong>Guide tip</strong>: {currentStep.englishTooltip}
                  </p>
                </div>
              </div>

              {/* Local Storage Profile Autofill Action */}
              {userProfile && (
                <button
                  onClick={handleAutofill}
                  className="w-full py-2.5 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  <UserCheck className="w-4 h-4 shrink-0" />
                  <span>Autofill from Profile details</span>
                </button>
              )}

            </div>
          </div>

          {/* Action Row Controllers */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition flex items-center space-x-1.5 disabled:opacity-40"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!formData[currentStep.fieldId]}
              className="px-5 py-2.5 bg-primary-blue text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/10 hover:brightness-105 active:scale-95 transition flex items-center space-x-1.5 disabled:opacity-40 disabled:scale-100"
            >
              <span>{currentStepIndex === steps.length - 1 ? 'Finish Guide' : 'Confirm Step'}</span>
              {currentStepIndex === steps.length - 1 ? <CheckCircle className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

        </div>
      )}

      {/* Completion Wizard Screen */}
      {wizardActive && isCompleted && (
        <div className="bg-white border border-slate-100 p-8 sm:p-12 rounded-3xl shadow-lg text-center space-y-6 max-w-2xl mx-auto">
          <div className="bg-green-50 text-green-600 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-green-100 animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-800">
              Guidance Complete!
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
              Excellent! You have gone through all the fields of the <strong>{activeForm.title}</strong> application successfully.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-left space-y-3">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              Summary of inputs we compiled for you:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {steps.map((step, idx) => (
                <div key={idx} className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="font-semibold text-slate-500">{step.label.split('(')[0]}:</span>
                  <span className="font-extrabold text-slate-800 truncate pl-2 max-w-[12rem]">{formData[step.fieldId] || '—'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                setWizardActive(false);
                setIsCompleted(false);
              }}
              className="flex-grow py-3.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 rounded-2xl text-sm font-bold shadow-sm hover:shadow transition"
            >
              Choose another Form
            </button>

            <a
              href={activeForm.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow py-3.5 bg-primary-blue text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:brightness-105 active:scale-95 transition flex items-center justify-center space-x-2"
            >
              <span>Go to Official Portal to submit</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
