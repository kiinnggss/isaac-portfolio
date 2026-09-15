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
        className="group relative rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
      >
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            {/* Meta Row with Category & Quick Actions */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                {project.category}
              </span>

              <div className="flex items-center gap-2">
                {project.codeLink && (
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noreferrer"
                    title="View source on GitHub"
                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target={project.demoLink.startsWith("#") ? "_self" : "_blank"}
                    rel="noreferrer"
                    title="Open live project"
                    className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs font-medium inline-flex items-center gap-1"
                  >
                    <span>Launch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {project.subtitle}
            </p>

            {/* Architecture Preview Box */}
            <div
              onClick={() => setModalOpen(true)}
              className="my-5 relative w-full rounded-lg bg-slate-50 border border-slate-200 p-4 cursor-pointer hover:bg-slate-100/70 transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2.5 border-b border-slate-200">
                <span className="font-medium text-slate-700">Architecture Topology</span>
                <span className="text-blue-600 hover:underline">Inspect spec</span>
              </div>

              {/* Topology Nodes */}
              <div className="py-4 flex items-center justify-around">
                {isNetwork ? (
                  <>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
                        <Network className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">R1 / R2 Core</span>
                      <span className="text-[10px] text-slate-500">HSRP Gateway</span>
                    </div>

                    <div className="flex-1 h-[1px] bg-slate-300 mx-2" />

                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">Catalyst 3650</span>
                      <span className="text-[10px] text-slate-500">802.1Q Trunks</span>
                    </div>

                    <div className="flex-1 h-[1px] bg-slate-300 mx-2" />

                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-xs">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">DMZ Server</span>
                      <span className="text-[10px] text-slate-500">ACLs & NAT</span>
                    </div>
                  </>
                ) : isTransport ? (
                  <>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">Origin Route</span>
                      <span className="text-[10px] text-slate-500">Mainland</span>
                    </div>

                    <div className="flex-1 h-[1px] bg-slate-300 mx-2" />

                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">Geo Match</span>
                      <span className="text-[10px] text-slate-500">Spatial Query</span>
                    </div>

                    <div className="flex-1 h-[1px] bg-slate-300 mx-2" />

                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-xs">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">Destination</span>
                      <span className="text-[10px] text-slate-500">Lekki / Island</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">Client Web</span>
                      <span className="text-[10px] text-slate-500">Next.js UI</span>
                    </div>

                    <div className="flex-1 h-[1px] bg-slate-300 mx-2" />

                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">API Gateway</span>
                      <span className="text-[10px] text-slate-500">Route Handlers</span>
                    </div>

                    <div className="flex-1 h-[1px] bg-slate-300 mx-2" />

                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-xs">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">Database</span>
                      <span className="text-[10px] text-slate-500">SQLite & Store</span>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Metric */}
              <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>{project.metrics[0]?.label}: <strong className="text-slate-700 font-semibold">{project.metrics[0]?.value}</strong></span>
                <span className="text-blue-600 font-medium inline-flex items-center gap-1">
                  Explore <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Technical Stack Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-xs bg-slate-100 text-slate-600 border border-slate-200"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-2 py-0.5 rounded-md text-xs bg-slate-50 text-slate-500 border border-slate-200">
                  +{project.tags.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Action Trigger Row */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-xs font-medium text-slate-700 hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
            >
              <span>View Architecture Specs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {project.demoLink && (
              <a
                href={project.demoLink}
                target={project.demoLink.startsWith("#") ? "_self" : "_blank"}
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <span>Launch Project</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <ProjectModal
        project={project}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
