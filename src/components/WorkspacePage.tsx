import React, { useState } from 'react';
import {
  Sparkles,
  Terminal,
  Code2,
  Cpu,
  Layers,
  Copy,
  Check,
  ExternalLink,
  Play,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Laptop,
  CheckCircle2
} from 'lucide-react';
import { GOOGLE_AI_STUDIO_GUIDE, AI_STUDIO_BLUEPRINTS } from '../data/aiStudioTemplates';
import { AIStudioPromptBlueprint } from '../types';

interface WorkspacePageProps {
  onNavigateHome: () => void;
  onNavigateWatch: () => void;
}

export const WorkspacePage: React.FC<WorkspacePageProps> = ({
  onNavigateHome,
  onNavigateWatch,
}) => {
  const [selectedBlueprint, setSelectedBlueprint] = useState<AIStudioPromptBlueprint>(
    AI_STUDIO_BLUEPRINTS[0]
  );
  const [customUserInput, setCustomUserInput] = useState(AI_STUDIO_BLUEPRINTS[0].sampleInput);
  const [copiedState, setCopiedState] = useState(false);

  const handleSelectBlueprint = (blueprint: AIStudioPromptBlueprint) => {
    setSelectedBlueprint(blueprint);
    setCustomUserInput(blueprint.sampleInput);
  };

  const getFullCompiledPrompt = () => {
    return `[SYSTEM INSTRUCTIONS]:\n${selectedBlueprint.systemPrompt}\n\n[STUDENT TASK / CODE]:\n${customUserInput}`;
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(getFullCompiledPrompt());
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  const handleLaunchAIStudioWithPrompt = () => {
    // Copy to clipboard first then open Google AI Studio in new tab
    navigator.clipboard.writeText(getFullCompiledPrompt());
    window.open('https://aistudio.google.com', '_blank');
  };

  return (
    <div className="w-full bg-black text-white min-h-screen pb-20">
      {/* Header Bar */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-md py-10 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 border border-white/20 text-[11px] font-mono tracking-widest text-white uppercase rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Google AI Studio • Student Engineering Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              AI Studio Launchpad for CS Students
            </h1>
            <p className="text-sm text-white/70 mt-2 max-w-2xl leading-relaxed">
              Leverage Gemini 2.5 foundation models, structured code generators, and prompt engineering recipes to accelerate your software engineering learning.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-white hover:bg-gray-200 text-black text-xs font-bold tracking-wide uppercase transition-colors rounded shadow-sm flex items-center space-x-2"
            >
              <span>Launch aistudio.google.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        {/* 1. Introductory Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {GOOGLE_AI_STUDIO_GUIDE.keyBenefits.map((benefit, idx) => (
            <div
              key={idx}
              className="glass-card p-5 rounded-lg transition-colors hover:bg-white/10"
            >
              <div className="w-7 h-7 rounded bg-white/20 text-white flex items-center justify-center font-mono text-xs font-bold mb-3">
                0{idx + 1}
              </div>
              <h3 className="text-sm font-bold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* 2. Interactive Prompt Engineering Bench */}
        <div className="border border-white/20 rounded-xl overflow-hidden shadow-2xl bg-black">
          <div className="p-6 border-b border-white/10 bg-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 font-semibold block mb-1">
                Interactive CS Test Bench
              </span>
              <h2 className="text-xl font-bold text-white">
                Pre-Tuned Engineering Prompt Blueprints
              </h2>
            </div>

            {/* Blueprint Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {AI_STUDIO_BLUEPRINTS.map((bp) => (
                <button
                  key={bp.id}
                  onClick={() => handleSelectBlueprint(bp)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    selectedBlueprint.id === bp.id
                      ? 'bg-white text-black font-semibold'
                      : 'bg-white/5 border border-white/20 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {bp.title}
                </button>
              ))}
            </div>
          </div>

          {/* Blueprint Details and Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Left Column: System Prompt & Specification */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3">
                  <span className="px-2 py-0.5 bg-white/10 text-white rounded font-semibold">
                    {selectedBlueprint.category}
                  </span>
                  <span className="text-white font-semibold border-b border-white/20 pb-0.5">
                    Model: {selectedBlueprint.recommendedModel}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {selectedBlueprint.title}
                </h3>
                <p className="text-xs text-white/70 mb-4 leading-relaxed">
                  {selectedBlueprint.description}
                </p>

                {/* System Prompt Box */}
                <div className="mb-4">
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/40 font-semibold mb-1">
                    System Instructions (AI Persona & Constraints)
                  </label>
                  <pre className="p-3 bg-white/5 text-white/80 border border-white/10 text-xs font-mono rounded overflow-x-auto whitespace-pre-wrap max-h-56 leading-relaxed">
                    {selectedBlueprint.systemPrompt}
                  </pre>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-white/50 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                <span>Optimized for low-latency reasoning and strict format compliance.</span>
              </div>
            </div>

            {/* Right Column: Student Input & Launcher */}
            <div className="p-6 flex flex-col justify-between bg-white/5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/60 font-semibold">
                    Student Code / Problem Input
                  </label>
                  <button
                    onClick={() => setCustomUserInput(selectedBlueprint.sampleInput)}
                    className="text-[11px] text-white hover:underline font-mono"
                  >
                    Reset to Sample
                  </button>
                </div>

                <textarea
                  value={customUserInput}
                  onChange={(e) => setCustomUserInput(e.target.value)}
                  rows={9}
                  className="w-full p-3 text-xs font-mono text-white bg-black/50 border border-white/20 rounded focus:outline-none focus:ring-1 focus:ring-white focus:border-white leading-relaxed mb-4 shadow-inner"
                  placeholder="Paste your TypeScript/Python code or algorithmic question..."
                />

                {/* Quick Execution Instructions */}
                <div className="glass-card p-3.5 rounded text-xs text-white/70 mb-6">
                  <span className="font-bold text-white block mb-1">
                    💡 How to run in Google AI Studio:
                  </span>
                  Click <strong>"Copy & Open AI Studio"</strong> below. It will automatically copy the full structured prompt with system instructions to your clipboard and open the Gemini Studio sandbox.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={handleCopyPrompt}
                  className="w-full sm:w-1/2 px-4 py-2.5 bg-black border border-white/20 hover:bg-white/10 text-white text-xs font-semibold rounded flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  {copiedState ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/60" />
                      <span>Copy Full Prompt</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleLaunchAIStudioWithPrompt}
                  className="w-full sm:w-1/2 px-4 py-2.5 bg-white hover:bg-gray-200 text-black text-xs font-bold rounded flex items-center justify-center space-x-2 transition-colors shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Copy & Open AI Studio</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
