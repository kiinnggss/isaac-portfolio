"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import isaac3dAvatar from "@/public/images/isaac-3d-avatar.jpg";

export default function ScrollAvatar() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // Smooth physics spring simulating the fluid momentum of a PowerPoint Morph transition
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 18,
    mass: 0.7,
    restDelta: 0.001,
  });

  // PowerPoint Morph keyframe coordinates across portfolio sections:
  // 1. Hero (0%): Upper right corner behind the intro
  // 2. Projects (25%): Glides gracefully across to the left flank
  // 3. Skills Matrix (50%): Morphs over to the right flank with a scale boost
  // 4. Terminal & Topology (75%): Morphs down into the mid-left gutter
  // 5. Contact & Footer (100%): Centers behind the final call to action
  const left = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["72vw", "10vw", "75vw", "12vw", "50vw"]
  );

  const top = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["22vh", "46vh", "32vh", "54vh", "42vh"]
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1.0, 0.88, 1.15, 0.92, 1.08]
  );

  const rotate = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [-6, 8, -8, 6, 0]
  );

  const opacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.26, 0.22, 0.26, 0.22, 0.28]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
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
        className="absolute -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-88 sm:h-88 md:w-[420px] md:h-[420px]"
      >
        {/* Ambient Chromatic Refraction Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/25 via-indigo-300/15 to-transparent blur-3xl scale-125" />

        {/* Organic Crystal Circular Vignette */}
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_24px_64px_-16px_rgba(37,99,235,0.28)] border border-white/50 backdrop-blur-xs">
          <Image
            src={isaac3dAvatar}
            alt=""
            priority
            className="w-full h-full object-cover filter contrast-[1.06] saturate-[1.08]"
          />
          {/* Subtle Specular Catchlight */}
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-white/45 mix-blend-soft-light" />
        </div>
      </motion.div>
    </div>
  );
}
