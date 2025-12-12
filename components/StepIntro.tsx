
import React, { useMemo } from 'react';
import { Play, TrendingUp, Clock, AlertCircle, Briefcase, AlertTriangle, CheckCircle2, ChevronDown } from 'lucide-react';
import { INDUSTRIES } from '../types';
import { getAssessmentConfig } from '../constants';
import { Logo } from './Logo';

interface StepIntroProps {
  onStart: (industry: string) => void;
}

export const StepIntro: React.FC<StepIntroProps> = ({ onStart }) => {
  const [selectedIndustry, setSelectedIndustry] = React.useState('mining');

  const industryConfig = useMemo(
    () => getAssessmentConfig(selectedIndustry),
    [selectedIndustry]
  );

  const categories = useMemo(
    () => Array.from(new Set(industryConfig.areas.map(a => a.category))),
    [industryConfig]
  );

  const previewSymptoms = useMemo(() => {
    const l1 = industryConfig.levels.find(l => l.level === 1)?.symptoms.slice(0, 2) ?? [];
    const l2 = industryConfig.levels.find(l => l.level === 2)?.symptoms.slice(0, 2) ?? [];
    return [...l1, ...l2].slice(0, 4);
  }, [industryConfig]);

  const previewCharacteristics = useMemo(() => {
    const l4 = industryConfig.levels.find(l => l.level === 4)?.characteristics.slice(0, 2) ?? [];
    const l5 = industryConfig.levels.find(l => l.level === 5)?.characteristics.slice(0, 2) ?? [];
    return [...l4, ...l5].slice(0, 4);
  }, [industryConfig]);

  const selectedIndustryLabel = INDUSTRIES.find(i => i.id === selectedIndustry)?.label ?? 'Industry';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header + Logo */}
      <div className="text-center mb-12 flex flex-col items-center">
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <Logo className="w-20 h-20" />
        </div>

        <h1 className="text-5xl font-extrabold text-[#0B1240] mb-6 tracking-tight">
          Data Maturity Assessment
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A rapid, AI-powered assessment to benchmark your data maturity, identify critical gaps, and generate a strategic roadmap in under 15 minutes.
        </p>
      </div>

      {/* Benefit Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
            <Clock size={24} aria-hidden="true" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Rapid Reconnaissance</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            A 15-minute snapshot rather than a multi-week consulting engagement. Perfect for initial alignment.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-4">
            <TrendingUp size={24} aria-hidden="true" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Decision Support</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Identify priorities and build a preliminary business case for transformation investments.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-4">
            <AlertCircle size={24} aria-hidden="true" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Gap Analysis</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Instantly visualize the gap between your current state and your ambitions.
          </p>
        </div>
      </div>

      {/* Industry Selector + Dynamic Preview */}
      <section className="bg-white p-8 rounded-2xl border-2 border-blue-50 shadow-xl relative overflow-hidden" aria-labelledby="industry-selector-heading">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full -mr-32 -mt-32 opacity-50 pointer-events-none" aria-hidden="true"></div>

        <div className="relative z-10">
          <h2 id="industry-selector-heading" className="text-center text-sm font-bold text-slate-500 mb-6 uppercase tracking-wider">
            Select your Industry to Customize Assessment
          </h2>

          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-md group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" aria-hidden="true"></div>
              <div className="relative">
                <select
                  id="industry-select"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="block w-full appearance-none rounded-lg border-2 border-slate-200 py-4 px-6 text-slate-900 text-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white font-bold cursor-pointer hover:border-blue-400 transition-colors"
                  aria-label="Select your industry"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind.id} value={ind.id}>
                      {ind.label}
                    </option>
                  ))}
                </select>
                <label htmlFor="industry-select" className="sr-only">Industry</label>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-blue-600">
                  <ChevronDown size={24} strokeWidth={3} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Preview */}
          <div className="w-full max-w-3xl mx-auto bg-slate-50/80 rounded-xl p-6 border border-slate-200 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-3">
              <Briefcase size={18} className="text-blue-600" aria-hidden="true" />
              <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                {selectedIndustryLabel} Context
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold text-amber-700 uppercase mb-3 flex items-center gap-1.5">
                  <AlertTriangle size={14} aria-hidden="true" /> Typical Symptoms (Current State)
                </h3>
                <ul className="space-y-2">
                  {previewSymptoms.map((symptom, index) => (
                    <li key={index} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" aria-hidden="true"></span>
                      <span className="leading-snug">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold text-blue-700 uppercase mb-3 flex items-center gap-1.5">
                  <CheckCircle2 size={14} aria-hidden="true" /> Target Characteristics (Future State)
                </h3>
                <ul className="space-y-2">
                  {previewCharacteristics.map((char, index) => (
                    <li key={index} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" aria-hidden="true"></span>
                      <span className="leading-snug">{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500">
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 3).map((cat, i) => (
                  <span key={i} className="bg-white border border-slate-200 px-2.5 py-1 rounded shadow-sm text-slate-600 font-medium">
                    {cat}
                  </span>
                ))}
                {categories.length > 3 && (
                  <span className="text-slate-400">+ {categories.length - 3} more</span>
                )}
              </div>
              <span className="font-medium">{industryConfig.areas.length} Assessment Areas</span>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onStart(selectedIndustry)}
              className="inline-flex items-center justify-center gap-3 bg-[#0B1240] hover:bg-[#1a235e] text-white font-bold py-4 px-12 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-blue-900/20 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Start the Data Maturity Assessment"
            >
              <Play size={22} fill="currentColor" aria-hidden="true" />
              Start Assessment
            </button>
            <p className="mt-4 text-xs text-slate-400">
              No registration required. Instant access.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
