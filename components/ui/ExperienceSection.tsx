"use client";

import { useState } from "react";
import Image from "next/image";
import { Briefcase, GraduationCap, Laptop, Maximize2 } from "lucide-react";
import PhotoModal, { PhotoDetails } from "./PhotoModal";
import isaacGraduation from "@/public/images/isaac-graduation.jpg";
import isaacWorkspace from "@/public/images/isaac-workspace.jpg";

export default function ExperienceSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDetails | null>(null);

  const experiences = [
    {
      period: "Industry Experience",
      role: "Web Developer Intern",
      organization: "Hoffenheim Tech",
      location: "Lagos, Nigeria",
      type: "Internship Tenure",
      icon: Briefcase,
      highlights: [
        "Delivered production websites, client portals, and administrative web tools for business clients.",
        "Engineered API integrations, webhook consumers, and dynamic form submission pipelines with data sanitization.",
        "Provided technical consulting and authored system handover documentation for client maintenance teams.",
      ],
      tags: ["React", "Next.js", "REST APIs", "Node.js", "Tailwind CSS", "CMS Pipelines"],
      photo: isaacWorkspace,
      photoDetails: {
        src: isaacWorkspace,
        alt: "Gbodimowo Isaac at developer workstation during industry tenure",
        title: "Developer Workstation",
        subtitle: "Hoffenheim Tech • Production Web Systems",
        tag: "INDUSTRY TENURE",
        location: "Lagos, Nigeria",
        date: "Internship Period",
        context:
          "Gbodimowo Isaac at his developer workstation engineering full-stack client web solutions, data intake portals, and CMS workflows at Hoffenheim Tech.",
      },
    },
    {
      period: "Academic Instruction",
      role: "Computer Science & Programming Instructor",
      organization: "Edkints International School",
      location: "Lagos, Nigeria",
      type: "Instruction & Mentorship",
      icon: Laptop,
      highlights: [
        "Instructed students in foundational software engineering principles, Python programming, and Scratch logic.",
        "Designed hands-on curriculum promoting algorithmic problem-solving and structured code debugging.",
        "Mentored student teams on computer hardware maintenance, software unit testing, and technical presentations.",
      ],
      tags: ["Python", "Scratch", "Algorithms", "Pedagogy", "Logic & Hardware Basics"],
    },
    {
      period: "Higher Education",
      role: "B.Sc. in Computer Science",
      organization: "Babcock University",
      location: "Ogun / Lagos, Nigeria",
      type: "Degree Program",
      icon: GraduationCap,
      highlights: [
        "In-depth studies covering data structures, operating systems, networking models, and relational database systems.",
        "Participated in systems research and practical networking labs configuring routers, subnets, and packet routing.",
        "Cultivated rigorous dual competency combining software architecture with physical hardware diagnostics.",
      ],
      tags: ["Computer Science", "Systems Architecture", "Databases", "Networking Theory"],
      photo: isaacGraduation,
      photoDetails: {
        src: isaacGraduation,
        alt: "Gbodimowo Isaac at Babcock University Convocation with degree scroll",
        title: "Academic Convocation Ceremony",
        subtitle: "Babcock University • B.Sc. in Computer Science",
        tag: "DEGREE CONFERRAL",
        location: "Babcock University, Nigeria",
        date: "Degree Award",
        context:
          "Gbodimowo Isaac in academic regalia celebrating degree conferral at Babcock University. Rigorous training across algorithms, distributed systems, network engineering, and database management.",
      },
    },
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/50 backdrop-blur-md">
          Career Background & Education
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-950 tracking-tight">
          Experience & Education
        </h2>
        <p className="mt-3 text-base text-slate-600 max-w-2xl font-normal">
          Practical industry internships, educational instruction, and formal university training.
        </p>
      </div>

      <div className="space-y-7">
        {experiences.map((exp) => {
          const Icon = exp.icon;
          return (
            <div
              key={exp.role + exp.organization}
              className="crystal-surface crystal-surface-hover rounded-3xl p-8 sm:p-9 shadow-[0_20px_40px_-12px_rgba(15,23,42,0.06)]"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.06)] flex items-center justify-center text-slate-800 shrink-0 mt-1 border border-white/90">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="crystal-pill text-xs font-semibold text-blue-700 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {exp.location}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mt-2 font-display">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-slate-600 font-display">
                      {exp.organization}
                    </div>

                    <ul className="mt-4 space-y-2.5 max-w-3xl">
                      {exp.highlights.map((h, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-start gap-2.5 font-normal">
                          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5 shadow-[0_0_6px_rgba(59,130,246,0.4)]" />
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mt-6">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="crystal-pill px-3 py-1 rounded-full text-xs text-slate-600 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Optional Attached Photo Plinth */}
                {exp.photo && exp.photoDetails && (
                  <div
                    onClick={() => setSelectedPhoto(exp.photoDetails)}
                    className="relative w-28 sm:w-32 h-32 sm:h-36 rounded-2xl overflow-hidden shrink-0 cursor-pointer group bg-slate-100 shadow-md transition-transform hover:scale-105 self-start border border-white/90"
                  >
                    <Image
                      src={exp.photo}
                      alt={exp.photoDetails.alt}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-2 right-2 p-1.5 rounded-full crystal-pill text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                      <Maximize2 className="w-3 h-3" />
                    </div>
                  </div>
                )}
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
