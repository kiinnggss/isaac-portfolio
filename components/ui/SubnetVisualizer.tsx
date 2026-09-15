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
    <div className="rounded-xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Network className="w-4 h-4" />
            <span>Interactive Subnet Calculator & Cisco CLI Generator</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            IPv4 CIDR & Packet Routing Telemetry
          </h3>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2">
          <label htmlFor="cidr-input" className="text-xs text-slate-500 font-medium">CIDR:</label>
          <input
            id="cidr-input"
            type="text"
            value={cidrInput}
            onChange={(e) => setCidrInput(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-mono-tech text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white w-44"
            placeholder="e.g. 192.168.10.0/24"
          />
        </div>
      </div>

      {/* Preset Quick Badges */}
      <div className="flex flex-wrap items-center gap-2 py-3 border-b border-slate-100 text-xs">
        <span className="text-slate-500 font-medium mr-1">Presets:</span>
        {presets.map((p) => (
          <button
            key={p.cidr}
            type="button"
            onClick={() => setCidrInput(p.cidr)}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              cidrInput === p.cidr
                ? "bg-slate-900 text-white font-medium shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Grid of Calculations */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-5">
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-medium text-slate-500 uppercase">Network ID</div>
          <div className="text-sm font-mono-tech font-bold text-slate-900 mt-1">{data.networkAddress}</div>
          <div className="text-[10px] text-blue-600 mt-0.5">Prefix: /{data.prefix}</div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-medium text-slate-500 uppercase">Broadcast Address</div>
          <div className="text-sm font-mono-tech font-bold text-slate-900 mt-1">{data.broadcastAddress}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Class {data.ipClass} ({data.isPrivate ? "RFC1918 Private" : "Public"})</div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-medium text-slate-500 uppercase">Subnet Mask</div>
          <div className="text-sm font-mono-tech font-bold text-slate-900 mt-1">{data.subnetMask}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Wildcard: {data.wildcardMask}</div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-medium text-slate-500 uppercase">Usable Hosts</div>
          <div className="text-sm font-mono-tech font-bold text-slate-900 mt-1">{data.usableHosts.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{data.firstUsableIp} - {data.lastUsableIp.split('.').pop()}</div>
        </div>
      </div>

      {/* Cisco CLI Configuration Generator */}
      <div className="mt-5 pt-4 border-t border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-slate-600" />
            <span>Generated Cisco IOS Running Configuration</span>
          </div>

          <div className="flex flex-wrap gap-1">
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
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  activeCliTab === tab.id
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
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
            <div className="relative rounded-xl bg-slate-900 border border-slate-800 p-4 text-slate-100 font-mono-tech text-xs overflow-x-auto leading-relaxed">
              <button
                type="button"
                onClick={() => handleCopy(activeSnippet, "cli-block")}
                className="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] inline-flex items-center gap-1 transition-colors"
              >
                {copiedKey === "cli-block" ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
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
