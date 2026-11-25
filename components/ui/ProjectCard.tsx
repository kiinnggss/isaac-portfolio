"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Terminal } from "lucide-react";
import ProjectModal, { type ProjectData } from "./ProjectModal";
import ProjectPreview from "./ProjectPreview";
import { usePortfolioTheme } from "./ThemeProvider";

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
  const { effectiveAccent } = usePortfolioTheme();

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        className="neo-card neo-card-hover rounded-3xl p-5 sm:p-6 flex flex-col justify-between group"
      >
        <div>
          {/* Top Meta Header */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-full neo-console text-[11px] font-mono-tech uppercase tracking-wider font-semibold"
            >
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
                  className="w-8 h-8 rounded-full neo-pill flex items-center justify-center hover:opacity-80 transition-opacity"
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
                  className="px-3.5 py-1 rounded-full neo-btn-primary text-xs font-bold inline-flex items-center gap-1.5"
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
            className="text-xl sm:text-2xl font-extrabold font-display uppercase tracking-wide leading-tight cursor-pointer transition-opacity hover:opacity-80"
          >
            {project.title}
          </h3>
          <p
            className="mt-1.5 text-sm leading-relaxed"
            style={{ color: "var(--theme-muted)" }}
          >
            {project.subtitle}
          </p>

          {/* Visual Preview Frame */}
          <div className="mt-4">
            <ProjectPreview project={project} onClick={() => setModalOpen(true)} />
          </div>

          {/* Quantified Metrics Strip (Full labels, no ellipsis truncation) */}
          <div
            onClick={() => setModalOpen(true)}
            className="mt-4 p-3.5 sm:p-4 rounded-2xl neo-console cursor-pointer"
          >
            <div className="grid grid-cols-3 gap-3 items-start">
              {project.metrics.map((metric, mIdx) => (
                <div
                  key={mIdx}
                  className={mIdx > 0 ? "border-l pl-3" : ""}
                  style={mIdx > 0 ? { borderColor: "rgba(255,255,255,0.16)" } : undefined}
                >
                  <div className="text-[10px] font-mono-tech uppercase tracking-wider opacity-75 leading-snug">
                    {metric.label}
                  </div>
                  <div
                    className="text-lg sm:text-xl font-display font-bold mt-1 tabular-nums"
                    style={{ color: mIdx === 0 ? effectiveAccent : undefined }}
                  >
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Tags & Inspect Action */}
        <div className="mt-5">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[11px] font-mono-tech font-semibold border"
                style={{
                  backgroundColor: "var(--theme-surface-alt)",
                  borderColor: "var(--theme-border)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="pt-3.5 border-t-2 flex items-center justify-between gap-3"
            style={{ borderColor: "var(--theme-border)" }}
          >
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-xs font-mono-tech font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer hover:underline underline-offset-4"
            >
              <Terminal className="w-3.5 h-3.5" style={{ color: effectiveAccent }} />
              <span>Inspect Architecture &amp; CLI</span>
            </button>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              aria-label={`Inspect ${project.title}`}
              className="w-8 h-8 rounded-full neo-btn-primary flex items-center justify-center cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
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
