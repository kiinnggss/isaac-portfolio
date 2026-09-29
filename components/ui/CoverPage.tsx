"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ShieldCheck, Network, Activity, Sparkles, Terminal } from "lucide-react";
import isaacFullAvatar from "@/public/images/isaac-full-avatar.png";

interface CoverPageProps {
  onEnter?: () => void;
}

export default function CoverPage({ onEnter }: CoverPageProps) {
  const [lagosTime, setLagosTime] = useState<string>("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  // Fade out and translate upward as the user scrolls past the 100vh cover
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const translateY = useTransform(scrollY, [0, 500], [0, -120]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setLagosTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleScrollDown = () => {
    if (onEnter) {
      onEnter();
    } else {
      const hero = document.getElementById("overview");
      if (hero) {
        hero.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }
    }
  };

  return (
    <motion.section
      style={{ opacity, y: translateY, scale }}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between px-4 sm:px-8 py-8 sm:py-10 overflow-hidden select-none border-b border-slate-200/60"
    >
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-300/30 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-200/25 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Top Cover Bar */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs font-mono-tech text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="font-semibold text-slate-900 tracking-wider">SYSTEMS ARCHIVE // 2026</span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <span>LAGOS NODE [UTC+1]</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-900 font-semibold">{lagosTime || "12:00:00"}</span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-600 font-medium">4MS LATENCY</span>
        </div>

        <div className="crystal-pill px-3 py-1.5 rounded-full text-[11px] font-medium text-slate-800 flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-blue-600" />
          <span>PORTFOLIO COVER</span>
        </div>
      </div>

      {/* Main Cover Stage */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center my-6 sm:my-10">
        {/* Massive Background Display Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
          <h1 className="font-display font-extrabold text-[12vw] sm:text-[13vw] md:text-[14vw] tracking-tighter text-slate-900/10 leading-[0.85] text-center uppercase select-none">
            GBODIMOWO
          </h1>
          <h1 className="font-display font-extrabold text-[12vw] sm:text-[13vw] md:text-[14vw] tracking-tighter text-slate-900/10 leading-[0.85] text-center uppercase select-none">
            ISAAC
          </h1>
        </div>

        {/* Center 3D Full-Body Character with Interactive Perspective Tilt */}
        <motion.div
          animate={{
            rotateX: -mousePos.y * 14,
            rotateY: mousePos.x * 14,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative z-10 h-[52vh] sm:h-[58vh] md:h-[64vh] max-h-[640px] w-auto flex items-center justify-center filter drop-shadow-[0_28px_50px_rgba(37,99,235,0.28)]"
        >
          {/* Cyan Glow Halo Behind Character */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/35 via-indigo-300/20 to-transparent blur-3xl scale-125 -z-10" />

          <Image
            src={isaacFullAvatar}
            alt="Gbodimowo Isaac 3D Persona"
            priority
            className="h-full w-auto object-contain select-none pointer-events-none"
          />
        </motion.div>

        {/* Floating Identity Capsule in Foreground */}
        <div className="relative z-20 -mt-6 sm:-mt-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 px-3.5 py-1.5 rounded-full crystal-surface shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Software Engineer & Network Systems Specialist</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-slate-950">
            Gbodimowo Isaac
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
            Bridging scalable web engineering with enterprise Cisco routing, Zero Trust defense, and hardware diagnostics.
          </p>

          {/* Quick Credential Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-mono-tech text-slate-600">
            <span className="crystal-pill px-3 py-1 rounded-full flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              CompTIA A+
            </span>
            <span className="crystal-pill px-3 py-1 rounded-full flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-slate-700" />
              Cisco CCNA
            </span>
            <span className="crystal-pill px-3 py-1 rounded-full flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-600" />
              Babcock CS
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/50">
        <div className="text-xs text-slate-500 font-mono-tech hidden sm:block">
          PRESS SCROLL OR CLICK TO ENTER SYSTEM
        </div>

        <button
          type="button"
          onClick={handleScrollDown}
          className="crystal-button px-6 py-3 rounded-full text-white text-xs sm:text-sm font-medium inline-flex items-center gap-2.5 shadow-[0_12px_28px_-6px_rgba(37,99,235,0.4)] cursor-pointer hover:scale-105 active:scale-95 transition-all"
        >
          <span>Enter Portfolio</span>
          <ArrowDown className="w-4 h-4 text-blue-200 animate-bounce" />
        </button>

        <div className="text-xs text-slate-500 font-mono-tech hidden sm:block">
          VERIFIED BUILD 2.4 // LAGOS, NG
        </div>
      </div>
    </motion.section>
  );
}
