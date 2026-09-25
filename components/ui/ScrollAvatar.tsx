"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useVelocity, AnimatePresence } from "framer-motion";
import isaac3dAvatar from "@/public/images/isaac-3d-avatar.jpg";
import { Activity, ShieldCheck, Terminal, Sparkles, X, MessageSquare } from "lucide-react";

export default function ScrollAvatar() {
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [currentSection, setCurrentSection] = useState("Hero Node");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);

  // Smooth springs for fluid motion without jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 80,
    damping: 25,
  });

  // Vertical travel across the viewport as the user scrolls
  const translateY = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, 140, 260, 360, 420]);

  // Subtle horizontal sway creating an organic floating arc
  const translateX = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, -18, 12, -14, 0]);

  // Dynamic tilt linked to scroll velocity and direction
  const scrollTilt = useTransform(smoothVelocity, [-2, 0, 2], [-14, 0, 14]);

  // Ambient background scale and rotation
  const backgroundY = useTransform(smoothProgress, [0, 1], [-40, 500]);
  const backgroundRotate = useTransform(smoothProgress, [0, 1], [0, 45]);
  const backgroundOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.12, 0.08, 0.08, 0.12]);

  useEffect(() => {
    setIsClient(true);

    const updateCurrentSection = () => {
      const scrollPos = window.scrollY + 200;
      const sections = [
        { id: "work", name: "Core Projects" },
        { id: "skills", name: "System Skills" },
        { id: "terminal", name: "Lagos Edge CLI" },
        { id: "experience", name: "Experience Matrix" },
        { id: "contact", name: "Secure Gateway" },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setCurrentSection(sections[i].name);
          return;
        }
      }
      setCurrentSection("Hero Operations");
    };

    window.addEventListener("scroll", updateCurrentSection, { passive: true });
    updateCurrentSection();
    return () => window.removeEventListener("scroll", updateCurrentSection);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  if (!isClient) return null;

  return (
    <>
      {/* 1. Large Ambient Background Character (Tracks scroll in deep background layer) */}
      <motion.div
        aria-hidden="true"
        style={{
          y: backgroundY,
          rotate: backgroundRotate,
          opacity: backgroundOpacity,
        }}
        className="fixed top-24 right-4 sm:right-16 w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full overflow-hidden pointer-events-none -z-10 mix-blend-luminosity blur-[2px] select-none"
      >
        <Image
          src={isaac3dAvatar}
          alt=""
          priority
          className="w-full h-full object-cover scale-110 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-radial from-transparent via-white/40 to-slate-100" />
      </motion.div>

      {/* 2. Floating Interactive Scroll Avatar Companion */}
      <motion.aside
        aria-label="Interactive 3D Avatar Companion"
        style={{
          y: translateY,
          x: translateX,
          rotateZ: scrollTilt,
        }}
        className="fixed top-28 right-3 sm:right-8 lg:right-12 z-40 select-none"
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={() => setShowStatus((prev) => !prev)}
          animate={{
            rotateX: -mousePos.y * 18,
            rotateY: mousePos.x * 18,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="group relative cursor-pointer crystal-surface rounded-2xl p-2 sm:p-2.5 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.18),0_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-2xl transition-shadow hover:shadow-[0_24px_48px_-8px_rgba(37,99,235,0.25)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Subtle Ambient Refraction Light */}
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-blue-500/20 via-indigo-500/10 to-transparent blur-xs -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

          {/* Avatar Casing */}
          <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-900 shadow-inner">
            <Image
              src={isaac3dAvatar}
              alt="Gbodimowo Isaac 3D Persona"
              priority
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Specular Glaze */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 pointer-events-none" />

            {/* Active Online Node Pulse */}
            <span className="absolute bottom-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-1 ring-white" />
            </span>
          </div>

          {/* Micro Telemetry Pill */}
          <div className="mt-1.5 flex items-center justify-between gap-1 text-[10px] font-mono-tech text-slate-600 px-0.5">
            <span className="flex items-center gap-1 font-semibold text-blue-600">
              <Sparkles className="w-2.5 h-2.5" />
              <span className="hidden sm:inline">SYNC</span>
            </span>
            <span className="text-[9px] text-slate-400 truncate max-w-[56px] sm:max-w-[70px]">
              {currentSection.split(" ")[0]}
            </span>
          </div>

          {/* Interactive Speech / Status Bubble on Click or Hover */}
          <AnimatePresence>
            {(showStatus || isHovered) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10, x: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 8, x: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute right-full top-0 mr-3 w-56 sm:w-64 crystal-surface rounded-2xl p-3 shadow-[0_16px_36px_-6px_rgba(15,23,42,0.16),0_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-2xl pointer-events-auto"
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60 mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 font-display">
                    <Activity className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Edge Telemetry</span>
                  </div>
                  <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                    online
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-snug">
                  Accompanying your scroll through <strong className="text-slate-950 font-semibold">{currentSection}</strong>.
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono-tech text-slate-500">
                  <span>Latency: 4ms</span>
                  <span>BGP Peers: 14</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.aside>
    </>
  );
}
