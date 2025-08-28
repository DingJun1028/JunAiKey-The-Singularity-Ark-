import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

// Re-using icons for consistency
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
);
const CrossIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);
const LoaderIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`w-5 h-5 border-2 border-t-matrix-cyan border-r-matrix-cyan border-b-matrix-cyan/20 border-l-matrix-cyan/20 rounded-full animate-spin ${className}`}></div>
);

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApiKeySaved: (apiKey: string) => void;
  currentApiKey: string | null;
}

const API_KEY_REGEX = /^[a-zA-Z0-9_-]+$/;

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onApiKeySaved, currentApiKey }) => {
  const [tempApiKey, setTempApiKey] = useState(currentApiKey || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [keyStatus, setKeyStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  useEffect(() => {
    if (isOpen) {
        setTempApiKey(currentApiKey || '');
        setKeyStatus('idle');
        setError(null);
        setValidationError(null);
    }
  }, [isOpen, currentApiKey]);


  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTempApiKey(value);
    setKeyStatus('idle');
    setError(null);

    if (value && !API_KEY_REGEX.test(value)) {
        setValidationError("金鑰只能包含英數字元、底線和連字號。");
    } else {
        setValidationError(null);
    }
  };

  const handleKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempApiKey.trim() || validationError) return;

    setIsVerifying(true);
    setError(null);
    setKeyStatus('idle');
    
    try {
        const ai = new GoogleGenAI({ apiKey: tempApiKey });
        await ai.chats.create({ model: 'gemini-2.5-flash' });

        setKeyStatus('valid');
        localStorage.setItem('junaikey-gemini-api-key', tempApiKey);
        
        setTimeout(() => {
            onApiKeySaved(tempApiKey);
            onClose();
        }, 1000);

    } catch(err) {
        console.error("API Key validation failed:", err);
        setKeyStatus('invalid');
        setError("API 金鑰驗證失敗。請檢查您的金鑰並重試。");
    } finally {
        setIsVerifying(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-matrix-bg/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-matrix-bg-2 border border-matrix-dark/50 rounded-lg shadow-lg w-full max-w-lg p-6 m-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-matrix-cyan font-bold">系統設定</h2>
            <button onClick={onClose} className="text-matrix-dark hover:text-matrix-light text-2xl font-bold">&times;</button>
        </div>
        
        <form onSubmit={handleKeySubmit} className="space-y-4">
          <div>
            <label htmlFor="api-key-input" className="block text-matrix-light mb-2">Gemini API 金鑰</label>
            <p className="text-sm text-matrix-dark mb-2">
              您的金鑰將被安全地儲存在您的瀏覽器本地儲存中。
            </p>
            <div className="relative flex items-center">
              <input
                  id="api-key-input"
                  type="password"
                  value={tempApiKey}
                  onChange={handleApiKeyChange}
                  placeholder="輸入您的 Gemini API 金鑰..."
                  className={`w-full p-3 pr-10 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 text-matrix-light
                    ${keyStatus === 'valid' && 'border-matrix-green ring-matrix-green'}
                    ${keyStatus === 'invalid' && 'border-red-500 ring-red-500'}
                    ${keyStatus === 'idle' && !validationError && 'focus:ring-matrix-cyan'}
                    ${validationError && 'border-red-500 ring-red-500'}
                  `}
                  aria-label="API 金鑰輸入"
                  disabled={isVerifying}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {isVerifying && <LoaderIcon />}
                  {keyStatus === 'valid' && <CheckIcon className="w-5 h-5 text-matrix-green" />}
                  {keyStatus === 'invalid' && <CrossIcon className="w-5 h-5 text-red-500" />}
              </div>
            </div>
            {(error || validationError) && <p className="text-red-500 pt-2 text-sm">{error || validationError}</p>}
          </div>

          <div className="flex justify-end">
            <button 
                type="submit"
                className="bg-matrix-green text-matrix-bg font-bold py-2 px-6 rounded-md transition-all hover:bg-opacity-90 shadow-matrix-glow disabled:bg-matrix-dark disabled:shadow-none disabled:cursor-wait"
                disabled={isVerifying || !tempApiKey || !!validationError}
            >
                {isVerifying ? "驗證中..." : "儲存並連接"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;