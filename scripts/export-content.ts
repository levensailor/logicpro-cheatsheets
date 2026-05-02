import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { buildContentBundle } from "@/lib/content-bundle";
import { defaultContentLocale, supportedContentLocales } from "@/config/content-locales";
import type { ContentManifest } from "@/lib/sheet-schema";

const contentDir = path.join(process.cwd(), "public", "content");
const generatedAt = new Date().toISOString();
const bundlesByLocale = new Map<
  string,
  {
    contentJson: string;
    manifest: ContentManifest;
    manifestJson: string;
  }
>();

for (const locale of supportedContentLocales) {
  const bundle = buildContentBundle(generatedAt, locale);
  const contentJson = `${JSON.stringify(bundle, null, 2)}\n`;
  const sha256 = createHash("sha256").update(contentJson).digest("hex");
  const bytes = Buffer.byteLength(contentJson);

  const manifest: ContentManifest = {
    schemaVersion: bundle.schemaVersion,
    contentVersion: bundle.contentVersion,
    generatedAt: bundle.generatedAt,
    minAppVersion: bundle.minAppVersion,
    bundle: {
      url: `/content/${locale}/content.json`,
      sha256,
      bytes
    }
  };

  bundlesByLocale.set(locale, {
    contentJson,
    manifest,
    manifestJson: `${JSON.stringify(manifest, null, 2)}\n`
  });
}

const defaultLocaleBundle = bundlesByLocale.get(defaultContentLocale);
if (!defaultLocaleBundle) {
  throw new Error(`Default locale '${defaultContentLocale}' must be present in supportedContentLocales.`);
}

const legacyManifest: ContentManifest = {
  ...defaultLocaleBundle.manifest,
  bundle: {
    ...defaultLocaleBundle.manifest.bundle,
    url: "/content/content.json"
  }
};

mkdirSync(contentDir, { recursive: true });

for (const [locale, files] of bundlesByLocale.entries()) {
  const localeDir = path.join(contentDir, locale);
  mkdirSync(localeDir, { recursive: true });
  writeFileSync(path.join(localeDir, "content.json"), files.contentJson);
  writeFileSync(path.join(localeDir, "manifest.json"), files.manifestJson);
}

// Backward-compatible paths for existing clients.
writeFileSync(path.join(contentDir, "content.json"), defaultLocaleBundle.contentJson);
writeFileSync(path.join(contentDir, "manifest.json"), `${JSON.stringify(legacyManifest, null, 2)}\n`);
