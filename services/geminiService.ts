
import { GoogleGenAI, Type } from "@google/genai";
import type { Wisdom, SimulationResult, GenerationResult, ConnectionInsight, Note, Proposal } from '../types';
import { useApiKeyStore } from "../store/apiKeyStore";

// --- Heuristic Fallback Implementations ---

// FIX: Split the large stop words array into smaller, explicitly typed arrays before creating the Set.
// This helps prevent TypeScript compiler issues with very large array literals, which can lead to
// misleading type inference errors (e.g., inferring a variable as 'never').
const englishStopWords: string[] = [
    // English
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 
    's', 't', 'can', 'will', 'just', 'don', 'should', 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', 'couldn', 'didn', 'doesn', 'hadn', 'hasn', 'haven', 'isn', 'ma', 'mightn', 'mustn', 'needn', 'shan', 'shouldn', 'wasn', 'weren', 'won', 'wouldn', 'http', 'https', 'www',
];
const chineseStopWords: string[] = [
    // Chinese
    '的', '一', '了', '是', '我', '有', '和', '也', '在', '他', '她', '它', '們', '之', '這個', '那個', '這', '那', '就', '不', '都', '而', '及', '仍', '為', '於', '以', '因', '與', '並', '並且', '而且', '一個', '我們', '你們', '他們', '她們', '它們', '什麼', '哪個', '誰', '這些', '那些', '不是', '被', '沒有', '做', '不做', '如果', '或者', '因為', '由於', '當', '哪裡', '為什麼', '怎麼', '所有', '任何', '每個', '其他', '一些', '這樣', '只', '比', '太', '會', '能', '可以', '應該', '吧', '嗎', '呢', '啊', '哦', '哈',
];
const stopWords = new Set<string>([...englishStopWords, ...chineseStopWords]);

const getKeywords = (text: string, count = 5): string[] => {
    // FIX: Ensure `match` result is handled correctly. If `match` returns null, fallback to an empty array to prevent type errors.
    const words = text.toLowerCase().match(/[\u4e00-\u9fa5a-zA-Z0-9]+/g) || [];
    const wordCounts: { [key: string]: number } = {};
    words.forEach(word => {
        if (!stopWords.has(word) && word.length > 1) {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
    });
    return Object.entries(wordCounts).sort(([, a], [, b]) => b - a).slice(0, count).map(([word]) => word);
};

const heuristicDistillWisdom = (text: string): Wisdom => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    let title = lines[0]?.trim() || "Distilled Wisdom";
    if (title.split(' ').length > 15) {
        title = title.split(' ').slice(0, 15).join(' ') + '...';
    }
    const summary = text.trim().substring(0, 300).replace(/\s\S*$/, '...');
    const keyPoints = lines.filter(line => /^\s*[-*•]|\d+\.\s/.test(line.trim())).map(line => line.trim().replace(/^\s*[-*•]|\d+\.\s/, '').trim());
    const actionVerbs = ['create', 'update', 'implement', 'review', 'add', 'remove', 'refactor', 'complete', 'ensure', 'verify', '建立', '更新', '實作', '審查', '新增', '移除'];
    const actionItems = lines.filter(line => {
        const lowerLine = line.trim().toLowerCase();
        return lowerLine.startsWith('action item:') || lowerLine.startsWith('todo:') || lowerLine.startsWith('待辦') || actionVerbs.some(verb => lowerLine.startsWith(verb));
    }).map(line => line.trim().replace(/^(action item:|todo:|待辦事項:)/i, '').trim());

    return {
        title,
        summary,
        keyPoints: keyPoints.length > 0 ? keyPoints : ["自動化分析未能識別出具體的關鍵點。(Automated analysis did not identify specific key points.)"],
        actionItems: actionItems.length > 0 ? actionItems : ["自動化分析未能識別出具體的行動項目。(Automated analysis did not identify specific action items.)"]
    };
};

const heuristicGenerateTags = (title: string, content: string): string[] => {
    const combinedText = `${title} ${title} ${content}`; // Weight title more
    return getKeywords(combinedText, 5);
};

const heuristicSimulateProposal = (title: string, description: string): SimulationResult => ({
    concept: `The proposal "${title}" suggests a new feature or change. An initial implementation would likely involve creating new UI components and updating the relevant data stores, with a primary focus on ensuring seamless integration with the existing system architecture.`,
    benefits: ["Could improve user experience by addressing a specific need or workflow.", "May increase overall system efficiency or add a new, valuable capability.", "Provides a clear objective for a future development cycle, helping to prioritize tasks."],
    challenges: ["Requires dedicated development and testing time, potentially impacting other priorities.", "Needs careful design to align with existing UI/UX patterns and avoid feature creep.", "Potential for unforeseen edge cases or technical complexities that could extend the implementation timeline."],
    conclusion: `The proposal shows significant potential. A thorough technical specification, user story mapping, and a review of potential impacts on other system components would be the recommended next steps to fully evaluate its feasibility and value.`
});

const heuristicAnalyzeConnections = (notes: Note[], proposals: Proposal[]): ConnectionInsight[] => {
    const insights: ConnectionInsight[] = [];
    if (notes.length === 0 || proposals.length === 0) return [];
    
    const allItems = [
        ...notes.map(n => ({ id: n.id, type: 'note' as const, title: n.title, content: n.content, tags: n.tags || [] })),
        ...proposals.map(p => ({ id: p.id, type: 'proposal' as const, title: p.title, content: p.description, tags: [] as string[] }))
    ];
    const itemKeywords = allItems.map(item => ({...item, keywords: new Set([...getKeywords(`${item.title} ${item.content}`, 10), ...item.tags.map(t => t.toLowerCase())])}));

    const notesWithKeywords = itemKeywords.filter(item => item.type === 'note');
    const proposalsWithKeywords = itemKeywords.filter(item => item.type === 'proposal');

    for (const note of notesWithKeywords) {
        for (const proposal of proposalsWithKeywords) {
            if (insights.length >= 4) break;
            const intersection = new Set([...note.keywords].filter(k => proposal.keywords.has(k)));
            
            if (intersection.size > 1) { // Require at least 2 common keywords for a meaningful connection
                const commonKeywords = Array.from(intersection).slice(0, 3).join(', ');
                insights.push({
                    item1Id: note.id, item1Type: note.type,
                    item2Id: proposal.id, item2Type: proposal.type,
                    reason: `These items appear to share common themes related to "${commonKeywords}". This suggests the note might provide context or evidence for the proposal.`
                });
            }
        }
        if (insights.length >= 4) break;
    }
    return insights;
};

// --- API Service Implementation ---

const handleApiError = (error: unknown) => {
    console.error("Gemini API Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const lowerCaseError = errorMessage.toLowerCase();
    const isApiKeyError = lowerCaseError.includes('api key not valid') || lowerCaseError.includes('api key invalid') || lowerCaseError.includes('permission denied') || lowerCaseError.includes('api_key') || lowerCaseError.includes('authentication failed');

    if (isApiKeyError) {
        useApiKeyStore.getState().actions.setStatus('invalid');
        return "您的 API 金鑰無效或已過期。請在設定中檢查並更新您的金鑰。(Your API key appears to be invalid or expired. Please check and update it in Settings.)";
    }
    return "與 AI 模型通訊時發生錯誤。請檢查您的網路連線並稍後再試。(An error occurred communicating with the AI model. Please check your network connection and try again later.)";
};

export const distillWisdom = async (text: string): Promise<Wisdom> => {
    const apiKey = useApiKeyStore.getState().apiKey;
    if (!apiKey || useApiKeyStore.getState().status !== 'valid') {
        console.warn("Gemini API key not configured or invalid. Using heuristic distillation.");
        return Promise.resolve(heuristicDistillWisdom(text));
    }
  
  try {
    const ai = new GoogleGenAI({ apiKey });
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
    throw new Error(handleApiError(error));
  }
};

export const generateTags = async (title: string, content: string): Promise<string[]> => {
    const apiKey = useApiKeyStore.getState().apiKey;
    if (!apiKey || useApiKeyStore.getState().status !== 'valid') {
        console.warn("Gemini API key not configured or invalid. Using heuristic tag generation.");
        return Promise.resolve(heuristicGenerateTags(title, content));
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate 3 to 5 relevant, concise, lowercase tags for the following note. Use English or the original language of the text. Do not use generic tags like "note" or "idea". Note Title: "${title}". Content: "${content}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tags: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                }
            }
        });
        const jsonText = response.text.trim();
        const parsed = JSON.parse(jsonText);
        return parsed.tags || [];
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

export const simulateProposal = async (title: string, description: string): Promise<SimulationResult> => {
    const apiKey = useApiKeyStore.getState().apiKey;
    if (!apiKey || useApiKeyStore.getState().status !== 'valid') {
        console.warn("Gemini API key not configured or invalid. Using heuristic proposal simulation.");
        return Promise.resolve(heuristicSimulateProposal(title, description));
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Simulate the outcome of the following proposal. Provide a brief concept, 3 potential benefits, 3 potential challenges, and a final conclusion. Proposal Title: "${title}". Description: "${description}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        concept: { type: Type.STRING },
                        benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
                        challenges: { type: Type.ARRAY, items: { type: Type.STRING } },
                        conclusion: { type: Type.STRING },
                    }
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as SimulationResult;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

export const analyzeConnections = async (notes: Note[], proposals: Proposal[]): Promise<ConnectionInsight[]> => {
    const apiKey = useApiKeyStore.getState().apiKey;
    if (!apiKey || useApiKeyStore.getState().status !== 'valid') {
        console.warn("Gemini API key not configured or invalid. Using heuristic connection analysis.");
        return Promise.resolve(heuristicAnalyzeConnections(notes, proposals));
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const notesData = notes.map(n => ({ id: n.id, title: n.title, tags: n.tags }));
        const proposalsData = proposals.map(p => ({ id: p.id, title: p.title }));
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze the following lists of notes and proposals. Identify up to 4 of the most significant connections between a note and a proposal. For each connection, provide the IDs of the two items and a brief, insightful reason for their connection.
            Notes: ${JSON.stringify(notesData)}
            Proposals: ${JSON.stringify(proposalsData)}`,
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
                                    item1Type: { type: Type.STRING, enum: ['note', 'proposal'] },
                                    item2Id: { type: Type.STRING },
                                    item2Type: { type: Type.STRING, enum: ['note', 'proposal'] },
                                    reason: { type: Type.STRING },
                                }
                            }
                        }
                    }
                }
            }
        });
        const jsonText = response.text.trim();
        const parsed = JSON.parse(jsonText);
        return parsed.connections || [];
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};


export const generateComponent = async (goal: string): Promise<GenerationResult> => {
    const apiKey = useApiKeyStore.getState().apiKey;
    if (!apiKey) {
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
            usage: "將此程式碼複製並貼到您的專案中即可使用。無需安裝額外的依賴項。",
            previewHtml: `<div class="p-4 border border-dashed border-matrix-cyan text-center text-matrix-light"><h2 class="text-lg text-matrix-cyan">Mocked Component</h2><p>This is a mock response. Configure your API key in Settings.</p><p><strong>Goal:</strong> ${goal}</p></div>`,
            cot_analysis: "1.  **Analyze Goal**: User wants a mock component.\n2.  **Formulate Strategy**: Since the API key is missing, the primary goal is to inform the user while providing a structurally correct React component.\n3.  **Generate Code**: Create a simple functional component that displays the user's goal and an API key message.\n4.  **Generate Explanation**: Describe what the mock component is and why it was generated.\n5.  **Generate Preview**: Create simple HTML that mimics the React component's output for the simulator."
        }), 500));
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a single, self-contained React functional component using TypeScript and Tailwind CSS to achieve the following goal: "${goal}".
            Your response MUST be a single JSON object with the following keys: "code", "explanation", "usage", "previewHtml", and "cot_analysis".
            - "code": A string containing the full React component code. It should be ready to copy-paste into a .tsx file. Do not include any imports that are not from 'react'.
            - "explanation": A concise explanation of how the component works, written in Traditional Chinese.
            - "usage": A brief guide on how to use the component, written in Traditional Chinese.
            - "previewHtml": A string of simple HTML and Tailwind CSS that visually approximates the component's appearance for a preview pane. Do not use any JavaScript in the preview.
            - "cot_analysis": A brief, step-by-step chain-of-thought analysis in English explaining how you arrived at the solution.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        code: { type: Type.STRING },
                        explanation: { type: Type.STRING },
                        usage: { type: Type.STRING },
                        previewHtml: { type: Type.STRING },
                        cot_analysis: { type: Type.STRING },
                    }
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as GenerationResult;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};
