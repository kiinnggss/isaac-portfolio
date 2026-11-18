"use client";

import { useState, useEffect } from "react";
import { calculateSubnet, type SubnetResult } from "@/lib/network-utils";
import { Copy, Check, Network, Terminal } from "lucide-react";
import { usePortfolioTheme } from "./ThemeProvider";

export default function SubnetVisualizer() {
  const [cidrInput, setCidrInput] = useState("192.168.10.0/24");
  const [data, setData] = useState<SubnetResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeCliTab, setActiveCliTab] = useState<"interface" | "subinterface" | "acl" | "hsrp" | "nat">("subinterface");
  const { effectiveAccent } = usePortfolioTheme();

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
    <div className="neo-card rounded-3xl p-6 sm:p-8">
      {/* Header */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-2"
        style={{ borderColor: "var(--theme-border)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border-2"
            style={{
              backgroundColor: effectiveAccent,
              color: "var(--theme-accent-text)",
              borderColor: "var(--theme-border)",
            }}
          >
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold font-display uppercase tracking-wide">
              IPv4 CIDR &amp; Cisco IOS Config Generator
            </h3>
            <p className="text-xs" style={{ color: "var(--theme-muted)" }}>
              Calculate subnet boundaries and generate ready-to-paste Cisco IOS syntax.
            </p>
          </div>
        </div>

        {/* Input with Explicit Label */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="cidr-input"
            className="text-[11px] font-mono-tech font-bold uppercase"
          >
            Target CIDR Block
          </label>
          <input
            id="cidr-input"
            type="text"
            value={cidrInput}
            onChange={(e) => setCidrInput(e.target.value)}
            className="px-4 py-2 rounded-full neo-pill text-xs font-mono-tech font-semibold focus:outline-none w-52"
            placeholder="e.g. 192.168.10.0/24"
          />
        </div>
      </div>

      {/* Preset Quick Badges */}
      <div
        className="flex flex-wrap items-center gap-2 py-4 border-b-2 text-xs"
        style={{ borderColor: "var(--theme-border)" }}
      >
        <span className="font-mono-tech font-bold mr-1 uppercase text-[11px]">Presets:</span>
        {presets.map((p) => (
          <button
            key={p.cidr}
            type="button"
            onClick={() => setCidrInput(p.cidr)}
            className={`px-3.5 py-1.5 rounded-full font-mono-tech text-xs font-semibold transition-all cursor-pointer ${
              cidrInput === p.cidr ? "neo-btn-primary" : "neo-pill hover:opacity-80"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Grid of Calculations */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        <div
          className="p-4 rounded-2xl border-2"
          style={{
            backgroundColor: "var(--theme-surface-alt)",
            borderColor: "var(--theme-border)",
          }}
        >
          <div className="text-[10px] font-bold font-mono-tech uppercase" style={{ color: "var(--theme-muted)" }}>
            Network ID
          </div>
          <div className="text-base font-mono-tech font-bold mt-1">{data.networkAddress}</div>
          <div className="text-[11px] font-mono-tech font-bold mt-0.5" style={{ color: effectiveAccent }}>
            Prefix /{data.prefix}
          </div>
        </div>

        <div
          className="p-4 rounded-2xl border-2"
          style={{
            backgroundColor: "var(--theme-surface-alt)",
            borderColor: "var(--theme-border)",
          }}
        >
          <div className="text-[10px] font-bold font-mono-tech uppercase" style={{ color: "var(--theme-muted)" }}>
            Broadcast Address
          </div>
          <div className="text-base font-mono-tech font-bold mt-1">{data.broadcastAddress}</div>
          <div className="text-[11px] font-mono-tech mt-0.5" style={{ color: "var(--theme-muted)" }}>
            Class {data.ipClass} ({data.isPrivate ? "RFC1918" : "Public"})
          </div>
        </div>

        <div
          className="p-4 rounded-2xl border-2"
          style={{
            backgroundColor: "var(--theme-surface-alt)",
            borderColor: "var(--theme-border)",
          }}
        >
          <div className="text-[10px] font-bold font-mono-tech uppercase" style={{ color: "var(--theme-muted)" }}>
            Subnet Mask
          </div>
          <div className="text-base font-mono-tech font-bold mt-1">{data.subnetMask}</div>
          <div className="text-[11px] font-mono-tech mt-0.5" style={{ color: "var(--theme-muted)" }}>
            Wildcard {data.wildcardMask}
          </div>
        </div>

        <div
          className="p-4 rounded-2xl border-2"
          style={{
            backgroundColor: "var(--theme-surface-alt)",
            borderColor: "var(--theme-border)",
          }}
        >
          <div className="text-[10px] font-bold font-mono-tech uppercase" style={{ color: "var(--theme-muted)" }}>
            Usable Hosts
          </div>
          <div className="text-base font-mono-tech font-bold mt-1">
            {data.usableHosts.toLocaleString()}
          </div>
          <div className="text-[11px] font-mono-tech mt-0.5" style={{ color: "var(--theme-muted)" }}>
            {data.firstUsableIp} - .{data.lastUsableIp.split(".").pop()}
          </div>
        </div>
      </div>

      {/* Cisco CLI Configuration Generator */}
      <div
        className="mt-6 pt-5 border-t-2"
        style={{ borderColor: "var(--theme-border)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="text-sm font-bold flex items-center gap-2 font-display uppercase tracking-wide">
            <Terminal className="w-4 h-4" style={{ color: effectiveAccent }} />
            <span>Generated Cisco IOS Configuration</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCliTab === tab.id ? "neo-btn-primary" : "neo-pill hover:opacity-80"
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
            <div className="relative rounded-2xl neo-console p-5 font-mono-tech text-xs overflow-x-auto leading-relaxed">
              <button
                type="button"
                onClick={() => handleCopy(activeSnippet, activeCliTab)}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedKey === activeCliTab ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 opacity-80" />
                    <span>Copy IOS</span>
                  </>
                )}
              </button>
              <pre className="pr-24">{activeSnippet}</pre>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
