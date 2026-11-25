"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";

export interface PhotoDetails {
  src: StaticImageData | string;
  alt: string;
  title: string;
  subtitle: string;
  tag: string;
  location: string;
  date?: string;
  context: string;
}

interface PhotoModalProps {
  photo: PhotoDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotoModal({ photo, isOpen, onClose }: PhotoModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!photo || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl max-h-[90vh] neo-card rounded-2xl overflow-hidden flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="p-4 sm:p-5 border-b-2 flex items-center justify-between neo-console border-x-0 border-t-0"
              style={{ borderColor: "var(--theme-border)" }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono-tech font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: "var(--theme-accent)",
                    color: "var(--theme-accent-text)",
                  }}
                >
                  {photo.tag}
                </span>
                <span className="text-xs opacity-80 hidden sm:flex items-center gap-1 font-mono-tech">
                  <MapPin className="w-3.5 h-3.5" style={{ color: "var(--theme-accent)" }} />
                  {photo.location}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/10 border border-white/15 hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close photo view"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="p-5 sm:p-7 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 flex items-center justify-center">
                <div
                  className="relative w-full max-h-[62vh] rounded-xl overflow-hidden border-2 bg-black flex items-center justify-center"
                  style={{ borderColor: "var(--theme-border)" }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={960}
                    height={1280}
                    className="w-full h-auto max-h-[62vh] object-contain"
                  />
                </div>
              </div>

              <div className="md:col-span-5 space-y-4">
                <div>
                  <div
                    className="text-[11px] font-mono-tech font-bold uppercase tracking-wider mb-1"
                    style={{ color: "var(--theme-accent)" }}
                  >
                    Authentic Documentation
                  </div>
                  <h3 className="text-2xl font-display font-extrabold uppercase tracking-wide leading-snug">
                    {photo.title}
                  </h3>
                  <div className="text-sm font-medium mt-1" style={{ color: "var(--theme-muted)" }}>
                    {photo.subtitle}
                  </div>
                </div>

                <div
                  className="p-4 rounded-xl border-2 text-xs leading-relaxed"
                  style={{
                    backgroundColor: "var(--theme-surface-alt)",
                    borderColor: "var(--theme-border)",
                  }}
                >
                  {photo.context}
                </div>

                <div className="pt-2 text-xs space-y-1 font-mono-tech" style={{ color: "var(--theme-muted)" }}>
                  <div>
                    <strong style={{ color: "var(--theme-ink)" }}>Location:</strong> {photo.location}
                  </div>
                  {photo.date && (
                    <div>
                      <strong style={{ color: "var(--theme-ink)" }}>Context:</strong> {photo.date}
                    </div>
                  )}
                  <div>
                    <strong style={{ color: "var(--theme-ink)" }}>Subject:</strong> Gbodimowo Isaac
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="p-4 border-t-2 flex items-center justify-between text-xs"
              style={{
                borderColor: "var(--theme-border)",
                backgroundColor: "var(--theme-surface-alt)",
                color: "var(--theme-muted)",
              }}
            >
              <span className="font-mono-tech">Gbodimowo Isaac Portfolio Archive</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg neo-btn-primary font-bold cursor-pointer"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
