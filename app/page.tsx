"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/ui/HeroSection";
import MarqueeTicker from "@/components/ui/MarqueeTicker";
import ProjectCard from "@/components/ui/ProjectCard";
import BentoGrid from "@/components/ui/BentoGrid";
import TerminalViewer from "@/components/ui/TerminalViewer";
import CiscoTopologyViewer from "@/components/ui/CiscoTopologyViewer";
import ExperienceSection from "@/components/ui/ExperienceSection";
import ContactSection from "@/components/ui/ContactSection";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import CommandPalette from "@/components/ui/CommandPalette";
import ResumeModal from "@/components/ui/ResumeModal";
import PhotoModal, { PhotoDetails } from "@/components/ui/PhotoModal";
import Toast, { ToastMessage } from "@/components/ui/Toast";
import { featuredProjects } from "@/lib/projects-data";
import { sound } from "@/lib/sound";
import { Terminal, Layers, Network, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import isaacPortrait from "@/public/images/isaac-portrait.jpg";
import isaacGraduation from "@/public/images/isaac-graduation.jpg";
import isaacWorkspace from "@/public/images/isaac-workspace.jpg";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDetails | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "web" | "network">("all");

  useEffect(() => {
    setSoundEnabled(sound.isEnabled());

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

  const handleSoundToggle = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
    setToast({
      id: Date.now().toString(),
      text: newState ? "Sound effects enabled" : "Sound effects muted",
      type: "info",
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("isaacgbodimowo@gmail.com");
    sound.playChime();
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
        tag: "OFFICIAL PORTRAIT",
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
        tag: "ENGINEERING FLOW",
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
    <div className="relative min-h-screen bg-[#080808] text-white selection:bg-[#bfff04] selection:text-black">
      {/* Custom Magnetic Cursor follower */}
      <CustomCursor />

      {/* Global Navigation */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
        onCopyEmail={handleCopyEmail}
        onSoundToggle={handleSoundToggle}
        soundEnabled={soundEnabled}
      />

      <main>
        {/* Editorial Hero Section */}
        <HeroSection />

        {/* Continuous Technical Marquee Ticker */}
        <MarqueeTicker />

        {/* Featured Projects Showcase (The Matthew-style Section) */}
        <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#bfff04] uppercase tracking-widest mb-3">
                <Layers className="w-3.5 h-3.5" /> Featured Production Systems
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
                Selected Works
              </h2>
              <p className="mt-3 text-base text-neutral-400 max-w-2xl">
                Distributed web architectures, Cisco Packet Tracer enterprise network topologies, and high-concurrency client platforms.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-neutral-950 border border-white/10">
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
                  onClick={() => {
                    sound.playClick();
                    setActiveFilter(tab.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-tech uppercase tracking-wider transition-all ${
                    activeFilter === tab.id
                      ? "bg-[#bfff04] text-black font-bold shadow-md"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
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

        {/* Interactive Bento Grid & Subnet Calculator */}
        <BentoGrid />

        {/* Live Network Playground & Interactive CLI Section */}
        <section id="terminal" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#00f0ff] uppercase tracking-widest mb-3">
                <Terminal className="w-3.5 h-3.5" /> Interactive CLI & Systems Probe
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
                Network Terminal & Topology
              </h2>
              <p className="mt-3 text-base text-neutral-400 max-w-2xl">
                Run live probes against the network edge, inspect HSRP convergence states, or explore the interactive Cisco topology below.
              </p>
            </div>

            <div className="text-xs font-mono-tech text-neutral-400 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[#00f0ff]">
                Live Socket & ICMP Probe
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

        {/* Contact Drawer / Section */}
        <ContactSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenPhoto={handleOpenPhoto}
        onCopyEmail={handleCopyEmail}
        onSoundToggle={handleSoundToggle}
        soundEnabled={soundEnabled}
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
