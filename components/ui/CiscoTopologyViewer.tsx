"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Server, ShieldCheck, Cpu, Terminal, ArrowRight, CheckCircle2 } from "lucide-react";

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
      detail: "Cisco ISR 4331 Gateway. Handles primary traffic forwarding with preemption enabled. Sub-interfaces configured with dot1Q encapsulation for inter-VLAN routing.",
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
      detail: "Redundant backup router listening for hello packets (3s hello / 10s dead timer). Assumes active gateway role within 10 seconds if R1 fails.",
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
      detail: "Dedicated broadcast domain for technical workstations with outbound access to development clusters and restricted direct access to DMZ.",
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
      detail: "Corporate management segment with HSRP virtual IP default gateway. Traffic is filtered using extended ACLs.",
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
      detail: "Enterprise server hosting web platforms and database endpoints. Protected behind Layer 4 ACLs and static NAT translation.",
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
    setSelectedNodeId(id);
  };

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Interactive Cisco IOS Topology Visualizer
            </h4>
            <div className="text-xs text-slate-500">
              Router-on-a-Stick • HSRP v2 Redundancy • 802.1Q Trunks • Extended ACLs
            </div>
          </div>
        </div>

        <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
          Click nodes to inspect running IOS config
        </span>
      </div>

      {/* SVG Interactive Topology Diagram */}
      <div className="relative my-6 rounded-xl bg-slate-50 border border-slate-200 p-4 overflow-x-auto">
        <svg
          viewBox="0 0 740 320"
          className="w-full min-w-[580px] h-auto select-none"
        >
          {/* Connecting Trunks */}
          {/* R1 to SW1 */}
          <line
            x1="260"
            y1="70"
            x2="370"
            y2="170"
            stroke="#2563eb"
            strokeWidth="2"
            strokeDasharray="5 3"
          />
          {/* R2 to SW1 */}
          <line
            x1="480"
            y1="70"
            x2="370"
            y2="170"
            stroke="#64748b"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* SW1 to VLAN10 */}
          <line
            x1="370"
            y1="170"
            x2="160"
            y2="265"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          {/* SW1 to VLAN20 */}
          <line
            x1="370"
            y1="170"
            x2="370"
            y2="265"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          {/* SW1 to Server */}
          <line
            x1="370"
            y1="170"
            x2="580"
            y2="265"
            stroke="#2563eb"
            strokeWidth="2"
            strokeDasharray="5 3"
          />

          {/* Nodes */}

          {/* R1 (Active) */}
          <g
            onClick={() => handleSelect("r1")}
            className="cursor-pointer"
          >
            <rect
              x="200"
              y="35"
              width="120"
              height="55"
              rx="8"
              fill="#ffffff"
              stroke={selectedNodeId === "r1" ? "#2563eb" : "#cbd5e1"}
              strokeWidth={selectedNodeId === "r1" ? "2" : "1"}
            />
            <text x="260" y="58" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">
              R1 (Active)
            </text>
            <text x="260" y="75" textAnchor="middle" fill="#2563eb" fontSize="10" fontWeight="500">
              HSRP Pri 110
            </text>
          </g>

          {/* R2 (Standby) */}
          <g
            onClick={() => handleSelect("r2")}
            className="cursor-pointer"
          >
            <rect
              x="420"
              y="35"
              width="120"
              height="55"
              rx="8"
              fill="#ffffff"
              stroke={selectedNodeId === "r2" ? "#2563eb" : "#cbd5e1"}
              strokeWidth={selectedNodeId === "r2" ? "2" : "1"}
            />
            <text x="480" y="58" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">
              R2 (Standby)
            </text>
            <text x="480" y="75" textAnchor="middle" fill="#64748b" fontSize="10">
              HSRP Pri 100
            </text>
          </g>

          {/* Virtual IP Tag */}
          <rect
            x="320"
            y="20"
            width="100"
            height="24"
            rx="4"
            fill="#eff6ff"
            stroke="#bfdbfe"
          />
          <text x="370" y="36" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="bold">
            VIP: .20.1
          </text>

          {/* SW1 (Distribution Switch) */}
          <g
            onClick={() => handleSelect("sw1")}
            className="cursor-pointer"
          >
            <rect
              x="300"
              y="140"
              width="140"
              height="55"
              rx="8"
              fill="#ffffff"
              stroke={selectedNodeId === "sw1" ? "#2563eb" : "#cbd5e1"}
              strokeWidth={selectedNodeId === "sw1" ? "2" : "1"}
            />
            <text x="370" y="163" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">
              SW1-DIST-CORE
            </text>
            <text x="370" y="180" textAnchor="middle" fill="#64748b" fontSize="10">
              Catalyst 3650
            </text>
          </g>

          {/* VLAN 10 */}
          <g
            onClick={() => handleSelect("vlan10")}
            className="cursor-pointer"
          >
            <rect
              x="100"
              y="245"
              width="120"
              height="50"
              rx="8"
              fill="#ffffff"
              stroke={selectedNodeId === "vlan10" ? "#2563eb" : "#cbd5e1"}
              strokeWidth={selectedNodeId === "vlan10" ? "2" : "1"}
            />
            <text x="160" y="267" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">
              VLAN 10: Eng
            </text>
            <text x="160" y="282" textAnchor="middle" fill="#64748b" fontSize="9">
              192.168.10.0/24
            </text>
          </g>

          {/* VLAN 20 */}
          <g
            onClick={() => handleSelect("vlan20")}
            className="cursor-pointer"
          >
            <rect
              x="310"
              y="245"
              width="120"
              height="50"
              rx="8"
              fill="#ffffff"
              stroke={selectedNodeId === "vlan20" ? "#2563eb" : "#cbd5e1"}
              strokeWidth={selectedNodeId === "vlan20" ? "2" : "1"}
            />
            <text x="370" y="267" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">
              VLAN 20: Corp
            </text>
            <text x="370" y="282" textAnchor="middle" fill="#64748b" fontSize="9">
              192.168.20.0/24
            </text>
          </g>

          {/* DMZ Server */}
          <g
            onClick={() => handleSelect("server")}
            className="cursor-pointer"
          >
            <rect
              x="520"
              y="245"
              width="120"
              height="50"
              rx="8"
              fill="#ffffff"
              stroke={selectedNodeId === "server" ? "#2563eb" : "#cbd5e1"}
              strokeWidth={selectedNodeId === "server" ? "2" : "1"}
            />
            <text x="580" y="267" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">
              SRV-DMZ-01
            </text>
            <text x="580" y="282" textAnchor="middle" fill="#16a34a" fontSize="9" fontWeight="bold">
              192.168.30.10
            </text>
          </g>
        </svg>
      </div>

      {/* Selected Node Details & Configuration Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        <div className="lg:col-span-5 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-blue-600 uppercase mb-1">
              Active Node Metadata
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              {selectedNode.name}
            </h4>
            <div className="text-xs font-mono-tech text-slate-700 mt-1">
              IP: {selectedNode.ip}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">
              {selectedNode.status}
            </div>
            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              {selectedNode.detail}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500">
            Click another diagram node to view its configuration.
          </div>
        </div>

        {/* Cisco Running Configuration */}
        <div className="lg:col-span-7">
          <div className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span>Cisco IOS Running Configuration Snippet</span>
          </div>
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 text-slate-100 font-mono-tech text-xs overflow-x-auto leading-relaxed max-h-56">
            <pre>{selectedNode.cliSnippet}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
