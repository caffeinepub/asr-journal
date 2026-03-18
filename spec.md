# ASR Journal — Backend Content Storage

## Current State
All 90 days of journal content (prompts, themes, week data) live in `src/frontend/src/journalData.ts` as a large static TypeScript file. This causes build timeouts when the file grows too large.

## Requested Changes (Diff)

### Add
- Motoko types: `DayData`, `WeekData` with all journal fields
- Backend query: `getWeeks()` returns all 13 weeks with days embedded
- Backend query: `getWeek(weekNumber: Nat)` returns a single week
- Frontend hook `useJournalContent` that fetches week/day data from backend

### Modify
- `main.mo` — add journal content data store with all 90 days seeded at canister init
- Frontend components (`WeeklyOverview`, `DailyPage`, `CheckInPage`) — replace direct imports of `journalData.ts` with backend fetch
- `backend.d.ts` — add `WeekData`, `DayData` types and new query methods

### Remove
- `journalData.ts` static data array (replaced by backend queries)

## Implementation Plan
1. Extend `main.mo` with `DayData`/`WeekData` types and all 90 days seeded in a stable array, exposed via `getWeeks` and `getWeek` queries
2. Regenerate `backend.d.ts` with new types
3. Add `useJournalContent` React hook that calls `getWeeks()` once and caches
4. Refactor all frontend components to use the hook instead of the static import
