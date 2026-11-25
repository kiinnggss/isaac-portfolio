"use client";

import { useState } from "react";
import { Network, ShieldCheck, Award } from "lucide-react";
import SubnetVisualizer from "./SubnetVisualizer";
import { usePortfolioTheme } from "./ThemeProvider";

export default function BentoGrid() {
  const [activeCategory, setActiveCategory] = useState<"network" | "software" | "hardware" | "tools">("network");
  const { effectiveAccent } = usePortfolioTheme();

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
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight">
          Technical Matrix &amp; Credentials
        </h2>
        <p className="mt-3 text-base max-w-[60ch]" style={{ color: "var(--theme-muted)" }}>
          Dual-competency stack spanning full-stack web applications, enterprise Cisco networking, and hardware diagnostics.
        </p>
      </div>

      {/* Compact Verified Certifications Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="neo-card rounded-2xl p-4 sm:p-5 flex items-center gap-3.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border-2 shrink-0"
            style={{
              backgroundColor: "var(--theme-surface-alt)",
              borderColor: "var(--theme-border)",
            }}
          >
            <ShieldCheck className="w-5 h-5" style={{ color: effectiveAccent }} />
          </div>
          <div>
            <div className="text-sm font-display font-extrabold uppercase tracking-wide">
              CompTIA A+ Certified
            </div>
            <div className="text-xs font-mono-tech" style={{ color: "var(--theme-muted)" }}>
              Hardware &amp; Systems Diagnostics
            </div>
          </div>
        </div>

        <div className="neo-card rounded-2xl p-4 sm:p-5 flex items-center gap-3.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border-2 shrink-0"
            style={{
              backgroundColor: "var(--theme-surface-alt)",
              borderColor: "var(--theme-border)",
            }}
          >
            <Network className="w-5 h-5" style={{ color: effectiveAccent }} />
          </div>
          <div>
            <div className="text-sm font-display font-extrabold uppercase tracking-wide">
              Cisco CCNA 200-301
            </div>
            <div className="text-xs font-mono-tech" style={{ color: "var(--theme-muted)" }}>
              Candidate · Enterprise Routing
            </div>
          </div>
        </div>

        <div className="neo-card rounded-2xl p-4 sm:p-5 flex items-center gap-3.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border-2 shrink-0"
            style={{
              backgroundColor: "var(--theme-surface-alt)",
              borderColor: "var(--theme-border)",
            }}
          >
            <Award className="w-5 h-5" style={{ color: effectiveAccent }} />
          </div>
          <div>
            <div className="text-sm font-display font-extrabold uppercase tracking-wide">
              New Horizons Certified
            </div>
            <div className="text-xs font-mono-tech" style={{ color: "var(--theme-muted)" }}>
              Systems &amp; Networking Track
            </div>
          </div>
        </div>
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
      <div>
        <SubnetVisualizer />
      </div>
    </section>
  );
}
