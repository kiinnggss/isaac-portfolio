"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Shield,
  Cpu,
  Network,
  CheckCircle2,
  FileText,
} from "lucide-react";
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

interface CoverPageProps {
  onOpenPortfolio: (sectionHash?: string) => void;
}

export default function CoverPage({ onOpenPortfolio }: CoverPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 22 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 35) {
        onOpenPortfolio();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        onOpenPortfolio();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpenPortfolio]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] w-full bg-[#a8b4bc] bg-architectural-grid text-[#090d16] flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-5 sm:py-7 overflow-hidden select-none"
    >
      {/* Top Architectural Bar */}
      <header className="relative z-30 w-full max-w-7xl mx-auto h-14 flex items-center justify-between gap-4 border-b border-slate-900/10 pb-3">
        <div className="flex items-center gap-2.5 font-display font-bold text-base sm:text-lg tracking-tight text-[#090d16]">
          <span className="w-6 h-6 rounded-full bg-[#090d16] text-white flex items-center justify-center text-xs font-mono-tech">
            GI
          </span>
          <span>gbodimowo.isaac</span>
        </div>

        <nav className="hidden md:flex items-center gap-7 text-xs font-mono-tech uppercase tracking-wider text-slate-800">
          <button
            type="button"
            onClick={() => onOpenPortfolio("work")}
            className="hover:text-orange-600 transition-colors cursor-pointer"
          >
            Selected Works
          </button>
          <button
            type="button"
            onClick={() => onOpenPortfolio("skills")}
            className="hover:text-orange-600 transition-colors cursor-pointer"
          >
            Systems Matrix
          </button>
          <button
            type="button"
            onClick={() => onOpenPortfolio("terminal")}
            className="hover:text-orange-600 transition-colors cursor-pointer"
          >
            Cisco Topology
          </button>
          <button
            type="button"
            onClick={() => onOpenPortfolio("contact")}
            className="hover:text-orange-600 transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/kiinnggss"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-8 h-8 rounded-full bg-white/80 border border-white/90 flex items-center justify-center text-slate-900 hover:bg-[#090d16] hover:text-white transition-all shadow-xs"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/isaac-gbodimowo-743152294/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-8 h-8 rounded-full bg-white/80 border border-white/90 flex items-center justify-center text-slate-900 hover:bg-[#090d16] hover:text-white transition-all shadow-xs"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Main Cover Stage */}
      <main className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center my-4">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <span
            aria-hidden="true"
            className="font-display font-bold text-[14vw] sm:text-[15vw] tracking-tighter text-white/35 leading-none uppercase select-none text-center"
          >
            SYSTEMS
          </span>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 4-Element Hero Stack */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5 self-start px-3.5 py-1.5 rounded-full bg-[#090d16] text-white text-xs font-mono-tech tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>B.Sc. Computer Science / CompTIA A+ / CCNA</span>
            </div>

            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-[#090d16] tracking-tight leading-[0.96] uppercase">
              Gbodimowo
              <br />
              <span className="text-orange-600">Isaac.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-800 max-w-xl leading-relaxed font-normal">
              Software Engineer and Network Systems Specialist building high-concurrency TypeScript platforms, Cisco IOS routing topologies, and fault-isolated hardware systems.
            </p>

            {/* Primary Actions (Single Clear Intent per Button) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onOpenPortfolio()}
                className="crystal-button px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide cursor-pointer inline-flex items-center gap-2.5"
              >
                <span>Enter Portfolio</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={getAssetPath("/Gbodimowo_Isaac_Resume.pdf")}
                target="_blank"
                rel="noopener noreferrer"
                className="crystal-button-secondary px-6 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-orange-600" />
                <span>View Resume</span>
              </a>
            </div>

            {/* Domain Capability Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg border-t border-slate-900/10">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-900">
                <Network className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Cisco HSRP & VLANs</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-900">
                <Cpu className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Next.js & FastAPI</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-900">
                <Shield className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Hardware Diagnostics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Frosted Glass Portal */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              style={
                prefersReducedMotion
                  ? undefined
                  : { rotateX, rotateY, transformStyle: "preserve-3d" }
              }
              onClick={() => onOpenPortfolio()}
              className="relative w-[310px] sm:w-[370px] md:w-[400px] h-[460px] sm:h-[520px] rounded-3xl bg-white/45 border border-white/90 shadow-[0_32px_80px_-16px_rgba(9,13,22,0.24)] backdrop-blur-xl flex items-end justify-center overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(234,88,12,0.22)_0%,rgba(255,255,255,0.45)_48%,transparent_75%)] pointer-events-none" />

              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#090d16]/90 text-white backdrop-blur-md text-[11px] font-mono-tech border border-white/15">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>VERIFIED ARCHITECT</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/85 text-[#090d16] text-[10px] font-mono-tech font-semibold border border-white">
                  Lagos, NG
                </span>
              </div>

              <div className="relative z-10 w-full h-[96%] flex items-end justify-center pointer-events-none">
                <Image
                  src={isaacPortraitBust}
                  alt="Gbodimowo Isaac"
                  priority
                  className="h-full w-auto object-contain object-bottom select-none drop-shadow-[0_22px_44px_rgba(9,13,22,0.45)] translate-y-1 transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="absolute bottom-0 inset-x-0 z-20 p-5 bg-gradient-to-t from-[#090d16]/95 via-[#090d16]/65 to-transparent text-white flex items-center justify-between">
                <div>
                  <div className="text-sm font-display font-bold tracking-wide">
                    Gbodimowo Isaac
                  </div>
                  <div className="text-[11px] font-mono-tech text-slate-300">
                    Software & Network Systems Engineer
                  </div>
                </div>

                <span className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#090d16] transition-colors shadow-md">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Bottom Status Bar */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-900/10 text-xs font-mono-tech text-slate-800">
        <span>4 PRODUCTION ARCHITECTURES DEPLOYED</span>
        <span className="hidden sm:inline text-slate-700">
          PRESS ENTER OR SCROLL TO INSPECT WORKSPACE
        </span>
        <span>CISCO IOS / NEXT.JS 16 / FASTAPI</span>
      </footer>
    </div>
  );
}
