## Learned User Preferences

- Prefers committing and pushing changes directly with minimal extra ceremony (described as "vibe coding").
- Wants the cheat sheet web app styled like a light flyer, including a white or near-white background and readable layout.
- Wants sheet content rendered as editable, component-driven pages (not full-page static images); embedded images are acceptable for chart-like or illustration content.
- Thinks of the app as a book/manual-style compilation that helps users record, mix, and master a band in Logic Pro; navigation and page structure should support chapter-style reading.
- When following an attached implementation plan, do not modify the plan file itself—only implement against it.
- For Font Awesome SVG usage in this project, import Font Awesome’s base stylesheet so icons size correctly; the user was satisfied with the pre-tuning icon scale once core styles were fixed.
- When sheets recommend plugins, show a screenshot or product-style image next to each plugin name (not names alone); local plugin image filenames may not exactly match plugin names, so fuzzy-match when clearly intended and ask the user to confirm when ambiguous.

## Learned Workspace Facts

- This repository is a Next.js App Router app deployed on Vercel; the public app is available at `https://logicpro-cheatsheets.vercel.app/`.
- The root route is a visual intro/landing page for the Logic Pro cheat sheet book, with an Intro nav entry rather than redirecting to the first sheet.
- Primary sheet navigation is a sticky left sidebar on desktop; on narrow viewports it falls back to a horizontal sticky bar.
- Mobile/book UX includes chapter navigation, "On this sheet" anchored section links, previous/next page controls, table/card responsive behavior, and PWA/iOS-readiness metadata.
- Sheets are data-driven: routes live under `/sheets/[sheetId]`, with definitions in `data/sheets/` and shared rendering components under `components/`.
- The app includes reference chapters beyond instrument sheets, including Plugins, Appendix Audio Terms, Audio Routing, and Automation.
- The project originated from PNG cheat sheet assets, which were transcribed into structured data for the web app.
