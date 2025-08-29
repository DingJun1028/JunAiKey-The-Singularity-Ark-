
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import OmniNotePage from './pages/OmniNotePage';
import WisdomSanctumPage from './pages/WisdomSanctumPage';
import AgentEvolutionPage from './pages/AgentEvolutionPage';
import MatrixConsolePage from './pages/MatrixConsolePage';
import SummonerNexusPage from './pages/SummonerNexusPage';
import DataShuttlePage from './pages/DataShuttlePage';
import CodexPage from './pages/CodexPage';
import WisdomCrystal from './components/WisdomCrystal';
import SettingsModal from './components/SettingsModal';
import TopNavBar from './components/TopNavBar';
import { useNavigationStore } from './store/navigationStore';
import { realms, sidebarNavItems } from './core/navigation';
import type { RealmId } from './types';

// This component keeps the active realm in sync with the URL path
const RealmSync: React.FC = () => {
    const location = useLocation();
    const setActiveRealmId = useNavigationStore(state => state.setActiveRealmId);

    useEffect(() => {
        const currentPath = location.pathname;
        for (const realm of realms) {
            const navItems = sidebarNavItems[realm.id] || [];
            if (navItems.some(item => currentPath === item.path || (currentPath === '/' && item.path === '/'))) {
                setActiveRealmId(realm.id);
                return;
            }
        }
    }, [location.pathname, setActiveRealmId]);

    return null; // This component does not render anything
};


const App: React.FC = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    // Load API key from local storage on initial load
    const savedApiKey = localStorage.getItem('junaikey-gemini-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleApiKeySaved = (newApiKey: string) => {
    setApiKey(newApiKey);
  };

  return (
    <HashRouter>
      <RealmSync />
      <div className="flex h-screen bg-matrix-bg-2 font-sans">
        <Sidebar onOpenSettings={() => setIsSettingsModalOpen(true)} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-matrix-bg/50 backdrop-blur-sm border-b border-matrix-dark/20 p-4 flex justify-between items-center">
             <div className="flex-shrink-0">
                <h2 className="text-2xl font-bold text-matrix-green tracking-widest">JUNAIKEY</h2>
                <p className="text-sm text-matrix-dark">#OmniKey</p>
             </div>
            <TopNavBar />
          </header>
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/notes" element={<OmniNotePage />} />
              <Route path="/sanctum" element={<WisdomSanctumPage />} />
              <Route path="/evolution" element={<AgentEvolutionPage />} />
              <Route path="/codex" element={<CodexPage />} />
              <Route path="/shuttle" element={<DataShuttlePage />} />
              <Route path="/console" element={<MatrixConsolePage apiKey={apiKey} />} />
              <Route path="/nexus" element={<SummonerNexusPage />} />
            </Routes>
          </div>
        </main>
        <WisdomCrystal />
        <SettingsModal 
            isOpen={isSettingsModalOpen}
            onClose={() => setIsSettingsModalOpen(false)}
            onApiKeySaved={handleApiKeySaved}
            currentApiKey={apiKey}
        />
      </div>
    </HashRouter>
  );
};

export default App;
