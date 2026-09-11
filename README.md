# Gbodimowo Isaac — Personal Portfolio & Systems Architecture

A production-grade, dark-mode editorial portfolio website for **Gbodimowo Isaac**, Software Engineer and Network Systems Specialist based in Lagos, Nigeria.

The site is built on the modern editorial aesthetic inspired by the "Matthew - Personal Portfolio Website Animation", combining clean typography (Clash Display, Syne, Inter, JetBrains Mono), subtle glassmorphism, micro-interactions, Lenis smooth momentum scrolling, Framer Motion physics, an interactive network terminal emulator, an IPv4 CIDR subnet visualizer, and a full-stack Next.js backend with SQLite persistence.

---

## Technical Stack Architecture

### Frontend
- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS with dark theme hierarchy (`#080808`, `#111111`, `#161616`) and vibrant accents (electric green `#bfff04` and cyber cyan `#00f0ff`)
- **Typography:** Clash Display, Syne, Inter, and JetBrains Mono
- **Animation & Motion:** 
  - `lenis` for smooth momentum scroll
  - `framer-motion` for interactive UI states, magnetic physics, and modals
- **Icons:** `lucide-react` and custom SVG components

### Backend & Infrastructure
- **Route Handlers:** Next.js Route Handlers with strict TypeScript contracts and `zod` schema validation
- **Persistence:** SQLite datastore powered by Node's built-in `node:sqlite` (`DatabaseSync`) persisting to `prisma/dev.db`, alongside standard Prisma schema definitions in `prisma/schema.prisma`
- **Rate Limiting:** Sliding-window in-memory rate limiter with automatic stale-entry cleanup
- **Sanitization:** Input sanitization stripping HTML/script injections and normalizing payloads
- **Email Service:** Modular notification dispatcher supporting Resend or local simulation fallback

---

## Core Capabilities & Pages

1. **Editorial Hero Section**
   - Character-staggered typography reveal
   - Dynamic West Africa Time (WAT / UTC+1) live clock ticker
   - Live availability pill ("Open for Software & Systems Roles")
   - CTAs: "Explore Projects", "Download Resume", and "Interactive CLI"

2. **Featured Projects Showcase**
   - **CAR PULL:** Distributed commuter carpooling architecture tailored for high-congestion Lagos arterial corridors (Third Mainland Bridge, Ikorodu Road, Lekki-Epe Expressway)
   - **Enterprise Network Simulation & Defense Topology:** Multi-VLAN Cisco Packet Tracer infrastructure with Router-on-a-Stick (802.1Q), HSRP v2 redundancy, static/dynamic NAT, and strict Extended ACLs
   - **Client Web Platforms & Enterprise Tools:** Production client portals and CMS data ingestion pipelines built during internship at Hoffenheim Tech
   - System architecture modal drawers detailing network topology, security controls, and code snippets

3. **Interactive Bento Grid**
   - Hardware and network engineering credentials (CompTIA A+, CCNA candidate, Babcock University B.Sc.)
   - Real-time Lagos edge diagnostics polling `/api/health`
   - Filterable skills matrix across Networking, Software, Hardware Diagnostics, and Methodologies
   - Interactive IPv4 Subnet Visualizer with binary bit inspection and copyable Cisco IOS CLI commands

4. **Live Network Terminal Simulator**
   - Interactive CLI emulator with prompt `isaac@lagos-edge:~$`
   - Commands: `ping <host>`, `subnet <cidr>`, `traceroute <host>`, `hsrp status`, `vlan list`, `whoami`, `skills`, `cat resume`, `neofetch`, `clear`

5. **Backend-Connected Contact Transmission**
   - React Hook Form + Zod input validation
   - Dispatches to `POST /api/contact` with rate limiting (5 inquiries per 10-minute window)
   - Confetti burst celebration on successful delivery

6. **Admin Control Panel & Lead Tracker**
   - Located at `/admin`
   - Real-time review of submissions stored in SQLite
   - Status toggling: Pending, Replied, Flagged
   - Client metadata inspection: IP hash, user agent, referrer, timestamp

---

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/contact` | POST | Submits contact inquiries with rate limiting and database storage |
| `/api/health` | GET | Returns uptime, database connectivity, node version, and memory usage |
| `/api/ping-check` | GET | Real TCP/ICMP socket probe returning RTT min/avg/max/mdev and packet telemetry |
| `/api/network/subnet` | GET, POST | Calculates network address, broadcast, usable range, and Cisco CLI config |
| `/api/messages` | GET, PATCH | Admin endpoint to fetch and update status of contact submissions |

---

## Local Development & Setup

### Prerequisites
- Node.js v20+ (Node v26 recommended)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/kiinnggss/isaac-portfolio.git
cd isaac-portfolio

# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start -- -p 3005
```

---

## Author & License

**Gbodimowo Isaac**  
Software Engineer & Network Systems Specialist  
Lagos, Nigeria  
Email: [isaacgbodimowo@gmail.com](mailto:isaacgbodimowo@gmail.com)
