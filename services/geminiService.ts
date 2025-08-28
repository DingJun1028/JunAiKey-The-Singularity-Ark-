
import { GoogleGenAI, Type } from "@google/genai";
import type { Wisdom } from '../types';

if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we will use a mock or show an alert.
  console.warn("API_KEY environment variable not set. Using mock data.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const MOCK_API = !process.env.API_KEY;

export const distillWisdom = async (text: string): Promise<Wisdom> => {
    if (MOCK_API) {
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

export const evolveCode = async (code: string, goal: string): Promise<string> => {
    if (MOCK_API) {
        return new Promise(resolve => setTimeout(() => resolve(
`// Mocked code evolution. API_KEY is not set.
// Goal: ${goal}

${code.replace(/<p>/g, '<p className="text-lg">')}
`), 2000));
    }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following goal, rewrite the entire code block provided. Do not add any explanation, just output the raw, complete, rewritten code. Goal: "${goal}". Code: \`\`\`\n${code}\n\`\`\``,
      config: {
        systemInstruction: "You are an expert software engineer. Your task is to rewrite code to meet a specific goal. You only output code, nothing else.",
      }
    });
    
    // Clean up markdown code block fences if they exist
    const evolved = response.text
      .trim()
      .replace(/^```(?:\w+\n)?/, '')
      .replace(/```$/, '');

    return evolved;

  } catch (error) {
    console.error("Error evolving code:", error);
    throw new Error("Failed to evolve the code.");
  }
};
