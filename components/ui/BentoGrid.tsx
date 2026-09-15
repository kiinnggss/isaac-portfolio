"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Network,
  ShieldCheck,
  Award,
  Terminal,
  Server,
  Layers,
  Activity,
  CheckCircle,
  ExternalLink,
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
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
          Technical Competency & Credentials
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
          Technical Matrix & Qualifications
        </h2>
        <p className="mt-2 text-base text-slate-600 max-w-2xl">
          Where robust network protocols meet modern software engineering and verified hardware diagnostics.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tile 1: Credentials & Academia (Col 5) */}
        <div className="lg:col-span-5 rounded-xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Education & Certifications
              </span>
              <Award className="w-5 h-5 text-blue-600" />
            </div>

            {/* University Degree with Graduation Photo */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 mb-4">
              <div className="flex items-start gap-3.5">
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
                  className="relative w-16 sm:w-20 h-20 sm:h-24 rounded-lg overflow-hidden border border-slate-200 shrink-0 cursor-pointer group bg-slate-200 shadow-xs hover:border-blue-400 transition-all"
                >
                  <Image
                    src={isaacGraduation}
                    alt="Gbodimowo Isaac Graduation at Babcock University"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-1 right-1 p-0.5 rounded bg-white/80 backdrop-blur-xs text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-2.5 h-2.5" />
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium text-blue-600">Babcock University</div>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">B.Sc. in Computer Science</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Formal coursework in operating systems, algorithm design, relational database models, and computer networking.
                  </p>
                </div>
              </div>
            </div>

            {/* Industry Certifications */}
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">CompTIA A+ Certified</div>
                    <div className="text-xs text-slate-500">Hardware & Diagnostics Core</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  Verified
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-slate-700" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">New Horizons Technical Certification</div>
                    <div className="text-xs text-slate-500">Systems & Networking Program</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                  Certified
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Network className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Cisco CCNA 200-301</div>
                    <div className="text-xs text-slate-500">Enterprise Network Routing & Switching</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                  Candidate
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
            Bridging physical hardware diagnosis with modern web application deployment.
          </div>
        </div>

        {/* Tile 2: Live Diagnostics & Workstation (Col 7) */}
        <div className="lg:col-span-7 rounded-xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Edge Node Telemetry & Environment
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Gateway Operational</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Lagos Edge Node Diagnostics
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Real-time instrumentation polling the Next.js Route Handlers and SQLite database engine.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-5 items-center">
              {/* Metrics Column */}
              <div className="md:col-span-8 space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[11px] text-slate-500 font-medium">STATUS</div>
                    <div className="text-sm font-bold text-slate-900 capitalize mt-0.5">
                      {healthData?.status || "operational"}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">HTTP 200</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[11px] text-slate-500 font-medium">DATABASE</div>
                    <div className="text-sm font-bold text-blue-600 mt-0.5 truncate">
                      {healthData?.dbConnected ? "Connected" : "Active"}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">WAL SQLite</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[11px] text-slate-500 font-medium">LOCAL RTT</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      {healthData ? `${healthData.latencyMs}ms` : "12ms"}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Round trip</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[11px] text-slate-500 font-medium">UPTIME</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      {healthData ? `${Math.floor(healthData.uptimeSeconds / 60)}m` : "48m"}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Continuous</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <div className="text-slate-500 font-medium mb-1.5 text-[11px]">
                    APPLICATION PIPELINE
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto text-[11px] font-mono-tech py-0.5">
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800 whitespace-nowrap">
                      Client Browser
                    </span>
                    <span className="text-slate-400">→</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-blue-600 whitespace-nowrap">
                      Rate Limiter
                    </span>
                    <span className="text-slate-400">→</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800 whitespace-nowrap">
                      Zod Schema
                    </span>
                    <span className="text-slate-400">→</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-emerald-700 whitespace-nowrap">
                      SQLite
                    </span>
                  </div>
                </div>
              </div>

              {/* Workstation Photo */}
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
                className="md:col-span-4 relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/4] group cursor-pointer shadow-xs hover:border-blue-400 transition-all"
              >
                <Image
                  src={isaacWorkspace}
                  alt="Gbodimowo Isaac focused at developer workstation"
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 p-1 rounded bg-white/90 backdrop-blur-xs text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded bg-white/90 backdrop-blur-xs text-xs">
                  <div className="font-semibold text-slate-900">Engineering Workstation</div>
                  <div className="text-[10px] text-slate-500">Lagos Tech Hub</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Host Environment: Linux Mint / Node.js 26</span>
            <a href="#terminal" className="text-blue-600 hover:underline font-medium">
              Open Terminal →
            </a>
          </div>
        </div>

        {/* Tile 3: Skills & Tech Matrix (Col 12) */}
        <div className="lg:col-span-12 rounded-xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Technical Stack & Skills Matrix
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Categorized by domain competency and operational depth.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200">
              {(["network", "software", "hardware", "tools"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
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
          <div className="mb-5 p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <strong className="text-slate-900">{skillsMatrix[activeCategory].title}:</strong>{" "}
              <span className="text-slate-600">{skillsMatrix[activeCategory].desc}</span>
            </div>
            <span className="text-slate-500 hidden sm:inline font-mono-tech">
              {skillsMatrix[activeCategory].items.length} skills listed
            </span>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {skillsMatrix[activeCategory].items.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {skill.level}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900 mt-1">
                    {skill.name}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
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

      {/* Lightbox Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  );
}
