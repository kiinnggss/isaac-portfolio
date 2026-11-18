"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, Download, Maximize2, Play, ShieldCheck, Network, Cpu } from "lucide-react";
import IsometricStudio from "./IsometricStudio";
import PhotoModal, { PhotoDetails } from "./PhotoModal";
import isaacPortrait from "@/public/images/isaac-portrait.jpg";
import { getAssetPath } from "@/lib/paths";
import { usePortfolioTheme } from "./ThemeProvider";

export default function HeroSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDetails | null>(null);
  const { effectiveAccent } = usePortfolioTheme();

  return (
    <section
      id="overview"
      className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Creative Mints Editorial Isometric Hero Card */}
      <div
        className="rounded-[32px] p-6 sm:p-10 lg:p-14 border-2 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        style={{
          backgroundColor: "var(--theme-hero-bg)",
          color: "var(--theme-hero-ink)",
          borderColor: "var(--theme-border)",
          boxShadow: "8px 8px 0 0 var(--theme-shadow)",
        }}
      >
        {/* Left Column: Tracked Eyebrow, Stacked Condensed Headline, Bio + Badge, Pill CTA */}
        <div className="lg:col-span-6 space-y-6">
          <div className="text-[11px] sm:text-xs font-mono-tech uppercase tracking-[0.3em] font-bold opacity-90">
            SOFTWARE &amp; NETWORK ARCHITECT
          </div>

          <h1 className="font-display font-extrabold text-6xl sm:text-7xl lg:text-[86px] tracking-tight leading-[0.88] uppercase">
            GBODIMOWO
            <br />
            ISAAC
          </h1>

          <div className="flex items-start gap-4 max-w-md pt-1">
            <p className="text-sm sm:text-base leading-relaxed font-medium opacity-95">
              Full-stack TypeScript &amp; FastAPI engineer building resilient web platforms and enterprise Cisco IOS topologies.
            </p>
            <div
              className="w-11 h-11 rounded-full border-2 flex items-center justify-center shrink-0"
              style={{ borderColor: "var(--theme-hero-ink)" }}
              title="B.Sc. Computer Science & CompTIA A+"
            >
              <Award className="w-5 h-5" />
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <a
              href="#work"
              className="px-6 py-3.5 rounded-full bg-white text-[#18181B] border-2 font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-3 transition-transform hover:-translate-y-0.5"
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
              <span>Explore Works</span>
            </a>

            <a
              href={getAssetPath("/Gbodimowo_Isaac_Resume.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full neo-pill text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              <span>Resume PDF</span>
            </a>
          </div>
        </div>

        {/* Right Column: Custom Isometric Engineering Studio Diorama */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <IsometricStudio />
        </div>
      </div>

      {/* Bottom Executive Dossier & Telemetry Strip */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Clickable Portrait Dossier Card */}
        <div
          onClick={() =>
            setSelectedPhoto({
              src: isaacPortrait,
              alt: "Gbodimowo Isaac in dark formal suit and sunglasses",
              title: "Gbodimowo Isaac",
              subtitle: "Software Engineer & Network Systems Specialist",
              tag: "EXECUTIVE PORTRAIT",
              location: "Lagos, Nigeria",
              date: "Verified Dossier",
              context:
                "Official portrait of Gbodimowo Isaac. Dual competency across scalable Next.js web architectures, enterprise Cisco IOS topologies, and hardware diagnostic engineering.",
            })
          }
          className="lg:col-span-6 neo-card neo-card-hover rounded-2xl p-4 cursor-pointer flex items-center gap-4"
        >
          <div
            className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border-2"
            style={{ borderColor: "var(--theme-border)" }}
          >
            <Image
              src={isaacPortrait}
              alt="Gbodimowo Isaac"
              priority
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-1 right-1 p-1 rounded-md bg-black/75 text-white">
              <Maximize2 className="w-3 h-3" />
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="text-[10px] font-mono-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                style={{
                  backgroundColor: "var(--theme-surface-alt)",
                  borderColor: "var(--theme-border)",
                }}
              >
                B.Sc. Computer Science
              </span>
              <span className="text-[11px] font-mono-tech" style={{ color: "var(--theme-muted)" }}>
                Lagos, Nigeria
              </span>
            </div>
            <h2 className="text-lg font-display font-bold uppercase tracking-wide">
              Babcock University Graduate
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: effectiveAccent }} />
                CompTIA A+
              </span>
              <span className="inline-flex items-center gap-1">
                <Network className="w-3.5 h-3.5" style={{ color: effectiveAccent }} />
                Cisco CCNA
              </span>
              <span className="inline-flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" style={{ color: effectiveAccent }} />
                Next.js &amp; FastAPI
              </span>
            </div>
          </div>
        </div>

        {/* Three Quantified Telemetry Cards */}
        <div className="lg:col-span-6 grid grid-cols-3 gap-4">
          <div className="neo-card rounded-2xl p-4 flex flex-col justify-between">
            <div className="text-[10px] font-mono-tech uppercase font-bold" style={{ color: "var(--theme-muted)" }}>
              HSRP Failover
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold tabular-nums mt-1">
              &lt;3.0s
            </div>
            <div className="text-[11px] font-mono-tech font-semibold" style={{ color: effectiveAccent }}>
              Preempt Active
            </div>
          </div>

          <div className="neo-card rounded-2xl p-4 flex flex-col justify-between">
            <div className="text-[10px] font-mono-tech uppercase font-bold" style={{ color: "var(--theme-muted)" }}>
              Spatial Index
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold tabular-nums mt-1">
              &lt;45ms
            </div>
            <div className="text-[11px] font-mono-tech font-semibold text-emerald-600">
              Corridor Match
            </div>
          </div>

          <div className="neo-console rounded-2xl p-4 flex flex-col justify-between">
            <div className="text-[10px] font-mono-tech uppercase font-bold opacity-70">
              SSE Stream
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold tabular-nums mt-1">
              &lt;15ms
            </div>
            <div className="text-[11px] font-mono-tech font-semibold text-emerald-400">
              66/66 Tests Pass
            </div>
          </div>
        </div>
      </div>

      <PhotoModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  );
}
