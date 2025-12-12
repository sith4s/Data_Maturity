
import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { Logo } from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  currentStep: number;
  onStepClick: (step: number) => void;
  onLogoClick: () => void;
  canAccessResults?: boolean;
}

const STEPS = [
  { id: 0, label: 'Welcome' },
  { id: 1, label: 'Current State' },
  { id: 2, label: 'Priorities' },
  { id: 3, label: 'Target State' },
  { id: 4, label: 'Results' },
  { id: 5, label: 'MindShore Support' },
] as const;

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentStep,
  onStepClick,
  onLogoClick,
  canAccessResults = false,
}) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* SIDEBAR – Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-[#0B1240] text-white flex-shrink-0 shadow-xl">
        <div
          className="h-20 flex items-center px-6 border-b border-white/10 cursor-pointer group"
          onClick={onLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onLogoClick()}
        >
          <Logo className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
          <div className="ml-3">
            <span className="block text-lg font-extrabold tracking-tight text-white">MindShore</span>
            <span className="block text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-0.5">Assessment</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-8 px-4" aria-label="Assessment steps">
          {STEPS.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            // Allow navigation if report is generated OR if the step is previous/current
            const isClickable = canAccessResults ? true : step.id <= currentStep;

            return (
              <button
                key={step.id}
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
                aria-current={isActive ? 'step' : undefined}
                className={clsx(
                  "w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left text-sm font-medium transition-all duration-200 group relative",
                  isActive && "bg-blue-600 text-white shadow-lg ring-2 ring-blue-400/30",
                  isCompleted && "text-blue-100 hover:bg-white/10",
                  !isClickable && "text-slate-500 opacity-60 cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0",
                    isActive && "bg-white text-blue-600 border-white",
                    isCompleted && "bg-teal-500 border-teal-500 text-white",
                    !isActive && !isCompleted && "border-slate-600 text-slate-500"
                  )}>
                    {isCompleted ? <Check size={16} strokeWidth={3} /> : step.id + 1}
                  </div>
                  <span className={isActive ? "font-bold" : "font-medium"}>{step.label}</span>
                </div>

                {isClickable && !isActive && (
                  <ChevronRight size={18} className="text-white/50 group-hover:text-white transition-colors" />
                )}

                {index < STEPS.length - 1 && (
                  <div className={clsx(
                    "absolute left-6 top-12 w-px -translate-x-1/2 h-full -z-10",
                    currentStep > step.id ? "bg-teal-500/50" : "bg-slate-700"
                  )} />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} MindShore Innovation Hub</p>
        </div>
      </aside>

      {/* MAIN CONTENT + MOBILE HEADER */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onLogoClick} role="button" tabIndex={0}
               onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onLogoClick()}>
            <Logo className="w-7 h-7" />
            <span className="font-bold text-[#0B1240] text-lg">MindShore</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Step {currentStep + 1} / {STEPS.length}</div>
              <div className="text-xs font-bold text-slate-900">{STEPS[currentStep].label}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full rounded-full border-4 border-blue-100 border-t-blue-600 transition-transform duration-700 ease-out"
                   style={{ transform: `rotate(${(currentStep / (STEPS.length - 1)) * 360}deg)` }} />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth bg-slate-50">
          <div className="max-w-7xl mx-auto min-h-full flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
