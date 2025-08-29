import React from 'react';

interface CodeExecutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecute: () => void;
  explanation: string;
  usage: string;
  cot_analysis: string;
}

const CodeExecutionModal: React.FC<CodeExecutionModalProps> = ({ isOpen, onClose, onExecute, explanation, usage, cot_analysis }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-matrix-bg/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-fast" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="execution-modal-title"
    >
      <div 
        className="bg-matrix-bg-2 border border-matrix-cyan rounded-lg shadow-lg w-full max-w-2xl p-6 m-4 animate-fade-in shadow-matrix-glow-cyan" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 id="execution-modal-title" className="text-2xl text-matrix-cyan font-bold">神諭的低語</h2>
                <p className="text-sm text-matrix-dark">神諭已解析創生藍圖，請檢視其指引。</p>
            </div>
            <button onClick={onClose} className="text-matrix-dark hover:text-matrix-light text-3xl font-bold">&times;</button>
        </div>
        
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div>
                <h3 className="text-lg font-semibold text-matrix-green mb-2">思維鏈分析 (CoT Analysis)</h3>
                <p className="text-matrix-light bg-matrix-bg/50 p-3 rounded-md text-sm italic">{cot_analysis}</p>
            </div>
             <div>
                <h3 className="text-lg font-semibold text-matrix-green mb-2">功能詳解 (Explanation)</h3>
                <p className="text-matrix-light bg-matrix-bg/50 p-3 rounded-md">{explanation}</p>
            </div>
             <div>
                <h3 className="text-lg font-semibold text-matrix-green mb-2">運用指引 (Usage)</h3>
                <p className="text-matrix-light bg-matrix-bg/50 p-3 rounded-md font-mono text-sm">{usage}</p>
            </div>
        </div>

        <div className="flex justify-end mt-6">
            <button 
                onClick={onExecute}
                className="bg-matrix-green text-matrix-bg font-bold py-2 px-6 rounded-md transition-all hover:bg-opacity-90 shadow-matrix-glow"
            >
                執行藍圖
            </button>
        </div>
      </div>
    </div>
  );
};

export default CodeExecutionModal;