import type { Metadata, Viewport } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import { TopSheetNav } from "@/components/TopSheetNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SettingsProvider } from "@/lib/settings-context";
import { cheatSheets } from "@/data/sheets";

config.autoAddCss = false;

export const metadata: Metadata = {
  metadataBase: new URL("https://logicpro.guru"),
  title: {
    default: "Logic Pro Band Handbook",
    template: "%s | Logic Pro Band Handbook"
  },
  description: "Interactive Logic Pro cheat sheets for recording, mixing, and mastering a band.",
  appleWebApp: {
    capable: true,
    title: "Logic Pro Handbook",
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
        <SettingsProvider>
          <div className="appShell">
            <TopSheetNav sheets={cheatSheets} />
            <div className="appContent">
              {children}
              <SiteFooter />
            </div>
          </div>
        </SettingsProvider>
      </body>
    </html>
  );
}
