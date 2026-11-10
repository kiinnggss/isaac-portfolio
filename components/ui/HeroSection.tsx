"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, Download, ShieldCheck, Network, Cpu, Maximize2 } from "lucide-react";
import MagneticButton from "./MagneticButton";
import PhotoModal, { PhotoDetails } from "./PhotoModal";
import isaacPortrait from "@/public/images/isaac-portrait.jpg";
import { getAssetPath } from "@/lib/paths";

export default function HeroSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDetails | null>(null);

  return (
    <section
      id="overview"
      className="relative min-h-[100dvh] pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Main Split Architecture Hero (Strictly 4 Text Elements on Left) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: 4-Element Hero Stack */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Eyebrow */}
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-orange-600 font-semibold px-3.5 py-1.5 rounded-full bg-white/80 border border-white shadow-xs">
            <span className="w-2 h-2 rounded-full bg-orange-600" />
            <span>Software Engineer & Network Systems Specialist</span>
          </div>

          {/* 2. Headline (2 lines max on desktop) */}
          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-[64px] tracking-tight text-[#090d16] leading-[1.02]">
            Resilient Web Platforms &{" "}
            <span className="text-orange-600">Enterprise Networks.</span>
          </h1>

          {/* 3. Subtext (<= 20 words) */}
          <p className="text-base sm:text-lg text-slate-800 font-normal leading-relaxed max-w-xl">
            Full-stack TypeScript and Next.js engineering paired with fault-tolerant Cisco IOS routing topologies and CompTIA A+ hardware diagnostics.
          </p>

          {/* 4. CTAs (1 Primary + 1 Secondary) */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <MagneticButton
              href="#work"
              className="crystal-button px-7 py-3.5 rounded-full text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2"
            >
              <span>Selected Works</span>
              <ArrowDown className="w-4 h-4 text-orange-400" />
            </MagneticButton>

            <MagneticButton
              href={getAssetPath("/Gbodimowo_Isaac_Resume.pdf")}
              target="_blank"
              className="crystal-button-secondary px-6 py-3.5 rounded-full text-[#090d16] text-xs sm:text-sm font-semibold inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-orange-600" />
              <span>Download Resume</span>
            </MagneticButton>
          </div>
        </div>

        {/* Right Column: Dual-Surface Executive Dossier */}
        <div className="lg:col-span-5 flex flex-col gap-4">
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
            className="group relative crystal-surface crystal-surface-hover rounded-3xl p-4 cursor-pointer"
          >
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src={isaacPortrait}
                  alt="Gbodimowo Isaac in dark formal suit"
                  priority
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-[#090d16]/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3" />
                </div>
              </div>

              <div className="col-span-7 space-y-3 pr-1">
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-orange-600 font-semibold">
                    ARCHITECT DOSSIER
                  </span>
                  <h2 className="text-lg font-display font-bold text-[#090d16] leading-snug">
                    Gbodimowo Isaac
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    B.Sc. Computer Science, Babcock University
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-900/10 text-xs">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>CompTIA A+ Certified Core</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <Network className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>Cisco CCNA 200-301 Track</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <Cpu className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>Full-Stack Web & FastAPI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Obsidian Telemetry Readout Strip */}
          <div className="obsidian-surface rounded-3xl p-5 grid grid-cols-3 gap-4 text-left">
            <div>
              <div className="text-[10px] font-mono-tech uppercase text-slate-400">
                HSRP Failover
              </div>
              <div className="text-2xl font-display font-bold text-white mt-0.5">
                &lt;3.0s
              </div>
              <div className="text-[11px] text-orange-400 font-mono-tech">
                Preempt Active
              </div>
            </div>

            <div className="border-l border-white/10 pl-4">
              <div className="text-[10px] font-mono-tech uppercase text-slate-400">
                Spatial Index
              </div>
              <div className="text-2xl font-display font-bold text-white mt-0.5">
                &lt;45ms
              </div>
              <div className="text-[11px] text-emerald-400 font-mono-tech">
                Corridor Match
              </div>
            </div>

            <div className="border-l border-white/10 pl-4">
              <div className="text-[10px] font-mono-tech uppercase text-slate-400">
                SSE Telemetry
              </div>
              <div className="text-2xl font-display font-bold text-white mt-0.5">
                &lt;15ms
              </div>
              <div className="text-[11px] text-slate-300 font-mono-tech">
                66/66 Tests Pass
              </div>
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
