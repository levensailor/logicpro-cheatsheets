"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CheatSheet } from "@/lib/sheet-schema";

interface TopSheetNavProps {
  sheets: CheatSheet[];
}

function getTopPillLabel(sheet: CheatSheet): string {
  if (sheet.id === "tracking-band") {
    return "Tracking";
  }

  return sheet.header.title
    .replace(/\b(cheat\s*sheet|guide|mixing)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function TopSheetNav({ sheets }: TopSheetNavProps) {
  const pathname = usePathname();

  return (
    <nav className="topNav" aria-label="Cheat sheets">
      {sheets.map((sheet) => {
        const href = `/sheets/${sheet.id}`;
        const isActive = pathname === href;

        return (
          <Link key={sheet.id} href={href} className={`sheetTab ${isActive ? "active" : ""}`}>
            <span className="tabIcon" aria-hidden="true">
              {sheet.header.icon}
            </span>
            <span className="tabLabel">{getTopPillLabel(sheet)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
