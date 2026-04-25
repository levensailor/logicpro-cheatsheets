import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { buildContentBundle } from "@/lib/content-bundle";
import type { ContentManifest } from "@/lib/sheet-schema";

const contentDir = path.join(process.cwd(), "public", "content");
const contentPath = path.join(contentDir, "content.json");
const manifestPath = path.join(contentDir, "manifest.json");
const generatedAt = new Date().toISOString();
const bundle = buildContentBundle(generatedAt);
const contentJson = `${JSON.stringify(bundle, null, 2)}\n`;
const sha256 = createHash("sha256").update(contentJson).digest("hex");
const bytes = Buffer.byteLength(contentJson);

const manifest: ContentManifest = {
  schemaVersion: bundle.schemaVersion,
  contentVersion: bundle.contentVersion,
  generatedAt: bundle.generatedAt,
  minAppVersion: bundle.minAppVersion,
  bundle: {
    url: "/content/content.json",
    sha256,
    bytes
  }
};

mkdirSync(contentDir, { recursive: true });
writeFileSync(contentPath, contentJson);
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
