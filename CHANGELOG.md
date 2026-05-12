# Changelog

## 2026-05-12 11:59 EST
- Automation visuals quality pass: replace `03-vocal-rider-plugin.png` with an actual Waves Vocal Rider plugin interface image and update replacement checklist source metadata.

## 2026-05-12 11:56 EST
- Automation chapter visuals: replace all 32 missing `/images/automation/*` image references with concrete assets and add `public/images/automation/PLACEHOLDER_IMAGE_CHECKLIST.md` documenting per-file replacements.

## 2026-05-12 10:58 EST
- Deep Dive on MIDI training assets: replace 10 empty step PNG placeholders with real sourced images and document source links in the lesson assets README.

## 2026-05-11 20:00 EST
- Chat (web + iOS): normalize spaced `** … **` into tight `**…**` outside fenced code so bold parses and asterisks are not shown; explicit `strong`/`em` styles in web chat markdown.

## 2026-05-11 19:00 EST
- `/api/chat` system prompt: require blank-line Markdown (paragraphs, headings, lists) so web and iOS Textual clients parse replies reliably.

## 2026-05-11 18:00 EST
- iOS: replace MarkdownUI with [Textual](https://github.com/gonzalezreal/textual) `StructuredText` for Ask-tab assistant markdown; raise minimum iOS to **18** (required by Textual); update `Package.resolved` (Textual, SwiftUIMath, ConcurrencyExtras).

## 2026-05-11 17:00 EST
- iOS Ask tab: render assistant replies with [MarkdownUI](https://github.com/gonzalezreal/swift-markdown-ui) (GitHub-flavored Markdown via cmark-gfm); SPM dependency and shared `Package.resolved`; keep LLM newline-healing preprocessor before parsing.

## 2026-05-11 16:00 EST
- iOS Ask tab: insert paragraph breaks for common LLM markdown glues (no newline before `1.` after `:`/`;`, `**label**Purpose`, `word.2. Next` list runs, list after bold with spaces).

## 2026-05-11 15:00 EST
- iOS Ask tab: normalize single newlines to Markdown paragraph breaks outside code fences; apply explicit title fonts for `#` heading presentation intents (SwiftUI does not style headers by default); merge default body font before heading styles so merges do not strip header fonts.

## 2026-05-11 14:00 EST
- iOS Ask tab: render assistant replies with native Markdown via `AttributedString` (`interpretedSyntax: .full`); user bubbles stay plain text.

## 2026-05-11 13:00 EST
- Render Logic Pro Guru chat replies with GitHub-flavored markdown (headings, lists, code, tables, links) via `react-markdown` and `remark-gfm`.

## 2026-05-11 12:00 EST
- Route `/api/chat` through Vercel AI Gateway (`gateway('openai/gpt-4o')`) instead of direct `@ai-sdk/openai`; document `AI_GATEWAY_API_KEY` and remove unused `openai` / `@ai-sdk/openai` packages.

## 2026-05-11 11:00 EST
- iOS Home banner: remove chapter-count and workflow subtitle line under the main title.

## 2026-05-11 10:45 EST
- iOS Home: restore full-width logo banner; remove Start with and Jump into blocks; hide subtitles under Mixing chapter rows.

## 2026-05-11 10:15 EST
- Rename Library/Home chapter group DAW to Fundamentals and list it before Tracking.
- Add Home callout for Ask AI describing Logic Pro, plugin-vendor docs, and industry-standard training context.

## 2026-05-11 09:40 EST
- Condense iOS Home tab: Start with tracking, horizontal Jump into chips, and grouped chapter list that opens Library on the selected sheet.
- Lift Library chapter selection to MainTabView so Home and Library share one selected chapter state.
- Extract shared `ChapterCategory` model; simplify Library empty-detail placeholder to avoid duplicating Home onboarding.

## 2026-05-03 13:04 EST
- Replace mocked iOS Settings tab with a real Settings screen and a functional Display preferences page.
- Add persistent iOS appearance (System/Light/Dark) and text size controls that apply app-wide.
- Add iOS Settings support links for Privacy, Terms, and Contact.

## 2026-05-03 02:15 EST
- Add user settings page with font size and light/dark mode support.
- Implement global theme system with Light, Dark, and System preferences.
- Add font size controls (Small, Medium, Large) with global application.
- Create settings context provider for persistent user preferences.
- Add comprehensive dark theme CSS with 18+ component overrides.
- Include settings link in site footer navigation.

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
