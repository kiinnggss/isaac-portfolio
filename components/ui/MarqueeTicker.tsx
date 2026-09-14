"use client";

import { motion } from "framer-motion";

export default function MarqueeTicker() {
  const items = [
    { text: "CISCO IOS 200-301", highlight: true },
    { text: "NEXT.JS 16 APP ROUTER", highlight: false },
    { text: "HSRP V2 GATEWAY REDUNDANCY", highlight: true },
    { text: "COMPTIA A+ SYSTEMS DIAGNOSTICS", highlight: true },
    { text: "TYPESCRIPT & REACT 19", highlight: false },
    { text: "ROUTER-ON-A-STICK 802.1Q", highlight: true },
    { text: "VLSM IPV4/IPV6 SUBNETTING", highlight: true },
    { text: "STATIC & OVERLOAD NAT/PAT", highlight: true },
    { text: "BABCOCK UNIVERSITY CS", highlight: false },
    { text: "EXTENDED ACCESS LISTS (ACLS)", highlight: true },
    { text: "POSTGRESQL & SQLITE ENGINES", highlight: false },
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-neutral-950/80 py-4 select-none group">
      {/* Background glow strip */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#bfff04]/5 to-transparent pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div className="flex w-max animate-marquee space-x-8 group-hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-8 whitespace-nowrap">
            <span
              className={`text-xs sm:text-sm font-mono-tech tracking-widest uppercase transition-colors ${
                item.highlight
                  ? "text-[#bfff04] font-semibold"
                  : "text-neutral-400 group-hover:text-white"
              }`}
            >
              {item.text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
