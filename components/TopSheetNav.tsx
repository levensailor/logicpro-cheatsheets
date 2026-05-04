"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { CheatSheet } from "@/lib/sheet-schema";
import { getTopPillLabel } from "@/lib/nav-label";

interface TopSheetNavProps {
  sheets: CheatSheet[];
}

export function TopSheetNav({ sheets }: TopSheetNavProps) {
  const pathname = usePathname();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const isOpen = openPathname === pathname;

  return (
    <nav className="topNav" aria-label="Cheat sheets">
      <div className="mobileNavBar">
        <Link href="/" className="brandHeaderLink" aria-label="Open handbook introduction">
          <Image
            className="brandHeaderImage"
            src="/brand/logic-pro-guru-header.png"
            alt="Logic Pro Guru"
            width={1024}
            height={248}
            priority
          />
        </Link>
        <button
          className="chapterMenuButton"
          type="button"
          aria-controls="chapter-navigation"
          aria-expanded={isOpen}
          onClick={() => setOpenPathname((current) => (current === pathname ? null : pathname))}
        >
          <span aria-hidden="true">☰</span>
          Chapters
        </button>
      </div>

      <div id="chapter-navigation" className={`navLinks ${isOpen ? "open" : ""}`}>
        <Link href="/" className="brandHeaderLink desktopBrandHeader" aria-label="Open handbook introduction">
          <Image
            className="brandHeaderImage"
            src="/brand/logic-pro-guru-header.png"
            alt="Logic Pro Guru"
            width={1024}
            height={248}
            priority
          />
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
