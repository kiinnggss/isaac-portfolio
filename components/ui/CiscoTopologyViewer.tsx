"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Server, ShieldCheck, Cpu, Terminal, ArrowRight, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound";

interface TopologyNode {
  id: string;
  name: string;
  type: "router" | "switch" | "server" | "vlan";
  ip: string;
  status: string;
  detail: string;
  cliSnippet: string;
}

export default function CiscoTopologyViewer() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("r1");

  const nodes: Record<string, TopologyNode> = {
    r1: {
      id: "r1",
      name: "R1-CORE-GW (Active)",
      type: "router",
      ip: "192.168.20.2 (VIP: 192.168.20.1)",
      status: "HSRP v2 Active • Priority 110",
      detail: "Cisco ISR 4331 Gateway. Handles primary traffic forwarding with preemption enabled. Encapsulation dot1Q sub-interfaces for inter-VLAN routing.",
      cliSnippet: `interface GigabitEthernet0/0.20
 description Corporate_Management_VLAN20
 encapsulation dot1Q 20
 ip address 192.168.20.2 255.255.255.0
 standby version 2
 standby 20 ip 192.168.20.1
 standby 20 priority 110
 standby 20 preempt`,
    },
    r2: {
      id: "r2",
      name: "R2-BACKUP-GW (Standby)",
      type: "router",
      ip: "192.168.20.3 (VIP: 192.168.20.1)",
      status: "HSRP v2 Standby • Priority 100",
      detail: "Redundant backup router. Listens for hello packets (3s hello / 10s dead timer). Assumes active gateway role within 10 seconds if R1 fails.",
      cliSnippet: `interface GigabitEthernet0/0.20
 description Corporate_Management_VLAN20
 encapsulation dot1Q 20
 ip address 192.168.20.3 255.255.255.0
 standby version 2
 standby 20 ip 192.168.20.1
 standby 20 priority 100`,
    },
    sw1: {
      id: "sw1",
      name: "SW1-DIST-CORE",
      type: "switch",
      ip: "192.168.20.5 (Mgmt SVI)",
      status: "Catalyst 3650 • 802.1Q Trunking",
      detail: "Distribution switch with multi-VLAN support. Trunk ports configured with 802.1Q encapsulation, dynamic ARP inspection, and sticky port security.",
      cliSnippet: `interface GigabitEthernet1/0/1
 description TRUNK_TO_R1
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30
 switchport nonegotiate
 spanning-tree portfast trunk`,
    },
    vlan10: {
      id: "vlan10",
      name: "VLAN 10: Engineering Subnet",
      type: "vlan",
      ip: "192.168.10.0/24 (GW: .1)",
      status: "Engineering & DevOps Access",
      detail: "Dedicated broadcast domain for technical workstations. Full outbound access to development clusters, restricted direct SSH access to server farm.",
      cliSnippet: `vlan 10
 name ENGINEERING_WORKSTATIONS
!
ip dhcp pool VLAN10_POOL
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server 8.8.8.8 1.1.1.1`,
    },
    vlan20: {
      id: "vlan20",
      name: "VLAN 20: Corporate Management",
      type: "vlan",
      ip: "192.168.20.0/24 (VIP: .1)",
      status: "Administrative Tier • HSRP Protected",
      detail: "Corporate management segment with HSRP virtual IP default gateway. Traffic is monitored with extended ACLs and rate-policing.",
      cliSnippet: `vlan 20
 name CORPORATE_MANAGEMENT
!
ip access-list extended RESTRICT_SERVER_FARM
 permit tcp 192.168.20.0 0.0.0.255 host 192.168.30.10 eq 443
 permit tcp 192.168.10.0 0.0.0.255 host 192.168.30.10 eq 22
 deny ip any 192.168.30.0 0.0.0.255 log`,
    },
    server: {
      id: "server",
      name: "SRV-DMZ-01",
      type: "server",
      ip: "192.168.30.10/24",
      status: "Production App & Database Node",
      detail: "Enterprise server hosting web platforms and database endpoints. Protected behind Layer 4 ACLs and static inside NAT translation.",
      cliSnippet: `ip nat inside source static 192.168.30.10 203.0.113.10
!
interface GigabitEthernet0/1
 description WAN_OUTSIDE_INTERFACE
 ip nat outside
!
interface GigabitEthernet0/0.30
 description DMZ_SERVER_FARM
 ip nat inside`,
    },
  };

  const selectedNode = nodes[selectedNodeId] || nodes.r1;

  const handleSelect = (id: string) => {
    sound.playClick();
    setSelectedNodeId(id);
  };

  return (
    <div className="rounded-2xl bg-neutral-900/50 border border-white/10 p-5 sm:p-7 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              Interactive Cisco IOS Topology Visualizer
            </h4>
            <div className="text-[11px] font-mono-tech text-neutral-400">
              Router-on-a-Stick • HSRP v2 Gateway Redundancy • 802.1Q Trunking
            </div>
          </div>
        </div>

        <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded bg-neutral-800 text-[#bfff04] border border-[#bfff04]/20 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#bfff04] animate-pulse" />
          LIVE TOPOLOGY SIMULATION
        </span>
      </div>

      {/* SVG Interactive Topology Diagram */}
      <div className="relative my-6 rounded-xl bg-neutral-950 border border-white/10 p-4 overflow-x-auto">
        <svg
          viewBox="0 0 740 320"
          className="w-full min-w-[580px] h-auto select-none"
        >
          {/* Animated Connecting Trunks */}
          {/* R1 to SW1 */}
          <line
            x1="260"
            y1="70"
            x2="370"
            y2="170"
            stroke="#bfff04"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            className="animate-pulse opacity-80"
          />
          {/* R2 to SW1 */}
          <line
            x1="480"
            y1="70"
            x2="370"
            y2="170"
            stroke="#00f0ff"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="opacity-50"
          />
          {/* SW1 to VLAN10 */}
          <line
            x1="370"
            y1="170"
            x2="160"
            y2="265"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2"
          />
          {/* SW1 to VLAN20 */}
          <line
            x1="370"
            y1="170"
            x2="370"
            y2="265"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2"
          />
          {/* SW1 to Server */}
          <line
            x1="370"
            y1="170"
            x2="580"
            y2="265"
            stroke="#bfff04"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="opacity-70"
          />

          {/* Nodes */}

          {/* R1 (Active) */}
          <g
            onClick={() => handleSelect("r1")}
            className="cursor-pointer group"
          >
            <rect
              x="200"
              y="35"
              width="120"
              height="55"
              rx="10"
              fill="#121212"
              stroke={selectedNodeId === "r1" ? "#bfff04" : "rgba(255,255,255,0.2)"}
              strokeWidth={selectedNodeId === "r1" ? "2.5" : "1"}
            />
            <text x="260" y="58" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace">
              R1 (Active)
            </text>
            <text x="260" y="75" textAnchor="middle" fill="#bfff04" fontSize="10" fontFamily="monospace">
              HSRP Pri 110
            </text>
          </g>

          {/* R2 (Standby) */}
          <g
            onClick={() => handleSelect("r2")}
            className="cursor-pointer group"
          >
            <rect
              x="420"
              y="35"
              width="120"
              height="55"
              rx="10"
              fill="#121212"
              stroke={selectedNodeId === "r2" ? "#00f0ff" : "rgba(255,255,255,0.2)"}
              strokeWidth={selectedNodeId === "r2" ? "2.5" : "1"}
            />
            <text x="480" y="58" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace">
              R2 (Standby)
            </text>
            <text x="480" y="75" textAnchor="middle" fill="#00f0ff" fontSize="10" fontFamily="monospace">
              HSRP Pri 100
            </text>
          </g>

          {/* HSRP Redundancy Cloud Virtual IP */}
          <rect
            x="320"
            y="20"
            width="100"
            height="24"
            rx="6"
            fill="#080808"
            stroke="rgba(191,255,4,0.4)"
            strokeWidth="1"
          />
          <text x="370" y="36" textAnchor="middle" fill="#bfff04" fontSize="9" fontFamily="monospace">
            VIP 192.168.20.1
          </text>

          {/* SW1 (Distribution Switch) */}
          <g
            onClick={() => handleSelect("sw1")}
            className="cursor-pointer group"
          >
            <rect
              x="300"
              y="145"
              width="140"
              height="50"
              rx="8"
              fill="#141414"
              stroke={selectedNodeId === "sw1" ? "#bfff04" : "rgba(255,255,255,0.2)"}
              strokeWidth={selectedNodeId === "sw1" ? "2.5" : "1"}
            />
            <text x="370" y="167" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace">
              SW1-DIST-CORE
            </text>
            <text x="370" y="183" textAnchor="middle" fill="#999" fontSize="10" fontFamily="monospace">
              802.1Q Multi-VLAN
            </text>
          </g>

          {/* VLAN 10 (Engineering) */}
          <g
            onClick={() => handleSelect("vlan10")}
            className="cursor-pointer group"
          >
            <rect
              x="100"
              y="245"
              width="120"
              height="50"
              rx="8"
              fill="#0f0f0f"
              stroke={selectedNodeId === "vlan10" ? "#bfff04" : "rgba(255,255,255,0.15)"}
              strokeWidth={selectedNodeId === "vlan10" ? "2" : "1"}
            />
            <text x="160" y="267" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">
              VLAN 10
            </text>
            <text x="160" y="283" textAnchor="middle" fill="#888" fontSize="9" fontFamily="monospace">
              192.168.10.0/24
            </text>
          </g>

          {/* VLAN 20 (Management) */}
          <g
            onClick={() => handleSelect("vlan20")}
            className="cursor-pointer group"
          >
            <rect
              x="310"
              y="245"
              width="120"
              height="50"
              rx="8"
              fill="#0f0f0f"
              stroke={selectedNodeId === "vlan20" ? "#bfff04" : "rgba(255,255,255,0.15)"}
              strokeWidth={selectedNodeId === "vlan20" ? "2" : "1"}
            />
            <text x="370" y="267" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">
              VLAN 20
            </text>
            <text x="370" y="283" textAnchor="middle" fill="#888" fontSize="9" fontFamily="monospace">
              192.168.20.0/24
            </text>
          </g>

          {/* Server Farm (DMZ) */}
          <g
            onClick={() => handleSelect("server")}
            className="cursor-pointer group"
          >
            <rect
              x="520"
              y="245"
              width="120"
              height="50"
              rx="8"
              fill="#0f0f0f"
              stroke={selectedNodeId === "server" ? "#bfff04" : "rgba(255,255,255,0.15)"}
              strokeWidth={selectedNodeId === "server" ? "2" : "1"}
            />
            <text x="580" y="267" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">
              SRV-DMZ-01
            </text>
            <text x="580" y="283" textAnchor="middle" fill="#00f0ff" fontSize="9" fontFamily="monospace">
              192.168.30.10
            </text>
          </g>
        </svg>

        <div className="text-center text-[10px] font-mono-tech text-neutral-500 mt-1">
          Click any device or network segment above to inspect Cisco IOS running configuration
        </div>
      </div>

      {/* Selected Device Telemetry & CLI Inspector */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 rounded-xl bg-neutral-950 border border-white/5"
        >
          {/* Device Metadata */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tech text-[#bfff04] font-bold">
                {selectedNode.name}
              </span>
              <span className="text-[10px] font-mono-tech text-neutral-400 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                {selectedNode.ip}
              </span>
            </div>

            <div className="text-xs font-mono-tech text-[#00f0ff]">
              {selectedNode.status}
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              {selectedNode.detail}
            </p>

            <div className="pt-2 border-t border-white/5 text-[11px] font-mono-tech text-neutral-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#bfff04]" />
              <span>Verified in Cisco Packet Tracer 8.2</span>
            </div>
          </div>

          {/* Running Config Output */}
          <div className="lg:col-span-7">
            <div className="rounded-lg bg-black border border-neutral-800 p-3 overflow-x-auto text-[11px] font-mono-tech text-neutral-300 leading-relaxed max-h-48 overflow-y-auto">
              <div className="text-neutral-500 pb-1.5 mb-1.5 border-b border-neutral-900 flex items-center justify-between text-[10px]">
                <span>CISCO IOS RUNNING CONFIGURATION</span>
                <span className="text-[#bfff04]">ACTIVE</span>
              </div>
              <pre className="text-emerald-400 font-mono-tech whitespace-pre">
                {selectedNode.cliSnippet}
              </pre>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
