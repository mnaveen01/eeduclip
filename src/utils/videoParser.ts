import { VideoProvider, VideoSource } from '../types';

export interface ParsedVideoResult {
  isValid: boolean;
  provider: VideoProvider;
  id: string;
  embedUrl: string;
  thumbnailUrl: string;
  normalizedUrl: string;
  error?: string;
}

/**
 * High-reliability parser for educational video links (YouTube, Shorts, Vimeo, Direct)
 */
export function parseVideoUrl(rawUrl: string): ParsedVideoResult {
  const cleanUrl = (rawUrl || '').trim();

  if (!cleanUrl) {
    return {
      isValid: false,
      provider: 'youtube',
      id: '',
      embedUrl: '',
      thumbnailUrl: '',
      normalizedUrl: '',
      error: 'Empty video URL provided',
    };
  }

  // 1. Check YouTube Patterns
  // - youtube.com/watch?v=ID
  // - youtu.be/ID
  // - youtube.com/shorts/ID
  // - youtube.com/embed/ID
  // - youtube.com/v/ID
  // - m.youtube.com/watch?v=ID
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
  const ytMatch = cleanUrl.match(youtubeRegex);

  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      isValid: true,
      provider: 'youtube',
      id: videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&playsinline=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      normalizedUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  }

  // 2. Check Vimeo Patterns
  // - vimeo.com/123456789
  // - player.vimeo.com/video/123456789
  // - vimeo.com/channels/staffpicks/123456789
  const vimeoRegex = /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/(?:\d+\/)?video\/|video\/|)(\d+))/i;
  const vimeoMatch = cleanUrl.match(vimeoRegex);

  if (vimeoMatch && vimeoMatch[1]) {
    const videoId = vimeoMatch[1];
    return {
      isValid: true,
      provider: 'vimeo',
      id: videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}?dnt=1&title=0&byline=0&portrait=0`,
      thumbnailUrl: `https://vumbnail.com/${videoId}.jpg`,
      normalizedUrl: `https://vimeo.com/${videoId}`,
    };
  }

  // 3. Direct HTML5 Video (.mp4, .webm, .ogg)
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(cleanUrl)) {
    return {
      isValid: true,
      provider: 'direct',
      id: cleanUrl,
      embedUrl: cleanUrl,
      thumbnailUrl: '',
      normalizedUrl: cleanUrl,
    };
  }

  // 4. Fallback: If raw 11-character YouTube video ID was pasted directly
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return {
      isValid: true,
      provider: 'youtube',
      id: cleanUrl,
      embedUrl: `https://www.youtube.com/embed/${cleanUrl}?enablejsapi=1&rel=0&playsinline=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${cleanUrl}/hqdefault.jpg`,
      normalizedUrl: `https://www.youtube.com/watch?v=${cleanUrl}`,
    };
  }

  return {
    isValid: false,
    provider: 'youtube',
    id: '',
    embedUrl: '',
    thumbnailUrl: '',
    normalizedUrl: cleanUrl,
    error: 'Unsupported video provider. Please enter a valid YouTube or Vimeo link.',
  };
}

/**
 * Formats seconds into MM:SS or HH:MM:SS
 */
export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const totalSeconds = Math.floor(seconds);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

/**
 * Parses time string (MM:SS or HH:MM:SS or raw number string) to seconds
 */
export function parseTimeToSeconds(timeStr: string): number {
  if (!timeStr) return 0;
  const clean = timeStr.trim();
  
  if (!isNaN(Number(clean))) {
    return Math.max(0, Math.floor(Number(clean)));
  }

  const parts = clean.split(':').map((p) => Number(p.trim()));
  if (parts.some((p) => isNaN(p))) return 0;

  if (parts.length === 3) {
    const [h, m, s] = parts;
    return Math.max(0, h * 3600 + m * 60 + s);
  }
  if (parts.length === 2) {
    const [m, s] = parts;
    return Math.max(0, m * 60 + s);
  }
  if (parts.length === 1) {
    return Math.max(0, parts[0]);
  }
  return 0;
}
