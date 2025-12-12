
import React, { useState, useRef } from 'react';
import { AssessmentState, AssessmentArea, AIReport } from '../types';
import clsx from 'clsx';
import { 
  Download, RefreshCw, ChevronLeft, ArrowRight,
  Target, AlertTriangle, TrendingUp, Shield, Layers,
  Calendar, CheckCircle2, User, Zap
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface StepResultsProps {
  state: AssessmentState;
  areas: AssessmentArea[];
  onRestart: () => void;
  onBack: () => void;
  onNext: () => void;
}

export const StepResults: React.FC<StepResultsProps> = ({
  state,
  areas,
  onRestart,
  onBack,
  onNext
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'important_critical' | 'critical'>('all');
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const report = state.report;
  if (!report) return null;

  // Helper to determine priority based on related areas
  // Returns the highest priority found among the related areas
  const getEntityPriority = (relatedIds: string[] | undefined): number => {
    if (!relatedIds || !relatedIds.length) return 0;
    // Map related area IDs to their priority score from state
    return Math.max(...relatedIds.map(id => state.priorities[id] || 0));
  };

  // Filter Strategic Actions
  const filteredActions = report.strategicActions.filter(action => {
    const priority = getEntityPriority(action.relatedAreaIds);
    if (activeFilter === 'critical') return priority === 5;
    if (activeFilter === 'important_critical') return priority >= 3;
    return true;
  });

  // Filter Roadmap Phases
  // A phase is kept if it relates to AT LEAST ONE area that meets the priority criteria.
  // If a phase has no related areas defined, it's considered "general" and kept unless in strict mode, 
  // but usually AI generates relatedAreaIds. Let's assume if no IDs, it's low priority.
  const filteredRoadmap = report.roadmap.filter(phase => {
    if (activeFilter === 'all') return true;
    
    const priority = getEntityPriority(phase.relatedAreaIds);
    
    // If phase has no related areas, we treat it as priority 0.
    // However, if the user explicitly wants "Critical" things, we should probably hide generic/unmapped items
    // to focus their attention.
    
    if (activeFilter === 'critical') return priority === 5;
    if (activeFilter === 'important_critical') return priority >= 3;
    return true;
  });

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    
    try {
      // Small delay to ensure UI updates before capture
      await new Promise(resolve => setTimeout(resolve, 100));
      // Scroll to top to ensure consistency
      window.scrollTo(0, 0);

      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff' // Ensure background is white
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calculate ratio to fit the width of A4
      const ratio = pdfWidth / imgWidth;
      const canvasPdfHeight = imgHeight * ratio;
      
      let heightLeft = canvasPdfHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasPdfHeight);
      heightLeft -= pdfHeight;

      // Add subsequent pages if content overflows
      while (heightLeft > 0) {
        position = heightLeft - canvasPdfHeight; // This logic shifts the image up for the next page
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasPdfHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`MindShore-Strategy-Report-${new Date().toISOString().split('T')[0]}.pdf`);

    } catch (err) {
      console.error("PDF Export failed", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* TOOLBAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
           <div className="flex items-center gap-2 text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-1">
             <span className="bg-teal-50 px-2 py-0.5 rounded border border-teal-100">Phase 4 of 4</span>
             <span>Report & Recommendations</span>
           </div>
           <h1 className="text-3xl font-extrabold text-slate-900">Strategic Roadmap</h1>
        </div>

        <div className="flex gap-3" data-html2canvas-ignore="true">
           <button 
             onClick={handleExportPDF} 
             disabled={isExporting}
             className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
           >
             {isExporting ? <span className="animate-pulse">Generating...</span> : <><Download size={16}/> Download PDF</>}
           </button>
           <button 
             onClick={onNext}
             className="flex items-center gap-2 px-5 py-2 bg-[#0B1240] text-white rounded-lg text-sm font-bold hover:bg-blue-900 transition-colors shadow-lg shadow-blue-900/20"
           >
             Next Steps <ArrowRight size={16}/>
           </button>
        </div>
      </div>

      {/* REPORT CONTAINER */}
      <div ref={reportRef} className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* EXECUTIVE SUMMARY */}
        <div className="bg-[#0B1240] text-white p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
          
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 relative z-10">
            <Target className="text-teal-400"/> Executive Summary
          </h2>
          <div className="prose prose-invert max-w-none text-blue-50 leading-relaxed relative z-10">
             <p className="text-lg whitespace-pre-line">{report.executiveSummary}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10 relative z-10">
            {report.keyTrends.map((trend, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <div className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                   <TrendingUp size={12} /> Trend {i+1}
                </div>
                <div className="font-bold text-white mb-1">{trend.trend}</div>
                <div className="text-xs text-blue-200">{trend.impact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CHALLENGES & RISKS */}
        <div className="p-8 md:p-12 bg-slate-50 border-b border-slate-200">
           <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <AlertTriangle className="text-amber-500" size={18}/> Top Challenges
                </h3>
                <div className="space-y-4">
                  {report.topChallenges.map((challenge, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                       <div className="flex justify-between items-start mb-2">
                         <span className="font-bold text-slate-800">{challenge.challenge}</span>
                         <span className={clsx("text-xs font-bold px-2 py-0.5 rounded", challenge.severity > 80 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700")}>
                           sev: {challenge.severity}%
                         </span>
                       </div>
                       <p className="text-xs text-slate-500">{challenge.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Shield className="text-indigo-500" size={18}/> Risk Assessment
                </h3>
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm h-full">
                   <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-500">Overall Risk Probability</span>
                      <span className="text-lg font-bold text-slate-900">{report.riskAssessment.probability}</span>
                   </div>
                   <ul className="space-y-3">
                     {report.riskAssessment.riskFactors.map((risk, i) => (
                       <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                         <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0"></span>
                         {risk}
                       </li>
                     ))}
                   </ul>

                   <div className="mt-6 pt-6 border-t border-slate-100">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Responsible AI Considerations</div>
                      {report.responsibleAI.potentialBiases.slice(0, 2).map((bias, i) => (
                        <div key={i} className="text-xs text-slate-500 mb-2 flex gap-2">
                          <span className="text-indigo-500">•</span> {bias}
                        </div>
                      ))}
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* STRATEGIC ACTIONS */}
        <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
               <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="text-blue-600" size={24}/> Strategic Initiatives
                  </h3>
                  <p className="text-slate-500 mt-1">
                    Priority actions mapped to your maturity gaps.
                  </p>
               </div>
               
               {/* Filter Buttons */}
               <div className={clsx("flex flex-wrap gap-2", isExporting && "hidden")} data-html2canvas-ignore="true">
                    <button onClick={() => setActiveFilter('all')} className={clsx("px-3 py-1.5 rounded-full text-xs font-bold border transition-colors", activeFilter === 'all' ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50")}>All Actions</button>
                    <button onClick={() => setActiveFilter('important_critical')} className={clsx("px-3 py-1.5 rounded-full text-xs font-bold border transition-colors", activeFilter === 'important_critical' ? "bg-amber-600 text-white border-amber-600" : "bg-white text-slate-500 border-slate-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200")}>Important & Critical</button>
                    <button onClick={() => setActiveFilter('critical')} className={clsx("px-3 py-1.5 rounded-full text-xs font-bold border transition-colors", activeFilter === 'critical' ? "bg-red-600 text-white border-red-600" : "bg-white text-slate-500 border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200")}>Critical Only</button>
                </div>
            </div>

            <div className="grid gap-6">
               {filteredActions.length === 0 ? (
                 <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    No strategic initiatives match this priority level.
                 </div>
               ) : (
                 filteredActions.map((action, i) => {
                   const priority = getEntityPriority(action.relatedAreaIds);
                   return (
                     <div key={i} className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors shadow-sm group">
                        <div className="md:w-1/4 flex-shrink-0">
                           <div className="flex items-center gap-2 mb-2">
                             <span className={clsx(
                               "text-[10px] font-bold uppercase px-2 py-1 rounded",
                               priority === 5 ? "bg-red-100 text-red-700" : 
                               priority >= 3 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
                             )}>
                               Priority {priority > 0 ? priority : 'N/A'}
                             </span>
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{action.type}</span>
                           </div>
                           <h4 className="font-bold text-slate-900 leading-tight mb-2">{action.title}</h4>
                           <div className="text-xs text-slate-500">
                             {action.relatedAreaIds?.map(id => {
                               const area = areas.find(a => a.id === id);
                               return area ? <div key={id} className="truncate" title={area.title}>• {area.title}</div> : null;
                             })}
                           </div>
                        </div>

                        <div className="md:w-3/4 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 pt-4 md:pt-0">
                            <p className="text-sm text-slate-600 mb-4">{action.description}</p>
                            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                               {action.keySteps.map((step, idx) => (
                                 <div key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                                   <CheckCircle2 size={14} className="text-teal-500 mt-0.5 shrink-0"/>
                                   <span>{step}</span>
                                 </div>
                               ))}
                            </div>
                        </div>
                     </div>
                   );
                 })
               )}
            </div>
        </div>

        {/* ROADMAP */}
        <div className="bg-slate-900 text-slate-200 p-8 md:p-12 transition-all duration-300">
           <div className="flex justify-between items-center mb-8">
             <h3 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-widest">
               <Calendar className="text-blue-400"/> Implementation Roadmap
             </h3>
             {activeFilter !== 'all' && (
                <span className="text-xs font-medium bg-white/10 px-3 py-1 rounded-full text-slate-300 border border-white/10">
                  Filtered by: {activeFilter === 'critical' ? 'Critical Only' : 'Important & Critical'}
                </span>
             )}
           </div>
           
           <div className="relative border-l-2 border-slate-700 ml-4 md:ml-6 space-y-12">
              {filteredRoadmap.length === 0 ? (
                 <div className="pl-8 md:pl-12 py-4">
                    <div className="p-4 rounded-lg border border-white/10 bg-white/5 text-slate-400 text-sm italic">
                       No roadmap phases specifically target the selected priority areas. Try switching to "All Actions" to see the full timeline.
                    </div>
                 </div>
              ) : (
                filteredRoadmap.map((phase, i) => {
                  const priority = getEntityPriority(phase.relatedAreaIds);
                  return (
                    <div key={i} className="relative pl-8 md:pl-12 animate-in fade-in slide-in-from-left-2 duration-500">
                       <div className={clsx(
                         "absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-slate-900",
                         priority === 5 ? "bg-red-500" : priority >= 3 ? "bg-amber-500" : "bg-blue-500"
                       )}></div>
                       <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                          <h4 className="text-xl font-bold text-white">{phase.phaseName}</h4>
                          <span className="text-sm text-blue-400 font-mono">{phase.duration}</span>
                          {priority > 0 && (
                            <span className={clsx(
                              "text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ml-2",
                              priority === 5 ? "bg-red-900/50 text-red-200 border border-red-800" :
                              priority >= 3 ? "bg-amber-900/50 text-amber-200 border border-amber-800" :
                              "bg-slate-800 text-slate-400 border border-slate-700"
                            )}>
                              Priority {priority}
                            </span>
                          )}
                       </div>
                       <div className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wide">{phase.focus}</div>
                       
                       <div className="bg-white/5 rounded-lg p-4 border border-white/5 hover:bg-white/10 transition-colors">
                          <ul className="grid sm:grid-cols-2 gap-3">
                            {phase.keyDeliverables.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className={clsx(
                                  "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                                  priority === 5 ? "bg-red-400" : priority >= 3 ? "bg-amber-400" : "bg-blue-400"
                                )}></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                       </div>
                    </div>
                  );
                })
              )}
           </div>
        </div>

      </div>

      <div className="mt-8 flex justify-between items-center" data-html2canvas-ignore="true">
         <button onClick={onBack} className="text-slate-500 font-medium hover:text-slate-800 flex items-center gap-2 transition-colors">
            <ChevronLeft size={16}/> Back
         </button>
         
         <button onClick={onRestart} className="text-slate-400 hover:text-red-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors">
            <RefreshCw size={12}/> Reset Assessment
         </button>
      </div>

    </div>
  );
};
