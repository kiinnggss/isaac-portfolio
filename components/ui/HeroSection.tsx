"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Download, Terminal, Network, ShieldCheck, Cpu, ChevronRight, Activity, Maximize2 } from "lucide-react";
import MagneticButton from "./MagneticButton";
import PhotoModal, { PhotoDetails } from "./PhotoModal";
import isaacPortrait from "@/public/images/isaac-portrait.jpg";

export default function HeroSection() {
  const [lagosTime, setLagosTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Lagos is West Africa Time (WAT, UTC+1)
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

  const heroHeadline = "GBODIMOWO ISAAC";

  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDetails | null>(null);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambience & Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#bfff04]/10 via-[#00f0ff]/8 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-12 -right-20 w-96 h-96 bg-[#00f0ff]/5 blur-[100px] pointer-events-none -z-10" />

      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-8 border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-2.5"
        >
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-[#bfff04]/30 shadow-[0_0_15px_rgba(191,255,4,0.12)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bfff04] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#bfff04]"></span>
            </span>
            <span className="text-xs font-mono-tech text-white font-medium">
              Open for Software & Systems Roles
            </span>
          </div>

          {/* Location Badge */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/60 border border-neutral-800 text-xs font-mono-tech text-neutral-400">
            <span className="text-neutral-200">Lagos, Nigeria</span>
            <span className="text-neutral-600">|</span>
            <span className="text-[#00f0ff] font-medium">UTC+1</span>
            {lagosTime && (
              <>
                <span className="text-neutral-600">|</span>
                <span className="text-neutral-300 font-mono-tech">{lagosTime} WAT</span>
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-4 text-xs font-mono-tech text-neutral-400"
        >
          <span className="flex items-center gap-1.5 text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-[#bfff04]" />
            CompTIA A+ Certified
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-neutral-300">
            <Network className="w-4 h-4 text-[#00f0ff]" />
            CCNA Candidate
          </span>
        </motion.div>
      </div>

      {/* Main Editorial Hero Display */}
      <div className="my-auto py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Typography, Tagline & CTAs */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
          {/* Role Pill Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 text-xs md:text-sm font-mono-tech uppercase tracking-widest text-[#bfff04]"
          >
            <span className="w-6 h-[1px] bg-[#bfff04]" />
            Software Engineer & Network Systems Specialist
          </motion.div>

          {/* Massive Editorial Name */}
          <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[92px] leading-[0.92] tracking-tight uppercase select-none">
            <div className="flex flex-wrap overflow-hidden py-1">
              {heroHeadline.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-flex mr-4 sm:mr-6">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={{ y: 120, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.15 + (wordIndex * 6 + charIndex) * 0.03,
                        ease: [0.215, 0.61, 0.355, 1],
                      }}
                      className={`inline-block ${
                        wordIndex === 0 ? "text-white hover:text-[#bfff04]" : "text-neutral-400 hover:text-white"
                      } transition-colors duration-200`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </div>
          </h1>

          {/* Hero Editorial Subtitle & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 max-w-2xl"
          >
            <p className="text-base sm:text-xl font-light leading-relaxed text-neutral-300 font-sans">
              Architecting <span className="text-white font-medium">resilient digital infrastructure</span>, bridging scalable web engineering with enterprise networking and systems diagnostics.
            </p>
            <p className="mt-2.5 text-xs sm:text-sm font-mono-tech text-neutral-400 leading-relaxed">
              Engineered full-stack mobility platforms, Cisco enterprise topologies (Router-on-a-Stick, HSRP, ACLs), and hardware-level diagnostics.
            </p>
          </motion.div>

          {/* Action Buttons & Interactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#work"
              className="px-6 py-3 rounded-full bg-[#bfff04] text-black font-semibold text-xs sm:text-sm tracking-tight uppercase hover:bg-[#d0ff36] hover:shadow-[0_0_30px_rgba(191,255,4,0.35)] transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              href="/Gbodimowo_Isaac_Resume.pdf"
              target="_blank"
              className="px-5 py-3 rounded-full bg-neutral-900 border border-white/15 text-white text-xs sm:text-sm font-medium hover:bg-neutral-800 hover:border-white/30 transition-all flex items-center gap-2 shadow-sm active:scale-95"
            >
              <Download className="w-4 h-4 text-[#00f0ff]" />
              <span>Download Resume</span>
            </MagneticButton>

            <a
              href="#terminal"
              className="group px-4 py-3 rounded-full bg-neutral-950 border border-neutral-800 hover:border-[#00f0ff]/50 text-neutral-400 hover:text-white transition-all flex items-center gap-2 text-xs font-mono-tech"
            >
              <Terminal className="w-4 h-4 text-[#00f0ff] group-hover:rotate-12 transition-transform" />
              <span>Interactive CLI</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Featured Editorial Portrait of Isaac */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end"
        >
          <div
            onClick={() =>
              setSelectedPhoto({
                src: isaacPortrait,
                alt: "Gbodimowo Isaac in dark formal suit and sunglasses",
                title: "Gbodimowo Isaac",
                subtitle: "Software Engineer & Network Systems Specialist",
                tag: "OFFICIAL PORTRAIT",
                location: "Lagos, Nigeria",
                date: "Verified Spec",
                context:
                  "Official portrait of Gbodimowo Isaac. Dual expertise across scalable Next.js web architectures, enterprise Cisco IOS topologies, and hardware diagnostic engineering.",
              })
            }
            className="group relative w-full max-w-sm rounded-2xl bg-neutral-900/60 border border-white/15 p-3 sm:p-3.5 shadow-2xl backdrop-blur-md cursor-pointer hover:border-[#bfff04]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(191,255,4,0.15)]"
          >
            {/* Ambient Background Aura */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#bfff04]/20 via-[#00f0ff]/15 to-transparent rounded-2xl blur-xl opacity-40 group-hover:opacity-100 transition duration-700 pointer-events-none" />

            {/* Top Meta Bar */}
            <div className="relative flex items-center justify-between pb-2.5 px-1 text-[11px] font-mono-tech text-neutral-400">
              <span className="flex items-center gap-1.5 text-white font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#bfff04] animate-pulse" />
                SYSTEM.ID // ISAAC-01
              </span>
              <span className="text-neutral-500 group-hover:text-[#bfff04] transition-colors flex items-center gap-1">
                <span>Inspect</span>
                <Maximize2 className="w-3 h-3" />
              </span>
            </div>

            {/* Framed Image Container */}
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-950 border border-white/10">
              <Image
                src={isaacPortrait}
                alt="Gbodimowo Isaac in dark navy suit and sunglasses"
                priority
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

              {/* Technical Corner Marking */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono-tech text-[#bfff04]">
                AUTHENTIC
              </div>

              {/* Bottom Information Card Overlay */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 p-3 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white font-display uppercase tracking-wider">
                    Gbodimowo Isaac
                  </div>
                  <div className="text-[10px] font-mono-tech text-[#bfff04]">
                    Software & Systems Specialist
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech text-neutral-300 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                  Lagos, NG
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Technical Telemetry Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.8 }}
        className="pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6 text-neutral-400"
      >
        <div className="space-y-1">
          <div className="text-[11px] font-mono-tech text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#bfff04]" /> Core Software
          </div>
          <div className="text-sm font-semibold text-white">Next.js / TypeScript</div>
          <div className="text-xs text-neutral-400">React 19, Python, PostgreSQL</div>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] font-mono-tech text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5 text-[#00f0ff]" /> Systems & Network
          </div>
          <div className="text-sm font-semibold text-white">Cisco IOS & Packet Tracer</div>
          <div className="text-xs text-neutral-400">VLANs, HSRP, NAT, ACLs</div>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] font-mono-tech text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#bfff04]" /> Hardware Integrity
          </div>
          <div className="text-sm font-semibold text-white">CompTIA A+ Diagnostics</div>
          <div className="text-xs text-neutral-400">Motherboards, PSU, Linux/Unix</div>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] font-mono-tech text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#00f0ff]" /> Academia
          </div>
          <div className="text-sm font-semibold text-white">Babcock University</div>
          <div className="text-xs text-neutral-400">B.Sc. Computer Science</div>
        </div>
      </motion.div>

      {/* Full Resolution Photo Lightbox Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  );
}
