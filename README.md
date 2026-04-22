# Logic Pro Cheat Sheets Web

## Project Description
This repository contains a Vercel-ready Next.js website that turns Logic Pro cheat sheets into editable web components.  
Users can navigate between all sheets from a top icon menu and view structured cards, checklists, chain steps, and tables without relying on full-page static images.

## Author
Levensailor

## Deployment Instructions
1. Install dependencies:
   - `npm install`
2. Run locally:
   - `npm run dev`
3. Build for production:
   - `npm run build`
4. Deploy to Vercel:
   - Import this repository in [Vercel](https://vercel.com/new)
   - Keep the default Next.js framework settings
   - Deploy from the `main` branch

## Public Assets and URLs
- Main app (after deploy): `https://<your-vercel-project>.vercel.app`
- Default sheet route: `https://<your-vercel-project>.vercel.app/sheets/bass-guitar-mixing`
- Additional routes: `/sheets/<sheet-id>` for each sheet ID in `data/sheets/index.ts`

## Login Instructions
- No login is required.
- The website is public read-only content intended for quick cheat sheet reference.
