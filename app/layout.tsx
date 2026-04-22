import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import { TopSheetNav } from "@/components/TopSheetNav";
import { cheatSheets } from "@/data/sheets";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Logic Pro Cheat Sheets",
  description: "Interactive Logic Pro cheat sheets rendered as editable web components."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="appShell">
          <TopSheetNav sheets={cheatSheets} />
          {children}
        </div>
      </body>
    </html>
  );
}
