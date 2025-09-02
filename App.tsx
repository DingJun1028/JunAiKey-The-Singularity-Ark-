<<<<<<< HEAD

=======
>>>>>>> feature-branch
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
import LayoutCustomizationPage from './pages/LayoutCustomizationPage';
import ThemeCustomizationPage from './pages/ThemeCustomizationPage';
import WisdomCrystal from './components/WisdomCrystal';
import SettingsModal from './components/SettingsModal';
<<<<<<< HEAD
import Header from './components/Header';
=======
import TopNavBar from './components/TopNavBar';
>>>>>>> feature-branch
import { useNavigationStore } from './store/navigationStore';
import { realms as defaultRealms } from './core/navigation';
import { useNoteStore } from './store/noteStore';
import { useProposalStore } from './store/proposalStore';
import { useSummonerStore } from './store/summonerStore';
import { useCustomizationStore } from './store/customizationStore';
import AitablePage from './pages/AitablePage';
import { useOmniClipboardStore } from './store/omniClipboardStore';
import { useThemeStore } from './store/themeStore';
import EcosystemPage from './pages/EcosystemPage';
import ContributionPage from './pages/ContributionPage';
<<<<<<< HEAD
import { useApiKeyStore } from './store/apiKeyStore';
import DeckBuilderPage from './pages/DeckBuilderPage';
import CardCodexPage from './pages/CardCodexPage';
import { useInsightStore } from './store/insightStore';
import { useUiStore } from './store/uiStore';
import CardTemplatePage from './pages/CardTemplatePage';
// FIX: Import 'useDeckStore' to resolve 'Cannot find name' error.
import { useDeckStore } from './store/deckStore';
=======
>>>>>>> feature-branch


// This component keeps the active realm in sync with the URL path
const RealmSync: React.FC = () => {
    const location = useLocation();
    const setActiveRealmId = useNavigationStore(state => state.setActiveRealmId);
    const { sidebarOrders } = useCustomizationStore();

    useEffect(() => {
        // This effect pre-initializes the stores to avoid hydration errors on first load
        // by making sure the client has the state before rendering dependent components.
        useNoteStore.getState();
        useProposalStore.getState();
        useSummonerStore.getState();
        useCustomizationStore.getState();
        useOmniClipboardStore.getState();
        useThemeStore.getState();
<<<<<<< HEAD
        useDeckStore.getState();
        useInsightStore.getState();
        useUiStore.getState();
        useApiKeyStore.getState().actions.loadApiKey(); // Initialize API Key store
=======
>>>>>>> feature-branch
    }, []);

    useEffect(() => {
        const currentPath = location.pathname;
        for (const realm of defaultRealms) {
            const navItems = sidebarOrders[realm.id] || [];
            if (navItems.some(item => currentPath.startsWith(item.path) && (item.path !== '/' || currentPath === '/'))) {
                setActiveRealmId(realm.id);
                return;
            }
        }
    }, [location.pathname, setActiveRealmId, sidebarOrders]);

    return null; // This component does not render anything
};

const ThemeSync: React.FC = () => {
    const theme = useThemeStore(state => state.theme);

    useEffect(() => {
        const root = document.documentElement;
        if (!root) return;

        // Set colors as CSS variables
<<<<<<< HEAD
// FIX: Cast `value` to string as it's inferred as `unknown` from Object.entries.
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value as string);
        });

        // Set fonts as CSS variables
// FIX: Cast `value` to string as it's inferred as `unknown` from Object.entries.
        Object.entries(theme.fonts).forEach(([key, value]) => {
            root.style.setProperty(`--font-${key}`, value as string);
=======
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

        // Set fonts as CSS variables
        Object.entries(theme.fonts).forEach(([key, value]) => {
            root.style.setProperty(`--font-${key}`, value);
>>>>>>> feature-branch
        });
    }, [theme]);

    return null;
}

const App: React.FC = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
<<<<<<< HEAD
  const { isSidebarCollapsed } = useUiStore();
=======
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    // Load API key from local storage on initial load
    const savedApiKey = localStorage.getItem('junaikey-gemini-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleApiKeySaved = (newApiKey: string) => {
    localStorage.setItem('junaikey-gemini-api-key', newApiKey);
    setApiKey(newApiKey);
  };
>>>>>>> feature-branch

  return (
    <HashRouter>
      <RealmSync />
      <ThemeSync />
      <div className="flex h-screen bg-matrix-bg-2 font-sans">
        <Sidebar onOpenSettings={() => setIsSettingsModalOpen(true)} />
<<<<<<< HEAD
        <div 
            className="flex-1 flex flex-col overflow-hidden transition-all duration-300"
            style={{ marginLeft: isSidebarCollapsed ? '5rem' : '18rem' }}
        >
          <Header />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
=======
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-matrix-bg/50 backdrop-blur-sm border-b border-matrix-dark/20 p-4 flex justify-between items-center z-20">
             <div className="flex-shrink-0">
                <h2 className="text-2xl font-bold text-matrix-green tracking-widest">JUNAIKEY</h2>
                <p className="text-sm text-matrix-dark">#OmniCard</p>
             </div>
            <TopNavBar />
          </header>
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
>>>>>>> feature-branch
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/aitable" element={<AitablePage />} />
              <Route path="/notes" element={<OmniNotePage />} />
              <Route path="/sanctum" element={<WisdomSanctumPage />} />
              <Route path="/evolution" element={<AgentEvolutionPage />} />
              <Route path="/codex" element={<CodexPage />} />
              <Route path="/shuttle" element={<DataShuttlePage />} />
<<<<<<< HEAD
              <Route path="/console" element={<MatrixConsolePage />} />
              <Route path="/nexus" element={<SummonerNexusPage />} />
              <Route path="/deck-builder" element={<DeckBuilderPage />} />
              <Route path="/cards" element={<CardCodexPage />} />
              <Route path="/card-templates" element={<CardTemplatePage />} />
=======
              <Route path="/console" element={<MatrixConsolePage apiKey={apiKey} />} />
              <Route path="/nexus" element={<SummonerNexusPage />} />
>>>>>>> feature-branch
              <Route path="/layout" element={<LayoutCustomizationPage />} />
              <Route path="/theme" element={<ThemeCustomizationPage />} />
              <Route path="/partners/ecosystem" element={<EcosystemPage />} />
              <Route path="/partners/contribution" element={<ContributionPage />} />
            </Routes>
<<<<<<< HEAD
          </main>
        </div>
=======
          </div>
        </main>
>>>>>>> feature-branch
        <WisdomCrystal />
        <SettingsModal 
            isOpen={isSettingsModalOpen}
            onClose={() => setIsSettingsModalOpen(false)}
<<<<<<< HEAD
=======
            onApiKeySaved={handleApiKeySaved}
            currentApiKey={apiKey}
>>>>>>> feature-branch
        />
      </div>
    </HashRouter>
  );
};

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> feature-branch
