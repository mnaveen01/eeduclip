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
  Code2,
  Bot,
  Award,
  Cpu,
  Eye,
  Edit3
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { EduclipSession, RoadmapStep } from '../types';
import { decodeSession, encodeSession } from '../utils/sharingEngine';
import { CS_ROLES } from '../data/csRoles';
import { GeminiTutor } from './GeminiTutor';
import { CodeSandbox } from './CodeSandbox';
import { CodeEvaluator } from './CodeEvaluator';
import { InterviewModeModal } from './InterviewModeModal';
import { useProgress } from '../context/ProgressContext';
import { useToast } from '../context/ToastContext';

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

  // Interactive AI Cheatsheet Drawer State
  const [selectedAIPromptType, setSelectedAIPromptType] = useState<
    'cheatsheet' | 'projects' | 'interview' | 'edgecases'
  >('cheatsheet');
  const [copiedPromptType, setCopiedPromptType] = useState<string | null>(null);

  // Student Reflection & Notes State
  const [studentNotes, setStudentNotes] = useState<{ [stepId: string]: string }>({});
  const [notesViewMode, setNotesViewMode] = useState<'edit' | 'preview'>('edit');
  const [activeRightTab, setActiveRightTab] = useState<'roadmap' | 'ai' | 'code' | 'evaluate' | 'notes'>('roadmap');
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [sandboxCode, setSandboxCode] = useState<string>('');
  const [sandboxLang, setSandboxLang] = useState<string>('typescript');

  const { toggleStepCompleted, isStepCompleted } = useProgress();
  const { showToast } = useToast();

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
    const isNowDone = toggleStepCompleted(stepId, activeStep?.title);
    if (isNowDone) {
      showToast('Milestone Completed! 🔥', 'success', activeStep?.title || 'Progress updated');
    } else {
      showToast('Milestone Unmarked', 'info');
    }
  };

  const handleShareSession = () => {
    if (!session) return;
    try {
      const encoded = encodeSession(session);
      const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
      navigator.clipboard.writeText(url);
      showToast('Roadmap Link Copied!', 'success', 'Share this zero-distraction track with peers');
    } catch (e) {
      showToast('Failed to copy share link', 'error');
    }
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
    showToast('Prompt Copied to Clipboard', 'info', 'Ready to paste into Gemini or AI Studio');
    setTimeout(() => setCopiedPromptType(null), 2000);
  };

  const handleLaunchGeminiWithPrompt = () => {
    const text = getActivePromptContent();
    navigator.clipboard.writeText(text);
    showToast('Prompt Copied! Launching AI Studio...', 'success');
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
    showToast('Notes Exported (.md)', 'success');
  };

  if (loading) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6 text-white bg-black">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-mono text-white/50">
          Loading Engineering Track...
        </span>
      </div>
    );
  }

  if (errorMessage || !session) {
    return (
      <div className="w-full min-h-screen bg-black max-w-xl mx-auto px-6 py-20 text-center flex flex-col justify-center items-center">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Session Error</h2>
        <p className="text-xs text-white/60 mb-6">{errorMessage || 'Unable to load video track.'}</p>
        <button
          onClick={onNavigateHome}
          className="px-5 py-2.5 bg-white hover:bg-gray-200 text-black text-xs font-semibold rounded transition-colors"
        >
          Return to Career Roadmaps
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-black text-white min-h-screen pb-20">
      {/* Top Header Bar */}
      <div className="border-b border-white/10 bg-black/80 backdrop-blur-md py-3.5 px-6 sm:px-10 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <div className="text-[11px] font-mono text-white/50 flex items-center gap-2">
                <span>{session.subject || 'Software Engineering'}</span>
                <span>•</span>
                <span>Phase {activeStep?.stepNumber || 1} of {session.allSteps?.length || 1}</span>
              </div>
              <h1 className="text-base font-bold text-white truncate max-w-lg">
                {activeStep?.title || session.title}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Share Link Button */}
            <button
              onClick={handleShareSession}
              className="px-3 py-1.5 border border-white/20 hover:bg-white/10 text-white/70 text-xs font-semibold rounded flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Share this track link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* Mock Interview Button */}
            <button
              onClick={() => setIsInterviewModalOpen(true)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-white" />
              <span>Mock Interview</span>
            </button>

            {/* Export Notes */}
            <button
              onClick={handleExportStudentNotes}
              className="px-3 py-1.5 border border-white/20 hover:bg-white/10 text-white/70 text-xs font-semibold rounded flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Notes</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="px-3 py-1.5 bg-white hover:bg-gray-200 text-black text-xs font-bold rounded transition-colors"
            >
              All Tracks
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
            <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden border-[3px] border-white shadow-[0_0_40px_rgba(255,255,255,0.05)]">
              <iframe
                key={session.videoSource.id}
                src={`https://www.youtube.com/embed/${session.videoSource.id}?enablejsapi=1&rel=0&playsinline=1&autoplay=1`}
                title={activeStep?.title || session.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* Watermark */}
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-[10px] font-mono tracking-widest text-white px-2 py-1 rounded border border-white/20 uppercase">
                Zero Distraction Cinema
              </div>
            </div>

            {/* Stream Assist Link */}
            <div className="flex items-center justify-between text-[11px] text-white/40 px-1">
              <span className="font-mono">
                Channel: {activeStep?.channel || session.creatorName || 'Official Tech Educator'}
              </span>
              <a
                href={session.videoSource.rawUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-white/40 hover:text-white transition-colors"
              >
                <span>Open video on YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Key Concepts Tags */}
            {activeStep?.keyConcepts && (
              <div className="p-4 glass-card rounded-lg border border-white/20">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/70 font-bold block mb-2">
                  Key Architectural Concepts in This Milestone
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeStep.keyConcepts.map((concept) => (
                    <span
                      key={concept}
                      className="px-2.5 py-1 bg-white/10 border border-white/20 text-xs font-mono text-white rounded font-medium shadow-2xs"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* GEMINI AI CHEATSHEET & PROMPT COMPANION */}
            <div className="border border-white/20 glass-card rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-white/20 text-white flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Gemini AI Cheatsheet & Code Companion
                    </h3>
                    <span className="text-[11px] text-white/50">
                      One-click prompt templates calibrated for this milestone
                    </span>
                  </div>
                </div>

                {/* Prompt Type Selector */}
                <div className="flex flex-wrap gap-1 bg-white/5 p-1 border border-white/20 rounded text-xs font-medium">
                  <button
                    onClick={() => setSelectedAIPromptType('cheatsheet')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedAIPromptType === 'cheatsheet'
                        ? 'bg-white text-black font-semibold'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    ⚡ Cheatsheet
                  </button>
                  <button
                    onClick={() => setSelectedAIPromptType('projects')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedAIPromptType === 'projects'
                        ? 'bg-white text-black font-semibold'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    💻 3 Projects
                  </button>
                  <button
                    onClick={() => setSelectedAIPromptType('interview')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedAIPromptType === 'interview'
                        ? 'bg-white text-black font-semibold'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    🎯 FAANG Prep
                  </button>
                  <button
                    onClick={() => setSelectedAIPromptType('edgecases')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedAIPromptType === 'edgecases'
                        ? 'bg-white text-black font-semibold'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    🐞 Edge Cases
                  </button>
                </div>
              </div>

              {/* Prompt Output Card */}
              <div className="bg-black/50 border border-white/20 rounded-lg p-4 mb-4 shadow-inner">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold mb-1.5">
                  Pre-Configured Student Prompt for Google AI Studio / Gemini:
                </label>
                <p className="text-xs text-white font-mono leading-relaxed bg-white/5 p-3 rounded border border-white/10">
                  {getActivePromptContent()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => handleCopyPrompt(selectedAIPromptType)}
                  className="w-full sm:w-1/2 px-4 py-2 bg-black border border-white/20 hover:bg-white/10 text-white text-xs font-semibold rounded flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  {copiedPromptType === selectedAIPromptType ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied Prompt!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/60" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleLaunchGeminiWithPrompt}
                  className="w-full sm:w-1/2 px-4 py-2 bg-white hover:bg-gray-200 text-black text-xs font-bold rounded flex items-center justify-center space-x-2 transition-colors shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Copy & Launch in AI Studio</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 text-black" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Roadmap Step Navigator & Student Notes (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            {/* Tab Controls */}
            <div className="flex items-center border border-white/20 bg-white/5 p-1 rounded-xl text-xs font-medium overflow-x-auto gap-1">
              {[
                { id: 'roadmap', label: 'Milestones', icon: Layers },
                { id: 'ai', label: 'AI Tutor', icon: Bot },
                { id: 'code', label: 'Sandbox', icon: Code2 },
                { id: 'evaluate', label: 'Audit Code', icon: Cpu },
                { id: 'notes', label: 'Notes', icon: FileText },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveRightTab(tab.id as any)}
                  className={`flex-1 py-1.5 text-center rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap px-2.5 cursor-pointer ${
                    activeRightTab === tab.id
                      ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB CONTENT: AI Tutor */}
            {activeRightTab === 'ai' && (
              <div style={{ height: '680px' }}>
                <GeminiTutor
                  contextTitle={activeStep?.title || session.title}
                  contextConcepts={activeStep?.keyConcepts || []}
                  onClose={() => setActiveRightTab('roadmap')}
                />
              </div>
            )}

            {/* TAB CONTENT: Code Sandbox */}
            {activeRightTab === 'code' && (
              <CodeSandbox
                height="680px"
                onCodeChange={(c) => setSandboxCode(c)}
                onEvaluate={(c, lang) => {
                  setSandboxCode(c);
                  setSandboxLang(lang);
                  setActiveRightTab('evaluate');
                }}
              />
            )}

            {/* TAB CONTENT: Code Evaluator */}
            {activeRightTab === 'evaluate' && (
              <div style={{ height: '680px' }} className="border border-white/20 rounded-xl overflow-hidden bg-black">
                <CodeEvaluator
                  code={sandboxCode || '// No code in sandbox yet. Write code in the Sandbox tab or paste here.\n\nfunction solution() {\n  return true;\n}'}
                  language={sandboxLang}
                  contextTitle={activeStep?.title || session.title}
                  contextConcepts={activeStep?.keyConcepts || []}
                />
              </div>
            )}

            {/* TAB CONTENT: Roadmap Steps */}
            {activeRightTab === 'roadmap' && (
              <div className="space-y-3 overflow-y-auto" style={{ maxHeight: '680px' }}>
                {session.allSteps && session.allSteps.length > 0 ? (
                  session.allSteps.map((step, idx) => {
                    const isCurrent = idx === activeStepIndex;
                    const isCompleted = isStepCompleted(step.id);

                    return (
                      <div
                        key={step.id}
                        onClick={() => handleStepChange(idx)}
                        className={`p-4 border rounded-xl transition-all cursor-pointer ${
                          isCurrent
                            ? 'border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.08)] ring-1 ring-white/30'
                            : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center space-x-2 text-[11px] font-mono text-white/50">
                            <span className="font-bold text-white">
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
                            className={`text-xs p-1 rounded-lg transition-colors cursor-pointer ${
                              isCompleted
                                ? 'text-white hover:text-white/80'
                                : 'text-white/30 hover:text-white'
                            }`}
                            title="Toggle completed"
                          >
                            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'fill-white text-black' : ''}`} />
                          </button>
                        </div>

                        <h4 className="text-xs font-bold text-white mb-1 leading-snug">
                          {step.title}
                        </h4>

                        <span className="text-[10px] font-mono text-white/40 block truncate">
                          {step.channel}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 glass-card rounded text-xs text-white/60">
                    Single lesson mode active.
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: Student Journal & Scratchpad with Markdown Preview */}
            {activeRightTab === 'notes' && (
              <div className="border border-white/20 rounded-xl p-4 bg-black flex flex-col" style={{ height: '680px' }}>
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setNotesViewMode('edit')}
                      className={`px-2.5 py-1 text-xs font-mono rounded flex items-center space-x-1 transition-colors ${
                        notesViewMode === 'edit' ? 'bg-white text-black font-bold' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setNotesViewMode('preview')}
                      className={`px-2.5 py-1 text-xs font-mono rounded flex items-center space-x-1 transition-colors ${
                        notesViewMode === 'preview' ? 'bg-white text-black font-bold' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </button>
                  </div>

                  <button
                    onClick={handleExportStudentNotes}
                    className="text-[11px] text-white/70 hover:text-white hover:underline font-mono"
                  >
                    Export .md
                  </button>
                </div>

                {notesViewMode === 'edit' ? (
                  <textarea
                    value={studentNotes[activeStep?.id || 'default'] || ''}
                    onChange={(e) => {
                      const stepId = activeStep?.id || 'default';
                      setStudentNotes((prev) => ({
                        ...prev,
                        [stepId]: e.target.value,
                      }));
                    }}
                    placeholder="# Phase Notes&#10;&#10;Write markdown, Big-O notes, pseudo-code, and reflections here..."
                    className="flex-1 p-3 text-sm font-mono text-white bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-white leading-relaxed resize-none"
                  />
                ) : (
                  <div className="flex-1 p-4 bg-white/5 border border-white/10 rounded-lg overflow-y-auto prose prose-invert prose-sm max-w-none text-white/80">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {studentNotes[activeStep?.id || 'default'] || '_No notes recorded yet. Switch to Edit to write._'}
                    </ReactMarkdown>
                  </div>
                )}

                <div className="mt-3 text-[11px] text-white/30 font-mono flex items-center justify-between">
                  <span>Auto-saved in browser</span>
                  <span>Markdown formatting supported</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mock Interview Modal */}
      <InterviewModeModal
        isOpen={isInterviewModalOpen}
        onClose={() => setIsInterviewModalOpen(false)}
        roleTitle={session.roleName || session.title}
        phaseTitle={activeStep?.title || session.title}
        keyConcepts={activeStep?.keyConcepts || []}
      />
    </div>
  );
};
