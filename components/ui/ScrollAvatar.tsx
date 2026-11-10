"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import isaacFullAvatar from "@/public/images/isaac-full-avatar.png";

export default function ScrollAvatar() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 20,
    mass: 0.6,
    restDelta: 0.001,
  });

  const left = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["86vw", "10vw", "88vw", "12vw", "85vw"]
  );

  const top = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["54vh", "56vh", "50vh", "56vh", "52vh"]
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.95, 0.9, 1.0, 0.92, 0.96]
  );

  const opacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.18, 0.14, 0.18, 0.14, 0.18]
  );

  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none hidden lg:block"
    >
      <motion.div
        style={{
          left,
          top,
          scale,
          opacity,
          transformOrigin: "center center",
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 h-[540px] w-auto flex items-center justify-center"
      >
        <Image
          src={isaacFullAvatar}
          alt=""
          className="h-full w-auto object-contain select-none pointer-events-none grayscale contrast-125"
        />
      </motion.div>
    </div>
  );
}
