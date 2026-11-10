"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Network,
  Copy,
  Check,
  ExternalLink,
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
            className="fixed inset-0 bg-[#090d16]/75 backdrop-blur-sm transition-all"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-7 border-b border-slate-800 bg-[#090d16] text-white flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono-tech font-semibold uppercase tracking-wider bg-[#ea580c]/15 text-[#fb923c] border border-[#ea580c]/30">
                    {project.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono-tech">
                    ID: {project.id}
                  </span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-300">{project.subtitle}</p>
              </div>

              <div className="flex items-center gap-2">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target={project.demoLink.startsWith("#") ? "_self" : "_blank"}
                    rel="noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#ea580c] text-white text-xs font-semibold hover:bg-[#c2410c] transition-colors shadow-xs"
                  >
                    <span>Launch Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 px-6 sm:px-8 bg-slate-50">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === "overview"
                    ? "border-[#ea580c] text-[#090d16]"
                    : "border-transparent text-slate-500 hover:text-[#090d16]"
                }`}
              >
                Systems Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("architecture")}
                className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === "architecture"
                    ? "border-[#ea580c] text-[#090d16]"
                    : "border-transparent text-slate-500 hover:text-[#090d16]"
                }`}
              >
                Network & Protocols
              </button>
              {project.cliSnippet && (
                <button
                  type="button"
                  onClick={() => setActiveTab("cli")}
                  className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
                    activeTab === "cli"
                      ? "border-[#ea580c] text-[#090d16]"
                      : "border-transparent text-slate-500 hover:text-[#090d16]"
                  }`}
                >
                  CLI Config / Snippet
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Direct Action Banner */}
                  {(project.demoLink || project.codeLink) && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-[#090d16]">
                          Deployment & Repository Access
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5">
                          {project.demoLink
                            ? "Production application is active."
                            : "Repository source code available."}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target={project.demoLink.startsWith("#") ? "_self" : "_blank"}
                            rel="noreferrer"
                            className="px-4 py-2 rounded-lg bg-[#090d16] text-white font-semibold text-xs hover:bg-[#ea580c] transition-colors inline-flex items-center gap-1.5 shadow-xs"
                          >
                            <span>Open Project</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.codeLink && (
                          <a
                            href={project.codeLink}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-[#090d16] text-xs font-semibold hover:border-[#090d16] inline-flex items-center gap-1.5 transition-colors"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-mono-tech font-semibold text-slate-500 mb-2">
                      Engineering Scope
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Key Metrics Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#090d16] text-white border border-slate-800"
                      >
                        <div className="text-[11px] font-mono-tech text-slate-400 uppercase tracking-wider">
                          {m.label}
                        </div>
                        <div className="text-xl font-display font-bold text-white mt-1 tabular-nums">
                          {m.value}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {m.detail}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Key Engineering Highlights */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-mono-tech font-semibold text-slate-500 mb-3">
                      Core Implementation Highlights
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-700 leading-relaxed">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "architecture" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-mono-tech font-semibold text-slate-500 mb-3">
                      Network Topology & Component Hierarchy
                    </h4>
                    <div className="space-y-2.5">
                      {project.topology.map((topo, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3"
                        >
                          <Network className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                          <div className="text-xs text-slate-800 leading-relaxed font-medium">
                            {topo}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-mono-tech font-semibold text-slate-500 mb-3">
                      Protocols & Standards Implemented
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.protocols.map((proto, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-md text-xs font-mono-tech bg-[#090d16] text-slate-200 border border-slate-800"
                        >
                          {proto}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "cli" && project.cliSnippet && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono-tech text-slate-600">
                      Configuration syntax for Cisco IOS / Platform
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCli}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-semibold text-[#090d16] inline-flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-600" />
                          <span>Copy Config</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 text-slate-100 font-mono-tech text-xs overflow-x-auto leading-relaxed">
                    <pre>{project.cliSnippet}</pre>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-mono-tech text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-[#090d16] text-white hover:bg-[#ea580c] text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
