
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { StepIntro } from './components/StepIntro';
import { StepCurrentState } from './components/StepCurrentState';
import { StepPriorities } from './components/StepPriorities';
import { StepTarget } from './components/StepTarget';
import { StepResults } from './components/StepResults';
import { StepMindShore } from './components/StepMindShore';
import { generateConsultantReport } from './services/geminiService';
import { AssessmentState, MaturityLevel } from './types';
import { getAssessmentConfig, IndustryConfig } from './constants';

const INITIAL_STATE: AssessmentState = {
  industry: 'mining',
  step: 0,
  currentLevel: null,
  dimensionScores: {},
  targetLevel: null,
  timelineMonths: 24,
  priorities: {} as Record<string, number>,
  isGenerating: false,
  report: null
};

export default function App() {
  const [state, setState] = useState<AssessmentState>(INITIAL_STATE);
  const [config, setConfig] = useState<IndustryConfig>(getAssessmentConfig('mining'));

  const handleStart = (industry: string) => {
    const newConfig = getAssessmentConfig(industry);
    setConfig(newConfig);
    setState(prev => ({ ...prev, industry, step: 1 }));
  };

  const handleLevelSelect = (level: MaturityLevel) => {
    setState(prev => ({ ...prev, currentLevel: level }));
  };

  const handlePriorityRate = (id: string, value: number) => {
    setState(prev => ({
      ...prev,
      priorities: { ...prev.priorities, [id]: value }
    }));
  };

  const handleTargetSelect = (level: MaturityLevel) => {
    setState(prev => ({ ...prev, targetLevel: level }));
  };

  const handleTimelineSelect = (months: number) => {
    setState(prev => ({ ...prev, timelineMonths: months }));
  };

  const handleGenerateReport = async (onSuccess?: () => void) => {
    setState(prev => ({ ...prev, isGenerating: true }));
    try {
      const report = await generateConsultantReport(state, config);
      setState(prev => ({ ...prev, report, isGenerating: false }));
      onSuccess?.();
    } catch (error) {
      console.error("Failed to generate report", error);
      alert("Something went wrong generating the AI report. Please check your API key.");
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const nextStep = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setState(prev => ({ ...prev, step: prev.step - 1 }));

  const restart = () => {
    setState(INITIAL_STATE);
    setConfig(getAssessmentConfig(INITIAL_STATE.industry));
  };

  // KLUCZOWA ZMIANA – teraz wszystkie kroki oprócz 5 są zawsze dostępne przez sidebar
  const handleStepClick = (stepId: number) => {
    if (stepId === 5) {
      if (state.report !== null) {
        setState(prev => ({ ...prev, step: stepId }));
      }
      // opcjonalnie: else alert("Generate the report first!");
    } else {
      // wszystkie zera–czwórki dostępne od razu
      setState(prev => ({ ...prev, step: stepId }));
    }
  };

  const handleLogoClick = () => {
    if (state.step > 0) {
      if (window.confirm("Return to Start? This will reset your current assessment progress.")) {
        restart();
      }
    }
  };

  return (
    <Layout
      currentStep={state.step}
      onStepClick={handleStepClick}
      onLogoClick={handleLogoClick}
      canAccessResults={state.report !== null}   // tylko do odblokowania kroku 5
    >
      {state.step === 0 && <StepIntro onStart={handleStart} />}

      {state.step === 1 && (
        <StepCurrentState
          levels={config.levels}
          currentLevel={state.currentLevel}
          industry={state.industry}
          onSelect={handleLevelSelect}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {state.step === 2 && (
        <StepPriorities
          areas={config.areas}
          priorities={state.priorities}
          onRate={handlePriorityRate}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {state.step === 3 && (
        <StepTarget
          state={state}
          levels={config.levels}
          onSetTarget={handleTargetSelect}
          onSetTimeline={handleTimelineSelect}
          onGenerate={() => handleGenerateReport(() => nextStep())}
          onBack={prevStep}
        />
      )}

      {state.step === 4 && (
        <StepResults
          state={state}
          areas={config.areas}
          onRestart={restart}
          onBack={prevStep}
          onNext={nextStep}
        />
      )}

      {state.step === 5 && (
        <StepMindShore onBack={prevStep} onRestart={restart} />
      )}
    </Layout>
  );
}
