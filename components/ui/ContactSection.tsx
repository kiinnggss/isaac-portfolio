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
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { usePortfolioTheme } from "./ThemeProvider";
import { isStaticHosting } from "@/lib/paths";

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
  const [fallbackMailto, setFallbackMailto] = useState<{ mailtoUrl: string; copyBody: string } | null>(null);
  const [copiedFallback, setCopiedFallback] = useState(false);
  const { effectiveAccent } = usePortfolioTheme();

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

  const handleCopyFallbackMessage = () => {
    if (!fallbackMailto) return;
    navigator.clipboard.writeText(fallbackMailto.copyBody);
    setCopiedFallback(true);
    setTimeout(() => setCopiedFallback(false), 2000);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);
    setFallbackMailto(null);

    const copyBody = `Subject: ${data.subject}\nFrom: ${data.name} (${data.email})\n\n${data.message}`;
    const mailtoUrl = `mailto:isaacgbodimowo@gmail.com?subject=${encodeURIComponent(
      data.subject
    )}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;

    const activateMailtoFallback = () => {
      setFallbackMailto({ mailtoUrl, copyBody });
      setSubmitSuccess(
        "Prepared your message for email delivery. Open your email client or copy the text below."
      );
      reset();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
      if (typeof window !== "undefined") {
        window.location.href = mailtoUrl;
      }
    };

    try {
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

      if (formspreeEndpoint) {
        const response = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          const resJson = await response.json().catch(() => ({}));
          throw new Error(resJson.error || "Failed to deliver message. Please try again.");
        }
        setSubmitSuccess("Message delivered. I will review your inquiry and reply shortly.");
        reset();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      } else if (!isStaticHosting()) {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.status === 404 || response.status === 405) {
          activateMailtoFallback();
          return;
        }

        const resJson = await response.json().catch(() => ({}));

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error(
              resJson.error || "Rate limit exceeded. Please wait a moment before sending another message."
            );
          }
          throw new Error(resJson.error || "Failed to deliver message. Please try again.");
        }

        setSubmitSuccess("Message delivered. I will review your inquiry and reply shortly.");
        reset();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      } else {
        activateMailtoFallback();
      }
    } catch (err) {
      if (err instanceof TypeError || isStaticHosting()) {
        activateMailtoFallback();
      } else {
        setSubmitError(
          err instanceof Error
            ? err.message
            : "Unable to reach endpoint. Please email isaacgbodimowo@gmail.com directly."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest font-bold mb-3 px-3.5 py-1.5 rounded-full neo-pill">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: effectiveAccent }} />
          <span>Communication &amp; Inquiries</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight">
          Get in Touch
        </h2>
        <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--theme-muted)" }}>
          Available for software engineering roles, network architecture consulting, and systems diagnostics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Coordinates Card */}
        <div className="lg:col-span-5 neo-console rounded-3xl p-7 sm:p-9 space-y-6">
          <div>
            <h3 className="text-2xl font-display font-bold uppercase tracking-wide">
              Direct Coordinates
            </h3>
            <p className="text-xs opacity-70 mt-1">
              Reach out directly via email, LinkedIn, or GitHub.
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: effectiveAccent,
                  color: "var(--theme-accent-text)",
                  borderColor: "rgba(255,255,255,0.2)",
                }}
              >
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-mono-tech uppercase opacity-65">Email</div>
                <a
                  href="mailto:isaacgbodimowo@gmail.com"
                  className="font-mono-tech text-xs sm:text-sm hover:underline"
                >
                  isaacgbodimowo@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" style={{ color: effectiveAccent }} />
              </div>
              <div>
                <div className="text-[11px] font-mono-tech uppercase opacity-65">Location</div>
                <div className="text-xs sm:text-sm font-medium">Lagos, Nigeria (Remote Ready)</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-[11px] font-mono-tech uppercase opacity-65">Availability</div>
                <div className="text-xs sm:text-sm font-medium">
                  Full-Time Roles &amp; Systems Consulting
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t flex items-center gap-3" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
            <a
              href="https://github.com/kiinnggss"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/isaac-gbodimowo-743152294/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Form Card */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-7 neo-card rounded-3xl p-7 sm:p-9 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="text-xs font-mono-tech font-bold uppercase">
                Full Name
              </label>
              <input
                id="contact-name"
                type="text"
                {...register("name")}
                placeholder="Jane Doe"
                className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
                style={{
                  backgroundColor: "var(--theme-surface-alt)",
                  borderColor: "var(--theme-border)",
                  color: "var(--theme-ink)",
                }}
              />
              {errors.name && (
                <p className="text-xs text-rose-500 font-medium">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="text-xs font-mono-tech font-bold uppercase">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                {...register("email")}
                placeholder="jane@company.com"
                className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
                style={{
                  backgroundColor: "var(--theme-surface-alt)",
                  borderColor: "var(--theme-border)",
                  color: "var(--theme-ink)",
                }}
              />
              {errors.email && (
                <p className="text-xs text-rose-500 font-medium">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-subject" className="text-xs font-mono-tech font-bold uppercase">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              {...register("subject")}
              placeholder="Software Engineering Role / Network Architecture Inquiry"
              className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors"
              style={{
                backgroundColor: "var(--theme-surface-alt)",
                borderColor: "var(--theme-border)",
                color: "var(--theme-ink)",
              }}
            />
            {errors.subject && (
              <p className="text-xs text-rose-500 font-medium">{errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-message" className="text-xs font-mono-tech font-bold uppercase">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={4}
              {...register("message")}
              placeholder="Share project details, role scope, or diagnostic requirements..."
              className="w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors resize-none"
              style={{
                backgroundColor: "var(--theme-surface-alt)",
                borderColor: "var(--theme-border)",
                color: "var(--theme-ink)",
              }}
            />
            {errors.message && (
              <p className="text-xs text-rose-500 font-medium">{errors.message.message}</p>
            )}
          </div>

          {submitSuccess && (
            <div className="p-4 rounded-xl bg-emerald-500/15 border-2 border-emerald-500 text-xs font-semibold space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{submitSuccess}</span>
              </div>
              {fallbackMailto && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href={fallbackMailto.mailtoUrl}
                    className="px-3.5 py-1.5 rounded-full neo-btn-primary text-[11px] font-bold inline-flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Open Email Client</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyFallbackMessage}
                    className="px-3.5 py-1.5 rounded-full neo-pill text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedFallback ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span>Copied Message</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {submitError && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border-2 border-rose-500 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full neo-btn-primary text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
