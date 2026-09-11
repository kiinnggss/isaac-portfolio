import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/ui/HeroSection";
import ProjectCard from "@/components/ui/ProjectCard";
import BentoGrid from "@/components/ui/BentoGrid";
import TerminalViewer from "@/components/ui/TerminalViewer";
import ExperienceSection from "@/components/ui/ExperienceSection";
import ContactSection from "@/components/ui/ContactSection";
import Footer from "@/components/ui/Footer";
import { featuredProjects } from "@/lib/projects-data";
import { Terminal, Layers, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#080808] text-white selection:bg-[#bfff04] selection:text-black">
      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section */}
      <main>
        <HeroSection />

        {/* Featured Projects Showcase (The Matthew-style Section) */}
        <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
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

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono-tech text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-[#bfff04]" />
              <span>Click any card to inspect full topology & protocol spec</span>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* Interactive Bento Grid & Subnet Calculator */}
        <BentoGrid />

        {/* Live Network Playground & Interactive CLI Section */}
        <section id="terminal" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#00f0ff] uppercase tracking-widest mb-3">
                <Terminal className="w-3.5 h-3.5" /> Interactive CLI & Systems Probe
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
                Network Terminal
              </h2>
              <p className="mt-3 text-base text-neutral-400 max-w-2xl">
                Run live probes against our Next.js backend, inspect HSRP convergence states, or calculate IPv4 subnets in real time.
              </p>
            </div>

            <div className="text-xs font-mono-tech text-neutral-400 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[#00f0ff]">
                Live Socket & ICMP Simulator
              </span>
            </div>
          </div>

          <TerminalViewer />
        </section>

        {/* Experience & Academic Track */}
        <ExperienceSection />

        {/* Contact Drawer / Section */}
        <ContactSection />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
