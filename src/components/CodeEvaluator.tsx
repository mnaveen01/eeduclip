import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, CheckCircle2, AlertTriangle, Cpu, ShieldCheck, RefreshCw, Send, ArrowRight, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useProgress } from '../context/ProgressContext';
import { useToast } from '../context/ToastContext';

interface CodeEvaluatorProps {
  code: string;
  language: string;
  contextTitle: string;
  contextConcepts: string[];
}

export const CodeEvaluator: React.FC<CodeEvaluatorProps> = ({
  code,
  language,
  contextTitle,
  contextConcepts,
}) => {
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { incrementEvaluations } = useProgress();
  const { showToast } = useToast();

  const handleEvaluateCode = async () => {
    if (!code.trim()) {
      showToast('Please enter some code to evaluate', 'error');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setEvaluation('');

    try {
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY || '';
      if (!apiKey) {
        setErrorMessage('Gemini API key is not configured in .env.local.');
        showToast('API Key Required in .env.local', 'error');
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });

      const evaluationPrompt = `You are a Principal Staff Engineer at a Tier-1 tech company conducting a rigorous code review for an engineer learning "${contextTitle}".
Key concepts of this milestone: ${contextConcepts.join(', ')}.

Evaluate this ${language} code submission:
\`\`\`${language}
${code}
\`\`\`

Provide your review formatted STRICTLY in the following structured Markdown sections:

### 🏆 Milestone Score & Readiness
- **Score:** [Give score e.g., 92/100]
- **Status:** [Ready for Production / Needs Refactoring / Algorithmic Revision Required]
- **Verdict:** [1 sentence high-level assessment]

### ⚡ Algorithmic & Big-O Complexity
- **Time Complexity:** O(...) [explain why]
- **Space Complexity:** O(...) [explain auxiliary space]

### 🔍 Architectural Strengths & Flaws
- **Strengths:** [What was done cleanly and idiomatically]
- **Flaws / Anti-Patterns:** [Identify code smells, memory leaks, or race conditions if any]

### 🐞 Unhandled Edge Cases
- [List 2-3 specific edge inputs that might break this code e.g., empty inputs, overflow, nulls, concurrency]

### 💡 Optimal Industry Refactoring
\`\`\`${language}
// Refactored, production-hardened version with comments:
[Provide the clean version]
\`\`\`

Be direct, high-signal, and educational.`;

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: evaluationPrompt,
      });

      let accumulated = '';
      for await (const chunk of responseStream) {
        accumulated += chunk.text || '';
        setEvaluation(accumulated);
      }

      incrementEvaluations();
      showToast('AI Code Evaluation Complete! 🔥', 'success');
    } catch (err: any) {
      console.error('Code evaluation error:', err);
      setErrorMessage(err?.message || 'Failed to evaluate code with Gemini.');
      showToast('Evaluation failed. Check API key.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-white p-4 space-y-4 overflow-y-auto">
      {/* Header Banner */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-white/50 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>AI Code Auditor • {contextTitle}</span>
          </div>
          <h3 className="text-sm font-bold text-white">
            Grade My Code & Architectural Rubric
          </h3>
        </div>

        <button
          onClick={handleEvaluateCode}
          disabled={isLoading || !code.trim()}
          className="px-4 py-2 bg-white hover:bg-gray-200 disabled:bg-white/20 disabled:cursor-not-allowed text-black text-xs font-bold rounded-lg flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] shrink-0 cursor-pointer"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Syntax & Big-O...</span>
            </>
          ) : (
            <>
              <Cpu className="w-3.5 h-3.5" />
              <span>Evaluate Submission</span>
            </>
          )}
        </button>
      </div>

      {/* Error state */}
      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs">
          <p className="font-bold mb-1">Evaluation Error:</p>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Empty State */}
      {!evaluation && !isLoading && !errorMessage && (
        <div className="p-8 border border-dashed border-white/10 rounded-xl text-center space-y-3 my-auto">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/40">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            Ready for Automated Grading
          </h4>
          <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
            Write your solution in the <strong>Sandbox</strong> tab or paste your implementation. Click <strong>"Evaluate Submission"</strong> to get instant FAANG-caliber code review, Big-O metrics, and production refactors.
          </p>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && !evaluation && (
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4 animate-pulse">
          <div className="h-4 bg-white/10 rounded w-1/3" />
          <div className="h-3 bg-white/5 rounded w-3/4" />
          <div className="h-3 bg-white/5 rounded w-1/2" />
          <div className="h-24 bg-white/5 rounded w-full" />
        </div>
      )}

      {/* Evaluation Output with Markdown */}
      {evaluation && (
        <div className="p-5 bg-white/5 border border-white/15 rounded-xl text-sm leading-relaxed prose prose-invert prose-sm max-w-none [&>pre]:bg-black [&>pre]:border [&>pre]:border-white/15 [&>pre]:rounded-lg [&>pre]:p-4 [&>code]:text-white/90 [&>code]:bg-white/10 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>h3]:text-white [&>h3]:border-b [&>h3]:border-white/10 [&>h3]:pb-2 [&>h3]:mt-6 [&>strong]:text-white animate-in fade-in duration-300">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{evaluation}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
