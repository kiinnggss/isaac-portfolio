"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import isaacFullAvatar from "@/public/images/isaac-full-avatar.png";

export default function ScrollAvatar() {
  const { scrollYProgress } = useScroll();

  // Fluid physics spring simulating PowerPoint Morph momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 18,
    mass: 0.6,
    restDelta: 0.001,
  });

  // PowerPoint Morph keyframe paths across the 5 portfolio sections:
  // 1. Hero (0%): Right-center background between text and hero portrait
  // 2. Projects (25%): Glides across the screen over to the left flank
  // 3. Skills Matrix (50%): Morphs over to the right flank with a subtle scale boost
  // 4. Terminal & Topology (75%): Morphs down into the mid-left flank
  // 5. Contact & Footer (100%): Centers smoothly in the background
  const left = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["52vw", "12vw", "82vw", "14vw", "50vw"]
  );

  const top = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["48vh", "52vh", "46vh", "54vh", "48vh"]
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1.0, 0.92, 1.1, 0.95, 1.05]
  );

  const rotate = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [-2, 5, -5, 4, 0]
  );

  // Full, crisp opacity without any background box
  const opacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.92, 0.85, 0.9, 0.85, 0.92]
  );

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Morphing Full-Body 3D Character (Transparent, No Background Box) */}
      <motion.div
        style={{
          left,
          top,
          scale,
          rotate,
          opacity,
          transformOrigin: "center center",
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 h-[480px] sm:h-[580px] md:h-[680px] w-auto flex items-center justify-center filter drop-shadow-[0_25px_40px_rgba(37,99,235,0.22)]"
      >
        {/* Soft Ambient Cyan/Blue Light Diffusion behind character */}
        <div className="absolute top-1/4 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-400/25 via-indigo-300/15 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* Full-Body Character Cutout */}
        <Image
          src={isaacFullAvatar}
          alt="3D Full Character"
          priority
          className="h-full w-auto object-contain select-none pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
