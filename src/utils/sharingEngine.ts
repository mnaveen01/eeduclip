import { EduclipSession, RoadmapStep } from '../types';
import { parseVideoUrl } from './videoParser';

export interface DecodeSessionResult {
  success: boolean;
  session?: EduclipSession;
  errorMessage?: string;
}

/**
 * Unicode-safe Base64 encoder for browser & server environments
 */
export function encodeSession(session: EduclipSession): string {
  try {
    const compactData = {
      v: '2.0',
      id: session.id,
      title: session.title,
      role: session.roleName || session.title,
      subject: session.subject || 'Computer Science',
      grade: session.gradeLevel || 'Undergraduate',
      url: session.videoSource.rawUrl,
      srcTitle: session.videoSource.title,
      author: session.creatorName || 'Tech Educator',
      steps: (session.allSteps || []).map((s) => ({
        id: s.id,
        num: s.stepNumber,
        title: s.title,
        phase: s.phase,
        dur: s.duration,
        url: s.youtubeUrl,
        channel: s.channel,
        desc: s.description,
        concepts: s.keyConcepts,
        prompts: s.geminiPrompts,
      })),
      created: session.createdAt || new Date().toISOString(),
    };

    const jsonString = JSON.stringify(compactData);
    // Unicode-safe base64 encoding
    const encoded = btoa(
      encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      })
    );
    return encoded;
  } catch (error) {
    console.error('Failed to encode session state:', error);
    return btoa(unescape(encodeURIComponent(JSON.stringify(session))));
  }
}

/**
 * Unicode-safe Base64 decoder with resilient fallbacks
 */
export function decodeSession(base64Payload: string): DecodeSessionResult {
  if (!base64Payload || typeof base64Payload !== 'string') {
    return {
      success: false,
      errorMessage: 'No curriculum payload provided in link.',
    };
  }

  try {
    const sanitized = base64Payload.trim().replace(/\s/g, '');
    let jsonString = '';

    try {
      jsonString = decodeURIComponent(
        Array.prototype.map
          .call(atob(sanitized), (c: string) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
    } catch {
      jsonString = decodeURIComponent(escape(atob(sanitized)));
    }

    const raw = JSON.parse(jsonString);

    if (!raw) {
      return {
        success: false,
        errorMessage: 'Engineering track payload is empty or corrupted.',
      };
    }

    const rawUrl = raw.url || raw.videoSource?.rawUrl || 'https://www.youtube.com/watch?v=W6NZfCO5SIk';
    const parsed = parseVideoUrl(rawUrl);

    let parsedSteps: RoadmapStep[] = [];

    if (raw.steps && Array.isArray(raw.steps)) {
      parsedSteps = raw.steps.map((s: any, idx: number) => ({
        id: s.id || `step-${idx + 1}`,
        stepNumber: s.num || idx + 1,
        title: s.title || `Phase ${idx + 1}`,
        phase: s.phase || 'Foundations',
        duration: s.dur || '15:00',
        durationSec: 900,
        youtubeUrl: s.url || rawUrl,
        channel: s.channel || 'Tech Educator',
        thumbnailUrl: parsed.thumbnailUrl || '',
        description: s.desc || 'Milestone concepts and architectural design.',
        keyConcepts: s.concepts || ['System Architecture', 'Core Principles'],
        geminiPrompts: s.prompts || {
          cheatsheetPrompt: 'Generate a comprehensive syntax and concepts cheat sheet for this milestone.',
          projectPrompt: 'Suggest 3 real-world portfolio projects for this milestone.',
          interviewPrompt: 'Give me 5 technical interview questions with model answers.',
          edgeCasePrompt: 'Explain common edge cases, race conditions, and performance pitfalls.',
        },
      }));
    }

    const session: EduclipSession = {
      version: raw.v || raw.version || '2.0',
      id: raw.id || `track-${Math.random().toString(36).substring(2, 9)}`,
      title: raw.title || raw.role || 'Computer Science Career Track',
      roleName: raw.role || raw.title,
      subject: raw.subject || 'Computer Science',
      gradeLevel: raw.grade || 'Undergraduate',
      creatorName: raw.author || raw.creatorName || 'Top Tech Educator',
      videoSource: {
        id: parsed.id,
        provider: parsed.provider,
        rawUrl: rawUrl,
        title: raw.srcTitle || raw.title || 'Engineering Master Source',
        thumbnailUrl: parsed.thumbnailUrl,
      },
      activeStep: parsedSteps[0],
      allSteps: parsedSteps,
      createdAt: raw.created || raw.createdAt || new Date().toISOString(),
    };

    return {
      success: true,
      session,
    };
  } catch (err: any) {
    console.error('Failed to decode payload:', err);
    return {
      success: false,
      errorMessage: `Could not parse curriculum link: ${err?.message || 'Malformed base64'}`,
    };
  }
}
