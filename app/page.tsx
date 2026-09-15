"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/ui/HeroSection";
import ProjectCard from "@/components/ui/ProjectCard";
import BentoGrid from "@/components/ui/BentoGrid";
import TerminalViewer from "@/components/ui/TerminalViewer";
import CiscoTopologyViewer from "@/components/ui/CiscoTopologyViewer";
import ExperienceSection from "@/components/ui/ExperienceSection";
import ContactSection from "@/components/ui/ContactSection";
import Footer from "@/components/ui/Footer";
import CommandPalette from "@/components/ui/CommandPalette";
import ResumeModal from "@/components/ui/ResumeModal";
import PhotoModal, { PhotoDetails } from "@/components/ui/PhotoModal";
import Toast, { ToastMessage } from "@/components/ui/Toast";
import { featuredProjects } from "@/lib/projects-data";
import { motion, AnimatePresence } from "framer-motion";

import isaacPortrait from "@/public/images/isaac-portrait.jpg";
import isaacGraduation from "@/public/images/isaac-graduation.jpg";
import isaacWorkspace from "@/public/images/isaac-workspace.jpg";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDetails | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "web" | "network">("all");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K or '/' to open command palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("isaacgbodimowo@gmail.com");
    setToast({
      id: Date.now().toString(),
      text: "Email copied: isaacgbodimowo@gmail.com",
      type: "success",
    });
  };

  const handleOpenPhoto = (type: "portrait" | "graduation" | "workspace") => {
    if (type === "portrait") {
      setSelectedPhoto({
        src: isaacPortrait,
        alt: "Gbodimowo Isaac in dark formal suit and sunglasses",
        title: "Official Portrait",
        subtitle: "Software Engineer & Network Systems Specialist",
        tag: "PORTRAIT",
        location: "Lagos, Nigeria",
        date: "Verified Spec",
        context:
          "Official portrait of Gbodimowo Isaac. Dual expertise across scalable Next.js web architectures, enterprise Cisco IOS topologies, and hardware diagnostic engineering.",
      });
    } else if (type === "graduation") {
      setSelectedPhoto({
        src: isaacGraduation,
        alt: "Gbodimowo Isaac at Babcock University Convocation in academic regalia",
        title: "Academic Convocation Ceremony",
        subtitle: "B.Sc. in Computer Science • Babcock University",
        tag: "DEGREE CONFERRAL",
        location: "Babcock University, Nigeria",
        date: "Class of Computer Science",
        context:
          "Gbodimowo Isaac celebrating his degree conferral at Babcock University with his diploma scroll and graduation regalia. Coursework in operating systems, algorithms, distributed networks, and database administration.",
      });
    } else {
      setSelectedPhoto({
        src: isaacWorkspace,
        alt: "Gbodimowo Isaac at engineering workstation with headphones in deep flow state",
        title: "Systems Engineering Workstation",
        subtitle: "Lagos Tech Hub • Systems & Architecture Lab",
        tag: "ENGINEERING",
        location: "Lagos, Nigeria",
        date: "Active Development",
        context:
          "Gbodimowo Isaac at his workstation in deep engineering flow. Designing distributed backend pipelines, troubleshooting network topologies, and verifying system diagnostics.",
      });
    }
  };

  const filteredProjects = featuredProjects.filter((project) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "web") {
      return (
        project.category.toLowerCase().includes("transit") ||
        project.category.toLowerCase().includes("web") ||
        project.category.toLowerCase().includes("peer")
      );
    }
    if (activeFilter === "network") {
      return (
        project.category.toLowerCase().includes("network") ||
        project.category.toLowerCase().includes("defense")
      );
    }
    return true;
  });

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Global Navigation */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
        onCopyEmail={handleCopyEmail}
      />

      <main>
        {/* Editorial Hero Section */}
        <HeroSection />

        {/* Featured Projects Showcase */}
        <section id="work" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
                Production Systems & Architecture
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
                Selected Works
              </h2>
              <p className="mt-2 text-base text-slate-600 max-w-2xl">
                Distributed web architectures, Cisco Packet Tracer enterprise topologies, and high-concurrency client platforms.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-slate-100 border border-slate-200">
              {(
                [
                  { id: "all", label: "All Works (3)" },
                  { id: "web", label: "Web Architecture (2)" },
                  { id: "network", label: "Cisco Networks (1)" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    activeFilter === tab.id
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Technical Matrix & Credentials */}
        <BentoGrid />

        {/* Systems Terminal & Interactive Topology */}
        <section id="terminal" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
                Systems Diagnostics & Network Simulation
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
                Network Terminal & Topology
              </h2>
              <p className="mt-2 text-base text-slate-600 max-w-2xl">
                Run live probes against the network edge, inspect HSRP gateway redundancy, or explore the interactive Cisco topology below.
              </p>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                Active Edge Node: Lagos
              </span>
            </div>
          </div>

          {/* Interactive Cisco SVG Topology Inspector */}
          <CiscoTopologyViewer />

          {/* Interactive Terminal Emulator */}
          <TerminalViewer />
        </section>

        {/* Experience & Academic Track */}
        <ExperienceSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenPhoto={handleOpenPhoto}
        onCopyEmail={handleCopyEmail}
      />

      {/* In-Browser Resume Quick Reader Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Global Photo Lightbox Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      {/* Floating Action Toast Notification */}
      <Toast
        toast={toast}
        onDismiss={() => setToast(null)}
      />
    </div>
  );
}
