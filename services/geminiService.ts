import { GoogleGenAI, Type } from "@google/genai";
import type { Wisdom, SimulationResult, GenerationResult } from '../types';

const API_KEY = process.env.API_KEY;
const MOCK_API = !API_KEY;

const ai = MOCK_API ? null : new GoogleGenAI({ apiKey: API_KEY });

if (MOCK_API) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we will use a mock or show an alert.
  console.warn("API_KEY environment variable not set. Using mock data.");
}

export const distillWisdom = async (text: string): Promise<Wisdom> => {
    if (MOCK_API || !ai) {
        return new Promise(resolve => setTimeout(() => resolve({
            title: "Mocked Wisdom: The Essence of Your Text",
            summary: "This is a mocked summary because the API key is not configured. The AI would normally provide a concise overview of the provided text here.",
            keyPoints: ["Mocked point 1: Key ideas would be extracted.", "Mocked point 2: The most important concepts highlighted.", "Mocked point 3: Structured for easy comprehension."],
            actionItems: ["Mocked Action: Define API_KEY to enable real AI.", "Mocked Action: Explore the other features."]
        }), 1500));
    }
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following text and distill its wisdom. Provide a concise title, a summary, key points, and actionable items. Text: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            actionItems: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as Wisdom;
  } catch (error) {
    console.error("Error distilling wisdom:", error);
    throw new Error("Failed to distill wisdom from the text.");
  }
};

export const generateComponent = async (goal: string): Promise<GenerationResult> => {
    if (MOCK_API || !ai) {
        return new Promise(resolve => setTimeout(() => resolve({
            code: `import React from 'react';

// Mocked Component Generation
const MockedComponent = () => {
    return (
        <div className="p-4 border border-dashed border-matrix-cyan text-center">
            <h2 className="text-lg text-matrix-cyan">Mocked Component</h2>
            <p>This is a mock response because the API key is not set.</p>
            <p><strong>Goal:</strong> ${goal}</p>
        </div>
    );
};

export default MockedComponent;`,
            explanation: "這是一個模擬組件，因為 API 金鑰未設定。它旨在展示 AI 將如何根據您的目標生成一個功能齊全的 React 組件。",
            usage: "將此組件導入到您的應用程式中，並在 JSX 中渲染它，例如 `<MockedComponent />`。",
            previewHtml: `<div style="padding: 1rem; border: 1px dashed #00FFFF; text-align: center; color: #a3b3c3; font-family: sans-serif;">
                <h2 style="font-size: 1.125rem; color: #00FFFF;">Mocked Component</h2>
                <p>This is a mock response because the API key is not set.</p>
                <p><strong>Goal:</strong> ${goal}</p>
            </div>`,
            cot_analysis: "This is a mock Chain-of-Thought analysis. In a real scenario, this text would explicitly detail how the generated component adheres to the project's architectural and design system constraints, referencing specific rules like color usage ('matrix-cyan') and principles like Single Responsibility."
        }), 2000));
    }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an elite software engineer following a strict Chain-of-Thought (CoT) methodology. Your task is to generate a single, self-contained React functional component based on a user goal, while adhering to pre-defined project constraints.

**SECTION 2: ARCHITECTURAL PRINCIPLES (Constraint)**
- Principle: SOLID - Components must have a Single Responsibility.
- Principle: DRY - Avoid code repetition.
- Tech Stack: React with Tailwind CSS.

**SECTION 3: DESIGN SYSTEM (Constraint)**
- Colors:
    - Primary Interactive: 'matrix-cyan' (e.g., buttons, links, rings).
    - Primary Text: 'matrix-light'.
    - Background: 'matrix-bg' or 'matrix-bg-2'.
    - Borders: 'matrix-dark/50'.
- Typography: Use 'font-sans'.
- Accessibility: All interactive elements must have clear focus states (e.g., 'focus:ring-2 focus:ring-matrix-cyan').

**CURRENT TASK: Generate a Component**
- User Goal: "${goal}"

**INSTRUCTIONS:**
1. Generate the React component code that fulfills the User Goal.
2. The component MUST strictly adhere to all constraints from Section 2 and 3.
3. Provide a brief explanation of the component's function.
4. Provide a usage guide.
5. Provide a simple, safe, single block of HTML for preview.
6. **Crucially, provide a Chain-of-Thought analysis explaining HOW your generated code adheres to the specific constraints. Explicitly reference the principles and design system rules.** (e.g., "The component is focused solely on displaying time, adhering to the Single Responsibility Principle. The button uses 'bg-matrix-cyan' as per the Design System's Primary Interactive color rule.")
`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            code: { type: Type.STRING, description: "The complete React component code as a single string." },
            explanation: { type: Type.STRING, description: "A brief explanation of the component's function." },
            usage: { type: Type.STRING, description: "A brief guide on how to use the component (e.g., import and render)." },
            previewHtml: { type: Type.STRING, description: "A safe, single block of HTML code (using inline styles) that previews the component's appearance."},
            cot_analysis: { type: Type.STRING, description: "The Chain-of-Thought analysis explaining how the generated code adheres to the provided constraints."}
          },
        },
      },
    });
    
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    // Clean up markdown code block fences if they exist in the code part
    result.code = result.code
      .trim()
      .replace(/^```(?:\w+\n)?/, '')
      .replace(/```$/, '');

    return result;

  } catch (error) {
    console.error("Error generating component:", error);
    throw new Error("Failed to generate the component.");
  }
};


export const generateTags = async (title: string, content: string): Promise<string[]> => {
    if (MOCK_API || !ai) {
        return new Promise(resolve => setTimeout(() => resolve(['mock-tag', 'ai-generated', 'test']), 1000));
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze the following note title and content, and generate 3 to 5 relevant tags or keywords. Title: "${title}". Content: "${content}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tags: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "A list of 3 to 5 relevant tags for the note."
                        }
                    }
                }
            }
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText) as { tags: string[] };
        return result.tags || [];

    } catch (error) {
        console.error("Error generating tags:", error);
        throw new Error("Failed to generate tags with AI.");
    }
};

export const simulateProposal = async (title: string, description: string): Promise<SimulationResult> => {
    if (MOCK_API || !ai) {
        return new Promise(resolve => setTimeout(() => resolve({
            concept: "This is a mocked simulation concept. The Oracle would typically expand on the proposal, exploring potential user flows and technical architecture.",
            benefits: ["Mocked Benefit 1: Enhanced user engagement.", "Mocked Benefit 2: Streamlined workflow.", "Mocked Benefit 3: Provides a clear path for future development."],
            challenges: ["Mocked Challenge 1: Potential for high API costs.", "Mocked Challenge 2: Requires significant frontend and backend development effort."],
            conclusion: "This is a mock conclusion. In a real simulation, the Oracle would synthesize the points above and provide a final recommendation on the proposal's feasibility and strategic value."
        }), 2500));
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `As the Oracle of the Terminus Matrix, analyze the following user-submitted proposal for the JunAiKey system. Expand on the idea by providing a concise implementation concept, list its key benefits and potential challenges, and offer a concluding thought. The tone should be knowledgeable and slightly enigmatic.
Proposal Title: "${title}"
Proposal Description: "${description}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        concept: { type: Type.STRING, description: "A high-level overview of how this feature could be implemented or what it would look like." },
                        benefits: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of key positive outcomes or advantages of implementing this proposal." },
                        challenges: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of potential difficulties, risks, or complexities to consider." },
                        conclusion: { type: Type.STRING, description: "A final, synthesizing thought on the proposal's value or place within the system." }
                    }
                }
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as SimulationResult;

    } catch (error) {
        console.error("Error simulating proposal:", error);
        throw new Error("The Oracle's vision is clouded. Failed to simulate the proposal.");
    }
};