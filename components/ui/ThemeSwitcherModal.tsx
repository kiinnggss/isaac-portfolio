"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Palette, RotateCcw, X } from "lucide-react";
import {
  ACCENT_SWATCHES,
  PORTFOLIO_THEMES,
  isValidHex,
} from "@/lib/themes";
import { usePortfolioTheme } from "@/components/ui/ThemeProvider";

interface ThemeSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (themeName: string) => void;
}

export default function ThemeSwitcherModal({
  isOpen,
  onClose,
  onSaved,
}: ThemeSwitcherModalProps) {
  const {
    theme,
    customAccent,
    effectiveAccent,
    setPreviewTheme,
    saveThemePreferences,
    revertThemePreferences,
  } = usePortfolioTheme();

  const [selectedThemeId, setSelectedThemeId] = useState(theme.id);
  const [hexInput, setHexInput] = useState(effectiveAccent);

  useEffect(() => {
    if (isOpen) {
      setSelectedThemeId(theme.id);
      setHexInput(customAccent || theme.accent);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, theme.id, theme.accent, customAccent]);

  const handleSelectThemeCard = (id: string) => {
    setSelectedThemeId(id);
    const chosen = PORTFOLIO_THEMES.find((t) => t.id === id);
    if (chosen) {
      setHexInput(chosen.accent);
      setPreviewTheme(id, null);
    }
  };

  const handleSwatchClick = (swatch: string) => {
    setHexInput(swatch);
    setPreviewTheme(selectedThemeId, swatch);
  };

  const handleHexChange = (val: string) => {
    const formatted = val.startsWith("#") ? val : `#${val}`;
    setHexInput(formatted.toUpperCase());
    if (isValidHex(formatted)) {
      setPreviewTheme(selectedThemeId, formatted.toUpperCase());
    }
  };

  const handleResetAccent = () => {
    const chosen = PORTFOLIO_THEMES.find((t) => t.id === selectedThemeId);
    if (chosen) {
      setHexInput(chosen.accent);
      setPreviewTheme(selectedThemeId, null);
    }
  };

  const handleCancel = () => {
    revertThemePreferences();
    onClose();
  };

  const handleSave = () => {
    const chosen = PORTFOLIO_THEMES.find((t) => t.id === selectedThemeId) || theme;
    const override =
      isValidHex(hexInput) && hexInput.toUpperCase() !== chosen.accent.toUpperCase()
        ? hexInput.toUpperCase()
        : null;
    saveThemePreferences(selectedThemeId, override);
    onSaved?.(chosen.name);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        revertThemePreferences();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, revertThemePreferences]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
            className="fixed inset-0 bg-black/65 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl neo-card overflow-hidden my-auto"
          >
            {/* Header */}
            <div
              className="px-6 py-5 flex items-center justify-between border-b-2"
              style={{
                borderColor: "var(--theme-border)",
                backgroundColor: "var(--theme-surface-alt)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center border-2"
                  style={{
                    backgroundColor: "var(--theme-accent)",
                    color: "var(--theme-accent-text)",
                    borderColor: "var(--theme-border)",
                  }}
                >
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide">
                    Customize your workspace theme
                  </h2>
                  <p className="text-xs" style={{ color: "var(--theme-muted)" }}>
                    Preview palettes live across every card, topology, and terminal
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCancel}
                className="p-2 rounded-xl neo-pill hover:opacity-80 transition-opacity"
                aria-label="Close theme customizer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Miniature Theme Preview Cards */}
            <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {PORTFOLIO_THEMES.map((item) => {
                  const isActive = selectedThemeId === item.id;
                  const previewAccent = isActive ? effectiveAccent : item.accent;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectThemeCard(item.id)}
                      className="group text-left rounded-xl p-2.5 transition-all cursor-pointer"
                      style={{
                        backgroundColor: item.bg,
                        border: `2px solid ${isActive ? previewAccent : item.border}`,
                        boxShadow: isActive
                          ? `0 0 0 2px ${previewAccent}, 4px 4px 0 0 ${item.shadow}`
                          : `3px 3px 0 0 ${item.shadow}`,
                      }}
                    >
                      {/* Miniature App Window Preview */}
                      <div
                        className="rounded-lg overflow-hidden border mb-2.5"
                        style={{
                          backgroundColor: item.surface,
                          borderColor: item.border,
                        }}
                      >
                        {/* Window Title Bar */}
                        <div
                          className="px-2.5 py-1.5 flex items-center justify-between border-b"
                          style={{
                            backgroundColor: item.heroBg,
                            borderColor: item.border,
                          }}
                        >
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          </div>
                          <span
                            className="h-1.5 w-8 rounded-full opacity-75"
                            style={{ backgroundColor: item.heroInk }}
                          />
                        </div>

                        {/* Window Split Body */}
                        <div className="p-2.5 grid grid-cols-12 gap-2">
                          {/* Mini Sidebar */}
                          <div className="col-span-4 space-y-1.5">
                            <div
                              className="h-2 w-full rounded-sm opacity-70"
                              style={{ backgroundColor: item.ink }}
                            />
                            <div
                              className="h-1.5 w-4/5 rounded-sm opacity-30"
                              style={{ backgroundColor: item.ink }}
                            />
                            <div
                              className="h-1.5 w-3/4 rounded-sm opacity-30"
                              style={{ backgroundColor: item.ink }}
                            />
                            <div
                              className="h-3 w-full rounded-sm mt-2"
                              style={{ backgroundColor: item.surfaceAlt }}
                            />
                          </div>

                          {/* Mini Content Rows */}
                          <div className="col-span-8 space-y-1.5">
                            <div
                              className="h-3.5 w-full rounded-sm flex items-center px-1.5"
                              style={{ backgroundColor: previewAccent }}
                            >
                              <span className="h-1 w-8 rounded-full bg-white/80" />
                            </div>
                            <div
                              className="h-2.5 w-full rounded-sm"
                              style={{ backgroundColor: item.surfaceAlt }}
                            />
                            <div
                              className="h-2.5 w-5/6 rounded-sm"
                              style={{ backgroundColor: item.surfaceAlt }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Theme Label & Radio Check */}
                      <div className="flex items-center justify-between px-0.5">
                        <div>
                          <div
                            className="text-xs font-bold leading-tight"
                            style={{ color: item.ink }}
                          >
                            {item.name}
                          </div>
                          <div
                            className="text-[10px] leading-tight mt-0.5"
                            style={{ color: item.muted }}
                          >
                            {item.tagline}
                          </div>
                        </div>

                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors"
                          style={{
                            borderColor: isActive ? previewAccent : item.border,
                            backgroundColor: isActive ? previewAccent : "transparent",
                            color: isActive ? "#FFFFFF" : "transparent",
                          }}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Customize Primary Color */}
              <div
                className="p-4 rounded-xl border-2 flex flex-wrap items-center justify-between gap-4"
                style={{
                  backgroundColor: "var(--theme-surface-alt)",
                  borderColor: "var(--theme-border)",
                }}
              >
                <div>
                  <div className="text-sm font-bold">Customize primary color</div>
                  <div className="text-xs" style={{ color: "var(--theme-muted)" }}>
                    Override the active theme accent or pick a curated swatch
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    {ACCENT_SWATCHES.map((swatch) => {
                      const activeSwatch =
                        effectiveAccent.toUpperCase() === swatch.toUpperCase();
                      return (
                        <button
                          key={swatch}
                          type="button"
                          onClick={() => handleSwatchClick(swatch)}
                          className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer"
                          style={{
                            backgroundColor: swatch,
                            borderColor: "var(--theme-border)",
                            boxShadow: activeSwatch
                              ? "0 0 0 2px var(--theme-surface), 0 0 0 4px var(--theme-border)"
                              : "none",
                          }}
                          title={`Set primary color ${swatch}`}
                          aria-label={`Set primary color ${swatch}`}
                        />
                      );
                    })}
                  </div>

                  {/* Hex Input Pill */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg neo-pill">
                    <input
                      type="color"
                      value={isValidHex(hexInput) ? hexInput : effectiveAccent}
                      onChange={(e) => handleHexChange(e.target.value)}
                      className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                      aria-label="Pick custom primary color"
                    />
                    <input
                      type="text"
                      value={hexInput}
                      onChange={(e) => handleHexChange(e.target.value)}
                      maxLength={7}
                      className="w-20 bg-transparent text-xs font-mono-tech font-semibold focus:outline-none uppercase"
                      aria-label="Primary hex color code"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleResetAccent}
                    className="p-2 rounded-lg neo-pill hover:opacity-80 cursor-pointer"
                    title="Reset to theme default accent"
                    aria-label="Reset accent color"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="px-6 py-4 border-t-2 flex items-center justify-end gap-3"
              style={{
                borderColor: "var(--theme-border)",
                backgroundColor: "var(--theme-surface)",
              }}
            >
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded-xl text-xs font-semibold neo-btn-secondary cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-xl text-xs font-bold neo-btn-primary cursor-pointer"
              >
                Save preferences
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
