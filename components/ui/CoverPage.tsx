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
  Palette,
  Play,
} from "lucide-react";
import isaacPortraitBust from "@/public/images/isaac-portrait-bust.png";
import { getAssetPath } from "@/lib/paths";
import { usePortfolioTheme } from "@/components/ui/ThemeProvider";

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
  onOpenThemeSwitcher: () => void;
}

export default function CoverPage({
  onOpenPortfolio,
  onOpenThemeSwitcher,
}: CoverPageProps) {
  const { theme, effectiveAccent } = usePortfolioTheme();
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 22 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 40) {
        onOpenPortfolio();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
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
      className="relative min-h-[100dvh] w-full bg-memphis-canvas flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-5 sm:py-7 overflow-hidden select-none"
      style={{
        backgroundColor: "var(--theme-bg)",
        color: "var(--theme-ink)",
      }}
    >
      {/* Top Studio Header */}
      <header
        className="relative z-30 w-full max-w-7xl mx-auto h-14 flex items-center justify-between gap-4 pb-3 border-b-2"
        style={{ borderColor: "var(--theme-border)" }}
      >
        <div className="flex items-center gap-2.5 font-display font-extrabold text-lg sm:text-xl tracking-wide uppercase">
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono-tech font-bold border-2"
            style={{
              backgroundColor: "var(--theme-accent)",
              color: "var(--theme-accent-text)",
              borderColor: "var(--theme-border)",
            }}
          >
            GI
          </span>
          <span>gbodimowo.isaac</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-mono-tech uppercase tracking-wider font-semibold">
          {[
            { label: "Works", hash: "work" },
            { label: "Systems", hash: "skills" },
            { label: "Topology", hash: "terminal" },
            { label: "Contact", hash: "contact" },
          ].map((item) => (
            <button
              key={item.hash}
              type="button"
              onClick={() => onOpenPortfolio(item.hash)}
              className="hover:underline underline-offset-4 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenThemeSwitcher}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full neo-pill text-xs font-semibold whitespace-nowrap cursor-pointer hover:opacity-90"
            title="Customize workspace theme"
          >
            <span
              className="w-3 h-3 rounded-full border"
              style={{
                backgroundColor: effectiveAccent,
                borderColor: "var(--theme-border)",
              }}
            />
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{theme.name}</span>
          </button>

          <a
            href="https://github.com/kiinnggss"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-8 h-8 rounded-full neo-pill flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/isaac-gbodimowo-743152294/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-8 h-8 rounded-full neo-pill flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Main Cover Stage */}
      <main className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center my-4">
        <div
          className="rounded-[28px] p-6 sm:p-10 lg:p-12 border-2 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
          style={{
            backgroundColor: "var(--theme-hero-bg)",
            color: "var(--theme-hero-ink)",
            borderColor: "var(--theme-border)",
            boxShadow: "8px 8px 0 0 var(--theme-shadow)",
          }}
        >
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 text-left">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full neo-pill text-[11px] font-mono-tech uppercase tracking-[0.18em] font-bold">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: effectiveAccent }}
              />
              <span>Software Engineer & Network Specialist</span>
            </div>

            <h1 className="font-display font-extrabold text-6xl sm:text-7xl lg:text-[84px] tracking-tight leading-[0.88] uppercase">
              GBODIMOWO
              <br />
              ISAAC.
            </h1>

            <p className="text-base sm:text-lg max-w-xl leading-relaxed font-medium opacity-95">
              Building high-concurrency TypeScript web platforms, enterprise Cisco IOS routing topologies, and fault-isolated hardware systems from Lagos, Nigeria.
            </p>

            {/* Creative Mints Style Pill CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onOpenPortfolio()}
                className="px-6 py-3.5 rounded-full bg-white text-[#18181B] border-2 font-bold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-3 cursor-pointer transition-transform hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--theme-border)",
                  boxShadow: "4px 4px 0 0 var(--theme-shadow)",
                }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: effectiveAccent,
                    color: "var(--theme-accent-text)",
                  }}
                >
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </span>
                <span>Enter Studio</span>
              </button>

              <a
                href={getAssetPath("/Gbodimowo_Isaac_Resume.pdf")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full neo-pill text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer hover:opacity-90"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </a>
            </div>

            {/* Domain Capability Strip */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t-2"
              style={{ borderColor: "rgba(255,255,255,0.22)" }}
            >
              <div className="flex items-center gap-2 text-xs font-mono-tech font-semibold">
                <Network className="w-4 h-4 shrink-0" />
                <span>Cisco HSRP & VLANs</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-tech font-semibold">
                <Cpu className="w-4 h-4 shrink-0" />
                <span>Next.js & FastAPI</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-tech font-semibold">
                <Shield className="w-4 h-4 shrink-0" />
                <span>CompTIA A+ Diagnostics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Framed Portrait Portal */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              style={
                prefersReducedMotion
                  ? undefined
                  : { rotateX, rotateY, transformStyle: "preserve-3d" }
              }
              onClick={() => onOpenPortfolio()}
              className="relative w-[290px] sm:w-[340px] h-[400px] sm:h-[450px] rounded-3xl neo-card flex items-end justify-center overflow-hidden group cursor-pointer"
            >
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(var(--theme-border) 1.5px, transparent 1.5px)",
                  backgroundSize: "18px 18px",
                }}
              />

              <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full neo-console text-[10px] font-mono-tech font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>VERIFIED ARCHITECT</span>
                </div>
                <span className="px-2.5 py-1 rounded-full neo-pill text-[10px] font-mono-tech font-bold">
                  Lagos, NG
                </span>
              </div>

              <div className="relative z-10 w-full h-[94%] flex items-end justify-center pointer-events-none">
                <Image
                  src={isaacPortraitBust}
                  alt="Gbodimowo Isaac"
                  priority
                  className="h-full w-auto object-contain object-bottom select-none drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)] translate-y-1 transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div
                className="absolute bottom-0 inset-x-0 z-20 p-4 flex items-center justify-between border-t-2"
                style={{
                  backgroundColor: "var(--theme-console-bg)",
                  color: "var(--theme-console-ink)",
                  borderColor: "var(--theme-border)",
                }}
              >
                <div>
                  <div className="text-sm font-display font-bold tracking-wide uppercase">
                    Gbodimowo Isaac
                  </div>
                  <div className="text-[11px] font-mono-tech opacity-80">
                    Software & Network Systems
                  </div>
                </div>

                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center border-2"
                  style={{
                    backgroundColor: effectiveAccent,
                    color: "var(--theme-accent-text)",
                    borderColor: "var(--theme-border)",
                  }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Bottom Status Bar */}
      <footer
        className="relative z-20 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 pt-3 border-t-2 text-xs font-mono-tech font-semibold"
        style={{ borderColor: "var(--theme-border)" }}
      >
        <span>5 PRODUCTION ARCHITECTURES DEPLOYED</span>
        <span className="hidden sm:inline opacity-80">
          SCROLL OR CLICK ENTER STUDIO TO EXPLORE
        </span>
        <span>CISCO IOS / NEXT.JS 16 / FASTAPI</span>
      </footer>
    </div>
  );
}
