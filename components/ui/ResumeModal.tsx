"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer, ShieldCheck, GraduationCap } from "lucide-react";
import { getAssetPath } from "@/lib/paths";

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

  const handlePrint = () => {
    window.print();
  };

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
            className="absolute inset-0 bg-[#090d16]/75 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Toolbar */}
            <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#090d16] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-[#ea580c]/15 text-[#fb923c] border border-[#ea580c]/30 text-[11px] font-mono-tech font-semibold uppercase tracking-wider">
                  Curriculum Vitae
                </span>
                <span className="text-xs text-slate-300 hidden sm:inline font-mono-tech">
                  Gbodimowo Isaac / Verified Specification
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                <a
                  href={getAssetPath("/Gbodimowo_Isaac_Resume.pdf")}
                  target="_blank"
                  download="Gbodimowo_Isaac_Resume.pdf"
                  className="px-3.5 py-1.5 rounded-lg bg-[#ea580c] text-white hover:bg-[#c2410c] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-white text-[#090d16]">
              {/* Document Header */}
              <div className="border-b border-slate-200 pb-6">
                <div className="text-[11px] font-mono-tech font-semibold text-[#ea580c] uppercase tracking-wider mb-1">
                  Candidate Profile
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#090d16]">
                  GBODIMOWO ISAAC
                </h1>
                <div className="text-sm font-semibold text-slate-700 mt-1">
                  Software Engineer & Network Systems Specialist
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono-tech text-slate-500 mt-2.5">
                  <span>Lagos, Nigeria</span>
                  <span>/</span>
                  <a
                    href="mailto:isaacgbodimowo@gmail.com"
                    className="text-[#ea580c] hover:underline"
                  >
                    isaacgbodimowo@gmail.com
                  </a>
                  <span>/</span>
                  <span>+234 816 714 8326</span>
                  <span>/</span>
                  <a
                    href="https://github.com/kiinnggss"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#ea580c] hover:underline"
                  >
                    github.com/kiinnggss
                  </a>
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Professional Summary
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Dual-competency engineer bridging full-stack software development with enterprise Cisco network routing and hardware-level diagnostics. Experienced in building responsive TypeScript and Next.js platforms, designing high-availability network topologies (HSRP, Router-on-a-Stick, extended ACLs), and conducting CompTIA A+ certified fault isolation.
                </p>
              </div>

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#090d16] mb-2">
                    <GraduationCap className="w-4 h-4 text-[#ea580c]" />
                    <span>Education</span>
                  </div>
                  <div className="text-sm font-bold text-[#090d16]">
                    B.Sc. in Computer Science
                  </div>
                  <div className="text-xs text-slate-600">Babcock University, Nigeria</div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Rigorous curriculum covering data structures, algorithm design, relational database models, operating systems, and computer networks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#090d16] mb-2">
                    <ShieldCheck className="w-4 h-4 text-[#ea580c]" />
                    <span>Verified Certifications</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div>
                      <strong>CompTIA A+ Certified</strong> (Hardware & Diagnostics)
                    </div>
                    <div>
                      <strong>Cisco CCNA 200-301 Candidate</strong> (Enterprise Routing)
                    </div>
                    <div>
                      <strong>New Horizons Technical Certification</strong> (Networking)
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div>
                <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Experience
                </h2>
                <div className="space-y-5">
                  <div className="border-l-2 border-[#ea580c] pl-4 py-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-[#090d16]">Web Developer Intern</h3>
                      <span className="text-xs font-mono-tech text-slate-500">Lagos, Nigeria</span>
                    </div>
                    <div className="text-xs font-semibold text-[#ea580c]">Hoffenheim Tech</div>
                    <ul className="mt-2 space-y-1 text-xs text-slate-700 leading-relaxed list-disc list-inside">
                      <li>Delivered production client web platforms with clean user experience and robust responsive layouts.</li>
                      <li>Engineered backend API integrations, data intake forms, and webhook handlers with Zod schema validation.</li>
                      <li>Collaborated on system maintenance, hardware servicing, and client handover documentation.</li>
                    </ul>
                  </div>

                  <div className="border-l-2 border-slate-300 pl-4 py-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-[#090d16]">
                        Computer Science & Programming Instructor
                      </h3>
                      <span className="text-xs font-mono-tech text-slate-500">Lagos, Nigeria</span>
                    </div>
                    <div className="text-xs font-semibold text-[#ea580c]">
                      Edkints International School
                    </div>
                    <ul className="mt-2 space-y-1 text-xs text-slate-700 leading-relaxed list-disc list-inside">
                      <li>Taught core programming foundations, logic constructs, and Python algorithmic thinking.</li>
                      <li>Guided students in hands-on computer hardware assembly, peripherals setup, and basic troubleshooting.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Featured Systems & Projects */}
              <div>
                <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Featured Systems & Architecture
                </h2>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-[#090d16]">
                        Crystal: Mobile Video Downloader & Media Vault
                      </h3>
                      <span className="text-xs font-mono-tech text-[#ea580c] font-semibold">
                        FastAPI / React 19 / yt-dlp / SSE / HTTP 206
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      Mobile-first video stream inspector and downloader with translucent crystal glassmorphism. Uses background worker threads, sub-50ms SSE live transfer telemetry (speed, ETA, byte counters), seekable HTTP 206 byte-range media streaming, and a PIN-secured private vault.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-[#090d16]">
                        Google Antigravity Mobile Controller & Voice Assistant
                      </h3>
                      <span className="text-xs font-mono-tech text-[#ea580c] font-semibold">
                        FastAPI / PWA / Web Speech / SSE
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      Mobile Progressive Web App and streaming supervisor driving host CLI agents over Cloudflare HTTPS tunnels. Includes real-time speech dictation and synthesis, an async subprocess runner with pipe deadlock mitigation, and a live slide-up terminal drawer.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-[#090d16]">
                        CAR PULL: Distributed Transit & Carpooling
                      </h3>
                      <span className="text-xs font-mono-tech text-[#ea580c] font-semibold">
                        Next.js / TypeScript / Geospatial
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      High-congestion ridesharing platform matching commuters across arterial Lagos corridors with sub-45ms spatial polygon indexing, route-split pricing, and dark-mode mobile cockpit.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-[#090d16]">
                        Enterprise Cisco Network & Defense Topology
                      </h3>
                      <span className="text-xs font-mono-tech text-[#ea580c] font-semibold">
                        Cisco IOS / HSRP v2 / 802.1Q / ACLs
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      Multi-VLAN fault-tolerant infrastructure simulated in Cisco Packet Tracer with Router-on-a-Stick, sub-3s HSRP gateway failover, dynamic NAT overload (PAT), and port security.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Skills Matrix */}
              <div>
                <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Technical Competencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="font-semibold text-[#090d16] mb-1">Networking & Protocols</div>
                    <div className="text-slate-600 leading-relaxed">
                      Cisco IOS, HSRP v2, 802.1Q VLANs, Extended ACLs, NAT/PAT, Subnetting (VLSM), Packet Tracer
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="font-semibold text-[#090d16] mb-1">Web Architecture</div>
                    <div className="text-slate-600 leading-relaxed">
                      TypeScript, Next.js, React 19, FastAPI, REST APIs, SSE, Tailwind CSS, Node.js
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="font-semibold text-[#090d16] mb-1">Systems & Diagnostics</div>
                    <div className="text-slate-600 leading-relaxed">
                      CompTIA A+ fault isolation, Linux Mint/Ubuntu, Async Subprocesses, PostgreSQL, SQLite, Git, Shell scripting
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono-tech">Verified Candidate Specification / Lagos, Nigeria</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-[#090d16] text-white hover:bg-[#ea580c] font-semibold transition-colors"
              >
                Close Document
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
