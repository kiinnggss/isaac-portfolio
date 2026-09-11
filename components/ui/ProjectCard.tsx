"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Network, Layers, ShieldCheck, Terminal, Cpu } from "lucide-react";
import ProjectModal, { type ProjectData } from "./ProjectModal";

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
            {/* Meta Row */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono-tech uppercase bg-neutral-800 text-[#bfff04] border border-[#bfff04]/20">
                0{index + 1} // {project.category}
              </span>
              <span className="text-xs font-mono-tech text-neutral-500">
                Lagos, NG
              </span>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-[#bfff04] transition-colors leading-tight">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-400 font-sans leading-relaxed">
              {project.subtitle}
            </p>

            {/* Architecture Frame / Visual Mockup Area */}
            <div className="my-6 relative w-full h-48 sm:h-56 rounded-xl bg-gradient-to-b from-neutral-950 to-neutral-900 border border-white/5 p-4 overflow-hidden flex flex-col justify-between">
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

              {/* Status Header inside Mockup */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tech text-neutral-400 pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#bfff04]" />
                  <span>topology-monitor // live</span>
                </div>
                <span className="text-neutral-500">v2.4-stable</span>
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

          {/* Action Trigger */}
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-xs font-mono-tech text-white uppercase tracking-wider hover:text-[#bfff04] flex items-center gap-1.5 transition-colors group-hover:translate-x-1 duration-200"
            >
              <span>Explore System Architecture</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <span className="text-[11px] font-mono-tech text-neutral-500">
              Verified Case Study
            </span>
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
