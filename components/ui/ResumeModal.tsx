"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer, ExternalLink, ShieldCheck, GraduationCap, Briefcase, Network, Cpu } from "lucide-react";
import { sound } from "@/lib/sound";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      sound.playChime();
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-950 border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Toolbar */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-neutral-900/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-neutral-800 text-[#bfff04] font-mono-tech text-xs uppercase font-semibold">
                  Curriculum Vitae
                </span>
                <span className="text-xs font-mono-tech text-neutral-400 hidden sm:inline">
                  Gbodimowo Isaac • Verified Production Spec
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono-tech transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <a
                  href="/Gbodimowo_Isaac_Resume.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#bfff04] text-black font-semibold text-xs font-mono-tech uppercase hover:bg-[#c9ff26] transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors ml-1"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Resume Content Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans text-neutral-300">
              {/* Profile Header */}
              <div className="border-b border-white/10 pb-6">
                <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight uppercase">
                  Gbodimowo Isaac
                </h2>
                <div className="text-sm sm:text-base text-[#bfff04] font-mono-tech mt-1">
                  Software Engineer & Network Systems Specialist
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-mono-tech text-neutral-400">
                  <span>Lagos, Nigeria</span>
                  <span>•</span>
                  <span>isaacgbodimowo@gmail.com</span>
                  <span>•</span>
                  <a
                    href="https://kiinnggss.github.io/isaac-portfolio/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00f0ff] hover:underline"
                  >
                    kiinnggss.github.io/isaac-portfolio
                  </a>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#bfff04] mb-2.5">
                  Professional Summary
                </h3>
                <p className="text-sm leading-relaxed text-neutral-300">
                  Software Engineer with dual expertise in scalable web architectures and enterprise network systems.
                  Proven track record engineering Next.js platforms, multi-VLAN Cisco Packet Tracer topologies,
                  HSRP gateway redundancy, static and dynamic NAT translation, and CompTIA A+ systems diagnostics.
                </p>
              </div>

              {/* Education & Credentials */}
              <div>
                <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#00f0ff] mb-3">
                  Education & Credentials
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/5">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <GraduationCap className="w-4 h-4 text-[#bfff04]" />
                      <span>B.Sc. in Computer Science</span>
                    </div>
                    <div className="text-neutral-400 mt-1 font-mono-tech">
                      Babcock University (Ogun / Lagos, Nigeria)
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/5">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <ShieldCheck className="w-4 h-4 text-[#bfff04]" />
                      <span>CompTIA A+ Certified</span>
                    </div>
                    <div className="text-neutral-400 mt-1 font-mono-tech">
                      Hardware & Systems Diagnostics Core
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/5">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <Cpu className="w-4 h-4 text-[#00f0ff]" />
                      <span>New Horizons Technical Certification</span>
                    </div>
                    <div className="text-neutral-400 mt-1 font-mono-tech">
                      Systems & Networking Program
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/5">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <Network className="w-4 h-4 text-amber-400" />
                      <span>Cisco CCNA 200-301</span>
                    </div>
                    <div className="text-neutral-400 mt-1 font-mono-tech">
                      Enterprise Networking Candidate
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Matrix */}
              <div>
                <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#bfff04] mb-3">
                  Technical Inventory
                </h3>
                <div className="space-y-2 text-xs font-mono-tech">
                  <div className="p-2.5 rounded-lg bg-neutral-900/40 border border-white/5 flex flex-wrap gap-2">
                    <span className="text-[#00f0ff] font-semibold w-28 shrink-0">Networking:</span>
                    <span className="text-neutral-300">
                      Cisco IOS CLI, VLANs & 802.1Q Trunking, HSRP v2, NAT/PAT, Extended ACLs, VLSM Subnetting, Packet Tracer
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900/40 border border-white/5 flex flex-wrap gap-2">
                    <span className="text-[#bfff04] font-semibold w-28 shrink-0">Software:</span>
                    <span className="text-neutral-300">
                      Next.js 16, React 19, TypeScript, Python, REST APIs, Tailwind CSS, PostgreSQL, SQLite
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900/40 border border-white/5 flex flex-wrap gap-2">
                    <span className="text-neutral-400 font-semibold w-28 shrink-0">Hardware & Tools:</span>
                    <span className="text-neutral-300">
                      CompTIA A+ fault isolation, custom PC assembly, Linux/Unix shell, Git/GitHub, Figma
                    </span>
                  </div>
                </div>
              </div>

              {/* Experience History */}
              <div>
                <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#00f0ff] mb-3">
                  Experience & Tenures
                </h3>
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-bold text-white">
                        Web Developer Intern • Hoffenheim Tech
                      </span>
                      <span className="text-neutral-400 font-mono-tech">Lagos, Nigeria</span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed">
                      Delivered production client portals and administrative web tools. Engineered API integrations, dynamic form submission pipelines with input sanitization, and authored system handover documentation.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-bold text-white">
                        Computer Science & Programming Instructor • Edkints International School
                      </span>
                      <span className="text-neutral-400 font-mono-tech">Lagos, Nigeria</span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed">
                      Taught foundational software engineering concepts, Python programming, and computational logic. Mentored students on hardware maintenance and code debugging.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
