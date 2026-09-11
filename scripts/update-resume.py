#!/usr/bin/env python3
"""
Dynamic Resume PDF Generator for Gbodimowo Isaac.
Generates public/Gbodimowo_Isaac_Resume.pdf using standard PDF 1.4 syntax.
"""
import os
import re
import sys

def parse_projects(projects_file):
    if not os.path.exists(projects_file):
        return []
    with open(projects_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract title and subtitle
    titles = re.findall(r'title:\s*"([^"]+)"', content)
    subtitles = re.findall(r'subtitle:\s*"([^"]+)"', content)
    categories = re.findall(r'category:\s*"([^"]+)"', content)

    projects = []
    for i in range(len(titles)):
        projects.append({
            "title": titles[i],
            "subtitle": subtitles[i] if i < len(subtitles) else "",
            "category": categories[i] if i < len(categories) else "",
        })
    return projects

def generate_resume_pdf(output_path, projects_file):
    projects = parse_projects(projects_file)

    content_lines = [
        "BT",
        "/F1 22 Tf",
        "50 755 Td",
        "(GBODIMOWO ISAAC) Tj",
        "/F1 11 Tf",
        "0 -20 Td",
        "(Software Engineer & Network Systems Specialist | Lagos, Nigeria) Tj",
        "0 -15 Td",
        "(Email: isaacgbodimowo@gmail.com | Portfolio: https://kiinnggss.github.io/isaac-portfolio/) Tj",
        "/F1 13 Tf",
        "0 -28 Td",
        "(PROFESSIONAL SUMMARY) Tj",
        "/F1 10 Tf",
        "0 -15 Td",
        "(Software Engineer with dual expertise in scalable web architectures and enterprise network systems.) Tj",
        "0 -13 Td",
        "(Proven track record engineering Next.js platforms, multi-VLAN Cisco Packet Tracer topologies,) Tj",
        "0 -13 Td",
        "(HSRP gateway redundancy, static/dynamic NAT translation, and CompTIA A+ systems diagnostics.) Tj",
        "/F1 13 Tf",
        "0 -26 Td",
        "(EDUCATION & CREDENTIALS) Tj",
        "/F1 10 Tf",
        "0 -15 Td",
        "(- B.Sc. in Computer Science - Babcock University) Tj",
        "0 -13 Td",
        "(- CompTIA A+ Certified - Hardware & Systems Diagnostics Core) Tj",
        "0 -13 Td",
        "(- New Horizons Technical Certification - Systems & Networking) Tj",
        "0 -13 Td",
        "(- Cisco CCNA 200-301 Candidate) Tj",
        "/F1 13 Tf",
        "0 -26 Td",
        "(FEATURED PROJECTS & SYSTEMS) Tj",
    ]

    # Dynamically inject up to 4 projects
    for idx, p in enumerate(projects[:4]):
        clean_title = p["title"].replace("(", "").replace(")", "").replace("—", "-")
        clean_sub = p["subtitle"].replace("(", "").replace(")", "").replace("—", "-")
        content_lines.extend([
            "/F1 10 Tf",
            "0 -16 Td",
            f"({idx + 1}. {clean_title}) Tj",
            "/F1 9 Tf",
            "0 -12 Td",
            f"(   {clean_sub[:95]}) Tj",
        ])

    content_lines.extend([
        "/F1 13 Tf",
        "0 -26 Td",
        "(TECHNICAL MATRIX) Tj",
        "/F1 10 Tf",
        "0 -15 Td",
        "(- Networking: Cisco IOS, VLANs & Trunking, HSRP v2, NAT/PAT, ACLs, Subnetting, Packet Tracer) Tj",
        "0 -13 Td",
        "(- Software: Next.js 16, React 19, TypeScript, Python, Java, REST APIs, Tailwind CSS, SQLite/Postgres) Tj",
        "0 -13 Td",
        "(- Hardware & Tools: CompTIA A+ diagnostics, PC assembly, Linux/Unix shell, Git/GitHub, Canva) Tj",
        "ET"
    ])

    stream_content = "\n".join(content_lines).encode("latin-1", errors="replace")
    stream_len = len(stream_content)

    pdf = bytearray()
    pdf.extend(b"%PDF-1.4\n")
    offsets = []

    def add_object(obj_bytes):
        offsets.append(len(pdf))
        pdf.extend(obj_bytes)
        pdf.extend(b"\n")

    add_object(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj")
    add_object(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj")
    add_object(b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj")
    obj4_header = f"4 0 obj\n<< /Length {stream_len} >>\nstream\n".encode("latin-1")
    add_object(obj4_header + stream_content + b"\nendstream\nendobj")
    add_object(b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj")

    xref_offset = len(pdf)
    pdf.extend(f"xref\n0 {len(offsets) + 1}\n".encode("latin-1"))
    pdf.extend(b"0000000000 65535 f \n")
    for off in offsets:
        pdf.extend(f"{off:010d} 00000 n \n".encode("latin-1"))
    pdf.extend(f"trailer\n<< /Size {len(offsets) + 1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n".encode("latin-1"))

    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    with open(output_path, "wb") as f:
        f.write(pdf)
    print(f"Updated resume PDF at: {output_path} ({len(pdf)} bytes)")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output = os.path.join(base_dir, "public", "Gbodimowo_Isaac_Resume.pdf")
    data_file = os.path.join(base_dir, "lib", "projects-data.ts")
    generate_resume_pdf(output, data_file)
