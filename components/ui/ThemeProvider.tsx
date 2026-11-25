"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ACCENT_STORAGE_KEY,
  PORTFOLIO_THEMES,
  PortfolioTheme,
  THEME_STORAGE_KEY,
  getContrastText,
  getThemeById,
  isValidHex,
} from "@/lib/themes";

interface ThemeContextValue {
  theme: PortfolioTheme;
  customAccent: string | null;
  effectiveAccent: string;
  accentText: string;
  setPreviewTheme: (themeId: string, accentOverride?: string | null) => void;
  saveThemePreferences: (themeId: string, accentOverride: string | null) => void;
  revertThemePreferences: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_THEME_KEY = THEME_STORAGE_KEY;
const STORAGE_ACCENT_KEY = ACCENT_STORAGE_KEY;

function applyThemeToDOM(theme: PortfolioTheme, customAccent: string | null) {
  const root = document.documentElement;
  const accent = customAccent && isValidHex(customAccent) ? customAccent : theme.accent;
  const accentText = getContrastText(accent);

  root.style.setProperty("--theme-bg", theme.bg);
  root.style.setProperty("--theme-surface", theme.surface);
  root.style.setProperty("--theme-surface-alt", theme.surfaceAlt);
  root.style.setProperty("--theme-hero-bg", theme.heroBg);
  root.style.setProperty("--theme-hero-ink", theme.heroInk);
  root.style.setProperty("--theme-ink", theme.ink);
  root.style.setProperty("--theme-muted", theme.muted);
  root.style.setProperty("--theme-border", theme.border);
  root.style.setProperty("--theme-shadow", theme.shadow);
  root.style.setProperty("--theme-accent", accent);
  root.style.setProperty("--theme-accent-text", accentText);
  root.style.setProperty("--theme-secondary", theme.secondary);
  root.style.setProperty("--theme-console-bg", theme.consoleBg);
  root.style.setProperty("--theme-console-ink", theme.consoleInk);
  root.style.colorScheme = theme.isDark ? "dark" : "light";
  root.dataset.theme = theme.id;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [savedThemeId, setSavedThemeId] = useState<string>(PORTFOLIO_THEMES[0].id);
  const [savedAccent, setSavedAccent] = useState<string | null>(null);

  const [activeThemeId, setActiveThemeId] = useState<string>(PORTFOLIO_THEMES[0].id);
  const [activeAccent, setActiveAccent] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(STORAGE_THEME_KEY);
      const storedAccent = localStorage.getItem(STORAGE_ACCENT_KEY);
      const initialThemeId = storedTheme ? getThemeById(storedTheme).id : PORTFOLIO_THEMES[0].id;
      const initialAccent = storedAccent && isValidHex(storedAccent) ? storedAccent : null;
      setSavedThemeId(initialThemeId);
      setSavedAccent(initialAccent);
      setActiveThemeId(initialThemeId);
      setActiveAccent(initialAccent);
      applyThemeToDOM(getThemeById(initialThemeId), initialAccent);
    } catch {
      applyThemeToDOM(PORTFOLIO_THEMES[0], null);
    }
  }, []);

  const theme = getThemeById(activeThemeId);
  const effectiveAccent = activeAccent && isValidHex(activeAccent) ? activeAccent : theme.accent;
  const accentText = getContrastText(effectiveAccent);

  useEffect(() => {
    applyThemeToDOM(theme, activeAccent);
  }, [theme, activeAccent]);

  const setPreviewTheme = (themeId: string, accentOverride?: string | null) => {
    const nextTheme = getThemeById(themeId);
    setActiveThemeId(nextTheme.id);
    if (accentOverride !== undefined) {
      setActiveAccent(accentOverride);
    }
  };

  const saveThemePreferences = (themeId: string, accentOverride: string | null) => {
    const nextTheme = getThemeById(themeId);
    const cleanAccent = accentOverride && isValidHex(accentOverride) ? accentOverride : null;
    setSavedThemeId(nextTheme.id);
    setSavedAccent(cleanAccent);
    setActiveThemeId(nextTheme.id);
    setActiveAccent(cleanAccent);
    try {
      localStorage.setItem(STORAGE_THEME_KEY, nextTheme.id);
      if (cleanAccent) {
        localStorage.setItem(STORAGE_ACCENT_KEY, cleanAccent);
      } else {
        localStorage.removeItem(STORAGE_ACCENT_KEY);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  };

  const revertThemePreferences = () => {
    setActiveThemeId(savedThemeId);
    setActiveAccent(savedAccent);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        customAccent: activeAccent,
        effectiveAccent,
        accentText,
        setPreviewTheme,
        saveThemePreferences,
        revertThemePreferences,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function usePortfolioTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("usePortfolioTheme must be used within ThemeProvider");
  }
  return ctx;
}
