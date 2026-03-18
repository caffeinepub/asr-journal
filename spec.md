# ASR Journal — Hub-Ready App Structure

## Current State
The app has WelcomePage, JourneyCovenantPage, Sidebar, WeeklyOverview, DailyPage, CheckInPage, CommunityWitnessPage, ArchivePage. The welcome screen has a single "Enter when you're ready" CTA. Sidebar shows W1/W2 labels and 0/7 day counters.

## Requested Changes (Diff)

### Add
- Core Guidance Library page (sidebar section, expandable, optional lessons/reflections/rituals)
- Identity Tracking page (optional hidden tab — soul reminders, no grading)
- New view types in App.tsx: `guidance` and `identity`
- WelcomePage: Three CTA buttons — "Enter Journal", "Community Witness (optional)", "Archive & Return" — visible before login; the last two route to public-facing info screens or prompt login
- WelcomePage: Threshold Space section (grounding animation already exists, keep and refine) with exact microcopy
- WelcomePage: Journey Covenant preview section immediately after Threshold

### Modify
- WelcomePage title: "ASR Journal — 90-Day Soul Reminder Journey"
- WelcomePage microcopy: exact three lines as specified
- Sidebar: Remove W1/W2 numeric labels from week buttons; remove 0/7 counters next to weeks
- Sidebar: Add Core Guidance Library link and Identity Tracking (optional) link in bottom nav area
- WeeklyOverview: Update per-week microcopy to "This week invites you into [theme]. Move at your own pace, revisit anytime, notice without judgment."
- ArchivePage: Update microcopy to "Return anytime — all reflections, art, and prompts remain yours."
- Global tone: Ensure all section headings are permission-giving; no performance language anywhere

### Remove
- W1/W2 labels from sidebar week items
- 0/7 numeric day counters from sidebar week items

## Implementation Plan
1. Update App.tsx: add `guidance` and `identity` view types, render new pages
2. Update WelcomePage: exact title, three-line microcopy, three CTA buttons (Enter Journal primary, Community Witness optional, Archive & Return)
3. Update Sidebar: remove W-labels and day counters; add Core Guidance Library and Identity Tracking links
4. Update WeeklyOverview: per-week microcopy as specified
5. Update ArchivePage: microcopy tweak
6. Create GuidanceLibraryPage: optional content library with sections for Lessons, Reflections, Rituals — all framed as optional
7. Create IdentityTrackingPage: soul-reminder style prompts for noticing shifts, no grading, optional dashboard
