# Logic Pro Cheat Sheets Web

## Project Description
This repository contains a Vercel-ready Next.js website that turns Logic Pro cheat sheets into editable web components.  
Users can navigate between all sheets from an icon menu and view structured cards, checklists, chain steps, and tables without relying on full-page static images.

The repository also includes a SwiftUI iOS reader app in `ios/LogicProCheatSheets`. The iOS app uses the same exported JSON content as the website, fetches updates from the deployed site, and caches the latest verified content for offline use.

## Author
Levensailor

## Deployment Instructions
1. Install dependencies:
   - `npm install`
2. Run locally:
   - `npm run dev`
3. Build for production:
   - `npm run build`
   - The build runs `npm run export:content` first, which writes static JSON to `public/content`.
4. Deploy to Vercel:
   - Import this repository in [Vercel](https://vercel.com/new)
   - Keep the default Next.js framework settings
   - Deploy from the `main` branch

## Shared Content
- Static content manifest: `/content/manifest.json`
- Static content bundle: `/content/content.json`
- iOS bundled seed content: `ios/LogicProCheatSheets/LogicProCheatSheets/Resources/SeedContent.json`
- Content source of truth: `data/sheets/index.ts`

## iOS App
1. Open `ios/LogicProCheatSheets/LogicProCheatSheets.xcodeproj` in Xcode.
2. Set the `ContentBaseURL` build setting / Info value to your deployed Vercel URL.
3. Select a development team and bundle identifier for your Apple Developer account.
4. Build and archive from Xcode when ready to publish.

The iOS app loads bundled seed content first, then checks `/content/manifest.json` for newer compatible content. Verified content is cached in Application Support so the latest downloaded content remains available offline.

## Public Assets and URLs
- Main app (after deploy): `https://<your-vercel-project>.vercel.app`
- Default sheet route: `https://<your-vercel-project>.vercel.app/sheets/bass-guitar-mixing`
- Additional routes: `/sheets/<sheet-id>` for each sheet ID in `data/sheets/index.ts`
- Shared content manifest: `https://<your-vercel-project>.vercel.app/content/manifest.json`
- Shared content bundle: `https://<your-vercel-project>.vercel.app/content/content.json`

## Login Instructions
- No login is required.
- The website is public read-only content intended for quick cheat sheet reference.
