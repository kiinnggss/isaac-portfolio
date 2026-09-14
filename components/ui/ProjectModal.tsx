"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Shield,
  Network,
  Cpu,
  ArrowUpRight,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  Globe,
  Code2,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  tags: string[];
  metrics: { label: string; value: string; detail: string }[];
  topology: string[];
  protocols: string[];
  cliSnippet?: string;
  highlights: string[];
  codeLink?: string;
  demoLink?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "cli">("overview");
  const [copied, setCopied] = useState(false);

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

  if (!project) return null;

  const handleCopyCli = () => {
    if (project.cliSnippet) {
      navigator.clipboard.writeText(project.cliSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-all"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-neutral-950 border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-white/10 bg-neutral-900/40 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-tech uppercase bg-[#bfff04]/10 text-[#bfff04] border border-[#bfff04]/30">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono-tech text-neutral-400">
                    ID: {project.id}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-400">{project.subtitle}</p>
              </div>

              <div className="flex items-center gap-2">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target={project.demoLink.startsWith("#") ? "_self" : "_blank"}
                    rel="noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#bfff04] text-black text-xs font-mono-tech font-bold uppercase hover:bg-[#d0ff36] transition-all shadow-md"
                  >
                    <span>Launch Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 px-6 sm:px-8 bg-neutral-950/50">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`py-3 px-4 text-xs font-mono-tech border-b-2 transition-colors ${
                  activeTab === "overview"
                    ? "border-[#bfff04] text-[#bfff04]"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                Systems Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("architecture")}
                className={`py-3 px-4 text-xs font-mono-tech border-b-2 transition-colors ${
                  activeTab === "architecture"
                    ? "border-[#00f0ff] text-[#00f0ff]"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                Network & Protocols
              </button>
              {project.cliSnippet && (
                <button
                  type="button"
                  onClick={() => setActiveTab("cli")}
                  className={`py-3 px-4 text-xs font-mono-tech border-b-2 transition-colors ${
                    activeTab === "cli"
                      ? "border-[#bfff04] text-[#bfff04]"
                      : "border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  CLI Config / Payload
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Direct Action Banner to Open the Project */}
                  {(project.demoLink || project.codeLink) && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-neutral-900/90 via-neutral-900/50 to-neutral-950 border border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-mono-tech text-[#bfff04] uppercase font-semibold">
                          Direct Access & Deployment
                        </div>
                        <div className="text-xs text-neutral-300 mt-0.5">
                          {project.demoLink ? "Live project is deployed and accessible." : "Repository source code available."}
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target={project.demoLink.startsWith("#") ? "_self" : "_blank"}
                            rel="noreferrer"
                            className="px-4 py-2 rounded-lg bg-[#bfff04] text-black font-semibold text-xs tracking-tight uppercase hover:bg-[#c9ff26] flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                          >
                            <span>Open Live Project</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.codeLink && (
                          <a
                            href={project.codeLink}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white font-mono-tech text-xs hover:bg-neutral-700 flex items-center gap-1.5 transition-all"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-mono-tech text-neutral-500 mb-2">
                      Abstract & Engineering Scope
                    </h4>
                    <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Key Metrics Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 flex flex-col justify-between"
                      >
                        <div className="text-[11px] font-mono-tech text-neutral-400 uppercase">
                          {m.label}
                        </div>
                        <div className="text-xl sm:text-2xl font-bold font-display text-[#bfff04] my-1">
                          {m.value}
                        </div>
                        <div className="text-[11px] text-neutral-400">{m.detail}</div>
                      </div>
                    ))}
                  </div>

                  {/* Implementation Highlights */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-mono-tech text-neutral-500 mb-3">
                      Architectural Highlights
                    </h4>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {project.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/30 border border-white/5 text-xs sm:text-sm text-neutral-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#bfff04] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-mono-tech text-neutral-500 mb-2">
                      Verified Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-md text-xs font-mono-tech bg-neutral-900 text-neutral-300 border border-neutral-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "architecture" && (
                <div className="space-y-6">
                  {/* Topology Hierarchy */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-mono-tech text-[#00f0ff] mb-3 flex items-center gap-2">
                      <Network className="w-4 h-4" /> Topology Design & Segmentation
                    </h4>
                    <div className="space-y-2">
                      {project.topology.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-neutral-900/70 border border-white/10 flex items-start gap-3 text-xs sm:text-sm text-neutral-300 font-mono-tech"
                        >
                          <span className="w-5 h-5 rounded-full bg-neutral-800 text-[#00f0ff] text-xs flex items-center justify-center font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Protocol Specification */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-mono-tech text-neutral-500 mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#bfff04]" /> Protocols & Security Controls
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {project.protocols.map((proto, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-neutral-900/40 border border-neutral-800 text-xs font-mono-tech text-neutral-300 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#bfff04]" />
                          {proto}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "cli" && project.cliSnippet && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-tech text-neutral-400 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#bfff04]" />
                      Cisco IOS CLI Snippet / Architecture Spec
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCli}
                      className="px-3 py-1 rounded-md text-xs font-mono-tech bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#bfff04]" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Code
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-black border border-neutral-800 text-xs font-mono-tech text-emerald-400 overflow-x-auto leading-relaxed selection:bg-emerald-500 selection:text-black">
                    <code>{project.cliSnippet}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-white/10 bg-neutral-900/40 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono-tech text-neutral-500">
                Verified Production Spec • Gbodimowo Isaac
              </span>
              <div className="flex items-center gap-3">
                {project.codeLink && (
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono-tech flex items-center gap-1.5 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target={project.demoLink.startsWith("#") ? "_self" : "_blank"}
                    rel="noreferrer"
                    className="px-5 py-2 rounded-lg bg-[#bfff04] text-black text-xs font-semibold tracking-tight uppercase hover:bg-[#c9ff26] flex items-center gap-1.5 shadow-lg transition-all"
                  >
                    <span>Launch Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-neutral-900 text-neutral-300 text-xs font-medium hover:bg-neutral-800"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
