"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer, ShieldCheck, GraduationCap, Briefcase, Network, Cpu } from "lucide-react";

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
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
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
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                  Curriculum Vitae
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  Gbodimowo Isaac — Verified Specification
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                <a
                  href="/Gbodimowo_Isaac_Resume.pdf"
                  target="_blank"
                  download="Gbodimowo_Isaac_Resume.pdf"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-slate-300" />
                  <span>Download PDF</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-white text-slate-900">
              {/* Document Header */}
              <div className="border-b border-slate-200 pb-6">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                  Candidate Profile
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  GBODIMOWO ISAAC
                </h1>
                <div className="text-sm font-medium text-slate-700 mt-1">
                  Software Engineer & Network Systems Specialist
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
                  <span>Lagos, Nigeria</span>
                  <span>•</span>
                  <a href="mailto:isaacgbodimowo@gmail.com" className="text-blue-600 hover:underline">
                    isaacgbodimowo@gmail.com
                  </a>
                  <span>•</span>
                  <span>+234 816 714 8326</span>
                  <span>•</span>
                  <a href="https://github.com/kiinnggss" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    github.com/kiinnggss
                  </a>
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Professional Summary
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Dual-competency engineer bridging full-stack software development with enterprise Cisco network routing and hardware-level diagnostics. Experienced in building responsive TypeScript and Next.js platforms, designing high-availability network topologies (HSRP, Router-on-a-Stick, extended ACLs), and conducting CompTIA A+ certified fault isolation.
                </p>
              </div>

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>Education</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">B.Sc. in Computer Science</div>
                  <div className="text-xs text-slate-600">Babcock University, Nigeria</div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Rigorous curriculum covering data structures, algorithm design, relational database models, operating systems, and computer networks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verified Certifications</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div>• <strong>CompTIA A+ Certified</strong> (Hardware & Diagnostics)</div>
                    <div>• <strong>Cisco CCNA 200-301 Candidate</strong> (Enterprise Routing)</div>
                    <div>• <strong>New Horizons Technical Certification</strong> (Networking)</div>
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Experience
                </h2>
                <div className="space-y-5">
                  <div className="border-l-2 border-slate-200 pl-4 py-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-slate-900">Web Developer Intern</h3>
                      <span className="text-xs text-slate-500">Lagos, Nigeria</span>
                    </div>
                    <div className="text-xs font-semibold text-blue-600">Hoffenheim Tech</div>
                    <ul className="mt-2 space-y-1 text-xs text-slate-700 leading-relaxed list-disc list-inside">
                      <li>Delivered production client web platforms with clean user experience and robust responsive layouts.</li>
                      <li>Engineered backend API integrations, data intake forms, and webhook handlers with Zod schema validation.</li>
                      <li>Collaborated on system maintenance, hardware servicing, and client handover documentation.</li>
                    </ul>
                  </div>

                  <div className="border-l-2 border-slate-200 pl-4 py-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-slate-900">Computer Science & Programming Instructor</h3>
                      <span className="text-xs text-slate-500">Lagos, Nigeria</span>
                    </div>
                    <div className="text-xs font-semibold text-blue-600">Edkints International School</div>
                    <ul className="mt-2 space-y-1 text-xs text-slate-700 leading-relaxed list-disc list-inside">
                      <li>Taught core programming foundations, logic constructs, and Python algorithmic thinking.</li>
                      <li>Guided students in hands-on computer hardware assembly, peripherals setup, and basic troubleshooting.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technical Skills Matrix */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Technical Competencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="font-semibold text-slate-900 mb-1">Networking & Protocols</div>
                    <div className="text-slate-600 leading-relaxed">
                      Cisco IOS, HSRP v2, 802.1Q VLANs, Extended ACLs, NAT/PAT, Subnetting (VLSM), Packet Tracer
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="font-semibold text-slate-900 mb-1">Web Architecture</div>
                    <div className="text-slate-600 leading-relaxed">
                      TypeScript, Next.js, React 19, REST APIs, Tailwind CSS, Node.js, Zod validation
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="font-semibold text-slate-900 mb-1">Systems & Diagnostics</div>
                    <div className="text-slate-600 leading-relaxed">
                      CompTIA A+ fault isolation, Linux Mint/Ubuntu, PostgreSQL, SQLite, Git, Shell scripting
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <span>Verified Candidate Specification • Lagos, Nigeria</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium transition-colors"
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
