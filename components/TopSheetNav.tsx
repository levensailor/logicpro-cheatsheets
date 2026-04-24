"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { CheatSheet } from "@/lib/sheet-schema";

interface TopSheetNavProps {
  sheets: CheatSheet[];
}

function getTopPillLabel(sheet: CheatSheet): string {
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

export function TopSheetNav({ sheets }: TopSheetNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="topNav" aria-label="Cheat sheets">
      <div className="mobileNavBar">
        <Link href="/" className="mobileHomeLink" aria-label="Open handbook introduction">
          <span aria-hidden="true">📚</span>
          <span>Logic Pro Book</span>
        </Link>
        <button
          className="chapterMenuButton"
          type="button"
          aria-controls="chapter-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span aria-hidden="true">☰</span>
          Chapters
        </button>
      </div>

      <div id="chapter-navigation" className={`navLinks ${isOpen ? "open" : ""}`}>
        <Link
          href="/"
          aria-label="Open handbook introduction"
          className={`sheetTab ${pathname === "/" ? "active" : ""}`}
        >
          <span className="tabIcon" aria-hidden="true">
            📚
          </span>
          <span className="tabLabel">Intro</span>
        </Link>
        {sheets.map((sheet) => {
          const href = `/sheets/${sheet.id}`;
          const isActive = pathname === href;
          const label = getTopPillLabel(sheet);

          return (
            <Link
              key={sheet.id}
              href={href}
              aria-label={`Open ${sheet.header.title}`}
              className={`sheetTab ${isActive ? "active" : ""}`}
            >
              <span className="tabIcon" aria-hidden="true">
                {sheet.header.icon}
              </span>
              <span className="tabLabel">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
