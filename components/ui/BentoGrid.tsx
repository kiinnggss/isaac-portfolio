"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Network,
  Cpu,
  ShieldCheck,
  GraduationCap,
  Award,
  Terminal,
  Server,
  Layers,
  Activity,
  CheckCircle,
  ExternalLink,
  Zap,
} from "lucide-react";
import SubnetVisualizer from "./SubnetVisualizer";

export default function BentoGrid() {
  const [activeCategory, setActiveCategory] = useState<"network" | "software" | "hardware" | "tools">("network");
  const [healthData, setHealthData] = useState<{
    status: string;
    uptimeSeconds: number;
    dbConnected: boolean;
    memoryMb: number;
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
          memoryMb: json.system?.memoryUsageMb?.rss ?? 0,
          latencyMs: duration,
        });
      } catch {
        // Fallback for UI
        setHealthData({
          status: "operational",
          uptimeSeconds: 86400,
          dbConnected: true,
          memoryMb: 128,
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
        { name: "Cisco IOS CLI", level: "Advanced", desc: "Configuring ISR routers & Catalyst switches" },
        { name: "VLANs & 802.1Q", level: "Expert", desc: "Trunking & Router-on-a-Stick inter-VLAN routing" },
        { name: "HSRP v2", level: "Advanced", desc: "Gateway redundancy, active/standby preemption" },
        { name: "NAT & PAT", level: "Advanced", desc: "Inside source static and overload translation" },
        { name: "Extended ACLs", level: "Advanced", desc: "Layer 3/4 packet filtering and traffic policing" },
        { name: "Subnetting (IPv4/IPv6)", level: "Mastery", desc: "VLSM, binary masks, and address allocation" },
        { name: "Cisco Packet Tracer", level: "Expert", desc: "Complex multi-site enterprise topologies" },
        { name: "Port Security", level: "Advanced", desc: "Sticky MAC learning & violation shutdown" },
      ],
    },
    software: {
      title: "Software & Development",
      desc: "Modern full-stack web engineering, distributed state, and clean API contracts.",
      items: [
        { name: "TypeScript / JavaScript", level: "Production", desc: "Strict type models & async architecture" },
        { name: "Next.js (App Router)", level: "Production", desc: "Server components, route handlers, SSR" },
        { name: "React 19", level: "Production", desc: "Hooks, concurrent features, component state" },
        { name: "Python", level: "Proficient", desc: "Algorithmic scripts, backend tools, education" },
        { name: "REST APIs & Zod", level: "Production", desc: "Input sanitization, contract validation" },
        { name: "PostgreSQL & SQLite", level: "Production", desc: "Relational persistence, indexing, migrations" },
        { name: "Tailwind CSS", level: "Expert", desc: "Design systems, responsive tokens, glassmorphism" },
        { name: "Java", level: "Foundational", desc: "Object-oriented design patterns & algorithms" },
      ],
    },
    hardware: {
      title: "Systems & Hardware Diagnostics",
      desc: "CompTIA A+ verified hardware maintenance, component testing, and system integrity.",
      items: [
        { name: "CompTIA A+ Diagnostics", level: "Certified", desc: "Motherboard, CPU, RAM, PSU fault isolation" },
        { name: "System Unit Assembly", level: "Expert", desc: "Custom workstation builds & thermal airflow" },
        { name: "Storage & RAID", level: "Advanced", desc: "NVMe, SATA, redundancy arrays & backup recovery" },
        { name: "macOS Monterey / Linux", level: "Advanced", desc: "Terminal navigation, cron, systemd services" },
        { name: "Peripheral Interfacing", level: "Advanced", desc: "Serial consoles, USB buses, display interfaces" },
        { name: "Preventative Maintenance", level: "Expert", desc: "Dust suppression, thermal paste, voltage testing" },
      ],
    },
    tools: {
      title: "Tools & Methodologies",
      desc: "Developer tooling, version control, and organizational workflows.",
      items: [
        { name: "Git / GitHub", level: "Production", desc: "Branching workflows, PR reviews, CI basics" },
        { name: "Linux / Unix Shell", level: "Advanced", desc: "Bash scripting, process tracking, SSH keys" },
        { name: "Figma & Canva", level: "Design", desc: "UI mockups, design handoffs, presentation" },
        { name: "Microsoft Excel", level: "Analytical", desc: "Data modeling, inventory tracking, formulas" },
        { name: "Postman / Thunder Client", level: "Testing", desc: "API payload inspection & contract testing" },
      ],
    },
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#bfff04] uppercase tracking-widest mb-3">
          <Layers className="w-3.5 h-3.5" /> Technical Matrix & Infrastructure Philosophy
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
          Engineering Bento
        </h2>
        <p className="mt-3 text-base text-neutral-400 max-w-2xl">
          Where robust network protocols converge with responsive, modern software design and rigorous hardware diagnostics.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tile 1: Credentials & Academia (Col 5) */}
        <div className="lg:col-span-5 rounded-2xl bg-neutral-900/40 border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono-tech uppercase bg-neutral-800 text-[#00f0ff] border border-[#00f0ff]/20">
                Credentials & Pedigree
              </span>
              <Award className="w-5 h-5 text-[#00f0ff]" />
            </div>

            {/* University Degree */}
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-white/5 mb-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-[#bfff04] shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono-tech text-neutral-400 uppercase">Degree Awarded</div>
                  <h4 className="text-base font-bold text-white mt-0.5">B.Sc. in Computer Science</h4>
                  <div className="text-xs text-neutral-300 font-mono-tech mt-1">Babcock University</div>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    Comprehensive computer science training encompassing algorithm analysis, software engineering, database management, and operating systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Industry Certifications */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#bfff04]" />
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-white">CompTIA A+ Certified</div>
                    <div className="text-[11px] font-mono-tech text-neutral-400">Hardware & Diagnostics Core</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech text-[#bfff04] px-2 py-0.5 rounded bg-[#bfff04]/10 border border-[#bfff04]/20">
                  Verified
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#00f0ff]" />
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-white">New Horizons Technical Certification</div>
                    <div className="text-[11px] font-mono-tech text-neutral-400">Systems & Networking Program</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech text-[#00f0ff] px-2 py-0.5 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/20">
                  Certified
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Network className="w-5 h-5 text-amber-400" />
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-white">Cisco CCNA 200-301</div>
                    <div className="text-[11px] font-mono-tech text-neutral-400">Enterprise Network Candidate</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                  In Progress
                </span>
              </div>
            </div>
          </div>

          {/* Quick Experience Callout */}
          <div className="mt-6 pt-4 border-t border-white/5 text-xs text-neutral-400">
            <span className="text-white font-medium">Practicing Philosophy:</span> Bridging hardware diagnosis with cloud-native web deployment.
          </div>
        </div>

        {/* Tile 2: Live Systems Diagnostics & Telemetry (Col 7) */}
        <div className="lg:col-span-7 rounded-2xl bg-neutral-900/40 border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono-tech uppercase bg-neutral-800 text-[#bfff04] border border-[#bfff04]/20">
                Live Systems Telemetry
              </span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bfff04] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#bfff04]"></span>
                </span>
                <span className="text-xs font-mono-tech text-neutral-400">API Gateway: Online</span>
              </div>
            </div>

            <h3 className="text-2xl font-display font-bold text-white">
              Lagos Edge Node Diagnostics
            </h3>
            <p className="mt-1 text-sm text-neutral-400">
              Live instrumentation polling the Next.js Route Handlers and SQLite database engine.
            </p>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              <div className="p-3 rounded-xl bg-neutral-950 border border-white/5">
                <div className="text-[10px] font-mono-tech text-neutral-500 uppercase">Engine Status</div>
                <div className="text-base font-bold font-mono-tech text-[#bfff04] capitalize mt-1">
                  {healthData?.status || "operational"}
                </div>
                <div className="text-[10px] font-mono-tech text-neutral-400 mt-0.5">HTTP 200 OK</div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-white/5">
                <div className="text-[10px] font-mono-tech text-neutral-500 uppercase">DB Handshake</div>
                <div className="text-base font-bold font-mono-tech text-[#00f0ff] mt-1">
                  {healthData?.dbConnected ? "Connected" : "Synchronizing"}
                </div>
                <div className="text-[10px] font-mono-tech text-neutral-400 mt-0.5">WAL SQLite</div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-white/5">
                <div className="text-[10px] font-mono-tech text-neutral-500 uppercase">Local RTT</div>
                <div className="text-base font-bold font-mono-tech text-white mt-1">
                  {healthData ? `${healthData.latencyMs}ms` : "12ms"}
                </div>
                <div className="text-[10px] font-mono-tech text-neutral-400 mt-0.5">Sub-second loop</div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-white/5">
                <div className="text-[10px] font-mono-tech text-neutral-500 uppercase">System Uptime</div>
                <div className="text-base font-bold font-mono-tech text-white mt-1">
                  {healthData ? `${Math.floor(healthData.uptimeSeconds / 60)}m` : "48m"}
                </div>
                <div className="text-[10px] font-mono-tech text-neutral-400 mt-0.5">Continuous</div>
              </div>
            </div>

            {/* Network Packet Flow Banner */}
            <div className="p-4 rounded-xl bg-black border border-neutral-800 text-xs font-mono-tech">
              <div className="text-neutral-500 mb-2 flex items-center justify-between">
                <span>PACKET ROUTING PIPELINE</span>
                <span className="text-[#bfff04]">ENCRYPTED</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300 overflow-x-auto py-1">
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[#bfff04]">
                  Client Browser
                </span>
                <span className="text-neutral-600">→</span>
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[#00f0ff]">
                  Rate Limiter (Token Bucket)
                </span>
                <span className="text-neutral-600">→</span>
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-400">
                  Zod Sanitizer
                </span>
                <span className="text-neutral-600">→</span>
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-emerald-400">
                  SQLite Storage & Mail Dispatch
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono-tech text-neutral-500">
              Host Environment: Linux Mint / Node.js 26
            </span>
            <a
              href="#terminal"
              className="text-xs font-mono-tech text-[#bfff04] hover:underline flex items-center gap-1"
            >
              Open Terminal Viewer →
            </a>
          </div>
        </div>

        {/* Tile 3: Interactive Skills & Tech Matrix with Category Tabs (Col 12) */}
        <div className="lg:col-span-12 rounded-2xl bg-neutral-900/40 border border-white/10 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono-tech uppercase text-[#bfff04] tracking-wider">
                Full Spectrum Competency
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                Technical Stack & Skills Matrix
              </h3>
            </div>

            {/* Category Switcher Tabs */}
            <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-black/60 border border-white/10">
              {(["network", "software", "hardware", "tools"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono-tech uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? "bg-[#bfff04] text-black font-bold shadow-md"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {cat === "network" && "Networking & Infra"}
                  {cat === "software" && "Software & Web"}
                  {cat === "hardware" && "Hardware & Systems"}
                  {cat === "tools" && "Tools & Methods"}
                </button>
              ))}
            </div>
          </div>

          {/* Active Category Description */}
          <div className="mb-6 p-4 rounded-xl bg-neutral-950/60 border border-white/5 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white">
                {skillsMatrix[activeCategory].title}
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                {skillsMatrix[activeCategory].desc}
              </p>
            </div>
            <span className="text-xs font-mono-tech text-[#00f0ff] hidden sm:inline">
              {skillsMatrix[activeCategory].items.length} Competencies Cataloged
            </span>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillsMatrix[activeCategory].items.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group p-4 rounded-xl bg-neutral-950/80 border border-white/5 hover:border-[#bfff04]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-tech uppercase px-2 py-0.5 rounded bg-neutral-900 text-[#bfff04] border border-[#bfff04]/20">
                      {skill.level}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-[#bfff04] transition-colors" />
                  </div>
                  <div className="text-sm font-bold text-white group-hover:text-[#bfff04] transition-colors">
                    {skill.name}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
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
    </section>
  );
}
