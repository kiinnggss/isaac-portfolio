"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia("(pointer: fine)").matches) {
      setMounted(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute("data-cursor") || "");
        setIsHovered(true);
      } else {
        const interactive = target.closest("button, a, input, textarea, [role='button']");
        if (interactive) {
          setCursorText("");
          setIsHovered(true);
        } else {
          setCursorText("");
          setIsHovered(false);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className={`fixed top-0 left-0 pointer-events-none z-50 transition-colors duration-200 hidden md:flex items-center justify-center ${
        cursorText
          ? "px-3 py-1.5 rounded-full bg-[#bfff04] text-black font-mono-tech text-[10px] font-bold shadow-[0_0_20px_rgba(191,255,4,0.4)]"
          : isHovered
          ? "w-10 h-10 rounded-full border-2 border-[#bfff04] bg-[#bfff04]/10 backdrop-blur-[2px]"
          : "w-3 h-3 rounded-full bg-white/80 mix-blend-difference"
      }`}
    >
      {cursorText && <span>{cursorText}</span>}
    </motion.div>
  );
}
