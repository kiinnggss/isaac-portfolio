"use client";

import { useState } from "react";
import Image from "next/image";
import isaac3dAvatar from "@/public/images/isaac-clay-bust.webp";
import {
  Menu,
  X,
  ArrowUpRight,
  FileText,
  Palette,
} from "lucide-react";
import { usePortfolioTheme } from "@/components/ui/ThemeProvider";

interface NavbarProps {
  onOpenResume?: () => void;
  onOpenThemeSwitcher?: () => void;
}

export default function Navbar({
  onOpenResume,
  onOpenThemeSwitcher,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, effectiveAccent } = usePortfolioTheme();

  const navLinks = [
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
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#overview"
              className="group flex items-center gap-2.5 focus:outline-none shrink-0"
            >
              <div
                className="relative w-9 h-9 rounded-full overflow-hidden border-2 transition-transform group-hover:scale-105 shrink-0"
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
              <div className="leading-tight whitespace-nowrap">
                <div className="text-sm font-display font-extrabold uppercase tracking-wide">
                  Gbodimowo Isaac
                </div>
                <div
                  className="text-[10px] font-mono-tech hidden xl:block font-semibold"
                  style={{ color: "var(--theme-muted)" }}
                >
                  SOFTWARE &amp; NETWORKS
                </div>
              </div>
            </a>
          </div>

          {/* Single-Line Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 xl:px-4 py-1.5 rounded-full text-xs font-semibold hover:opacity-75 transition-opacity whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Quick Controls */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {onOpenThemeSwitcher && (
              <button
                type="button"
                onClick={onOpenThemeSwitcher}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full neo-pill text-xs font-semibold whitespace-nowrap hover:opacity-85 transition-opacity cursor-pointer"
                title={`Customize workspace theme (${theme.name})`}
                aria-label={`Customize workspace theme (${theme.name})`}
              >
                <span
                  className="w-3 h-3 rounded-full border shrink-0"
                  style={{
                    backgroundColor: effectiveAccent,
                    borderColor: "var(--theme-border)",
                  }}
                />
                <Palette className="w-3.5 h-3.5 shrink-0" />
              </button>
            )}

            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full neo-pill text-xs font-semibold hover:opacity-85 transition-opacity cursor-pointer whitespace-nowrap"
                title="Open Resume Reader"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )}

            <a
              href="#contact"
              className="px-4 py-2 rounded-full neo-btn-primary font-bold text-xs inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile & Tablet Controls */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
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

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto neo-card rounded-3xl p-5 space-y-3">
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
