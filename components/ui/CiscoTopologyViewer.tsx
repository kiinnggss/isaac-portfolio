"use client";

import { useState } from "react";
import { Network, Terminal, Copy, Check } from "lucide-react";

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
  const [copied, setCopied] = useState(false);

  const nodes: Record<string, TopologyNode> = {
    r1: {
      id: "r1",
      name: "R1-CORE-GW (Active)",
      type: "router",
      ip: "192.168.20.2 (VIP: 192.168.20.1)",
      status: "HSRP v2 Active / Priority 110",
      detail:
        "Cisco ISR 4331 Gateway. Handles primary traffic forwarding with preemption enabled. Sub-interfaces configured with dot1Q encapsulation for inter-VLAN routing.",
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
      status: "HSRP v2 Standby / Priority 100",
      detail:
        "Redundant backup router listening for hello packets (3s hello / 10s dead timer). Assumes active gateway role automatically if R1 fails.",
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
      status: "Catalyst 3650 / 802.1Q Trunking",
      detail:
        "Distribution switch with multi-VLAN support. Trunk ports configured with 802.1Q encapsulation, dynamic ARP inspection, and sticky MAC port security.",
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
      detail:
        "Dedicated broadcast domain for technical workstations with outbound access to development clusters and restricted direct access to DMZ.",
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
      status: "Administrative Tier / HSRP Protected",
      detail:
        "Corporate management segment with HSRP virtual IP default gateway. Traffic is filtered using extended IPv4 ACLs.",
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
      detail:
        "Enterprise server hosting web platforms and database endpoints. Protected behind Layer 4 ACLs and static NAT translation.",
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

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedNode.cliSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="crystal-surface rounded-3xl p-7 sm:p-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-900/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#090d16] flex items-center justify-center text-orange-500">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090d16] font-display">
              Interactive Cisco IOS Topology Visualizer
            </h3>
            <div className="text-xs font-mono-tech text-slate-600">
              Router-on-a-Stick / HSRP v2 Redundancy / 802.1Q Trunks / Extended ACLs
            </div>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-[#090d16] text-orange-400 text-xs font-mono-tech font-semibold">
          Click any node to inspect running config
        </span>
      </div>

      {/* Obsidian Network Operations Schematic Canvas */}
      <div className="relative my-7 rounded-2xl obsidian-surface p-6 overflow-x-auto">
        <svg
          viewBox="0 0 740 320"
          className="w-full min-w-[580px] h-auto select-none"
        >
          {/* Active & Standby Trunks */}
          <line
            x1="260"
            y1="70"
            x2="370"
            y2="170"
            stroke="#ea580c"
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />
          <line
            x1="480"
            y1="70"
            x2="370"
            y2="170"
            stroke="#475569"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <line
            x1="370"
            y1="170"
            x2="160"
            y2="265"
            stroke="#64748b"
            strokeWidth="2"
          />
          <line
            x1="370"
            y1="170"
            x2="370"
            y2="265"
            stroke="#64748b"
            strokeWidth="2"
          />
          <line
            x1="370"
            y1="170"
            x2="580"
            y2="265"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />

          {/* R1 (Active) */}
          <g onClick={() => setSelectedNodeId("r1")} className="cursor-pointer">
            <rect
              x="200"
              y="35"
              width="120"
              height="55"
              rx="14"
              fill={selectedNodeId === "r1" ? "#1e293b" : "#0f172a"}
              stroke={selectedNodeId === "r1" ? "#ea580c" : "#334155"}
              strokeWidth={selectedNodeId === "r1" ? "2.5" : "1.5"}
            />
            <text x="260" y="58" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
              R1 (Active)
            </text>
            <text x="260" y="75" textAnchor="middle" fill="#fb923c" fontSize="10" fontWeight="600">
              HSRP Pri 110
            </text>
          </g>

          {/* R2 (Standby) */}
          <g onClick={() => setSelectedNodeId("r2")} className="cursor-pointer">
            <rect
              x="420"
              y="35"
              width="120"
              height="55"
              rx="14"
              fill={selectedNodeId === "r2" ? "#1e293b" : "#0f172a"}
              stroke={selectedNodeId === "r2" ? "#ea580c" : "#334155"}
              strokeWidth={selectedNodeId === "r2" ? "2.5" : "1.5"}
            />
            <text x="480" y="58" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
              R2 (Standby)
            </text>
            <text x="480" y="75" textAnchor="middle" fill="#94a3b8" fontSize="10">
              HSRP Pri 100
            </text>
          </g>

          {/* Virtual IP Tag */}
          <rect
            x="315"
            y="20"
            width="110"
            height="26"
            rx="13"
            fill="#ea580c"
          />
          <text x="370" y="37" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
            VIP: 192.168.20.1
          </text>

          {/* SW1 (Distribution Switch) */}
          <g onClick={() => setSelectedNodeId("sw1")} className="cursor-pointer">
            <rect
              x="300"
              y="140"
              width="140"
              height="55"
              rx="14"
              fill={selectedNodeId === "sw1" ? "#1e293b" : "#0f172a"}
              stroke={selectedNodeId === "sw1" ? "#ea580c" : "#334155"}
              strokeWidth={selectedNodeId === "sw1" ? "2.5" : "1.5"}
            />
            <text x="370" y="163" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
              SW1-DIST-CORE
            </text>
            <text x="370" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10">
              Catalyst 3650
            </text>
          </g>

          {/* VLAN 10 */}
          <g onClick={() => setSelectedNodeId("vlan10")} className="cursor-pointer">
            <rect
              x="100"
              y="245"
              width="120"
              height="50"
              rx="12"
              fill={selectedNodeId === "vlan10" ? "#1e293b" : "#0f172a"}
              stroke={selectedNodeId === "vlan10" ? "#ea580c" : "#334155"}
              strokeWidth={selectedNodeId === "vlan10" ? "2.5" : "1.5"}
            />
            <text x="160" y="267" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
              VLAN 10: Eng
            </text>
            <text x="160" y="282" textAnchor="middle" fill="#94a3b8" fontSize="9">
              192.168.10.0/24
            </text>
          </g>

          {/* VLAN 20 */}
          <g onClick={() => setSelectedNodeId("vlan20")} className="cursor-pointer">
            <rect
              x="310"
              y="245"
              width="120"
              height="50"
              rx="12"
              fill={selectedNodeId === "vlan20" ? "#1e293b" : "#0f172a"}
              stroke={selectedNodeId === "vlan20" ? "#ea580c" : "#334155"}
              strokeWidth={selectedNodeId === "vlan20" ? "2.5" : "1.5"}
            />
            <text x="370" y="267" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
              VLAN 20: Corp
            </text>
            <text x="370" y="282" textAnchor="middle" fill="#94a3b8" fontSize="9">
              192.168.20.0/24
            </text>
          </g>

          {/* DMZ Server */}
          <g onClick={() => setSelectedNodeId("server")} className="cursor-pointer">
            <rect
              x="520"
              y="245"
              width="120"
              height="50"
              rx="12"
              fill={selectedNodeId === "server" ? "#1e293b" : "#0f172a"}
              stroke={selectedNodeId === "server" ? "#ea580c" : "#334155"}
              strokeWidth={selectedNodeId === "server" ? "2.5" : "1.5"}
            />
            <text x="580" y="267" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
              SRV-DMZ-01
            </text>
            <text x="580" y="282" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
              192.168.30.10
            </text>
          </g>
        </svg>
      </div>

      {/* Selected Node Metadata & IOS Config Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white/85 border border-white flex flex-col justify-between shadow-xs">
          <div>
            <div className="text-[11px] font-mono-tech font-semibold text-orange-600 uppercase tracking-wider mb-1">
              Selected Node Telemetry
            </div>
            <h4 className="text-xl font-bold text-[#090d16] font-display">
              {selectedNode.name}
            </h4>
            <div className="text-xs font-mono-tech text-slate-800 mt-1.5 font-semibold">
              IP: {selectedNode.ip}
            </div>
            <div className="text-xs text-slate-600 font-mono-tech mt-0.5">
              {selectedNode.status}
            </div>
            <p className="mt-3.5 text-xs text-slate-700 leading-relaxed">
              {selectedNode.detail}
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-900/10 text-[11px] font-mono-tech text-slate-500">
            Select R1, R2, SW1, VLANs, or DMZ Server above
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-semibold text-[#090d16] flex items-center gap-2 font-display">
              <Terminal className="w-4 h-4 text-orange-600" />
              <span>Cisco IOS Running Configuration</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1 rounded-full bg-white/85 hover:bg-white border border-white text-xs font-mono-tech text-slate-800 inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-orange-600" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>
          <div className="flex-1 rounded-2xl obsidian-surface p-5 text-slate-100 font-mono-tech text-xs overflow-x-auto leading-relaxed">
            <pre>{selectedNode.cliSnippet}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
