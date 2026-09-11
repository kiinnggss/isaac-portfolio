"use client";

import { useState, useEffect } from "react";
import { calculateSubnet, type SubnetResult } from "@/lib/network-utils";
import { Copy, Check, Terminal, Network, ShieldCheck, Cpu, ArrowRight } from "lucide-react";

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
      // Invalid input - fallback to default
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
    <div className="rounded-2xl bg-neutral-900/50 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#00f0ff] uppercase tracking-wider mb-1">
            <Network className="w-4 h-4" />
            <span>Interactive Subnet Calculator & Cisco CLI Generator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
            IPv4 CIDR & Packet Routing Telemetry
          </h3>
        </div>

        {/* Input & Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={cidrInput}
              onChange={(e) => setCidrInput(e.target.value)}
              className="px-3.5 py-1.5 rounded-lg bg-black border border-white/20 text-xs sm:text-sm font-mono-tech text-[#bfff04] focus:outline-none focus:border-[#bfff04] w-44"
              placeholder="e.g. 192.168.1.0/24"
            />
          </div>
        </div>
      </div>

      {/* Preset Quick Badges */}
      <div className="flex flex-wrap gap-2 py-4 border-b border-white/5">
        <span className="text-xs font-mono-tech text-neutral-500 my-auto mr-1">Presets:</span>
        {presets.map((p) => (
          <button
            key={p.cidr}
            type="button"
            onClick={() => setCidrInput(p.cidr)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono-tech transition-colors ${
              cidrInput === p.cidr
                ? "bg-[#bfff04] text-black font-semibold"
                : "bg-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-700"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Grid of Calculations */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-6">
        <div className="p-3.5 rounded-xl bg-neutral-950 border border-white/5">
          <div className="text-[10px] font-mono-tech text-neutral-500 uppercase">Network ID</div>
          <div className="text-sm sm:text-base font-mono-tech font-bold text-white mt-1">{data.networkAddress}</div>
          <div className="text-[10px] font-mono-tech text-[#00f0ff] mt-0.5">Prefix: /{data.prefix}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-950 border border-white/5">
          <div className="text-[10px] font-mono-tech text-neutral-500 uppercase">Broadcast Address</div>
          <div className="text-sm sm:text-base font-mono-tech font-bold text-white mt-1">{data.broadcastAddress}</div>
          <div className="text-[10px] font-mono-tech text-neutral-400 mt-0.5">Class {data.ipClass} ({data.isPrivate ? "RFC1918 Private" : "Public"})</div>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-950 border border-white/5">
          <div className="text-[10px] font-mono-tech text-neutral-500 uppercase">Subnet Mask</div>
          <div className="text-sm sm:text-base font-mono-tech font-bold text-[#bfff04] mt-1">{data.subnetMask}</div>
          <div className="text-[10px] font-mono-tech text-neutral-400 mt-0.5">Wildcard: {data.wildcardMask}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-950 border border-white/5">
          <div className="text-[10px] font-mono-tech text-neutral-500 uppercase">Usable Hosts</div>
          <div className="text-sm sm:text-base font-mono-tech font-bold text-[#bfff04] mt-1">
            {data.usableHosts.toLocaleString()}
          </div>
          <div className="text-[10px] font-mono-tech text-neutral-400 mt-0.5">Total: {data.totalHosts.toLocaleString()}</div>
        </div>
      </div>

      {/* Usable Range Box */}
      <div className="p-4 rounded-xl bg-neutral-950/80 border border-white/10 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-[#bfff04]">
            <ArrowRight className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono-tech text-neutral-400 uppercase">Usable Host IP Range</div>
            <div className="text-sm sm:text-base font-mono-tech text-white font-medium">
              <span className="text-[#00f0ff]">{data.firstUsableIp || data.networkAddress}</span>
              <span className="text-neutral-500 mx-2">→</span>
              <span className="text-[#bfff04]">{data.lastUsableIp || data.broadcastAddress}</span>
            </div>
          </div>
        </div>

        {/* Binary Mask Visualizer */}
        <div className="font-mono-tech text-xs text-right">
          <div className="text-[10px] text-neutral-500 uppercase">Mask Binary Octets</div>
          <div className="text-neutral-400">
            {data.subnetMaskBinary.split(".").map((octet, i) => (
              <span key={i} className="inline-block mr-1">
                {octet.split("").map((bit, bitIdx) => (
                  <span
                    key={bitIdx}
                    className={bit === "1" ? "text-[#bfff04]" : "text-neutral-600"}
                  >
                    {bit}
                  </span>
                ))}
                {i < 3 && <span className="text-neutral-700">.</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Cisco IOS CLI Generator Tab View */}
      <div className="rounded-xl bg-black border border-white/10 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-4 bg-neutral-950">
          <div className="flex flex-wrap gap-1 py-2">
            <button
              type="button"
              onClick={() => setActiveCliTab("subinterface")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono-tech transition-colors ${
                activeCliTab === "subinterface"
                  ? "bg-neutral-800 text-[#bfff04]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Router-on-a-Stick (802.1Q)
            </button>
            <button
              type="button"
              onClick={() => setActiveCliTab("hsrp")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono-tech transition-colors ${
                activeCliTab === "hsrp"
                  ? "bg-neutral-800 text-[#00f0ff]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              HSRP v2 Standby
            </button>
            <button
              type="button"
              onClick={() => setActiveCliTab("acl")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono-tech transition-colors ${
                activeCliTab === "acl"
                  ? "bg-neutral-800 text-[#bfff04]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Extended ACL Filter
            </button>
            <button
              type="button"
              onClick={() => setActiveCliTab("nat")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono-tech transition-colors ${
                activeCliTab === "nat"
                  ? "bg-neutral-800 text-[#00f0ff]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Dynamic NAT Overload
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              const configMap = {
                interface: data.ciscoConfig.interfaceConfig,
                subinterface: data.ciscoConfig.subinterfaceConfig,
                acl: data.ciscoConfig.aclConfig,
                hsrp: data.ciscoConfig.hsrpConfig,
                nat: data.ciscoConfig.natConfig,
              };
              handleCopy(configMap[activeCliTab], activeCliTab);
            }}
            className="my-2 px-3 py-1 rounded-md text-xs font-mono-tech bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            {copiedKey === activeCliTab ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#bfff04]" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Config
              </>
            )}
          </button>
        </div>

        <pre className="p-4 text-xs font-mono-tech text-emerald-400 overflow-x-auto leading-relaxed">
          <code>
            {activeCliTab === "subinterface" && data.ciscoConfig.subinterfaceConfig}
            {activeCliTab === "hsrp" && data.ciscoConfig.hsrpConfig}
            {activeCliTab === "acl" && data.ciscoConfig.aclConfig}
            {activeCliTab === "nat" && data.ciscoConfig.natConfig}
            {activeCliTab === "interface" && data.ciscoConfig.interfaceConfig}
          </code>
        </pre>
      </div>
    </div>
  );
}
