"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { FileText, Mail, Palette, Terminal, X } from "lucide-react";
import isaacClayAvatar from "@/public/images/isaac-clay-avatar.webp";
import isaacClayBust from "@/public/images/isaac-clay-bust.webp";
import { usePortfolioTheme } from "./ThemeProvider";

interface ScrollAvatarProps {
  onOpenThemeSwitcher?: () => void;
  onOpenResume?: () => void;
}

export default function ScrollAvatar({
  onOpenThemeSwitcher,
  onOpenResume,
}: ScrollAvatarProps) {
  const prefersReducedMotion = useReducedMotion();
  const { effectiveAccent } = usePortfolioTheme();
  const { scrollYProgress } = useScroll();
  const [statusLabel, setStatusLabel] = useState("Systems Studio");
  const [bounced, setBounced] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileDockRef = useRef<HTMLDivElement>(null);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 20,
    mass: 0.6,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.16) setStatusLabel("Systems Studio");
    else if (v < 0.38) setStatusLabel("Selected Works");
    else if (v < 0.58) setStatusLabel("Subnet & Skills");
    else if (v < 0.78) setStatusLabel("HSRP Active (.2)");
    else setStatusLabel("Let's Connect!");
  });

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (mobileDockRef.current && !mobileDockRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("mousedown", handleOutside);
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [mobileMenuOpen]);

  const left = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["94vw", "6vw", "94vw", "6vw", "92vw"]
  );

  const top = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["58vh", "60vh", "54vh", "60vh", "56vh"]
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.96, 0.9, 1.0, 0.92, 0.96]
  );

  const rotate = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [-3, 3, -3, 3, -2]
  );

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAvatarClick = () => {
    setBounced(true);
    setTimeout(() => setBounced(false), 500);
    scrollToSection("contact");
  };

  return (
    <>
      {/* Desktop (>= xl): Gliding 3D Clay Companion along outer margins */}
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none hidden xl:block"
        >
          <motion.div
            style={{
              left,
              top,
              scale,
              rotate,
              transformOrigin: "center center",
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            <motion.button
              type="button"
              onClick={handleAvatarClick}
              animate={
                bounced
                  ? { y: [0, -18, 0], scale: [1, 1.08, 1] }
                  : { y: [0, -7, 0] }
              }
              transition={
                bounced
                  ? { duration: 0.45, ease: "easeOut" }
                  : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }
              }
              title="Jump to Contact"
              className="pointer-events-auto group flex flex-col items-center cursor-pointer focus:outline-none"
            >
              <div className="mb-1.5 px-3 py-1 rounded-full neo-pill text-[10px] font-mono-tech font-bold uppercase tracking-wider flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: effectiveAccent }}
                />
                <span>{statusLabel}</span>
              </div>

              <div className="h-[260px] w-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={isaacClayAvatar}
                  alt="3D Clay Avatar of Gbodimowo Isaac"
                  className="h-full w-auto object-contain select-none drop-shadow-[0_14px_22px_rgba(0,0,0,0.28)]"
                />
              </div>
            </motion.button>
          </motion.div>
        </div>
      )}

      {/* Mobile & Laptop (< xl): Compact Floating Corner Avatar Dock */}
      <div
        ref={mobileDockRef}
        className="xl:hidden fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2.5"
      >
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.94 }}
              transition={{ duration: 0.16 }}
              className="neo-card rounded-2xl p-2 flex flex-col gap-1.5 min-w-[168px]"
            >
              <div
                className="px-2.5 py-1 text-[10px] font-mono-tech font-bold uppercase tracking-wider border-b"
                style={{ color: "var(--theme-muted)", borderColor: "var(--theme-border)" }}
              >
                {statusLabel}
              </div>

              {onOpenThemeSwitcher && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenThemeSwitcher();
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 hover:opacity-80 text-left cursor-pointer"
                  style={{ backgroundColor: "var(--theme-surface-alt)" }}
                >
                  <Palette className="w-3.5 h-3.5" style={{ color: effectiveAccent }} />
                  <span>Theme</span>
                </button>
              )}

              {onOpenResume && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 hover:opacity-80 text-left cursor-pointer"
                  style={{ backgroundColor: "var(--theme-surface-alt)" }}
                >
                  <FileText className="w-3.5 h-3.5" style={{ color: effectiveAccent }} />
                  <span>Resume</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => scrollToSection("terminal")}
                className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 hover:opacity-80 text-left cursor-pointer"
                style={{ backgroundColor: "var(--theme-surface-alt)" }}
              >
                <Terminal className="w-3.5 h-3.5" style={{ color: effectiveAccent }} />
                <span>Terminal</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="px-3 py-2 rounded-xl neo-btn-primary text-xs font-bold flex items-center gap-2 text-left cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle quick actions menu"
          className="relative w-14 h-14 rounded-full neo-pill p-0.5 flex items-center justify-center cursor-pointer transition-transform active:scale-95"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src={isaacClayBust}
                alt="Gbodimowo Isaac 3D Avatar"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <span
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
            style={{
              backgroundColor: effectiveAccent,
              borderColor: "var(--theme-border)",
            }}
          />
        </button>
      </div>
    </>
  );
}
