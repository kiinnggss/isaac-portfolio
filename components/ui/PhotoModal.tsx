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
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
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
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                  {photo.tag}
                </span>
                <span className="text-xs text-slate-500 hidden sm:flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {photo.location}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                aria-label="Close photo view"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="p-5 sm:p-7 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Image Frame */}
              <div className="md:col-span-7 flex items-center justify-center">
                <div className="relative w-full max-h-[62vh] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
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
                  <div className="text-xs font-semibold text-blue-600 uppercase mb-1">
                    Authentic Documentation
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {photo.title}
                  </h3>
                  <div className="text-sm font-medium text-slate-600 mt-1">
                    {photo.subtitle}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  {photo.context}
                </div>

                <div className="pt-2 text-xs text-slate-500 space-y-1">
                  <div><strong>Location:</strong> {photo.location}</div>
                  {photo.date && <div><strong>Context:</strong> {photo.date}</div>}
                  <div><strong>Subject:</strong> Gbodimowo Isaac</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <span>Gbodimowo Isaac Portfolio Archive</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium transition-colors"
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
