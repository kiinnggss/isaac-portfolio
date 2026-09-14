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

  // Dynamic visual preview theme depending on category
  const isNetwork = project.category.toLowerCase().includes("network") || project.category.toLowerCase().includes("defense");
  const isTransport = project.category.toLowerCase().includes("transit") || project.category.toLowerCase().includes("peer");

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: index * 0.15 }}
        className="group relative rounded-2xl bg-neutral-900/40 border border-white/10 hover:border-[#bfff04]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between"
      >
        {/* Top Glow & Surface Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#bfff04]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Card Header & Preview Frame */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
          <div>
            {/* Meta Row with Quick Links */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono-tech uppercase bg-neutral-800 text-[#bfff04] border border-[#bfff04]/20">
                0{index + 1} // {project.category}
              </span>
              
              <div className="flex items-center gap-1.5">
                {project.codeLink && (
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="CODE"
                    title="View Source on GitHub"
                    className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-white/20 transition-all"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target={project.demoLink.startsWith("#") ? "_self" : "_blank"}
                    rel="noreferrer"
                    data-cursor="LAUNCH"
                    title="Open Live Project"
                    className="px-2.5 py-1 rounded-lg bg-[#bfff04]/10 border border-[#bfff04]/30 text-[#bfff04] hover:bg-[#bfff04] hover:text-black transition-all text-[11px] font-mono-tech flex items-center gap-1 font-semibold"
                  >
                    <span>Launch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-[#bfff04] transition-colors leading-tight">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-400 font-sans leading-relaxed">
              {project.subtitle}
            </p>

            {/* Architecture Frame / Visual Mockup Area */}
            <div
              onClick={() => setModalOpen(true)}
              data-cursor="INSPECT"
              className="my-6 relative w-full h-48 sm:h-56 rounded-xl bg-gradient-to-b from-neutral-950 to-neutral-900 border border-white/5 p-4 overflow-hidden flex flex-col justify-between cursor-pointer group-hover:border-white/20 transition-all"
            >
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

              {/* Status Header inside Mockup */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tech text-neutral-400 pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#bfff04]" />
                  <span>topology-monitor // live</span>
                </div>
                <span className="text-neutral-500">Click to inspect</span>
              </div>

              {/* Visual topology node mockup */}
              <div className="relative z-10 my-auto flex items-center justify-around">
                {isNetwork ? (
                  <>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-[#bfff04]">
                        <Network className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono-tech text-neutral-400">Core R1/R2</span>
                      <span className="text-[9px] font-mono-tech text-[#bfff04]">HSRP 110</span>
                    </div>

                    <div className="flex-1 h-[2px] bg-gradient-to-r from-[#bfff04]/40 via-white/20 to-[#00f0ff]/40 mx-2 relative">
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono-tech text-neutral-500">
                        802.1Q Trunk
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-[#00f0ff]">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono-tech text-neutral-400">Dist Sw 2960</span>
                      <span className="text-[9px] font-mono-tech text-[#00f0ff]">VLAN 10/20/30</span>
                    </div>

                    <div className="flex-1 h-[2px] bg-gradient-to-r from-[#00f0ff]/40 via-white/20 to-emerald-400/40 mx-2" />

                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-emerald-400">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono-tech text-neutral-400">Host Egress</span>
                      <span className="text-[9px] font-mono-tech text-emerald-400">NAT Pool</span>
                    </div>
                  </>
                ) : isTransport ? (
                  <>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-[#bfff04]/30 flex items-center justify-center text-[#bfff04]">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono-tech text-neutral-400">Commuter A</span>
                      <span className="text-[9px] font-mono-tech text-[#bfff04]">Mainland</span>
                    </div>

                    <div className="flex-1 h-[2px] bg-gradient-to-r from-[#bfff04] via-amber-400 to-[#00f0ff] mx-2 relative animate-pulse">
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono-tech text-neutral-400">
                        3rd Mainland Corridor
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono-tech text-neutral-400">Dynamic Match</span>
                      <span className="text-[9px] font-mono-tech text-[#00f0ff]">GeoIndex</span>
                    </div>

                    <div className="flex-1 h-[2px] bg-gradient-to-r from-[#00f0ff] to-emerald-400 mx-2" />

                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono-tech text-neutral-400">Commuter B</span>
                      <span className="text-[9px] font-mono-tech text-emerald-400">Lekki / Island</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-[#bfff04]">
                        <Terminal className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono-tech text-neutral-400">Client Web</span>
                    </div>

                    <div className="flex-1 h-[2px] bg-white/20 mx-2" />

                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-[#00f0ff]">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono-tech text-neutral-400">API Gateway</span>
                    </div>

                    <div className="flex-1 h-[2px] bg-white/20 mx-2" />

                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-amber-400">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono-tech text-neutral-400">DB & Pipeline</span>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Quick Metric */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tech text-neutral-400 pt-2 border-t border-white/5">
                <span>{project.metrics[0]?.label}: {project.metrics[0]?.value}</span>
                <span className="text-[#bfff04] flex items-center gap-1">
                  Inspect Spec <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Technical Stack Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono-tech bg-neutral-950 text-neutral-300 border border-neutral-800"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-2 py-1 rounded-md text-[11px] font-mono-tech bg-neutral-950 text-neutral-500 border border-neutral-800">
                  +{project.tags.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Action Trigger Row */}
          <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-xs font-mono-tech text-white uppercase tracking-wider hover:text-[#bfff04] flex items-center gap-1.5 transition-colors group-hover:translate-x-1 duration-200"
            >
              <span>Explore Architecture</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target={project.demoLink.startsWith("#") ? "_self" : "_blank"}
                  rel="noreferrer"
                  data-cursor="OPEN"
                  className="px-3.5 py-1.5 rounded-xl bg-[#bfff04] text-black font-semibold text-xs tracking-tight uppercase hover:bg-[#d0ff36] hover:shadow-[0_0_20px_rgba(191,255,4,0.4)] transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <span>Open Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
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
