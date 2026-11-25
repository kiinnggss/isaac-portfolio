"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Network,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import ProjectPreview from "./ProjectPreview";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!project || !mounted) return null;

  const handleCopyCli = () => {
    if (project.cliSnippet) {
      navigator.clipboard.writeText(project.cliSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return createPortal(
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
            className="relative w-full max-w-4xl neo-card rounded-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div
              className="p-6 sm:p-7 border-b-2 neo-console border-x-0 border-t-0 flex items-start justify-between gap-4"
              style={{ borderColor: "var(--theme-border)" }}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 mb-2">
                  <span
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-mono-tech font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: "var(--theme-accent)",
                      color: "var(--theme-accent-text)",
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="text-xs opacity-65 font-mono-tech">
                    ID: {project.id}
                  </span>
                </div>
                <h3 className="text-2xl font-display font-extrabold uppercase tracking-wide">
                  {project.title}
                </h3>
                <p className="text-sm opacity-80">{project.subtitle}</p>
              </div>

              <div className="flex items-center gap-2">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target={project.demoLink.startsWith("#") ? "_self" : "_blank"}
                    rel="noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg neo-btn-primary text-xs font-bold"
                  >
                    <span>Launch Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/10 border border-white/15 hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div
              className="flex border-b-2 px-6 sm:px-8"
              style={{
                borderColor: "var(--theme-border)",
                backgroundColor: "var(--theme-surface-alt)",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className="py-3.5 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer"
                style={{
                  borderColor: activeTab === "overview" ? "var(--theme-accent)" : "transparent",
                  color: activeTab === "overview" ? "var(--theme-ink)" : "var(--theme-muted)",
                }}
              >
                Systems Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("architecture")}
                className="py-3.5 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer"
                style={{
                  borderColor: activeTab === "architecture" ? "var(--theme-accent)" : "transparent",
                  color: activeTab === "architecture" ? "var(--theme-ink)" : "var(--theme-muted)",
                }}
              >
                Network &amp; Protocols
              </button>
              {project.cliSnippet && (
                <button
                  type="button"
                  onClick={() => setActiveTab("cli")}
                  className="py-3.5 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer"
                  style={{
                    borderColor: activeTab === "cli" ? "var(--theme-accent)" : "transparent",
                    color: activeTab === "cli" ? "var(--theme-ink)" : "var(--theme-muted)",
                  }}
                >
                  CLI Config / Snippet
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div
              className="p-6 sm:p-8 overflow-y-auto space-y-6"
              style={{ backgroundColor: "var(--theme-surface)", color: "var(--theme-ink)" }}
            >
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Compact Visual Preview */}
                  <ProjectPreview project={project} compact />

                  {/* Direct Action Banner */}
                  {(project.demoLink || project.codeLink) && (
                    <div
                      className="p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3"
                      style={{
                        backgroundColor: "var(--theme-surface-alt)",
                        borderColor: "var(--theme-border)",
                      }}
                    >
                      <div>
                        <div className="text-xs font-bold">
                          Deployment & Repository Access
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--theme-muted)" }}>
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
                            className="px-4 py-2 rounded-lg neo-btn-primary font-bold text-xs inline-flex items-center gap-1.5"
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
                            className="px-3.5 py-2 rounded-lg neo-pill text-xs font-bold inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4
                      className="text-xs uppercase tracking-wider font-mono-tech font-semibold mb-2"
                      style={{ color: "var(--theme-muted)" }}
                    >
                      Engineering Scope
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--theme-ink)" }}>
                      {project.summary}
                    </p>
                  </div>

                  {/* Key Metrics Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl neo-console"
                      >
                        <div className="text-[11px] font-mono-tech opacity-70 uppercase tracking-wider">
                          {m.label}
                        </div>
                        <div className="text-xl font-display font-bold mt-1 tabular-nums">
                          {m.value}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--theme-accent)" }}>
                          {m.detail}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Key Engineering Highlights */}
                  <div>
                    <h4
                      className="text-xs uppercase tracking-wider font-mono-tech font-semibold mb-3"
                      style={{ color: "var(--theme-muted)" }}
                    >
                      Core Implementation Highlights
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-lg border flex items-start gap-3"
                          style={{
                            backgroundColor: "var(--theme-surface-alt)",
                            borderColor: "var(--theme-border)",
                          }}
                        >
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: "var(--theme-accent)" }}
                          />
                          <span className="text-xs leading-relaxed" style={{ color: "var(--theme-ink)" }}>
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
                    <h4
                      className="text-xs uppercase tracking-wider font-mono-tech font-semibold mb-3"
                      style={{ color: "var(--theme-muted)" }}
                    >
                      Network Topology & Component Hierarchy
                    </h4>
                    <div className="space-y-2.5">
                      {project.topology.map((topo, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-lg border flex items-start gap-3"
                          style={{
                            backgroundColor: "var(--theme-surface-alt)",
                            borderColor: "var(--theme-border)",
                          }}
                        >
                          <Network
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: "var(--theme-accent)" }}
                          />
                          <div className="text-xs leading-relaxed font-medium" style={{ color: "var(--theme-ink)" }}>
                            {topo}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4
                      className="text-xs uppercase tracking-wider font-mono-tech font-semibold mb-3"
                      style={{ color: "var(--theme-muted)" }}
                    >
                      Protocols & Standards Implemented
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.protocols.map((proto, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-md text-xs font-mono-tech neo-console"
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
                    <div className="text-xs font-mono-tech" style={{ color: "var(--theme-muted)" }}>
                      Configuration syntax for Cisco IOS / Platform
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCli}
                      className="px-3 py-1.5 rounded-lg neo-pill text-xs font-semibold inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" style={{ color: "var(--theme-muted)" }} />
                          <span>Copy Config</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl neo-console font-mono-tech text-xs overflow-x-auto leading-relaxed">
                    <pre>{project.cliSnippet}</pre>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              className="p-4 sm:p-5 border-t-2 flex items-center justify-between gap-3 text-xs"
              style={{
                borderColor: "var(--theme-border)",
                backgroundColor: "var(--theme-surface-alt)",
                color: "var(--theme-muted)",
              }}
            >
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded neo-pill font-mono-tech text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg neo-btn-primary text-xs font-bold shrink-0 cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
