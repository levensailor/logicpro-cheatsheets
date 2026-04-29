import type { Metadata, Viewport } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import { TopSheetNav } from "@/components/TopSheetNav";
import { SiteFooter } from "@/components/SiteFooter";
import { cheatSheets } from "@/data/sheets";

config.autoAddCss = false;

export const metadata: Metadata = {
  metadataBase: new URL("https://logicpro.guru"),
  title: {
    default: "Logic Pro.Guru",
    template: "%s | Logic Pro.Guru"
  },
  description: "Interactive Logic Pro cheat sheets for recording, mixing, and mastering a band.",
  appleWebApp: {
    capable: true,
    title: "Logic Pro.Guru",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#edf4ff"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="appShell">
          <TopSheetNav sheets={cheatSheets} />
          <div className="appContent">
            {children}
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
