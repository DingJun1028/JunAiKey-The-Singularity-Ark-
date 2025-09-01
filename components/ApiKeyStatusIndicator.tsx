import React from 'react';
import { useApiKeyStore } from '../store/apiKeyStore';
import BilingualLabel from './BilingualLabel';

const ApiKeyStatusIndicator: React.FC = () => {
  const { status } = useApiKeyStore();

  const getStatusInfo = () => {
    switch (status) {
      case 'valid':
        return {
          color: 'bg-matrix-green',
          text: '神諭已連接 (Oracle Connected)',
        };
      case 'invalid':
        return {
          color: 'bg-red-500',
          text: '金鑰無效 (Invalid Key)',
        };
      case 'verifying':
        return {
            color: 'bg-matrix-cyan animate-pulse',
            text: '正在驗證... (Verifying...)',
        };
      case 'not-configured':
      default:
        return {
          color: 'bg-matrix-dark',
          text: '未設定 (Not Configured)',
        };
    }
  };

  const { color, text } = getStatusInfo();

  return (
    <div className="flex items-center justify-center gap-2 p-1 bg-matrix-bg-2/50 rounded-md text-xs">
      <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
      <span className="text-matrix-light font-mono"><BilingualLabel label={text} /></span>
    </div>
  );
};

export default ApiKeyStatusIndicator;
