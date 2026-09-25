"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import isaac3dAvatar from "@/public/images/isaac-3d-avatar.jpg";

export default function ScrollAvatar() {
  const { scrollYProgress } = useScroll();

  // Fluid physics spring mimicking a smooth PowerPoint Morph transition
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 18,
    mass: 0.6,
    restDelta: 0.001,
  });

  // PowerPoint Morph keyframe paths across 5 portfolio sections:
  // 1. Hero (0%): Prominently in the open center-right between text and portrait
  // 2. Projects (25%): Glides across the screen over to the left flank
  // 3. Skills Matrix (50%): Morphs back over to the right flank with a scale boost
  // 4. Terminal & Topology (75%): Morphs down into the mid-left flank
  // 5. Contact & Footer (100%): Centers smoothly in the background
  const left = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["50vw", "12vw", "78vw", "14vw", "50vw"]
  );

  const top = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["26vh", "44vh", "32vh", "52vh", "42vh"]
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1.0, 0.9, 1.15, 0.95, 1.05]
  );

  const rotate = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [-4, 8, -8, 6, 0]
  );

  // Full, crisp opacity so the character is clearly visible in the background
  const opacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.9, 0.85, 0.9, 0.85, 0.9]
  );

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Morphing 3D Avatar Vessel */}
      <motion.div
        style={{
          left,
          top,
          scale,
          rotate,
          opacity,
          transformOrigin: "center center",
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
      >
        {/* Ambient Chromatic Refraction Halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/40 via-indigo-300/30 to-emerald-400/20 blur-3xl scale-125" />

        {/* 3D Character Crystal Casing */}
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_24px_64px_-12px_rgba(37,99,235,0.4),0_0_0_3px_rgba(255,255,255,0.9)] bg-slate-900/10 backdrop-blur-xs">
          <Image
            src={isaac3dAvatar}
            alt="3D Avatar Morph"
            priority
            className="w-full h-full object-cover filter contrast-[1.05] saturate-[1.08]"
          />
          {/* Subtle Specular Catchlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/20 pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}
