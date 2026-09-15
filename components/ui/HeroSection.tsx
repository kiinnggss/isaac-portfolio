"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Status & Verification Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Open for Software & Systems Roles</span>
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-slate-500">
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

      {/* Hero Content Grid */}
      <div className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Bio & Heading */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
            Software Engineer & Network Systems Specialist
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight text-slate-900 leading-[1.02]">
            Gbodimowo Isaac
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
            Engineering resilient digital infrastructure. Bridging full-stack web platforms with enterprise Cisco network routing and hardware-level diagnostics.
          </p>

          <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-2xl">
            Computer Science graduate from Babcock University with practical experience spanning scalable Next.js architectures, Cisco IOS enterprise topologies (HSRP, Router-on-a-Stick, extended ACLs), and CompTIA A+ certified hardware fault isolation.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton
              href="#work"
              className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs sm:text-sm font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <span>View Selected Projects</span>
              <ArrowDown className="w-4 h-4 text-slate-400" />
            </MagneticButton>

            <MagneticButton
              href="/Gbodimowo_Isaac_Resume.pdf"
              target="_blank"
              className="px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Download Resume</span>
            </MagneticButton>

            <a
              href="#terminal"
              className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-medium transition-colors inline-flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-slate-500" />
              <span>Network Terminal</span>
            </a>
          </div>
        </div>

        {/* Right: Portrait Card */}
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
            className="group relative w-full max-w-sm rounded-2xl bg-white border border-slate-200 p-3 shadow-md hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer"
          >
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
              <Image
                src={isaacPortrait}
                alt="Gbodimowo Isaac in dark navy suit and sunglasses"
                priority
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/90 backdrop-blur-xs text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="pt-3 px-1 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Gbodimowo Isaac
                </div>
                <div className="text-xs text-slate-500">
                  B.Sc. Computer Science • CompTIA A+
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                Lagos, NG
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Photo */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  );
}
