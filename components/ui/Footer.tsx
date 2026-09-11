"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Terminal, ShieldCheck, Heart } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Footer() {
  const [lagosTime, setLagosTime] = useState("");

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
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-[#bfff04]/10 via-[#00f0ff]/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Massive Display Closing Banner */}
        <div className="pb-16 border-b border-white/10">
          <div className="text-xs font-mono-tech uppercase text-[#bfff04] tracking-widest mb-4 flex items-center gap-2">
            <span className="w-6 h-[1px] bg-[#bfff04]" />
            Next Steps & Collaboration
          </div>

          <h2 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[104px] tracking-tight uppercase text-white leading-[0.92] select-none hover:text-gradient-green transition-all">
            LET&apos;S BUILD TOGETHER.
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <p className="text-base sm:text-lg text-neutral-400 max-w-xl font-light">
              Available for full-time software engineering roles, enterprise systems diagnostics, and distributed infrastructure architecture.
            </p>

            <MagneticButton
              href="#contact"
              className="px-8 py-4 rounded-full bg-[#bfff04] text-black font-semibold text-xs sm:text-sm uppercase tracking-tight hover:bg-[#d0ff36] hover:shadow-[0_0_35px_rgba(191,255,4,0.4)] transition-all flex items-center gap-2 active:scale-95"
            >
              Start Conversation
            </MagneticButton>
          </div>
        </div>

        {/* Ticker & Meta Status Bar */}
        <div className="py-8 border-b border-white/5 grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-mono-tech text-neutral-400">
          <div>
            <div className="text-[10px] text-neutral-500 uppercase">Current Station</div>
            <div className="text-white font-medium mt-1">Lagos, Nigeria (West Africa)</div>
          </div>

          <div>
            <div className="text-[10px] text-neutral-500 uppercase">Local Real-time Clock</div>
            <div className="text-[#00f0ff] font-semibold mt-1">
              {lagosTime ? `${lagosTime} WAT (UTC+1)` : "Synchronizing..."}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-neutral-500 uppercase">Architecture Stack</div>
            <div className="text-white font-medium mt-1">Next.js 16 • React 19 • Cisco IOS</div>
          </div>

          <div className="flex items-center md:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-[#bfff04]/40 transition-all flex items-center gap-2"
            >
              <span>Return to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#bfff04]" />
            </button>
          </div>
        </div>

        {/* Copyright & Signoff */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#bfff04]" />
            <span>© {new Date().getFullYear()} Gbodimowo Isaac. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#work" className="hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#terminal" className="hover:text-white transition-colors">CLI</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
