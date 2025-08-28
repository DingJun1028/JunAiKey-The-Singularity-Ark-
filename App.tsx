
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import OmniNotePage from './pages/OmniNotePage';
import WisdomSanctumPage from './pages/WisdomSanctumPage';
import AgentEvolutionPage from './pages/AgentEvolutionPage';
import MatrixConsolePage from './pages/MatrixConsolePage';
import { APP_TITLE } from './constants';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex h-screen bg-matrix-bg-2 font-sans">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-matrix-bg/50 backdrop-blur-sm border-b border-matrix-dark/20 p-4">
            <h1 className="text-xl font-bold text-matrix-cyan tracking-wider">{APP_TITLE}</h1>
          </header>
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/notes" element={<OmniNotePage />} />
              <Route path="/sanctum" element={<WisdomSanctumPage />} />
              <Route path="/evolution" element={<AgentEvolutionPage />} />
              <Route path="/console" element={<MatrixConsolePage />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
