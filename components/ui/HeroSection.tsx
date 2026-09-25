"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, Download, Terminal, ShieldCheck, Network, Maximize2 } from "lucide-react";
import MagneticButton from "./MagneticButton";
import PhotoModal, { PhotoDetails } from "./PhotoModal";
import isaacPortrait from "@/public/images/isaac-portrait.jpg";

export default function HeroSection() {
  const [lagosTime, setLagosTime] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDetails | null>(null);

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

  return (
    <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Ambient Light Refraction Background Orbs */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-300/25 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-10 w-[450px] h-[450px] bg-indigo-200/30 blur-[110px] rounded-full pointer-events-none -z-10" />

      {/* Floating Crystal Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="crystal-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span>Open for Software & Systems Roles</span>
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Lagos, Nigeria</span>
            <span className="text-slate-300">•</span>
            <span>WAT (UTC+1)</span>
            {lagosTime && (
              <>
                <span className="text-slate-300">•</span>
                <span className="font-mono-tech text-slate-700">{lagosTime}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-600 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            CompTIA A+ Certified
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Network className="w-4 h-4 text-slate-600" />
            CCNA Candidate
          </span>
        </div>
      </div>

      {/* Hero Layout */}
      <div className="py-8 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Typographic Focus */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/60 backdrop-blur-md">
            Software Engineer & Network Systems Specialist
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[80px] tracking-tight text-slate-950 leading-[1.0] select-none">
            Gbodimowo Isaac
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-700 font-normal leading-relaxed max-w-2xl">
            Engineering resilient digital infrastructure. Bridging full-stack web platforms with enterprise Cisco network routing and hardware diagnostics.
          </p>

          <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-2xl">
            Computer Science graduate from Babcock University with dual competency across scalable Next.js architectures, Cisco IOS enterprise topologies (HSRP, Router-on-a-Stick, extended ACLs), and CompTIA A+ verified hardware diagnostics.
          </p>

          {/* Action Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <MagneticButton
              href="#work"
              className="crystal-button px-6 py-3 rounded-full text-white text-xs sm:text-sm font-medium inline-flex items-center gap-2 shadow-[0_12px_24px_-6px_rgba(15,23,42,0.3)]"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4 text-slate-300" />
            </MagneticButton>

            <MagneticButton
              href="/Gbodimowo_Isaac_Resume.pdf"
              target="_blank"
              className="crystal-button-secondary px-5 py-3 rounded-full text-slate-800 text-xs sm:text-sm font-medium inline-flex items-center gap-2 shadow-[0_6px_16px_-4px_rgba(15,23,42,0.06)]"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Download Resume</span>
            </MagneticButton>

            <a
              href="#terminal"
              className="crystal-pill px-4 py-3 rounded-full text-slate-700 hover:text-slate-950 text-xs font-medium inline-flex items-center gap-2 transition-all shadow-[0_4px_12px_rgba(15,23,42,0.04)]"
            >
              <Terminal className="w-4 h-4 text-slate-500" />
              <span>Interactive CLI</span>
            </a>
          </div>
        </div>

        {/* Right Column: Floating Crystal Portrait */}
        <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
          <div
            onClick={() =>
              setSelectedPhoto({
                src: isaacPortrait,
                alt: "Gbodimowo Isaac in navy suit and sunglasses",
                title: "Gbodimowo Isaac",
                subtitle: "Software Engineer & Network Systems Specialist",
                tag: "PORTRAIT",
                location: "Lagos, Nigeria",
                date: "Verified Spec",
                context:
                  "Official portrait of Gbodimowo Isaac. Dual expertise across scalable Next.js web architectures, enterprise Cisco IOS topologies, and hardware diagnostic engineering.",
              })
            }
            className="group relative w-full max-w-sm crystal-surface rounded-3xl p-3.5 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.12),0_0_1px_1px_rgba(255,255,255,0.9)] cursor-pointer hover:shadow-[0_32px_64px_-16px_rgba(37,99,235,0.15)] transition-all duration-500"
          >
            {/* Luminous Specular Refraction Catchlight */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-100/60 shadow-inner">
              <Image
                src={isaacPortrait}
                alt="Gbodimowo Isaac in navy suit and sunglasses"
                priority
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute top-3 right-3 p-2 rounded-full crystal-pill text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="pt-3.5 px-1.5 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900 font-display">
                  Gbodimowo Isaac
                </div>
                <div className="text-xs text-slate-500">
                  B.Sc. Computer Science • CompTIA A+
                </div>
              </div>
              <span className="crystal-pill text-[11px] font-medium text-slate-700 px-3 py-1 rounded-full">
                Lagos, NG
              </span>
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
