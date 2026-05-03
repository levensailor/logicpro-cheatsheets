# Changelog

## 2026-05-02 20:21 EST
- Finish the iOS user settings page with saved appearance and font size controls.

## 2026-05-02 10:02 EST
- Add locale-aware content delivery for iOS with full-locale to language fallback and English default fallback.
- Refactor content export to generate per-locale manifest/content artifacts while preserving legacy `/content/manifest.json` and `/content/content.json` compatibility.
- Add locale-scoped iOS cache and bundled seed resolution plus localization QA and content integrity verification scripts.

## 2026-04-30 07:20 EST
- Add training lesson content to the shared Vercel-exported content bundle schema.
- Add backward-compatible iOS bundle decoding for remote training content.
- Switch iOS Train and Home lesson cards to source training data from synced content bundles.
- Add on-device cached remote image rendering for sheet media and training screenshots.
- Publish regenerated content/manifest payloads and bundle training screenshots for Vercel delivery.
- Refresh Your First Mix screenshot assets for updated training visuals.

## 2026-04-29 16:48 EST
- Expand Your First Mix guide to 13 comprehensive steps with 10x more content.
- Add concept explanations, numbered actions, settings references, pro tips, common mistakes, and verification steps.
- Include troubleshooting section and screenshot placeholder support.
- Create detailed screenshot specifications for 8 annotated Logic Pro demonstrations.

## 2026-04-29 15:28 EST
- Convert the Your First Mix iOS lesson into a numbered visual step-by-step guide.

## 2026-04-29 12:44 EST
- Add clickable Your First Mix training content and surface new popular training lessons on the iOS home tab.

## 2026-04-29 12:30 EST
- Add bottom tab navigation with mocked Home, Library, Train, Saved, and Settings sections to the iOS app.

## 2026-04-29 12:09 EST
- Replace the iOS light-mode header banner artwork.

## 2026-04-29 12:04 EST
- Add light and dark iOS header banner variants.

## 2026-04-29 11:48 EST
- Replace the Logic Pro Guru header banner across the web and iOS app.

## 2026-04-29 11:26 EST
- Move the Logic Pro Guru banner into the persistent app headers and remove Home/Intro buttons.

## 2026-04-29 11:23 EST
- Replace text branding on the home surfaces with the Logic Pro Guru header image.

## 2026-04-29 11:10 EST
- Add the Logic Pro.Guru iOS app icon asset catalog.

## 2026-04-29 10:39 EST
- Add App Store-ready privacy, terms, contact, ASO, and launch pricing guidance for Logic Pro.Guru.

## 2026-04-25 13:46 EST
- Improve plugin chooser recommendations with instrument/bus context filters and five-star ratings on web and iOS.

## 2026-04-25 12:22 EST
- Replace repeated detail-card table subtitles with compact icon labels on web and iOS.

## 2026-04-25 12:16 EST
- Add compact visual table layouts for dense reference sections across the web and iOS handbook.

## 2026-04-25 11:52 EST
- Align mixing and mastering guide content with modular chain guidance, source-specific compression notes, nuanced LUFS delivery targets, corrected EQ ranges, and current plugin recommendations.

## 2026-04-25 11:16 EST
- Add a DAW Interfaces chapter with converter, preamp, latency, expansion, DSP, and audio interface recommendation guidance.

## 2026-04-25 11:09 EST
- Add a DAW Monitoring chapter with speaker placement, room treatment, headphone, format, playback check, and gear recommendation guidance.

## 2026-04-25 11:04 EST
- Expand the Gain Staging & LUFS chapter with streaming, CD, vinyl, tape, hi-res, and club delivery guidance.

## 2026-04-25 11:01 EST
- Expand the Tracking chapter with professional band-recording guidance for home studios.

## 2026-04-25 10:06 EST
- Convert the handbook content into a shared static JSON layer and add a SwiftUI iOS app that fetches, verifies, caches, and renders the content offline.

## 2026-04-22 11:05 EST
- Build Vercel-ready Logic Pro cheat sheet website using Next.js App Router.
- Add top icon navigation and dynamic `/sheets/[sheetId]` routes for all 14 sheets.
- Convert sheet content into editable component-driven data structures.
- Add reusable section components for chain order, cards, tables, and checklists.
- Add baseline project docs and contribution workflow guidance.
