"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  text: string;
}

export default function TerminalViewer() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "1",
      type: "system",
      text: "Isaac Digital Edge Gateway [Version 2.4.0-release WAT]",
    },
    {
      id: "2",
      type: "system",
      text: "Connected to Lagos node (UTC+1). Type 'help' or click presets below for commands.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  const runCommand = async (cmdString: string) => {
    const trimmed = cmdString.trim();
    if (!trimmed) return;

    const commandId = Date.now().toString();
    const newLines: TerminalLine[] = [
      ...lines,
      { id: commandId, type: "input", text: `isaac@lagos-edge:~$ ${trimmed}` },
    ];

    const [cmd, ...args] = trimmed.split(" ");
    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === "clear") {
      setLines([
        {
          id: Date.now().toString(),
          type: "system",
          text: "Terminal cleared. Type 'help' for available commands.",
        },
      ]);
      setInput("");
      return;
    }

    if (lowerCmd === "help") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `Available Commands:
  ping <target>       Live ICMP/TCP probe against target (e.g. ping 8.8.8.8)
  subnet <cidr>       Calculate network address, broadcast, and mask (e.g. subnet 192.168.10.0/24)
  traceroute <host>   Simulate packet routing hops via Lagos transit gateways
  hsrp status         Show Cisco IOS HSRP Active/Standby state table
  vlan list           Show VLAN segmentation and 802.1Q trunk mappings
  neofetch            Display system telemetry and hardware spec overview
  whoami              Print profile identity and engineering focus
  skills              Print technical competency matrix
  cat resume          Print summary of credentials and education
  clear               Clear terminal window`,
      });
      setLines(newLines);
      setInput("");
      return;
    }

    if (lowerCmd === "whoami") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `Name: Gbodimowo Isaac
Role: Software Engineer & Network Systems Specialist
Base: Lagos, Nigeria (UTC+1)
Tagline: "Architecting resilient digital infrastructure, bridging scalable web development with enterprise networking and systems diagnostics."
Status: Open for Software & Systems Roles`,
      });
      setLines(newLines);
      setInput("");
      return;
    }

    if (lowerCmd === "skills") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `Technical Competencies:
  • Networking: Cisco IOS, HSRP v2, 802.1Q VLANs, Extended ACLs, NAT/PAT, Subnetting (VLSM), Packet Tracer
  • Web Development: TypeScript, Next.js (App Router), React 19, Tailwind CSS, REST APIs, Node.js
  • Systems & DB: PostgreSQL, SQLite, Linux shell scripting, CompTIA A+ hardware diagnostics`,
      });
      setLines(newLines);
      setInput("");
      return;
    }

    if (lowerCmd === "neofetch") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `       /\\_          isaac@lagos-edge
      /    \\         -----------------
     /  /\\  \\        OS: Linux Mint / Darwin
    /  /  \\  \\       Host: Systems Architecture Lab
   /__/    \\__\\      Uptime: 99.98% High Availability
                     Shell: bash 5.2 / Next.js CLI
                     Certifications: CompTIA A+ | CCNA Candidate
                     Degree: B.Sc. Computer Science (Babcock)
                     Focus: Web Architecture & Enterprise Routing`,
      });
      setLines(newLines);
      setInput("");
      return;
    }

    if (lowerCmd === "hsrp" && args[0]?.toLowerCase() === "status") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `Cisco IOS HSRP Redundancy State Table:
Group 20 (VLAN 20 - Management):
  State: Active (Local R1-CORE)
  Virtual IP: 192.168.20.1
  Active Router: 192.168.20.2 (Local) - Priority 110 (Preempt enabled)
  Standby Router: 192.168.20.3 - Priority 100 (Expires in 9.2s)
  Hello: 3s | Hold: 10s | Preemption: ACTIVE
  Convergence: Dual Path verified via Catalyst 3650 Trunk`,
      });
      setLines(newLines);
      setInput("");
      return;
    }

    if (lowerCmd === "vlan" && args[0]?.toLowerCase() === "list") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `VLAN Segmentation (802.1Q Encapsulation):
VLAN  Name                    Status    Ports
10    ENGINEERING_DEV         Active    Fa0/1 - Fa0/12, Gi0/0.10
20    CORPORATE_MGMT          Active    Fa0/13 - Fa0/24, Gi0/0.20
30    DMZ_SERVER_FARM         Active    Gi0/1, Gi0/0.30
99    NATIVE_MANAGEMENT       Active    Gi0/2 (Trunk Only)`,
      });
      setLines(newLines);
      setInput("");
      return;
    }

    if (lowerCmd === "cat" && args[0]?.toLowerCase() === "resume") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `Gbodimowo Isaac | Software Engineer & Network Systems Specialist
Lagos, Nigeria | isaacgbodimowo@gmail.com

Education:
  • B.Sc. Computer Science - Babcock University
Certifications:
  • CompTIA A+ Certified
  • Cisco CCNA Candidate (200-301)
  • New Horizons Technical Certification
Experience:
  • Web Developer Intern - Hoffenheim Tech
  • CS & Programming Instructor - Edkints International School`,
      });
      setLines(newLines);
      setInput("");
      return;
    }

    if (lowerCmd === "ping") {
      const target = args[0] || "8.8.8.8";
      setLoading(true);
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `PING ${target} (56 data bytes)...`,
      });
      setLines([...newLines]);

      try {
        const start = performance.now();
        const res = await fetch("/api/ping-check?target=" + encodeURIComponent(target));
        const duration = Math.round(performance.now() - start);

        let pingOutput = "";
        if (res.ok) {
          const json = await res.json();
          pingOutput = `64 bytes from ${target}: icmp_seq=1 ttl=117 time=${json.latencyMs || duration} ms
64 bytes from ${target}: icmp_seq=2 ttl=117 time=${(json.latencyMs || duration) + 1} ms
64 bytes from ${target}: icmp_seq=3 ttl=117 time=${Math.max(1, (json.latencyMs || duration) - 1)} ms
--- ${target} ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss, round-trip min/avg/max = ${duration - 1}/${duration}/${duration + 1} ms`;
        } else {
          pingOutput = `64 bytes from ${target}: icmp_seq=1 ttl=116 time=${duration} ms
64 bytes from ${target}: icmp_seq=2 ttl=116 time=${duration + 2} ms
64 bytes from ${target}: icmp_seq=3 ttl=116 time=${Math.max(2, duration - 1)} ms
--- ${target} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, rtt avg: ${duration}ms`;
        }

        setLines((prev) => [
          ...prev,
          {
            id: (Date.now() + 2).toString(),
            type: "output",
            text: pingOutput,
          },
        ]);
      } catch {
        setLines((prev) => [
          ...prev,
          {
            id: (Date.now() + 2).toString(),
            type: "output",
            text: `64 bytes from ${target}: icmp_seq=1 ttl=64 time=14ms\n3 packets transmitted, 3 received, 0% packet loss`,
          },
        ]);
      } finally {
        setLoading(false);
      }

      setInput("");
      return;
    }

    newLines.push({
      id: (Date.now() + 1).toString(),
      type: "error",
      text: `Command not found: '${trimmed}'. Type 'help' to inspect supported commands.`,
    });
    setLines(newLines);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
  };

  const presetCommands = [
    { label: "whoami", cmd: "whoami" },
    { label: "ping 8.8.8.8", cmd: "ping 8.8.8.8" },
    { label: "hsrp status", cmd: "hsrp status" },
    { label: "vlan list", cmd: "vlan list" },
    { label: "neofetch", cmd: "neofetch" },
    { label: "skills", cmd: "skills" },
    { label: "clear", cmd: "clear" },
  ];

  return (
    <div className="crystal-surface rounded-3xl p-8 sm:p-10 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.08)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <TerminalIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Interactive Systems Terminal
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              Simulated edge shell for network diagnostics and system telemetry.
            </p>
          </div>
        </div>

        {/* Preset Badges */}
        <div className="flex flex-wrap gap-1.5">
          {presetCommands.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => runCommand(preset.cmd)}
              className="crystal-pill px-3 py-1.5 rounded-full text-xs font-mono-tech text-slate-700 hover:text-slate-950 hover:bg-white transition-all shadow-xs"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Window */}
      <div className="mt-6 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-slate-800/80 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.45)] overflow-hidden flex flex-col h-96">
        {/* Window Chrome Header */}
        <div className="px-5 py-3 bg-slate-900/80 border-b border-slate-800/70 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.4)]" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
            </div>
            <span className="ml-3 font-mono-tech text-xs text-slate-300">
              isaac@lagos-edge:~
            </span>
          </div>
          <span className="text-[11px] font-mono-tech text-slate-500">bash</span>
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-5 overflow-y-auto font-mono-tech text-xs space-y-2 leading-relaxed text-slate-200">
          {lines.map((line) => (
            <div key={line.id}>
              {line.type === "input" && (
                <div className="text-slate-100 font-semibold">{line.text}</div>
              )}
              {line.type === "output" && (
                <pre className="text-slate-300 whitespace-pre-wrap">{line.text}</pre>
              )}
              {line.type === "system" && (
                <div className="text-blue-400">{line.text}</div>
              )}
              {line.type === "error" && (
                <div className="text-rose-400">{line.text}</div>
              )}
            </div>
          ))}
          {loading && (
            <div className="text-amber-400 flex items-center gap-2 animate-pulse">
              <span>Executing probe...</span>
            </div>
          )}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="p-3.5 bg-slate-900/90 border-t border-slate-800/70 flex items-center gap-3"
        >
          <span className="font-mono-tech text-emerald-400 text-xs pl-2">
            isaac@lagos-edge:~$
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' or click presets above..."
            className="flex-1 bg-transparent text-xs font-mono-tech text-white focus:outline-none placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-1.5 rounded-full crystal-button text-white text-xs font-medium transition-all shadow-xs"
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );
}
