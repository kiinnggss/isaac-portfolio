import { type ProjectData } from "@/components/ui/ProjectModal";

export const featuredProjects: ProjectData[] = [
  {
    id: "car-pull",
    title: "CAR PULL: Peer-to-Peer Transit & Carpooling",
    subtitle: "High-congestion distributed commuter ridesharing architecture for metropolitan Lagos",
    category: "Distributed Web Architecture",
    summary:
      "A commuter ridesharing platform tailored for the unique traffic realities of Lagos, Nigeria. The architecture addresses high corridor congestion along primary arterial highways (Third Mainland Bridge, Ikorodu Road corridor, and Lekki-Epe Expressway) by clustering commuters based on geospatial corridors, calculating automated route-split pricing, and optimizing vehicle occupancy.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Geospatial Indexing", "PostgreSQL", "Zustand", "TanStack Query"],
    metrics: [
      { label: "Corridor Indexing", value: "<45ms", detail: "Sub-second spatial polygon match" },
      { label: "Transit Split Heuristic", value: "4-Tier", detail: "Dynamic distance + traffic index" },
      { label: "Commuter Efficiency", value: "3.2x", detail: "Passenger seat occupancy gain" },
    ],
    highlights: [
      "Real-time corridor matching algorithms connecting drivers with verified passengers travelling along identical arterial routes.",
      "Route-split pricing module calculating fair operational cost division based on distance intervals and peak Lagos congestion hours.",
      "Optimized dispatch state machine handling trip invitations, seat reservations, and cancellation timeouts.",
      "Apple VisionOS Liquid Glass styling with specular borders, frosted backdrops, dedicated corridor street map tab, and offline PWA installation modal.",
      "Mobile-first responsive interface engineered with high-contrast night accessibility for on-the-go commuters.",
    ],
    topology: [
      "Client Layer: Mobile & Web Next.js client with low-bandwidth offline caching.",
      "API & Routing Layer: Next.js App Router Edge Handlers with strict Zod contract enforcement.",
      "Spatial Computing Engine: Bounding-box corridor intersection matching driver paths with passenger pick-up clusters.",
      "Persistence Layer: PostgreSQL with spatial indices and indexed user trip history.",
    ],
    protocols: [
      "WebSocket / Server-Sent Events for live vehicle location pings",
      "JWT Authentication with strict refresh rotation",
      "Geospatial Haversine & corridor polygon containment queries",
      "Idempotent trip reservation transaction pipelines",
    ],
    cliSnippet: `// CAR PULL Corridor Distance & Fare Split Pipeline
export function calculateCorridorFare(baseKm: number, peakIndex: number, passengers: number): number {
  const baseRatePerKm = 180; // NGN per km base
  const trafficMultiplier = 1 + (peakIndex * 0.35);
  const totalCost = baseKm * baseRatePerKm * trafficMultiplier;
  const splitCost = totalCost / Math.max(1, passengers);
  return Math.round(splitCost);
}`,
    demoLink: "https://kiinnggss.github.io/car-pull/",
    codeLink: "https://github.com/kiinnggss/car-pull",
  },
  {
    id: "cisco-network-topology",
    title: "Enterprise Network Simulation & Defense Topology",
    subtitle: "Multi-VLAN Cisco Packet Tracer infrastructure with HSRP high availability and ACL defense",
    category: "Enterprise Networking & Security",
    summary:
      "A fully segmented, fault-tolerant enterprise infrastructure simulated in Cisco Packet Tracer following CCNA 200-301 design standards. Features a Core-Distribution-Access 3-tier hierarchy, inter-VLAN routing via Router-on-a-Stick, HSRP v2 redundancy between dual gateway routers, dynamic NAT overload (PAT) for external WAN connectivity, and strict Access Control Lists guarding internal server farms.",
    tags: [
      "Cisco Packet Tracer",
      "Cisco IOS CLI",
      "CCNA 200-301",
      "HSRP v2",
      "Inter-VLAN (802.1Q)",
      "NAT / PAT",
      "Extended ACLs",
      "Port Security",
    ],
    metrics: [
      { label: "VLAN Segmentation", value: "100%", detail: "Isolated broadcast domains" },
      { label: "Failover Time", value: "<3.0s", detail: "HSRP v2 Preempt convergence" },
      { label: "Port Protection", value: "Sticky MAC", detail: "Auto-shutdown upon rogue MAC" },
    ],
    highlights: [
      "Router-on-a-Stick sub-interface routing providing granular traffic inspection between VLAN 10 (Management), VLAN 20 (Engineering), and VLAN 30 (Servers).",
      "HSRP Active/Standby gateway redundancy (priority 110 vs 100) guaranteeing continuous uptime during core router failure.",
      "Dynamic NAT overload (PAT) permitting hundreds of private workstations to share single public WAN addresses.",
      "Switch port security with dynamic sticky MAC address learning, restricting unauthorized rogue access points.",
      "Standard and Extended IPv4 ACLs blocking unauthorized pinging and unauthorized protocol access to internal enterprise database subnets.",
    ],
    topology: [
      "Access Layer: Cisco Catalyst 2960 switches with 802.1Q trunking and Access VLAN assignment.",
      "Distribution Layer: Core L3 switching and dual Cisco 2911 ISR routers terminating VLAN subinterfaces.",
      "Redundancy Fabric: HSRP Virtual IP 192.168.10.1 acting as default gateway for all departmental subnets.",
      "Edge Boundary: NAT translation pool mapping 10.0.0.0/8 and 192.168.0.0/16 private spaces to WAN serial link.",
    ],
    protocols: [
      "IEEE 802.1Q VLAN Trunking Protocol (VTP) in transparent mode",
      "HSRP (Hot Standby Router Protocol) Version 2 with MD5 authentication",
      "Inside Source NAT Overload (Port Address Translation / PAT)",
      "Extended IP Access Control Lists (ACLs 100-199)",
      "DHCP Relay Agent (ip helper-address) forwarding",
    ],
    cliSnippet: `! Cisco 2911 Core Router Configuration
hostname Core-R1
interface GigabitEthernet0/0.10
 description Management_VLAN10
 encapsulation dot1Q 10
 ip address 192.168.10.2 255.255.255.0
 standby version 2
 standby 10 ip 192.168.10.1
 standby 10 priority 110
 standby 10 preempt
 standby 10 authentication md5 key-string IsaacSecNet2026
!
interface GigabitEthernet0/0.20
 description Engineering_VLAN20
 encapsulation dot1Q 20
 ip address 192.168.20.2 255.255.255.0
 standby version 2
 standby 20 ip 192.168.20.1
 standby 20 priority 110
 standby 20 preempt
!
ip access-list extended RESTRICT_SERVER_FARM
 permit tcp 192.168.20.0 0.0.0.255 host 192.168.30.10 eq 443
  permit tcp 192.168.10.0 0.0.0.255 host 192.168.30.10 eq 22
 deny ip any 192.168.30.0 0.0.0.255 log
 permit ip any any`,
    demoLink: "#terminal",
    codeLink: "https://github.com/kiinnggss/ccna-interactive-hub",
  },
  {
    id: "hoffenheim-tech-platforms",
    title: "Client Web Platforms & Enterprise Tools",
    subtitle: "Full-stack client web solutions, data intake portals, and CMS workflows built during internship",
    category: "Full-Stack Web & Systems Integration",
    summary:
      "Production web applications, internal business tools, and content delivery pipelines developed for enterprise clients during tenure as a Web Developer Intern at Hoffenheim Tech. Designed robust client dashboards, integrated payment and form dispatch APIs, optimized SEO and load speeds, and delivered technical consulting on systems architecture.",
    tags: ["Full-stack Web Dev", "React", "Next.js", "Node.js", "REST APIs", "Tailwind CSS", "CMS Pipelines", "PostgreSQL"],
    metrics: [
      { label: "Deployment Uptime", value: "99.8%", detail: "Production client portals" },
      { label: "Data Ingestion", value: "65% Faster", detail: "Automated intake pipelines" },
      { label: "Lighthouse Score", value: "95+", detail: "Accessibility & Performance" },
    ],
    highlights: [
      "Engineered bespoke client-facing web portals with dynamic form intake, real-time input sanitization, and automated CRM notifications.",
      "Integrated secure third-party payment gateways and transactional email notifications for business inquiries.",
      "Constructed reusable component design systems with responsive layouts, accessible navigation, and dark/light UI modes.",
      "Provided end-user technical training and authored comprehensive technical handover documentation for business staff.",
    ],
    topology: [
      "Edge Frontend: High-performance Next.js application served globally via Vercel / Cloudflare edge.",
      "API Services: Modular RESTful endpoints handling client submissions, webhook validation, and session state.",
      "Storage & Assets: S3-compatible cloud bucket storage with image optimization pipelines.",
      "Analytics & Health Monitoring: Uptime probes and error logging instrumentation.",
    ],
    protocols: [
      "HTTPS / TLS 1.3 with automated SSL certificate renewal",
      "RESTful JSON APIs with strict schema validation",
      "CORS security policies restricting cross-origin requests",
      "Server-side caching with incremental static regeneration",
    ],
    cliSnippet: `// Next.js API Route Handler with Rate Limiting & Webhook Dispatch
export async function POST(req: Request) {
  const payload = await req.json();
  const sanitized = sanitizePayload(payload);
  const result = await processClientSubmission(sanitized);
  return Response.json({ success: true, refId: result.id });
}`,
    demoLink: "https://kiinnggss.github.io/isaac-portfolio/#work",
    codeLink: "https://github.com/kiinnggss/isaac-portfolio",
  },
];
