# ASR Journal App

## Current State
The app has a WelcomePage, Sidebar with 13-week navigation, DailyPage with four prompts, WeeklyOverview, and CheckInPage for 30/60/90-day milestones. It uses warm amber/purple tones and Playfair Display typography. The sidebar shows a progress bar labeled "X of 90 days complete" with percentage tracking.

## Requested Changes (Diff)

### Add
- **JourneyCovenantPage** component: A sacred permission-giving page that users see after login for the first time. Explicitly states there is no "right" way, emphasizes self-paced exploration, clarifies optional community sharing is witnessing only. Language: protective, soulful, permission-giving.
- **CommunityWitnessPage** component: Optional sharing space branded as compassionate witnessing (not evaluation). Clear boundaries — no feedback pressure. Safe, non-performative tone.
- **ArchivePage** component: Access to all past week entries, framed as cyclical return rather than completion history. No completion-tracking language.
- **Micro-pause visual cue** on WelcomePage: A short grounding breath prompt or symbolic visual element.
- **Soul Reminder banner** visible in DailyPage: Gentle rotating message like "Who am I remembering today?" framed as optional identity noticing.
- **Integration & Aftercare section** on WeeklyOverview: A closing reflection for the week with gentle carry-forward prompts (not "results").
- New navigation entries in Sidebar for Community Witness and Archive sections.

### Modify
- **WelcomePage (Threshold Space)**: Rewrite with grounding (not instructional) language. Remove "Start Here" / step-by-step framing. Add emotional safety note. Add micro-pause exercise. Tone: warm, gentle, non-demanding. Button label changed from "Begin Your Journey" to something presence-inviting (e.g., "Enter when you're ready"). Remove numbered instructional steps.
- **Sidebar progress bar**: Replace "X of 90 days complete / X%" with presence-focused language like "X days visited" or "Your journey, at your own pace." Keep minimal — no percentage or completion framing. Add Community and Archive nav entries below the week list.
- **DailyPage**: Add soft soul reminder at top ("Show up in your own way"). Add a gentle note that all sections are optional. Replace "Save Entry" CTA with softer language like "Offer this to yourself" or "Hold this gently."
- **WeeklyOverview**: Add "Integration & Aftercare" section at bottom with 2–3 gentle closing prompts for the week. Add micro reminder: "You may revisit, pause, or skip days."
- **CheckInPage**: Soften numbered section headings to feel less like tasks. Add optional marker to each section.
- **Sidebar week navigation**: Add micro note at top of nav: "All weeks are open — enter wherever you feel called."

### Remove
- Instructional/numbered "How to Use" framing on WelcomePage (replace with presence-inviting narrative).
- "Mandatory" or completion-pressure language anywhere in the app.

## Implementation Plan
1. Rewrite WelcomePage.tsx as Threshold Space with micro-pause cue and consent note.
2. Create JourneyCovenantPage.tsx with permission-giving covenant language.
3. Create CommunityWitnessPage.tsx as optional witnessing space.
4. Create ArchivePage.tsx as non-linear return access.
5. Update Sidebar.tsx: soften progress language, add non-linearity note, add Community and Archive nav links.
6. Update DailyPage.tsx: add soul reminder, optional framing, soften save button.
7. Update WeeklyOverview.tsx: add Integration & Aftercare section, add micro reminder.
8. Update CheckInPage.tsx: soften section headings.
9. Update App.tsx: add new view types for covenant, community, archive.
