"use client";

import { useState } from "react";
import Image from "next/image";
import { useScroll, useMotionValueEvent } from "framer-motion";
import MagneticButton from "./MagneticButton";
import isaac3dAvatar from "@/public/images/isaac-3d-avatar.jpg";
import {
  Menu,
  X,
  ArrowUpRight,
  Search,
  FileText,
  Copy,
  Layers,
} from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onOpenResume?: () => void;
  onCopyEmail?: () => void;
  onShowCover?: () => void;
}

export default function Navbar({
  onOpenCommandPalette,
  onOpenResume,
  onCopyEmail,
  onShowCover,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isNowScrolled = latest > 24;
    if (isNowScrolled !== scrolled) {
      setScrolled(isNowScrolled);
    }
  });

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
        <div
          className={`h-16 flex items-center justify-between px-4 sm:px-5 rounded-full transition-all duration-300 ${
            scrolled
              ? "obsidian-surface shadow-[0_20px_44px_-10px_rgba(9,13,22,0.45)]"
              : "crystal-surface"
          }`}
        >
          {/* Brand Identity & Cover Switch */}
          <div className="flex items-center gap-2.5">
            <a
              href="#overview"
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-orange-600/80 shadow-sm transition-transform group-hover:scale-105 bg-[#090d16]">
                <Image
                  src={isaac3dAvatar}
                  alt="Gbodimowo Isaac"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight">
                <div
                  className={`text-sm font-display font-bold transition-colors ${
                    scrolled
                      ? "text-white group-hover:text-orange-400"
                      : "text-[#090d16] group-hover:text-orange-600"
                  }`}
                >
                  Gbodimowo Isaac
                </div>
                <div
                  className={`text-[10px] font-mono-tech hidden sm:block ${
                    scrolled ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  SOFTWARE & NETWORKS
                </div>
              </div>
            </a>

            {onShowCover && (
              <button
                type="button"
                onClick={onShowCover}
                title="Return to Cover Portal"
                className={`hidden lg:inline-flex items-center gap-1.5 text-[11px] font-mono-tech px-3 py-1 rounded-full border transition-all cursor-pointer ml-1 ${
                  scrolled
                    ? "bg-white/10 hover:bg-white/20 text-slate-200 border-white/15"
                    : "bg-white/80 hover:bg-white text-slate-800 border-slate-300/80"
                }`}
              >
                <Layers className="w-3 h-3 text-orange-500" />
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  scrolled
                    ? "text-slate-300 hover:text-white hover:bg-white/10"
                    : "text-slate-700 hover:text-[#090d16] hover:bg-white/80"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Quick Controls */}
          <div className="hidden md:flex items-center gap-2">
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                  scrolled
                    ? "bg-white/10 hover:bg-white/15 border-white/15 text-slate-200"
                    : "bg-white/75 hover:bg-white border-white text-slate-700"
                }`}
                title="Command Palette (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5 text-orange-500" />
                <kbd className="text-[10px] font-mono-tech">⌘K</kbd>
              </button>
            )}

            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                  scrolled
                    ? "bg-white/10 hover:bg-white/15 border-white/15 text-slate-200"
                    : "bg-white/75 hover:bg-white border-white text-slate-800"
                }`}
                title="Open Resume Reader"
              >
                <FileText className="w-3.5 h-3.5 text-orange-500" />
                <span>Resume</span>
              </button>
            )}

            {onCopyEmail && (
              <button
                type="button"
                onClick={onCopyEmail}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  scrolled
                    ? "bg-white/10 hover:bg-white/15 border-white/15 text-slate-200"
                    : "bg-white/75 hover:bg-white border-white text-slate-700"
                }`}
                title="Copy email address"
                aria-label="Copy email address"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            )}

            <MagneticButton
              href="#contact"
              className="px-4 py-2 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs inline-flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full border ${
              scrolled
                ? "bg-white/10 border-white/15 text-white"
                : "bg-white/80 border-white text-[#090d16]"
            }`}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto obsidian-surface rounded-3xl p-5 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {onOpenResume && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 border border-white/15"
              >
                <FileText className="w-3.5 h-3.5 text-orange-400" />
                <span>Quick Read Resume</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-orange-600 text-white text-xs font-semibold text-center shadow-md"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
