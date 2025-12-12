
import React, { useState, useEffect, useMemo } from 'react';
import { MaturityLevel, LevelDescription, INDUSTRIES } from '../types';
import { SCORING_DIMENSIONS, MATURITY_ARCHETYPES, INDUSTRY_DIMENSION_BENCHMARKS } from '../constants';
import clsx from 'clsx';
import { CheckCircle2, BarChart3, Info, ArrowRight, LayoutGrid, SlidersHorizontal, TrendingUp, AlertTriangle } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface StepCurrentStateProps {
  levels: LevelDescription[];
  currentLevel: MaturityLevel | null;
  onSelect: (level: MaturityLevel) => void;
  onNext: () => void;
  onBack: () => void;
  industry: string;
}

type TabView = 'levels' | 'matrix';

export const StepCurrentState: React.FC<StepCurrentStateProps> = ({
  levels,
  currentLevel,
  onSelect,
  onNext,
  onBack,
  industry
}) => {
  // View State
  const [activeTab, setActiveTab] = useState<TabView>('levels');

  // Initialize dimension scores
  // If currentLevel is set but scores aren't detailed yet, pre-fill them based on currentLevel
  const [scores, setScores] = useState<Record<string, number>>(() => {
     const initialVal = currentLevel ? currentLevel : 1;
     const initialScores: Record<string, number> = {};
     SCORING_DIMENSIONS.forEach(d => initialScores[d.id] = initialVal);
     return initialScores;
  });

  // 1. ANALYTICAL MODEL: Calculate Weighted Score
  const finalScore = useMemo(() => {
    let totalScore = 0;
    SCORING_DIMENSIONS.forEach(d => {
      const s = scores[d.id] || 1;
      totalScore += s * d.weight;
    });
    return Math.max(1, Math.min(5, totalScore)); // Clamp between 1 and 5
  }, [scores]);

  // 2. ANALYTICAL MODEL: Determine Archetype
  const archetype = useMemo(() => {
    return MATURITY_ARCHETYPES.find(a => finalScore >= a.minScore && finalScore <= a.maxScore) || MATURITY_ARCHETYPES[0];
  }, [finalScore]);

  // 3. ANALYTICAL MODEL: Market Data Aggregation
  // Calculate Global Market Average from all industries defined in constants
  const marketAverages = useMemo(() => {
    const allIndustries = Object.values(INDUSTRY_DIMENSION_BENCHMARKS);
    const count = allIndustries.length;
    
    const sums = { d1: 0, d2: 0, d3: 0, d4: 0, d5: 0 };
    allIndustries.forEach(ind => {
        sums.d1 += ind.d1;
        sums.d2 += ind.d2;
        sums.d3 += ind.d3;
        sums.d4 += ind.d4;
        sums.d5 += ind.d5;
    });

    return {
        d1: sums.d1 / count,
        d2: sums.d2 / count,
        d3: sums.d3 / count,
        d4: sums.d4 / count,
        d5: sums.d5 / count,
    };
  }, []);

  // 4. ANALYTICAL MODEL: Chart Data Preparation
  const chartData = useMemo(() => {
    // Get specific industry data or fallback to 'other'
    const industryBenchmarks = INDUSTRY_DIMENSION_BENCHMARKS[industry] || INDUSTRY_DIMENSION_BENCHMARKS['other'];
    
    return SCORING_DIMENSIONS.map(d => ({
      subject: d.name,
      id: d.id,
      // Series A: User
      A: scores[d.id], 
      // Series B: Specific Industry
      B: industryBenchmarks[d.id], 
      // Series C: Global Market Average
      C: marketAverages[d.id as keyof typeof marketAverages], 
      fullMark: 5,
    }));
  }, [scores, industry, marketAverages]);

  // 5. ANALYTICAL MODEL: Gap Analysis (Insights)
  const analysis = useMemo(() => {
    let biggestGap = 0;
    let gapDimension = '';
    let leaderDimension = '';
    let maxLead = 0;

    chartData.forEach(item => {
        const gap = item.B - item.A; // Industry - You
        const lead = item.A - item.B; // You - Industry

        if (gap > biggestGap) {
            biggestGap = gap;
            gapDimension = item.subject;
        }
        if (lead > maxLead) {
            maxLead = lead;
            leaderDimension = item.subject;
        }
    });

    return { biggestGap, gapDimension, leaderDimension, maxLead };
  }, [chartData]);

  const industryLabel = useMemo(() => {
     const ind = INDUSTRIES.find(i => i.id === industry);
     return ind ? ind.label : 'Industry';
  }, [industry]);

  // Sync parent state
  useEffect(() => {
    const roundedLevel = Math.round(finalScore) as MaturityLevel;
    if (roundedLevel !== currentLevel) {
        onSelect(roundedLevel);
    }
  }, [finalScore]);

  // Handlers
  const handleLevelCardSelect = (level: MaturityLevel) => {
    const newScores: Record<string, number> = {};
    SCORING_DIMENSIONS.forEach(d => newScores[d.id] = level);
    setScores(newScores);
    setActiveTab('matrix');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScoreChange = (id: string, val: number) => {
    setScores(prev => ({ ...prev, [id]: val }));
  };

  const getButtonStyle = (val: number, currentVal: number) => {
    const isSelected = val === currentVal;
    if (isSelected) {
        if(val <= 2) return "bg-slate-600 text-white border-slate-600";
        if(val === 3) return "bg-blue-600 text-white border-blue-600";
        return "bg-teal-600 text-white border-teal-600";
    }
    return "bg-white text-slate-400 border-slate-200 hover:border-blue-300 hover:text-blue-500";
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER & TABS */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Current State Assessment</h2>
                <p className="text-slate-600 mt-2 text-lg">Where does your organization stand today?</p>
            </div>
            
            {/* TAB SWITCHER */}
            <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-sm inline-flex">
                <button
                    onClick={() => setActiveTab('levels')}
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all",
                        activeTab === 'levels' ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    <LayoutGrid size={16} /> General Level
                </button>
                <button
                    onClick={() => setActiveTab('matrix')}
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all",
                        activeTab === 'matrix' ? "bg-blue-50 text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    <SlidersHorizontal size={16} /> Detailed Scoring
                </button>
            </div>
        </div>
      </div>

      {/* --- TAB 1: LEVEL SELECTOR (Cards) --- */}
      {activeTab === 'levels' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                 {levels.map((lvl) => {
                     const isSelected = Math.round(finalScore) === lvl.level;
                     return (
                        <div 
                            key={lvl.level}
                            onClick={() => handleLevelCardSelect(lvl.level)}
                            className={clsx(
                                "group cursor-pointer rounded-xl border-2 p-5 transition-all duration-300 relative flex flex-col h-full hover:-translate-y-1 hover:shadow-lg",
                                isSelected ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600" : "border-slate-200 bg-white hover:border-blue-300"
                            )}
                        >
                            {isSelected && (
                                <div className="absolute top-3 right-3 text-blue-600">
                                    <CheckCircle2 size={20} fill="currentColor" className="text-white" />
                                </div>
                            )}
                            
                            <div className={clsx(
                                "w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mb-4 transition-colors",
                                isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                            )}>
                                {lvl.level}
                            </div>
                            
                            <h3 className="font-bold text-slate-900 mb-1">{lvl.title}</h3>
                            <p className="text-xs text-slate-500 italic mb-4 h-8">{lvl.subtitle}</p>
                            
                            <div className="space-y-4 mt-auto">
                                <div>
                                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">Characteristics</span>
                                    <ul className="space-y-1">
                                        {lvl.characteristics.slice(0, 3).map((char, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                                                <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                                                <span className="leading-snug">{char}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                                <span className="text-xs font-bold text-blue-600 group-hover:underline">Select & Refine</span>
                            </div>
                        </div>
                     );
                 })}
             </div>
             <div className="mt-8 text-center bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-slate-600">
                 <Info size={16} className="inline mr-2 -mt-0.5 text-blue-500"/>
                 Select the level that best describes your organization to pre-fill the assessment matrix. You can fine-tune specific areas in the next step.
             </div>
          </div>
      )}
      
      {/* --- TAB 2: DETAILED MATRIX --- */}
      {activeTab === 'matrix' && (
        <div className="grid lg:grid-cols-12 gap-8 animate-in slide-in-from-right-4 duration-500">
            
            {/* LEFT: SCORING INPUTS */}
            <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Strategic Dimensions</h3>
                        <button onClick={() => setActiveTab('levels')} className="text-xs text-blue-600 hover:underline">
                            Reset to General Level
                        </button>
                    </div>
                    
                    <div className="space-y-8">
                        {SCORING_DIMENSIONS.map((dim) => (
                            <div key={dim.id} className="relative">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-800 text-lg">{dim.name}</span>
                                        <div className="group relative">
                                            <Info size={16} className="text-slate-400 cursor-help" />
                                            <div className="absolute left-0 bottom-full mb-2 w-64 bg-slate-800 text-white text-xs p-3 rounded shadow-lg hidden group-hover:block z-20 leading-relaxed pointer-events-none">
                                                {dim.description}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">Weight: {Math.round(dim.weight * 100)}%</span>
                                </div>
                                
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <button
                                            key={val}
                                            onClick={() => handleScoreChange(dim.id, val)}
                                            className={clsx(
                                                "flex-1 py-3 rounded-lg border-2 font-bold transition-all duration-200 text-sm relative overflow-hidden",
                                                getButtonStyle(val, scores[dim.id])
                                            )}
                                        >
                                            {val}
                                            {Math.round(finalScore) === val && val !== scores[dim.id] && (
                                                <div className="absolute top-0 right-0 w-2 h-2 bg-slate-300 rounded-full m-1"></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-2 px-1 text-[10px] uppercase font-bold text-slate-400">
                                    <span>Initial</span>
                                    <span>Optimized</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT: RESULTS DASHBOARD */}
            <div className="lg:col-span-5 space-y-6 flex flex-col">
                {/* SCORE CARD */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-400"></div>
                    <div className="p-8 text-center">
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Digital Maturity Score</div>
                        <div className="text-6xl font-black text-slate-900 mb-4 tracking-tighter">
                            {finalScore.toFixed(2)}
                        </div>
                        <div className={clsx("inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border", archetype.colorClass)}>
                            {archetype.label}
                        </div>
                        <p className="mt-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                            {archetype.description}
                        </p>
                    </div>
                </div>

                {/* RADAR CHART */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col flex-1 min-h-[400px]">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <BarChart3 size={14} /> Market Benchmark Model
                    </h3>
                    
                    <div className="flex-1 w-full relative">
                        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                                
                                <Radar 
                                    name="You" 
                                    dataKey="A" 
                                    stroke="#2563eb" 
                                    strokeWidth={3} 
                                    fill="#3b82f6" 
                                    fillOpacity={0.2} 
                                />
                                <Radar 
                                    name={`${industryLabel} Avg`} 
                                    dataKey="B" 
                                    stroke="#64748b" 
                                    strokeWidth={2} 
                                    strokeDasharray="4 4" 
                                    fill="transparent" 
                                />
                                <Radar 
                                    name="Global Market Avg" 
                                    dataKey="C" 
                                    stroke="#10b981" 
                                    strokeWidth={2} 
                                    strokeDasharray="2 2" 
                                    fill="transparent" 
                                />
                                
                                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}/>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* DYNAMIC ANALYSIS BOX */}
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                         {analysis.gapDimension && (
                             <div className="flex items-start gap-3 bg-amber-50 p-3 rounded-lg">
                                 <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                                 <div>
                                     <div className="text-xs font-bold text-amber-800 uppercase">Improvement Opportunity</div>
                                     <p className="text-xs text-amber-700 leading-snug mt-1">
                                         You are <strong>{analysis.biggestGap.toFixed(1)} points</strong> below the {industryLabel} average in <strong>{analysis.gapDimension}</strong>.
                                     </p>
                                 </div>
                             </div>
                         )}
                         {analysis.leaderDimension && (
                             <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                                 <TrendingUp size={16} className="text-green-600 mt-0.5 shrink-0" />
                                 <div>
                                     <div className="text-xs font-bold text-green-800 uppercase">Market Leader</div>
                                     <p className="text-xs text-green-700 leading-snug mt-1">
                                         You are outperforming the industry by <strong>{analysis.maxLead.toFixed(1)} points</strong> in <strong>{analysis.leaderDimension}</strong>.
                                     </p>
                                 </div>
                             </div>
                         )}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* NAVIGATION */}
      <div className="flex justify-between pt-8 border-t border-slate-200 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors"
        >
          Back
        </button>
        <div className="flex gap-4">
            {activeTab === 'levels' ? (
                 <button
                 onClick={() => setActiveTab('matrix')}
                 className="px-8 py-2.5 rounded-lg font-bold bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
               >
                 Fine-tune Score <ArrowRight size={16} className="inline ml-2"/>
               </button>
            ) : null}
            <button
            onClick={onNext}
            className="px-8 py-2.5 rounded-lg font-bold bg-[#0B1240] text-white hover:bg-blue-900 hover:shadow-lg transition-all shadow-md transform hover:-translate-y-0.5"
            >
            Next: Identify Priorities
            </button>
        </div>
      </div>
    </div>
  );
};
