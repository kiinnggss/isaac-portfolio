"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/schema";
import confetti from "canvas-confetti";
import {
  Send,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resJson = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            resJson.error || "Rate limit exceeded. Please wait a moment before sending another message."
          );
        }
        throw new Error(resJson.error || "Failed to deliver message. Please try again.");
      }

      setSubmitSuccess(
        "Message delivered. I will review your inquiry and reply shortly."
      );
      reset();

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Unable to reach endpoint. Please email isaacgbodimowo@gmail.com directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-14 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-orange-600 font-semibold mb-3 px-3.5 py-1.5 rounded-full bg-white/80 border border-white shadow-xs">
          <span>Communication & Inquiries</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#090d16] tracking-tight">
          Get in Touch
        </h2>
        <p className="mt-3 text-base text-slate-800 font-normal leading-relaxed">
          Available for software engineering roles, enterprise network architecture, and systems diagnostics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Obsidian Coordinates Card */}
        <div className="lg:col-span-5 obsidian-surface rounded-3xl p-8 sm:p-9 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white font-display">
              Direct Contact Channels
            </h3>
            <p className="mt-1 text-sm text-slate-300 font-normal">
              Reach out directly by email or connect on GitHub and LinkedIn.
            </p>
          </div>

          <div className="space-y-3.5">
            <a
              href="mailto:isaacgbodimowo@gmail.com"
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono-tech">PRIMARY EMAIL</div>
                <div className="text-sm font-semibold text-white font-display">
                  isaacgbodimowo@gmail.com
                </div>
              </div>
            </a>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-orange-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono-tech">LOCATION BASE</div>
                <div className="text-sm font-semibold text-white font-display">
                  Lagos, Nigeria (UTC+1)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono-tech">AVAILABILITY</div>
                <div className="text-sm font-semibold text-white font-display">
                  Full-Time Software & Systems Roles
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <a
              href="https://github.com/kiinnggss"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-orange-600 text-white text-xs font-semibold inline-flex items-center gap-2 transition-all border border-white/15"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/isaac-gbodimowo-743152294/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-orange-600 text-white text-xs font-semibold inline-flex items-center gap-2 transition-all border border-white/15"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right High-Contrast Form Card */}
        <div className="lg:col-span-7 crystal-surface rounded-3xl p-8 sm:p-9">
          <h3 className="text-xl font-bold text-[#090d16] font-display mb-1">
            Send a Direct Message
          </h3>
          <p className="text-sm text-slate-700 mb-7 font-normal">
            Inquiries are validated and routed directly to the server message queue.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="block text-xs font-semibold text-[#090d16] font-display">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  {...register("name")}
                  placeholder="e.g. Chidi Okonkwo"
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-sm text-[#090d16] placeholder:text-slate-500 focus:outline-none focus:border-orange-600 transition-all shadow-xs"
                />
                {errors.name && (
                  <p className="text-xs text-rose-700 font-medium">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="block text-xs font-semibold text-[#090d16] font-display">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  {...register("email")}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-sm text-[#090d16] placeholder:text-slate-500 focus:outline-none focus:border-orange-600 transition-all shadow-xs"
                />
                {errors.email && (
                  <p className="text-xs text-rose-700 font-medium">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#090d16] font-display">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                {...register("subject")}
                placeholder="Software Engineering Role / Network Architecture"
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-sm text-[#090d16] placeholder:text-slate-500 focus:outline-none focus:border-orange-600 transition-all shadow-xs"
              />
              {errors.subject && (
                <p className="text-xs text-rose-700 font-medium">{errors.subject.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="block text-xs font-semibold text-[#090d16] font-display">
                Message Content *
              </label>
              <textarea
                id="contact-message"
                rows={4}
                {...register("message")}
                placeholder="Describe project requirements, role scope, or technical inquiry..."
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-sm text-[#090d16] placeholder:text-slate-500 focus:outline-none focus:border-orange-600 transition-all shadow-xs resize-y"
              />
              {errors.message && (
                <p className="text-xs text-rose-700 font-medium">{errors.message.message}</p>
              )}
            </div>

            {submitSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-600/30 text-xs text-emerald-900 font-medium flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{submitSuccess}</span>
              </div>
            )}

            {submitError && (
              <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-600/30 text-xs text-rose-900 font-medium flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-full crystal-button disabled:opacity-50 text-white text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Delivering message...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
