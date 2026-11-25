"use client";

import Image, { type StaticImageData } from "next/image";
import { type ProjectData } from "./ProjectModal";
import carPullPreview from "@/public/images/projects/car-pull.webp";
import sabbathLightPreview from "@/public/images/projects/sabbath-light.webp";

interface ProjectPreviewProps {
  project: ProjectData;
  compact?: boolean;
  onClick?: () => void;
}

const SCREENSHOT_MAP: Record<
  string,
  { img: StaticImageData; domain: string; alt: string; framedMobile?: boolean }
> = {
  "car-pull": {
    img: carPullPreview,
    domain: "kiinnggss.github.io/car-pull",
    alt: "CAR PULL peer-to-peer commuter ridesharing application preview",
    framedMobile: true,
  },
  "sabbath-light": {
    img: sabbathLightPreview,
    domain: "kiinnggss.github.io/sabbath-light",
    alt: "Sabbath Light SDA worship and hymnal companion PWA preview",
  },
};

function ArchitectureSvg({ id }: { id: string }) {
  if (id === "cisco-network-topology") {
    return (
      <svg
        viewBox="0 0 640 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        role="img"
        aria-label="Cisco HSRP dual-router multi-VLAN schematic"
      >
        <rect width="640" height="320" fill="var(--theme-console-bg)" />
        <line x1="205" y1="74" x2="435" y2="74" stroke="var(--theme-accent)" strokeWidth="2.5" />
        <line x1="205" y1="92" x2="320" y2="165" stroke="var(--theme-accent)" strokeWidth="2.5" strokeDasharray="6 4" />
        <line x1="435" y1="92" x2="320" y2="165" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" />
        <line x1="320" y1="195" x2="128" y2="256" stroke="#94a3b8" strokeWidth="2" />
        <line x1="320" y1="195" x2="320" y2="256" stroke="#94a3b8" strokeWidth="2" />
        <line x1="320" y1="195" x2="512" y2="256" stroke="#34d399" strokeWidth="2" />

        <rect x="262" y="61" width="116" height="24" rx="12" fill="#1e293b" stroke="var(--theme-accent)" strokeWidth="1.5" />
        <text x="320" y="77" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="700">
          HSRP v2 SYNC
        </text>

        <rect x="120" y="46" width="136" height="50" rx="12" fill="var(--theme-accent)" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1.5" />
        <text x="188" y="68" textAnchor="middle" fill="var(--theme-accent-text)" fontSize="12" fontWeight="800" fontFamily="monospace">
          R1-ACTIVE
        </text>
        <text x="188" y="84" textAnchor="middle" fill="var(--theme-accent-text)" opacity="0.85" fontSize="10" fontFamily="monospace">
          Priority 110 (.2)
        </text>

        <rect x="384" y="46" width="136" height="50" rx="12" fill="#111827" stroke="#475569" strokeWidth="1.5" />
        <text x="452" y="68" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="800" fontFamily="monospace">
          R2-STANDBY
        </text>
        <text x="452" y="84" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
          Priority 100 (.3)
        </text>

        <rect x="236" y="152" width="168" height="46" rx="12" fill="#111827" stroke="var(--theme-secondary)" strokeWidth="1.8" />
        <text x="320" y="173" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="800" fontFamily="monospace">
          SW1-DIST-CORE
        </text>
        <text x="320" y="188" textAnchor="middle" fill="var(--theme-secondary)" fontSize="10" fontFamily="monospace">
          802.1Q Trunk Fabric
        </text>

        {[
          { x: 56, label: "VLAN 10", sub: "Engineering", stroke: "#64748b" },
          { x: 248, label: "VLAN 20", sub: "Management", stroke: "#64748b" },
          { x: 440, label: "SRV-DMZ", sub: "ACL Protected", stroke: "#34d399" },
        ].map((node) => (
          <g key={node.label}>
            <rect x={node.x} y="246" width="144" height="46" rx="10" fill="#0f172a" stroke={node.stroke} strokeWidth="1.5" />
            <text x={node.x + 72} y="266" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="monospace">
              {node.label}
            </text>
            <text x={node.x + 72} y="281" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
              {node.sub}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  if (id === "video-downloader") {
    return (
      <svg
        viewBox="0 0 640 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        role="img"
        aria-label="Crystal Bento Telemetry Studio speedometer and HTTP 206 vault preview"
      >
        <rect width="640" height="320" fill="var(--theme-console-bg)" />
        <rect x="34" y="34" width="248" height="252" rx="20" fill="#141920" stroke="#2d3748" strokeWidth="1.5" />
        <text x="56" y="64" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="700">
          SSE TELEMETRY / 8-WORKER
        </text>
        <path
          d="M84 198 A 74 74 0 1 1 232 198"
          stroke="#273140"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M84 198 A 74 74 0 0 1 214 140"
          stroke="var(--theme-accent)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <text x="158" y="176" textAnchor="middle" fill="#ffffff" fontSize="28" fontWeight="800" fontFamily="monospace">
          48.6
        </text>
        <text x="158" y="198" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="700" fontFamily="monospace">
          MB/s STREAM
        </text>
        <rect x="58" y="232" width="200" height="32" rx="16" fill="#0b0f14" stroke="#34d399" strokeOpacity="0.4" strokeWidth="1.2" />
        <text x="158" y="252" textAnchor="middle" fill="#34d399" fontSize="10.5" fontFamily="monospace" fontWeight="700">
          SUB-50MS LIVE FEED
        </text>

        <rect x="304" y="34" width="302" height="126" rx="20" fill="#141920" stroke="#2d3748" strokeWidth="1.5" />
        <text x="326" y="64" fill="var(--theme-secondary)" fontSize="10.5" fontFamily="monospace" fontWeight="700">
          HTTP 206 PARTIAL STREAM
        </text>
        <rect x="326" y="84" width="258" height="14" rx="7" fill="#0b0f14" />
        <rect x="326" y="84" width="184" height="14" rx="7" fill="var(--theme-accent)" />
        <text x="326" y="124" fill="#cbd5e1" fontSize="11" fontFamily="monospace">
          Range: bytes=10485760-20971519
        </text>
        <text x="326" y="142" fill="#94a3b8" fontSize="10" fontFamily="monospace">
          VLC M3U Tokenized Direct Pipe
        </text>

        <rect x="304" y="176" width="302" height="110" rx="20" fill="#141920" stroke="var(--theme-accent)" strokeOpacity="0.55" strokeWidth="1.5" />
        <text x="326" y="206" fill="#ffffff" fontSize="13" fontWeight="800" fontFamily="monospace">
          DEVICE-ISOLATED PIN VAULT
        </text>
        <text x="326" y="228" fill="#94a3b8" fontSize="11" fontFamily="monospace">
          IndexedDB Local Persistence / 61 Tests
        </text>
        <rect x="326" y="244" width="112" height="24" rx="12" fill="var(--theme-accent)" />
        <text x="382" y="260" textAnchor="middle" fill="var(--theme-accent-text)" fontSize="10" fontWeight="800" fontFamily="monospace">
          X-DEVICE-ID
        </text>
        <rect x="448" y="244" width="112" height="24" rx="12" fill="#0b0f14" stroke="#34d399" strokeWidth="1.2" />
        <text x="504" y="260" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="700" fontFamily="monospace">
          OFFLINE PWA
        </text>
      </svg>
    );
  }

  if (id === "antigravity-mobile") {
    return (
      <svg
        viewBox="0 0 640 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        role="img"
        aria-label="Antigravity Mobile PWA voice controller connected over Cloudflare Tunnel to FastAPI SSE supervisor"
      >
        <rect width="640" height="320" fill="var(--theme-console-bg)" />
        <line x1="210" y1="160" x2="430" y2="160" stroke="var(--theme-accent)" strokeWidth="3" strokeDasharray="7 5" />

        <rect x="44" y="48" width="166" height="224" rx="24" fill="#141920" stroke="#475569" strokeWidth="2" />
        <rect x="98" y="60" width="58" height="6" rx="3" fill="#334155" />
        <text x="127" y="96" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="700">
          VOICE PWA
        </text>
        {[22, 46, 30, 62, 42, 54, 28].map((h, idx) => (
          <rect
            key={idx}
            x={73 + idx * 16}
            y={158 - h / 2}
            width="8"
            height={h}
            rx="4"
            fill={idx % 2 === 0 ? "var(--theme-accent)" : "var(--theme-secondary)"}
          />
        ))}
        <rect x="66" y="218" width="122" height="28" rx="14" fill="var(--theme-accent)" />
        <text x="127" y="236" textAnchor="middle" fill="var(--theme-accent-text)" fontSize="10" fontFamily="monospace" fontWeight="800">
          WEB SPEECH API
        </text>

        <rect x="242" y="118" width="156" height="84" rx="18" fill="#0f172a" stroke="var(--theme-secondary)" strokeWidth="2" />
        <text x="320" y="148" textAnchor="middle" fill="var(--theme-secondary)" fontSize="11" fontFamily="monospace" fontWeight="800">
          CLOUDFLARE
        </text>
        <text x="320" y="167" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="700">
          HTTPS TUNNEL
        </text>
        <text x="320" y="186" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">
          HMAC SHA-256
        </text>

        <rect x="430" y="60" width="166" height="200" rx="20" fill="#141920" stroke="var(--theme-accent)" strokeWidth="2" />
        <text x="513" y="92" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="800">
          FASTAPI SSE
        </text>
        <text x="513" y="110" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">
          &lt;15ms STREAM
        </text>
        <rect x="450" y="128" width="126" height="32" rx="8" fill="#0b0f14" stroke="#334155" />
        <text x="513" y="148" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
          agy stream-json
        </text>
        <rect x="450" y="172" width="126" height="32" rx="8" fill="#0b0f14" stroke="#334155" />
        <text x="513" y="192" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
          stderr drain
        </text>
        <text x="513" y="236" textAnchor="middle" fill="var(--theme-accent)" fontSize="10.5" fontFamily="monospace" fontWeight="700">
          66 / 66 TESTS
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 640 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      role="img"
      aria-label="Client Web Platforms Next.js Edge to Zod API and PostgreSQL pipeline"
    >
      <rect width="640" height="320" fill="var(--theme-console-bg)" />
      <line x1="200" y1="160" x2="440" y2="160" stroke="var(--theme-accent)" strokeWidth="3" strokeDasharray="6 4" />

      <rect x="38" y="84" width="166" height="152" rx="18" fill="#141920" stroke="#475569" strokeWidth="1.8" />
      <text x="121" y="122" textAnchor="middle" fill="var(--theme-secondary)" fontSize="10.5" fontFamily="monospace" fontWeight="700">
        EDGE PORTALS
      </text>
      <text x="121" y="146" textAnchor="middle" fill="#ffffff" fontSize="14" fontFamily="monospace" fontWeight="800">
        NEXT.JS UI
      </text>
      <text x="121" y="176" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
        95+ Lighthouse
      </text>
      <rect x="64" y="196" width="114" height="24" rx="12" fill="var(--theme-accent)" />
      <text x="121" y="212" textAnchor="middle" fill="var(--theme-accent-text)" fontSize="10" fontFamily="monospace" fontWeight="800">
        TLS 1.3 CDN
      </text>

      <rect x="237" y="84" width="166" height="152" rx="18" fill="#141920" stroke="var(--theme-accent)" strokeWidth="2" />
      <text x="320" y="122" textAnchor="middle" fill="var(--theme-accent)" fontSize="10.5" fontFamily="monospace" fontWeight="700">
        VALIDATION
      </text>
      <text x="320" y="146" textAnchor="middle" fill="#ffffff" fontSize="14" fontFamily="monospace" fontWeight="800">
        ZOD + REST
      </text>
      <text x="320" y="176" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
        Webhooks &amp; Auth
      </text>
      <rect x="263" y="196" width="114" height="24" rx="12" fill="#0b0f14" stroke="#34d399" />
      <text x="320" y="212" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="700">
        65% FASTER
      </text>

      <rect x="436" y="84" width="166" height="152" rx="18" fill="#141920" stroke="#34d399" strokeWidth="1.8" />
      <text x="519" y="122" textAnchor="middle" fill="#34d399" fontSize="10.5" fontFamily="monospace" fontWeight="700">
        PERSISTENCE
      </text>
      <text x="519" y="146" textAnchor="middle" fill="#ffffff" fontSize="14" fontFamily="monospace" fontWeight="800">
        CRM + SQL
      </text>
      <text x="519" y="176" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
        PostgreSQL / S3
      </text>
      <rect x="462" y="196" width="114" height="24" rx="12" fill="#0b0f14" stroke="#475569" />
      <text x="519" y="212" textAnchor="middle" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="700">
        99.8% UPTIME
      </text>
    </svg>
  );
}

export default function ProjectPreview({ project, compact = false, onClick }: ProjectPreviewProps) {
  const screenshot = SCREENSHOT_MAP[project.id];
  const domainLabel =
    screenshot?.domain ||
    (project.id === "cisco-network-topology"
      ? "cisco-ios://core-r1/hsrp-v2"
      : project.id === "video-downloader"
      ? "crystal://sse-telemetry/vault"
      : project.id === "antigravity-mobile"
      ? "cloudflare-tunnel://fastapi-sse"
      : "portal://nextjs-zod-crm");

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl overflow-hidden border ${onClick ? "cursor-pointer" : ""}`}
      style={{
        borderColor: "var(--theme-border)",
        borderWidth: "var(--theme-border-width)",
        backgroundColor: "var(--theme-console-bg)",
      }}
    >
      <div
        className="px-3.5 py-2 flex items-center justify-between gap-2 border-b"
        style={{
          backgroundColor: "var(--theme-surface-alt)",
          borderColor: "var(--theme-border)",
          color: "var(--theme-ink)",
        }}
      >
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <span
          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech font-semibold truncate border"
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-border)",
            color: "var(--theme-muted)",
          }}
        >
          {domainLabel}
        </span>
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: "var(--theme-accent)" }}
        />
      </div>

      <div className={`relative w-full overflow-hidden ${compact ? "aspect-[21/9]" : "aspect-[16/9]"}`}>
        {screenshot ? (
          screenshot.framedMobile ? (
            <div
              className="w-full h-full flex items-center justify-center p-3"
              style={{
                backgroundColor: "var(--theme-console-bg)",
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            >
              <div className="relative h-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                <Image
                  src={screenshot.img}
                  alt={screenshot.alt}
                  fill
                  sizes="(max-width: 1024px) 60vw, 260px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          ) : (
            <Image
              src={screenshot.img}
              alt={screenshot.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )
        ) : (
          <ArchitectureSvg id={project.id} />
        )}
      </div>
    </div>
  );
}
