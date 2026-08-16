import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Sparkles, RefreshCw, Copy, Check, X, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface GeminiTutorProps {
  contextTitle: string;
  contextConcepts: string[];
  initialPrompt?: string;
  onClose: () => void;
}

export const GeminiTutor: React.FC<GeminiTutorProps> = ({
  contextTitle,
  contextConcepts,
  initialPrompt,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const systemPrompt = `You are an elite computer science AI tutor specializing in "${contextTitle}". 
You are embedded inside Eduloop – a premium engineering education platform. 
The student is currently studying: ${contextConcepts.join(', ')}.

Your style:
- Be concise, precise, and technical. Use code snippets generously.
- Format responses with markdown: code blocks, bold terms, numbered steps.
- For algorithms, always include time/space complexity.
- For system design, think in components and data flows.
- Never be generic. Always be specific to ${contextTitle}.

Keep responses focused and actionable. You are a senior engineer, not a textbook.`;

  useEffect(() => {
    if (initialPrompt) {
      sendMessage(initialPrompt);
    } else {
      setMessages([{
        role: 'model',
        text: `## Ready to help with **${contextTitle}** 🚀\n\nI'm your AI tutor for this milestone. I can help you with:\n\n- **Code review** and debugging\n- **FAANG interview prep** for ${contextConcepts.slice(0, 3).join(', ')}\n- **Architecture deep-dives**\n- **Edge case analysis**\n\nWhat do you want to master first?`,
      }]);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMsg: Message = { role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsStreaming(true);

    const modelMsg: Message = { role: 'model', text: '' };
    setMessages(prev => [...prev, modelMsg]);

    try {
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY || '';
      if (!apiKey) {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'model',
            text: '⚠️ **API Key Required**\n\nTo use the AI Tutor, set your `VITE_GEMINI_API_KEY` in `.env.local`.\n\nGet a free key at [aistudio.google.com](https://aistudio.google.com)',
          };
          return updated;
        });
        setIsStreaming(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const history = messages
        .filter(m => m.text)
        .map(m => ({ role: m.role, parts: [{ text: m.text }] }));

      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        history,
        config: { systemInstruction: systemPrompt },
      });

      let accumulated = '';
      const stream = await chat.sendMessageStream({ message: text.trim() });

      for await (const chunk of stream) {
        const chunkText = chunk.text ?? '';
        accumulated += chunkText;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'model', text: accumulated };
          return updated;
        });
      }
    } catch (err: any) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'model',
          text: `❌ **Error**: ${err?.message || 'Failed to connect to Gemini. Check your API key.'}`,
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const quickPrompts = [
    'Explain the core concept with a code example',
    'Give me a FAANG interview question for this',
    'What are the common edge cases?',
    'Compare this with an alternative approach',
  ];

  return (
    <div className="flex flex-col h-full bg-black border border-white/20 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-black" />
          </div>
          <div>
            <span className="text-xs font-bold text-white">Gemini AI Tutor</span>
            <span className="block text-[10px] text-white/40 font-mono">gemini-2.5-flash • streaming</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMessages([])}
            className="p-1.5 text-white/40 hover:text-white transition-colors"
            title="Clear chat"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white transition-colors"
            title="Close tutor"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`shrink-0 w-6 h-6 rounded flex items-center justify-center mt-0.5 ${
              msg.role === 'user' ? 'bg-white' : 'bg-white/10'
            }`}>
              {msg.role === 'user'
                ? <User className="w-3.5 h-3.5 text-black" />
                : <Bot className="w-3.5 h-3.5 text-white" />
              }
            </div>
            <div className={`flex-1 min-w-0 ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
              <div className={`relative group rounded-xl px-4 py-3 text-sm leading-relaxed max-w-full ${
                msg.role === 'user'
                  ? 'bg-white text-black font-medium'
                  : 'bg-white/5 border border-white/10 text-white/90'
              }`}>
                {msg.role === 'model' ? (
                  <div className="prose prose-invert prose-sm max-w-none [&>pre]:bg-white/5 [&>pre]:border [&>pre]:border-white/10 [&>pre]:rounded-lg [&>pre]:p-3 [&>code]:text-white/80 [&>code]:bg-white/10 [&>code]:px-1 [&>code]:rounded [&>h1]:text-white [&>h2]:text-white [&>h3]:text-white [&>strong]:text-white">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text || (isStreaming && idx === messages.length - 1 ? '▋' : '')}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <span>{msg.text}</span>
                )}
                {msg.role === 'model' && msg.text && (
                  <button
                    onClick={() => handleCopy(msg.text, idx)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-white/40 hover:text-white transition-all"
                  >
                    {copiedIdx === idx ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {isStreaming && messages[messages.length - 1]?.text === '' && (
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
          {quickPrompts.map(q => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="px-2.5 py-1 text-[11px] bg-white/5 border border-white/15 text-white/60 hover:bg-white/10 hover:text-white rounded-full transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/10 bg-white/5 shrink-0">
        <div className="flex items-end gap-2 bg-black/50 border border-white/20 focus-within:border-white rounded-xl p-3 transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask anything about this milestone... (Enter to send)"
            className="flex-1 bg-transparent text-white text-sm placeholder-white/30 focus:outline-none resize-none max-h-32 leading-relaxed"
            style={{ minHeight: '24px' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isStreaming}
            className="shrink-0 w-8 h-8 bg-white hover:bg-gray-200 disabled:bg-white/20 disabled:cursor-not-allowed text-black rounded-lg flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-white/25 font-mono mt-1.5 text-center">Shift+Enter for newline</p>
      </div>
    </div>
  );
};
