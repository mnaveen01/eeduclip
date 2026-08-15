export type VideoProvider = 'youtube' | 'vimeo' | 'mp4' | 'direct';

export interface VideoSource {
  id: string;
  provider: VideoProvider;
  rawUrl: string;
  title: string;
  channel?: string;
  duration?: number;
  thumbnailUrl?: string;
}

export interface RoadmapStep {
  id: string;
  stepNumber: number;
  title: string;
  phase: 'Foundations' | 'Core Engineering' | 'Advanced Architecture' | 'Production & Scale';
  duration: string;
  durationSec: number;
  youtubeUrl: string;
  channel: string;
  thumbnailUrl: string;
  description: string;
  keyConcepts: string[];
  geminiPrompts: {
    cheatsheetPrompt: string;
    projectPrompt: string;
    interviewPrompt: string;
    edgeCasePrompt: string;
  };
}

export interface CSRole {
  id: string;
  title: string;
  category: 'Software Engineering' | 'AI & Data Science' | 'Cloud & Cybersecurity' | 'Design & Creative Tech' | 'Systems & Hardware';
  shortDescription: string;
  fullOverview: string;
  difficulty: 'Beginner Friendly' | 'Intermediate' | 'Advanced';
  estTimeToMaster: string;
  topCompanyChannels: string[];
  techStack: string[];
  salaryRange: string;
  steps: RoadmapStep[];
}

export interface TechNewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'AI & LLMs' | 'Web & Frameworks' | 'Cloud & Systems' | 'Cybersecurity' | 'Developer Tools' | 'Open Source';
  source: string;
  publishedAt: string;
  readTime: string;
  url: string;
  impactForStudents: string;
  trendingScore: number;
}

export interface AIStudioPromptBlueprint {
  id: string;
  title: string;
  category: 'Code Architecture' | 'Algorithm Analysis' | 'Debugging & Security' | 'System Design' | 'Interview Preparation';
  description: string;
  systemPrompt: string;
  userPromptTemplate: string;
  sampleInput: string;
  recommendedModel: string;
}

export interface EduclipSession {
  version: string;
  id: string;
  title: string;
  roleName?: string;
  subject?: string;
  gradeLevel?: string;
  creatorName?: string;
  videoSource: VideoSource;
  activeStep?: RoadmapStep;
  allSteps?: RoadmapStep[];
  createdAt: string;
}
