import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ShuttleIcon from '../components/icons/ShuttleIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

// --- Type Definitions ---
type TabID = 'basic' | 'junai' | 'junkey';
interface AppOption {
  id: string;
  name: string;
  initial: string;
}
interface Result {
  id: string;
  name: string;
  initial: string;
  status: 'pending' | 'success' | 'error';
  message: string;
}
type Skill = 'meeting' | 'project' | 'collect';

// --- Local Components & Icons ---
const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
const SuccessIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);
const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);

// --- Static Data ---
const apps: AppOption[] = [
    { id: 'supasend', name: 'Supasend', initial: 'Su' },
    { id: 'capacities', name: 'Capacities', initial: 'Ca' },
    { id: 'mymemo', name: 'My Memo.ai', initial: 'Me' },
    { id: 'capture', name: 'Capture', initial: 'Ca' },
    { id: 'notion', name: 'Notion', initial: 'No' },
    { id: 'evernote', name: 'Evernote', initial: 'Ev' },
];

const DataShuttlePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabID>('basic');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<Result[]>([]);
    const [content, setContent] = useState('');
    const [selectedApps, setSelectedApps] = useState<Record<string, boolean>>({
        supasend: true, capacities: true, mymemo: true, capture: true
    });
    const [activeSkill, setActiveSkill] = useState<Skill>('meeting');
    const location = useLocation();
    const navigate = useNavigate();
    
    // Handle incoming state from Wisdom Crystal
    useEffect(() => {
      const state = location.state as { activeTab?: TabID; skill?: Skill };
      if (state) {
        if (state.activeTab) {
          setActiveTab(state.activeTab);
        }
        if (state.skill) {
          setActiveSkill(state.skill);
        }
        // Clear state after handling
        navigate(location.pathname, { replace: true });
      }
    }, [location.state, navigate]);

    const handleSend = () => {
        const appsToSend = apps.filter(app => selectedApps[app.id]);
        if (appsToSend.length === 0 || (activeTab !== 'junkey' && !content.trim())) return;


        setIsLoading(true);
        const initialResults: Result[] = appsToSend.map(app => ({
            ...app,
            status: 'pending',
            message: '傳送中...'
        }));
        setResults(initialResults);

        initialResults.forEach(result => {
            setTimeout(() => {
                const isSuccess = Math.random() > 0.1;
                setResults(prev => prev.map(r => r.id === result.id ? { ...r, status: isSuccess ? 'success' : 'error', message: isSuccess ? '傳送成功' : '傳送失敗' } : r));
            }, 1000 + Math.random() * 2000);
        });
        
        // Wait for all to finish
        setTimeout(() => setIsLoading(false), 3500);
    };

    const AppCard: React.FC<{ app: AppOption; themeColor: string; }> = ({ app, themeColor }) => (
        <div>
            <input
                type="checkbox"
                id={`app-${app.id}-${activeTab}`}
                className="hidden peer"
                checked={!!selectedApps[app.id]}
                onChange={() => setSelectedApps(prev => ({...prev, [app.id]: !prev[app.id]}))}
            />
            <label
                htmlFor={`app-${app.id}-${activeTab}`}
                className={`
                    relative flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200
                    bg-matrix-bg border-matrix-dark/50
                    hover:bg-matrix-dark/20 hover:border-${themeColor}/50
                    peer-checked:border-${themeColor} peer-checked:ring-2 peer-checked:ring-${themeColor}
                    peer-checked:bg-matrix-bg-2 peer-checked:scale-105 peer-checked:shadow-lg
                `}
            >
                <div className={`absolute top-2 right-2 w-5 h-5 text-${themeColor} opacity-0 transition-opacity peer-checked:opacity-100 animate-fade-in-fast`}>
                    <CheckCircleIcon className="w-full h-full" />
                </div>
                
                <div className={`w-10 h-10 mr-4 flex-shrink-0 bg-${themeColor} rounded-md flex items-center justify-center text-matrix-bg font-bold text-lg`}>
                    {app.initial}
                </div>
                <span className="font-medium text-matrix-light">{app.name}</span>
            </label>
        </div>
    );
    
    return (
        <div className="animate-fade-in">
            <Header 
              title="數據穿梭機 (Data Shuttle)"
              subtitle="將您的數據從中樞同時傳送至多個終端。"
              icon={<ShuttleIcon className="w-8 h-8"/>}
            />

            <div className="border-b border-matrix-dark/30 mb-6">
                <div className="flex space-x-4">
                    <button onClick={() => setActiveTab('basic')} className={`pb-2 border-b-2 ${activeTab === 'basic' ? 'border-matrix-cyan text-matrix-cyan' : 'border-transparent text-matrix-light hover:border-matrix-dark'}`}>基本傳送</button>
                    <button onClick={() => setActiveTab('junai')} className={`pb-2 border-b-2 ${activeTab === 'junai' ? 'border-matrix-green text-matrix-green' : 'border-transparent text-matrix-light hover:border-matrix-dark'}`}>Jun.AI 分析</button>
                    <button onClick={() => setActiveTab('junkey')} className={`pb-2 border-b-2 ${activeTab === 'junkey' ? 'border-syntax-number text-syntax-number' : 'border-transparent text-matrix-light hover:border-matrix-dark'}`}>Jun.Key 技能</button>
                </div>
            </div>

            <div className="space-y-6">
                {activeTab === 'basic' && (
                    <div className="animate-fade-in-fast">
                        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="在此輸入或粘貼您想要分享的內容..." className="w-full h-40 p-3 bg-matrix-bg border border-matrix-dark/50 rounded-lg focus:ring-2 focus:ring-matrix-cyan focus:outline-none"></textarea>
                        <h2 className="text-lg font-medium my-4">選擇目標應用</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                            {apps.map(app => <AppCard key={app.id} app={app} themeColor="matrix-cyan" />)}
                        </div>
                        <button onClick={handleSend} disabled={isLoading || !content.trim()} className="w-full flex justify-center items-center gap-2 bg-matrix-cyan text-matrix-bg font-medium py-3 px-4 rounded-lg transition-colors hover:bg-opacity-90 disabled:bg-matrix-dark disabled:cursor-not-allowed">
                            {isLoading && <SpinnerIcon className="w-5 h-5"/>}
                            {isLoading ? "傳送中..." : "傳送到選定的應用"}
                        </button>
                    </div>
                )}
                 {activeTab === 'junai' && (
                    <div className="animate-fade-in-fast">
                        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="在此輸入內容，Jun.AI 將自動分析並提取關鍵信息..." className="w-full h-40 p-3 bg-matrix-bg border border-matrix-dark/50 rounded-lg focus:ring-2 focus:ring-matrix-green focus:outline-none"></textarea>
                        <h2 className="text-lg font-medium my-4">選擇分析後目標</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                            {apps.map(app => <AppCard key={app.id} app={app} themeColor="matrix-green" />)}
                        </div>
                        <button onClick={handleSend} disabled={isLoading || !content.trim()} className="w-full flex justify-center items-center gap-2 bg-matrix-green text-matrix-bg font-medium py-3 px-4 rounded-lg transition-colors hover:bg-opacity-90 disabled:bg-matrix-dark disabled:cursor-not-allowed">
                            {isLoading && <SpinnerIcon className="w-5 h-5"/>}
                           {isLoading ? "分析並傳送中..." : "Jun.AI 分析並傳送"}
                        </button>
                    </div>
                )}
                {activeTab === 'junkey' && (
                     <div className="animate-fade-in-fast">
                        <h2 className="text-lg font-medium mb-4">選擇萬能元鑰技能</h2>
                        <div className="space-y-3 mb-6">
                            {(['meeting', 'project', 'collect'] as Skill[]).map(skill => (
                                <div key={skill}>
                                    <input type="radio" id={`skill-${skill}`} name="skill" className="peer hidden" checked={activeSkill === skill} onChange={() => setActiveSkill(skill)} />
                                    <label htmlFor={`skill-${skill}`} className="flex items-center p-4 border rounded-lg cursor-pointer bg-matrix-bg border-matrix-dark/50 hover:bg-matrix-dark/20 peer-checked:border-syntax-number peer-checked:ring-2 peer-checked:ring-syntax-number">
                                        <span className="font-medium block capitalize">{skill} 助手</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <h2 className="text-lg font-medium my-4">選擇目標應用</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                            {apps.map(app => <AppCard key={app.id} app={app} themeColor="syntax-number" />)}
                        </div>
                        <button onClick={handleSend} disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-syntax-number text-matrix-bg font-medium py-3 px-4 rounded-lg transition-colors hover:bg-opacity-90 disabled:bg-matrix-dark disabled:cursor-not-allowed">
                            {isLoading && <SpinnerIcon className="w-5 h-5" />}
                           {isLoading ? "執行中..." : "執行萬能元鑰技能"}
                        </button>
                    </div>
                )}

                {results.length > 0 && (
                    <div className="mt-6 space-y-3">
                         <h2 className="text-lg font-medium">傳送狀態</h2>
                         {results.map(res => (
                            <div key={res.id} className="p-4 border rounded-lg bg-matrix-bg border-matrix-dark/50 flex items-center">
                                <div className="w-8 h-8 mr-4 flex-shrink-0 bg-matrix-dark rounded-md flex items-center justify-center text-matrix-light font-bold">{res.initial}</div>
                                <div className="flex-grow">
                                    <div className="font-medium">{res.name}</div>
                                    <div className="text-sm text-matrix-dark">{res.message}</div>
                                </div>
                                <div className="w-6 h-6 flex-shrink-0">
                                    {res.status === 'pending' && <SpinnerIcon className="text-matrix-cyan" />}
                                    {res.status === 'success' && <SuccessIcon className="text-matrix-green" />}
                                    {res.status === 'error' && <ErrorIcon className="text-red-500" />}
                                </div>
                            </div>
                         ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataShuttlePage;