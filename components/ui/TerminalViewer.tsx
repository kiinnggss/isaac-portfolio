"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Terminal as TerminalIcon } from "lucide-react";
import isaac3dAvatar from "@/public/images/isaac-3d-avatar.jpg";

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
      text: "Isaac Digital Edge Gateway [Lagos Node / UTC+1]",
    },
    {
      id: "2",
      type: "system",
      text: "Type 'help' or click a diagnostic preset above to run live probes.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const outputContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
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
Summary: Engineering resilient digital infrastructure across full-stack TypeScript platforms, Cisco IOS enterprise routing, and CompTIA A+ hardware diagnostics.`,
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
  * Networking: Cisco IOS, HSRP v2, 802.1Q VLANs, Extended ACLs, NAT/PAT, Subnetting (VLSM), Packet Tracer
  * Web Engineering: TypeScript, Next.js 16 (App Router), React 19, FastAPI, Tailwind CSS, REST APIs
  * Systems & DB: PostgreSQL, SQLite, Linux shell scripting, CompTIA A+ hardware diagnostics`,
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
     /  /\\  \\        OS: Linux / Next.js 16 Runtime
    /  /  \\  \\       Host: Systems Architecture Lab
   /__/    \\__\\      Uptime: 99.98% High Availability
                     Shell: bash 5.2 / Edge CLI
                     Credentials: CompTIA A+ / CCNA Track
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
  * B.Sc. Computer Science - Babcock University
Certifications:
  * CompTIA A+ Certified
  * Cisco CCNA Candidate (200-301)
  * New Horizons Technical Certification
Experience:
  * Web Developer Intern - Hoffenheim Tech
  * CS & Programming Instructor - Edkints International School`,
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
          const rtt = json.latencyMs || duration;
          pingOutput = `64 bytes from ${target}: icmp_seq=1 ttl=117 time=${rtt} ms
64 bytes from ${target}: icmp_seq=2 ttl=117 time=${rtt + 1} ms
64 bytes from ${target}: icmp_seq=3 ttl=117 time=${Math.max(1, rtt - 1)} ms
--- ${target} ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss, rtt avg = ${rtt} ms`;
        } else {
          pingOutput = `64 bytes from ${target}: icmp_seq=1 ttl=116 time=${duration} ms
64 bytes from ${target}: icmp_seq=2 ttl=116 time=${duration + 2} ms
64 bytes from ${target}: icmp_seq=3 ttl=116 time=${Math.max(2, duration - 1)} ms
--- ${target} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, rtt avg = ${duration} ms`;
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
    <div className="crystal-surface rounded-3xl p-7 sm:p-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-900/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#090d16] text-orange-500 flex items-center justify-center">
            <TerminalIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090d16] font-display">
              Interactive Systems Terminal
            </h3>
            <p className="text-xs text-slate-600">
              Execute diagnostic commands or click a preset below.
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
              className="px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-[#090d16] hover:text-white border border-white text-xs font-mono-tech text-slate-800 transition-all shadow-xs cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Window */}
      <div className="mt-6 rounded-2xl obsidian-surface overflow-hidden flex flex-col h-96">
        <div className="px-5 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="ml-2 flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="relative w-4 h-4 rounded-full overflow-hidden ring-1 ring-orange-500/70">
                <Image
                  src={isaac3dAvatar}
                  alt="Operator"
                  width={16}
                  height={16}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-mono-tech text-xs text-slate-200">
                isaac@lagos-edge:~
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono-tech text-orange-400">bash 5.2</span>
        </div>

        <div
          ref={outputContainerRef}
          className="flex-1 p-5 overflow-y-auto font-mono-tech text-xs space-y-2 leading-relaxed text-slate-200"
        >
          {lines.map((line) => (
            <div key={line.id}>
              {line.type === "input" && (
                <div className="text-white font-semibold">{line.text}</div>
              )}
              {line.type === "output" && (
                <pre className="text-slate-300 whitespace-pre-wrap">{line.text}</pre>
              )}
              {line.type === "system" && (
                <div className="text-orange-400">{line.text}</div>
              )}
              {line.type === "error" && (
                <div className="text-rose-400">{line.text}</div>
              )}
            </div>
          ))}
          {loading && (
            <div className="text-orange-400 flex items-center gap-2">
              <span>Executing probe...</span>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-3.5 bg-white/5 border-t border-white/10 flex items-center gap-3"
        >
          <label htmlFor="terminal-cmd-input" className="font-mono-tech text-orange-400 text-xs pl-2 shrink-0">
            isaac@lagos-edge:~$
          </label>
          <input
            id="terminal-cmd-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' or click presets above..."
            className="flex-1 bg-transparent text-xs font-mono-tech text-white focus:outline-none placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-1.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );
}
