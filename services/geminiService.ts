
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

export const generateComponent = async (goal: string): Promise<{ code: string; explanation: string; usage: string; previewHtml: string; }> => {
    if (MOCK_API) {
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
            </div>`
        }), 2000));
    }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following goal, create a single, self-contained React functional component. The component should use Tailwind CSS for styling consistent with the JunAiKey theme (dark, cyberpunk, matrix-green, matrix-cyan). Also provide a brief explanation of what the code does, how to use it, and a simple, safe, single block of HTML code that visually represents the component's output for a preview.

Goal: "${goal}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            code: { type: Type.STRING, description: "The complete React component code as a single string." },
            explanation: { type: Type.STRING, description: "A brief explanation of the component's function." },
            usage: { type: Type.STRING, description: "A brief guide on how to use the component (e.g., import and render)." },
            previewHtml: { type: Type.STRING, description: "A safe, single block of HTML code (using inline styles) that previews the component's appearance."}
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
    if (MOCK_API) {
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