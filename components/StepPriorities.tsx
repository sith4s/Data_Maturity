import React from 'react';
import { AssessmentArea } from '../types';
import clsx from 'clsx';
import { Info } from 'lucide-react';

interface StepPrioritiesProps {
  areas: AssessmentArea[];
  priorities: Record<string, number>;
  onRate: (id: string, value: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepPriorities: React.FC<StepPrioritiesProps> = ({ areas, priorities, onRate, onNext, onBack }) => {
  
  const categories = Array.from(new Set(areas.map(a => a.category)));

  // Calculate progress
  const ratedCount = Object.keys(priorities).length;
  const totalCount = areas.length;
  const criticalCount = Object.values(priorities).filter(v => v === 5).length;

  // Helper to determine button style based on value
  const getButtonStyle = (val: number, isSelected: boolean) => {
    if (!isSelected) return "text-slate-400 hover:bg-slate-200";
    
    if (val <= 2) return "bg-slate-500 text-white shadow-md scale-110"; // Low
    if (val <= 4) return "bg-orange-500 text-white shadow-md scale-110"; // Important
    return "bg-red-600 text-white shadow-md scale-110"; // Critical
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
            <h2 className="text-2xl font-bold text-slate-900">Priority Areas</h2>
            <p className="text-slate-600 max-w-2xl mt-1">
            Rate the urgency for improvement in each area. 
            <span className="block mt-1 text-xs font-medium bg-slate-100 text-slate-600 w-fit px-2 py-0.5 rounded">
                <span className="text-slate-500 font-bold">1-2 Low</span> (Grey) | <span className="text-orange-600 font-bold">3-4 Important</span> (Orange) | <span className="text-red-600 font-bold">5 Critical</span> (Red)
            </span>
            </p>
        </div>
        <div className="flex gap-4 text-sm font-medium">
             <div className="px-3 py-1 bg-slate-100 rounded-md text-slate-600">
                Rated: {ratedCount}/{totalCount}
             </div>
             <div className="px-3 py-1 bg-red-100 rounded-md text-red-700">
                Critical: {criticalCount}
             </div>
        </div>
      </div>

      <div className="space-y-8 mb-12">
        {categories.map(category => (
          <div key={category}>
            <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200 flex items-center gap-2">
                {category}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {areas.filter(a => a.category === category).map(area => {
                const currentRating = priorities[area.id] || 0;
                return (
                  <div key={area.id} className="bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900">{area.title}</h4>
                        <div className="group relative">
                             <Info size={14} className="text-slate-400 cursor-help"/>
                             <div className="absolute left-0 bottom-full mb-2 w-64 bg-slate-800 text-white text-xs p-2 rounded hidden group-hover:block z-10">
                                {area.description}
                                <div className="mt-1 text-slate-300">Requires Maturity Level: {area.requiredLevel}</div>
                             </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500">{area.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                        {[1, 2, 3, 4, 5].map((val) => (
                            <button
                                key={val}
                                onClick={() => onRate(area.id, val)}
                                className={clsx(
                                    "w-9 h-9 rounded text-sm font-bold transition-all",
                                    getButtonStyle(val, currentRating === val)
                                )}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-200">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-2.5 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md transition-all shadow-sm"
        >
          Next: Target State
        </button>
      </div>
    </div>
  );
};