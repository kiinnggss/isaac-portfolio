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
  Terminal,
  ArrowUpRight,
  ShieldAlert,
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
        throw new Error(resJson.error || "Failed to transmit message. Please try again.");
      }

      // Success
      setSubmitSuccess(
        `Transmission delivered! Message ID: ${resJson.messageId}. I will review and reply promptly.`
      );
      reset();

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#bfff04", "#00f0ff", "#ffffff", "#3b82f6"],
        });
      } catch {
        // Safe if canvas unavailable
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Transmission failed. Check network connectivity.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#bfff04] uppercase tracking-widest mb-3">
          <Mail className="w-3.5 h-3.5" /> Direct Communications & Transmission
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
          Initiate Transmission
        </h2>
        <p className="mt-3 text-base text-neutral-400 max-w-2xl">
          Whether you have an infrastructure challenge, need a resilient full-stack web application, or are hiring for software and systems engineering roles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Info Column (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-neutral-900/40 border border-white/10 p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono-tech uppercase text-[#00f0ff]">
                Direct Coordinates
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                Gbodimowo Isaac
              </h3>
              <p className="text-sm text-neutral-400 mt-1">
                Software Engineer & Network Systems Specialist
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                <MapPin className="w-4 h-4 text-[#bfff04] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Location</div>
                  <div className="text-neutral-400">Lagos, Nigeria (UTC+1, WAT)</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                <Mail className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Primary Mailbox</div>
                  <a
                    href="mailto:isaacgbodimowo@gmail.com"
                    className="text-neutral-400 hover:text-[#00f0ff] font-mono-tech transition-colors"
                  >
                    isaacgbodimowo@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Availability Status</div>
                  <div className="text-neutral-400">
                    Open for Full-time, Hybrid & Systems Consulting
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/5">
              <div className="text-xs font-mono-tech uppercase text-neutral-500 mb-3">
                Network Profiles
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono-tech text-neutral-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono-tech text-neutral-300 hover:text-white hover:border-[#00f0ff]/40 transition-all flex items-center gap-2"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#00f0ff]" />
                  LinkedIn <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>

                <a
                  href="mailto:isaacgbodimowo@gmail.com"
                  className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono-tech text-neutral-300 hover:text-[#bfff04] hover:border-[#bfff04]/40 transition-all flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#bfff04]" />
                  Mailto Direct
                </a>
              </div>
            </div>
          </div>

          {/* Security & Integrity Guarantee Box */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-white/5 text-xs font-mono-tech text-neutral-400 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-[#bfff04] shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-medium">Production Handshake:</span> Inquiries are rate-limited, Zod-validated, and securely logged into an ACID-compliant SQLite datastore.
            </div>
          </div>
        </div>

        {/* Right Contact Form Column (Col 7) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-neutral-900/40 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
              Send an Encrypted Message
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6 font-mono-tech">
              POST /api/contact • Rate limit: 5 inquiries / 10m window
            </p>

            {/* Notification Messages */}
            {submitSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs sm:text-sm text-emerald-300 flex items-start gap-3 animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Transmission Acknowledged</div>
                  <div className="mt-0.5">{submitSuccess}</div>
                </div>
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/30 text-xs sm:text-sm text-rose-300 flex items-start gap-3 animate-in fade-in duration-200">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Transmission Halted</div>
                  <div className="mt-0.5">{submitError}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech text-neutral-400 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="e.g. Alex Adeyemi"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl bg-black/70 border text-xs sm:text-sm font-sans text-white focus:outline-none transition-colors ${
                      errors.name ? "border-rose-500 focus:border-rose-400" : "border-white/10 focus:border-[#bfff04]"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-[11px] font-mono-tech text-rose-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-neutral-400 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="alex@enterprise.com"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl bg-black/70 border text-xs sm:text-sm font-sans text-white focus:outline-none transition-colors ${
                      errors.email ? "border-rose-500 focus:border-rose-400" : "border-white/10 focus:border-[#00f0ff]"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] font-mono-tech text-rose-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject / Role */}
              <div>
                <label className="block text-xs font-mono-tech text-neutral-400 uppercase tracking-wider mb-1.5">
                  Subject / Role / Inquired Domain *
                </label>
                <input
                  type="text"
                  {...register("subject")}
                  placeholder="e.g. Software Engineer Role / Network Infrastructure Consulting"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl bg-black/70 border text-xs sm:text-sm font-sans text-white focus:outline-none transition-colors ${
                    errors.subject ? "border-rose-500 focus:border-rose-400" : "border-white/10 focus:border-[#bfff04]"
                  }`}
                />
                {errors.subject && (
                  <p className="mt-1 text-[11px] font-mono-tech text-rose-400">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-mono-tech text-neutral-400 uppercase tracking-wider mb-1.5">
                  Message Details *
                </label>
                <textarea
                  rows={5}
                  {...register("message")}
                  placeholder="Outline the scope, team context, or project objectives..."
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl bg-black/70 border text-xs sm:text-sm font-sans text-white focus:outline-none transition-colors ${
                    errors.message ? "border-rose-500 focus:border-rose-400" : "border-white/10 focus:border-[#00f0ff]"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-[11px] font-mono-tech text-rose-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#bfff04] text-black font-semibold text-xs sm:text-sm uppercase tracking-tight hover:bg-[#c9ff26] hover:shadow-[0_0_30px_rgba(191,255,4,0.35)] transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Payload...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
