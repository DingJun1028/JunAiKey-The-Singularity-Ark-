import { GoogleGenAI, Type } from "@google/genai";
<<<<<<< HEAD
import type { Wisdom, SimulationResult, GenerationResult, ConnectionInsight, Note, Proposal } from '../types';
import { useApiKeyStore } from "../store/apiKeyStore";

const handleApiError = (error: unknown) => {
    console.error("Gemini API Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const lowerCaseError = errorMessage.toLowerCase();

    // Specific checks for API key-related issues
    const isApiKeyError =
        lowerCaseError.includes('api key not valid') ||
        lowerCaseError.includes('api key invalid') ||
        lowerCaseError.includes('permission denied') || // Often related to key issues
        lowerCaseError.includes('api_key') || // General catch-all
        lowerCaseError.includes('authentication failed');

    if (isApiKeyError) {
        // Update the global status to 'invalid'
        useApiKeyStore.getState().actions.setStatus('invalid');
        // Return a specific, user-friendly message for key errors
        return "您的 API 金鑰無效或已過期。請在設定中檢查並更新您的金鑰。(Your API key appears to be invalid or expired. Please check and update it in Settings.)";
    }

    // For all other errors, return a more general message.
    return "與 AI 模型通訊時發生錯誤。請檢查您的網路連線並稍後再試。(An error occurred communicating with the AI model. Please check your network connection and try again later.)";
};


export const distillWisdom = async (text: string): Promise<Wisdom> => {
    const apiKey = useApiKeyStore.getState().apiKey;
    if (!apiKey) {
=======
import type { Wisdom, SimulationResult, GenerationResult } from '../types';

// This function centralizes API client creation.
// It uses localStorage as the single source of truth for the API key,
// aligning with the global SettingsModal. This removes the dependency
// on process.env.API_KEY and ensures all features use the user-provided key.
const getAiClient = (): GoogleGenAI | null => {
    const apiKey = localStorage.getItem('junaikey-gemini-api-key');
    if (!apiKey) {
        return null; // Indicates that the API is not configured.
    }
    try {
        return new GoogleGenAI({ apiKey });
    } catch (e) {
        console.error("Failed to initialize GoogleGenAI client:", e);
        return null; // Treat as if no key is available
    }
};

export const distillWisdom = async (text: string): Promise<Wisdom> => {
    const ai = getAiClient();
    if (!ai) {
>>>>>>> feature-branch
        console.warn("Gemini API key not configured. Returning mock wisdom.");
        return new Promise(resolve => setTimeout(() => resolve({
            title: "Mocked Wisdom: The Essence of Your Text",
            summary: "This is a mocked summary because the API key is not configured. The AI would normally provide a concise overview of the provided text here.",
            keyPoints: ["Mocked point 1: Key ideas would be extracted.", "Mocked point 2: The most important concepts highlighted.", "Mocked point 3: Structured for easy comprehension."],
            actionItems: ["Mocked Action: Configure your API Key in Settings to enable real AI.", "Mocked Action: Explore the other features."]
        }), 1500));
    }
  
  try {
<<<<<<< HEAD
    const ai = new GoogleGenAI({ apiKey });
=======
>>>>>>> feature-branch
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
<<<<<<< HEAD
    throw new Error(handleApiError(error));
=======
    console.error("Error distilling wisdom:", error);
    throw new Error("API 金鑰驗證失敗或請求出錯。請在設定中檢查您的金鑰。(Failed to distill wisdom. Please check your API key in settings.)");
>>>>>>> feature-branch
  }
};

export const generateComponent = async (goal: string): Promise<GenerationResult> => {
<<<<<<< HEAD
    const apiKey = useApiKeyStore.getState().apiKey;
    if (!apiKey) {
=======
    const ai = getAiClient();
    if (!ai) {
>>>>>>> feature-branch
        console.warn("Gemini API key not configured. Returning mock component.");
        return new Promise(resolve => setTimeout(() => resolve({
            code: `import React from 'react';

// Mocked Component Generation
const MockedComponent = () => {
    return (
        <div className="p-4 border border-dashed border-matrix-cyan text-center">
            <h2 className="text-lg text-matrix-cyan">Mocked Component</h2>
            <p>This is a mock response. Configure your API key in Settings.</p>
            <p><strong>Goal:</strong> ${goal}</p>
        </div>
    );
};

export default MockedComponent;`,
            explanation: "這是一個模擬組件，因為 API 金鑰未設定。它旨在展示 AI 將如何根據您的目標生成一個功能齊全的 React 組件。",
            usage: "將此組件導入到您的應用程式中，並在 JSX 中渲染它，例如 `<MockedComponent />`。",
            previewHtml: `<div style="padding: 1rem; border: 1px dashed #00FFFF; text-align: center; color: #a3b3c3; font-family: sans-serif;">
                <h2 style="font-size: 1.125rem; color: #00FFFF;">Mocked Component</h2>
                <p>This is a mock response. Configure your API key in Settings.</p>
                <p><strong>Goal:</strong> ${goal}</p>
            </div>`,
            cot_analysis: `**1. Goal Deconstruction:** The user wants a simple, visual component to display a piece of information based on their goal: "${goal}". This implies a container with some text.

**2. Constraint Mapping & Justification:**
*   **Architectural (SOLID):** The component's sole responsibility is to display this mock data. It handles no logic or state changes, adhering to the Single Responsibility Principle.
*   **Design System (Colors):** The border color uses 'matrix-cyan' for primary interaction/highlighting. The text color is 'matrix-light' for readability, as specified.
*   **Design System (Accessibility):** Although not interactive, the color contrast between the text and background is sufficient.`
        }), 2000));
    }

  try {
<<<<<<< HEAD
    const ai = new GoogleGenAI({ apiKey });
=======
>>>>>>> feature-branch
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an elite software engineer who thinks step-by-step, following a strict Chain-of-Thought (CoT) methodology. Your task is to generate a single, self-contained React functional component based on a user goal, while rigorously adhering to the provided project constraints.

**SECTION 1: CORE CONSTRAINTS (Your Rules)**
1.  **Architectural Principles:**
    *   SOLID: Components must have a Single Responsibility.
    *   DRY: Avoid code repetition.
    *   Tech Stack: React with Tailwind CSS.
2.  **Design System:**
    *   Colors: Use theme variables: 'matrix-cyan' (interactive), 'matrix-light' (text), 'matrix-bg'/'matrix-bg-2' (backgrounds), 'matrix-dark/50' (borders).
    *   Typography: Use 'font-sans'.
    *   Accessibility: Interactive elements MUST have clear focus states ('focus:ring-2 focus:ring-matrix-cyan').

**SECTION 2: USER GOAL (The Task)**
*   **Goal:** "${goal}"

**SECTION 3: YOUR TASK (The Output)**
Generate a JSON object with the following fields: 'code', 'explanation', 'usage', 'previewHtml', and 'cot_analysis'.

<<<<<<< HEAD
**Output Field Specifics:**
*   **'code'**: Must be a complete, self-contained React component string using Tailwind CSS classes from the design system.
*   **'previewHtml'**: This is crucial. Generate a *single block of HTML* that visually represents the component. This HTML **MUST use inline styles** for all styling. Do NOT use Tailwind classes in this field. The purpose is for a simple preview without a CSS processor.
*   **'cot_analysis'**: A detailed, step-by-step justification formatted in Markdown.

=======
>>>>>>> feature-branch
**Crucially, for the 'cot_analysis' field, you MUST provide a detailed, step-by-step justification formatted in Markdown:**
1.  **Goal Deconstruction:** Briefly interpret the user's goal into functional requirements.
2.  **Constraint Mapping & Justification:** Explicitly connect your code choices to the constraints in SECTION 1. For each major choice (e.g., component structure, a specific CSS class), state WHICH constraint it satisfies and WHY.
    *   *Example: "To adhere to the Single Responsibility Principle, the component only handles rendering the clock face, no external data fetching."*
    *   *Example: "The main button uses 'bg-matrix-cyan' to follow the Design System's primary interactive color rule."*
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
<<<<<<< HEAD
    throw new Error(handleApiError(error));
=======
    console.error("Error generating component:", error);
    throw new Error("API 金鑰驗證失敗或請求出錯。請在設定中檢查您的金鑰。(Failed to generate component. Please check your API key in settings.)");
>>>>>>> feature-branch
  }
};

export const generateTags = async (title: string, content: string): Promise<string[]> => {
<<<<<<< HEAD
    const apiKey = useApiKeyStore.getState().apiKey;
    if (!apiKey) {
=======
    const ai = getAiClient();
    if (!ai) {
>>>>>>> feature-branch
        console.warn("Gemini API key not configured. Returning mock tags.");
        return new Promise(resolve => setTimeout(() => resolve(['mock-tag', 'ai-generated', 'test']), 1000));
    }

    try {
<<<<<<< HEAD
        const ai = new GoogleGenAI({ apiKey });
=======
>>>>>>> feature-branch
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
<<<<<<< HEAD
        throw new Error(handleApiError(error));
=======
        console.error("Error generating tags:", error);
        throw new Error("API 金鑰驗證失敗或請求出錯。請在設定中檢查您的金鑰。(Failed to generate tags. Please check your API key in settings.)");
>>>>>>> feature-branch
    }
};


export const simulateProposal = async (title: string, description: string): Promise<SimulationResult> => {
<<<<<<< HEAD
    const apiKey = useApiKeyStore.getState().apiKey;
    if (!apiKey) {
=======
    const ai = getAiClient();
    if (!ai) {
>>>>>>> feature-branch
        console.warn("Gemini API key not configured. Returning mock simulation.");
        return new Promise(resolve => setTimeout(() => resolve({
            concept: "This is a mocked simulation concept. The Oracle would typically expand on the proposal, exploring potential user flows and technical architecture.",
            benefits: ["Mocked Benefit 1: Enhanced user engagement.", "Mocked Benefit 2: Streamlined workflow.", "Mocked Benefit 3: Provides a clear path for future development."],
            challenges: ["Mocked Challenge 1: Potential for high API costs.", "Mocked Challenge 2: Requires significant frontend and backend development effort."],
            conclusion: "This is a mock conclusion. In a real simulation, the Oracle would synthesize the points above and provide a final recommendation on the proposal's feasibility and strategic value."
        }), 2500));
    }

    try {
<<<<<<< HEAD
        const ai = new GoogleGenAI({ apiKey });
=======
>>>>>>> feature-branch
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
<<<<<<< HEAD
         throw new Error(handleApiError(error));
=======
        console.error("Error simulating proposal:", error);
        throw new Error("神諭的視覺被蒙蔽了。模擬提案失敗。請在設定中檢查您的 API 金鑰。(The Oracle's vision is clouded. Failed to simulate. Please check your API key in settings.)");
>>>>>>> feature-branch
    }
};

export const analyzeDeckOrText = async (decklist: string): Promise<string> => {
<<<<<<< HEAD
    const apiKey = useApiKeyStore.getState().apiKey;
    if (!apiKey) return "AI 顧問離線。請在「設定」中提供您的 Gemini API 金鑰以啟動此功能。";
=======
    const ai = getAiClient();
    if (!ai) return "AI 顧問離線。請在「設定」中提供您的 Gemini API 金鑰以啟動此功能。";
>>>>>>> feature-branch
    
    const prompt = `您是一位《終始矩陣：編年史》的資深建築師與戰術大師。您的任務是分析玩家提交的「聖典」(牌組列表)。請根據十二色元素精靈的協同作用與遊戲核心機制，深入分析此聖典的優點、潛在弱點，並提出三張具體的「萬能符文」(卡牌) 更換建議以最大化其效能。為每項建議提供清晰的戰術理由。您的回答應以專業且符合世界觀的台灣正體中文提供。

聖典列表：
${decklist}`;

    try {
<<<<<<< HEAD
        const ai = new GoogleGenAI({ apiKey });
=======
>>>>>>> feature-branch
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
<<<<<<< HEAD
        return handleApiError(error);
=======
        console.error("Error analyzing deck:", error);
        return `與 AI 顧問的連接中斷。請檢查您的 API 金鑰或稍後再試。\n錯誤: ${error.message}`;
>>>>>>> feature-branch
    }
};

export const createDeck = async (): Promise<string> => {
<<<<<<< HEAD
    const apiKey = useApiKeyStore.getState().apiKey;
    if (!apiKey) return "AI 顧問離線。請在「設定」中提供您的 Gemini API 金鑰以啟動此功能。";
=======
    const ai = getAiClient();
    if (!ai) return "AI 顧問離線。請在「設定」中提供您的 Gemini API 金鑰以啟動此功能。";
>>>>>>> feature-branch
    
    const prompt = `您是一位富有創意的建築師，精通《終始矩陣：編年史》的聖典構築。請為我設計一副以「秩序 (Order)」與「成長 (Growth)」元素為核心的聖典 (牌組)。請提供主牌組的完整列表 (60張萬能符文)，並以符合世界觀的風格，簡要說明這副聖典的核心策略、玩法，以及其如何體現這兩種元素的哲學。您的回答應以專業且引人入勝的台灣正體中文提供。`;
    
    try {
<<<<<<< HEAD
        const ai = new GoogleGenAI({ apiKey });
=======
>>>>>>> feature-branch
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
<<<<<<< HEAD
        return handleApiError(error);
    }
};

export const analyzeConnections = async (notes: Note[], proposals: Proposal[]): Promise<ConnectionInsight[]> => {
    const apiKey = useApiKeyStore.getState().apiKey;
    if (!apiKey) {
        console.warn("Gemini API key not configured. Returning mock connections.");
        return new Promise(resolve => setTimeout(() => resolve([
            {
                item1Id: notes[0]?.id || '1',
                item1Type: 'note',
                item2Id: proposals[0]?.id || 'genesis-proposal-1',
                item2Type: 'proposal',
                reason: "This is a mock connection. The AI would normally analyze your data to find relationships. For example, it might link a note about system architecture to a proposal for a new feature. Please configure your API key to enable this."
            }
        ]), 1500));
    }

    const dataToSend = {
        notes: notes.map(({ id, title, content, tags }) => ({ id, title, content, tags })),
        proposals: proposals.map(({ id, title, description }) => ({ id, title, description })),
    };

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a system analyst AI for the JunAiKey system. Your task is to find hidden or interesting connections between the provided notes and proposals based on their content and tags. Analyze the following data: ${JSON.stringify(dataToSend)}. Identify up to 4 non-obvious, meaningful connections. For each connection, provide the IDs and types of the two items, and a brief, insightful reason for the connection.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        connections: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    item1Id: { type: Type.STRING },
                                    item1Type: { type: Type.STRING, enum: ["note", "proposal"] },
                                    item2Id: { type: Type.STRING },
                                    item2Type: { type: Type.STRING, enum: ["note", "proposal"] },
                                    reason: { type: Type.STRING, description: "A brief explanation of the connection." }
                                },
                            },
                        },
                    },
                },
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText) as { connections: ConnectionInsight[] };
        return result.connections || [];
    } catch (error) {
        throw new Error(handleApiError(error));
=======
        console.error("Error creating deck:", error);
        return `與 AI 顧問的連接中斷。請檢查您的 API 金鑰或稍後再試。\n錯誤: ${error.message}`;
>>>>>>> feature-branch
    }
};