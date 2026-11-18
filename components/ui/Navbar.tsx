"use client";

import { useState } from "react";
import Image from "next/image";
import isaac3dAvatar from "@/public/images/isaac-clay-bust.png";
import {
  Menu,
  X,
  ArrowUpRight,
  Search,
  FileText,
  Layers,
  Palette,
} from "lucide-react";
import { usePortfolioTheme } from "@/components/ui/ThemeProvider";

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onOpenResume?: () => void;
  onOpenThemeSwitcher?: () => void;
  onShowCover?: () => void;
}

export default function Navbar({
  onOpenCommandPalette,
  onOpenResume,
  onOpenThemeSwitcher,
  onShowCover,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, effectiveAccent } = usePortfolioTheme();

  const navLinks = [
    { name: "Overview", href: "#overview" },
    { name: "Works", href: "#work" },
    { name: "Systems", href: "#skills" },
    { name: "Topology", href: "#terminal" },
    { name: "Experience", href: "#experience" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="h-16 flex items-center justify-between px-4 sm:px-5 rounded-full neo-card">
          {/* Brand Identity & Cover Switch */}
          <div className="flex items-center gap-2.5">
            <a
              href="#overview"
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              <div
                className="relative w-9 h-9 rounded-full overflow-hidden border-2 transition-transform group-hover:scale-105"
                style={{ borderColor: "var(--theme-border)" }}
              >
                <Image
                  src={isaac3dAvatar}
                  alt="Gbodimowo Isaac"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight">
                <div className="text-sm sm:text-base font-display font-extrabold uppercase tracking-wide">
                  Gbodimowo Isaac
                </div>
                <div
                  className="text-[10px] font-mono-tech hidden sm:block font-semibold"
                  style={{ color: "var(--theme-muted)" }}
                >
                  SOFTWARE & NETWORKS
                </div>
              </div>
            </a>

            {onShowCover && (
              <button
                type="button"
                onClick={onShowCover}
                title="Return to Cover Studio"
                className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-mono-tech font-semibold px-3 py-1 rounded-full neo-pill hover:opacity-85 transition-opacity cursor-pointer ml-1"
              >
                <Layers className="w-3 h-3" style={{ color: effectiveAccent }} />
                <span>Cover</span>
              </button>
            )}
          </div>

          {/* Single-Line Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold hover:opacity-75 transition-opacity"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Quick Controls */}
          <div className="hidden md:flex items-center gap-2">
            {onOpenThemeSwitcher && (
              <button
                type="button"
                onClick={onOpenThemeSwitcher}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full neo-pill text-xs font-semibold whitespace-nowrap hover:opacity-85 transition-opacity cursor-pointer"
                title="Customize workspace theme"
              >
                <span
                  className="w-3 h-3 rounded-full border"
                  style={{
                    backgroundColor: effectiveAccent,
                    borderColor: "var(--theme-border)",
                  }}
                />
                <Palette className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">{theme.name}</span>
              </button>
            )}

            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full neo-pill text-xs font-semibold hover:opacity-85 transition-opacity cursor-pointer"
                title="Command Palette (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5" />
                <kbd className="text-[10px] font-mono-tech">⌘K</kbd>
              </button>
            )}

            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full neo-pill text-xs font-semibold hover:opacity-85 transition-opacity cursor-pointer"
                title="Open Resume Reader"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )}

            <a
              href="#contact"
              className="px-4 py-2 rounded-full neo-btn-primary font-bold text-xs inline-flex items-center gap-1.5"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            {onOpenThemeSwitcher && (
              <button
                type="button"
                onClick={onOpenThemeSwitcher}
                className="p-2 rounded-full neo-pill"
                aria-label="Customize workspace theme"
              >
                <Palette className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full neo-pill"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto neo-card rounded-3xl p-5 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-75 transition-opacity"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div
            className="pt-3 border-t-2 flex flex-col gap-2"
            style={{ borderColor: "var(--theme-border)" }}
          >
            {onOpenResume && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 px-4 rounded-xl neo-btn-secondary text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Quick Read Resume</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl neo-btn-primary text-xs font-bold text-center"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
