
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AssessmentState } from "../types";
import { IndustryConfig } from "../constants";

// Lazy initialization - only create client when needed
let genAI: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!genAI) {
    const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;
    if (!apiKey) {
      throw new Error("API_KEY is not set. Please set the API_KEY environment variable.");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

const reportSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    executiveSummary: {
      type: Type.STRING,
      description: "A professional, executive-level summary of the current data maturity state and the imperative for change. Tone: Authoritative, Insightful."
    },
    keyTrends: {
      type: Type.ARRAY,
      description: "3 Major industry trends that make this transformation urgent (e.g., 'Executive pressure for automation', 'Shift to AI-driven leadership').",
      items: {
        type: Type.OBJECT,
        properties: {
          trend: { type: Type.STRING },
          impact: { type: Type.STRING }
        },
        required: ["trend", "impact"]
      }
    },
    topChallenges: {
      type: Type.ARRAY,
      description: "3 Top barriers preventing the client from reaching the target state based on their current level.",
      items: {
        type: Type.OBJECT,
        properties: {
          challenge: { type: Type.STRING },
          description: { type: Type.STRING },
          severity: { type: Type.INTEGER, description: "A number between 60 and 95 indicating severity percentage" }
        },
        required: ["challenge", "description", "severity"]
      }
    },
    strategicActions: {
      type: Type.ARRAY,
      description: "3-4 High-level strategic initiatives. Not just tasks, but shifts in approach (e.g., 'Shift from human-centric to AI-driven').",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["People", "Process", "Technology", "Strategy"] },
          keySteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3-4 tactical bullet points on how to execute this action."
          },
          relatedAreaIds: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["title", "description", "type", "keySteps"]
      }
    },
    roadmap: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phaseName: { type: Type.STRING },
          duration: { type: Type.STRING },
          focus: { type: Type.STRING },
          keyDeliverables: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          relatedAreaIds: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["phaseName", "duration", "focus", "keyDeliverables"]
      }
    },
    riskAssessment: {
      type: Type.OBJECT,
      properties: {
        probability: { type: Type.STRING },
        riskFactors: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: ["probability", "riskFactors"]
    },
    responsibleAI: {
      type: Type.OBJECT,
      description: "An assessment of ethical considerations and potential biases related to the recommended AI/Data initiatives.",
      properties: {
        potentialBiases: {
          type: Type.ARRAY,
          description: "List of specific bias risks inherent to the industry or recommended models (e.g., 'Historical data bias in hiring algorithms').",
          items: { type: Type.STRING }
        },
        mitigationStrategies: {
          type: Type.ARRAY,
          description: "List of concrete mitigation steps (e.g., 'Human-in-the-loop validation', 'Diverse training data').",
          items: { type: Type.STRING }
        }
      },
      required: ["potentialBiases", "mitigationStrategies"]
    }
  },
  required: ["executiveSummary", "keyTrends", "topChallenges", "strategicActions", "roadmap", "riskAssessment", "responsibleAI"]
};

export async function generateConsultantReport(state: AssessmentState, config: IndustryConfig) {
  const model = "gemini-2.5-flash";
  
  // Prepare context
  const currentLvlInfo = config.levels.find(l => l.level === state.currentLevel);
  const targetLvlInfo = config.levels.find(l => l.level === state.targetLevel);
  
  const areaContext = Object.entries(state.priorities)
    .map(([id, score]) => {
      const area = config.areas.find(a => a.id === id);
      return `ID: "${id}", Title: "${area?.title}", Rating: ${score}/5, Required Level: ${area?.requiredLevel}`;
    })
    .join("\n    ");

  const prompt = `
    You are a Senior Partner at a top-tier consulting firm (like Gartner or McKinsey) specializing in Data & AI Strategy for the ${state.industry} industry.
    
    Client Profile:
    - Current Maturity: Level ${state.currentLevel} (${currentLvlInfo?.title}) - ${currentLvlInfo?.subtitle}
    - Target Maturity: Level ${state.targetLevel} (${targetLvlInfo?.title})
    - Timeline: ${state.timelineMonths} months
    
    Focus Areas Rated by Client (1-5 scale):
    ${areaContext}

    Task:
    Generate a "Strategic Leadership Vision" report in JSON.
    
    Guidelines for Tone & Content:
    1. **Professional & Authoritative:** Use language like "Imperative," "Orchestrate," "Catalyze," "Silos," "End-to-End."
    2. **Insight-Led:** The "Key Trends" should explain *why* the industry is changing (e.g., "AI is moving from novelty to necessity").
    3. **Action-Oriented:** The "Strategic Actions" must be transformative shifts (e.g., "Bridge the gap between strategy and ops").
    4. **Data-Linked:** Ensure recommendations link back to the specific 'relatedAreaIds' provided.
    5. **Realistic Roadmap:** Break the ${state.timelineMonths} months into logical phases (Foundation -> Scale -> Innovation).
    6. **Ethical & Responsible:** Explicitly analyze the recommended actions for potential AI biases or ethical risks (e.g. data privacy, algorithmic fairness) and propose specific mitigation strategies.

    Output strictly valid JSON matching the schema.
  `;

  try {
    const response = await getGenAI().models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: reportSchema,
        temperature: 0.3, // Lower temperature for more consistent, professional output
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("No response generated");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
