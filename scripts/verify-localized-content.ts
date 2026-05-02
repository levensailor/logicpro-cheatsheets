import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { defaultContentLocale, supportedContentLocales } from "@/config/content-locales";
import type { ContentManifest } from "@/lib/sheet-schema";

const contentRoot = path.join(process.cwd(), "public", "content");

function readJson<T>(filePath: string): T {
  return JSON.parse(readFileSync(filePath, "utf8")) as T;
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function verifyManifestAndContent(manifestPath: string, contentPath: string, expectedURL: string): void {
  const manifest = readJson<ContentManifest>(manifestPath);
  const contentText = readFileSync(contentPath, "utf8");
  const sha256 = createHash("sha256").update(contentText).digest("hex");
  const bytes = Buffer.byteLength(contentText);

  assert(manifest.bundle.url === expectedURL, `Unexpected bundle url in ${manifestPath}`);
  assert(manifest.bundle.sha256 === sha256, `SHA mismatch for ${manifestPath}`);
  assert(manifest.bundle.bytes === bytes, `Byte count mismatch for ${manifestPath}`);
}

for (const locale of supportedContentLocales) {
  const localeDir = path.join(contentRoot, locale);
  verifyManifestAndContent(
    path.join(localeDir, "manifest.json"),
    path.join(localeDir, "content.json"),
    `/content/${locale}/content.json`
  );
}

verifyManifestAndContent(
  path.join(contentRoot, "manifest.json"),
  path.join(contentRoot, "content.json"),
  "/content/content.json"
);

const defaultLocalizedContent = readFileSync(
  path.join(contentRoot, defaultContentLocale, "content.json"),
  "utf8"
);
const legacyContent = readFileSync(path.join(contentRoot, "content.json"), "utf8");

assert(
  defaultLocalizedContent === legacyContent,
  "Legacy /content/content.json must match default locale content bundle."
);

console.log("Localized content verification passed.");
