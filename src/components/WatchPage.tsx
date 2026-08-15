import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Download,
  Share2,
  Check,
  Copy,
  AlertCircle,
  Layers,
  Sparkles,
  Clock,
  FileText,
  ChevronRight,
  Send,
  RefreshCw,
  ExternalLink,
  Terminal,
  Code2
} from 'lucide-react';
import { EduclipSession, RoadmapStep } from '../types';
import { decodeSession } from '../utils/sharingEngine';
import { CS_ROLES } from '../data/csRoles';

interface WatchPageProps {
  initialBase64Data?: string;
  directSession?: EduclipSession | null;
  onNavigateToWorkspace: (videoUrl?: string) => void;
  onNavigateHome: () => void;
}

export const WatchPage: React.FC<WatchPageProps> = ({
  initialBase64Data,
  directSession,
  onNavigateToWorkspace,
  onNavigateHome,
}) => {
  // Session State
  const [session, setSession] = useState<EduclipSession | null>(directSession || null);
  const [loading, setLoading] = useState<boolean>(!directSession && !!initialBase64Data);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active Roadmap Step & Playback
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [completedStepIds, setCompletedStepIds] = useState<Set<string>>(new Set());

  // Interactive AI Cheatsheet Drawer State
  const [selectedAIPromptType, setSelectedAIPromptType] = useState<
    'cheatsheet' | 'projects' | 'interview' | 'edgecases'
  >('cheatsheet');
  const [copiedPromptType, setCopiedPromptType] = useState<string | null>(null);

  // Student Reflection & Notes State
  const [studentNotes, setStudentNotes] = useState<{ [stepId: string]: string }>({});
  const [activeRightTab, setActiveRightTab] = useState<'roadmap' | 'notes' | 'ai'>('roadmap');

  // Fallback initial session if nothing passed
  useEffect(() => {
    if (directSession) {
      setSession(directSession);
      setLoading(false);
      setErrorMessage(null);
      return;
    }

    let payload = initialBase64Data;
    if (!payload && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      payload = urlParams.get('data') || undefined;
    }

    if (payload) {
      setLoading(true);
      const result = decodeSession(payload);
      if (result.success && result.session) {
        setSession(result.session);
        setErrorMessage(null);
      } else {
        setErrorMessage(result.errorMessage || 'Invalid Roadmap Session Link.');
      }
      setLoading(false);
    } else if (!session) {
      // Default to Full Stack Engineer Track
      const defaultRole = CS_ROLES[0];
      setSession({
        version: '2.0',
        id: defaultRole.id,
        title: defaultRole.title,
        roleName: defaultRole.title,
        subject: defaultRole.category,
        gradeLevel: defaultRole.difficulty,
        creatorName: defaultRole.topCompanyChannels[0],
        videoSource: {
          id: 'W6NZfCO5SIk',
          provider: 'youtube',
          rawUrl: defaultRole.steps[0].youtubeUrl,
          title: defaultRole.steps[0].title,
        },
        activeStep: defaultRole.steps[0],
        allSteps: defaultRole.steps,
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
    }
  }, [initialBase64Data, directSession]);

  const activeStep: RoadmapStep | undefined =
    session?.allSteps && session.allSteps.length > 0
      ? session.allSteps[activeStepIndex]
      : session?.activeStep;

  const handleStepChange = (index: number) => {
    setActiveStepIndex(index);
    if (session?.allSteps && session.allSteps[index]) {
      const step = session.allSteps[index];
      // Extract video ID if YouTube
      const videoMatch = step.youtubeUrl.match(/(?:v=|\/embed\/|\/watch\?v=|\.be\/)([^&?]+)/);
      const videoId = videoMatch ? videoMatch[1] : 'W6NZfCO5SIk';

      setSession((prev) =>
        prev
          ? {
              ...prev,
              activeStep: step,
              videoSource: {
                ...prev.videoSource,
                id: videoId,
                rawUrl: step.youtubeUrl,
                title: step.title,
              },
            }
          : prev
      );
    }
  };

  const handleToggleCompleted = (stepId: string) => {
    setCompletedStepIds((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  };

  // Get active prompt string based on selected tab
  const getActivePromptContent = () => {
    if (!activeStep) return '';
    switch (selectedAIPromptType) {
      case 'cheatsheet':
        return activeStep.geminiPrompts.cheatsheetPrompt;
      case 'projects':
        return activeStep.geminiPrompts.projectPrompt;
      case 'interview':
        return activeStep.geminiPrompts.interviewPrompt;
      case 'edgecases':
        return activeStep.geminiPrompts.edgeCasePrompt;
      default:
        return activeStep.geminiPrompts.cheatsheetPrompt;
    }
  };

  const handleCopyPrompt = (promptType: string) => {
    const text = getActivePromptContent();
    navigator.clipboard.writeText(text);
    setCopiedPromptType(promptType);
    setTimeout(() => setCopiedPromptType(null), 2000);
  };

  const handleLaunchGeminiWithPrompt = () => {
    const text = getActivePromptContent();
    navigator.clipboard.writeText(text);
    window.open('https://aistudio.google.com', '_blank');
  };

  const handleExportStudentNotes = () => {
    if (!session) return;
    let md = `# Engineering Notes: ${session.title}\n`;
    md += `**Track:** ${session.roleName || session.title}\n`;
    md += `**Date:** ${new Date().toLocaleDateString()}\n\n---\n\n`;

    if (session.allSteps) {
      session.allSteps.forEach((step, idx) => {
        md += `## Phase ${step.stepNumber}: ${step.title}\n`;
        md += `- **Channel:** ${step.channel}\n`;
        md += `- **Key Concepts:** ${step.keyConcepts.join(', ')}\n`;
        md += `- **Student Reflection & Code Notes:**\n${studentNotes[step.id] || '_No notes recorded._'}\n\n`;
      });
    }

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${session.title.toLowerCase().replace(/\s+/g, '-')}-notes.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6 text-slate-900">
        <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-mono text-slate-500">
          Loading Engineering Track...
        </span>
      </div>
    );
  }

  if (errorMessage || !session) {
    return (
      <div className="w-full max-w-xl mx-auto px-6 py-20 text-center">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Session Error</h2>
        <p className="text-xs text-slate-600 mb-6">{errorMessage || 'Unable to load video track.'}</p>
        <button
          onClick={onNavigateHome}
          className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded"
        >
          Return to Career Roadmaps
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-slate-900 pb-20">
      {/* Top Header Bar */}
      <div className="border-b border-slate-100 bg-white py-3.5 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2">
                <span>{session.subject || 'Software Engineering'}</span>
                <span>•</span>
                <span>Phase {activeStep?.stepNumber || 1} of {session.allSteps?.length || 1}</span>
              </div>
              <h1 className="text-base font-bold text-slate-900 truncate max-w-lg">
                {activeStep?.title || session.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportStudentNotes}
              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Notes (.md)</span>
            </button>
            <button
              onClick={onNavigateHome}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded transition-colors"
            >
              All 20+ Tracks
            </button>
          </div>
        </div>
      </div>

      {/* Main Cinema & Companion Layout (70 / 30 Split) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Cinema Video Screen & AI Cheatsheet Panel (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            {/* Video Viewport */}
            <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden border border-slate-200 shadow-md">
              <iframe
                key={session.videoSource.id}
                src={`https://www.youtube.com/embed/${session.videoSource.id}?enablejsapi=1&rel=0&playsinline=1&autoplay=1`}
                title={activeStep?.title || session.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* Watermark */}
              <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm text-[10px] font-mono tracking-widest text-emerald-400 px-2 py-1 rounded border border-white/10 uppercase">
                Zero Distraction Cinema
              </div>
            </div>

            {/* Stream Assist Link */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span className="font-mono">
                Channel: {activeStep?.channel || session.creatorName || 'Official Tech Educator'}
              </span>
              <a
                href={session.videoSource.rawUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <span>Open video on YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Key Concepts Tags */}
            {activeStep?.keyConcepts && (
              <div className="p-4 border border-slate-200 bg-slate-50 rounded-lg">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold block mb-2">
                  Key Architectural Concepts in This Milestone
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeStep.keyConcepts.map((concept) => (
                    <span
                      key={concept}
                      className="px-2.5 py-1 bg-white border border-slate-200 text-xs font-mono text-slate-800 rounded font-medium shadow-2xs"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* GEMINI AI CHEATSHEET & PROMPT COMPANION */}
            <div className="border border-indigo-100 bg-indigo-50/30 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Gemini AI Cheatsheet & Code Companion
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      One-click prompt templates calibrated for this milestone
                    </span>
                  </div>
                </div>

                {/* Prompt Type Selector */}
                <div className="flex flex-wrap gap-1 bg-white p-1 border border-slate-200 rounded text-xs font-medium">
                  <button
                    onClick={() => setSelectedAIPromptType('cheatsheet')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedAIPromptType === 'cheatsheet'
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ⚡ Cheatsheet
                  </button>
                  <button
                    onClick={() => setSelectedAIPromptType('projects')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedAIPromptType === 'projects'
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    💻 3 Projects
                  </button>
                  <button
                    onClick={() => setSelectedAIPromptType('interview')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedAIPromptType === 'interview'
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🎯 FAANG Prep
                  </button>
                  <button
                    onClick={() => setSelectedAIPromptType('edgecases')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedAIPromptType === 'edgecases'
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🐞 Edge Cases
                  </button>
                </div>
              </div>

              {/* Prompt Output Card */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4 shadow-inner">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                  Pre-Configured Student Prompt for Google AI Studio / Gemini:
                </label>
                <p className="text-xs text-slate-800 font-mono leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
                  {getActivePromptContent()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => handleCopyPrompt(selectedAIPromptType)}
                  className="w-full sm:w-1/2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  {copiedPromptType === selectedAIPromptType ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied Prompt!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleLaunchGeminiWithPrompt}
                  className="w-full sm:w-1/2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded flex items-center justify-center space-x-2 transition-colors shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                  <span>Copy & Launch in AI Studio</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Roadmap Step Navigator & Student Notes (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            {/* Tab Controls */}
            <div className="flex items-center border border-slate-200 bg-slate-50 p-1 rounded-lg text-xs font-medium">
              <button
                onClick={() => setActiveRightTab('roadmap')}
                className={`flex-1 py-1.5 text-center rounded transition-all ${
                  activeRightTab === 'roadmap'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Track Milestones ({session.allSteps?.length || 1})
              </button>
              <button
                onClick={() => setActiveRightTab('notes')}
                className={`flex-1 py-1.5 text-center rounded transition-all ${
                  activeRightTab === 'notes'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                My Code Journal
              </button>
            </div>

            {/* TAB CONTENT: Roadmap Steps */}
            {activeRightTab === 'roadmap' && (
              <div className="space-y-3">
                {session.allSteps && session.allSteps.length > 0 ? (
                  session.allSteps.map((step, idx) => {
                    const isCurrent = idx === activeStepIndex;
                    const isCompleted = completedStepIds.has(step.id);

                    return (
                      <div
                        key={step.id}
                        onClick={() => handleStepChange(idx)}
                        className={`p-4 border rounded-lg transition-all cursor-pointer ${
                          isCurrent
                            ? 'border-slate-900 bg-white shadow-sm ring-1 ring-slate-900'
                            : 'border-slate-200 bg-white hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500">
                            <span className="font-bold text-slate-900">
                              Phase {step.stepNumber}:
                            </span>
                            <span>{step.duration}</span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleCompleted(step.id);
                            }}
                            className={`text-xs p-1 rounded transition-colors ${
                              isCompleted
                                ? 'text-emerald-600 hover:text-emerald-700'
                                : 'text-slate-300 hover:text-slate-500'
                            }`}
                            title="Mark as completed"
                          >
                            <CheckCircle2 className="w-4 h-4 fill-current" />
                          </button>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900 mb-1 leading-snug">
                          {step.title}
                        </h4>

                        <span className="text-[10px] font-mono text-slate-400 block truncate">
                          {step.channel}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
                    Single lesson mode active.
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: Student Journal & Scratchpad */}
            {activeRightTab === 'notes' && (
              <div className="border border-slate-200 rounded-lg p-4 bg-white flex flex-col h-[500px]">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-slate-600 font-bold">
                    Phase {activeStep?.stepNumber || 1} Notes & Snippets
                  </label>
                  <button
                    onClick={handleExportStudentNotes}
                    className="text-[11px] text-indigo-600 hover:underline font-mono"
                  >
                    Export .md
                  </button>
                </div>

                <textarea
                  value={studentNotes[activeStep?.id || 'default'] || ''}
                  onChange={(e) => {
                    const stepId = activeStep?.id || 'default';
                    setStudentNotes((prev) => ({
                      ...prev,
                      [stepId]: e.target.value,
                    }));
                  }}
                  placeholder="Record your code snippets, algorithm insights, time complexities, and reflections here..."
                  className="flex-1 p-3 text-xs font-mono text-slate-900 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 leading-relaxed resize-none"
                />

                <div className="mt-3 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                  <span>Auto-saved in browser</span>
                  <span>Markdown formatting supported</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
