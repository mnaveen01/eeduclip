import { TechNewsItem } from '../types';

export const DAILY_TECH_NEWS: TechNewsItem[] = [
  {
    id: 'news-1',
    title: 'Google DeepMind Unveils Next-Gen Multimodal Architecture with 2M Token Context Window',
    summary: 'Researchers have published new benchmark data showing near-zero retrieval loss across 2 million tokens of code, video, and audio embeddings, transforming how software architectures are ingested by AI.',
    category: 'AI & LLMs',
    source: 'Google DeepMind Research',
    publishedAt: 'Today, 08:30 AM',
    readTime: '3 min read',
    url: 'https://deepmind.google/discover/blog/',
    impactForStudents: 'Students can now feed entire open-source codebases and textbook chapters into Gemini for deep architectural refactoring and instant system diagrams.',
    trendingScore: 98
  },
  {
    id: 'news-2',
    title: 'TypeScript 5.8 Introduces Granular Return Type Checks & Zero-Allocation Module Imports',
    summary: 'The TypeScript compiler team has shipped optimizations that reduce type-checking latency by up to 28% in enterprise monorepos while introducing stricter return checks for async generator functions.',
    category: 'Developer Tools',
    source: 'Microsoft TypeScript Blog',
    publishedAt: 'Today, 06:15 AM',
    readTime: '4 min read',
    url: 'https://devblogs.microsoft.com/typescript/',
    impactForStudents: 'Faster IDE autocompletion and compile loops mean instant feedback when building complex full-stack React and Node applications.',
    trendingScore: 94
  },
  {
    id: 'news-3',
    title: 'React 19 Server Actions & Optimistic UI Hooks Become the Standard for Web Development',
    summary: 'The broader React ecosystem has shifted toward native Server Functions, eliminating thousands of lines of boilerplate fetching code and establishing streamlined full-stack data mutation patterns.',
    category: 'Web & Frameworks',
    source: 'React Core Engineering',
    publishedAt: 'Yesterday',
    readTime: '5 min read',
    url: 'https://react.dev/blog',
    impactForStudents: 'Learning Server Components and useOptimistic early prepares you directly for the modern frontend job market.',
    trendingScore: 92
  },
  {
    id: 'news-4',
    title: 'Kubernetes v1.33 Enhances Dynamic Resource Allocation for GPU Cloud Clusters',
    summary: 'Cloud Native Computing Foundation (CNCF) announced native DRA support for multi-instance GPUs, simplifying how engineering teams schedule distributed AI model training jobs on Kubernetes.',
    category: 'Cloud & Systems',
    source: 'CNCF Official Announcement',
    publishedAt: 'Yesterday',
    readTime: '4 min read',
    url: 'https://kubernetes.io/blog/',
    impactForStudents: 'Crucial for students aspiring to MLOps and Cloud DevOps engineering roles working with massive neural networks.',
    trendingScore: 89
  },
  {
    id: 'news-5',
    title: 'Critical Zero-Day in Common C Cryptographic Libraries Patched Across Linux Kernels',
    summary: 'Security researchers identified a timing side-channel vulnerability in legacy elliptic curve implementations, leading to an immediate coordinated patch across major Linux distributions.',
    category: 'Cybersecurity',
    source: 'US-CERT Advisory & Linux Foundation',
    publishedAt: '2 days ago',
    readTime: '6 min read',
    url: 'https://kernel.org',
    impactForStudents: 'A real-world case study in why constant-time cryptographic algorithms and memory-safe languages like Rust are vital for modern infrastructure.',
    trendingScore: 87
  },
  {
    id: 'news-6',
    title: 'Wasm (WebAssembly) Component Model Reaches Production Standardization',
    summary: 'The Bytecode Alliance has ratified the Component Model, enabling polyglot microservices where Rust, Go, Python, and C++ code can seamlessly compose inside high-speed sandboxed runtimes.',
    category: 'Open Source',
    source: 'Bytecode Alliance',
    publishedAt: '3 days ago',
    readTime: '4 min read',
    url: 'https://bytecodealliance.org',
    impactForStudents: 'Opens up new frontiers for building browser-based video editors, 3D engines, and serverless edge functions without language friction.',
    trendingScore: 85
  }
];

export const TECH_NEWS_CATEGORIES = [
  'All News',
  'AI & LLMs',
  'Web & Frameworks',
  'Cloud & Systems',
  'Cybersecurity',
  'Developer Tools',
  'Open Source'
] as const;
