import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Copy, Check, Terminal, ChevronDown, Code2 } from 'lucide-react';

const LANGUAGE_OPTIONS = [
  { label: 'TypeScript', value: 'typescript', icon: 'TS' },
  { label: 'JavaScript', value: 'javascript', icon: 'JS' },
  { label: 'Python', value: 'python', icon: 'PY' },
  { label: 'Go', value: 'go', icon: 'GO' },
  { label: 'SQL', value: 'sql', icon: 'SQ' },
  { label: 'Java', value: 'java', icon: 'JV' },
];

const DEFAULT_CODE: Record<string, string> = {
  typescript: `// Eduloop Code Sandbox — TypeScript
// Write and reason through your solution here

function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

// Test it:
const sorted = [1, 3, 5, 7, 11, 13, 17, 19, 23];
console.log(binarySearch(sorted, 13)); // → 5
console.log(binarySearch(sorted, 4));  // → -1
`,
  javascript: `// Eduloop Code Sandbox — JavaScript

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
`,
  python: `# Eduloop Code Sandbox — Python

def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

print(quick_sort([3, 6, 8, 10, 1, 2, 1]))
`,
  go: `// Eduloop Code Sandbox — Go
package main

import "fmt"

func twoSum(nums []int, target int) (int, int) {
    seen := make(map[int]int)
    for i, n := range nums {
        if j, ok := seen[target-n]; ok {
            return j, i
        }
        seen[n] = i
    }
    return -1, -1
}

func main() {
    i, j := twoSum([]int{2, 7, 11, 15}, 9)
    fmt.Printf("Indices: %d, %d\\n", i, j)
}
`,
  sql: `-- Eduloop Code Sandbox — SQL
-- Find top 5 engineers by commit count in the last 30 days

SELECT 
    u.username,
    u.team,
    COUNT(c.id) AS commit_count,
    COUNT(DISTINCT c.repo_id) AS repos_touched
FROM users u
JOIN commits c ON u.id = c.author_id
WHERE c.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.id, u.username, u.team
ORDER BY commit_count DESC
LIMIT 5;
`,
  java: `// Eduloop Code Sandbox — Java

import java.util.*;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No solution found");
    }
}
`,
};

interface CodeSandboxProps {
  initialCode?: string;
  initialLanguage?: string;
  height?: string;
  onCodeChange?: (code: string) => void;
  onEvaluate?: (code: string, language: string) => void;
}

export const CodeSandbox: React.FC<CodeSandboxProps> = ({
  initialCode,
  initialLanguage = 'typescript',
  height = '380px',
  onCodeChange,
  onEvaluate,
}) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(initialCode || DEFAULT_CODE[initialLanguage] || '');
  const [copied, setCopied] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleCodeUpdate = (val: string) => {
    setCode(val);
    if (onCodeChange) onCodeChange(val);
  };

  const handleLangChange = (lang: string) => {
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang] || '');
    setShowLangMenu(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(DEFAULT_CODE[language] || '');
  };

  const currentLang = LANGUAGE_OPTIONS.find(l => l.value === language)!;

  return (
    <div className="flex flex-col border border-white/20 rounded-xl overflow-hidden bg-black shadow-2xl" style={{ height }}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-white/50">
            <Code2 className="w-3.5 h-3.5" />
            <span>sandbox.{language === 'typescript' ? 'ts' : language === 'javascript' ? 'js' : language === 'python' ? 'py' : language === 'go' ? 'go' : language === 'sql' ? 'sql' : 'java'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(p => !p)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/15 border border-white/20 rounded text-xs font-mono text-white transition-colors"
            >
              <span className="text-[10px] font-bold text-white/80">{currentLang?.icon}</span>
              <span>{currentLang?.label}</span>
              <ChevronDown className="w-3 h-3 text-white/50" />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-1 bg-black border border-white/20 rounded-lg overflow-hidden z-50 min-w-32 shadow-2xl">
                {LANGUAGE_OPTIONS.map(l => (
                  <button
                    key={l.value}
                    onClick={() => handleLangChange(l.value)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors ${
                      language === l.value
                        ? 'bg-white text-black font-bold'
                        : 'text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-[10px] font-bold w-5">{l.icon}</span>
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {onEvaluate && (
            <button
              onClick={() => onEvaluate(code, language)}
              className="px-2.5 py-1 bg-white hover:bg-gray-200 text-black text-xs font-bold rounded flex items-center space-x-1 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              <Terminal className="w-3 h-3 text-black" />
              <span>Audit Code</span>
            </button>
          )}

          <button onClick={handleReset} className="p-1.5 text-white/40 hover:text-white transition-colors" title="Reset to default">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button onClick={handleCopy} className="p-1.5 text-white/40 hover:text-white transition-colors" title="Copy code">
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={v => handleCodeUpdate(v || '')}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
            fontLigatures: true,
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: 'gutter',
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            tabSize: 2,
            automaticLayout: true,
            scrollbar: {
              vertical: 'hidden',
              horizontal: 'hidden',
            },
          }}
        />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-white/5 border-t border-white/10 shrink-0">
        <span className="text-[10px] font-mono text-white/30 flex items-center gap-1.5">
          <Terminal className="w-3 h-3" />
          Monaco Editor — VS Code Engine
        </span>
        <span className="text-[10px] font-mono text-white/30">
          {code.split('\n').length} lines
        </span>
      </div>
    </div>
  );
};
