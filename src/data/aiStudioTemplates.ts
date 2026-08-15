import { AIStudioPromptBlueprint } from '../types';

export const GOOGLE_AI_STUDIO_GUIDE = {
  headline: 'Google AI Studio for Computer Science Students',
  subtitle: 'The fastest path from developer idea to production software with Gemini models.',
  description: 'Google AI Studio gives CS students and developers direct web-based access to state-of-the-art Gemini multimodal models, high-speed prototyping environments, system prompt tuning, structured JSON generation, and direct API key exports for their personal full-stack projects.',
  keyBenefits: [
    {
      title: 'Multimodal Code & Visual Analysis',
      description: 'Upload complex system diagrams, UI screenshots, database schemas, or 10,000-line repositories and get instant architectural refactoring.'
    },
    {
      title: 'Zero-Cost Generous Free Tier for Students',
      description: 'Prototype production apps with high rate limits, zero credit card requirement, and instant API key generation for TypeScript/Python.'
    },
    {
      title: 'Structured JSON & Function Calling Sandbox',
      description: 'Design deterministic APIs with schema enforcement and custom tool declarations directly inside the visual test bench.'
    },
    {
      title: 'One-Click Code Export to Production',
      description: 'Export prompts directly into ready-to-run code for Node.js, Python, cURL, or Web SDKs.'
    }
  ],
  externalUrl: 'https://aistudio.google.com'
};

export const AI_STUDIO_BLUEPRINTS: AIStudioPromptBlueprint[] = [
  {
    id: 'blueprint-architecture-review',
    title: 'Senior Software Architecture & Code Review',
    category: 'Code Architecture',
    description: 'Perform a comprehensive code review examining DRY/SOLID principles, algorithmic complexity, race conditions, and clean module boundaries.',
    recommendedModel: 'Gemini 2.5 Pro / Flash',
    systemPrompt: `You are a Principal Software Architect with 20+ years of experience in distributed systems and clean code design.
Your task is to review the student's code or architectural proposal.
Provide:
1. Executive Summary & Code Health Rating (A/B/C/D/F)
2. Time & Space Complexity Analysis (Big-O)
3. Critical Edge Cases & Race Conditions
4. Refactored, production-ready implementation with strict TypeScript/Python types
5. Actionable architectural recommendations.`,
    userPromptTemplate: `Please review the following code implementation for our backend service:

\`\`\`typescript
// Paste your code here
\`\`\``,
    sampleInput: `async function fetchUserData(userIds: string[]) {
  const results = [];
  for (let i = 0; i < userIds.length; i++) {
    const user = await db.users.findById(userIds[i]);
    const orders = await db.orders.find({ userId: userIds[i] });
    results.push({ ...user, orders });
  }
  return results;
}`
  },
  {
    id: 'blueprint-system-design',
    title: 'High-Scale Distributed System Design Spec',
    category: 'System Design',
    description: 'Draft end-to-end system design documentation including database schema, caching layers, message queues, and failure modes for 10M+ DAU.',
    recommendedModel: 'Gemini 2.5 Pro',
    systemPrompt: `You are a Principal Distributed Systems Engineer conducting a System Design Interview.
Design a resilient, fault-tolerant system architecture satisfying functional and non-functional requirements.
Structure your answer into:
1. Functional & Non-Functional Requirements (QPS, Latency, Storage)
2. High-Level Architecture Diagram (in clear ASCII art or Mermaid.js format)
3. API Endpoints & Request/Response Contracts
4. Data Model & Indexing Strategy (SQL vs NoSQL)
5. Scaling, Caching (Redis), and Partitioning Strategies
6. Failure Modes & Bottleneck Mitigations.`,
    userPromptTemplate: `Design a scalable system for: [e.g., Global URL Shortener / Real-Time Collaborative Canvas / Ride-Sharing Dispatch System]
Estimated Scale: 10 Million Daily Active Users.`,
    sampleInput: `Design a globally distributed rate limiter service that protects our microservices from DDoS attacks while allowing 100 requests per minute per IP address with sub-5ms latency.`
  },
  {
    id: 'blueprint-dsa-optimizer',
    title: 'Algorithm & Data Structure Deep Explainer',
    category: 'Algorithm Analysis',
    description: 'Transform complex LeetCode / competitive programming problems into intuitive visual breakdowns with optimal Big-O solutions.',
    recommendedModel: 'Gemini 2.5 Flash',
    systemPrompt: `You are an elite Competitive Programming Coach and Algorithms Professor.
Break down algorithms using:
1. Intuition & Real-World Metaphors
2. Step-by-Step Visual State Trace
3. Brute Force vs Optimal Approach Tradeoffs
4. Clean, idiomatic implementation with comments on non-trivial lines
5. Mathematical Big-O Proofs for Time and Space.`,
    userPromptTemplate: `Explain and solve the following algorithmic problem with optimal time/space complexity:
Problem: [Insert Problem Description]`,
    sampleInput: `Given an array of integers representing stock prices across consecutive days, find the maximum profit you can achieve with at most two transactions.`
  },
  {
    id: 'blueprint-mock-interview',
    title: 'FAANG Technical Mock Interviewer',
    category: 'Interview Preparation',
    description: 'Simulate a live 45-minute technical coding interview with progressive hints, edge case probing, and final candidate rubric evaluation.',
    recommendedModel: 'Gemini 2.5 Pro',
    systemPrompt: `You are a Senior Staff Engineer at a top tech company conducting a live 45-minute technical coding interview.
Guidelines:
- Start by presenting the problem clearly with 1 example.
- Prompt the candidate to clarify assumptions before writing code.
- If the candidate gets stuck, give subtle algorithmic nudges without giving away the full answer.
- Test the candidate on edge cases (null inputs, integer overflows, empty collections).
- Provide a structured final rubric score across Problem Solving, Code Quality, Communication, and Speed.`,
    userPromptTemplate: `Let's begin a mock technical interview for a [Role: Full Stack / Backend / AI Engineer] position. Please present the first problem.`,
    sampleInput: `Let's do a 45-minute live coding interview for a Senior Backend Engineer role focusing on Graphs and Topological Sorting.`
  }
];
