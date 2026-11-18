"use client";

import { useState } from "react";
import { Network, Terminal, Copy, Check } from "lucide-react";
import { usePortfolioTheme } from "./ThemeProvider";

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
  const { effectiveAccent } = usePortfolioTheme();

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

  const activeNode = nodes[selectedNodeId] || nodes.r1;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeNode.cliSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="neo-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
      {/* Left Interactive NOC Schematic (7 cols) */}
      <div
        className="lg:col-span-7 p-6 sm:p-8 neo-console border-0 border-b-2 lg:border-b-0 lg:border-r-2 flex flex-col justify-between"
        style={{ borderColor: "var(--theme-border)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: effectiveAccent,
                color: "var(--theme-accent-text)",
              }}
            >
              <Network className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display uppercase tracking-wide">
                Enterprise Cisco Packet Tracer Topology
              </h3>
              <p className="text-[11px] font-mono-tech opacity-65">
                Click any node to inspect IOS config &amp; HSRP state
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-mono-tech">
            HSRP VIP: 192.168.20.1
          </span>
        </div>

        {/* SVG Schematic */}
        <div className="w-full overflow-x-auto py-2">
          <svg
            viewBox="0 0 640 340"
            className="w-full min-w-[460px] h-auto select-none"
            role="img"
            aria-label="Interactive Cisco HSRP multi-VLAN topology"
          >
            {/* Trunk & Access Links */}
            <line x1="180" y1="78" x2="320" y2="165" stroke={effectiveAccent} strokeWidth="2.5" strokeDasharray="6 4" />
            <line x1="460" y1="78" x2="320" y2="165" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" />
            <line x1="180" y1="78" x2="460" y2="78" stroke={effectiveAccent} strokeWidth="2" />
            <line x1="320" y1="165" x2="130" y2="270" stroke="#94a3b8" strokeWidth="2" />
            <line x1="320" y1="165" x2="320" y2="270" stroke="#94a3b8" strokeWidth="2" />
            <line x1="320" y1="165" x2="510" y2="270" stroke="#10b981" strokeWidth="2" />

            {/* HSRP Link Label */}
            <rect x="256" y="64" width="128" height="22" rx="11" fill="#1e293b" stroke={effectiveAccent} strokeWidth="1.2" />
            <text x="320" y="79" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="600">
              HSRP v2 SYNC
            </text>

            {/* R1 Active */}
            <g onClick={() => setSelectedNodeId("r1")} className="cursor-pointer">
              <rect
                x="110"
                y="42"
                width="140"
                height="56"
                rx="12"
                fill={selectedNodeId === "r1" ? effectiveAccent : "#111827"}
                stroke={effectiveAccent}
                strokeWidth="2"
              />
              <text x="180" y="66" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">
                R1-CORE-GW
              </text>
              <text x="180" y="84" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">
                Active (.2)
              </text>
            </g>

            {/* R2 Standby */}
            <g onClick={() => setSelectedNodeId("r2")} className="cursor-pointer">
              <rect
                x="390"
                y="42"
                width="140"
                height="56"
                rx="12"
                fill={selectedNodeId === "r2" ? effectiveAccent : "#111827"}
                stroke={selectedNodeId === "r2" ? effectiveAccent : "#475569"}
                strokeWidth="2"
              />
              <text x="460" y="66" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">
                R2-BACKUP-GW
              </text>
              <text x="460" y="84" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
                Standby (.3)
              </text>
            </g>

            {/* SW1 Core */}
            <g onClick={() => setSelectedNodeId("sw1")} className="cursor-pointer">
              <rect
                x="240"
                y="140"
                width="160"
                height="52"
                rx="12"
                fill={selectedNodeId === "sw1" ? effectiveAccent : "#111827"}
                stroke={selectedNodeId === "sw1" ? effectiveAccent : "#64748b"}
                strokeWidth="2"
              />
              <text x="320" y="163" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">
                SW1-DIST-CORE
              </text>
              <text x="320" y="179" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
                802.1Q Trunk
              </text>
            </g>

            {/* VLAN 10 */}
            <g onClick={() => setSelectedNodeId("vlan10")} className="cursor-pointer">
              <rect
                x="55"
                y="246"
                width="150"
                height="52"
                rx="12"
                fill={selectedNodeId === "vlan10" ? effectiveAccent : "#111827"}
                stroke={selectedNodeId === "vlan10" ? effectiveAccent : "#64748b"}
                strokeWidth="2"
              />
              <text x="130" y="269" textAnchor="middle" fill="#ffffff" fontSize="11.5" fontWeight="700">
                VLAN 10: ENG
              </text>
              <text x="130" y="285" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
                192.168.10.0/24
              </text>
            </g>

            {/* VLAN 20 */}
            <g onClick={() => setSelectedNodeId("vlan20")} className="cursor-pointer">
              <rect
                x="245"
                y="246"
                width="150"
                height="52"
                rx="12"
                fill={selectedNodeId === "vlan20" ? effectiveAccent : "#111827"}
                stroke={selectedNodeId === "vlan20" ? effectiveAccent : "#64748b"}
                strokeWidth="2"
              />
              <text x="320" y="269" textAnchor="middle" fill="#ffffff" fontSize="11.5" fontWeight="700">
                VLAN 20: MGMT
              </text>
              <text x="320" y="285" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
                192.168.20.0/24
              </text>
            </g>

            {/* DMZ Server */}
            <g onClick={() => setSelectedNodeId("server")} className="cursor-pointer">
              <rect
                x="435"
                y="246"
                width="150"
                height="52"
                rx="12"
                fill={selectedNodeId === "server" ? effectiveAccent : "#111827"}
                stroke={selectedNodeId === "server" ? effectiveAccent : "#10b981"}
                strokeWidth="2"
              />
              <text x="510" y="269" textAnchor="middle" fill="#ffffff" fontSize="11.5" fontWeight="700">
                SRV-DMZ-01
              </text>
              <text x="510" y="285" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontFamily="monospace">
                192.168.30.10
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Right Node Inspector (5 cols) */}
      <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span
              className="px-3 py-1 rounded-full text-[11px] font-mono-tech font-bold uppercase border"
              style={{
                backgroundColor: "var(--theme-surface-alt)",
                borderColor: "var(--theme-border)",
                color: effectiveAccent,
              }}
            >
              {activeNode.type}
            </span>
            <span className="text-xs font-mono-tech" style={{ color: "var(--theme-muted)" }}>
              {activeNode.ip}
            </span>
          </div>

          <div>
            <h4 className="text-2xl font-extrabold font-display uppercase tracking-wide">
              {activeNode.name}
            </h4>
            <div className="text-xs font-mono-tech font-semibold mt-1" style={{ color: effectiveAccent }}>
              {activeNode.status}
            </div>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--theme-muted)" }}>
            {activeNode.detail}
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" style={{ color: effectiveAccent }} />
              <span>IOS Running Config</span>
            </span>

            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1 rounded-lg neo-pill text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-2xl neo-console font-mono-tech text-[11px] leading-relaxed overflow-x-auto">
            <pre>{activeNode.cliSnippet}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
