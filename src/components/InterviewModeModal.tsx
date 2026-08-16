import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { X, Play, Clock, Sparkles, Send, Award, AlertCircle, CheckCircle2, ChevronRight, HelpCircle, Code2, Bot } from 'lucide-react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';

interface InterviewModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleTitle: string;
  phaseTitle: string;
  keyConcepts: string[];
}

export const InterviewModeModal: React.FC<InterviewModeModalProps> = ({
  isOpen,
  onClose,
  roleTitle,
  phaseTitle,
  keyConcepts,
}) => {
  const [stage, setStage] = useState<'setup' | 'interviewing' | 'feedback'>('setup');
  const [timeRemaining, setTimeRemaining] = useState<number>(30 * 60); // 30 mins
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [interviewerPrompt, setInterviewerPrompt] = useState<string>('');
  const [studentCode, setStudentCode] = useState<string>(
    `// FAANG Coding Round - ${phaseTitle}\n// Write optimal, clean code with Big-O comments:\n\nfunction solution() {\n  // Your implementation\n}\n`
  );
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [hints, setHints] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { showToast } = useToast();

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      showToast("Time's up! Submitting your solution...", 'info');
      handleSubmitInterview();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartInterview = async () => {
    setStage('interviewing');
    setIsTimerRunning(true);
    setInterviewerPrompt('Generating your FAANG technical challenge...');

    try {
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY || '';
      if (!apiKey) {
        setInterviewerPrompt('API key not configured in .env.local.');
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a Principal Engineering Interviewer at Google/Meta. 
Create an authentic, realistic Level 5/Senior Software Engineer coding problem focused on: ${keyConcepts.join(', ')} in the context of "${phaseTitle}".

Output strictly:
### 📌 Problem Description
[Clear problem statement, constraints, and 2 sample test cases with input & output]

### 🎯 Key Evaluation Goals
[What the candidate needs to demonstrate: optimal data structure, time complexity target O(...), clean modular code]`;

      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setInterviewerPrompt(res.text || 'Problem generated.');
    } catch (e: any) {
      setInterviewerPrompt('Error generating interview problem. You may write any algorithmic solution and submit.');
    }
  };

  const handleRequestHint = async () => {
    if (hintLevel >= 3) {
      showToast('Maximum hints reached (Level 3)', 'info');
      return;
    }
    const nextLevel = hintLevel + 1;
    setHintLevel(nextLevel);

    try {
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY || '';
      if (!apiKey) return;

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Based on this interview problem:
${interviewerPrompt}

Provide Hint Level ${nextLevel} of 3:
${nextLevel === 1 ? 'Give a subtle mathematical or algorithmic intuition without spoiling code.' : ''}
${nextLevel === 2 ? 'Recommend the optimal Data Structure or two-pointer/hash approach.' : ''}
${nextLevel === 3 ? 'Give a pseudo-code skeleton structure.' : ''}`;

      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setHints((prev) => [...prev, res.text || 'Hint provided.']);
      showToast(`Hint ${nextLevel} unlocked`, 'info');
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitInterview = async () => {
    setIsTimerRunning(false);
    setIsSubmitting(true);
    setStage('feedback');

    try {
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY || '';
      if (!apiKey) {
        setFeedback('API key required for grading.');
        setIsSubmitting(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the Hiring Committee at a Top-Tier Tech Company evaluating this candidate's live coding round:
Role: ${roleTitle} (${phaseTitle})
Problem Given:
${interviewerPrompt}

Candidate's Code Submission:
\`\`\`typescript
${studentCode}
\`\`\`

Time taken: ${30 - Math.floor(timeRemaining / 60)} minutes.
Hints used: ${hintLevel}/3.

Provide your final Hiring Committee Decision formatted strictly as:

### 🏛️ Hiring Decision & Level
- **Decision:** [STRONG HIRE / HIRE / LEAN HIRE / NO HIRE]
- **Target Level:** [L3 / L4 / L5 Senior / L6 Staff]
- **Overall Score:** [e.g. 94/100]

### 📊 Rubric Breakdown
1. **Algorithmic Correctness & Big-O:** [Score & critique]
2. **Code Cleanliness & Idiomatic Style:** [Score & critique]
3. **Communication & Edge Case Handling:** [Score & critique]

### 🎯 Key Feedback & Actionable Next Steps
[Provide 2 concise points on what to sharpen before the real on-site interview]`;

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      let accumulated = '';
      for await (const chunk of responseStream) {
        accumulated += chunk.text || '';
        setFeedback(accumulated);
      }

      if (accumulated.includes('STRONG HIRE') || accumulated.includes('HIRE')) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#ffffff', '#38bdf8', '#4ade80', '#eab308'],
        });
        showToast('Offer Extended! Strong Performance 🔥', 'success');
      }
    } catch (err: any) {
      setFeedback('Error generating committee feedback: ' + err?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-black border border-white/20 rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>FAANG Live Mock Interview Round</span>
                <span className="px-2 py-0.5 bg-white/10 text-white/70 text-[10px] font-mono rounded">
                  {roleTitle}
                </span>
              </h2>
              <span className="text-[11px] font-mono text-white/40">
                Milestone: {phaseTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {stage === 'interviewing' && (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs font-mono font-bold text-white">
                <Clock className="w-3.5 h-3.5 text-white/70 animate-pulse" />
                <span className={timeRemaining < 300 ? 'text-red-400 font-bold' : ''}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-white/40 hover:text-white transition-colors rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* SETUP STAGE */}
          {stage === 'setup' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Ready for Your 30-Minute Live Coding Round?
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Gemini will simulate a Senior Staff Interviewer. You will receive an authentic technical problem keyed to <strong>{keyConcepts.slice(0, 3).join(', ')}</strong>, write production-ready code in Monaco editor, and receive a formal Hiring Committee assessment.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full text-left">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-[10px] font-mono text-white/40 uppercase block">Time Limit</span>
                  <span className="text-sm font-bold text-white">30 Minutes</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-[10px] font-mono text-white/40 uppercase block">Hint System</span>
                  <span className="text-sm font-bold text-white">3 Progressive</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-[10px] font-mono text-white/40 uppercase block">Assessment</span>
                  <span className="text-sm font-bold text-white">Offer Decision</span>
                </div>
              </div>

              <button
                onClick={handleStartInterview}
                className="px-8 py-3.5 bg-white hover:bg-gray-200 text-black font-bold text-xs rounded-xl flex items-center space-x-2 shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Begin Coding Interview</span>
              </button>
            </div>
          )}

          {/* INTERVIEWING STAGE */}
          {stage === 'interviewing' && (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10 overflow-hidden">
              {/* LEFT: Interviewer Question & Hints (5 cols) */}
              <div className="lg:col-span-5 flex flex-col p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-white/40 font-bold">
                    Problem Specification
                  </span>
                  <button
                    onClick={handleRequestHint}
                    disabled={hintLevel >= 3}
                    className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/20 text-white text-[11px] font-mono rounded flex items-center space-x-1.5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <HelpCircle className="w-3 h-3 text-white" />
                    <span>Get Hint ({3 - hintLevel} left)</span>
                  </button>
                </div>

                {/* Problem output */}
                <div className="prose prose-invert prose-xs text-white/80 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10 max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {interviewerPrompt || 'Generating problem...'}
                  </ReactMarkdown>
                </div>

                {/* Unlocked Hints */}
                {hints.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold block">
                      Unlocked Hints:
                    </span>
                    {hints.map((hint, idx) => (
                      <div key={idx} className="p-3 bg-white/5 border border-white/15 rounded-lg text-xs text-white/80 font-mono">
                        <span className="text-white/40 block mb-1 font-bold">Hint {idx + 1}:</span>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{hint}</ReactMarkdown>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT: Monaco Code Editor & Submission (7 cols) */}
              <div className="lg:col-span-7 flex flex-col overflow-hidden bg-black">
                <div className="p-3 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                  <div className="flex items-center space-x-2">
                    <Code2 className="w-3.5 h-3.5 text-white" />
                    <span>candidate_solution.ts</span>
                  </div>
                  <button
                    onClick={handleSubmitInterview}
                    className="px-4 py-1.5 bg-white hover:bg-gray-200 text-black text-xs font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] cursor-pointer"
                  >
                    Submit Code to Interviewer →
                  </button>
                </div>

                <div className="flex-1 min-h-0">
                  <Editor
                    height="100%"
                    language="typescript"
                    value={studentCode}
                    onChange={(v) => setStudentCode(v || '')}
                    theme="vs-dark"
                    options={{
                      fontSize: 13,
                      fontFamily: '"Fira Code", monospace',
                      minimap: { enabled: false },
                      lineNumbers: 'on',
                      wordWrap: 'on',
                      automaticLayout: true,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* FEEDBACK STAGE */}
          {stage === 'feedback' && (
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 max-w-4xl mx-auto w-full space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mx-auto mb-2 font-bold shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Hiring Committee Deliberation</h3>
                <p className="text-xs text-white/50 font-mono">
                  Autonomous Gemini 2.5 Rubric Assessment
                </p>
              </div>

              {isSubmitting && !feedback && (
                <div className="p-8 bg-white/5 border border-white/10 rounded-xl text-center space-y-3 animate-pulse">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-white/50 font-mono">
                    Hiring Committee is reviewing time complexity, style, and edge cases...
                  </p>
                </div>
              )}

              {feedback && (
                <div className="p-6 bg-white/5 border border-white/15 rounded-2xl prose prose-invert prose-sm max-w-none [&>h3]:text-white [&>h3]:border-b [&>h3]:border-white/10 [&>h3]:pb-2 [&>strong]:text-white animate-in fade-in duration-300">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{feedback}</ReactMarkdown>
                </div>
              )}

              <div className="flex justify-center space-x-4 pt-4">
                <button
                  onClick={() => {
                    setStage('setup');
                    setTimeRemaining(30 * 60);
                    setHints([]);
                    setHintLevel(0);
                    setFeedback('');
                  }}
                  className="px-6 py-2.5 border border-white/20 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Try Another Challenge
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-white hover:bg-gray-200 text-black text-xs font-bold rounded-xl transition-colors"
                >
                  Return to Learning Track
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
