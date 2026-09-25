"use client";

import { useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";
import {
  Menu,
  X,
  ArrowUpRight,
  Search,
  FileText,
  Copy,
} from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onOpenResume?: () => void;
  onCopyEmail?: () => void;
}

export default function Navbar({
  onOpenCommandPalette,
  onOpenResume,
  onCopyEmail,
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
    { name: "Skills", href: "#skills" },
    { name: "Terminal", href: "#terminal" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <div
          className={`flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? "crystal-surface shadow-[0_16px_36px_-6px_rgba(15,23,42,0.1),0_0_1px_1px_rgba(255,255,255,0.8)]"
              : "bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_24px_-4px_rgba(15,23,42,0.04)]"
          }`}
        >
          {/* Brand Monogram */}
          <a
            href="#"
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center font-display font-bold text-sm shadow-[0_4px_12px_rgba(15,23,42,0.25)] ring-2 ring-white/80 transition-transform group-hover:scale-105">
              <span>GI</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                Gbodimowo Isaac
              </div>
              <div className="text-[11px] text-slate-500 hidden sm:block">
                Software & Systems
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-950 hover:bg-white/70 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Controls & Quick Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search Pill */}
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 hover:bg-white border border-white/80 text-slate-600 hover:text-slate-950 text-xs font-medium shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition-all"
                title="Search commands (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search</span>
                <kbd className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 font-mono-tech border border-slate-200/60">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Resume Button */}
            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white border border-white/90 text-slate-700 text-xs font-medium shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition-all"
                title="View Resume"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Resume</span>
              </button>
            )}

            {/* Copy Email Button */}
            {onCopyEmail && (
              <button
                type="button"
                onClick={onCopyEmail}
                className="p-2 rounded-full bg-white/60 hover:bg-white border border-white/80 text-slate-600 hover:text-slate-950 shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition-all"
                title="Copy email address"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            )}

            <MagneticButton
              href="#contact"
              className="crystal-button inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white font-medium text-xs shadow-[0_8px_20px_-4px_rgba(15,23,42,0.3)] ml-1"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-300" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/70 border border-white/90 text-slate-700 hover:text-slate-950 shadow-xs"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-6xl mx-auto crystal-surface rounded-3xl p-5 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-950 hover:bg-white/80 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200/60 flex flex-col gap-2">
            {onOpenResume && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white/80 text-slate-800 text-xs font-medium flex items-center justify-center gap-1.5 shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>View Resume</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl crystal-button text-white text-xs font-medium text-center shadow-md"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
