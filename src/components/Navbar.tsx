import React, { useState } from 'react';
import { Search, Compass, Sparkles, MonitorPlay, Terminal, Menu, X, Flame, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface NavbarProps {
  currentView: 'home' | 'workspace' | 'watch' | 'news';
  onNavigate: (view: 'home' | 'workspace' | 'watch' | 'news') => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenSearch }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { streakDays, completedStepIds } = useProgress();

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center justify-between">
        {/* Left: Logo & Brand */}
        <div className="flex items-center space-x-8">
          <button
            id="nav-logo-btn"
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-2.5 focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-shadow">
              <Terminal className="w-4 h-4 text-black" strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tighter text-white block leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                eduloop
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block">
                cs engineering
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-[13px] font-medium text-white/50">
            <button
              id="nav-link-roadmaps"
              onClick={() => onNavigate('home')}
              className={`transition-colors hover:text-white cursor-pointer ${currentView === 'home' ? 'text-white font-semibold' : ''}`}
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
              className="transition-colors hover:text-white flex items-center space-x-1.5"
            >
              <span>Daily Tech News</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </a>
            <button
              id="nav-link-aistudio"
              onClick={() => onNavigate('workspace')}
              className={`transition-colors hover:text-white cursor-pointer flex items-center space-x-1.5 ${currentView === 'workspace' ? 'text-white font-semibold' : ''}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Studio</span>
            </button>
          </nav>
        </div>

        {/* Right: Tab Switcher, Streak & Actions */}
        <div className="flex items-center space-x-3">
          {/* Real-time Student Streak & Completed Milestones Badge */}
          <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono">
            <div className="flex items-center space-x-1 text-white" title={`${streakDays} Day Study Streak`}>
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400/30" />
              <span className="font-bold">{streakDays}d</span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center space-x-1 text-white/70" title={`${completedStepIds.size} Milestones Completed`}>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{completedStepIds.size}</span>
            </div>
          </div>

          {/* Quick Tab Switcher (Desktop) */}
          <div className="hidden lg:flex items-center p-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium">
            <button
              id="tab-tracks-btn"
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 transition-all flex items-center space-x-1.5 cursor-pointer rounded-md ${
                currentView === 'home' ? 'bg-white text-black font-bold' : 'text-white/50 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Roadmaps</span>
            </button>
            <button
              id="tab-workspace-btn"
              onClick={() => onNavigate('workspace')}
              className={`px-3 py-1.5 transition-all flex items-center space-x-1.5 cursor-pointer rounded-md ${
                currentView === 'workspace' ? 'bg-white text-black font-bold' : 'text-white/50 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>AI Studio</span>
            </button>
            <button
              id="tab-watch-btn"
              onClick={() => onNavigate('watch')}
              className={`px-3 py-1.5 transition-all flex items-center space-x-1.5 cursor-pointer rounded-md ${
                currentView === 'watch' ? 'bg-white text-black font-bold' : 'text-white/50 hover:text-white'
              }`}
            >
              <MonitorPlay className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Cinema</span>
            </button>
          </div>

          {/* Search */}
          {onOpenSearch && (
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Search (⌘K)"
            >
              <Search className="w-4 h-4" strokeWidth={1.5} />
            </button>
          )}

          {/* CTA */}
          <button
            id="nav-launch-aistudio-btn"
            onClick={() => onNavigate('workspace')}
            className="hidden sm:flex px-4 py-2 bg-white hover:bg-gray-200 text-black text-xs font-bold tracking-tight transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] items-center space-x-1.5 rounded-lg"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Studio</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white/50 hover:text-white"
            onClick={() => setMobileOpen(p => !p)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 px-6 py-4 space-y-3">
          {[
            { label: '20+ Tech Roles', view: 'home' as const },
            { label: 'AI Studio Hub', view: 'workspace' as const },
            { label: 'Cinema View', view: 'watch' as const },
          ].map(item => (
            <button
              key={item.view}
              onClick={() => { onNavigate(item.view); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentView === item.view ? 'bg-white text-black' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
