import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  Sparkles,
  Play,
  Terminal,
  Layers,
  Cpu,
  ShieldCheck,
  Code2,
  Newspaper,
  ChevronRight,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  SlidersHorizontal,
  Clock,
  Briefcase,
  Share2
} from 'lucide-react';
import { CS_ROLES, CS_ROLE_CATEGORIES } from '../data/csRoles';
import { DAILY_TECH_NEWS, TECH_NEWS_CATEGORIES } from '../data/techNews';
import { CSRole, RoadmapStep } from '../types';
import { DigitalMesh } from './DigitalMesh';
import { useProgress } from '../context/ProgressContext';

interface LandingPageProps {
  onSelectRole: (role: CSRole, stepIndex?: number) => void;
  onLaunchCustomUrl: (url: string) => void;
  onNavigateToAIStudio: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectRole,
  onLaunchCustomUrl,
  onNavigateToAIStudio,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Tracks');
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<string>('All News');
  const [activeRoleModal, setActiveRoleModal] = useState<CSRole | null>(null);
  const [customInputUrl, setCustomInputUrl] = useState('');
  const { getRoleProgress } = useProgress();

  // Filtered Roles
  const filteredRoles = useMemo(() => {
    return CS_ROLES.filter((role) => {
      const matchesCategory =
        selectedCategory === 'All Tracks' || role.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
        role.topCompanyChannels.some((ch) => ch.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Filtered News
  const filteredNews = useMemo(() => {
    return DAILY_TECH_NEWS.filter((item) => {
      return selectedNewsCategory === 'All News' || item.category === selectedNewsCategory;
    });
  }, [selectedNewsCategory]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInputUrl.trim()) {
      onLaunchCustomUrl(customInputUrl.trim());
    }
  };

  return (
    <div className="w-full bg-black text-white pb-20 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center pt-16 pb-14 border-b border-white/10 overflow-hidden">
        <DigitalMesh />
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6 sm:px-10">
          
          <div className="glass-card p-10 sm:p-14 rounded-3xl flex flex-col items-center shadow-2xl w-full">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white/10 border border-white/20 text-xs font-mono tracking-widest text-white uppercase mb-8 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span>20+ Tech Career Pathways • Powered by Google AI Studio</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              From Scratch to Pro.
              <span className="block text-white/70 font-normal mt-3 text-3xl sm:text-4xl">
                For Computer Science Students.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 font-normal max-w-2xl leading-relaxed mb-10">
              Master software engineering, AI, distributed systems, and design with curated,
              ad-free video roadmaps from top tech companies. Generate instant AI cheat sheets and practice projects on demand.
            </p>

            {/* Quick Search and Ingest Input */}
            <div className="w-full max-w-2xl mb-8">
              <form
                onSubmit={handleCustomSubmit}
                className="flex flex-col sm:flex-row items-center border border-white/20 bg-black/40 backdrop-blur-xl p-2 shadow-inner transition-all focus-within:border-white focus-within:ring-1 focus-within:ring-white rounded-xl"
              >
                <div className="flex items-center flex-1 w-full px-4 py-2.5">
                  <Search className="w-5 h-5 text-white/50 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 20+ roles (e.g. Full Stack, AI Engineer, DevOps)..."
                    className="w-full bg-transparent text-base text-white placeholder-white/50 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (filteredRoles.length > 0) {
                      setActiveRoleModal(filteredRoles[0]);
                    }
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-200 text-black text-sm font-bold tracking-wide transition-colors flex items-center justify-center space-x-2 rounded-lg mt-2 sm:mt-0"
                >
                  <span>Explore Tracks</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Key Stats Bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-mono text-white/60 pt-6 border-t border-white/10 w-full">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>21 Specialized CS Tracks</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Zero-Distraction Cinema</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span>Gemini Cheatsheets</span>
              </div>
              <div className="flex items-center space-x-2">
                <Newspaper className="w-4 h-4 text-white" />
                <span>Daily Tech News</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DAILY TECH NEWS */}
      <section id="daily-pulse" className="max-w-7xl mx-auto px-6 sm:px-10 py-14 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-white font-semibold mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Daily Tech Pulse</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Computer Science & Developer News
            </h2>
            <p className="text-sm text-white/50 mt-1 max-w-xl">
              Stay ahead with curated daily breakthroughs in AI, frameworks, cloud architecture, and open-source tooling.
            </p>
          </div>

          {/* News Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {TECH_NEWS_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedNewsCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors rounded ${
                  selectedNewsCategory === cat
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="glass-card p-6 hover:bg-white/10 transition-all flex flex-col justify-between rounded-xl"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-white/40 mb-3">
                  <span className="px-2 py-0.5 bg-white/10 text-white/70 font-semibold rounded">
                    {news.category}
                  </span>
                  <span>{news.publishedAt}</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug mb-2.5">
                  {news.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mb-4">
                  {news.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="bg-white/5 p-3 rounded text-[11px] text-white/60 mb-3">
                  <span className="font-semibold text-white block mb-0.5 font-mono">
                    🎓 Student Impact:
                  </span>
                  {news.impactForStudents}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-white/30">{news.source}</span>
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-white font-semibold hover:underline"
                  >
                    <span>Read Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CAREER TRACKS CATALOG */}
      <section id="role-catalog" className="max-w-7xl mx-auto px-6 sm:px-10 py-14 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-white/60 font-semibold mb-2">
              <Terminal className="w-3.5 h-3.5 text-white" />
              <span>Curriculum Roadmaps</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              20+ Tech Careers: Scratch to Pro
            </h2>
            <p className="text-sm text-white/50 mt-1 max-w-xl">
              Step-by-step master tracks curated from Google Developers, Meta Open Source, Microsoft, and premier university archives.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {CS_ROLE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors rounded ${
                  selectedCategory === category
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRoles.map((role) => {
            const progress = getRoleProgress(role.steps.map((s) => s.id));

            return (
              <div
                key={role.id}
                className="glass-card hover:bg-white/10 transition-all duration-200 flex flex-col justify-between rounded-xl group border border-white/10 hover:border-white/30"
              >
                <div className="p-6">
                  {/* Header Meta */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-0.5 bg-white/10 text-white/80 font-mono text-[11px] font-semibold rounded">
                      {role.category}
                    </span>
                    <span className="text-white/30 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {role.estTimeToMaster}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed mb-4 line-clamp-2">
                    {role.shortDescription}
                  </p>

                  {/* Progress bar if student started */}
                  {progress.completed > 0 && (
                    <div className="mb-4 p-2.5 bg-white/5 border border-white/10 rounded-lg">
                      <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-1.5">
                        <span className="text-white font-bold">{progress.completed} of {progress.total} Completed</span>
                        <span>{progress.percentage}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white transition-all duration-500 rounded-full"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {role.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-white/5 border border-white/15 text-[10px] font-mono text-white/60 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {role.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-white/30">
                        +{role.techStack.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Top Channels */}
                  <div className="text-[11px] text-white/40 font-mono flex items-center gap-1.5 border-t border-white/10 pt-3">
                    <span className="text-white/20">Channels:</span>
                    <span className="text-white/60 font-medium truncate">
                      {role.topCompanyChannels.slice(0, 2).join(', ')}
                    </span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="px-6 py-3.5 bg-white/5 border-t border-white/10 flex items-center justify-between rounded-b-xl">
                  <button
                    onClick={() => setActiveRoleModal(role)}
                    className="text-xs font-semibold text-white/60 hover:text-white flex items-center space-x-1 cursor-pointer transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Roadmap ({role.steps.length} Steps)</span>
                  </button>

                  <button
                    onClick={() => onSelectRole(role, 0)}
                    className="px-3 py-1.5 bg-white hover:bg-gray-200 text-black text-xs font-bold flex items-center space-x-1.5 rounded transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{progress.completed > 0 ? 'Continue Track' : 'Start Phase 1'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. GOOGLE AI STUDIO STUDENT SPOTLIGHT SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="bg-slate-950 text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 text-emerald-400 text-xs font-mono uppercase tracking-widest rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Developer Companion</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Supercharge Your CS Studies with Google AI Studio
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Google AI Studio is the fastest platform for computer science students to test system prompts,
              refactor 10,000-line codebases with Gemini 2.5, generate structured JSON APIs, and export production code for free.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <h4 className="text-sm font-bold text-white mb-1">⚡ Instant Code Review</h4>
                <p className="text-xs text-slate-400">
                  Analyze Big-O time complexity, race conditions, and clean architecture directly in the browser.
                </p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <h4 className="text-sm font-bold text-white mb-1">🧠 Mock Interview Simulator</h4>
                <p className="text-xs text-slate-400">
                  Practice live 45-minute FAANG coding rounds with progressive hints and algorithmic rubric grading.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onNavigateToAIStudio}
                className="px-6 py-3 bg-white text-slate-950 hover:bg-slate-100 text-xs font-bold tracking-wide uppercase transition-colors rounded shadow flex items-center space-x-2"
              >
                <span>Open AI Studio Workspace</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <a
                href="https://aistudio.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 text-xs font-bold tracking-wide uppercase transition-colors rounded flex items-center space-x-2"
              >
                <span>Launch aistudio.google.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ROLE ROADMAP MODAL */}
      {activeRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-black border border-white/20 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.9)]">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-white/40 mb-1">
                  <span className="px-2 py-0.5 bg-white/10 text-white/70 rounded font-semibold">
                    {activeRoleModal.category}
                  </span>
                  <span>•</span>
                  <span>{activeRoleModal.difficulty}</span>
                  <span>•</span>
                  <span>{activeRoleModal.salaryRange}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {activeRoleModal.title} Roadmap
                </h3>
              </div>
              <button
                onClick={() => setActiveRoleModal(null)}
                className="p-2 text-white/30 hover:text-white text-lg font-mono transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Steps List */}
            <div className="p-6 overflow-y-auto space-y-3 flex-1">
              <p className="text-sm text-white/60 mb-5 leading-relaxed">
                {activeRoleModal.fullOverview}
              </p>

              <h4 className="text-xs font-mono uppercase tracking-widest text-white/30 font-bold mb-3">
                Sequential Learning Milestones ({activeRoleModal.steps.length} Phases)
              </h4>

              {activeRoleModal.steps.map((step, idx) => (
                <div
                  key={step.id}
                  className="p-4 border border-white/10 rounded-xl hover:border-white/30 transition-colors bg-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-white/40 mb-1">
                      <span className="font-bold text-white">Phase {step.stepNumber}:</span>
                      <span className="px-1.5 py-0.5 bg-white/10 text-white/70 rounded">
                        {step.phase}
                      </span>
                      <span>•</span>
                      <span>{step.duration}</span>
                      <span>•</span>
                      <span className="text-white/30">{step.channel}</span>
                    </div>

                    <h5 className="text-sm font-bold text-white mb-1">
                      {step.title}
                    </h5>

                    <p className="text-xs text-white/60 mb-2">
                      {step.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {step.keyConcepts.map((kc) => (
                        <span
                          key={kc}
                          className="px-1.5 py-0.5 bg-white/5 border border-white/15 text-[10px] text-white/60 rounded font-mono"
                        >
                          {kc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      onClick={() => {
                        const role = activeRoleModal;
                        setActiveRoleModal(null);
                        onSelectRole(role, idx);
                      }}
                      className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-gray-200 text-black text-xs font-bold rounded flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Watch & AI Tools</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white/5 border-t border-white/10 flex items-center justify-between rounded-b-2xl">
              <span className="text-[11px] font-mono text-white/30">
                100% Free & Open Source Video Roadmaps
              </span>
              <button
                onClick={() => {
                  const role = activeRoleModal;
                  setActiveRoleModal(null);
                  onSelectRole(role, 0);
                }}
                className="px-5 py-2 bg-white hover:bg-gray-200 text-black text-xs font-bold rounded flex items-center space-x-2 transition-colors"
              >
                <span>Start Full Track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
