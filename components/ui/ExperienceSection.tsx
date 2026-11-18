"use client";

import { useState } from "react";
import Image from "next/image";
import { Briefcase, GraduationCap, Laptop, Maximize2 } from "lucide-react";
import PhotoModal, { PhotoDetails } from "./PhotoModal";
import isaacGraduation from "@/public/images/isaac-graduation.jpg";
import isaacWorkspace from "@/public/images/isaac-workspace.jpg";
import { usePortfolioTheme } from "./ThemeProvider";

export default function ExperienceSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDetails | null>(null);
  const { effectiveAccent } = usePortfolioTheme();

  const experiences = [
    {
      period: "Industry Experience",
      role: "Web Developer Intern",
      organization: "Hoffenheim Tech",
      location: "Lagos, Nigeria",
      icon: Briefcase,
      highlights: [
        "Delivered production websites, client portals, and administrative web tools for business clients.",
        "Engineered API integrations, webhook consumers, and dynamic form submission pipelines with input sanitization.",
        "Provided technical consulting and authored system handover documentation for client maintenance teams.",
      ],
      tags: ["React", "Next.js", "REST APIs", "Node.js", "Tailwind CSS", "CMS Pipelines"],
      photo: isaacWorkspace,
      photoDetails: {
        src: isaacWorkspace,
        alt: "Gbodimowo Isaac at developer workstation during industry tenure",
        title: "Developer Workstation",
        subtitle: "Hoffenheim Tech / Production Web Systems",
        tag: "INDUSTRY TENURE",
        location: "Lagos, Nigeria",
        date: "Internship Tenure",
        context:
          "Gbodimowo Isaac at his developer workstation engineering full-stack client web solutions, data intake portals, and CMS workflows at Hoffenheim Tech.",
      },
    },
    {
      period: "Academic Instruction",
      role: "Computer Science & Programming Instructor",
      organization: "Edkints International School",
      location: "Lagos, Nigeria",
      icon: Laptop,
      highlights: [
        "Instructed students in foundational software engineering principles, Python programming, and algorithmic logic.",
        "Designed hands-on curriculum for structured code debugging and computational problem-solving.",
        "Mentored student teams on computer hardware maintenance, software testing, and technical presentations.",
      ],
      tags: ["Python", "Algorithms", "Curriculum Design", "Hardware Fundamentals"],
    },
    {
      period: "Higher Education",
      role: "B.Sc. in Computer Science",
      organization: "Babcock University",
      location: "Ogun / Lagos, Nigeria",
      icon: GraduationCap,
      highlights: [
        "Completed core computer science coursework covering data structures, operating systems, networking models, and relational databases.",
        "Configured routers, VLAN subnets, and packet routing topologies in practical networking laboratories.",
        "Combined software architecture fundamentals with CompTIA A+ physical hardware fault isolation.",
      ],
      tags: ["Computer Science", "Systems Architecture", "Databases", "Networking Theory"],
      photo: isaacGraduation,
      photoDetails: {
        src: isaacGraduation,
        alt: "Gbodimowo Isaac at Babcock University Convocation with degree scroll",
        title: "Academic Convocation Ceremony",
        subtitle: "Babcock University / B.Sc. in Computer Science",
        tag: "DEGREE CONFERRAL",
        location: "Babcock University, Nigeria",
        date: "Degree Award",
        context:
          "Gbodimowo Isaac in academic regalia celebrating degree conferral at Babcock University. Coursework across algorithms, distributed systems, network engineering, and database management.",
      },
    },
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 max-w-2xl">
        <h2 className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight">
          Experience &amp; Education
        </h2>
        <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--theme-muted)" }}>
          Industry software delivery, computer science instruction, and university training.
        </p>
      </div>

      <div className="space-y-6">
        {experiences.map((exp) => {
          const Icon = exp.icon;
          return (
            <div
              key={exp.role + exp.organization}
              className="neo-card neo-card-hover rounded-3xl p-6 sm:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mt-1 border-2"
                    style={{
                      backgroundColor: effectiveAccent,
                      color: "var(--theme-accent-text)",
                      borderColor: "var(--theme-border)",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full neo-console text-[11px] font-mono-tech uppercase tracking-wider font-semibold">
                        {exp.period}
                      </span>
                      <span className="text-xs font-mono-tech" style={{ color: "var(--theme-muted)" }}>
                        {exp.location}
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold mt-2.5 font-display uppercase tracking-wide">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-bold font-display" style={{ color: effectiveAccent }}>
                      {exp.organization}
                    </div>
                  </div>
                </div>

                {exp.photo && exp.photoDetails && (
                  <div
                    onClick={() => setSelectedPhoto(exp.photoDetails!)}
                    className="group relative w-full md:w-36 h-24 rounded-2xl overflow-hidden cursor-pointer border-2 shrink-0"
                    style={{ borderColor: "var(--theme-border)" }}
                  >
                    <Image
                      src={exp.photo}
                      alt={exp.photoDetails.alt}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>

              <ul className="mt-5 space-y-2 text-sm leading-relaxed" style={{ color: "var(--theme-ink)" }}>
                {exp.highlights.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ backgroundColor: effectiveAccent }}
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[11px] font-mono-tech font-semibold border"
                    style={{
                      backgroundColor: "var(--theme-surface-alt)",
                      borderColor: "var(--theme-border)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <PhotoModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  );
}
