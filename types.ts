
export type MaturityLevel = 1 | 2 | 3 | 4 | 5;

export interface LevelDescription {
  level: MaturityLevel;
  title: string;
  subtitle: string;
  characteristics: string[];
  symptoms: string[];
}

export interface AssessmentArea {
  id: string;
  category: string;
  title: string;
  description: string;
  requiredLevel: MaturityLevel; // The level required to do this well
}

export interface ScoringDimension {
  id: string;
  name: string;
  weight: number; // 0.0 to 1.0
  description: string;
}

export interface MaturityArchetype {
  minScore: number;
  maxScore: number;
  label: string;
  description: string;
  colorClass: string;
}

export interface AssessmentState {
  industry: string;
  step: number;
  currentLevel: MaturityLevel | null;
  // New: Store dimension scores
  dimensionScores: Record<string, number>; 
  targetLevel: MaturityLevel | null;
  timelineMonths: number;
  priorities: Record<string, number>; // Area ID -> Importance (1-5)
  isGenerating: boolean;
  report: AIReport | null;
}

// Updated to match Professional "Gartner-style" Report Structure
export interface AIReport {
  executiveSummary: string;
  
  // New: Macro Trends impacting the industry
  keyTrends: Array<{
    trend: string;
    impact: string;
    icon?: string; // 'automation', 'upstream', 'assistant' etc (handled in UI)
  }>;

  // New: Specific Challenges preventing progress
  topChallenges: Array<{
    challenge: string;
    description: string;
    severity: number; // 1-100 for visual gauge
  }>;

  // Renamed & Structured: "Strategic Actions" instead of just recommendations
  strategicActions: Array<{
    title: string;
    description: string;
    type: 'People' | 'Process' | 'Technology' | 'Strategy';
    keySteps: string[]; // Specific bullet points
    relatedAreaIds?: string[];
  }>;

  roadmap: Array<{
    phaseName: string;
    duration: string;
    focus: string;
    keyDeliverables: string[];
    relatedAreaIds?: string[]; 
  }>;
  
  riskAssessment: {
    probability: string;
    riskFactors: string[];
  };

  responsibleAI: {
    potentialBiases: string[];
    mitigationStrategies: string[];
  };
}

export const INDUSTRIES = [
  // Heavy Industry & Energy
  { id: 'energy', label: 'Energy & Utilities' },
  { id: 'mining', label: 'Mining & Metals' },
  { id: 'chemical', label: 'Chemical & Petrochemical' },
  { id: 'waste', label: 'Waste Mgmt & Enviro Services' },

  // Manufacturing & Engineering
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'automotive', label: 'Automotive & Mobility' },
  { id: 'defense', label: 'Defense & Aerospace' },
  { id: 'agri', label: 'Agriculture & Food Production' },

  // Logistics & Infrastructure
  { id: 'logistics', label: 'Transportation & Logistics' },
  { id: 'maritime', label: 'Maritime & Shipping' },
  { id: 'construction', label: 'Real Estate & Construction' },

  // Technology & Connectivity
  { id: 'tech', label: 'Technology & SaaS' },
  { id: 'telco', label: 'Telecommunications' },

  // Consumer & Media
  { id: 'retail', label: 'Retail' },
  { id: 'fmcg', label: 'Consumer Goods (FMCG)' },
  { id: 'hospitality', label: 'Hospitality & Tourism' },
  { id: 'media', label: 'Media & Entertainment' },

  // Financial & Professional Services
  { id: 'finance', label: 'Financial Services' },
  { id: 'insurance', label: 'Insurance' },
  { id: 'professional', label: 'Professional Services' },
  { id: 'legal', label: 'Legal Services' },

  // Health & Life Sciences
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'pharma', label: 'Pharma & Life Sciences' },

  // Public & Social Sector
  { id: 'government', label: 'Government & Public Sector' },
  { id: 'education', label: 'Education' },
  { id: 'nonprofit', label: 'Non-profit & NGOs' },
  
  { id: 'other', label: 'Other' }
];
