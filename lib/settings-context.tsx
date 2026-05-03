"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type FontSize = "small" | "medium" | "large";
export type Theme = "light" | "dark" | "system";

interface Settings {
  fontSize: FontSize;
  theme: Theme;
}

interface SettingsContextValue {
  settings: Settings;
  setFontSize: (size: FontSize) => void;
  setTheme: (theme: Theme) => void;
  effectiveTheme: "light" | "dark";
}

const defaultSettings: Settings = {
  fontSize: "medium",
  theme: "system",
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getEffectiveTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemTheme() : theme;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window === "undefined") return defaultSettings;
    const stored = localStorage.getItem("user-settings");
    if (stored) {
      try {
        return JSON.parse(stored) as Settings;
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("user-settings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Settings;
        return getEffectiveTheme(parsed.theme);
      } catch {
        return getEffectiveTheme(defaultSettings.theme);
      }
    }
    return getEffectiveTheme(defaultSettings.theme);
  });

  useEffect(() => {
    if (settings.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        setEffectiveTheme(e.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [settings.theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-font-size", settings.fontSize);
    document.documentElement.setAttribute("data-theme", effectiveTheme);
    localStorage.setItem("user-settings", JSON.stringify(settings));
  }, [settings, effectiveTheme]);

  const setFontSize = (fontSize: FontSize) => {
    const newSettings = { ...settings, fontSize };
    setSettings(newSettings);
  };

  const setTheme = (theme: Theme) => {
    const newSettings = { ...settings, theme };
    setSettings(newSettings);
    setEffectiveTheme(getEffectiveTheme(theme));
  };

  return (
    <SettingsContext.Provider value={{ settings, setFontSize, setTheme, effectiveTheme }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}
