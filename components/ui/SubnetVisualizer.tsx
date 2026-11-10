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
    { label: "/24 Standard LAN", cidr: "192.168.10.0/24" },
    { label: "/26 62 Hosts", cidr: "192.168.20.0/26" },
    { label: "/28 14 Hosts", cidr: "10.10.10.0/28" },
    { label: "/30 P2P Link", cidr: "172.16.0.0/30" },
    { label: "/16 Enterprise Core", cidr: "10.0.0.0/16" },
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!data) return null;

  return (
    <div className="crystal-surface rounded-3xl p-8 sm:p-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-900/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#090d16] text-orange-500 flex items-center justify-center shrink-0">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#090d16] font-display">
              IPv4 CIDR & Cisco IOS Config Generator
            </h3>
            <p className="text-xs text-slate-600">
              Calculate subnet boundaries and generate ready-to-paste Cisco IOS syntax.
            </p>
          </div>
        </div>

        {/* Input with Explicit Label */}
        <div className="flex flex-col gap-1">
          <label htmlFor="cidr-input" className="text-[11px] font-mono-tech font-semibold text-slate-800 uppercase">
            Target CIDR Block
          </label>
          <input
            id="cidr-input"
            type="text"
            value={cidrInput}
            onChange={(e) => setCidrInput(e.target.value)}
            className="px-4 py-2 rounded-full bg-white border border-slate-300 text-xs font-mono-tech text-[#090d16] focus:outline-none focus:border-orange-600 shadow-xs w-52"
            placeholder="e.g. 192.168.10.0/24"
          />
        </div>
      </div>

      {/* Preset Quick Badges */}
      <div className="flex flex-wrap items-center gap-2 py-4 border-b border-slate-900/10 text-xs">
        <span className="text-slate-700 font-mono-tech font-semibold mr-1 uppercase text-[11px]">Presets:</span>
        {presets.map((p) => (
          <button
            key={p.cidr}
            type="button"
            onClick={() => setCidrInput(p.cidr)}
            className={`px-3.5 py-1.5 rounded-full font-mono-tech text-xs transition-all cursor-pointer ${
              cidrInput === p.cidr
                ? "bg-orange-600 text-white font-semibold shadow-xs"
                : "bg-white/80 text-slate-800 hover:bg-white border border-white"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Grid of Calculations */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        <div className="p-4 rounded-2xl bg-white/85 border border-white shadow-xs">
          <div className="text-[10px] font-semibold text-slate-500 font-mono-tech uppercase">Network ID</div>
          <div className="text-base font-mono-tech font-bold text-[#090d16] mt-1">{data.networkAddress}</div>
          <div className="text-[11px] text-orange-600 font-mono-tech font-semibold mt-0.5">Prefix /{data.prefix}</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/85 border border-white shadow-xs">
          <div className="text-[10px] font-semibold text-slate-500 font-mono-tech uppercase">Broadcast Address</div>
          <div className="text-base font-mono-tech font-bold text-[#090d16] mt-1">{data.broadcastAddress}</div>
          <div className="text-[11px] text-slate-600 font-mono-tech mt-0.5">Class {data.ipClass} ({data.isPrivate ? "RFC1918" : "Public"})</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/85 border border-white shadow-xs">
          <div className="text-[10px] font-semibold text-slate-500 font-mono-tech uppercase">Subnet Mask</div>
          <div className="text-base font-mono-tech font-bold text-[#090d16] mt-1">{data.subnetMask}</div>
          <div className="text-[11px] text-slate-600 font-mono-tech mt-0.5">Wildcard {data.wildcardMask}</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/85 border border-white shadow-xs">
          <div className="text-[10px] font-semibold text-slate-500 font-mono-tech uppercase">Usable Hosts</div>
          <div className="text-base font-mono-tech font-bold text-[#090d16] mt-1">{data.usableHosts.toLocaleString()}</div>
          <div className="text-[11px] text-slate-600 font-mono-tech mt-0.5">{data.firstUsableIp} - .{data.lastUsableIp.split('.').pop()}</div>
        </div>
      </div>

      {/* Cisco CLI Configuration Generator */}
      <div className="mt-6 pt-5 border-t border-slate-900/10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="text-xs font-semibold text-[#090d16] flex items-center gap-2 font-display">
            <Terminal className="w-4 h-4 text-orange-600" />
            <span>Generated Cisco IOS Configuration</span>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 rounded-full bg-white/80 border border-white">
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCliTab === tab.id
                    ? "bg-[#090d16] text-white shadow-xs"
                    : "text-slate-700 hover:text-[#090d16]"
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
            <div className="relative rounded-2xl obsidian-surface p-5 text-slate-100 font-mono-tech text-xs overflow-x-auto leading-relaxed">
              <button
                type="button"
                onClick={() => handleCopy(activeSnippet, "cli-block")}
                className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-orange-600 text-white text-xs inline-flex items-center gap-1.5 transition-colors border border-white/15 cursor-pointer"
              >
                {copiedKey === "cli-block" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy IOS Config</span>
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
