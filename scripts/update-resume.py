#!/usr/bin/env python3
"""
Executive Resume PDF Generator for Gbodimowo Isaac.
Parses lib/projects-data.ts and renders an executive-styled, ATS-friendly 2-page resume
into public/Gbodimowo_Isaac_Resume.pdf and public/resume.pdf using headless Chrome.
"""

import os
import re
import subprocess
import sys
import tempfile

def parse_projects(projects_file):
    if not os.path.exists(projects_file):
        return []
    with open(projects_file, "r", encoding="utf-8") as f:
        content = f.read()

    projects = []
    project_blocks = re.findall(r'\{\s*id:\s*"([^"]+)",(.*?)\n\s*\},', content, re.DOTALL)
    for pid, block in project_blocks:
        title_m = re.search(r'title:\s*"([^"]+)"', block)
        subtitle_m = re.search(r'subtitle:\s*"([^"]+)"', block)
        category_m = re.search(r'category:\s*"([^"]+)"', block)
        tags_m = re.search(r'tags:\s*\[(.*?)\]', block, re.DOTALL)
        
        tags = []
        if tags_m:
            tags = [t.strip().strip('"\'') for t in tags_m.group(1).split(",") if t.strip()]

        metrics = []
        metric_matches = re.findall(r'label:\s*"([^"]+)",\s*value:\s*"([^"]+)"(?:,\s*detail:\s*"([^"]+)")?', block)
        for lbl, val, det in metric_matches:
            metrics.append({"label": lbl, "value": val, "detail": det})

        demo_m = re.search(r'demoLink:\s*"([^"]+)"', block)
        code_m = re.search(r'codeLink:\s*"([^"]+)"', block)

        projects.append({
            "id": pid,
            "title": title_m.group(1) if title_m else pid,
            "subtitle": subtitle_m.group(1) if subtitle_m else "",
            "category": category_m.group(1) if category_m else "",
            "tags": tags,
            "metrics": metrics,
            "demoLink": demo_m.group(1) if demo_m else "",
            "codeLink": code_m.group(1) if code_m else "",
        })
    return projects

def build_project_entry(project, bullets):
    title = project["title"]
    category = project["category"]
    tags_str = ", ".join(project["tags"][:6])
    
    metrics_pills = ""
    for m in project["metrics"][:3]:
        metrics_pills += f'<span class="metric-pill"><strong>{m["label"]}:</strong> {m["value"]}</span>'

    bullets_html = "".join([f"<li>{b}</li>" for b in bullets])

    code_link_html = ""
    if project.get("codeLink"):
        code_link_html = f'<a href="{project["codeLink"]}" class="project-code-link">{project["codeLink"].replace("https://", "")}</a>'

    return f"""
    <div class="project-entry">
      <div class="project-header">
        <div class="project-title-row">
          <span class="project-title">{title}</span>
          <span class="project-category">{category}</span>
        </div>
        <div class="project-meta-row">
          <span class="project-stack">{tags_str}</span>
          {code_link_html}
        </div>
        <div class="metric-pills-row">{metrics_pills}</div>
      </div>
      <ul class="bullet-list">
        {bullets_html}
      </ul>
    </div>
    """

def build_html_resume(projects):
    project_map = {p["id"]: p for p in projects}

    car_pull = project_map.get("car-pull", {
        "title": "CAR PULL: Peer-to-Peer Transit & Carpooling Architecture",
        "category": "Distributed Web Architecture",
        "tags": ["Next.js 16", "TypeScript", "Tailwind CSS", "Geospatial Indexing", "PostgreSQL"],
        "metrics": [{"label": "Corridor Indexing", "value": "<45ms"}, {"label": "Transit Split", "value": "4-Tier"}, {"label": "Commuter Efficiency", "value": "3.2x"}],
        "codeLink": "https://github.com/kiinnggss/car-pull"
    })
    car_pull_bullets = [
        "<strong>Geospatial Corridor Clustering.</strong> Clustered commuter rides along primary Lagos arterial highways using bounding-box spatial containment with sub-45ms index latency.",
        "<strong>Automated Route-Split Pricing.</strong> Calculated multi-tier transit cost division based on distance intervals and peak traffic multiplier indices.",
        "<strong>Driver Operations Cockpit.</strong> Engineered a sequential pickup itinerary with waypoint routing, 5-minute broadcast alerts, and curbside verification.",
    ]

    cisco_top = project_map.get("cisco-network-topology", {
        "title": "Enterprise Network Simulation & Defense Topology",
        "category": "Enterprise Networking & Security",
        "tags": ["Cisco Packet Tracer", "Cisco IOS CLI", "CCNA 200-301", "HSRP v2", "802.1Q Inter-VLAN", "NAT/PAT", "Extended ACLs"],
        "metrics": [{"label": "VLAN Isolation", "value": "100%"}, {"label": "Failover Time", "value": "<3.0s"}, {"label": "Port Protection", "value": "Sticky MAC"}],
        "codeLink": "https://github.com/kiinnggss/ccna-interactive-hub"
    })
    cisco_bullets = [
        "<strong>Hierarchical Topology & Trunking.</strong> Built a 3-tier Core-Distribution-Access hierarchy with 802.1Q trunking and Router-on-a-Stick inter-VLAN routing.",
        "<strong>High Availability Gateway.</strong> Configured HSRP v2 Active/Standby redundancy between dual Cisco 2911 ISR routers with preemptive failover converging in under 3.0s.",
        "<strong>Perimeter Defense & WAN NAT.</strong> Enforced extended IPv4 ACLs guarding database server farms, dynamic NAT overload (PAT), and switch port security with sticky MAC learning.",
    ]

    antigravity = project_map.get("antigravity-mobile", {
        "title": "Google Antigravity Mobile Controller & Voice Supervisor",
        "category": "Distributed AI Systems & Web Architecture",
        "tags": ["Python 3.12", "FastAPI", "Server-Sent Events", "Asyncio Subprocesses", "Web Speech API", "PWA", "Cloudflare Tunnel"],
        "metrics": [{"label": "Stream Latency", "value": "<15ms"}, {"label": "Test Coverage", "value": "66 Tests (100%)"}, {"label": "Bundle Size", "value": "0 KB"}],
        "codeLink": "https://github.com/kiinnggss/joyboy_sys"
    })
    antigravity_bullets = [
        "<strong>Process Supervisor & Streaming.</strong> Built an asynchronous FastAPI streaming engine running CLI processes with SSE broadcast and concurrent stderr draining.",
        "<strong>Zero-Build Voice Interface.</strong> Developed a vanilla PWA frontend with Web Speech dictation, synthesized audio playback, and live terminal monitoring.",
        "<strong>Zero Trust Tunneling.</strong> Secured endpoints using HMAC SHA-256 session signatures, constant-time PIN authentication, and automated Cloudflare Quick Tunnel provisioning.",
    ]

    video_downloader = project_map.get("video-downloader", {
        "title": "Crystal: Mobile Video Downloader & Media Vault",
        "category": "Full-Stack Web & Media Streaming Architecture",
        "tags": ["Python 3.12", "FastAPI", "React 19", "yt-dlp", "Server-Sent Events", "HTTP 206 Streaming"],
        "metrics": [{"label": "Live Telemetry", "value": "<50ms"}, {"label": "Streaming", "value": "HTTP 206"}, {"label": "Test Coverage", "value": "48 Tests (100%)"}],
        "codeLink": "https://github.com/kiinnggss/video-downloader"
    })
    video_downloader_bullets = [
        "<strong>Media Stream Extraction & Telemetry.</strong> Built an asynchronous FastAPI pipeline driving yt-dlp workers with sub-50ms Server-Sent Events broadcasting speed, ETA, and progress metrics.",
        "<strong>Byte-Range Seekable Streaming.</strong> Implemented RFC 7233 HTTP 206 partial content streaming with range and suffix headers enabling instant audio and video playback scrubbing.",
        "<strong>Encrypted Private Vault & Crystal UI.</strong> Constructed a PIN-protected private vault with PBKDF2/SHA-256 tokens and a mobile-first translucent crystal glassmorphism interface.",
    ]

    page1_p1 = build_project_entry(car_pull, car_pull_bullets)
    page1_p2 = build_project_entry(cisco_top, cisco_bullets)
    page2_p1 = build_project_entry(antigravity, antigravity_bullets)
    page2_p2 = build_project_entry(video_downloader, video_downloader_bullets)

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Gbodimowo Isaac — Technical Resume</title>
<style>
  @page {{
    size: letter;
    margin: 12mm 15mm 12mm 15mm;
  }}

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}

  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1e293b;
    background: #ffffff;
    font-size: 9.2pt;
    line-height: 1.4;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}

  a {{
    color: #0284c7;
    text-decoration: none;
  }}

  .page-container {{
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}

  .page-break {{
    page-break-before: always;
    break-before: page;
  }}

  /* Page Header */
  .header {{
    border-bottom: 2px solid #0f172a;
    padding-bottom: 8px;
    margin-bottom: 11px;
  }}

  .header-top {{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }}

  .name {{
    font-size: 22pt;
    font-weight: 800;
    letter-spacing: -0.025em;
    color: #0f172a;
    line-height: 1;
  }}

  .tagline {{
    font-size: 10.5pt;
    font-weight: 600;
    color: #0369a1;
    margin-top: 4px;
    letter-spacing: -0.01em;
  }}

  .contact-bar {{
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 6px;
    font-size: 8.5pt;
    color: #475569;
  }}

  .contact-item {{
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }}

  .contact-separator {{
    color: #cbd5e1;
  }}

  /* Running Header on Page 2 */
  .running-header {{
    border-bottom: 1.5px solid #0f172a;
    padding-bottom: 6px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }}

  .running-name {{
    font-size: 11pt;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.01em;
  }}

  .running-subtitle {{
    font-size: 8.5pt;
    color: #64748b;
  }}

  .running-links {{
    font-size: 8.5pt;
    color: #0284c7;
  }}

  /* Sections */
  .section {{
    margin-bottom: 11px;
  }}

  .section-title {{
    font-size: 9.2pt;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #0f172a;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 3px;
    margin-bottom: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }}

  .section-title::after {{
    content: "";
    height: 2px;
    width: 22px;
    background: #0284c7;
    display: inline-block;
  }}

  .summary-text {{
    font-size: 9pt;
    color: #334155;
    line-height: 1.45;
  }}

  /* Two Column Row */
  .two-col-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }}

  .card-box {{
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 7px 10px;
  }}

  .card-title {{
    font-size: 9.2pt;
    font-weight: 700;
    color: #0f172a;
  }}

  .card-subtitle {{
    font-size: 8.2pt;
    font-weight: 600;
    color: #0369a1;
    margin-bottom: 3px;
  }}

  .card-text {{
    font-size: 8pt;
    color: #475569;
    line-height: 1.35;
  }}

  .cert-list {{
    list-style: none;
    font-size: 8pt;
    color: #334155;
  }}

  .cert-list li {{
    margin-bottom: 3px;
    display: flex;
    align-items: flex-start;
    gap: 5px;
  }}

  .cert-badge {{
    display: inline-block;
    padding: 1px 4px;
    font-size: 6.8pt;
    font-weight: 700;
    background: #e0f2fe;
    color: #0369a1;
    border-radius: 3px;
    flex-shrink: 0;
  }}

  /* Projects */
  .project-entry {{
    margin-bottom: 10px;
    break-inside: avoid;
  }}

  .project-header {{
    margin-bottom: 3px;
  }}

  .project-title-row {{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }}

  .project-title {{
    font-size: 9.6pt;
    font-weight: 700;
    color: #0f172a;
  }}

  .project-category {{
    font-size: 7.8pt;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }}

  .project-meta-row {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1px;
  }}

  .project-stack {{
    font-size: 7.8pt;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    color: #0284c7;
  }}

  .project-code-link {{
    font-size: 7.8pt;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    color: #64748b;
  }}

  .metric-pills-row {{
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 3px 0 4px 0;
  }}

  .metric-pill {{
    font-size: 7.3pt;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    padding: 1px 5px;
    color: #334155;
  }}

  .metric-pill strong {{
    color: #0f172a;
  }}

  .bullet-list {{
    list-style-type: disc;
    padding-left: 15px;
    font-size: 8.6pt;
    color: #334155;
    line-height: 1.36;
  }}

  .bullet-list li {{
    margin-bottom: 2.5px;
  }}

  .bullet-list li strong {{
    color: #0f172a;
  }}

  /* Skills Matrix */
  .skills-table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 8.4pt;
    margin-top: 2px;
  }}

  .skills-table tr {{
    border-bottom: 1px solid #f1f5f9;
  }}

  .skills-table tr:last-child {{
    border-bottom: none;
  }}

  .skills-category {{
    width: 24%;
    font-weight: 700;
    color: #0f172a;
    padding: 4px 6px 4px 0;
    vertical-align: top;
    white-space: nowrap;
  }}

  .skills-items {{
    width: 76%;
    color: #334155;
    padding: 4px 0;
    line-height: 1.35;
  }}

  /* Repositories Grid */
  .repo-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 4px;
  }}

  .repo-card {{
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    padding: 5px 8px;
    font-size: 8pt;
  }}

  .repo-card-title {{
    font-weight: 700;
    color: #0f172a;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 8.2pt;
  }}

  .repo-card-desc {{
    color: #64748b;
    font-size: 7.6pt;
    margin: 1px 0;
  }}

  .repo-card-link {{
    color: #0284c7;
    font-size: 7.5pt;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }}

  /* Page Footer */
  .page-footer {{
    margin-top: auto;
    padding-top: 6px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    font-size: 7.5pt;
    color: #94a3b8;
  }}
</style>
</head>
<body>

  <!-- ==================== PAGE 1 ==================== -->
  <div class="page-container">
    <div>
      <!-- Header -->
      <div class="header">
        <div class="header-top">
          <div>
            <div class="name">GBODIMOWO ISAAC</div>
            <div class="tagline">Software Engineer &amp; Network Systems Specialist</div>
          </div>
        </div>
        <div class="contact-bar">
          <span class="contact-item">Lagos, Nigeria</span>
          <span class="contact-separator">•</span>
          <span class="contact-item"><a href="mailto:isaacgbodimowo@gmail.com">isaacgbodimowo@gmail.com</a></span>
          <span class="contact-separator">•</span>
          <span class="contact-item">+234 816 714 8326</span>
          <span class="contact-separator">•</span>
          <span class="contact-item"><a href="https://github.com/kiinnggss">github.com/kiinnggss</a></span>
          <span class="contact-separator">•</span>
          <span class="contact-item"><a href="https://kiinnggss.github.io/isaac-portfolio/">kiinnggss.github.io/isaac-portfolio</a></span>
        </div>
      </div>

      <!-- Professional Summary -->
      <div class="section">
        <div class="section-title">Professional Summary</div>
        <p class="summary-text">
          Dual-competency engineer bridging full-stack software development with enterprise network routing and hardware-level diagnostics. Experienced in developing scalable TypeScript and Next.js platforms, engineering fault-tolerant Cisco network topologies with sub-second failover (HSRP, Router-on-a-Stick, extended ACLs), and conducting CompTIA A+ certified hardware fault isolation.
        </p>
      </div>

      <!-- Education & Credentials -->
      <div class="section">
        <div class="section-title">Education &amp; Technical Credentials</div>
        <div class="two-col-grid">
          <div class="card-box">
            <div class="card-title">B.Sc. in Computer Science</div>
            <div class="card-subtitle">Babcock University, Nigeria</div>
            <div class="card-text">
              Data Structures, Algorithm Design, Relational Database Models, Operating Systems, Computer Networks.
            </div>
          </div>
          <div class="card-box">
            <ul class="cert-list">
              <li>
                <span class="cert-badge">VERIFIED</span>
                <span><strong>CompTIA A+ Certified</strong> (Hardware &amp; Systems Diagnostics Core)</span>
              </li>
              <li>
                <span class="cert-badge">STUDYING</span>
                <span><strong>Cisco CCNA 200-301 Candidate</strong> (Enterprise Routing &amp; Security)</span>
              </li>
              <li>
                <span class="cert-badge">VERIFIED</span>
                <span><strong>New Horizons Technical Certification</strong> (Systems &amp; Networking)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Featured Systems 1 & 2 -->
      <div class="section">
        <div class="section-title">Core Systems Engineering</div>
        {page1_p1}
        {page1_p2}
      </div>
    </div>

    <!-- Page 1 Footer -->
    <div class="page-footer">
      <span>Gbodimowo Isaac — Technical Curriculum Vitae</span>
      <span>Page 1 of 2</span>
    </div>
  </div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="page-container page-break">
    <div>
      <!-- Running Header -->
      <div class="running-header">
        <div>
          <span class="running-name">GBODIMOWO ISAAC</span>
          <span class="running-subtitle"> — Technical Specification &amp; Engineering Systems</span>
        </div>
        <div class="running-links">
          <a href="https://kiinnggss.github.io/isaac-portfolio/">kiinnggss.github.io/isaac-portfolio</a>
        </div>
      </div>

      <!-- Featured Systems 3 & 4 -->
      <div class="section">
        <div class="section-title">Distributed AI &amp; Web Platforms</div>
        {page2_p1}
        {page2_p2}
      </div>

      <!-- Skills Matrix -->
      <div class="section">
        <div class="section-title">Technical Competencies Matrix</div>
        <table class="skills-table">
          <tr>
            <td class="skills-category">Networking &amp; Security</td>
            <td class="skills-items">Cisco IOS CLI, VLANs &amp; 802.1Q Trunking, HSRP v2 Redundancy, NAT/PAT, Extended ACLs, IPv4 Subnetting, Cisco Packet Tracer, Switch Port Security.</td>
          </tr>
          <tr>
            <td class="skills-category">Software Engineering</td>
            <td class="skills-items">TypeScript, JavaScript, Next.js 16 (App Router), React 19, Python 3.12, FastAPI, Tailwind CSS, REST APIs, Server-Sent Events, HTML5, CSS3.</td>
          </tr>
          <tr>
            <td class="skills-category">Databases &amp; Tooling</td>
            <td class="skills-items">PostgreSQL, SQLite, Cloudflare Quick Tunnels, Git, GitHub, Linux/Unix Shell, Postman, Vitest, Pytest.</td>
          </tr>
          <tr>
            <td class="skills-category">Hardware Diagnostics</td>
            <td class="skills-items">CompTIA A+ PC Hardware assembly, UEFI/BIOS configuration, power supply and motherboard diagnostics, component fault isolation.</td>
          </tr>
        </table>
      </div>

      <!-- Verified Repositories -->
      <div class="section">
        <div class="section-title">Verified Code Repositories &amp; Topologies</div>
        <div class="repo-grid">
          <div class="repo-card">
            <div class="repo-card-title">kiinnggss/car-pull</div>
            <div class="repo-card-desc">Transit ridesharing architecture with geospatial corridor indexing</div>
            <a href="https://github.com/kiinnggss/car-pull" class="repo-card-link">github.com/kiinnggss/car-pull</a>
          </div>
          <div class="repo-card">
            <div class="repo-card-title">kiinnggss/ccna-interactive-hub</div>
            <div class="repo-card-desc">Enterprise 3-tier Cisco topology with HSRP v2 failover and ACLs</div>
            <a href="https://github.com/kiinnggss/ccna-interactive-hub" class="repo-card-link">github.com/kiinnggss/ccna-interactive-hub</a>
          </div>
          <div class="repo-card">
            <div class="repo-card-title">kiinnggss/joyboy_sys</div>
            <div class="repo-card-desc">Voice controller and streaming supervisor with Cloudflare tunnel</div>
            <a href="https://github.com/kiinnggss/joyboy_sys" class="repo-card-link">github.com/kiinnggss/joyboy_sys</a>
          </div>
          <div class="repo-card">
            <div class="repo-card-title">kiinnggss/video-downloader</div>
            <div class="repo-card-desc">Mobile video inspector, SSE telemetry downloader, and private vault</div>
            <a href="https://github.com/kiinnggss/video-downloader" class="repo-card-link">github.com/kiinnggss/video-downloader</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Page 2 Footer -->
    <div class="page-footer">
      <span>Gbodimowo Isaac — Technical Curriculum Vitae</span>
      <span>Page 2 of 2</span>
    </div>
  </div>

</body>
</html>
"""
    return html

def render_html_to_pdf(html_content, output_pdf_path):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as f:
        f.write(html_content)
        temp_html_path = f.name

    try:
        cmd = [
            "google-chrome",
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--no-pdf-header-footer",
            f"--print-to-pdf={output_pdf_path}",
            temp_html_path
        ]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=25)
        if res.returncode == 0 and os.path.exists(output_pdf_path) and os.path.getsize(output_pdf_path) > 1000:
            print(f"Generated PDF with headless Chrome: {output_pdf_path} ({os.path.getsize(output_pdf_path)} bytes)")
            return True
        else:
            print(f"Chrome PDF generation failed (code {res.returncode}): {res.stderr.decode('utf-8')}")
            return False
    finally:
        if os.path.exists(temp_html_path):
            os.remove(temp_html_path)

def generate_resume(output_path, projects_file):
    projects = parse_projects(projects_file)
    html_content = build_html_resume(projects)

    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    success = render_html_to_pdf(html_content, output_path)
    if not success:
        sys.exit(1)

    dir_name = os.path.dirname(output_path)
    secondary_path = os.path.join(dir_name, "resume.pdf")
    with open(output_path, "rb") as src, open(secondary_path, "wb") as dst:
        dst.write(src.read())
    print(f"Synchronized copy to: {secondary_path} ({os.path.getsize(secondary_path)} bytes)")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output = os.path.join(base_dir, "public", "Gbodimowo_Isaac_Resume.pdf")
    data_file = os.path.join(base_dir, "lib", "projects-data.ts")
    generate_resume(output, data_file)
