import React, { useState, useEffect } from 'react';
import { useOmniClipboardStore } from '../store/omniClipboardStore';
import Card from './Card';
import OmniClipboardIcon from './icons/OmniClipboardIcon';
import OmniClipboardCheckIcon from './icons/OmniClipboardCheckIcon';
import OmniClipboardOffIcon from './icons/OmniClipboardOffIcon';
import PlusCircleIcon from './icons/PlusCircleIcon';
import TrashIcon from './icons/TrashIcon';
import BilingualLabel from './BilingualLabel';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface OmniClipboardProps {
    onDraftFromClip: (text: string) => void;
}

const OmniClipboard: React.FC<OmniClipboardProps> = ({ onDraftFromClip }) => {
    const { history, isMonitorEnabled, setIsMonitorEnabled, addClip, clearHistory, isInitialized } = useOmniClipboardStore();
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        if (!isInitialized) return; // Wait for rehydration

        const handleFocus = async () => {
            if (isMonitorEnabled && document.hasFocus()) {
                try {
                    const text = await navigator.clipboard.readText();
                    addClip(text);
                } catch (err) {
                    console.log('無法讀取剪貼簿 (Could not read clipboard):', err);
                }
            }
        };

        if (isMonitorEnabled) {
            window.addEventListener('focus', handleFocus);
            handleFocus();
        }

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [isMonitorEnabled, addClip, isInitialized]);

    return (
        <Card className="mb-6">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex justify-between items-center p-4"
                aria-expanded={isExpanded}
            >
                <div className="flex items-center gap-3">
                    <OmniClipboardIcon className="w-6 h-6 text-matrix-cyan" />
                    <div>
                        <h3 className="font-semibold text-matrix-light text-left">
                            <BilingualLabel label="萬能剪貼本 (Omni-Clipboard)" />
                        </h3>
                        <p className="text-xs text-matrix-dark text-left">
                            <BilingualLabel label="從您的剪貼簿快速建立筆記。(Quickly create notes from your clipboard.)" />
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsMonitorEnabled(!isMonitorEnabled); }}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-matrix-dark/50"
                        title={isMonitorEnabled ? "停用監視 (Disable Monitoring)" : "啟用監視 (Enable Monitoring)"}
                    >
                        {isMonitorEnabled ?
                            <><OmniClipboardCheckIcon className="w-5 h-5 text-matrix-green" /> <span className="hidden sm:inline text-xs text-matrix-green">監視中</span></> :
                            <><OmniClipboardOffIcon className="w-5 h-5 text-matrix-dark" /> <span className="hidden sm:inline text-xs text-matrix-dark">已停用</span></>
                        }
                    </button>
                    <ChevronDownIcon className={`w-5 h-5 text-matrix-light transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
            </button>
            
            <div className={`transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                {isMonitorEnabled && history.length > 0 && (
                    <div className="border-t border-matrix-dark/30 p-4">
                        <ul className="space-y-2 max-h-48 overflow-y-auto">
                            {history.map(item => (
                                <li key={item.id} className="flex items-center justify-between p-2 bg-matrix-bg/50 rounded-md">
                                    <p className="text-sm text-matrix-light truncate pr-2" title={item.text}>
                                        {item.text}
                                    </p>
                                    <button
                                        onClick={() => onDraftFromClip(item.text)}
                                        className="transition-opacity flex-shrink-0 flex items-center gap-1 text-matrix-green hover:text-white text-xs"
                                        title="將此內容載入筆記編輯器作為草稿 (Load this content into the note editor as a draft)"
                                    >
                                        <PlusCircleIcon className="w-4 h-4" />
                                        <BilingualLabel label="草稿 (Draft)" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                         <div className="text-right mt-2">
                            <button onClick={clearHistory} className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1 ml-auto">
                                <TrashIcon className="w-3 h-3" />
                                <BilingualLabel label="清除歷史 (Clear History)" />
                            </button>
                        </div>
                    </div>
                )}
                 {isMonitorEnabled && history.length === 0 && (
                    <div className="border-t border-matrix-dark/30 p-4 text-center text-matrix-dark text-sm">
                        <BilingualLabel label="剪貼簿歷史為空。嘗試複製一些文字。(Clipboard history is empty. Try copying some text.)" />
                    </div>
                )}
            </div>
        </Card>
    );
};

export default OmniClipboard;