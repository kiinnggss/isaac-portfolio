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
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
          Career Background & Education
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
          Experience & Education
        </h2>
        <p className="mt-2 text-base text-slate-600 max-w-2xl">
          Practical industry internships, educational instruction, and formal university training.
        </p>
      </div>

      <div className="space-y-6">
        {experiences.map((exp) => {
          const Icon = exp.icon;
          return (
            <div
              key={exp.role + exp.organization}
              className="rounded-xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-1">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                        {exp.period}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {exp.location}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mt-1.5">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-slate-700">
                      {exp.organization}
                    </div>

                    <ul className="mt-4 space-y-2 max-w-3xl">
                      {exp.highlights.map((h, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md text-xs bg-slate-100 text-slate-600 border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Optional Attached Photo */}
                {exp.photo && exp.photoDetails && (
                  <div
                    onClick={() => setSelectedPhoto(exp.photoDetails)}
                    className="relative w-24 sm:w-28 h-28 sm:h-32 rounded-lg overflow-hidden border border-slate-200 shrink-0 cursor-pointer group bg-slate-100 shadow-xs hover:border-blue-400 transition-all self-start"
                  >
                    <Image
                      src={exp.photo}
                      alt={exp.photoDetails.alt}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-1 right-1 p-0.5 rounded bg-white/80 backdrop-blur-xs text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
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
