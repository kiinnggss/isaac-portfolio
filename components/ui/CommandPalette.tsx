"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Copy,
  ExternalLink,
  Camera,
  Network,
  Layers,
  Terminal,
  ArrowRight,
  X,
} from "lucide-react";

export interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Projects" | "Documents" | "Photographs";
  icon: typeof Search;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenPhoto: (photoType: "portrait" | "graduation" | "workspace") => void;
  onCopyEmail: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenResume,
  onOpenPhoto,
  onCopyEmail,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    // Documents
    {
      id: "resume-view",
      title: "Quick Read Resume",
      subtitle: "Review credentials, certifications, and experience in-browser",
      category: "Documents",
      icon: FileText,
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: "resume-download",
      title: "Download Resume PDF",
      subtitle: "Direct download of Gbodimowo_Isaac_Resume.pdf",
      category: "Documents",
      icon: ExternalLink,
      action: () => {
        window.open("/Gbodimowo_Isaac_Resume.pdf", "_blank");
        onClose();
      },
    },
    {
      id: "copy-email",
      title: "Copy Email Address",
      subtitle: "isaacgbodimowo@gmail.com",
      category: "Documents",
      icon: Copy,
      action: () => {
        onCopyEmail();
        onClose();
      },
    },
    // Projects
    {
      id: "proj-carpull",
      title: "Launch CAR PULL",
      subtitle: "Live peer-to-peer campus ride-splitting application",
      category: "Projects",
      icon: ExternalLink,
      action: () => {
        window.open("https://kiinnggss.github.io/car-pull/", "_blank");
        onClose();
      },
    },
    {
      id: "proj-cisco",
      title: "Inspect Cisco Network Topology",
      subtitle: "HSRP v2, 802.1Q trunking, and extended access lists",
      category: "Projects",
      icon: Network,
      action: () => {
        window.location.hash = "terminal";
        onClose();
      },
    },
    {
      id: "proj-clients",
      title: "Client Web Platforms Showcase",
      subtitle: "Production portals and integration workflows",
      category: "Projects",
      icon: Layers,
      action: () => {
        window.location.hash = "work";
        onClose();
      },
    },
    {
      id: "proj-antigravity",
      title: "Google Antigravity Mobile Controller",
      subtitle: "Voice assistant, PWA drawer, and FastAPI streaming supervisor",
      category: "Projects",
      icon: Terminal,
      action: () => {
        window.open("https://github.com/kiinnggss/joyboy_sys", "_blank");
        onClose();
      },
    },
    // Photographs
    {
      id: "photo-portrait",
      title: "View Official Portrait",
      subtitle: "Formal portrait of Gbodimowo Isaac in Lagos",
      category: "Photographs",
      icon: Camera,
      action: () => {
        onClose();
        onOpenPhoto("portrait");
      },
    },
    {
      id: "photo-grad",
      title: "View Academic Convocation Photo",
      subtitle: "Babcock University B.Sc. Computer Science convocation regalia",
      category: "Photographs",
      icon: Camera,
      action: () => {
        onClose();
        onOpenPhoto("graduation");
      },
    },
    {
      id: "photo-work",
      title: "View Engineering Workstation Photo",
      subtitle: "Deep focus at workstation engineering distributed systems",
      category: "Photographs",
      icon: Camera,
      action: () => {
        onClose();
        onOpenPhoto("workspace");
      },
    },
    // Navigation
    {
      id: "nav-work",
      title: "Navigate to Featured Works",
      subtitle: "View engineering architectures and live demos",
      category: "Navigation",
      icon: Layers,
      action: () => {
        window.location.hash = "work";
        onClose();
      },
    },
    {
      id: "nav-skills",
      title: "Navigate to Skills Matrix",
      subtitle: "Inspect full networking, software, and hardware matrix",
      category: "Navigation",
      icon: Network,
      action: () => {
        window.location.hash = "skills";
        onClose();
      },
    },
    {
      id: "nav-terminal",
      title: "Navigate to Systems Terminal",
      subtitle: "Open interactive CLI emulator and latency probe",
      category: "Navigation",
      icon: Search,
      action: () => {
        window.location.hash = "terminal";
        onClose();
      },
    },
    {
      id: "nav-contact",
      title: "Navigate to Contact Section",
      subtitle: "Send a direct message or view contact coordinates",
      category: "Navigation",
      icon: Copy,
      action: () => {
        window.location.hash = "contact";
        onClose();
      },
    },
  ];

  const filtered = commands.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, project, or section (e.g. resume, cisco, contact)..."
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <span className="hidden sm:inline px-2 py-0.5 rounded bg-white text-xs text-slate-500 border border-slate-300 font-mono-tech">
                ESC
              </span>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 sm:hidden"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Command Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  No matching results for &quot;{query}&quot;
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-slate-50 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-semibold text-slate-900 truncate flex items-center gap-2">
                            <span>{item.title}</span>
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                              {item.category}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 truncate mt-0.5">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {isSelected && (
                          <span className="text-xs font-medium text-blue-600 flex items-center gap-1">
                            <span>Select</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>•</span>
                <span>↵ Select</span>
                <span>•</span>
                <span>ESC Dismiss</span>
              </div>
              <span className="text-slate-400 hidden sm:inline">
                Navigation Launcher
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
