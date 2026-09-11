"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Play, RefreshCw, CornerDownLeft, Sparkles, Check } from "lucide-react";

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
Tagline: "Architecting resilient digital infrastructure — bridging scalable web development with enterprise networking and systems diagnostics."
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
        text: `TECHNICAL SKILLS INVENTORY:
  • Networking: Cisco IOS, VLANs & 802.1Q Trunking, HSRP, Static/Dynamic NAT, ACLs, Subnetting, Packet Tracer
  • Software:   TypeScript, React, Next.js, Python, Java, REST APIs, Tailwind CSS, PostgreSQL
  • Hardware:   CompTIA A+ diagnostics, component maintenance, PC assembly, macOS Terminal
  • Tools:      Git/GitHub, Linux/Unix shell, Canva, Excel`,
      });
      setLines(newLines);
      setInput("");
      return;
    }

    if (lowerCmd === "cat" && args[0]?.toLowerCase() === "resume") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `EDUCATION & CREDENTIALS:
  [Degree]        B.Sc. in Computer Science — Babcock University
  [Certification] CompTIA A+ Hardware & Systems Diagnostics Certified
  [Certification] New Horizons Technical Certification
  [Candidate]     Cisco CCNA 200-301 Candidate
  [Experience]    Web Developer Intern — Hoffenheim Tech
  [Experience]    Computer Science Instructor — Edkints International School`,
      });
      setLines(newLines);
      setInput("");
      return;
    }

    if (lowerCmd === "neofetch") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `
     .---.      isaac@lagos-edge
    /     \\     ----------------
   | () () |    OS: Isaac-Engine (Next.js 16 + React 19)
    \\  _  /     Host: Babcock University Computer Science
     \`---\`      Uptime: 24/7 Resilient Operations
                Shell: Lagos-ZSH (UTC+1 WAT)
                Network: Cisco IOS / HSRP v2 / VLAN 802.1Q
                Hardware: CompTIA A+ Verified Diagnostic Rig
                Terminal: Interactive Edge Canvas`,
      });
      setLines(newLines);
      setInput("");
      return;
    }

    if (lowerCmd === "hsrp" && args[0]?.toLowerCase() === "status") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `Cisco IOS HSRP Status Table:
Interface    Grp  Pri  P State   Active          Standby         Virtual IP
Gi0/0.10     10   110  P Active  local           192.168.10.3    192.168.10.1
Gi0/0.20     20   110  P Active  local           192.168.20.3    192.168.20.1
Gi0/0.30     30   100  - Standby 192.168.30.2    local           192.168.30.1
[HSRP v2 MD5 Authentication: Active | Convergence: <3.0s]`,
      });
      setLines(newLines);
      setInput("");
      return;
    }

    if (lowerCmd === "vlan" && args[0]?.toLowerCase() === "list") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `VLAN Segmentation Summary:
VLAN  Name             Status    Encapsulation  Subnet CIDR       Port Security
10    MGMT_OPERATIONS  ACTIVE    802.1Q (Gi0/1) 192.168.10.0/24   Sticky MAC (Max 2)
20    ENGINEERING_DEV  ACTIVE    802.1Q (Gi0/2) 192.168.20.0/24   Sticky MAC (Max 1)
30    SERVER_FARM_DMZ  ACTIVE    802.1Q (Gi0/3) 192.168.30.0/24   Strict Port Sec`,
      });
      setLines(newLines);
      setInput("");
      return;
    }

    if (lowerCmd === "traceroute") {
      const host = args[0] || "cloudflare.com";
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        text: `traceroute to ${host} (104.16.132.229), 30 hops max, 60 byte packets
 1  gateway.lagos-edge.internal (192.168.10.1)  1.218 ms  0.945 ms  0.892 ms
 2  core-r1.hsrp.west-africa.net (10.240.1.1)  4.112 ms  3.890 ms  4.015 ms
 3  lagos-ixp-edge01.ng (196.223.23.1)  8.441 ms  7.912 ms  8.110 ms
 4  cloudflare.lagos-ixp.net (196.223.23.2)  14.205 ms  13.910 ms  14.050 ms
[Route resolved with zero packet drops]`,
      });
      setLines(newLines);
      setInput("");
      return;
    }

    if (lowerCmd === "ping") {
      const target = args[0] || "8.8.8.8";
      setLoading(true);
      setLines([
        ...newLines,
        {
          id: (Date.now() + 1).toString(),
          type: "system",
          text: `Executing probe to ${target}... querying backend /api/ping-check`,
        },
      ]);

      try {
        const res = await fetch(`/api/ping-check?target=${encodeURIComponent(target)}&count=4`);
        const data = await res.json();

        if (!res.ok || data.error) {
          setLines((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              type: "error",
              text: `Ping failed: ${data.error || "Unknown target or timeout"}`,
            },
          ]);
        } else {
          const packetLines = data.packets
            .map(
              (p: { seq: number; ttl: number; timeMs: number }) =>
                `64 bytes from ${data.resolvedIp}: icmp_seq=${p.seq} ttl=${p.ttl} time=${p.timeMs} ms`
            )
            .join("\n");

          const summary = `\n--- ${data.target} ping statistics ---
${data.transmitted} packets transmitted, ${data.received} received, ${data.packetLossPercent}% packet loss
rtt min/avg/max/mdev = ${data.rttMin}/${data.rttAvg}/${data.rttMax}/${data.mdev} ms`;

          setLines((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              type: "output",
              text: `${packetLines}${summary}`,
            },
          ]);
        }
      } catch (err: unknown) {
        setLines((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "error",
            text: `Socket probe connection error: ${String(err)}`,
          },
        ]);
      } finally {
        setLoading(false);
        setInput("");
      }
      return;
    }

    if (lowerCmd === "subnet") {
      const cidr = args[0] || "192.168.10.0/24";
      setLoading(true);
      try {
        const res = await fetch(`/api/network/subnet?cidr=${encodeURIComponent(cidr)}`);
        const data = await res.json();

        if (!res.ok || data.error) {
          setLines((prev) => [
            ...newLines,
            {
              id: Date.now().toString(),
              type: "error",
              text: `Subnet error: ${data.error || "Invalid CIDR input"}`,
            },
          ]);
        } else {
          const output = `Subnet Calculation for ${data.cidr}:
  Network Address:   ${data.networkAddress}
  Broadcast Address: ${data.broadcastAddress}
  Subnet Mask:       ${data.subnetMask} (Wildcard: ${data.wildcardMask})
  Usable Host Range: ${data.firstUsableIp} - ${data.lastUsableIp}
  Usable Hosts:      ${data.usableHosts.toLocaleString()} (${data.isPrivate ? "RFC 1918 Private" : "Public"})
  Subnet Mask (Bin): ${data.subnetMaskBinary}`;

          setLines((prev) => [
            ...newLines,
            { id: Date.now().toString(), type: "output", text: output },
          ]);
        }
      } catch (err: unknown) {
        setLines((prev) => [
          ...newLines,
          { id: Date.now().toString(), type: "error", text: `Subnet API error: ${String(err)}` },
        ]);
      } finally {
        setLoading(false);
        setInput("");
      }
      return;
    }

    // Default unknown command
    newLines.push({
      id: (Date.now() + 1).toString(),
      type: "error",
      text: `Command not recognized: '${trimmed}'. Type 'help' to view available commands.`,
    });
    setLines(newLines);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    runCommand(input);
  };

  const presetCommands = [
    "ping 8.8.8.8",
    "subnet 192.168.10.0/24",
    "hsrp status",
    "vlan list",
    "traceroute google.com",
    "neofetch",
    "whoami",
    "cat resume",
  ];

  return (
    <div className="rounded-2xl bg-black border border-white/15 overflow-hidden shadow-2xl">
      {/* Top Chrome Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/90 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs font-mono-tech text-neutral-400 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-[#bfff04]" />
            isaac@lagos-edge: ~ (Next.js & Cisco CLI Engine)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono-tech text-neutral-500 hidden sm:inline">
            Status: Operational
          </span>
          <button
            type="button"
            onClick={() => runCommand("clear")}
            className="p-1 rounded text-neutral-400 hover:text-white"
            title="Clear terminal"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset Quick Actions */}
      <div className="flex flex-wrap items-center gap-1.5 p-3 bg-neutral-950/90 border-b border-white/5">
        <span className="text-[11px] font-mono-tech text-neutral-500 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#00f0ff]" /> Presets:
        </span>
        {presetCommands.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => runCommand(cmd)}
            disabled={loading}
            className="px-2.5 py-1 rounded-md text-[11px] font-mono-tech bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-[#bfff04] border border-neutral-800 hover:border-[#bfff04]/30 transition-all disabled:opacity-50"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Screen */}
      <div className="p-4 sm:p-6 font-mono-tech text-xs sm:text-sm h-96 overflow-y-auto space-y-2.5 selection:bg-[#bfff04] selection:text-black">
        {lines.map((line) => (
          <div key={line.id} className="leading-relaxed">
            {line.type === "input" && (
              <span className="text-[#bfff04] font-semibold">{line.text}</span>
            )}
            {line.type === "system" && (
              <span className="text-neutral-500">{line.text}</span>
            )}
            {line.type === "output" && (
              <pre className="text-neutral-200 whitespace-pre-wrap font-mono-tech">
                {line.text}
              </pre>
            )}
            {line.type === "error" && (
              <span className="text-rose-400">{line.text}</span>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-[#00f0ff]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span>Transmitting packet probe...</span>
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-4 py-3 bg-neutral-950 border-t border-white/10"
      >
        <span className="text-[#bfff04] font-mono-tech text-xs sm:text-sm select-none font-bold">
          isaac@lagos-edge:~$
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'help' or command (e.g. ping 8.8.8.8)..."
          disabled={loading}
          className="flex-1 bg-transparent border-none text-white text-xs sm:text-sm font-mono-tech focus:outline-none placeholder:text-neutral-600"
          autoFocus
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-[#bfff04] hover:bg-neutral-700 disabled:opacity-40 transition-colors"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
