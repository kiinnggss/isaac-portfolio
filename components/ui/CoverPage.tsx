"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Terminal } from "lucide-react";
import isaacPortraitCutout from "@/public/images/isaac-portrait-cutout.png";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function TwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface CoverPageProps {
  onOpenPortfolio: () => void;
}

export default function CoverPage({ onOpenPortfolio }: CoverPageProps) {
  const [lagosTime, setLagosTime] = useState<string>("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 35) {
        onOpenPortfolio();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [onOpenPortfolio]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#cad3d8] text-slate-900 flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-6 sm:py-8 overflow-hidden select-none"
    >
      {/* Top Editorial Navigation */}
      <header className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left lower-case section links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-800">
          <button
            type="button"
            onClick={onOpenPortfolio}
            className="hover:text-black transition-colors cursor-pointer"
          >
            overview
          </button>
          <button
            type="button"
            onClick={onOpenPortfolio}
            className="hover:text-black transition-colors cursor-pointer"
          >
            systems
          </button>
          <button
            type="button"
            onClick={onOpenPortfolio}
            className="hover:text-black transition-colors cursor-pointer"
          >
            contact
          </button>
        </nav>

        {/* Center Brand Identity */}
        <div className="flex items-center gap-2 font-display font-bold text-lg sm:text-xl tracking-tight text-slate-950">
          <span className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center text-xs font-mono-tech">
            I
          </span>
          <span>gbodimowo.isaac</span>
        </div>

        {/* Right Social Circles and Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/kiinnggss"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-8 h-8 rounded-full bg-white/80 border border-slate-300 flex items-center justify-center text-slate-800 hover:bg-white hover:text-black transition-all shadow-xs"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/isaac-gbodimowo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-8 h-8 rounded-full bg-white/80 border border-slate-300 flex items-center justify-center text-slate-800 hover:bg-white hover:text-black transition-all shadow-xs"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X Profile"
            className="w-8 h-8 rounded-full bg-white/80 border border-slate-300 flex items-center justify-center text-slate-800 hover:bg-white hover:text-black transition-all shadow-xs"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onOpenPortfolio}
            className="ml-1 sm:ml-2 px-5 py-2 rounded-full bg-slate-950 text-white text-xs sm:text-sm font-medium tracking-wide shadow-md hover:bg-black hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Open Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Cover Stage */}
      <main className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center my-4 sm:my-6">
        {/* Massive Embossed White Display Word in Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h1 className="font-display font-black text-[15vw] sm:text-[16vw] md:text-[17vw] tracking-tighter text-white/55 leading-none uppercase select-none text-center">
            ARCHITECT
          </h1>
        </div>

        {/* Center Sunset Arch with Real Portrait and Overlays */}
        <div className="relative w-full flex items-center justify-center">
          <motion.div
            animate={{
              rotateX: -mousePos.y * 12,
              rotateY: mousePos.x * 12,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative z-10 flex items-center justify-center"
          >
            {/* The Radiant Sunset Arch */}
            <div className="relative w-[280px] sm:w-[340px] md:w-[390px] h-[430px] sm:h-[500px] md:h-[550px] rounded-t-full rounded-b-3xl bg-gradient-to-b from-[#ff2442] via-[#ff6a00] to-[#ffaa00] shadow-[0_25px_60px_rgba(255,106,0,0.35)] overflow-hidden flex items-end justify-center">
              {/* Internal sunset ambient radial gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.25)_0%,transparent_70%)]" />

              {/* Isaac's Real Portrait Inside the Arch */}
              <div className="relative z-10 w-full h-[95%] flex items-end justify-center">
                <Image
                  src={isaacPortraitCutout}
                  alt="Gbodimowo Isaac"
                  priority
                  className="h-full w-auto object-contain object-bottom select-none pointer-events-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.55)] scale-110 translate-y-3"
                />
              </div>
            </div>

            {/* Floating Left Dark Pill Badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 sm:-left-12 top-1/4 -rotate-6 z-20 px-4 py-1.5 rounded-full bg-slate-950 text-white text-xs sm:text-sm font-medium tracking-wide shadow-lg border border-white/20 select-none pointer-events-none"
            >
              Distributed Systems
            </motion.div>

            {/* Floating Right Dark Pill Badge */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 sm:-right-12 top-1/5 rotate-6 z-20 px-4 py-1.5 rounded-full bg-slate-950 text-white text-xs sm:text-sm font-medium tracking-wide shadow-lg border border-white/20 select-none pointer-events-none"
            >
              Cloud Architecture
            </motion.div>

            {/* Electric Violet / Purple Cursive Signature Across the Center */}
            <div className="absolute z-25 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[140%] text-center pointer-events-none">
              <span className="font-signature font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#a855f7] tracking-wide -rotate-6 inline-block drop-shadow-[0_4px_16px_rgba(168,85,247,0.7)] select-none">
                Isaac Gbodimowo
              </span>
            </div>
          </motion.div>

          {/* Left Headline Overlay */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 max-w-xs sm:max-w-sm hidden md:block">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-800 mb-3 px-3 py-1 rounded-full bg-white/70 border border-slate-300/80 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Hi, I am Gbodimowo Isaac</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-slate-950 uppercase">
              Systems,
              <br />
              Distributed
              <br />
              Backends
              <br />
              & Cloud.
            </h2>
          </div>

          {/* Floating White Experience Card on Bottom Right */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={onOpenPortfolio}
            className="absolute right-0 bottom-4 sm:bottom-8 z-30 bg-white/95 rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-200/80 max-w-[280px] sm:max-w-xs cursor-pointer group transition-all"
          >
            <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
              4+ Years of Expertise, Systems & Enterprise Network Engineer in Lagos, Nigeria.
            </p>

            <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs font-mono-tech text-slate-500 group-hover:text-orange-600 transition-colors">
                isaacgbodimowo@gmail.com
              </span>

              {/* Scalloped Circular Action Sticker */}
              <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-md group-hover:bg-orange-600 group-hover:rotate-45 transition-all">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Bottom Editorial Bar */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between gap-4 pt-3 border-t border-slate-300/80 text-xs font-mono-tech text-slate-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-orange-600" />
          <span>LAGOS NODE [UTC+1]: {lagosTime || "12:00:00"}</span>
        </div>

        <button
          type="button"
          onClick={onOpenPortfolio}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-slate-300 text-slate-900 font-medium hover:bg-white hover:border-slate-400 transition-all cursor-pointer shadow-xs"
        >
          <span>Click to open full portfolio</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-orange-600" />
        </button>

        <div className="hidden sm:block">
          CISCO IOS // ZERO TRUST // NEXT.JS
        </div>
      </footer>
    </div>
  );
}
