import React, { useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import { mockSchemes } from '../utils/mockDatabase';
import { 
  Sparkles, 
  Search, 
  ExternalLink, 
  HelpCircle, 
  Check, 
  FileText, 
  Filter, 
  Briefcase,
  ChevronDown,
  UserCheck
} from 'lucide-react';

export default function SchemeFinder({ currentLang, userProfile, searchQuery }) {
  const t = translations[currentLang] || translations.en;

  // Filter States
  const [stateFilter, setStateFilter] = useState('All');
  const [occupationFilter, setOccupationFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [incomeFilter, setIncomeFilter] = useState(500000);
  const [ageFilter, setAgeFilter] = useState(25);
  
  const [filteredSchemes, setFilteredSchemes] = useState(mockSchemes);
  const [expandedSchemeId, setExpandedSchemeId] = useState(null);

  // Trigger autofill on load if profile exists
  const applyProfileFilters = () => {
    if (userProfile) {
      if (userProfile.state) setStateFilter(userProfile.state);
      if (userProfile.category) setCategoryFilter(userProfile.category);
      if (userProfile.gender) setGenderFilter(userProfile.gender);
      
      // Calculate age from DOB
      if (userProfile.dob) {
        const birthYear = new Date(userProfile.dob).getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        if (!isNaN(age)) setAgeFilter(age);
      }
    }
  };

  useEffect(() => {
    applyProfileFilters();
  }, [userProfile]);

  // Sync landing page card clicks
  useEffect(() => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (q.includes('post matric') || q.includes('scholarship')) {
        setOccupationFilter('Student');
      } else if (q.includes('kisan') || q.includes('farmer')) {
        setOccupationFilter('Farmer');
      }
    }
  }, [searchQuery]);

  // Run dynamic filtering
  useEffect(() => {
    const results = mockSchemes.filter(scheme => {
      // 1. Domicile state match
      const stateMatch = stateFilter === 'All' || 
                         scheme.states.includes('All') || 
                         scheme.states.includes(stateFilter);
      
      // 2. Occupation Match
      const occMatch = occupationFilter === 'All' || 
                       scheme.category === 'All' || 
                       scheme.category.toLowerCase() === occupationFilter.toLowerCase();
      
      // 3. Gender match
      const genMatch = genderFilter === 'All' || 
                       scheme.gender === 'All' || 
                       scheme.gender.toLowerCase() === genderFilter.toLowerCase();
      
      // 4. Income cap check
      const incomeMatch = !scheme.maxIncome || incomeFilter <= scheme.maxIncome;

      // 5. Age range match
      const ageMatch = ageFilter >= scheme.minAge && ageFilter <= scheme.maxAge;

      return stateMatch && occMatch && genMatch && incomeMatch && ageMatch;
    });

    setFilteredSchemes(results);
  }, [stateFilter, occupationFilter, genderFilter, categoryFilter, incomeFilter, ageFilter]);

  const uniqueStates = ["All", "Delhi", "Uttar Pradesh", "Bihar", "Madhya Pradesh", "Rajasthan", "Maharashtra", "Tamil Nadu", "Andhra Pradesh", "Karnataka"];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2.5">
          <Briefcase className="w-6 sm:w-8 h-6 sm:h-8 text-saffron" />
          <span>{t.navScheme}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
          Verify matching government benefit schemes and financial plans. Adjust details below or apply your safe profile to filter results instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Eligibility Questionnaire Form */}
        <div className="bg-white border border-slate-100 p-6 sm:p-7 rounded-3xl shadow-sm space-y-5 h-fit lg:sticky lg:top-24">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <Filter className="w-4.5 h-4.5 text-primary-blue" />
              <span>{t.eligibilityForm}</span>
            </h2>
            
            {userProfile && (
              <button
                onClick={applyProfileFilters}
                className="flex items-center space-x-1 text-[11px] font-bold text-green-700 bg-green-50 border border-green-100 px-2 py-1 rounded-lg hover:bg-green-100 transition"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Load Profile</span>
              </button>
            )}
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            
            {/* Domicile State */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Domicile State (मूल निवास राज्य):
              </label>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-primary-blue cursor-pointer"
              >
                {uniqueStates.map((st, i) => (
                  <option key={i} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Category / Profession */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Primary Status / Occupation:
              </label>
              <select
                value={occupationFilter}
                onChange={(e) => setOccupationFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-primary-blue cursor-pointer"
              >
                <option value="All">All Categories (सभी)</option>
                <option value="Student">Student (छात्र/छात्रा)</option>
                <option value="Farmer">Farmer (किसान)</option>
                <option value="Women">Women specific (महिला)</option>
                <option value="Senior Citizen">Senior Citizen (वरिष्ठ नागरिक)</option>
              </select>
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Gender:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['All', 'Male', 'Female'].map((gen) => (
                  <button
                    key={gen}
                    onClick={() => setGenderFilter(gen)}
                    className={`py-2 border rounded-xl text-xs font-bold transition ${
                      genderFilter === gen 
                        ? 'bg-blue-50 border-primary-blue text-primary-blue shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>

            {/* Income Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                <span>{t.incomeLabel}</span>
                <span className="text-primary-blue font-extrabold">Under ₹{incomeFilter.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="800000"
                step="25000"
                value={incomeFilter}
                onChange={(e) => setIncomeFilter(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-blue"
              />
            </div>

            {/* Age Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                <span>Applicant Age:</span>
                <span className="text-saffron font-extrabold">{ageFilter} Years</span>
              </div>
              <input
                type="range"
                min="5"
                max="85"
                step="1"
                value={ageFilter}
                onChange={(e) => setAgeFilter(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-saffron"
              />
            </div>

          </div>
        </div>

        {/* Right Schemes Matchboard list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider pl-1 shrink-0">
            <span>Matching Schemes Dashboard</span>
            <span>{filteredSchemes.length} Benefit Programs Mapped</span>
          </div>

          {filteredSchemes.length === 0 ? (
            /* No results card */
            <div className="bg-white border border-slate-100 p-12 rounded-3xl shadow-sm text-center space-y-4">
              <div className="bg-slate-50 text-slate-400 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto border border-slate-100">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-800">
                {t.noSchemes.split('.')[0]}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
                {t.noSchemes.split('.')[1] || "Increase your income budget slider or toggle occupation/state selectors to see more."}
              </p>
            </div>
          ) : (
            /* Map cards */
            filteredSchemes.map((scheme) => {
              const isExpanded = expandedSchemeId === scheme.id;
              return (
                <div 
                  key={scheme.id}
                  className="bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all overflow-hidden"
                >
                  {/* Top card summary header clicker */}
                  <div 
                    onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                    className="p-6 cursor-pointer flex items-start justify-between space-x-4 hover:bg-slate-50/50 transition"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                          {scheme.category} Category
                        </span>
                        {scheme.states.includes('All') ? (
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            Central Gov
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-saffron bg-orange-50 px-2 py-0.5 rounded">
                            State: {scheme.states.join(', ')}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-800 leading-tight">
                        {scheme.name}
                      </h3>
                      
                      <p className="text-xs text-slate-500 font-medium">
                        💼 <strong>Benefit:</strong> <span className="text-green-600 font-bold">{scheme.benefit}</span>
                      </p>
                    </div>

                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ${isExpanded ? 'rotate-180 text-primary-blue' : ''}`} />
                  </div>

                  {/* Expansion detail sheet */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-50 bg-slate-50/20 space-y-5 animate-fade-in text-xs sm:text-sm">
                      
                      {/* Eligibility block */}
                      <div className="space-y-1">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {t.eligibilityCriteria}:
                        </span>
                        <p className="font-semibold text-slate-600 leading-relaxed pl-1">
                          {scheme.criteria}
                        </p>
                      </div>

                      {/* Documents checklists */}
                      <div className="space-y-1.5">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {t.requiredDocs}:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
                          {scheme.requiredDocs.map((doc, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-slate-600">
                              <span className="w-4 h-4 bg-green-50 text-green-500 flex items-center justify-center rounded-full font-bold text-[9px] border border-green-100 shrink-0">
                                <Check className="w-2.5 h-2.5" />
                              </span>
                              <span className="font-semibold text-xs">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Step application procedure */}
                      <div className="space-y-3">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {t.howToApplyStep} (आवेदन करने के चरण):
                        </span>
                        <div className="space-y-2">
                          {scheme.steps.map((step, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <span className="w-5 h-5 rounded-full bg-blue-50 text-primary-blue flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-blue-100">
                                {idx + 1}
                              </span>
                              <p className="text-xs font-semibold text-slate-600 leading-relaxed pt-0.5">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Redirect actions */}
                      <div className="pt-3 border-t border-slate-100/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          🗓️ Deadline: <span className="text-red-500">{scheme.deadline}</span>
                        </div>
                        
                        <a
                          href={scheme.officialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto py-2.5 px-5 bg-primary-blue text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 hover:brightness-105 active:scale-95 transition flex items-center justify-center space-x-1.5"
                        >
                          <span>Apply on Official Portal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
}
