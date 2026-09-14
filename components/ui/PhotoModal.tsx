"use client";

import { useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, CheckCircle } from "lucide-react";

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

  if (!photo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-950 border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-neutral-900/60">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-neutral-800 border border-white/10 text-[#bfff04] font-mono-tech text-xs uppercase font-semibold">
                  {photo.tag}
                </span>
                <span className="text-xs font-mono-tech text-neutral-400 hidden sm:flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  {photo.location}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                aria-label="Close photo view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Image Frame */}
              <div className="md:col-span-7 flex items-center justify-center">
                <div className="relative w-full max-h-[62vh] rounded-xl overflow-hidden border border-white/10 bg-neutral-900 flex items-center justify-center">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={960}
                    height={1280}
                    className="w-full h-auto max-h-[62vh] object-contain rounded-xl"
                    priority
                  />
                </div>
              </div>

              {/* Context Details */}
              <div className="md:col-span-5 space-y-4">
                <div>
                  <div className="text-xs font-mono-tech text-[#00f0ff] uppercase tracking-wider">
                    Authentic Documentation
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1 font-mono-tech">
                    {photo.subtitle}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 space-y-3">
                  <div className="text-xs text-neutral-300 leading-relaxed">
                    {photo.context}
                  </div>

                  <div className="pt-3 border-t border-white/5 flex flex-col gap-2 text-xs font-mono-tech text-neutral-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#bfff04]" />
                      <span>{photo.location}</span>
                    </div>
                    {photo.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" />
                        <span>{photo.date}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verified Credentials • Gbodimowo Isaac</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono-tech transition-colors"
                  >
                    Close Viewer
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
