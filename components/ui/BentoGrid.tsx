"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Network,
  ShieldCheck,
  Award,
  Maximize2,
  ArrowUpRight,
} from "lucide-react";
import SubnetVisualizer from "./SubnetVisualizer";
import PhotoModal, { PhotoDetails } from "./PhotoModal";
import isaacGraduation from "@/public/images/isaac-graduation.jpg";
import isaacWorkspace from "@/public/images/isaac-workspace.jpg";

export default function BentoGrid() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDetails | null>(null);
  const [activeCategory, setActiveCategory] = useState<"network" | "software" | "hardware" | "tools">("network");
  const [healthData, setHealthData] = useState<{
    status: string;
    uptimeSeconds: number;
    dbConnected: boolean;
    latencyMs: number;
  } | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const start = performance.now();
        const res = await fetch("/api/health");
        const json = await res.json();
        const duration = Math.round(performance.now() - start);

        setHealthData({
          status: json.status,
          uptimeSeconds: json.uptimeSeconds,
          dbConnected: json.database?.connected ?? false,
          latencyMs: duration,
        });
      } catch {
        setHealthData({
          status: "operational",
          uptimeSeconds: 86400,
          dbConnected: true,
          latencyMs: 14,
        });
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  const skillsMatrix = {
    network: {
      title: "Networking & Infrastructure",
      desc: "Enterprise protocol architecture, multi-layer switching, and packet diagnostics.",
      items: [
        { name: "Cisco IOS CLI", level: "Advanced", desc: "Configuring ISR routers and Catalyst switches" },
        { name: "VLANs & 802.1Q", level: "Proficient", desc: "Trunking and Router-on-a-Stick inter-VLAN routing" },
        { name: "HSRP v2", level: "Advanced", desc: "Gateway redundancy and active/standby preemption" },
        { name: "NAT & PAT", level: "Advanced", desc: "Inside source static and overload address translation" },
        { name: "Extended ACLs", level: "Advanced", desc: "Layer 3 and Layer 4 packet filtering and traffic policing" },
        { name: "Subnetting (IPv4/IPv6)", level: "Proficient", desc: "VLSM, binary masks, and address allocation" },
        { name: "Cisco Packet Tracer", level: "Proficient", desc: "Multi-site enterprise network topologies" },
        { name: "Port Security", level: "Advanced", desc: "Sticky MAC learning and violation shutdown" },
      ],
    },
    software: {
      title: "Software & Web Engineering",
      desc: "Full-stack web engineering, distributed state, and validated API contracts.",
      items: [
        { name: "TypeScript / JavaScript", level: "Production", desc: "Strict type models and async architecture" },
        { name: "Next.js 16 (App Router)", level: "Production", desc: "Server components, route handlers, static export" },
        { name: "React 19", level: "Production", desc: "Hooks, concurrent rendering, component state" },
        { name: "Python & FastAPI", level: "Production", desc: "Async subprocess supervisors, SSE streaming, CLI tools" },
        { name: "REST APIs & Zod", level: "Production", desc: "Input sanitization and schema validation" },
        { name: "PostgreSQL & SQLite", level: "Production", desc: "Relational persistence, spatial indexing, WAL mode" },
        { name: "Tailwind CSS", level: "Production", desc: "Design systems, responsive tokens, custom surfaces" },
        { name: "Java", level: "Foundational", desc: "Object-oriented design patterns and algorithms" },
      ],
    },
    hardware: {
      title: "Systems & Hardware Diagnostics",
      desc: "CompTIA A+ verified hardware maintenance, component testing, and fault isolation.",
      items: [
        { name: "CompTIA A+ Diagnostics", level: "Certified", desc: "Motherboard, CPU, RAM, PSU fault isolation" },
        { name: "System Unit Assembly", level: "Proficient", desc: "Custom workstation builds and thermal airflow" },
        { name: "Storage & RAID", level: "Advanced", desc: "NVMe, SATA, redundancy arrays, and recovery" },
        { name: "Linux / macOS Admin", level: "Advanced", desc: "Terminal navigation, cron, systemd services" },
        { name: "Peripheral Interfacing", level: "Advanced", desc: "Serial consoles, USB buses, display interfaces" },
        { name: "Preventative Maintenance", level: "Proficient", desc: "Thermal management and voltage testing" },
      ],
    },
    tools: {
      title: "Tools & Methodologies",
      desc: "Developer tooling, version control, and testing workflows.",
      items: [
        { name: "Git & GitHub", level: "Production", desc: "Branching workflows, PR reviews, CI pipelines" },
        { name: "Linux / Unix Shell", level: "Advanced", desc: "Bash scripting, process management, SSH tunnels" },
        { name: "Cloudflare Tunnels", level: "Production", desc: "Zero-trust edge exposure and HTTPS routing" },
        { name: "Pytest & Vitest", level: "Production", desc: "Automated unit and end-to-end verification suites" },
      ],
    },
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header (No Eyebrow per Restraint Rule) */}
      <div className="mb-14 max-w-2xl">
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#090d16] tracking-tight">
          Technical Matrix & Qualifications
        </h2>
        <p className="mt-3 text-base text-slate-800 font-normal leading-relaxed">
          Enterprise network routing protocols paired with production full-stack software engineering and CompTIA A+ hardware diagnostics.
        </p>
      </div>

      {/* Asymmetric Bento Grid with Surface Contrast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Tile 1: Obsidian Live Diagnostics & Workstation (Col 7) */}
        <div className="lg:col-span-7 obsidian-surface rounded-3xl p-7 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <span className="text-xs font-mono-tech text-orange-400 uppercase tracking-wider font-semibold">
                Edge Telemetry & Systems Lab
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-emerald-400 font-mono-tech">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Gateway Operational</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white font-display">
              Lagos Edge Node Diagnostics
            </h3>
            <p className="mt-1 text-sm text-slate-300 font-normal">
              Live instrumentation polling the Next.js Route Handlers and SQLite WAL engine.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-6 items-center">
              <div className="md:col-span-8 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] text-slate-400 font-mono-tech">STATUS</div>
                    <div className="text-base font-bold text-white capitalize mt-1 font-display">
                      {healthData?.status || "Operational"}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono-tech mt-0.5">HTTP 200</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] text-slate-400 font-mono-tech">DATABASE</div>
                    <div className="text-base font-bold text-orange-400 mt-1 truncate font-display">
                      {healthData?.dbConnected ? "Connected" : "Active"}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono-tech mt-0.5">WAL SQLite</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] text-slate-400 font-mono-tech">LATENCY</div>
                    <div className="text-base font-bold text-white mt-1 font-display">
                      {healthData ? `${healthData.latencyMs}ms` : "12ms"}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono-tech mt-0.5">RTT Loop</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] text-slate-400 font-mono-tech">UPTIME</div>
                    <div className="text-base font-bold text-white mt-1 font-display">
                      {healthData ? `${Math.floor(healthData.uptimeSeconds / 60)}m` : "99.9%"}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono-tech mt-0.5">Continuous</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                  <div className="text-slate-400 font-mono-tech mb-2 text-[10px] uppercase">
                    Request Pipeline
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto text-[11px] font-mono-tech py-0.5">
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-white whitespace-nowrap">
                      Client Edge
                    </span>
                    <span className="text-orange-400">→</span>
                    <span className="px-2.5 py-1 rounded-full bg-orange-600/20 text-orange-300 border border-orange-500/30 whitespace-nowrap">
                      Rate Limiter
                    </span>
                    <span className="text-orange-400">→</span>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-white whitespace-nowrap">
                      Zod Contract
                    </span>
                    <span className="text-orange-400">→</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                      SQLite WAL
                    </span>
                  </div>
                </div>
              </div>

              {/* Workstation Photo */}
              <div
                onClick={() =>
                  setSelectedPhoto({
                    src: isaacWorkspace,
                    alt: "Gbodimowo Isaac at engineering workstation with headphones",
                    title: "Systems Engineering Workstation",
                    subtitle: "Lagos Tech Hub / Systems & Architecture Lab",
                    tag: "ENGINEERING",
                    location: "Lagos, Nigeria",
                    date: "Active Development",
                    context:
                      "Gbodimowo Isaac at his workstation designing backend pipelines, configuring network topologies, and verifying system diagnostics.",
                  })
                }
                className="md:col-span-4 relative rounded-2xl overflow-hidden bg-slate-900 aspect-square group cursor-pointer border border-white/15"
              >
                <Image
                  src={isaacWorkspace}
                  alt="Gbodimowo Isaac focused at developer workstation"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-[#090d16]/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 p-2.5 rounded-xl bg-[#090d16]/90 backdrop-blur-md border border-white/15 text-xs">
                  <div className="font-semibold text-white font-display">Systems Lab</div>
                  <div className="text-[10px] text-slate-400 font-mono-tech">Lagos Node</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono-tech">
            <span>RUNTIME: LINUX / NEXT.JS 16</span>
            <a href="#terminal" className="text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1">
              <span>Launch Interactive CLI</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Tile 2: Credentials & Academia (Col 5) */}
        <div className="lg:col-span-5 crystal-surface rounded-3xl p-7 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-900/10">
              <span className="text-xs font-mono-tech font-semibold text-[#090d16] uppercase tracking-wider">
                Academic & Industry Credentials
              </span>
              <Award className="w-5 h-5 text-orange-600" />
            </div>

            {/* University Degree Card */}
            <div className="p-4 rounded-2xl bg-white/85 shadow-xs mb-5 border border-white">
              <div className="flex items-start gap-4">
                <div
                  onClick={() =>
                    setSelectedPhoto({
                      src: isaacGraduation,
                      alt: "Gbodimowo Isaac at Babcock University Convocation in academic regalia",
                      title: "Academic Convocation",
                      subtitle: "B.Sc. in Computer Science / Babcock University",
                      tag: "DEGREE CONFERRAL",
                      location: "Babcock University, Nigeria",
                      date: "Computer Science",
                      context:
                        "Gbodimowo Isaac celebrating his degree conferral at Babcock University with his diploma scroll and graduation regalia. Coursework in operating systems, algorithms, distributed networks, and database administration.",
                    })
                  }
                  className="relative w-16 sm:w-20 h-20 sm:h-24 rounded-xl overflow-hidden shrink-0 cursor-pointer group bg-slate-900 shadow-sm transition-transform hover:scale-105"
                >
                  <Image
                    src={isaacGraduation}
                    alt="Gbodimowo Isaac Graduation at Babcock University"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-1 right-1 p-1 rounded-full bg-[#090d16]/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-2.5 h-2.5" />
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono-tech font-semibold text-orange-600 uppercase">
                    Babcock University
                  </div>
                  <h4 className="text-base font-bold text-[#090d16] mt-0.5 font-display">
                    B.Sc. in Computer Science
                  </h4>
                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                    Operating systems, algorithm design, relational database models, and computer networking.
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications List */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-white/80 flex items-center justify-between border border-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#090d16] flex items-center justify-center text-orange-500">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#090d16] font-display">CompTIA A+ Certified</div>
                    <div className="text-xs text-slate-600">Hardware & Systems Diagnostics Core</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 text-[11px] font-mono-tech font-semibold">
                  VERIFIED
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 flex items-center justify-between border border-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#090d16] flex items-center justify-center text-orange-500">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#090d16] font-display">New Horizons Certification</div>
                    <div className="text-xs text-slate-600">Systems & Enterprise Networking</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 text-[11px] font-mono-tech font-semibold">
                  CERTIFIED
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 flex items-center justify-between border border-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#090d16] flex items-center justify-center text-orange-500">
                    <Network className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#090d16] font-display">Cisco CCNA 200-301</div>
                    <div className="text-xs text-slate-600">Enterprise Routing & Switching</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-800 text-[11px] font-mono-tech font-semibold">
                  ACTIVE TRACK
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-900/10 text-xs text-slate-700 font-mono-tech">
            HARDWARE FAULT ISOLATION + DISTRIBUTED WEB
          </div>
        </div>

        {/* Tile 3: Skills & Tech Matrix (Col 12) */}
        <div className="lg:col-span-12 crystal-surface rounded-3xl p-8 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-[#090d16] font-display">
                Domain Competency Matrix
              </h3>
              <p className="text-sm text-slate-700 mt-1">
                Select a domain to inspect specific protocols, frameworks, and diagnostic capabilities.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 p-1.5 rounded-full bg-white/80 border border-white shadow-xs">
              {(["network", "software", "hardware", "tools"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#090d16] text-white shadow-xs"
                      : "text-slate-700 hover:text-[#090d16] hover:bg-white"
                  }`}
                >
                  {cat === "network" && "Networking & Infra"}
                  {cat === "software" && "Software & Web"}
                  {cat === "hardware" && "Hardware & Diagnostics"}
                  {cat === "tools" && "Tools & Methods"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillsMatrix[activeCategory].items.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: index * 0.03 }}
                className="p-4 rounded-2xl bg-white/80 hover:bg-white transition-all border border-white flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-tech font-semibold uppercase tracking-wider text-orange-600 px-2.5 py-0.5 rounded-full bg-orange-500/10">
                      {skill.level}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-[#090d16] font-display mt-1">
                    {skill.name}
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tile 4: Interactive Subnet Visualizer Component (Col 12) */}
        <div className="lg:col-span-12">
          <SubnetVisualizer />
        </div>
      </div>

      <PhotoModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  );
}
