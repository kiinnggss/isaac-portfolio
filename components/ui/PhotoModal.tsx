"use client";

import { useEffect } from "react";
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
            onClick={onClose}
            className="absolute inset-0 bg-[#090d16]/75 backdrop-blur-xs"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#090d16] text-white">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-[#ea580c]/15 border border-[#ea580c]/30 text-[#fb923c] text-[11px] font-mono-tech font-semibold uppercase tracking-wider">
                  {photo.tag}
                </span>
                <span className="text-xs text-slate-300 hidden sm:flex items-center gap-1 font-mono-tech">
                  <MapPin className="w-3.5 h-3.5 text-[#ea580c]" />
                  {photo.location}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close photo view"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="p-5 sm:p-7 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Image Frame */}
              <div className="md:col-span-7 flex items-center justify-center">
                <div className="relative w-full max-h-[62vh] rounded-xl overflow-hidden border border-slate-200 bg-[#090d16] flex items-center justify-center">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={960}
                    height={1280}
                    className="w-full h-auto max-h-[62vh] object-contain"
                  />
                </div>
              </div>

              {/* Information Column */}
              <div className="md:col-span-5 space-y-4">
                <div>
                  <div className="text-[11px] font-mono-tech font-semibold text-[#ea580c] uppercase tracking-wider mb-1">
                    Authentic Documentation
                  </div>
                  <h3 className="text-xl font-display font-bold text-[#090d16] leading-snug">
                    {photo.title}
                  </h3>
                  <div className="text-sm font-medium text-slate-600 mt-1">
                    {photo.subtitle}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  {photo.context}
                </div>

                <div className="pt-2 text-xs text-slate-600 space-y-1 font-mono-tech">
                  <div>
                    <strong className="text-[#090d16]">Location:</strong> {photo.location}
                  </div>
                  {photo.date && (
                    <div>
                      <strong className="text-[#090d16]">Context:</strong> {photo.date}
                    </div>
                  )}
                  <div>
                    <strong className="text-[#090d16]">Subject:</strong> Gbodimowo Isaac
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono-tech">Gbodimowo Isaac Portfolio Archive</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-[#090d16] text-white hover:bg-[#ea580c] font-semibold transition-colors"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
