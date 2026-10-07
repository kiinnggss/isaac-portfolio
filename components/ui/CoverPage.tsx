"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Terminal, Shield, Cpu, Network, CheckCircle2 } from "lucide-react";
import isaacPortraitBust from "@/public/images/isaac-portrait-bust.png";
import { getAssetPath } from "@/lib/paths";

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
      className="relative min-h-screen w-full bg-[#a8b4bc] text-slate-900 flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-5 sm:py-7 overflow-hidden select-none"
    >
      {/* Top Editorial Navigation Header */}
      <header className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Section Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-800">
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
        <div className="flex items-center gap-2 font-display font-bold text-base sm:text-xl tracking-tight text-slate-950">
          <span className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center text-xs font-mono-tech">
            I
          </span>
          <span>gbodimowo.isaac</span>
        </div>

        {/* Right Socials & Open Portfolio Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://github.com/kiinnggss"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hidden sm:flex w-8 h-8 rounded-full bg-white/80 border border-slate-300 items-center justify-center text-slate-800 hover:bg-white hover:text-black transition-all shadow-xs"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/isaac-gbodimowo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="hidden sm:flex w-8 h-8 rounded-full bg-white/80 border border-slate-300 items-center justify-center text-slate-800 hover:bg-white hover:text-black transition-all shadow-xs"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X Profile"
            className="hidden sm:flex w-8 h-8 rounded-full bg-white/80 border border-slate-300 items-center justify-center text-slate-800 hover:bg-white hover:text-black transition-all shadow-xs"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onOpenPortfolio}
            className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-slate-950 text-white text-xs sm:text-sm font-medium tracking-wide shadow-md hover:bg-black hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Open Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Cover Stage: Tech Executive Layout */}
      <main className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center my-4 sm:my-6">
        {/* Subtle background blueprint watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h1 className="font-display font-black text-[14vw] sm:text-[15vw] tracking-tighter text-white/50 leading-none uppercase select-none text-center">
            ARCHITECT
          </h1>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visionary Headline and Credentials */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5 text-left">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-white/80 border border-slate-300 shadow-xs text-xs font-mono-tech text-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>LAGOS, NIGERIA // COMPTIA A+ VERIFIED</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-mono-tech text-orange-600 font-semibold">
                Software & Enterprise Systems
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight leading-[1.02] uppercase">
                Gbodimowo
                <br />
                Isaac.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 max-w-lg leading-relaxed">
              Engineering resilient distributed backends, high-throughput cloud
              pipelines, and enterprise Cisco network routing architectures.
            </p>

            {/* Live Core Competencies Pill Cluster */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200 text-xs font-mono-tech text-slate-800 shadow-xs">
                <Network className="w-3.5 h-3.5 text-orange-600" />
                <span>Cisco IOS Routing</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200 text-xs font-mono-tech text-slate-800 shadow-xs">
                <Cpu className="w-3.5 h-3.5 text-blue-600" />
                <span>Distributed Systems</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200 text-xs font-mono-tech text-slate-800 shadow-xs">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Trust Security</span>
              </span>
            </div>

            {/* Primary Executive Actions */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onOpenPortfolio}
                className="px-6 py-3 rounded-full bg-slate-950 text-white text-sm font-semibold tracking-wide shadow-lg hover:bg-black hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Enter Portfolio</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={getAssetPath("/Gbodimowo_Isaac_Resume.pdf")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-white/90 border border-slate-300 text-slate-800 text-sm font-semibold hover:bg-white hover:text-black transition-all shadow-xs cursor-pointer"
              >
                View Resume
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Frosted Glass Portal Framing Isaac */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <motion.div
              animate={{
                rotateX: -mousePos.y * 8,
                rotateY: mousePos.x * 8,
              }}
              transition={{ type: "spring", stiffness: 160, damping: 22 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-[320px] sm:w-[380px] md:w-[420px] h-[480px] sm:h-[540px] rounded-3xl bg-white/40 border border-white/80 shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl flex items-end justify-center overflow-hidden group"
            >
              {/* Subtle Ambient Backlight Glow behind Portrait */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(234,88,12,0.22)_0%,rgba(255,255,255,0.4)_45%,transparent_75%)] pointer-events-none" />

              {/* Corner Architectural Monogram Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 text-white backdrop-blur-md text-[11px] font-mono-tech border border-white/20">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>VERIFIED PROFILE</span>
              </div>

              {/* Isaac's Studio Retouched Portrait */}
              <div className="relative z-10 w-full h-[98%] flex items-end justify-center pointer-events-none">
                <Image
                  src={isaacPortraitBust}
                  alt="Gbodimowo Isaac"
                  priority
                  className="h-full w-auto object-contain object-bottom select-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.45)] scale-100 translate-y-1 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Lower Glass Spec Bar */}
              <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent text-white flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-wide">
                    Gbodimowo Isaac
                  </div>
                  <div className="text-[11px] font-mono-tech text-slate-300">
                    Senior Systems Engineer
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenPortfolio}
                  className="w-8 h-8 rounded-full bg-white text-slate-950 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors cursor-pointer shadow-md"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
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
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <div className="hidden md:flex items-center gap-4 text-slate-600">
          <span>CISCO IOS // ZERO TRUST // NEXT.JS</span>
        </div>
      </footer>
    </div>
  );
}
