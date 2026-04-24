import fs from "node:fs";
import path from "node:path";
import type { PluginCatalogItem } from "@/data/plugins/catalog";

interface SeedCatalogEntry {
  vendor: string;
  plugin_name: string;
  plugin_type: string;
  primary_use_case: string;
  best_at: string;
  rating_1_to_10: number;
}

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function mapSeedTypeToAppType(seedType: string): string {
  const normalized = seedType.toLowerCase();

  if (normalized.includes("channel strip")) return "Channel Strip";
  if (normalized.includes("eq")) return "EQ";
  if (normalized.includes("compressor")) return "Compression";
  if (normalized.includes("limiter") || normalized.includes("clipper")) return "Limiter & Clipping";
  if (normalized.includes("saturation") || normalized.includes("tape") || normalized.includes("distortion")) {
    return "Saturation";
  }
  if (normalized.includes("reverb")) return "Reverb";
  if (normalized.includes("delay")) return "Delay";
  if (normalized.includes("filter")) return "Filter";
  if (normalized.includes("meter")) return "Metering & Analysis";
  if (normalized.includes("mixing suite") || normalized.includes("mastering suite")) return "Mix Assistant";
  if (normalized.includes("synth")) return "Instrument";
  if (normalized.includes("vocal")) return "Dynamics Utility";
  if (normalized.includes("utility")) return "Utility";

  return "Utility";
}

function readSeedCatalogFile(): SeedCatalogEntry[] {
  const seedPath = path.join(process.cwd(), "logic_au_plugin_seed_catalog.jsonl");
  if (!fs.existsSync(seedPath)) {
    return [];
  }

  const raw = fs.readFileSync(seedPath, "utf8");
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const parsed: SeedCatalogEntry[] = [];
  for (const line of lines) {
    try {
      const item = JSON.parse(line) as Partial<SeedCatalogEntry>;
      if (!item.plugin_name || !item.vendor || !item.plugin_type) {
        continue;
      }

      parsed.push({
        vendor: item.vendor,
        plugin_name: item.plugin_name,
        plugin_type: item.plugin_type,
        primary_use_case: item.primary_use_case ?? "General use",
        best_at: item.best_at ?? "General studio utility",
        rating_1_to_10: typeof item.rating_1_to_10 === "number" ? item.rating_1_to_10 : 7,
      });
    } catch {
      // Ignore malformed JSONL rows and continue parsing.
    }
  }

  return parsed;
}

function toDisplayName(seed: SeedCatalogEntry): string {
  if (seed.plugin_name.toLowerCase().startsWith(seed.vendor.toLowerCase())) {
    return seed.plugin_name;
  }

  return `${seed.vendor} ${seed.plugin_name}`;
}

export function buildEnhancedPluginCatalog(baseCatalog: PluginCatalogItem[]): PluginCatalogItem[] {
  const mergedByKey = new Map<string, PluginCatalogItem>();

  for (const plugin of baseCatalog) {
    mergedByKey.set(normalizeKey(plugin.name), plugin);
  }

  const seedEntries = readSeedCatalogFile();
  for (const seed of seedEntries) {
    const displayName = toDisplayName(seed);
    const key = normalizeKey(displayName);
    const existing = mergedByKey.get(key);

    if (existing) {
      mergedByKey.set(key, {
        ...existing,
        popularity: Math.max(existing.popularity, seed.rating_1_to_10),
        bestOn:
          existing.bestOn.length >= seed.primary_use_case.length ? existing.bestOn : seed.primary_use_case,
        knownFor: existing.knownFor.length >= seed.best_at.length ? existing.knownFor : seed.best_at,
      });
      continue;
    }

    mergedByKey.set(key, {
      name: displayName,
      type: mapSeedTypeToAppType(seed.plugin_type),
      popularity: seed.rating_1_to_10,
      emulation: `${seed.plugin_type} style`,
      bestOn: seed.primary_use_case,
      knownFor: seed.best_at,
    });
  }

  return [...mergedByKey.values()];
}
