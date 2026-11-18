"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import isaacClayAvatar from "@/public/images/isaac-clay-avatar.png";
import { usePortfolioTheme } from "./ThemeProvider";

export default function ScrollAvatar() {
  const prefersReducedMotion = useReducedMotion();
  const { effectiveAccent } = usePortfolioTheme();
  const { scrollYProgress } = useScroll();
  const [statusLabel, setStatusLabel] = useState("Systems Studio");
  const [bounced, setBounced] = useState(false);

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

  const handleAvatarClick = () => {
    setBounced(true);
    setTimeout(() => setBounced(false), 500);
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (prefersReducedMotion) return null;

  return (
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
          {/* Floating Status Pill */}
          <div className="mb-1.5 px-3 py-1 rounded-full neo-pill text-[10px] font-mono-tech font-bold uppercase tracking-wider flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: effectiveAccent }}
            />
            <span>{statusLabel}</span>
          </div>

          {/* 3D Clay Isaac Companion */}
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
  );
}
