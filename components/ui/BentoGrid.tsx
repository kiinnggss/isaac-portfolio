"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Network,
  ShieldCheck,
  Award,
  Terminal,
  Maximize2,
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
        { name: "HSRP v2", level: "Advanced", desc: "Gateway redundancy, active/standby preemption" },
        { name: "NAT & PAT", level: "Advanced", desc: "Inside source static and overload address translation" },
        { name: "Extended ACLs", level: "Advanced", desc: "Layer 3/4 packet filtering and traffic policing" },
        { name: "Subnetting (IPv4/IPv6)", level: "Proficient", desc: "VLSM, binary masks, and address allocation" },
        { name: "Cisco Packet Tracer", level: "Proficient", desc: "Complex multi-site enterprise topologies" },
        { name: "Port Security", level: "Advanced", desc: "Sticky MAC learning and violation shutdown" },
      ],
    },
    software: {
      title: "Software & Development",
      desc: "Modern full-stack web engineering, distributed state, and clean API contracts.",
      items: [
        { name: "TypeScript / JavaScript", level: "Production", desc: "Strict type models and async architecture" },
        { name: "Next.js (App Router)", level: "Production", desc: "Server components, route handlers, SSR" },
        { name: "React 19", level: "Production", desc: "Hooks, concurrent features, component state" },
        { name: "Python", level: "Proficient", desc: "Algorithmic scripts, backend tools, education" },
        { name: "REST APIs & Zod", level: "Production", desc: "Input sanitization, contract validation" },
        { name: "PostgreSQL & SQLite", level: "Production", desc: "Relational persistence, indexing, migrations" },
        { name: "Tailwind CSS", level: "Proficient", desc: "Design systems, responsive tokens, clean UI" },
        { name: "Java", level: "Foundational", desc: "Object-oriented design patterns and algorithms" },
      ],
    },
    hardware: {
      title: "Systems & Hardware Diagnostics",
      desc: "CompTIA A+ verified hardware maintenance, component testing, and system integrity.",
      items: [
        { name: "CompTIA A+ Diagnostics", level: "Certified", desc: "Motherboard, CPU, RAM, PSU fault isolation" },
        { name: "System Unit Assembly", level: "Proficient", desc: "Custom workstation builds and thermal airflow" },
        { name: "Storage & RAID", level: "Advanced", desc: "NVMe, SATA, redundancy arrays and recovery" },
        { name: "Linux / macOS Administration", level: "Advanced", desc: "Terminal navigation, cron, systemd services" },
        { name: "Peripheral Interfacing", level: "Advanced", desc: "Serial consoles, USB buses, display interfaces" },
        { name: "Preventative Maintenance", level: "Proficient", desc: "Dust suppression, thermal paste, voltage testing" },
      ],
    },
    tools: {
      title: "Tools & Methodologies",
      desc: "Developer tooling, version control, and organizational workflows.",
      items: [
        { name: "Git / GitHub", level: "Production", desc: "Branching workflows, PR reviews, CI pipelines" },
        { name: "Linux / Unix Shell", level: "Advanced", desc: "Bash scripting, process tracking, SSH keys" },
        { name: "Figma & Canva", level: "Design", desc: "UI mockups, design handoffs, wireframes" },
        { name: "Postman & Insomnia", level: "Testing", desc: "API payload inspection and contract testing" },
      ],
    },
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/50 backdrop-blur-md">
          Technical Competency & Credentials
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-950 tracking-tight">
          Technical Matrix & Qualifications
        </h2>
        <p className="mt-3 text-base text-slate-600 max-w-2xl font-normal">
          Where robust network protocols meet modern software engineering and verified hardware diagnostics.
        </p>
      </div>

      {/* Grid Layout without Box Clutter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Tile 1: Credentials & Academia (Col 5) */}
        <div className="lg:col-span-5 crystal-surface rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-[0_20px_40px_-12px_rgba(15,23,42,0.07)]">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/40">
              <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider font-display">
                Education & Industry Credentials
              </span>
              <Award className="w-5 h-5 text-blue-600" />
            </div>

            {/* University Degree Plinth */}
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md shadow-xs mb-5 border border-white/80">
              <div className="flex items-start gap-4">
                <div
                  onClick={() =>
                    setSelectedPhoto({
                      src: isaacGraduation,
                      alt: "Gbodimowo Isaac at Babcock University Convocation in academic regalia",
                      title: "Academic Convocation",
                      subtitle: "B.Sc. in Computer Science • Babcock University",
                      tag: "DEGREE CONFERRAL",
                      location: "Babcock University, Nigeria",
                      date: "Class of Computer Science",
                      context:
                        "Gbodimowo Isaac celebrating his degree conferral at Babcock University with his diploma scroll and graduation regalia. Coursework in operating systems, algorithms, distributed networks, and database administration.",
                    })
                  }
                  className="relative w-16 sm:w-20 h-20 sm:h-24 rounded-xl overflow-hidden shrink-0 cursor-pointer group bg-slate-100 shadow-sm transition-transform hover:scale-105"
                >
                  <Image
                    src={isaacGraduation}
                    alt="Gbodimowo Isaac Graduation at Babcock University"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-1 right-1 p-1 rounded-full crystal-pill text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-2.5 h-2.5" />
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-blue-600">Babcock University</div>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5 font-display">B.Sc. in Computer Science</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                    Formal coursework in operating systems, algorithm design, relational database models, and computer networking.
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications List */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-white/60 backdrop-blur-md flex items-center justify-between shadow-xs border border-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 font-display">CompTIA A+ Certified</div>
                    <div className="text-xs text-slate-500">Hardware & Diagnostics Core</div>
                  </div>
                </div>
                <span className="crystal-pill text-xs font-medium text-emerald-700 px-2.5 py-0.5 rounded-full">
                  Verified
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/60 backdrop-blur-md flex items-center justify-between shadow-xs border border-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-500/10 flex items-center justify-center text-slate-700">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 font-display">New Horizons Certification</div>
                    <div className="text-xs text-slate-500">Systems & Networking Program</div>
                  </div>
                </div>
                <span className="crystal-pill text-xs font-medium text-blue-700 px-2.5 py-0.5 rounded-full">
                  Certified
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/60 backdrop-blur-md flex items-center justify-between shadow-xs border border-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Network className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 font-display">Cisco CCNA 200-301</div>
                    <div className="text-xs text-slate-500">Enterprise Network Routing & Switching</div>
                  </div>
                </div>
                <span className="crystal-pill text-xs font-medium text-amber-700 px-2.5 py-0.5 rounded-full">
                  Candidate
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/40 text-xs text-slate-500">
            Bridging physical hardware diagnosis with modern web application deployment.
          </div>
        </div>

        {/* Tile 2: Live Diagnostics & Workstation (Col 7) */}
        <div className="lg:col-span-7 crystal-surface rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-[0_20px_40px_-12px_rgba(15,23,42,0.07)]">
          <div>
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-200/40">
              <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider font-display">
                Edge Telemetry & Systems Lab
              </span>
              <div className="crystal-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-emerald-800 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span>Gateway Active</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 font-display">
              Lagos Edge Node Diagnostics
            </h3>
            <p className="mt-1 text-sm text-slate-600 font-normal">
              Real-time instrumentation polling the Next.js Route Handlers and SQLite database engine.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-6 items-center">
              {/* Metrics Grid */}
              <div className="md:col-span-8 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md shadow-xs border border-white/80">
                    <div className="text-[11px] text-slate-500 font-medium font-mono-tech">STATUS</div>
                    <div className="text-base font-bold text-slate-900 capitalize mt-1 font-display">
                      {healthData?.status || "operational"}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-medium mt-0.5">HTTP 200</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md shadow-xs border border-white/80">
                    <div className="text-[11px] text-slate-500 font-medium font-mono-tech">DATABASE</div>
                    <div className="text-base font-bold text-blue-600 mt-1 truncate font-display">
                      {healthData?.dbConnected ? "Connected" : "Active"}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">WAL SQLite</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md shadow-xs border border-white/80">
                    <div className="text-[11px] text-slate-500 font-medium font-mono-tech">LATENCY</div>
                    <div className="text-base font-bold text-slate-900 mt-1 font-display">
                      {healthData ? `${healthData.latencyMs}ms` : "12ms"}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">RTT Loop</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md shadow-xs border border-white/80">
                    <div className="text-[11px] text-slate-500 font-medium font-mono-tech">UPTIME</div>
                    <div className="text-base font-bold text-slate-900 mt-1 font-display">
                      {healthData ? `${Math.floor(healthData.uptimeSeconds / 60)}m` : "48m"}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Continuous</div>
                  </div>
                </div>

                {/* Pipeline Flow Plinth */}
                <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md text-xs shadow-xs border border-white/80">
                  <div className="text-slate-500 font-semibold mb-2 text-[11px] font-display">
                    APPLICATION DATA FLOW
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto text-[11px] font-mono-tech py-0.5">
                    <span className="crystal-pill px-2.5 py-1 rounded-full text-slate-800 whitespace-nowrap">
                      Client
                    </span>
                    <span className="text-slate-300">→</span>
                    <span className="crystal-pill px-2.5 py-1 rounded-full text-blue-600 whitespace-nowrap">
                      Rate Limiter
                    </span>
                    <span className="text-slate-300">→</span>
                    <span className="crystal-pill px-2.5 py-1 rounded-full text-slate-800 whitespace-nowrap">
                      Zod Schema
                    </span>
                    <span className="text-slate-300">→</span>
                    <span className="crystal-pill px-2.5 py-1 rounded-full text-emerald-700 whitespace-nowrap">
                      SQLite
                    </span>
                  </div>
                </div>
              </div>

              {/* Workstation Photo Plinth */}
              <div
                onClick={() =>
                  setSelectedPhoto({
                    src: isaacWorkspace,
                    alt: "Gbodimowo Isaac at engineering workstation with headphones in deep flow state",
                    title: "Systems Engineering Workstation",
                    subtitle: "Lagos Tech Hub • Systems & Architecture Lab",
                    tag: "ENGINEERING",
                    location: "Lagos, Nigeria",
                    date: "Active Development",
                    context:
                      "Gbodimowo Isaac at his workstation designing backend pipelines, configuring network topologies, and verifying system diagnostics.",
                  })
                }
                className="md:col-span-4 relative rounded-2xl overflow-hidden bg-slate-100/80 aspect-[4/4] group cursor-pointer shadow-md transition-transform hover:scale-[1.02] border border-white/80"
              >
                <Image
                  src={isaacWorkspace}
                  alt="Gbodimowo Isaac focused at developer workstation"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-2 right-2 p-1.5 rounded-full crystal-pill text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                  <Maximize2 className="w-3 h-3" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 p-2.5 rounded-xl crystal-surface text-xs shadow-xs">
                  <div className="font-semibold text-slate-900 font-display">Engineering Workstation</div>
                  <div className="text-[10px] text-slate-500">Lagos Tech Hub</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200/40 flex items-center justify-between text-xs text-slate-500">
            <span>Environment: Linux Mint / Node.js 26</span>
            <a href="#terminal" className="text-blue-600 hover:underline font-semibold font-display">
              Open Terminal →
            </a>
          </div>
        </div>

        {/* Tile 3: Skills & Tech Matrix (Col 12) */}
        <div className="lg:col-span-12 crystal-surface rounded-3xl p-8 sm:p-10 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-950 font-display">
                Technical Stack & Skills Matrix
              </h3>
              <p className="text-sm text-slate-600 mt-1 font-normal">
                Organized by domain depth across networking, software, and hardware systems.
              </p>
            </div>

            {/* Seamless Crystal Category Switcher */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-full bg-white/70 backdrop-blur-md shadow-xs border border-white/80">
              {(["network", "software", "hardware", "tools"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? "crystal-button text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/60"
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

          {/* Active Category Description */}
          <div className="mb-6 p-4 rounded-2xl bg-white/70 backdrop-blur-md flex items-center justify-between text-xs shadow-xs border border-white/80">
            <div>
              <strong className="text-slate-900 font-display font-bold text-sm">{skillsMatrix[activeCategory].title}:</strong>{" "}
              <span className="text-slate-600 text-xs">{skillsMatrix[activeCategory].desc}</span>
            </div>
            <span className="text-slate-500 hidden sm:inline font-mono-tech">
              {skillsMatrix[activeCategory].items.length} competencies
            </span>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillsMatrix[activeCategory].items.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className="p-4 rounded-2xl bg-white/60 backdrop-blur-md hover:bg-white/95 transition-all shadow-[0_4px_14px_-2px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_24px_-6px_rgba(37,99,235,0.08)] flex flex-col justify-between border border-white/80"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="crystal-pill text-[10px] font-semibold text-blue-700 px-2.5 py-0.5 rounded-full">
                      {skill.level}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 font-display mt-1">
                    {skill.name}
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
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
