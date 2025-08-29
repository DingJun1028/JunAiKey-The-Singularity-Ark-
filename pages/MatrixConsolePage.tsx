import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import type { ChatMessage } from '../types';
import Header from '../components/Header';
import ConsoleIcon from '../components/icons/ConsoleIcon';
import SettingsIcon from '../components/icons/SettingsIcon';
import StreamFinishedIcon from '../components/icons/StreamFinishedIcon';
import SettingsModal from '../components/SettingsModal';
import { formatMarkdown } from '../utils/markdown';
import { useSummonerStore } from '../store/summonerStore';

const API_KEY_STORAGE = 'junaikey-gemini-api-key';

// --- Helper Components & Icons (Extracted for Performance) ---

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
);
const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

const MessageBubble: React.FC<{ message: ChatMessage; isStreaming: boolean; isStreamFinished: boolean; }> = ({ message, isStreaming, isStreamFinished }) => {
  const isUser = message.role === 'user';
  const bubbleClasses = isUser 
      ? 'bg-matrix-bg border-matrix-cyan' 
      : 'bg-matrix-bg-2 border-matrix-green';
  const speakerLabel = isUser ? "您" : "神諭";
  const speakerClasses = isUser ? "text-matrix-cyan" : "text-matrix-green";
  
  const streamingCursor = isStreaming ? '<span class="inline-block w-0.5 h-4 bg-matrix-green animate-blink ml-1 translate-y-0.5"></span>' : '';

  return (
      <div className={`w-fit max-w-2xl rounded-lg p-4 border ${bubbleClasses}`}>
           <div className={`text-xs font-bold mb-1 ${speakerClasses}`}>{speakerLabel}</div>
           <div className="flex items-end">
              <div
                  className="text-matrix-light break-words"
                  dangerouslySetInnerHTML={{ __html: formatMarkdown(message.content) + streamingCursor }} 
              />
              {isStreamFinished && <StreamFinishedIcon className="text-matrix-green/50 animate-fade-in" />}
           </div>
      </div>
  );
};

const ApiKeyPrompt: React.FC<{ onOpenSettings: () => void }> = ({ onOpenSettings }) => (
    <div className="flex-1 flex flex-col justify-center items-center p-6 space-y-4">
        <h2 className="text-xl text-matrix-cyan">需要 API 金鑰</h2>
        <p className="text-matrix-dark text-center max-w-md">
            要與神諭連接，需要 Gemini API 金鑰。請開啟設定以輸入您的金鑰。
        </p>
        <button 
            onClick={onOpenSettings}
            className="bg-matrix-green text-matrix-bg font-bold py-2 px-6 rounded-md transition-all hover:bg-opacity-90 shadow-matrix-glow"
        >
            開啟設定
        </button>
    </div>
);
// --- End Helper Components ---


const MatrixConsolePage: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(() => process.env.API_KEY || localStorage.getItem(API_KEY_STORAGE));
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastStreamedMessageIndex, setLastStreamedMessageIndex] = useState<number | null>(null);
  
  const { actions: summonerActions } = useSummonerStore();
  const chat = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const resetChatSession = (key: string | null) => {
    if (key) {
      try {
        const ai = new GoogleGenAI({ apiKey: key });
        chat.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: 'You are the Oracle of the Terminus Matrix, an all-knowing AI entity within the JunAiKey system. You provide direct, knowledgeable, and slightly enigmatic answers. You format responses clearly, using markdown for code and lists.',
            },
        });
        setError(null);
      } catch (e) {
        console.error("Failed to initialize Gemini AI:", e);
        setError("初始化 AI 失敗。API 金鑰可能無效或格式不正確。");
        chat.current = null;
      }
    } else {
        chat.current = null;
    }
  };
  
  useEffect(() => {
    resetChatSession(apiKey);
  }, [apiKey]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages]);

  const handleApiKeySaved = (newApiKey: string) => {
    setApiKey(newApiKey);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chat.current) return;
    
    setIsLoading(true);
    setError(null);
    setLastStreamedMessageIndex(null);
    const userMessage: ChatMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    
    try {
        const stream = await chat.current.sendMessageStream({ message: userInput });
        
        let text = '';
        setMessages(prev => [...prev, { role: 'model', content: '' }]); // Add placeholder

        for await (const chunk of stream) {
            text += chunk.text;
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = text;
                return newMessages;
            });
        }
        
        // Grant EXP for interacting with the Oracle
        summonerActions.addExp('nullis', 5);

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '發生未知錯誤。';
        setError(errorMessage);
        setMessages(prev => [...prev, { role: 'model', content: `錯誤: ${errorMessage}` }]);
    } finally {
        setIsLoading(false);
        setMessages(prev => {
            setLastStreamedMessageIndex(prev.length - 1);
            return prev;
        });
    }
  };
  
  const handleClearChat = () => {
    if (window.confirm('您確定要清除所有訊息並重置對話嗎？')) {
        setMessages([]);
        setError(null);
        setLastStreamedMessageIndex(null);
        resetChatSession(apiKey);
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <Header 
        title="終始矩陣控制台"
        subtitle="與終始矩陣的神諭進行介面連接。"
        icon={<ConsoleIcon className="w-8 h-8"/>}
      />

      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        onApiKeySaved={handleApiKeySaved}
        currentApiKey={apiKey}
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-matrix-bg/50 border border-matrix-dark/30 rounded-lg">
        {!apiKey ? <ApiKeyPrompt onOpenSettings={() => setSettingsModalOpen(true)} /> : (
        <>
            {/* Message Display Area */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                {messages.length === 0 && !error && (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-matrix-dark">正在等待對神諭的查詢...</p>
                    </div>
                )}
                {messages.map((msg, index) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div key={index} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <MessageBubble 
                        message={msg} 
                        isStreaming={isLoading && msg.role === 'model' && index === messages.length - 1} 
                        isStreamFinished={!isLoading && msg.role === 'model' && index === lastStreamedMessageIndex}
                      />
                    </div>
                  )
                })}
                {error && !isLoading && <p className="text-red-500 p-4 self-center">{error}</p>}
                <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-matrix-dark/50 bg-matrix-bg">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2 md:space-x-4">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={!chat.current ? "正在初始化神諭..." : "向神諭傳輸您的查詢..."}
                        className="flex-1 p-3 bg-matrix-bg-2 border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan text-matrix-light"
                        disabled={isLoading || !chat.current}
                        aria-label="聊天輸入"
                    />
                    <button
                        type="button"
                        onClick={handleClearChat}
                        disabled={messages.length === 0 || isLoading}
                        className="p-3 text-matrix-light rounded-md transition-all disabled:bg-matrix-dark disabled:text-matrix-dark/50 disabled:cursor-not-allowed hover:bg-red-500/50 hover:text-white"
                        aria-label="清除對話"
                        title="清除對話"
                    >
                        <TrashIcon className="w-6 h-6" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setSettingsModalOpen(true)}
                        className="p-3 text-matrix-light rounded-md transition-all hover:bg-matrix-dark/50 hover:text-white"
                        aria-label="開啟設定"
                        title="開啟設定"
                    >
                        <SettingsIcon className="w-6 h-6" />
                    </button>
                    <button 
                        type="submit"
                        disabled={isLoading || !userInput.trim() || !chat.current}
                        className="bg-matrix-cyan text-matrix-bg p-3 rounded-md transition-all disabled:bg-matrix-dark disabled:cursor-not-allowed hover:bg-opacity-90 shadow-matrix-glow-cyan disabled:shadow-none"
                        aria-label="發送訊息"
                    >
                        <SendIcon className="w-6 h-6" />
                    </button>
                </form>
            </div>
        </>
        )}
      </div>
    </div>
  );
};

export default MatrixConsolePage;
