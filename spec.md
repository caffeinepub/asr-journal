# ASR Journal

## Current State

The app has: WelcomePage (Threshold Space), JourneyCovenantPage, WeeklyOverview, DailyPage, CheckInPage (30/60/90-day), GuidanceLibraryPage, CommunityWitnessPage, ArchivePage, IdentityTrackingPage (Soul Reflection).

The Threshold Space and Journey Covenant were just updated to include verbatim Segment 1 text. The weekly/daily content (journalData.ts) already matches Segments 2–4 verbatim.

## Requested Changes (Diff)

### Add
- `JourneyMapPage` component — Phased Inner Journey Map (hub container #3). Shows verbatim Segment 1 Table of Contents structure, all 13 weeks with themes as clickable links, and 30/60/90-day reflection milestones as integration points. New view type: `{ type: "journey-map" }`.
- `IntegrationAftercarePage` component — Integration & Aftercare (hub container #8). Contains: Segment 5 Closing Ritual steps (verbatim), Notes pages (freeform areas for: My Favorite Prompts from This Journey, Symbols & Themes That Showed Up, Creative Ideas or Breakthroughs), Future Intentions prompts (verbatim from Segment 5: "What do you want to create next? What are you curious about? What spiritual practice do you want to deepen?"). New view type: `{ type: "aftercare" }`.
- Sidebar links for Journey Map and Integration & Aftercare.

### Modify
- `IdentityTrackingPage` — map explicitly to Segment 5. Add: quick-access buttons to the three 30/60/90-day reflections at the top, and a "Notes" freeform section below the existing prompts with Segment 5 "Notes pages for self-tracking" heading and open textarea. Keep existing soul reflection prompts.
- `GuidanceLibraryPage` — add verbatim Segment 1 content as a "Daily Practice Guide" panel at the top of the accordion. Content: Daily Page Structure (Spiritual Prompt, Art Prompt, Writing Prompt, Gratitude Anchor) with verbatim descriptions from Segment 1.
- `ArchivePage` — add Segment 5 language about returning: "Your practice is cyclical and ongoing. Come back anytime — all reflections, art, and prompts remain yours." Also add a link to Integration & Aftercare from the archive page footer.
- `Sidebar` — add Journey Map and Integration & Aftercare links. Rename "Soul Reflection" to "Identity Tracking" with "(optional)" note.
- `App.tsx` — add `journey-map` and `aftercare` view types.

### Remove
- Nothing removed.

## Implementation Plan

1. Add `journey-map` and `aftercare` view types to `App.tsx`
2. Create `JourneyMapPage.tsx` with Segment 1 TOC structure and week/milestone links
3. Create `IntegrationAftercarePage.tsx` with Segment 5 closing ritual, notes pages, and future intentions
4. Update `IdentityTrackingPage.tsx` to add 30/60/90 access buttons and notes section
5. Update `GuidanceLibraryPage.tsx` to add Daily Practice Guide panel with verbatim Segment 1 daily structure
6. Update `ArchivePage.tsx` with Segment 5 return language
7. Update `Sidebar.tsx` with new nav links
8. Validate and fix any errors
