import type { ContentBundle, ContentNavItem } from "@/lib/sheet-schema";
import { cheatSheets } from "@/data/sheets";
import { trainingLessons } from "@/data/training/lessons";
import { getTopPillLabel } from "@/lib/nav-label";

export const contentSchemaVersion = 1;
export const minContentAppVersion = "1.0.0";

export function buildContentBundle(generatedAt = new Date().toISOString()): ContentBundle {
  const contentVersion = generatedAt.replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const navItems: ContentNavItem[] = cheatSheets.map((sheet) => ({
    id: sheet.id,
    href: `/sheets/${sheet.id}`,
    label: getTopPillLabel(sheet),
    title: sheet.header.title,
    icon: sheet.header.icon
  }));

  return {
    schemaVersion: contentSchemaVersion,
    contentVersion,
    generatedAt,
    minAppVersion: minContentAppVersion,
    navItems,
    cheatSheets,
    training: {
      lessons: trainingLessons
    }
  };
}
