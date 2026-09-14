"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Terminal,
  Layers,
  FileText,
  Mail,
  Copy,
  ExternalLink,
  Volume2,
  VolumeX,
  Camera,
  Network,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";
import { sound } from "@/lib/sound";

export interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Projects" | "Documents" | "Photographs" | "Settings";
  icon: typeof Search;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenPhoto: (photoType: "portrait" | "graduation" | "workspace") => void;
  onCopyEmail: () => void;
  onSoundToggle: () => void;
  soundEnabled: boolean;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenResume,
  onOpenPhoto,
  onCopyEmail,
  onSoundToggle,
  soundEnabled,
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
      subtitle: "Hoffenheim Tech production portals and integration workflows",
      category: "Projects",
      icon: Layers,
      action: () => {
        window.location.hash = "work";
        onClose();
      },
    },
    // Photographs
    {
      id: "photo-portrait",
      title: "View Official Portrait",
      subtitle: "Formal photograph of Gbodimowo Isaac in Lagos",
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
      title: "View Engineering Workstation",
      subtitle: "Systems lab and high-concurrency development setup",
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
      title: "Jump to Selected Works",
      subtitle: "Production web architectures and network configurations",
      category: "Navigation",
      icon: Layers,
      action: () => {
        window.location.hash = "work";
        onClose();
      },
    },
    {
      id: "nav-skills",
      title: "Jump to Engineering Bento",
      subtitle: "Interactive telemetry and skills matrix",
      category: "Navigation",
      icon: Sparkles,
      action: () => {
        window.location.hash = "skills";
        onClose();
      },
    },
    {
      id: "nav-terminal",
      title: "Jump to Network Terminal",
      subtitle: "Interactive CLI, ICMP ping probe, and subnet calculator",
      category: "Navigation",
      icon: Terminal,
      action: () => {
        window.location.hash = "terminal";
        onClose();
      },
    },
    {
      id: "nav-contact",
      title: "Jump to Contact Transmission",
      subtitle: "Dispatch an inquiry directly to SQLite mailbox",
      category: "Navigation",
      icon: Mail,
      action: () => {
        window.location.hash = "contact";
        onClose();
      },
    },
    // Settings
    {
      id: "toggle-sound",
      title: soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects",
      subtitle: soundEnabled ? "Currently enabled (synthesized Web Audio)" : "Currently muted",
      category: "Settings",
      icon: soundEnabled ? VolumeX : Volume2,
      action: () => {
        onSoundToggle();
        onClose();
      },
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      sound.playChime();
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        sound.playClick();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        sound.playClick();
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
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-2xl bg-neutral-950 border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-neutral-900/60">
              <Search className="w-5 h-5 text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  sound.playKey();
                  setQuery(e.target.value);
                }}
                placeholder="Type a command, project, or shortcut (e.g. resume, ping, cisco)..."
                className="w-full bg-transparent text-sm sm:text-base font-mono-tech text-white placeholder-neutral-500 focus:outline-none"
              />
              <span className="hidden sm:inline px-2 py-0.5 rounded bg-neutral-800 text-[10px] font-mono-tech text-neutral-400 border border-neutral-700">
                ESC
              </span>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-neutral-400 hover:text-white sm:hidden"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Command Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-white/5">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono-tech text-neutral-500">
                  No matching commands found for &quot;{query}&quot;
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
                          ? "bg-neutral-900 border border-[#bfff04]/30"
                          : "hover:bg-neutral-900/50 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-[#bfff04] text-black"
                              : "bg-neutral-900 border border-white/10 text-neutral-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-semibold text-white truncate flex items-center gap-2">
                            <span>{item.title}</span>
                            <span className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400">
                              {item.category}
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {isSelected && (
                          <span className="text-[10px] font-mono-tech text-[#bfff04] flex items-center gap-1">
                            <span>Execute</span>
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
            <div className="p-3 border-t border-white/10 bg-neutral-900/80 flex items-center justify-between text-[11px] font-mono-tech text-neutral-400">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>•</span>
                <span>↵ Select</span>
                <span>•</span>
                <span>ESC Dismiss</span>
              </div>
              <span className="text-[#bfff04] hidden sm:inline">
                Isaac Command Gateway
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
