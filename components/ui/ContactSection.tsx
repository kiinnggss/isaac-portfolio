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
  ArrowUpRight,
} from "lucide-react";
import MagneticButton from "./MagneticButton";

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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
          Communication & Inquiries
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
          Get in Touch
        </h2>
        <p className="mt-2 text-base text-slate-600 max-w-2xl">
          Available for software engineering roles, enterprise network architecture, and systems diagnostics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Information Card */}
        <div className="lg:col-span-5 rounded-xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Direct Contact Channels
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Reach out directly by email or connect via professional platforms.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="mailto:isaacgbodimowo@gmail.com"
              className="flex items-center gap-3.5 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
            >
              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <div className="text-xs text-slate-500 font-medium">Primary Email</div>
                <div className="text-sm font-semibold text-slate-900">
                  isaacgbodimowo@gmail.com
                </div>
              </div>
            </a>

            <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
              <MapPin className="w-5 h-5 text-slate-600 shrink-0" />
              <div>
                <div className="text-xs text-slate-500 font-medium">Location Base</div>
                <div className="text-sm font-semibold text-slate-900">
                  Lagos, Nigeria (West Africa Time, UTC+1)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
              <Clock className="w-5 h-5 text-slate-600 shrink-0" />
              <div>
                <div className="text-xs text-slate-500 font-medium">Availability</div>
                <div className="text-sm font-semibold text-slate-900">
                  Full-Time Software & Systems Roles
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
            <a
              href="https://github.com/kiinnggss"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium inline-flex items-center gap-2 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/isaac-gbodimowo-743152294/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium inline-flex items-center gap-2 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-blue-600" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7 rounded-xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Send a Direct Message
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            Inquiries are delivered directly to the server message queue.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
                {errors.name && (
                  <p className="text-xs text-rose-600 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="alex@company.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
                {errors.email && (
                  <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                {...register("subject")}
                placeholder="Software Engineering Role / Systems Consultation"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
              {errors.subject && (
                <p className="text-xs text-rose-600 mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Message Content *
              </label>
              <textarea
                rows={4}
                {...register("message")}
                placeholder="Describe project requirements, role scope, or technical topic..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-y"
              />
              {errors.message && (
                <p className="text-xs text-rose-600 mt-1">{errors.message.message}</p>
              )}
            </div>

            {submitSuccess && (
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{submitSuccess}</span>
              </div>
            )}

            {submitError && (
              <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-sm font-medium transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
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
