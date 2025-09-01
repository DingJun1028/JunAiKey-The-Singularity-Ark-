import React, { useState, useEffect, useRef } from 'react';
import BilingualLabel from './BilingualLabel';
import { useApiKeyStore } from '../store/apiKeyStore';

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
}

const API_KEY_REGEX = /^[a-zA-Z0-9_-]{30,}$/;

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { apiKey, status, actions } = useApiKeyStore();
  const [inputValue, setInputValue] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isOpen) {
        setInputValue(apiKey || '');
        setValidationError(null);
        setSubmitError(null);
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, apiKey]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    setSubmitError(null);
    actions.setStatus('not-configured');

    if (value && !API_KEY_REGEX.test(value)) {
        setValidationError("金鑰格式無效。它應至少為 30 個字元，且僅包含英數字元、底線和連字號。(Invalid key format. It should be at least 30 characters and contain only alphanumeric characters, underscores, and hyphens.)");
    } else {
        setValidationError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || validationError) return;
    setSubmitError(null);
    
    const success = await actions.validateApiKey(inputValue);
    
    if (success) {
        setTimeout(() => {
            onClose();
        }, 1200);
    } else {
        setSubmitError("API 金鑰驗證失敗。請檢查您的金鑰並重試。(API Key validation failed. Please check your key and try again.)");
    }
  };

  const getStatusInfo = () => {
    switch(status) {
        case 'valid': return { text: '已驗證 (Valid)', color: 'text-matrix-green', Icon: CheckIcon };
        case 'invalid': return { text: '金鑰無效 (Invalid)', color: 'text-red-500', Icon: CrossIcon };
        case 'verifying': return { text: '驗證中... (Verifying...)', color: 'text-matrix-cyan', Icon: LoaderIcon };
        default: return { text: '未設定 (Not Configured)', color: 'text-matrix-dark', Icon: null };
    }
  };
  const statusInfo = getStatusInfo();
  
  const isVerifying = status === 'verifying';
  const displayStatus = (inputValue === apiKey && apiKey !== '') ? status : 'not-configured';
  const displayStatusInfo = getStatusInfo();


  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-matrix-bg/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div className="bg-matrix-bg-2 border border-matrix-dark/50 rounded-lg shadow-lg w-full max-w-lg p-6 m-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
            <h2 id="settings-modal-title" className="text-xl text-matrix-cyan font-bold">
                <BilingualLabel label="系統設定 (System Settings)" />
            </h2>
            <button onClick={onClose} className="text-matrix-dark hover:text-matrix-light text-2xl font-bold">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="api-key-input" className="block text-matrix-light mb-2">
                <BilingualLabel label="Gemini API 金鑰 (Gemini API Key)" />
            </label>
            <p className="text-sm text-matrix-dark mb-2">
              <BilingualLabel label="您的金鑰將被安全地儲存在您的瀏覽器本地儲存中。(Your key will be stored securely in your browser's local storage.)" />
            </p>
            <div className="flex items-center gap-4 mb-2">
                <span className="text-sm text-matrix-light font-semibold">狀態:</span>
                <div className={`flex items-center gap-2 text-sm ${displayStatusInfo.color}`}>
                    {displayStatusInfo.Icon && <displayStatusInfo.Icon className="w-4 h-4" />}
                    <span><BilingualLabel label={displayStatusInfo.text} /></span>
                </div>
            </div>
            <div className="relative flex items-center">
              <input
                  ref={inputRef}
                  id="api-key-input"
                  type="password"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="輸入您的 Gemini API 金鑰... (Enter your Gemini API Key...)"
                  className={`w-full p-3 pr-10 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 text-matrix-light
                    ${status === 'valid' && inputValue === apiKey && 'border-matrix-green ring-matrix-green'}
                    ${(status === 'invalid' || validationError) && 'border-red-500 ring-red-500'}
                    ${status !== 'valid' && status !== 'invalid' && !validationError && 'focus:ring-matrix-cyan'}
                  `}
                  aria-label="API 金鑰輸入 (API Key Input)"
                  disabled={isVerifying}
              />
            </div>
            {(submitError || validationError) && <p className="text-red-500 pt-2 text-sm"><BilingualLabel label={submitError || validationError} /></p>}
          </div>

          <div className="flex justify-end">
            <button 
                type="submit"
                className="bg-matrix-green text-matrix-bg font-bold py-2 px-6 rounded-md transition-all hover:bg-opacity-90 shadow-matrix-glow disabled:bg-matrix-dark disabled:shadow-none disabled:cursor-wait"
                disabled={isVerifying || !inputValue || !!validationError}
            >
                <BilingualLabel label={isVerifying ? "驗證中... (Verifying...)" : "儲存並連接 (Save & Connect)"} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;