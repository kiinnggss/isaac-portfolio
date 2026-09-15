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
    { name: "Network Terminal", href: "#terminal" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Monogram */}
          <a
            href="#"
            className="group flex items-center gap-3 focus:outline-none rounded-lg"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-display font-bold text-sm text-white transition-transform group-hover:scale-105">
              <span>GI</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                Gbodimowo Isaac
              </div>
              <div className="text-xs text-slate-500 hidden sm:block">
                Software & Network Systems Engineer
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 rounded-full px-3 py-1.5 bg-slate-100/80 border border-slate-200/80 text-xs font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full hover:text-slate-900 hover:bg-white transition-all duration-150"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Controls & Quick Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search / Command Palette Pill */}
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-medium transition-colors"
                title="Search commands and sections (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span>Search</span>
                <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-500 border border-slate-300 font-mono-tech">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Quick Resume Reader Button */}
            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-slate-700 text-xs font-medium transition-colors"
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
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                title="Copy email address"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            )}

            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors shadow-xs"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-300" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-5 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {onOpenResume && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2 px-3 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>View Resume</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 px-3 rounded-lg bg-slate-900 text-white text-xs font-medium text-center"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
