"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Terminal, Network, ShieldCheck, Cpu, ChevronRight, Activity } from "lucide-react";
import MagneticButton from "./MagneticButton";

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
      <div className="my-auto py-10 sm:py-16">
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
        <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[108px] leading-[0.92] tracking-tight uppercase select-none">
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
          className="mt-8 max-w-3xl"
        >
          <p className="text-lg sm:text-2xl font-light leading-relaxed text-neutral-300 font-sans">
            Architecting <span className="text-white font-medium">resilient digital infrastructure</span> — bridging scalable web engineering with enterprise networking and systems diagnostics.
          </p>
          <p className="mt-3 text-xs sm:text-sm font-mono-tech text-neutral-400 leading-relaxed">
            Engineered full-stack mobility platforms, Cisco enterprise topologies (Router-on-a-Stick, HSRP, ACLs), and hardware-level diagnostics.
          </p>
        </motion.div>

        {/* Action Buttons & Interactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#work"
            className="px-7 py-3.5 rounded-full bg-[#bfff04] text-black font-semibold text-sm tracking-tight uppercase hover:bg-[#d0ff36] hover:shadow-[0_0_30px_rgba(191,255,4,0.35)] transition-all flex items-center gap-2.5 active:scale-95"
          >
            <span>Explore Projects</span>
            <ArrowDown className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            href="/Gbodimowo_Isaac_Resume.pdf"
            target="_blank"
            className="px-6 py-3.5 rounded-full bg-neutral-900 border border-white/15 text-white text-sm font-medium hover:bg-neutral-800 hover:border-white/30 transition-all flex items-center gap-2.5 shadow-sm active:scale-95"
          >
            <Download className="w-4 h-4 text-[#00f0ff]" />
            <span>Download Resume</span>
          </MagneticButton>

          <a
            href="#terminal"
            className="group px-5 py-3.5 rounded-full bg-neutral-950 border border-neutral-800 hover:border-[#00f0ff]/50 text-neutral-400 hover:text-white transition-all flex items-center gap-2 text-xs font-mono-tech"
          >
            <Terminal className="w-4 h-4 text-[#00f0ff] group-hover:rotate-12 transition-transform" />
            <span>Interactive CLI</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </a>
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
    </section>
  );
}
