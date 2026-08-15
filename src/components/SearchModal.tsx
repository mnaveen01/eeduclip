import React, { useState, useEffect } from 'react';
import { Search, X, Play, Sparkles, BookOpen, Newspaper, Terminal } from 'lucide-react';
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
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedRoles = CS_ROLES.filter((role) =>
    role.title.toLowerCase().includes(query.toLowerCase()) ||
    role.category.toLowerCase().includes(query.toLowerCase()) ||
    role.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
    role.steps.some((s) => s.title.toLowerCase().includes(query.toLowerCase()))
  );

  const matchedNews = DAILY_TECH_NEWS.filter((news) =>
    news.title.toLowerCase().includes(query.toLowerCase()) ||
    news.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-white border border-slate-200 max-w-2xl w-full rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center space-x-3">
          <Search className="w-5 h-5 text-slate-400" strokeWidth={1.5} />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 20+ CS roles, technologies, or daily tech news..."
            className="flex-1 text-sm text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-900 text-xs font-semibold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 p-2">
          {matchedRoles.length === 0 && matchedNews.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400">
              No matching tech roles or news articles found for "{query}".
            </div>
          ) : (
            <>
              {/* Roles Section */}
              {matchedRoles.length > 0 && (
                <div className="py-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold px-3 block mb-1">
                    Computer Science Career Tracks ({matchedRoles.length})
                  </span>
                  {matchedRoles.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => {
                        onSelectRole(role, 0);
                        onClose();
                      }}
                      className="p-3 hover:bg-slate-50 flex items-center justify-between gap-4 transition-colors rounded-lg cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                          <Terminal className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2 text-[10px] text-slate-400 mb-0.5 font-mono">
                            <span className="font-bold text-slate-900 uppercase">{role.category}</span>
                            <span>•</span>
                            <span>{role.steps.length} Phases</span>
                            <span>•</span>
                            <span>{role.salaryRange}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {role.title}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 text-xs text-slate-700 font-semibold shrink-0">
                        <span>Launch Track</span>
                        <Play className="w-3 h-3 fill-current text-slate-900" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* News Section */}
              {matchedNews.length > 0 && (
                <div className="py-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold px-3 block mb-1">
                    Daily Tech News ({matchedNews.length})
                  </span>
                  {matchedNews.map((news) => (
                    <div
                      key={news.id}
                      className="p-3 hover:bg-slate-50 flex items-center justify-between gap-4 transition-colors rounded-lg"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                          {news.category} • {news.publishedAt}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {news.title}
                        </h4>
                      </div>
                      <a
                        href={news.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-500 hover:text-slate-900 font-medium shrink-0"
                      >
                        Read
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Press ESC to close</span>
          <button
            onClick={() => {
              onNavigateToAIStudio();
              onClose();
            }}
            className="text-indigo-600 font-semibold hover:underline flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Google AI Studio Hub</span>
          </button>
        </div>
      </div>
    </div>
  );
};
