"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { getAssetPath } from "@/lib/paths";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative obsidian-surface rounded-t-[48px] pt-20 pb-14 mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="pb-14 border-b border-white/10">
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight max-w-3xl">
            Ready to engineer resilient systems together.
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <p className="text-base text-slate-300 max-w-xl font-normal leading-relaxed">
              Open for full-time software engineering roles, enterprise systems diagnostics, and distributed infrastructure architecture.
            </p>

            <MagneticButton
              href="#contact"
              className="px-7 py-3.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>

        {/* Status Bar */}
        <div className="py-8 border-b border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-400">
          <div>
            <div className="font-semibold text-white font-display">Primary Stack</div>
            <div className="text-slate-300 font-mono-tech mt-1">Next.js 16 / TypeScript / FastAPI</div>
          </div>

          <div>
            <div className="font-semibold text-white font-display">Network & Hardware</div>
            <div className="text-slate-300 font-mono-tech mt-1">Cisco IOS / HSRP v2 / CompTIA A+</div>
          </div>

          <div className="flex items-center sm:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-orange-400" />
            </button>
          </div>
        </div>

        {/* Signoff */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span>© {new Date().getFullYear()} Gbodimowo Isaac. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-mono-tech">
            <a
              href="mailto:isaacgbodimowo@gmail.com"
              className="hover:text-orange-400 transition-colors"
            >
              isaacgbodimowo@gmail.com
            </a>
            <a
              href={getAssetPath("/Gbodimowo_Isaac_Resume.pdf")}
              target="_blank"
              className="hover:text-orange-400 transition-colors"
            >
              Resume PDF
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
