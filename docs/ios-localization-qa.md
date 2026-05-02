# iOS Localization QA Matrix

## Goal
Verify locale-aware content loading in the iOS app with language fallback:
1. full locale (for example, `fr-ca`)
2. language-only locale (for example, `fr`)
3. `en`

## Preconditions
- Remote content is exported with localized paths in `public/content/{locale}`.
- iOS app is built with the latest locale-aware content services.
- Optional locale seed files can be added as `SeedContent_{locale}.json`.

## Test Cases

### 1) Exact locale available
- Device preferred language: `fr-CA`
- Remote files available: `fr-ca`
- Expected result:
  - App loads `fr-ca` manifest/bundle.
  - Status message includes `(fr-ca)`.

### 2) Language fallback available
- Device preferred language: `pt-BR`
- Remote files available: `pt` only
- Expected result:
  - App tries `pt-br`, then `pt`, and loads `pt`.
  - Status message includes fallback note from `pt-br`.

### 3) Unsupported locale falls back to English
- Device preferred language: `ja-JP`
- Remote files available: `en` only
- Expected result:
  - App tries `ja-jp`, `ja`, then `en`.
  - Status message includes fallback note from `ja-jp`.

### 4) Offline startup with locale cache
- Start app once online in `fr-CA` so localized cache is written.
- Disable network and relaunch.
- Expected result:
  - App loads cached locale content.
  - No crash and no empty state.

### 5) Offline startup with seed content only
- Clear app cache.
- Ensure no network.
- Expected result:
  - App loads bundled `SeedContent*.json` fallback chain.
  - App remains readable offline.

## Scripted Content Integrity Check
Run:

`npm run verify:content`

Expected:
- localized manifest/content pairs pass hash and byte checks
- legacy `/content/manifest.json` and `/content/content.json` remain valid
- legacy content matches default locale content
