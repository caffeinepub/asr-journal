# ASR Journal

## Current State
After login and covenant, app defaults to day 1. Sidebar is a flat list. No dedicated Threshold Space inside the authenticated hub. Journey Covenant disappears after first view. No Week Reflection node per week.

## Requested Changes (Diff)

### Add
- threshold view type as default landing after login
- ThresholdSpacePage component with grounding content and CTAs
- week-reflection view type and WeekReflectionPage per week
- Persistent Threshold Space and Journey Covenant links at top of sidebar
- Week Reflection node at end of each week in sidebar

### Modify
- App.tsx: default view becomes threshold
- Sidebar: full nav tree matching the blueprint

### Remove
- Nothing

## Implementation Plan
1. Add threshold and week-reflection to View type
2. Change default view to threshold
3. Create ThresholdSpacePage.tsx
4. Create WeekReflectionPage.tsx
5. Refactor Sidebar.tsx to full nav tree
6. Wire new views in App.tsx
