"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Network, Layers, ShieldCheck, Terminal, Cpu, ExternalLink } from "lucide-react";
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

  const isNetwork = project.category.toLowerCase().includes("network") || project.category.toLowerCase().includes("defense");
  const isTransport = project.category.toLowerCase().includes("transit") || project.category.toLowerCase().includes("peer");

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="crystal-surface crystal-surface-hover rounded-3xl p-7 flex flex-col justify-between"
      >
        <div>
          {/* Top Meta Bar */}
          <div className="flex items-center justify-between mb-5">
            <span className="crystal-pill px-3 py-1 rounded-full text-xs font-medium text-slate-700">
              {project.category}
            </span>

            <div className="flex items-center gap-2">
              {project.codeLink && (
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noreferrer"
                  title="View repository on GitHub"
                  className="p-2 rounded-full bg-white/70 hover:bg-white border border-white/80 text-slate-600 hover:text-slate-900 shadow-xs transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target={project.demoLink.startsWith("#") ? "_self" : "_blank"}
                  rel="noreferrer"
                  title="Launch live project"
                  className="px-3 py-1 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 border border-blue-200/60 text-xs font-medium inline-flex items-center gap-1 shadow-xs transition-colors"
                >
                  <span>Launch</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display leading-tight">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed font-normal">
            {project.subtitle}
          </p>

          {/* Seamless Crystal Architecture Plinth */}
          <div
            onClick={() => setModalOpen(true)}
            className="my-6 rounded-2xl bg-gradient-to-b from-white/70 to-white/35 backdrop-blur-xl p-4 cursor-pointer hover:bg-white/80 border border-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_6px_20px_-6px_rgba(15,23,42,0.05)] transition-all"
          >
            <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-200/50">
              <span className="font-semibold text-slate-700 font-display">System Topology</span>
              <span className="text-blue-600 font-medium">Inspect Spec →</span>
            </div>

            {/* Architecture Node Flow */}
            <div className="py-4 flex items-center justify-around">
              {isNetwork ? (
                <>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.08)] flex items-center justify-center text-blue-600 ring-1 ring-white/90">
                      <Network className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">R1 / R2</span>
                    <span className="text-[10px] text-slate-500">HSRP Gateway</span>
                  </div>

                  <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-300 to-indigo-300 mx-2" />

                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.08)] flex items-center justify-center text-slate-700 ring-1 ring-white/90">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">Dist SW</span>
                    <span className="text-[10px] text-slate-500">802.1Q Trunks</span>
                  </div>

                  <div className="flex-1 h-[2px] bg-gradient-to-r from-indigo-300 to-emerald-300 mx-2" />

                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.08)] flex items-center justify-center text-emerald-600 ring-1 ring-white/90">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">Server Farm</span>
                    <span className="text-[10px] text-slate-500">ACLs & NAT</span>
                  </div>
                </>
              ) : isTransport ? (
                <>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.08)] flex items-center justify-center text-blue-600 ring-1 ring-white/90">
                      <Layers className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">Origin</span>
                    <span className="text-[10px] text-slate-500">Mainland</span>
                  </div>

                  <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-300 to-indigo-300 mx-2" />

                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.08)] flex items-center justify-center text-slate-700 ring-1 ring-white/90">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">GeoMatch</span>
                    <span className="text-[10px] text-slate-500">Spatial Index</span>
                  </div>

                  <div className="flex-1 h-[2px] bg-gradient-to-r from-indigo-300 to-emerald-300 mx-2" />

                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.08)] flex items-center justify-center text-emerald-600 ring-1 ring-white/90">
                      <Layers className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">Destination</span>
                    <span className="text-[10px] text-slate-500">Lekki / Island</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.08)] flex items-center justify-center text-blue-600 ring-1 ring-white/90">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">Client Web</span>
                    <span className="text-[10px] text-slate-500">Next.js UI</span>
                  </div>

                  <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-300 to-indigo-300 mx-2" />

                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.08)] flex items-center justify-center text-slate-700 ring-1 ring-white/90">
                      <Layers className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">Edge Gateway</span>
                    <span className="text-[10px] text-slate-500">Route Handlers</span>
                  </div>

                  <div className="flex-1 h-[2px] bg-gradient-to-r from-indigo-300 to-emerald-300 mx-2" />

                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.08)] flex items-center justify-center text-emerald-600 ring-1 ring-white/90">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">Database</span>
                    <span className="text-[10px] text-slate-500">WAL SQLite</span>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Key Metric */}
            <div className="pt-3 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-600">
              <span>{project.metrics[0]?.label}: <strong className="text-slate-900 font-semibold">{project.metrics[0]?.value}</strong></span>
              <span className="text-blue-600 font-medium inline-flex items-center gap-1">
                Inspect Specs <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="crystal-pill px-2.5 py-1 rounded-full text-xs text-slate-600 font-medium"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="crystal-pill px-2.5 py-1 rounded-full text-xs text-slate-400 font-medium">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-7 pt-4 border-t border-slate-200/50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="text-xs font-medium text-slate-700 hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
          >
            <span>Architecture Specs</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {project.demoLink && (
            <a
              href={project.demoLink}
              target={project.demoLink.startsWith("#") ? "_self" : "_blank"}
              rel="noreferrer"
              className="crystal-button px-4 py-2 rounded-full text-white font-medium text-xs inline-flex items-center gap-1.5 shadow-[0_6px_16px_-2px_rgba(15,23,42,0.25)]"
            >
              <span>Launch</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            </a>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      <ProjectModal
        project={project}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
