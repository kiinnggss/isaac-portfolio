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
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-xl border border-slate-800"
          >
            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
              {toast.type === "info" ? (
                <Info className="w-3.5 h-3.5 text-blue-400" />
              ) : (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </div>
            <span className="text-xs font-medium text-slate-100">
              {toast.text}
            </span>
            <button
              type="button"
              onClick={onDismiss}
              className="ml-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
