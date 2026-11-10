"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Terminal } from "lucide-react";
import ProjectModal, { type ProjectData } from "./ProjectModal";

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

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="crystal-surface crystal-surface-hover rounded-3xl p-7 sm:p-8 flex flex-col justify-between group"
      >
        <div>
          {/* Top Meta Header */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <span className="px-3.5 py-1 rounded-full bg-[#090d16] text-white text-[11px] font-mono-tech uppercase tracking-wider">
              {project.category}
            </span>

            <div className="flex items-center gap-2">
              {project.codeLink && (
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noreferrer"
                  title="View source repository on GitHub"
                  aria-label="View source repository on GitHub"
                  className="w-8 h-8 rounded-full bg-white/85 hover:bg-[#090d16] hover:text-white border border-white flex items-center justify-center text-slate-800 transition-colors shadow-xs"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target={project.demoLink.startsWith("#") ? "_self" : "_blank"}
                  rel="noreferrer"
                  title="Open deployment"
                  className="px-3.5 py-1 rounded-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>Live</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Title & Subtitle */}
          <h3
            onClick={() => setModalOpen(true)}
            className="text-2xl sm:text-3xl font-bold text-[#090d16] font-display leading-tight cursor-pointer group-hover:text-orange-600 transition-colors"
          >
            {project.title}
          </h3>
          <p className="mt-2.5 text-sm text-slate-700 leading-relaxed font-normal">
            {project.subtitle}
          </p>

          {/* Real Quantified Metrics Strip (Obsidian Instrument Panel) */}
          <div
            onClick={() => setModalOpen(true)}
            className="my-6 obsidian-surface rounded-2xl p-4 sm:p-5 cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
          >
            <div className="flex items-center justify-between text-[11px] font-mono-tech text-slate-400 pb-3 mb-3 border-b border-white/10">
              <span className="uppercase tracking-wider text-orange-400 font-semibold">
                Verified System Telemetry
              </span>
              <span className="text-slate-300 inline-flex items-center gap-1">
                <span>Inspect Architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-orange-400" />
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {project.metrics.slice(0, 3).map((metric) => (
                <div key={metric.label} className="space-y-0.5">
                  <div className="text-[10px] font-mono-tech text-slate-400 uppercase truncate">
                    {metric.label}
                  </div>
                  <div className="text-lg sm:text-xl font-display font-bold text-white">
                    {metric.value}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real Architecture Topology Preview (Top 2 Layers) */}
          <div className="space-y-2 mb-5">
            {project.topology.slice(0, 2).map((layer, i) => (
              <div
                key={i}
                className="px-3.5 py-2 rounded-xl bg-white/75 border border-white text-xs text-slate-800 flex items-start gap-2.5"
              >
                <Terminal className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{layer}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="crystal-pill px-2.5 py-1 rounded-full text-[11px] font-mono-tech text-slate-800 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="mt-6 pt-4 border-t border-slate-900/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="text-xs font-semibold text-[#090d16] hover:text-orange-600 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Open Technical Dossier</span>
            <ArrowUpRight className="w-4 h-4 text-orange-600" />
          </button>

          {project.codeLink && (
            <a
              href={project.codeLink}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono-tech text-slate-600 hover:text-[#090d16] transition-colors"
            >
              {project.codeLink.replace("https://", "")}
            </a>
          )}
        </div>
      </motion.article>

      <ProjectModal
        project={project}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
