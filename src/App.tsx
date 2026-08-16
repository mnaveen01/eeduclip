import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { WorkspacePage } from './components/WorkspacePage';
import { WatchPage } from './components/WatchPage';
import { SearchModal } from './components/SearchModal';
import { CSRole, EduclipSession } from './types';
import { decodeSession } from './utils/sharingEngine';
import { CS_ROLES } from './data/csRoles';
import { ToastProvider } from './context/ToastContext';
import { ProgressProvider } from './context/ProgressContext';

function AppContent() {
  const [currentView, setCurrentView] = useState<'home' | 'workspace' | 'watch' | 'news'>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcuts (Ctrl+K or Cmd+K to open search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cinema Session State
  const [directCinemaSession, setDirectCinemaSession] = useState<EduclipSession | null>(null);
  const [initialBase64Data, setInitialBase64Data] = useState<string | undefined>(undefined);

  // Sync with browser URL search parameters on mount
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      const dataParam = params.get('data');

      if (dataParam) {
        setInitialBase64Data(dataParam);
        setCurrentView('watch');
      } else if (viewParam === 'workspace') {
        setCurrentView('workspace');
      } else if (viewParam === 'watch') {
        setCurrentView('watch');
      } else {
        setCurrentView('home');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: 'home' | 'workspace' | 'watch' | 'news', queryData?: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (view === 'home') {
        url.search = '';
      } else if (view === 'workspace') {
        url.searchParams.set('view', 'workspace');
        url.searchParams.delete('data');
      } else if (view === 'watch') {
        url.searchParams.set('view', 'watch');
        if (queryData) {
          url.searchParams.set('data', queryData);
        }
      }
      window.history.pushState({}, '', url.toString());
    }
  };

  // Launch Cinema with selected CS Role
  const handleSelectRoleForCinema = (role: CSRole, stepIndex: number = 0) => {
    const activeStep = role.steps[stepIndex] || role.steps[0];
    const videoMatch = activeStep.youtubeUrl.match(/(?:v=|\/embed\/|\/watch\?v=|\.be\/)([^&?]+)/);
    const videoId = videoMatch ? videoMatch[1] : 'W6NZfCO5SIk';

    const session: EduclipSession = {
      version: '2.0',
      id: role.id,
      title: `${role.title}: Phase ${activeStep.stepNumber}`,
      roleName: role.title,
      subject: role.category,
      gradeLevel: role.difficulty,
      creatorName: activeStep.channel,
      videoSource: {
        id: videoId,
        provider: 'youtube',
        rawUrl: activeStep.youtubeUrl,
        title: activeStep.title,
      },
      activeStep: activeStep,
      allSteps: role.steps,
      createdAt: new Date().toISOString(),
    };

    setDirectCinemaSession(session);
    navigateTo('watch');
  };

  // Handle custom URL input
  const handleLaunchCustomUrl = (url: string) => {
    const videoMatch = url.match(/(?:v=|\/embed\/|\/watch\?v=|\.be\/)([^&?]+)/);
    const videoId = videoMatch ? videoMatch[1] : 'W6NZfCO5SIk';

    const defaultRole = CS_ROLES[0];
    const session: EduclipSession = {
      version: '2.0',
      id: 'custom-stream',
      title: 'Custom Engineering Lecture Stream',
      roleName: 'Custom Coursework',
      subject: 'Computer Science',
      gradeLevel: 'Undergraduate',
      creatorName: 'Web Ingested Video',
      videoSource: {
        id: videoId,
        provider: 'youtube',
        rawUrl: url,
        title: 'Custom Ingested Stream',
      },
      activeStep: defaultRole.steps[0],
      allSteps: defaultRole.steps,
      createdAt: new Date().toISOString(),
    };

    setDirectCinemaSession(session);
    navigateTo('watch');
  };

  return (
    <div className="min-h-screen bg-black font-syne text-white flex flex-col selection:bg-white selection:text-black">
      {/* Universal Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => navigateTo(view)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <LandingPage
            onSelectRole={handleSelectRoleForCinema}
            onLaunchCustomUrl={handleLaunchCustomUrl}
            onNavigateToAIStudio={() => navigateTo('workspace')}
          />
        )}

        {currentView === 'workspace' && (
          <WorkspacePage
            onNavigateHome={() => navigateTo('home')}
            onNavigateWatch={() => navigateTo('watch')}
          />
        )}

        {currentView === 'watch' && (
          <WatchPage
            initialBase64Data={initialBase64Data}
            directSession={directCinemaSession}
            onNavigateToWorkspace={() => navigateTo('workspace')}
            onNavigateHome={() => navigateTo('home')}
          />
        )}
      </main>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectRole={handleSelectRoleForCinema}
        onNavigateToAIStudio={() => navigateTo('workspace')}
      />

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-black py-12 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <span className="text-base font-extrabold tracking-tighter text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              eduloop
            </span>
            <span className="text-xs text-white/30 font-mono">
              © 2026 • Free Open Curriculum for CS Students
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-white/40 font-medium">
            <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
              20+ Career Tracks
            </button>
            <a href="#daily-pulse" onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
              Daily Tech News
            </a>
            <button onClick={() => navigateTo('workspace')} className="hover:text-white transition-colors">
              AI Studio Hub
            </button>
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              aistudio.google.com ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ProgressProvider>
  );
}
