import React, { useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import { 
  User, 
  Lock, 
  Trash2, 
  Save, 
  Key, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  CheckCircle,
  FileText
} from 'lucide-react';

export default function Profile({ currentLang, userProfile, setUserProfile }) {
  const t = translations[currentLang] || translations.en;
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('All');
  const [state, setState] = useState('All');
  const [category, setCategory] = useState('General');
  const [education, setEducation] = useState('12th Pass');
  const [occupation, setOccupation] = useState('All');
  const [aadhaarDigits, setAadhaarDigits] = useState('');
  
  // API Key State
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  // Status Alerts
  const [saveStatus, setSaveStatus] = useState('');
  const [wipeStatus, setWipeStatus] = useState('');

  // Load existing profile
  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.fullName || '');
      setDob(userProfile.dob || '');
      setGender(userProfile.gender || 'All');
      setState(userProfile.state || 'All');
      setCategory(userProfile.category || 'General');
      setEducation(userProfile.education || '12th Pass');
      setOccupation(userProfile.occupation || 'All');
      setAadhaarDigits(userProfile.aadhaarDigits || '');
    }

    const savedKey = localStorage.getItem('jan_sahayak_gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, [userProfile]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    
    // Safety check: ensure Aadhaar digits are exactly 4 digits
    if (aadhaarDigits && !/^\d{4}$/.test(aadhaarDigits)) {
      alert("Aadhaar digits must be exactly 4 numbers.");
      return;
    }

    const updatedProfile = {
      fullName,
      dob,
      gender,
      state,
      category,
      education,
      occupation,
      aadhaarDigits
    };

    localStorage.setItem('jan_sahayak_profile', JSON.stringify(updatedProfile));
    setUserProfile(updatedProfile);

    // Save API key
    if (apiKey.trim()) {
      localStorage.setItem('jan_sahayak_gemini_api_key', apiKey.trim());
    } else {
      localStorage.removeItem('jan_sahayak_gemini_api_key');
    }

    setSaveStatus('success');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleWipeData = () => {
    if (window.confirm("WARNING: This will permanently wipe all local files, profile data, reminders, and API keys stored on this device. Do you want to continue?")) {
      localStorage.clear();
      setUserProfile(null);
      
      setFullName('');
      setDob('');
      setGender('All');
      setState('All');
      setCategory('General');
      setEducation('12th Pass');
      setOccupation('All');
      setAadhaarDigits('');
      setApiKey('');

      setWipeStatus('success');
      setTimeout(() => setWipeStatus(''), 3000);
    }
  };

  const statesList = ["All", "Delhi", "Uttar Pradesh", "Bihar", "Madhya Pradesh", "Rajasthan", "Maharashtra", "Tamil Nadu", "Andhra Pradesh", "Karnataka"];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2.5">
            <Lock className="w-6 sm:w-8 h-6 sm:h-8 text-primary-blue animate-pulse" />
            <span>{t.profileTitle.split('(')[0]}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
            Configure bio data parameters locally. This is used solely to match eligibility filters and autofill guided wizards.
          </p>
        </div>

        <button
          onClick={handleWipeData}
          className="flex items-center space-x-1.5 py-2 px-3 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl text-xs font-bold transition shadow-sm"
        >
          <Trash2 className="w-4 h-4" />
          <span>Wipe Profile</span>
        </button>
      </div>

      {/* Main Body */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Form Column (2/3) */}
        <div className="md:col-span-2 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
          
          {/* Saved notification */}
          {saveStatus === 'success' && (
            <div className="bg-green-50 border border-green-100 text-green-700 p-4 rounded-2xl flex items-center space-x-2.5 text-xs sm:text-sm font-bold animate-pulse">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>{t.dataSaved}</span>
            </div>
          )}

          {wipeStatus === 'success' && (
            <div className="bg-amber-50 border border-amber-100 text-amber-600 p-4 rounded-2xl flex items-center space-x-2.5 text-xs sm:text-sm font-bold animate-pulse">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>{t.dataCleared}</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs sm:text-sm font-semibold text-slate-600">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t.fullName}:</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t.dob}:</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 cursor-pointer"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t.gender}:</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-700 cursor-pointer"
                >
                  <option value="All">All / Prefer not to say</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Domicile State */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t.state}:</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-700 cursor-pointer"
                >
                  {statesList.map((st, i) => (
                    <option key={i} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t.category}:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-700 cursor-pointer"
                >
                  <option value="General">General</option>
                  <option value="OBC-NCL">OBC-NCL (Other Backward Class)</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="EWS">EWS (Economically Weaker Section)</option>
                </select>
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Occupation Status:</label>
                <select
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-700 cursor-pointer"
                >
                  <option value="All">General / Other</option>
                  <option value="Student">Student</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Women">Women specific</option>
                  <option value="Senior Citizen">Senior Citizen</option>
                </select>
              </div>

              {/* Aadhaar Digits */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Aadhaar Last 4 Digits:
                </label>
                <input
                  type="password"
                  value={aadhaarDigits}
                  maxLength={4}
                  onChange={(e) => setAadhaarDigits(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 4321"
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800"
                />
              </div>

            </div>

            {/* Advanced Settings: API Key */}
            <div className="border-t border-slate-100 pt-5 mt-5 space-y-4">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                <Key className="w-4 h-4 text-slate-500" />
                <span>Advanced AI Configuration</span>
              </span>
              
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500">
                  Google Gemini API Key (Optional):
                </label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full bg-transparent border-0 outline-none px-3 py-2 text-slate-800 text-xs sm:text-sm placeholder:text-slate-300 font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="block text-[10px] text-slate-400 font-medium leading-normal pl-0.5">
                  Supply your own Gemini API Key to enable live generative web search capabilities. If empty, the system falls back to JanSahayak's pre-compiled offline database automatically!
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                type="submit"
                className="w-full py-3.5 bg-primary-blue text-white rounded-2xl font-bold shadow-lg shadow-blue-500/10 hover:brightness-105 active:scale-95 transition flex items-center justify-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{t.saveProfile}</span>
              </button>
            </div>

          </form>

        </div>

        {/* Info Column (1/3) */}
        <div className="space-y-6">
          
          {/* Security details cards */}
          <div className="bg-slate-900 text-slate-300 p-6 rounded-3xl space-y-4 shadow-md">
            <h3 className="text-sm font-extrabold text-white tracking-tight flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Lock className="w-4 h-4 text-saffron" />
              <span>Absolute Device Isolation</span>
            </h3>
            
            <p className="text-xs leading-relaxed font-medium">
              Every detail compiled in this panel resides exclusively inside your browser's local sandbox storage (`localStorage`).
            </p>

            <ul className="space-y-2 text-[11px] leading-relaxed font-medium">
              <li className="flex items-start space-x-2">
                <span className="text-saffron font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span>Zero backend synchronization databases.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-saffron font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span>Fully compliant with UIDAI Aadhaar storage regulations.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-saffron font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span>1-Click absolute device wipe anytime.</span>
              </li>
            </ul>
          </div>

          {/* Safe status metrics card */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm text-xs space-y-3.5">
            <h3 className="font-extrabold text-slate-800 flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Safe Storage Checklist</span>
            </h3>
            
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider">Storage status:</span>
              <span className="font-extrabold text-green-600 bg-green-50 px-2 py-0.5 rounded">Active (Local Only)</span>
            </div>

            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider">Aadhaar details:</span>
              <span className="font-extrabold text-slate-700">{userProfile?.aadhaarDigits ? `•••• •••• ${userProfile.aadhaarDigits}` : 'Not provided'}</span>
            </div>

            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider">API connection:</span>
              <span className="font-extrabold text-slate-700">{apiKey ? 'Live (Gemini Key)' : 'Local Offline fallback'}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
