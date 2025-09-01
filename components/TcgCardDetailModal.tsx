import React from 'react';
import type { ElementData } from '../core/tcgData';
import KeywordTooltip from './KeywordTooltip';
import BilingualLabel from './BilingualLabel';

interface TcgCardDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  element: ElementData | null;
}

const TcgCardDetailModal: React.FC<TcgCardDetailModalProps> = ({ isOpen, onClose, element }) => {
  if (!isOpen || !element) return null;

  const { theme, name, hero, philosophy, keywords, tacticalStyles } = element;

  return (
    <div 
      className="fixed inset-0 bg-matrix-bg/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-fast" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-detail-title"
    >
      <div 
        className={`bg-matrix-bg-2 border-2 ${theme.border} rounded-lg shadow-lg w-full max-w-lg p-6 m-4 animate-fade-in shadow-md ${theme.shadow} flex flex-col`} 
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '80vh' }}
      >
        <div className="flex justify-between items-start mb-4 flex-shrink-0">
            <div>
                <h2 id="card-detail-title" className={`text-3xl ${theme.text} font-bold`}>{name}</h2>
                <p className="text-md text-matrix-dark"><BilingualLabel label={hero.name} /></p>
            </div>
            <button onClick={onClose} className="text-matrix-dark hover:text-matrix-light text-3xl font-bold">&times;</button>
        </div>
        
        <div className="flex-grow min-h-0 overflow-y-auto pr-2 space-y-4">
            <blockquote className={`border-l-4 ${theme.border} pl-4 italic text-matrix-light`}>
                "{philosophy}"
            </blockquote>
            
            {tacticalStyles && tacticalStyles.length > 0 && (
                 <div>
                    <h3 className="text-lg font-semibold text-matrix-light border-b border-matrix-dark/30 pb-1 mb-2">
                        <BilingualLabel label="戰術風格 (Tactical Styles)" />
                    </h3>
                    <ul className="list-disc list-inside text-matrix-light bg-matrix-bg/50 p-3 rounded-md space-y-2 text-sm">
                        {tacticalStyles.map(style => {
                            const parts = style.split(/:\s*(.*)/s);
                            const title = parts[0];
                            const description = parts[1] || '';
                            return (
                                <li key={title}>
                                    <strong className={theme.text}>{title}:</strong> {description}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            <div>
                <h3 className="text-lg font-semibold text-matrix-light border-b border-matrix-dark/30 pb-1 mb-2">
                    <BilingualLabel label="通用敕令 (Universal Edicts)" />
                </h3>
                <div className="flex flex-wrap gap-2">
                    {keywords.universal.map(kw => <KeywordTooltip key={kw} keyword={kw} large />)}
                </div>
            </div>

            <div>
                <h3 className={`text-lg font-semibold ${theme.text} border-b border-matrix-dark/30 pb-1 mb-2`}>
                     <BilingualLabel label="元素敕令 (Elemental Edicts)" />
                </h3>
                <div className="flex flex-wrap gap-2">
                    {keywords.elemental.map(kw => <KeywordTooltip key={kw} keyword={kw} large />)}
                </div>
            </div>

             <div>
                <h3 className="text-lg font-semibold text-matrix-cyan border-b border-matrix-dark/30 pb-1 mb-2">
                     <BilingualLabel label="奧義敕令 (Esoteric Edict)" />
                </h3>
                <div className="flex flex-wrap gap-2">
                    {keywords.esoteric.map(kw => <KeywordTooltip key={kw} keyword={kw} large />)}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default TcgCardDetailModal;