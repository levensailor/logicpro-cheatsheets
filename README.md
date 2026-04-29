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
- Main app: `https://logicpro.guru`
- Default sheet route: `https://logicpro.guru/sheets/bass-guitar-mixing`
- Additional routes: `/sheets/<sheet-id>` for each sheet ID in `data/sheets/index.ts`
- Shared content manifest: `https://logicpro.guru/content/manifest.json`
- Shared content bundle: `https://logicpro.guru/content/content.json`
- Privacy policy: `https://logicpro.guru/privacy`
- Terms and conditions: `https://logicpro.guru/terms`
- Contact and support: `https://logicpro.guru/contact`

## App Store Submission Notes
- App name: `Logic Pro.Guru`
- Subtitle: `Band mixing cheat sheets`
- Primary category: Music
- Secondary category: Education, if available for the listing
- Privacy Policy URL: `https://logicpro.guru/privacy`
- Support URL: `https://logicpro.guru/contact`
- Marketing URL: `https://logicpro.guru/`
- Terms URL for description copy, if needed: `https://logicpro.guru/terms`
- Publisher contact: Levensailor, LLC, `support@pyrmid.pro`, 2206 Klein Rd, Wilmington NC 28405

### ASO Plan
- Lead the title, subtitle, and first description lines with Logic Pro, recording, mixing, mastering, band production, plugin choices, EQ, compression, routing, and LUFS reference value.
- Use this keyword set as a starting point, adjusting for Apple's 100-byte limit and avoiding terms already covered by the app name: `mixing,mastering,recording,band,cheat sheet,plugins,eq,compression,lufs,routing`.
- Write the description around the core promise: a structured Logic Pro handbook for tracking a band, building mixes, choosing plugins, understanding routing, and finishing masters without digging through scattered notes.
- Prepare 5-7 screenshots: intro/book overview, chapter navigation, tracking workflow, instrument mix guide, plugin finder, mastering/LUFS reference, and glossary/offline reader value.
- Launch free for the first release to build downloads and reviews. If launching paid, use a one-time price of `$2.99`; consider `$4.99` only after the app has stronger premium proof such as exclusive tools or frequent content updates.

## Login Instructions
- No login is required.
- The website is public read-only content intended for quick cheat sheet reference.
