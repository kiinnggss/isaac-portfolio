"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  text: string;
  type?: "success" | "info";
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export default function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-900/95 border border-white/15 text-white shadow-2xl backdrop-blur-md"
          >
            <div className="w-6 h-6 rounded-full bg-[#bfff04]/15 border border-[#bfff04]/30 flex items-center justify-center text-[#bfff04] shrink-0">
              {toast.type === "info" ? (
                <Info className="w-3.5 h-3.5" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
            </div>
            <span className="text-xs font-mono-tech text-neutral-200">
              {toast.text}
            </span>
            <button
              type="button"
              onClick={onDismiss}
              className="ml-2 text-neutral-500 hover:text-white transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
