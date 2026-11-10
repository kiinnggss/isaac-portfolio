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
      {/* Section Header (No Eyebrow per Restraint Rule) */}
      <div className="mb-14 max-w-2xl">
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#090d16] tracking-tight">
          Experience & Education
        </h2>
        <p className="mt-3 text-base text-slate-800 font-normal leading-relaxed">
          Industry software delivery, computer science instruction, and university training.
        </p>
      </div>

      <div className="space-y-6">
        {experiences.map((exp) => {
          const Icon = exp.icon;
          return (
            <div
              key={exp.role + exp.organization}
              className="crystal-surface crystal-surface-hover rounded-3xl p-7 sm:p-9"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#090d16] text-orange-500 flex items-center justify-center shrink-0 mt-1">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full bg-[#090d16] text-white text-[11px] font-mono-tech uppercase tracking-wider">
                        {exp.period}
                      </span>
                      <span className="text-xs font-mono-tech text-slate-600">
                        {exp.location}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#090d16] mt-2.5 font-display">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-orange-600 font-display">
                      {exp.organization}
                    </div>

                    <ul className="mt-4 space-y-2.5 max-w-3xl">
                      {exp.highlights.map((h, idx) => (
                        <li key={idx} className="text-sm text-slate-700 flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0 mt-2" />
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mt-6">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="crystal-pill px-3 py-1 rounded-full text-xs font-mono-tech text-slate-800 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {exp.photo && exp.photoDetails && (
                  <div
                    onClick={() => setSelectedPhoto(exp.photoDetails)}
                    className="relative w-28 sm:w-32 h-32 sm:h-36 rounded-2xl overflow-hidden shrink-0 cursor-pointer group bg-slate-900 shadow-md transition-transform hover:scale-105 self-start border border-white"
                  >
                    <Image
                      src={exp.photo}
                      alt={exp.photoDetails.alt}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-[#090d16]/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
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
