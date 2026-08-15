import React from 'react';
import { Search, Compass, Sparkles, MonitorPlay, Newspaper, Terminal } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'workspace' | 'watch' | 'news';
  onNavigate: (view: 'home' | 'workspace' | 'watch' | 'news') => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenSearch }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
        {/* Left: Minimalist Logo & Brand */}
        <div className="flex items-center space-x-10">
          <button
            id="nav-logo-btn"
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-white">
              <Terminal className="w-4 h-4 text-emerald-400" strokeWidth={2} />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tighter text-slate-900 block leading-tight">
                educlip.cs
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                Engineering Roadmaps
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-[13px] font-medium text-slate-500">
            <button
              id="nav-link-roadmaps"
              onClick={() => onNavigate('home')}
              className={`transition-colors hover:text-slate-900 cursor-pointer ${
                currentView === 'home' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              20+ Tech Roles
            </button>
            <a
              href="#daily-pulse"
              onClick={(e) => {
                if (currentView !== 'home') {
                  e.preventDefault();
                  onNavigate('home');
                  setTimeout(() => {
                    document.getElementById('daily-pulse')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="transition-colors hover:text-slate-900 flex items-center space-x-1.5"
            >
              <span>Daily Tech News</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </a>
            <button
              id="nav-link-aistudio"
              onClick={() => onNavigate('workspace')}
              className={`transition-colors hover:text-slate-900 cursor-pointer flex items-center space-x-1.5 ${
                currentView === 'workspace' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Google AI Studio</span>
            </button>
          </nav>
        </div>

        {/* Right: Mode Switcher & Direct Action */}
        <div className="flex items-center space-x-3">
          {/* Quick Tab Switcher */}
          <div className="hidden lg:flex items-center p-1 bg-white border border-slate-100 rounded text-xs font-medium">
            <button
              id="tab-tracks-btn"
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 transition-all flex items-center space-x-1.5 cursor-pointer rounded-sm ${
                currentView === 'home'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Roadmaps</span>
            </button>
            <button
              id="tab-workspace-btn"
              onClick={() => onNavigate('workspace')}
              className={`px-3 py-1.5 transition-all flex items-center space-x-1.5 cursor-pointer rounded-sm ${
                currentView === 'workspace'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" strokeWidth={1.5} />
              <span>AI Studio Hub</span>
            </button>
            <button
              id="tab-watch-btn"
              onClick={() => onNavigate('watch')}
              className={`px-3 py-1.5 transition-all flex items-center space-x-1.5 cursor-pointer rounded-sm ${
                currentView === 'watch'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <MonitorPlay className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Cinema View</span>
            </button>
          </div>

          {/* Quick Search Button */}
          {onOpenSearch && (
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors cursor-pointer"
              title="Search tech roles and keywords"
            >
              <Search className="w-4 h-4" strokeWidth={1.5} />
            </button>
          )}

          {/* Direct CTA */}
          <button
            id="nav-launch-aistudio-btn"
            onClick={() => onNavigate('workspace')}
            className="px-4 py-2 border border-slate-900 bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer shadow-sm flex items-center space-x-1.5 rounded"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Studio for Students</span>
          </button>
        </div>
      </div>
    </header>
  );
};
