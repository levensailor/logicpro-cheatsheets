## Learned User Preferences

- Prefers committing and pushing changes directly with minimal extra ceremony (described as "vibe coding").
- Wants the cheat sheet web app styled like a light flyer, including a white or near-white background and readable layout.
- Wants sheet content rendered as editable, component-driven pages (not full-page static images); embedded images are acceptable for chart-like or illustration content.
- Thinks of the app as a book/manual-style compilation that helps users record, mix, and master a band in Logic Pro; navigation and page structure should support chapter-style reading.
- When following an attached implementation plan, do not modify the plan file itself—only implement against it.
- For Font Awesome SVG usage in this project, import Font Awesome’s base stylesheet so icons size correctly; the user was satisfied with the pre-tuning icon scale once core styles were fixed.
- When sheets recommend plugins, show a screenshot or product-style image next to each plugin name (not names alone); local plugin image filenames may not exactly match plugin names, so fuzzy-match when clearly intended and ask the user to confirm when ambiguous.
- Prefers compact, visually appealing reference layouts over verbose repeated-label tables; use compact tiles or detail-card layouts for dense cheat-sheet data when possible.

## Learned Workspace Facts

- This repository is a Next.js App Router app deployed on Vercel; the public app is available at `https://logicpro-cheatsheets.vercel.app/`.
- The root route is a visual intro/landing page for the Logic Pro cheat sheet book, with an Intro nav entry rather than redirecting to the first sheet.
- Primary sheet navigation is a sticky left sidebar on desktop; on narrow viewports it falls back to a horizontal sticky bar.
- Mobile/book UX includes chapter navigation, previous/next page controls, table/card responsive behavior, and PWA/iOS-readiness metadata.
- Sheets are data-driven: routes live under `/sheets/[sheetId]`, with definitions in `data/sheets/` and shared rendering components under `components/`.
- The app includes DAW/reference chapters beyond instrument sheets, including Audio Routing, Interfaces, Monitoring, Logic Pro Workflow, Automation, Plugins, Gain Staging & LUFS, and Appendix Audio Terms.
- App Store support/legal surfaces are built into the site as `/privacy`, `/terms`, and `/contact` pages, with shared footer links.
- The project originated from PNG cheat sheet assets, which were transcribed into structured data for the web app.
- Shared content is exported as static JSON under `public/content/`, with `content.json` and `manifest.json` serving as the content source for remote clients.
- A SwiftUI iOS app lives under `ios/LogicProCheatSheets`, is branded `Logic Pro.Guru`, and loads bundled, cached, and remote web-served content for offline use.
- The iOS `HeaderLogo` asset uses appearance-aware light and dark banner variants through the asset catalog.
