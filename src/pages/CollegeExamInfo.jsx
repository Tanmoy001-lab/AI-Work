import React, { useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import { mockCollegesExams } from '../utils/mockDatabase';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  Check, 
  Calendar, 
  DollarSign, 
  GraduationCap, 
  Filter, 
  ChevronDown,
  Info 
} from 'lucide-react';

export default function CollegeExamInfo({ currentLang, searchQuery }) {
  const t = translations[currentLang] || translations.en;

  const [keyword, setKeyword] = useState('');
  const [streamFilter, setStreamFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [filteredList, setFilteredList] = useState(mockCollegesExams);
  const [expandedId, setExpandedId] = useState(null);

  // Sync searchQuery prop changes (e.g. from Home card clicks)
  useEffect(() => {
    if (searchQuery) {
      setKeyword(searchQuery);
    }
  }, [searchQuery]);

  // Run dynamic filters
  useEffect(() => {
    const results = mockCollegesExams.filter(item => {
      const keywordMatch = !keyword || 
                           item.name.toLowerCase().includes(keyword.toLowerCase()) ||
                           item.stream.toLowerCase().includes(keyword.toLowerCase());
      
      const streamMatch = streamFilter === 'All' || 
                           item.stream.toLowerCase().includes(streamFilter.toLowerCase());

      const typeMatch = typeFilter === 'All' || 
                         item.type === typeFilter;

      const statusMatch = statusFilter === 'All' || 
                           item.status === statusFilter;

      return keywordMatch && streamMatch && typeMatch && statusMatch;
    });

    setFilteredList(results);
  }, [keyword, streamFilter, typeFilter, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2.5">
          <BookOpen className="w-6 sm:w-8 h-6 sm:h-8 text-primary-blue" />
          <span>{t.navCollege}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
          Verify admissions timelines, cutoffs, fee requirements, and registration steps. Search across universities, entrance exams, and college registries.
        </p>
      </div>

      {/* Filter and search zone */}
      <div className="bg-white border border-slate-100 p-5 sm:p-6 rounded-3xl shadow-sm space-y-4">
        
        {/* Search bar */}
        <div className="relative flex items-center bg-slate-50 border border-slate-200/80 rounded-2xl p-1 transition focus-within:ring-2 focus-within:ring-primary-blue/30 focus-within:border-primary-blue">
          <Search className="w-5 h-5 text-slate-400 ml-3" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search universities, engineering, medical exams, or streams..."
            className="w-full bg-transparent border-0 outline-none text-slate-800 text-xs sm:text-sm px-3 py-2.5 sm:py-3 placeholder:text-slate-400 font-semibold"
          />
        </div>

        {/* Categories selector row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Stream */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">
              Filter by Stream:
            </label>
            <select
              value={streamFilter}
              onChange={(e) => setStreamFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-700 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary-blue cursor-pointer"
            >
              <option value="All">All Streams (सभी)</option>
              <option value="Arts">Arts / Humanities</option>
              <option value="Science">Science / Medical</option>
              <option value="Engineering">Engineering / Mathematics</option>
              <option value="Commerce">Commerce / Economics</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">
              Category Type:
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-700 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary-blue cursor-pointer"
            >
              <option value="All">All Form Types (सभी)</option>
              <option value="exam">Entrance Examinations</option>
              <option value="college">University Admissions</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">
              Application Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-700 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary-blue cursor-pointer"
            >
              <option value="All">All Timelines (सभी)</option>
              <option value="Open">Currently Open (सक्रिय)</option>
              <option value="Closed">Closed / Upcoming</option>
            </select>
          </div>

        </div>

      </div>

      {/* College and Exam listings */}
      <div className="space-y-4">
        {filteredList.length === 0 ? (
          /* Empty board */
          <div className="bg-white border border-slate-100 p-12 rounded-3xl shadow-sm text-center space-y-3">
            <div className="bg-slate-50 text-slate-400 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto border border-slate-100">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-800">
              No Universities or Exams Found
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
              We couldn't find matches matching your queries. Adjust filters or search keywords.
            </p>
          </div>
        ) : (
          /* Map list elements */
          filteredList.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div 
                key={item.id}
                className="bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all overflow-hidden"
              >
                {/* Header card info clicker */}
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-6 cursor-pointer flex items-start justify-between space-x-4 hover:bg-slate-50/50 transition animate-fade-in"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        item.type === 'exam' 
                          ? 'bg-purple-50 text-purple-600' 
                          : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {item.type === 'exam' ? 'Entrance Exam' : 'University Portal'}
                      </span>
                      
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        item.status === 'Open' 
                          ? 'bg-green-50 text-green-600 animate-pulse border border-green-100' 
                          : 'bg-red-50 text-red-500'
                      }`}>
                        {item.status === 'Open' ? 'Registrations Open' : 'Portal Closed'}
                      </span>
                      
                      <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {item.state}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-extrabold text-slate-800 leading-tight">
                      {item.name}
                    </h3>

                    <p className="text-xs text-slate-500 font-medium">
                      🎓 <strong>Streams:</strong> {item.stream}
                    </p>
                  </div>

                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ${isExpanded ? 'rotate-180 text-primary-blue' : ''}`} />
                </div>

                {/* Expanded content details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-50 bg-slate-50/20 space-y-5 animate-fade-in text-xs sm:text-sm">
                    
                    {/* Dates & Fees */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Timeline */}
                      <div className="flex items-start space-x-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                        <Calendar className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                        <div>
                          <span className="block font-bold text-slate-400 uppercase text-[9px] tracking-wider mb-0.5">
                            Registration Timelines
                          </span>
                          <p className="text-xs font-semibold text-slate-700 leading-normal">
                            {item.dates}
                          </p>
                        </div>
                      </div>

                      {/* Fees */}
                      <div className="flex items-start space-x-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                        <DollarSign className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="block font-bold text-slate-400 uppercase text-[9px] tracking-wider mb-0.5">
                            Application Fees
                          </span>
                          <p className="text-xs font-semibold text-slate-700 leading-normal">
                            {item.fees}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Eligibility thresholds */}
                    <div className="space-y-1">
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Eligibility Criteria:
                      </span>
                      <p className="font-semibold text-slate-600 leading-relaxed pl-1">
                        {item.eligibility}
                      </p>
                    </div>

                    {/* Documents checklist requirements */}
                    <div className="space-y-1.5">
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Upload Document Specifications:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
                        {item.requiredDocs.map((doc, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-slate-600">
                            <span className="w-4 h-4 bg-blue-50 text-primary-blue flex items-center justify-center rounded-full font-bold text-[9px] border border-blue-100 shrink-0">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                            <span className="font-semibold text-xs">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Application steps */}
                    <div className="space-y-3">
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Step-by-Step Online Application Process:
                      </span>
                      <div className="space-y-2">
                        {item.process.map((step, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <p className="text-xs font-semibold text-slate-600 leading-relaxed pt-0.5">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Previous cutoffs */}
                    {item.cutoffs && (
                      <div className="bg-blue-50/40 p-4 rounded-2xl border border-blue-100/50 flex items-start space-x-3 text-xs">
                        <Info className="w-4.5 h-4.5 text-primary-blue shrink-0 mt-0.5" />
                        <div>
                          <span className="block font-bold text-slate-700 uppercase text-[9px] tracking-wider mb-0.5">
                            Admissions Guidance Notes
                          </span>
                          <p className="font-semibold text-slate-600 leading-relaxed">
                            {item.cutoffs}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Direct redirection portal bar */}
                    <div className="pt-3 border-t border-slate-100/60 flex items-center justify-end">
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-5 bg-primary-blue text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 hover:brightness-105 active:scale-95 transition flex items-center justify-center space-x-1.5"
                      >
                        <span>Go to official Admission page</span>
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
  );
}
