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
import ThemeSwitcherModal from "@/components/ui/ThemeSwitcherModal";
import Toast, { ToastMessage } from "@/components/ui/Toast";
import { featuredProjects } from "@/lib/projects-data";
import { usePortfolioTheme } from "@/components/ui/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

import isaacPortrait from "@/public/images/isaac-portrait.webp";
import isaacGraduation from "@/public/images/isaac-graduation.webp";
import isaacWorkspace from "@/public/images/isaac-workspace.webp";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDetails | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "web" | "network">("all");
  const { effectiveAccent } = usePortfolioTheme();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
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
        subtitle: "B.Sc. in Computer Science / Babcock University",
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
        subtitle: "Lagos Tech Hub / Systems & Architecture Lab",
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
        project.category.toLowerCase().includes("peer") ||
        project.category.toLowerCase().includes("ai") ||
        project.category.toLowerCase().includes("mobile")
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
    <div
      className="relative min-h-screen bg-memphis-canvas"
      style={{
        backgroundColor: "var(--theme-bg)",
        color: "var(--theme-ink)",
      }}
    >
      {/* Global Navigation */}
      <Navbar
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenThemeSwitcher={() => setThemeModalOpen(true)}
      />

      <main className="relative z-10">
        {/* Creative Mints Isometric Studio Hero */}
        <HeroSection onOpenResume={() => setResumeModalOpen(true)} />

        {/* Featured Projects Showcase */}
        <section id="work" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono-tech font-bold uppercase tracking-[0.16em] mb-3 px-3.5 py-1.5 rounded-full neo-pill">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: effectiveAccent }} />
                <span>Production Systems &amp; Architecture</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight">
                Selected Works
              </h2>
              <p className="mt-3 text-base max-w-[60ch]" style={{ color: "var(--theme-muted)" }}>
                Distributed web architectures, Cisco Packet Tracer enterprise topologies, and high-concurrency client platforms.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: "all", label: `All Works (${featuredProjects.length})` },
                  { id: "web", label: "Web & AI Architecture" },
                  { id: "network", label: "Cisco Networks" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeFilter === tab.id ? "neo-btn-primary" : "neo-pill hover:opacity-80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
        <section id="terminal" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight">
                Network Terminal &amp; Topology
              </h2>
              <p className="mt-3 text-base max-w-[60ch]" style={{ color: "var(--theme-muted)" }}>
                Run live probes against the network edge, inspect HSRP gateway redundancy, or explore the interactive Cisco topology below.
              </p>
            </div>

            <div className="px-4 py-2 rounded-full neo-console text-xs font-mono-tech flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active Edge Node: Lagos</span>
            </div>
          </div>

          <CiscoTopologyViewer />
          <TerminalViewer />
        </section>

        {/* Experience & Academic Track */}
        <ExperienceSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      <Footer />

      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenPhoto={handleOpenPhoto}
        onCopyEmail={handleCopyEmail}
        onOpenThemeSwitcher={() => setThemeModalOpen(true)}
      />

      {/* Workspace Theme Switcher Modal */}
      <ThemeSwitcherModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
        onSaved={(name) =>
          setToast({
            id: Date.now().toString(),
            text: `Workspace theme saved: ${name}`,
            type: "success",
          })
        }
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
