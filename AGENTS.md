## Learned User Preferences

- Prefers committing and pushing changes directly with minimal extra ceremony (described as "vibe coding").
- Wants the cheat sheet web app styled like a light flyer, including a white or near-white background and readable layout.
- Wants sheet content rendered as editable, component-driven pages (not full-page static images); embedded images are acceptable for chart-like or illustration content.
- When following an attached implementation plan, do not modify the plan file itself—only implement against it.
- For Font Awesome SVG usage in this project, import Font Awesome’s base stylesheet so icons size correctly; the user was satisfied with the pre-tuning icon scale once core styles were fixed.
- When sheets recommend plugins, show a screenshot or product-style image next to each plugin name (not names alone).

## Learned Workspace Facts

- This repository is a Next.js App Router app deployed on Vercel; the public app is available at `https://logicpro-cheatsheets.vercel.app/`.
- Sheets are data-driven: routes live under `/sheets/[sheetId]`, with definitions in `data/sheets/` and shared rendering components under `components/`.
- The project originated from PNG cheat sheet assets, which were transcribed into structured data for the web app.
