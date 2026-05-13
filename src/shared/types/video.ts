export type VideoStatus =
  | "uploading"
  | "uploaded"
  | "extracting_audio"
  | "transcribing"
  | "generating_subtitles"
  | "ready"
  | "rendering"
  | "completed"
  | "failed";

export interface Video {
  id: string;
  userId: string;
  title: string;
  status: VideoStatus;
  duration: number;
  inputUrl: string;
  outputUrl: string | null;
  thumbnailUrl: string | null;
  language: string;
  createdAt: string;
  updatedAt: string;
}
