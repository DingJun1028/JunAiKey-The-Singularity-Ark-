import { create } from 'zustand';
import { GoogleGenAI } from "@google/genai";
import type { ApiKeyStore, ApiKeyStatus } from '../types';

const API_KEY_STORAGE_KEY = 'junaikey-gemini-api-key';
const API_STATUS_STORAGE_KEY = 'junaikey-gemini-api-status';

export const useApiKeyStore = create<ApiKeyStore>((set, get) => ({
  apiKey: null,
  status: 'not-configured',
  actions: {
    loadApiKey: () => {
      try {
        const key = localStorage.getItem(API_KEY_STORAGE_KEY);
        const storedStatus = localStorage.getItem(API_STATUS_STORAGE_KEY) as ApiKeyStatus | null;
        if (key) {
          set({ apiKey: key, status: storedStatus || 'valid' }); // Default to 'valid' if status is missing but key exists
        } else {
          set({ apiKey: null, status: 'not-configured' });
        }
      } catch (error) {
        console.error("Failed to load API key from storage:", error);
        set({ apiKey: null, status: 'not-configured' });
      }
    },
    setApiKey: (key: string) => {
      try {
        localStorage.setItem(API_KEY_STORAGE_KEY, key);
        set({ apiKey: key });
      } catch (error) {
        console.error("Failed to save API key to storage:", error);
      }
    },
    setStatus: (status: ApiKeyStatus) => {
       try {
        localStorage.setItem(API_STATUS_STORAGE_KEY, status);
        set({ status });
      } catch (error) {
        console.error("Failed to save API status to storage:", error);
      }
    },
    validateApiKey: async (key: string) => {
      if (!key) {
        get().actions.setStatus('not-configured');
        return false;
      }
      
      set({ status: 'verifying' });

      try {
        const ai = new GoogleGenAI({ apiKey: key });
        // Use a simple, low-cost model call for validation.
        await ai.models.generateContent({model: 'gemini-2.5-flash', contents: 'ping'});
        
        get().actions.setApiKey(key);
        get().actions.setStatus('valid');
        return true;
      } catch (err) {
        console.error("API Key validation failed:", err);
        get().actions.setStatus('invalid');
        return false;
      }
    },
  },
}));
