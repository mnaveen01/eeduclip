import React, { useState, useEffect } from 'react';
import { Search, X, Play, Sparkles, Terminal, ArrowRight } from 'lucide-react';
import { CS_ROLES } from '../data/csRoles';
import { DAILY_TECH_NEWS } from '../data/techNews';
import { CSRole } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: CSRole, stepIndex?: number) => void;
  onNavigateToAIStudio: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
  onNavigateToAIStudio,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedRoles = CS_ROLES.filter(
    role =>
      role.title.toLowerCase().includes(query.toLowerCase()) ||
      role.category.toLowerCase().includes(query.toLowerCase()) ||
      role.techStack.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
      role.steps.some(s => s.title.toLowerCase().includes(query.toLowerCase()))
  );

  const matchedNews = DAILY_TECH_NEWS.filter(
    news =>
      news.title.toLowerCase().includes(query.toLowerCase()) ||
      news.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="bg-black border border-white/20 max-w-2xl w-full rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center space-x-3">
          <Search className="w-5 h-5 text-white/40 shrink-0" strokeWidth={1.5} />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search 20+ CS roles, technologies, or tech news..."
            className="flex-1 text-sm text-white bg-transparent focus:outline-none placeholder:text-white/30"
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:block px-1.5 py-0.5 text-[10px] font-mono text-white/30 border border-white/20 rounded">ESC</kbd>
            <button onClick={onClose} className="p-1 text-white/30 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-white/5">
          {matchedRoles.length === 0 && matchedNews.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-white/30 text-sm font-mono">No results for "<span className="text-white/60">{query}</span>"</p>
              <p className="text-white/20 text-xs mt-2">Try: Full Stack, DevOps, AI Engineer, Rust...</p>
            </div>
          ) : (
            <>
              {/* Roles */}
              {matchedRoles.length > 0 && (
                <div className="py-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 font-bold px-4 py-2 block">
                    Career Tracks — {matchedRoles.length} results
                  </span>
                  {matchedRoles.slice(0, 8).map(role => (
                    <div
                      key={role.id}
                      onClick={() => { onSelectRole(role, 0); onClose(); }}
                      className="px-4 py-3 hover:bg-white/5 flex items-center justify-between gap-4 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 shrink-0 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                          <Terminal className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2 text-[10px] text-white/30 mb-0.5 font-mono">
                            <span className="font-bold text-white/60 uppercase">{role.category}</span>
                            <span>•</span>
                            <span>{role.steps.length} Phases</span>
                            <span>•</span>
                            <span>{role.salaryRange}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white truncate group-hover:text-white">{role.title}</h4>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5 text-xs text-white/30 font-semibold shrink-0 group-hover:text-white transition-colors">
                        <span>Launch</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* News */}
              {matchedNews.length > 0 && (
                <div className="py-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 font-bold px-4 py-2 block">
                    Tech News — {matchedNews.length} results
                  </span>
                  {matchedNews.slice(0, 4).map(news => (
                    <div key={news.id} className="px-4 py-3 hover:bg-white/5 flex items-center justify-between gap-4 transition-colors">
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-white/30 block mb-0.5">
                          {news.category} • {news.publishedAt}
                        </span>
                        <h4 className="text-sm font-bold text-white truncate">{news.title}</h4>
                      </div>
                      <a
                        href={news.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-white/40 hover:text-white font-medium shrink-0 transition-colors"
                      >
                        Read →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white/5 border-t border-white/10 flex items-center justify-between text-xs text-white/30">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 border border-white/20 rounded text-[10px] font-mono">↑↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 border border-white/20 rounded text-[10px] font-mono">↵</kbd> open</span>
          </div>
          <button
            onClick={() => { onNavigateToAIStudio(); onClose(); }}
            className="text-white/60 font-semibold hover:text-white flex items-center space-x-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open AI Studio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
