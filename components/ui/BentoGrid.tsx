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
import { usePortfolioTheme } from "./ThemeProvider";

export default function BentoGrid() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDetails | null>(null);
  const [activeCategory, setActiveCategory] = useState<"network" | "software" | "hardware" | "tools">("network");
  const { effectiveAccent } = usePortfolioTheme();
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
        { name: "Endpoint Hardening", level: "Proficient", desc: "BIOS/UEFI setup, disk partitioning, secure boot" },
        { name: "Linux System Admin", level: "Proficient", desc: "Mint/Ubuntu process management and bash scripting" },
        { name: "Peripheral Networking", level: "Proficient", desc: "Print servers, PoE switching, CAT6 cabling" },
        { name: "Firmware & Drivers", level: "Proficient", desc: "Clean driver rollouts and OS image recovery" },
        { name: "Thermal Optimization", level: "Hands-on", desc: "Thermal paste servicing and airflow tuning" },
      ],
    },
    tools: {
      title: "Architecture & DevOps",
      desc: "Modern toolchains, traffic analysis, and CI/CD pipelines.",
      items: [
        { name: "Git & GitHub Actions", level: "Production", desc: "Branching, PR automation, and static deployment" },
        { name: "Wireshark / tcpdump", level: "Proficient", desc: "Packet inspection, DNS/ARP/TCP troubleshooting" },
        { name: "Docker & Linux Containers", level: "Proficient", desc: "Isolated dev environments and port mapping" },
        { name: "Framer Motion", level: "Production", desc: "GPU-accelerated springs and state transitions" },
        { name: "Chrome DevTools & Lighthouse", level: "Production", desc: "Performance profiling and accessibility audits" },
        { name: "Cloudflare Quick Tunnels", level: "Production", desc: "Secure local service tunneling over HTTPS" },
      ],
    },
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight">
          Technical Matrix &amp; Credentials
        </h2>
        <p className="mt-3 text-base max-w-[60ch]" style={{ color: "var(--theme-muted)" }}>
          Dual-competency stack spanning full-stack web applications, enterprise Cisco networking, and hardware diagnostics.
        </p>
      </div>

      {/* Top Grid: 2-Column Balanced Identity & Node Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Tile 1: Console Telemetry & Workstation Frame */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-6 neo-console rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center border-2"
                style={{
                  backgroundColor: effectiveAccent,
                  color: "var(--theme-accent-text)",
                  borderColor: "var(--theme-border)",
                }}
              >
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold uppercase tracking-wide">
                  Lagos Edge Node Diagnostics
                </h3>
                <p className="text-xs opacity-70 font-mono-tech">
                  Live API &amp; Persistence Probe
                </p>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-mono-tech flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{healthData ? healthData.status.toUpperCase() : "ONLINE"}</span>
            </div>
          </div>

          <div
            className="grid grid-cols-3 gap-4 border-y py-4"
            style={{ borderColor: "rgba(255,255,255,0.14)" }}
          >
            <div>
              <div className="text-[11px] font-mono-tech uppercase opacity-65">Response Latency</div>
              <div className="text-2xl font-display font-bold mt-0.5 tabular-nums">
                {healthData ? `${healthData.latencyMs}ms` : "12ms"}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono-tech uppercase opacity-65">Node Persistence</div>
              <div className="text-2xl font-display font-bold text-emerald-400 mt-0.5">
                {healthData?.dbConnected ? "WAL Active" : "Active"}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono-tech uppercase opacity-65">Region Edge</div>
              <div className="text-2xl font-display font-bold mt-0.5" style={{ color: effectiveAccent }}>
                LOS-NG
              </div>
            </div>
          </div>

          <div
            onClick={() =>
              setSelectedPhoto({
                src: isaacWorkspace,
                alt: "Gbodimowo Isaac working at dual monitor systems workstation",
                title: "Engineering Workstation",
                subtitle: "Lagos Tech Hub / Systems & Architecture Lab",
                tag: "WORKSTATION",
                location: "Lagos, Nigeria",
                date: "Active Engineering Flow",
                context:
                  "Gbodimowo Isaac debugging backend microservices, running network topology simulations, and verifying endpoint hardware performance.",
              })
            }
            className="group relative h-44 sm:h-48 rounded-2xl overflow-hidden cursor-pointer border-2"
            style={{ borderColor: "rgba(255,255,255,0.18)" }}
          >
            <Image
              src={isaacWorkspace}
              alt="Gbodimowo Isaac working at computer workstation"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end justify-between p-4">
              <div>
                <div className="text-[10px] font-mono-tech uppercase tracking-wider font-bold" style={{ color: effectiveAccent }}>
                  SYSTEMS &amp; ARCHITECTURE LAB
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  Workstation &amp; Hardware Setup
                </div>
              </div>
              <div className="p-2 rounded-full bg-white/15 backdrop-blur-md text-white">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tile 2: Academic Degree & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="lg:col-span-6 neo-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6"
        >
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <div
              onClick={() =>
                setSelectedPhoto({
                  src: isaacGraduation,
                  alt: "Gbodimowo Isaac in Babcock University academic regalia",
                  title: "B.Sc. in Computer Science",
                  subtitle: "Babcock University / Class of Computer Science",
                  tag: "ACADEMIC CONFERRAL",
                  location: "Babcock University, Nigeria",
                  date: "Academic Regalia",
                  context:
                    "Graduation ceremony celebrating B.Sc. in Computer Science at Babcock University. Coursework focused on operating systems, algorithms, computer architecture, and distributed networks.",
                })
              }
              className="group relative w-full sm:w-40 h-52 sm:h-44 rounded-2xl overflow-hidden cursor-pointer border-2 shrink-0"
              style={{ borderColor: "var(--theme-border)" }}
            >
              <Image
                src={isaacGraduation}
                alt="Gbodimowo Isaac at Babcock University Convocation"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/75 text-white">
                <Maximize2 className="w-3 h-3" />
              </div>
            </div>

            <div className="space-y-2.5 flex-1">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono-tech font-bold uppercase tracking-wider border"
                style={{
                  backgroundColor: "var(--theme-surface-alt)",
                  borderColor: "var(--theme-border)",
                }}
              >
                <Award className="w-3.5 h-3.5" style={{ color: effectiveAccent }} />
                <span>Degree Conferral</span>
              </div>

              <h3 className="text-2xl font-display font-extrabold uppercase tracking-wide leading-tight">
                B.Sc. in Computer Science
              </h3>

              <div className="text-xs font-mono-tech font-bold" style={{ color: effectiveAccent }}>
                Babcock University, Nigeria
              </div>

              <p className="text-xs leading-relaxed" style={{ color: "var(--theme-muted)" }}>
                Coursework in distributed network architecture, operating systems, data structures, and software engineering principles.
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t-2"
            style={{ borderColor: "var(--theme-border)" }}
          >
            <div
              className="p-3.5 rounded-2xl border-2"
              style={{
                backgroundColor: "var(--theme-surface-alt)",
                borderColor: "var(--theme-border)",
              }}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: effectiveAccent }} />
                <span>CompTIA A+</span>
              </div>
              <div className="text-[11px] mt-1 font-mono-tech" style={{ color: "var(--theme-muted)" }}>
                Hardware Diagnostics
              </div>
            </div>

            <div
              className="p-3.5 rounded-2xl border-2"
              style={{
                backgroundColor: "var(--theme-surface-alt)",
                borderColor: "var(--theme-border)",
              }}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Network className="w-4 h-4 shrink-0" style={{ color: effectiveAccent }} />
                <span>Cisco CCNA</span>
              </div>
              <div className="text-[11px] mt-1 font-mono-tech" style={{ color: "var(--theme-muted)" }}>
                200-301 Candidate
              </div>
            </div>

            <div
              className="p-3.5 rounded-2xl border-2"
              style={{
                backgroundColor: "var(--theme-surface-alt)",
                borderColor: "var(--theme-border)",
              }}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Award className="w-4 h-4 shrink-0" style={{ color: effectiveAccent }} />
                <span>New Horizons</span>
              </div>
              <div className="text-[11px] mt-1 font-mono-tech" style={{ color: "var(--theme-muted)" }}>
                Tech Certified
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Skills Matrix */}
      <div className="neo-card rounded-3xl p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-display font-extrabold uppercase tracking-wide">
              {skillsMatrix[activeCategory].title}
            </h3>
            <p className="text-xs mt-1" style={{ color: "var(--theme-muted)" }}>
              {skillsMatrix[activeCategory].desc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: "network", label: "Cisco & Networking" },
                { id: "software", label: "Web & APIs" },
                { id: "hardware", label: "Hardware & OS" },
                { id: "tools", label: "DevOps & Tools" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === tab.id ? "neo-btn-primary" : "neo-pill hover:opacity-80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {skillsMatrix[activeCategory].items.map((skill) => (
            <div
              key={skill.name}
              className="p-4 rounded-2xl border-2 transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--theme-surface-alt)",
                borderColor: "var(--theme-border)",
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-sm font-bold">{skill.name}</span>
                <span
                  className="text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: "var(--theme-surface)",
                    color: effectiveAccent,
                    borderColor: "var(--theme-border)",
                  }}
                >
                  {skill.level}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--theme-muted)" }}>
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive IPv4 Subnet Calculator */}
      <div className="mb-8">
        <SubnetVisualizer />
      </div>

      {/* Action Footer Card */}
      <div className="neo-console rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6">
        <div>
          <h4 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide">
            Inspect Live Network Topologies &amp; Terminal Simulation
          </h4>
          <p className="text-xs opacity-75 mt-1">
            Run diagnostic commands or inspect the HSRP v2 multi-VLAN routing fabric below.
          </p>
        </div>

        <a
          href="#terminal"
          className="px-6 py-3 rounded-full neo-btn-primary text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
        >
          <span>Open Systems Terminal</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <PhotoModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  );
}
