import type { CheatSheet } from "@/lib/sheet-schema";

export function getTopPillLabel(sheet: CheatSheet): string {
  if (sheet.id === "tracking-band") {
    return "Tracking";
  }
  if (sheet.id === "kick-drum-mixing") {
    return "Kick";
  }
  if (sheet.id === "snare-drum-mixing") {
    return "Snare";
  }
  if (sheet.id === "vocal-mixing") {
    return "Vocals";
  }
  if (sheet.id === "room-mic-mixing-guide") {
    return "Room";
  }
  if (sheet.id === "mastering-final-mix") {
    return "Mastering";
  }

  return sheet.header.title
    .replace(/\b(cheat\s*sheet|guide|mixing)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
