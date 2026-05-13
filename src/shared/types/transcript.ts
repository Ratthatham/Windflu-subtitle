export interface Transcript {
  id: string;
  videoId: string;
  language: string;
  rawText: string;
  createdAt: string;
}

export interface TranscriptWord {
  id: string;
  transcriptId: string;
  word: string;
  startTime: number;
  endTime: number;
  confidence: number;
  position: number;
}
