"use client";

import { useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";
import {
  Menu,
  X,
  ArrowUpRight,
  Terminal,
  Search,
  Volume2,
  VolumeX,
  FileText,
  Copy,
} from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onOpenResume?: () => void;
  onCopyEmail?: () => void;
  onSoundToggle?: () => void;
  soundEnabled?: boolean;
}

export default function Navbar({
  onOpenCommandPalette,
  onOpenResume,
  onCopyEmail,
  onSoundToggle,
  soundEnabled = true,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#work" },
    { name: "Skills Matrix", href: "#skills" },
    { name: "Network Playground", href: "#terminal" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Monogram */}
          <a
            href="#"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bfff04] rounded-lg p-1"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-950 border border-white/10 flex items-center justify-center font-display font-bold text-lg text-white group-hover:border-[#bfff04]/60 transition-colors shadow-inner">
              <span className="text-[#bfff04]">G</span>
              <span className="text-white">I</span>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#bfff04] rounded-full ring-2 ring-black animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs uppercase tracking-widest font-mono-tech text-neutral-400 group-hover:text-white transition-colors">
                Gbodimowo Isaac
              </div>
              <div className="text-[10px] text-neutral-500 font-mono-tech flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#bfff04]" />
                Software & Systems Engineer
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 rounded-full p-1.5 bg-neutral-900/60 backdrop-blur-lg border border-white/10 text-xs font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Controls & Quick Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Search / Command Palette Pill */}
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800 hover:border-white/20 text-neutral-400 hover:text-white text-xs font-mono-tech transition-all"
                title="Open Command Palette (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5 text-[#bfff04]" />
                <span>Search</span>
                <kbd className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Quick Resume Reader Button */}
            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800 hover:border-white/20 text-neutral-300 hover:text-[#00f0ff] text-xs font-mono-tech transition-all"
                title="Quick Read Resume"
              >
                <FileText className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>CV</span>
              </button>
            )}

            {/* Copy Email Button */}
            {onCopyEmail && (
              <button
                type="button"
                onClick={onCopyEmail}
                className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-white/20 text-neutral-400 hover:text-[#bfff04] transition-all"
                title="Copy Email Address"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Sound Toggle Button */}
            {onSoundToggle && (
              <button
                type="button"
                onClick={onSoundToggle}
                className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-white/20 text-neutral-400 hover:text-white transition-all"
                title={soundEnabled ? "Mute audio effects" : "Enable audio effects"}
              >
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 text-[#bfff04]" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
                )}
              </button>
            )}

            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#bfff04] text-black font-semibold text-xs tracking-tight uppercase hover:bg-[#c9ff26] hover:shadow-[0_0_25px_rgba(191,255,4,0.4)] transition-all duration-200 active:scale-95 ml-1"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
            <span className="w-2 h-2 rounded-full bg-[#bfff04] animate-pulse" />
            <span className="text-xs font-mono-tech text-neutral-300">
              Open for Software & Systems Roles
            </span>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2.5">
            <a
              href="#terminal"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono-tech text-neutral-300 flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4 text-[#00f0ff]" />
              Launch CLI Playground
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 rounded-xl bg-[#bfff04] text-black font-semibold text-xs tracking-tight uppercase text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Initiate Transmission</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
