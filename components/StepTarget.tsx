
import React, { useEffect, useMemo } from 'react';
import { AssessmentState, MaturityLevel, LevelDescription } from '../types';
import { TIMELINE_OPTIONS } from '../constants';
import clsx from 'clsx';
import { 
  ArrowRight, CheckCircle2, 
  Clock, Target, ChevronRight, Zap, Info, TrendingUp, DollarSign, Users,
  BarChart3
} from 'lucide-react';

interface StepTargetProps {
  state: AssessmentState;
  levels: LevelDescription[];
  onSetTarget: (level: MaturityLevel) => void;
  onSetTimeline: (months: number) => void;
  onGenerate: () => void;
  onBack: () => void;
}

// Extended Benchmarks for all new industries
const INDUSTRY_BENCHMARKS: Record<string, { velocity: number; avgMaturity: number; insight: string }> = {
  // Existing
  mining: { velocity: 0.6, avgMaturity: 2.4, insight: "Heavy asset reliance limits speed. Leaders achieve 0.8 lvls/yr via IT/OT convergence." },
  automotive: { velocity: 0.9, avgMaturity: 2.9, insight: "SDV pressure drives high velocity, but legacy supply chains create drag." },
  manufacturing: { velocity: 0.7, avgMaturity: 2.6, insight: "Scaling Industry 4.0 pilots across multiple factories is the primary bottleneck." },
  retail: { velocity: 1.1, avgMaturity: 3.1, insight: "Fast-moving sector. Leaders aggressively adopt cloud/AI for personalization." },
  finance: { velocity: 0.8, avgMaturity: 3.4, insight: "High baseline, but regulation and legacy cores limit transformation speed." },
  healthcare: { velocity: 0.5, avgMaturity: 2.1, insight: "Data privacy and fragmented EMRs historically suppress velocity." },
  tech: { velocity: 1.4, avgMaturity: 3.8, insight: "Native digital foundations allow for rapid pivots and AI adoption." },
  
  // New - Energy
  energy: { velocity: 0.6, avgMaturity: 2.7, insight: "Grid modernization is capital intensive; regulatory cycles dictate pace." },
  waste: { velocity: 0.5, avgMaturity: 2.0, insight: "Low baseline maturity; significant quick-win potential in route optimization." },
  
  // New - Logistics
  logistics: { velocity: 0.9, avgMaturity: 2.8, insight: "High pressure for visibility drives faster adoption of tracking layers." },
  maritime: { velocity: 0.5, avgMaturity: 2.3, insight: "Connectivity at sea and port complexity slow down digitalization." },
  
  // New - TMT
  telco: { velocity: 1.0, avgMaturity: 3.2, insight: "Data-rich environment but burdened by massive legacy technical debt." },
  media: { velocity: 1.3, avgMaturity: 3.0, insight: "Content supply chain and personalization drive very high velocity." },

  // New - Built Env
  construction: { velocity: 0.4, avgMaturity: 1.8, insight: "Historically the least digitized sector; immense fragmentation hurdles." },

  // New - Public
  government: { velocity: 0.4, avgMaturity: 2.2, insight: "Procurement cycles and risk aversion keep velocity below market average." },
  education: { velocity: 0.5, avgMaturity: 2.0, insight: "Privacy concerns and decentralized decision making slow progress." },
  defense: { velocity: 0.6, avgMaturity: 2.9, insight: "High pockets of excellence (Intel) but heavy logistics tail drags average." },
  nonprofit: { velocity: 0.5, avgMaturity: 1.9, insight: "Budget constraints limit velocity despite high desire for impact data." },

  // New - Services
  hospitality: { velocity: 0.8, avgMaturity: 2.5, insight: "Customer-facing tech moves fast; back-office operations lag behind." },
  professional: { velocity: 0.7, avgMaturity: 2.6, insight: "Partnership structures often impede centralized data strategy decisions." },
  legal: { velocity: 0.6, avgMaturity: 2.1, insight: "Conservative culture resists automation; GenAI is forcing a sudden shift." },

  // New - Process
  pharma: { velocity: 0.8, avgMaturity: 3.0, insight: "R&D is advanced; Manufacturing and Supply Chain are catching up." },
  chemical: { velocity: 0.6, avgMaturity: 2.7, insight: "Process safety focus creates caution in IT/OT integration." },
  agri: { velocity: 0.5, avgMaturity: 1.9, insight: "Connectivity in rural areas and equipment interoperability are key blockers." },
  fmcg: { velocity: 1.0, avgMaturity: 3.0, insight: "Consumer data drives speed; retail partner data sharing is the bottleneck." },
  insurance: { velocity: 0.8, avgMaturity: 3.1, insight: "Actuarial data is strong; IoT and real-time claims are the new frontier." },

  other: { velocity: 0.7, avgMaturity: 2.5, insight: "Average cross-industry benchmark for digital transformation initiatives." }
};

export const StepTarget: React.FC<StepTargetProps> = ({ state, levels, onSetTarget, onSetTimeline, onGenerate, onBack }) => {
  const currentLevel = state.currentLevel || 1;
  const targetLevel = state.targetLevel || Math.min(currentLevel + 2, 5) as MaturityLevel;
  
  // Initialize default target if not set
  useEffect(() => {
    if (!state.targetLevel) onSetTarget(targetLevel);
  }, []);

  const gap = targetLevel - currentLevel;
  
  // --- Expert Logic: Feasibility & Risk Calculation ---
  // Velocity = Levels needed / Years available
  const years = state.timelineMonths / 12;
  const levelsPerYear = gap > 0 ? gap / years : 0;
  
  const riskProfile = useMemo(() => {
    if (gap <= 0) return {
        level: "N/A", score: 0, color: "text-slate-400", bgColor: "bg-slate-100", 
        borderColor: "border-slate-200", label: "No Change", 
        desc: "Target level must be higher.",
        implication: "Maintain current operations."
    };

    if (levelsPerYear > 1.3) { // High velocity
       return {
        level: "High", score: 3, color: "text-rose-700", bgColor: "bg-rose-50", 
        borderColor: "border-rose-200", label: "Aggressive", 
        desc: "Exceeds standard industry velocity.",
        implication: "High risk of failure without dedicated office."
      };
    } else if (levelsPerYear > 0.7) { // Standard velocity
       return {
        level: "Medium", score: 2, color: "text-amber-700", bgColor: "bg-amber-50", 
        borderColor: "border-amber-200", label: "Balanced", 
        desc: "Aligned with typical benchmarks.",
        implication: "Achievable with focused effort."
      };
    } else { // Low velocity
       return {
        level: "Low", score: 1, color: "text-emerald-700", bgColor: "bg-emerald-50", 
        borderColor: "border-emerald-200", label: "Conservative Risk", 
        desc: "Below industry average velocity (<0.7 levels/year).",
        implication: "Can be achieved with existing resources."
      };
    }
  }, [gap, levelsPerYear]);

  // Cost & Effort Mapping based on Velocity
  const resourceEstimates = useMemo(() => {
      if (gap <= 0) return { cost: "None", effort: "None" };
      if (levelsPerYear > 1.3) return { cost: "$$$ High Capex", effort: "Transformation Office" };
      if (levelsPerYear > 0.7) return { cost: "$$ Med Opex", effort: "Dedicated Team" };
      return { cost: "$ Low Opex", effort: "Part-time" };
  }, [gap, levelsPerYear]);

  const targetLevelDetails = levels.find(l => l.level === targetLevel);
  const currentLevelDetails = levels.find(l => l.level === currentLevel);

  // Industry Benchmark Data
  const benchmark = INDUSTRY_BENCHMARKS[state.industry] || INDUSTRY_BENCHMARKS.other;
  const isOutpacing = levelsPerYear > benchmark.velocity;

  // --- Gauge Visual Logic ---
  // 3 segments: 0-0.7 (Green), 0.7-1.3 (Yellow), 1.3-2.0+ (Red)
  const maxVal = 2.0;
  const clampedVelocity = Math.min(levelsPerYear, maxVal);
  const percent = (clampedVelocity / maxVal) * 100;

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12 font-sans">
      
      {/* HEADER: PHASE 3 OF 4 */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3">
             <span className="bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">Phase 3 of 4</span>
             <ChevronRight size={10} className="text-slate-400" />
             <span>Strategy Definition</span>
             <ChevronRight size={10} className="text-slate-400" />
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="flex-1">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Target State & Roadmap</h1>
                <p className="text-lg text-slate-500 font-light max-w-2xl leading-relaxed">
                    Define your ambition. We analyze feasibility against your organization's capability to absorb change.
                </p>
            </div>

            {/* Top Right Scorecard */}
            <div className="flex bg-white border border-slate-200 rounded-xl shadow-sm divide-x divide-slate-100 min-w-[320px] overflow-hidden">
                <div className="px-6 py-4 flex-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                         Current State
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-slate-900">L{currentLevel}</span>
                        <span className="text-sm font-bold text-slate-500">{currentLevelDetails?.title}</span>
                    </div>
                </div>
                <div className="px-6 py-4 flex-1 bg-indigo-50/30">
                     <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                         Target Ambition
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-indigo-600">L{targetLevel}</span>
                        {gap > 0 && (
                            <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">
                                +{gap} Levels
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
            {/* MAIN COLUMN (8 Cols) */}
            <div className="lg:col-span-8 space-y-12">
                {/* STEP 1: IMPLEMENTATION HORIZON */}
                <section>
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
                        <Clock size={18} className="text-indigo-600" />
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Step 1: Implementation Horizon</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-5">
                        {TIMELINE_OPTIONS.map((opt) => {
                            const isSelected = state.timelineMonths === opt.months;
                            return (
                                <div key={opt.months} onClick={() => onSetTimeline(opt.months)}
                                    className={clsx("relative p-5 rounded-xl border-2 text-left cursor-pointer transition-all duration-200 group h-full flex flex-col", isSelected ? "border-indigo-600 bg-white ring-1 ring-indigo-600 shadow-md z-10" : "border-slate-100 bg-white hover:border-indigo-200 hover:shadow-sm")}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-baseline gap-1"><span className={clsx("text-4xl font-extrabold tracking-tight", isSelected ? "text-slate-900" : "text-slate-400")}>{opt.months}</span><span className="text-sm font-medium text-slate-400">Mo</span></div>
                                        <div className={clsx("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors", isSelected ? "border-indigo-600" : "border-slate-200")}>{isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}</div>
                                    </div>
                                    <div className={clsx("text-xs font-bold uppercase tracking-wider mb-2", isSelected ? "text-indigo-600" : "text-slate-500")}>{opt.label}</div>
                                    <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600">{opt.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* STEP 2: SELECT TARGET MATURITY */}
                <section>
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
                        <Target size={18} className="text-indigo-600" />
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Step 2: Select Target Maturity</h3>
                    </div>
                    <div className="space-y-4">
                        {levels.map((lvl) => {
                            if (lvl.level < currentLevel) return null;
                            const isCurrent = lvl.level === currentLevel;
                            const isTarget = lvl.level === targetLevel;
                            const isRecommended = lvl.level === Math.min(currentLevel + 2, 5);
                            return (
                                <div key={lvl.level} onClick={() => !isCurrent && onSetTarget(lvl.level)} className={clsx("flex flex-col md:flex-row gap-6 p-6 rounded-xl border-2 transition-all duration-200 relative", isCurrent ? "bg-slate-50 border-slate-200 opacity-70 cursor-default" : isTarget ? "bg-white border-indigo-600 shadow-xl ring-1 ring-indigo-600 z-10 scale-[1.01]" : "bg-white border-slate-100 hover:border-indigo-200 hover:shadow-md cursor-pointer")}>
                                    <div className="flex-shrink-0">
                                        <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center text-xl font-black", isTarget ? "bg-indigo-600 text-white" : isCurrent ? "bg-slate-200 text-slate-500" : "bg-slate-100 text-slate-400")}>{lvl.level}</div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className={clsx("text-lg font-bold", isTarget ? "text-slate-900" : "text-slate-700")}>{lvl.title}</h4>
                                            {isCurrent && <span className="bg-slate-200 text-slate-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-slate-300 flex items-center gap-1"><Info size={10} /> Current State</span>}
                                            {isTarget && <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-indigo-200 flex items-center gap-1"><Target size={10} /> Target</span>}
                                            {isRecommended && !isCurrent && !isTarget && <span className="bg-amber-100 text-amber-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1"><Zap size={10} /> Recommended</span>}
                                        </div>
                                        <p className="text-sm text-slate-500 italic mb-4">"{lvl.subtitle}"</p>
                                        <div className={clsx("grid md:grid-cols-2 gap-8 text-sm", isTarget ? "opacity-100" : "opacity-80")}>
                                            <div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1"><Zap size={12} /> Characteristics</div>
                                                <ul className="space-y-1.5">{lvl.characteristics.slice(0,3).map((c, i) => (<li key={i} className="flex items-start gap-2 text-slate-600 text-xs"><span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 shrink-0"></span><span className="leading-snug">{c}</span></li>))}</ul>
                                            </div>
                                            {isTarget && (
                                                <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-50">
                                                    <div className="text-[10px] font-bold text-indigo-800 uppercase tracking-widest mb-2 flex items-center gap-1"><CheckCircle2 size={12} /> Strategic Gains</div>
                                                    <ul className="space-y-1.5">
                                                        <li className="flex items-start gap-2 text-slate-700 text-xs"><CheckCircle2 size={12} className="text-indigo-500 mt-0.5 shrink-0" /><span>Enterprise architecture</span></li>
                                                        <li className="flex items-start gap-2 text-slate-700 text-xs"><CheckCircle2 size={12} className="text-indigo-500 mt-0.5 shrink-0" /><span>Data-driven decisions</span></li>
                                                        <li className="flex items-start gap-2 text-slate-700 text-xs"><CheckCircle2 size={12} className="text-indigo-500 mt-0.5 shrink-0" /><span>KPI monitoring</span></li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {isTarget && <div className="absolute top-6 right-6 text-indigo-600"><CheckCircle2 size={24} fill="currentColor" className="text-white" /></div>}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            {/* SIDEBAR: STRATEGIC VIABILITY */}
            <div className="lg:col-span-4">
                <div className="sticky top-12 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                         <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2"><TrendingUp size={14} className="text-indigo-600" /> Strategic Viability</h3>
                    </div>
                    <div className="p-6">
                        <div className="flex items-end justify-between mb-2">
                             <div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Velocity</div><div className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{levelsPerYear.toFixed(1)}</div></div>
                            <div className={clsx("px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide mb-1", riskProfile.bgColor, riskProfile.color)}>{riskProfile.label}</div>
                        </div>
                        <div className="text-xs font-medium text-slate-500 mb-6">Levels / Year</div>
                        <div className="relative h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-1/3 bg-emerald-400"></div>
                            <div className="absolute top-0 left-1/3 h-full w-1/3 bg-amber-400"></div>
                            <div className="absolute top-0 left-2/3 h-full w-1/3 bg-rose-400"></div>
                            <div className="absolute top-0 w-1 h-full bg-slate-900 z-10 transition-all duration-500" style={{ left: `${Math.min(percent, 100)}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase -mt-6 mb-8 px-0.5"><span>Conservative</span><span>Balanced</span><span>Aggressive</span></div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><DollarSign size={10} /> Cost Est.</div>
                                <div className="text-xs font-bold text-slate-900">{resourceEstimates.cost}</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                 <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Users size={10} /> Effort</div>
                                <div className="text-xs font-bold text-slate-900">{resourceEstimates.effort}</div>
                            </div>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div><div className="text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-1"><TrendingUp size={10} /> Analysis</div><p className="text-xs text-slate-500 leading-relaxed">{riskProfile.desc}</p></div>
                            <div><div className="text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-1"><Info size={10} /> Implication</div><p className="text-xs text-slate-500 leading-relaxed">{riskProfile.implication}</p></div>
                        </div>
                        {gap > 0 && (
                            <div className={clsx("mb-8 p-4 rounded-lg border text-xs leading-relaxed", isOutpacing ? "bg-amber-50 border-amber-100 text-amber-900" : "bg-indigo-50/50 border-indigo-100 text-indigo-900")}>
                                 <h4 className="font-bold uppercase tracking-wider mb-2 flex items-center gap-2 text-[10px]"><BarChart3 size={12} /> Industry Context</h4>
                                 <p className="mb-3">{benchmark.insight}</p>
                                 <div className="flex justify-between items-center border-t border-black/5 pt-2 mt-2"><span className="text-[10px] uppercase opacity-70 font-bold">Avg Peer Velocity</span><span className="font-bold">{benchmark.velocity} lvls/yr</span></div>
                            </div>
                        )}
                        <button onClick={onGenerate} disabled={state.isGenerating || !state.targetLevel || gap <= 0} className={clsx("w-full py-4 rounded-lg font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md", state.isGenerating || gap <= 0 ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-[#0B1240] text-white hover:bg-blue-900 hover:shadow-lg hover:-translate-y-0.5")}>
                            {state.isGenerating ? (<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>Generating...</>) : (<>Generate Roadmap <ArrowRight size={14}/></>)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-12 pt-6 border-t border-slate-200 md:hidden">
            <button onClick={onBack} className="text-slate-500 font-medium text-sm flex items-center gap-1"><ChevronRight size={16} className="rotate-180"/> Back to Priorities</button>
        </div>
    </div>
  );
};
