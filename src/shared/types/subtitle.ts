export type EmotionStyle = "normal" | "bounce" | "shake" | "fade" | "cinematic_zoom";

export interface SubtitleStyleConfig {
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  animation?: EmotionStyle;
  highlightWords?: string[];
}

export interface SubtitleSegment {
  id: string;
  videoId: string;
  text: string;
  startTime: number;
  endTime: number;
  style: SubtitleStyleConfig;
  position: number;
}

export interface SubtitleStyle {
  id: string;
  name: string;
  config: SubtitleStyleConfig;
  createdAt: string;
}
