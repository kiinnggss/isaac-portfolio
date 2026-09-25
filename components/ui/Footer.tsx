"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
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
    <footer className="relative crystal-surface rounded-t-[48px] pt-20 pb-14 mt-20 shadow-[0_-20px_48px_-12px_rgba(15,23,42,0.05)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="pb-14 border-b border-slate-200/50">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/50">
            Opportunities & Collaboration
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-slate-950 tracking-tight leading-tight">
            Ready to engineer resilient systems together.
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <p className="text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Open for full-time software engineering roles, enterprise systems diagnostics, and distributed infrastructure architecture.
            </p>

            <MagneticButton
              href="#contact"
              className="crystal-button px-7 py-3.5 rounded-full text-white font-medium text-xs sm:text-sm shadow-md"
            >
              Start Conversation
            </MagneticButton>
          </div>
        </div>

        {/* Status Bar */}
        <div className="py-8 border-b border-slate-200/40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-500">
          <div>
            <div className="font-semibold text-slate-900 font-display">Location Base</div>
            <div className="text-slate-600 mt-1">Lagos, Nigeria (West Africa)</div>
          </div>

          <div>
            <div className="font-semibold text-slate-900 font-display">Local Time (WAT)</div>
            <div className="text-slate-700 font-mono-tech mt-1">
              {lagosTime ? `${lagosTime} WAT (UTC+1)` : "Synchronizing..."}
            </div>
          </div>

          <div>
            <div className="font-semibold text-slate-900 font-display">Architecture Stack</div>
            <div className="text-slate-600 mt-1">Next.js 16 • React 19 • Cisco IOS</div>
          </div>

          <div className="flex items-center sm:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="crystal-pill px-4 py-2 rounded-full text-slate-700 hover:text-slate-950 transition-all inline-flex items-center gap-1.5 text-xs font-medium shadow-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Signoff */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
            <span>© {new Date().getFullYear()} Gbodimowo Isaac. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:isaacgbodimowo@gmail.com"
              className="hover:text-slate-900 transition-colors"
            >
              isaacgbodimowo@gmail.com
            </a>
            <span>•</span>
            <a
              href="/Gbodimowo_Isaac_Resume.pdf"
              target="_blank"
              className="hover:text-slate-900 transition-colors"
            >
              Resume PDF
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
