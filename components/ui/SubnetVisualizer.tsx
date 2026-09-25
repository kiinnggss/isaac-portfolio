"use client";

import { useState, useEffect } from "react";
import { calculateSubnet, type SubnetResult } from "@/lib/network-utils";
import { Copy, Check, Network, Terminal } from "lucide-react";

export default function SubnetVisualizer() {
  const [cidrInput, setCidrInput] = useState("192.168.10.0/24");
  const [data, setData] = useState<SubnetResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeCliTab, setActiveCliTab] = useState<"interface" | "subinterface" | "acl" | "hsrp" | "nat">("subinterface");

  useEffect(() => {
    try {
      const res = calculateSubnet(cidrInput);
      setData(res);
    } catch {
      // Invalid input fallback
    }
  }, [cidrInput]);

  const presets = [
    { label: "/24 (Standard LAN)", cidr: "192.168.10.0/24" },
    { label: "/26 (62 Hosts)", cidr: "192.168.20.0/26" },
    { label: "/28 (14 Hosts)", cidr: "10.10.10.0/28" },
    { label: "/30 (P2P Link)", cidr: "172.16.0.0/30" },
    { label: "/16 (Enterprise Core)", cidr: "10.0.0.0/16" },
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!data) return null;

  return (
    <div className="crystal-surface rounded-3xl p-8 sm:p-10 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.08)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/50">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1.5 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/50">
            <Network className="w-3.5 h-3.5" />
            <span>Interactive Subnet Calculator & Cisco CLI Generator</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 font-display">
            IPv4 CIDR & Packet Routing Telemetry
          </h3>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2.5">
          <label htmlFor="cidr-input" className="text-xs text-slate-600 font-medium">CIDR:</label>
          <input
            id="cidr-input"
            type="text"
            value={cidrInput}
            onChange={(e) => setCidrInput(e.target.value)}
            className="px-4 py-2 rounded-full bg-white/80 border border-white/90 text-xs font-mono-tech text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40 shadow-xs w-48"
            placeholder="e.g. 192.168.10.0/24"
          />
        </div>
      </div>

      {/* Preset Quick Badges */}
      <div className="flex flex-wrap items-center gap-2 py-4 border-b border-slate-200/40 text-xs">
        <span className="text-slate-500 font-medium mr-1">Presets:</span>
        {presets.map((p) => (
          <button
            key={p.cidr}
            type="button"
            onClick={() => setCidrInput(p.cidr)}
            className={`px-3 py-1.5 rounded-full transition-all ${
              cidrInput === p.cidr
                ? "crystal-button text-white font-medium shadow-xs"
                : "crystal-pill text-slate-700 hover:text-slate-950 hover:bg-white"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Grid of Calculations */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md shadow-xs border border-white/80">
          <div className="text-[11px] font-semibold text-slate-500 font-mono-tech uppercase">Network ID</div>
          <div className="text-base font-mono-tech font-bold text-slate-900 mt-1 font-display">{data.networkAddress}</div>
          <div className="text-[10px] text-blue-600 font-medium mt-0.5">Prefix: /{data.prefix}</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md shadow-xs border border-white/80">
          <div className="text-[11px] font-semibold text-slate-500 font-mono-tech uppercase">Broadcast Address</div>
          <div className="text-base font-mono-tech font-bold text-slate-900 mt-1 font-display">{data.broadcastAddress}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Class {data.ipClass} ({data.isPrivate ? "RFC1918 Private" : "Public"})</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md shadow-xs border border-white/80">
          <div className="text-[11px] font-semibold text-slate-500 font-mono-tech uppercase">Subnet Mask</div>
          <div className="text-base font-mono-tech font-bold text-slate-900 mt-1 font-display">{data.subnetMask}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Wildcard: {data.wildcardMask}</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md shadow-xs border border-white/80">
          <div className="text-[11px] font-semibold text-slate-500 font-mono-tech uppercase">Usable Hosts</div>
          <div className="text-base font-mono-tech font-bold text-slate-900 mt-1 font-display">{data.usableHosts.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{data.firstUsableIp} - {data.lastUsableIp.split('.').pop()}</div>
        </div>
      </div>

      {/* Cisco CLI Configuration Generator */}
      <div className="mt-6 pt-5 border-t border-slate-200/40">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="text-xs font-semibold text-slate-900 flex items-center gap-2 font-display">
            <Terminal className="w-4 h-4 text-slate-600" />
            <span>Generated Cisco IOS Running Configuration</span>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 rounded-full bg-white/70 backdrop-blur-md shadow-xs border border-white/80">
            {(
              [
                { id: "subinterface", label: "Router-on-a-Stick" },
                { id: "hsrp", label: "HSRP v2 Gateway" },
                { id: "acl", label: "Extended ACL" },
                { id: "nat", label: "Dynamic NAT / PAT" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCliTab(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeCliTab === tab.id
                    ? "crystal-button text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-950 hover:bg-white/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {(() => {
          const activeSnippet =
            activeCliTab === "interface"
              ? data.ciscoConfig.interfaceConfig
              : activeCliTab === "subinterface"
              ? data.ciscoConfig.subinterfaceConfig
              : activeCliTab === "acl"
              ? data.ciscoConfig.aclConfig
              : activeCliTab === "hsrp"
              ? data.ciscoConfig.hsrpConfig
              : data.ciscoConfig.natConfig;

          return (
            <div className="relative rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-slate-800/80 p-5 text-slate-100 font-mono-tech text-xs overflow-x-auto leading-relaxed shadow-[0_16px_32px_-8px_rgba(15,23,42,0.35)]">
              <button
                type="button"
                onClick={() => handleCopy(activeSnippet, "cli-block")}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs inline-flex items-center gap-1.5 transition-colors border border-slate-700/60 shadow-xs"
              >
                {copiedKey === "cli-block" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Config</span>
                  </>
                )}
              </button>
              <pre>{activeSnippet}</pre>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
