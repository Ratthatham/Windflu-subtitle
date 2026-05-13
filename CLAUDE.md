# Thai Cinematic Subtitle SaaS Platform

## Overview

Thai Cinematic Subtitle SaaS — upload video, AI transcribes Thai speech, smart segmentation, cinematic subtitle rendering, export MP4 with theme-based styles.

## Tech Stack

| Layer | Stack |
|-------|-------|
| Frontend | Next.js 15, React, TailwindCSS, shadcn/ui, Remotion (preview) |
| Backend | NestJS (modular monolith) |
| AI Service | Python, FastAPI, faster-whisper, PyThaiNLP |
| Queue | BullMQ + Redis |
| Database | PostgreSQL via Prisma ORM |
| Storage | Cloudflare R2 (S3-compatible) |
| Rendering | Remotion |

## Main Pipeline

```
UPLOAD → EXTRACT_AUDIO → TRANSCRIBE → NLP_SEGMENT → GENERATE_TIMELINE → RENDER_VIDEO → EXPORT_MP4
```

## Coding Standards

- TypeScript strict mode — no `any`
- Functional components only (React)
- Clean architecture — controllers are thin, services hold logic
- Feature-based folder structure
- Zod validation at system boundaries
- Reusable modules over copy-paste
- No inline business logic in controllers
- All long-running tasks via BullMQ queues

## Key Priorities

1. **Thai language support is first-class** — segmentation, fonts, encoding
2. **Subtitle timing precision is critical** — frame-accurate
3. **Rendering performance is critical** — GPU-accelerated where possible
4. **All services must be scalable** — queue-driven, async processing
5. **Avoid premature optimization** — solve the problem first, optimize when measured

## Project Structure

```
src/
  frontend/          # React/TypeScript frontend (owned by frontend-builder)
  backend/           # NestJS backend API (owned by backend-builder)
  ai/                # Python AI pipeline (owned by ai-subtitle-engineer)
  shared/types/      # Shared TypeScript types (single source of truth)
```

## Shared Types Convention

`src/shared/types/` is the **single source of truth** for data contracts between frontend and backend.

### Rules
- **Only the orchestrator (main Claude session) may create or modify** files in `src/shared/types/`
- All agents (frontend-builder, backend-builder, ai-subtitle-engineer) have **READ-only** access
- When a schema change is needed, update shared types FIRST, then let agents adapt
- Frontend imports types for API responses and component props
- Backend implements these interfaces in DTOs, Prisma mappings, and API responses

### Type Files
| File | Contents |
|------|----------|
| `user.ts` | `User`, `UserPlan`, `UserWithPassword` |
| `video.ts` | `Video`, `VideoStatus` |
| `transcript.ts` | `Transcript`, `TranscriptWord` |
| `subtitle.ts` | `SubtitleSegment`, `SubtitleStyle`, `SubtitleStyleConfig`, `EmotionStyle` |
| `render.ts` | `RenderJob`, `RenderStatus` |
| `export.ts` | `Export`, `ExportResolution` |
| `api.ts` | `ApiResponse<T>`, `ApiError`, `PaginatedResponse<T>` |
| `index.ts` | Re-exports everything |

### Usage
```typescript
// Frontend
import type { Video, SubtitleSegment } from "@/shared/types";

// Backend
import type { Video, ApiResponse } from "../../shared/types";
```

## Agent Ownership

| Agent | Scope | Shared Types Access |
|-------|-------|-------------------|
| `frontend-builder` | `src/frontend/` | READ-only |
| `backend-builder` | `src/backend/` | READ-only |
| `ai-subtitle-engineer` | `src/ai/` | READ-only |
| Orchestrator (you) | Everything | READ + WRITE |

## Workflow for Schema Changes

1. Update the relevant file in `src/shared/types/`
2. Delegate frontend adaptation to `frontend-builder`
3. Delegate backend adaptation to `backend-builder`
4. Delegate AI pipeline adaptation to `ai-subtitle-engineer` (if applicable)
