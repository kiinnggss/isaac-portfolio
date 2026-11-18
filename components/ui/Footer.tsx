"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { getAssetPath } from "@/lib/paths";
import { usePortfolioTheme } from "./ThemeProvider";

export default function Footer() {
  const { effectiveAccent } = usePortfolioTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative neo-console rounded-t-[40px] border-x-0 border-b-0 pt-16 pb-12 mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div
          className="pb-12 border-b"
          style={{ borderColor: "rgba(255,255,255,0.14)" }}
        >
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-tight max-w-3xl">
            Ready to engineer resilient systems together.
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <p className="text-base opacity-80 max-w-xl font-normal leading-relaxed">
              Open for full-time software engineering roles, enterprise systems diagnostics, and distributed infrastructure architecture.
            </p>

            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full neo-btn-primary font-bold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Status Bar */}
        <div
          className="py-8 border-b grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.14)" }}
        >
          <div>
            <div className="font-bold font-display uppercase tracking-wider">Primary Stack</div>
            <div className="opacity-75 font-mono-tech mt-1">
              Next.js 16 / TypeScript / FastAPI
            </div>
          </div>

          <div>
            <div className="font-bold font-display uppercase tracking-wider">Network &amp; Hardware</div>
            <div className="opacity-75 font-mono-tech mt-1">
              Cisco IOS / HSRP v2 / CompTIA A+
            </div>
          </div>

          <div className="flex items-center sm:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-all inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" style={{ color: effectiveAccent }} />
            </button>
          </div>
        </div>

        {/* Signoff */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs opacity-75">
          <div>
            <span>© {new Date().getFullYear()} Gbodimowo Isaac. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-mono-tech">
            <a
              href="mailto:isaacgbodimowo@gmail.com"
              className="hover:underline"
            >
              isaacgbodimowo@gmail.com
            </a>
            <a
              href={getAssetPath("/Gbodimowo_Isaac_Resume.pdf")}
              target="_blank"
              className="hover:underline"
            >
              Resume PDF
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
