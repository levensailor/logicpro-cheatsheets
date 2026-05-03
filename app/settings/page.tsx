"use client";

import Link from "next/link";
import { useSettings, type FontSize, type Theme } from "@/lib/settings-context";

export default function SettingsPage() {
  const { settings, setFontSize, setTheme } = useSettings();

  return (
    <main className="legalMain">
      <div className="legalHero">
        <p className="introEyebrow">⚙️ User preferences</p>
        <h1>Settings</h1>
        <p>Customize your reading experience with font size and theme preferences.</p>
      </div>

      <section className="legalCard">
        <h2>Display Settings</h2>

        <div className="settingsSection">
          <h3>Font Size</h3>
          <p className="settingsDescription">
            Choose a comfortable reading size for cheat sheet content.
          </p>
          <div className="settingsOptions">
            <button
              className={`settingOption ${settings.fontSize === "small" ? "active" : ""}`}
              onClick={() => setFontSize("small")}
              aria-pressed={settings.fontSize === "small"}
            >
              <span className="optionLabel">Small</span>
              <span className="optionPreview" style={{ fontSize: "0.85rem" }}>
                Aa
              </span>
            </button>
            <button
              className={`settingOption ${settings.fontSize === "medium" ? "active" : ""}`}
              onClick={() => setFontSize("medium")}
              aria-pressed={settings.fontSize === "medium"}
            >
              <span className="optionLabel">Medium</span>
              <span className="optionPreview" style={{ fontSize: "1rem" }}>
                Aa
              </span>
            </button>
            <button
              className={`settingOption ${settings.fontSize === "large" ? "active" : ""}`}
              onClick={() => setFontSize("large")}
              aria-pressed={settings.fontSize === "large"}
            >
              <span className="optionLabel">Large</span>
              <span className="optionPreview" style={{ fontSize: "1.15rem" }}>
                Aa
              </span>
            </button>
          </div>
        </div>

        <div className="settingsSection">
          <h3>Theme</h3>
          <p className="settingsDescription">
            Select light or dark mode, or use your system preference.
          </p>
          <div className="settingsOptions">
            <button
              className={`settingOption ${settings.theme === "light" ? "active" : ""}`}
              onClick={() => setTheme("light")}
              aria-pressed={settings.theme === "light"}
            >
              <span className="optionIcon">☀️</span>
              <span className="optionLabel">Light</span>
            </button>
            <button
              className={`settingOption ${settings.theme === "dark" ? "active" : ""}`}
              onClick={() => setTheme("dark")}
              aria-pressed={settings.theme === "dark"}
            >
              <span className="optionIcon">🌙</span>
              <span className="optionLabel">Dark</span>
            </button>
            <button
              className={`settingOption ${settings.theme === "system" ? "active" : ""}`}
              onClick={() => setTheme("system")}
              aria-pressed={settings.theme === "system"}
            >
              <span className="optionIcon">💻</span>
              <span className="optionLabel">System</span>
            </button>
          </div>
        </div>
      </section>

      <div className="legalBackLink">
        <Link href="/">← Back to Home</Link>
      </div>
    </main>
  );
}
