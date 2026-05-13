export type ExportResolution = "720p" | "1080p" | "1440p" | "4k";

export interface Export {
  id: string;
  videoId: string;
  resolution: ExportResolution;
  fps: number;
  url: string | null;
  createdAt: string;
}
