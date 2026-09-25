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
        `Message delivered successfully. I will review and reply promptly.`
      );
      reset();

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "An unexpected error occurred. Please reach out directly via email."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/50 backdrop-blur-md">
          Communication & Inquiries
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-950 tracking-tight">
          Get in Touch
        </h2>
        <p className="mt-3 text-base text-slate-600 max-w-2xl font-normal">
          Available for software engineering roles, enterprise network architecture, and systems diagnostics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Information Card */}
        <div className="lg:col-span-5 crystal-surface rounded-3xl p-8 sm:p-9 shadow-[0_20px_40px_-12px_rgba(15,23,42,0.07)] space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Direct Contact Channels
            </h3>
            <p className="mt-1 text-sm text-slate-600 font-normal">
              Reach out directly by email or connect via professional platforms.
            </p>
          </div>

          <div className="space-y-3.5">
            <a
              href="mailto:isaacgbodimowo@gmail.com"
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 backdrop-blur-md text-slate-700 hover:text-blue-600 hover:bg-white transition-all shadow-xs border border-white/80"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Primary Email</div>
                <div className="text-sm font-semibold text-slate-900 font-display">
                  isaacgbodimowo@gmail.com
                </div>
              </div>
            </a>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 backdrop-blur-md text-slate-700 shadow-xs border border-white/80">
              <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center text-slate-700 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Location Base</div>
                <div className="text-sm font-semibold text-slate-900 font-display">
                  Lagos, Nigeria (West Africa Time, UTC+1)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 backdrop-blur-md text-slate-700 shadow-xs border border-white/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Availability</div>
                <div className="text-sm font-semibold text-slate-900 font-display">
                  Full-Time Software & Systems Roles
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/40 flex items-center gap-3">
            <a
              href="https://github.com/kiinnggss"
              target="_blank"
              rel="noreferrer"
              className="crystal-pill px-4 py-2 rounded-full text-slate-700 hover:text-slate-950 text-xs font-semibold inline-flex items-center gap-2 transition-all shadow-xs"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/isaac-gbodimowo-743152294/"
              target="_blank"
              rel="noreferrer"
              className="crystal-pill px-4 py-2 rounded-full text-slate-700 hover:text-blue-600 text-xs font-semibold inline-flex items-center gap-2 transition-all shadow-xs"
            >
              <LinkedinIcon className="w-4 h-4 text-blue-600" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7 crystal-surface rounded-3xl p-8 sm:p-9 shadow-[0_20px_40px_-12px_rgba(15,23,42,0.07)]">
          <h3 className="text-xl font-bold text-slate-900 font-display mb-1">
            Send a Direct Message
          </h3>
          <p className="text-sm text-slate-600 mb-7 font-normal">
            Inquiries are delivered directly to the server message queue.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-display">
                  Your Name *
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/90 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all shadow-xs"
                />
                {errors.name && (
                  <p className="text-xs text-rose-600 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-display">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/90 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all shadow-xs"
                />
                {errors.email && (
                  <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-display">
                Subject
              </label>
              <input
                type="text"
                {...register("subject")}
                placeholder="Software Engineering Role / Systems Consultation"
                className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/90 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all shadow-xs"
              />
              {errors.subject && (
                <p className="text-xs text-rose-600 mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-display">
                Message Content *
              </label>
              <textarea
                rows={4}
                {...register("message")}
                placeholder="Describe project requirements, role scope, or technical topic..."
                className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-white/90 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all shadow-xs resize-y"
              />
              {errors.message && (
                <p className="text-xs text-rose-600 mt-1">{errors.message.message}</p>
              )}
            </div>

            {submitSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{submitSuccess}</span>
              </div>
            )}

            {submitError && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-800 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-full crystal-button disabled:opacity-50 text-white text-sm font-medium transition-all inline-flex items-center justify-center gap-2 shadow-md"
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
