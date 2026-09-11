"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Laptop, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      period: "Internship Tenure",
      role: "Web Developer Intern",
      organization: "Hoffenheim Tech",
      location: "Lagos, Nigeria",
      type: "Industry Experience",
      icon: Briefcase,
      accent: "#bfff04",
      highlights: [
        "Delivered production websites, client portals, and administrative web tools for business clients.",
        "Engineered API integrations, webhook consumers, and dynamic form submission pipelines with data sanitization.",
        "Provided technical consulting and authored system handover documentation for client maintenance teams.",
      ],
      tags: ["React", "Next.js", "REST APIs", "Node.js", "Tailwind CSS", "CMS Pipelines"],
    },
    {
      period: "Academic Instruction",
      role: "Computer Science & Programming Instructor",
      organization: "Edkints International School",
      location: "Lagos, Nigeria",
      type: "Instruction & Mentorship",
      icon: Laptop,
      accent: "#00f0ff",
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
      accent: "#bfff04",
      highlights: [
        "In-depth studies covering data structures, operating systems, networking models, and relational database systems.",
        "Participated in systems research and practical networking labs configuring routers, subnets, and packet routing.",
        "Cultivated rigorous dual competency combining software architecture with physical hardware diagnostics.",
      ],
      tags: ["Computer Science", "Systems Architecture", "Databases", "Networking Theory"],
    },
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#00f0ff] uppercase tracking-widest mb-3">
          <Briefcase className="w-3.5 h-3.5" /> Career Trajectory & Pedigree
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
          Experience & Education
        </h2>
        <p className="mt-3 text-base text-neutral-400 max-w-2xl">
          Practical industry internships, educational instruction, and rigorous university training.
        </p>
      </div>

      <div className="relative border-l border-white/10 ml-4 sm:ml-8 space-y-12">
        {experiences.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Timeline Marker Dot */}
              <div
                className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-neutral-950 border-2 transition-all duration-300 group-hover:scale-125"
                style={{ borderColor: item.accent }}
              />

              <div className="rounded-2xl bg-neutral-900/40 border border-white/10 p-6 sm:p-8 hover:border-white/20 transition-all">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-tech uppercase font-medium"
                      style={{
                        backgroundColor: `${item.accent}15`,
                        color: item.accent,
                        borderColor: `${item.accent}40`,
                        borderWidth: 1,
                      }}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs font-mono-tech text-neutral-400">
                      {item.location}
                    </span>
                  </div>
                  <span className="text-xs font-mono-tech text-neutral-400">
                    {item.period}
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-[#bfff04] transition-colors">
                    {item.role}
                  </h3>
                  <span className="text-neutral-500 font-mono-tech text-sm">@</span>
                  <span className="text-base sm:text-lg font-medium text-neutral-300">
                    {item.organization}
                  </span>
                </div>

                {/* Highlights */}
                <ul className="mt-4 space-y-2.5">
                  {item.highlights.map((h, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: item.accent }}
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono-tech bg-neutral-950 text-neutral-400 border border-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
