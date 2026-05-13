export type RenderStatus =
  | "queued"
  | "processing"
  | "completed"
  | "failed";

export interface RenderJob {
  id: string;
  videoId: string;
  status: RenderStatus;
  progress: number;
  error: string | null;
  startedAt: string | null;
  completedAt: string | null;
}
