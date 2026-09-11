import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gbodimowo Isaac — Software Engineer & Network Systems Specialist",
  description:
    "Portfolio of Gbodimowo Isaac: Software Engineer and Network Systems Specialist based in Lagos, Nigeria. Specializing in resilient digital infrastructure, modern full-stack web applications, Cisco IOS enterprise topologies, and systems diagnostics.",
  keywords: [
    "Gbodimowo Isaac",
    "Software Engineer",
    "Network Systems Specialist",
    "Lagos Nigeria",
    "Next.js",
    "React 19",
    "TypeScript",
    "Cisco Packet Tracer",
    "CCNA",
    "CompTIA A+",
    "CAR PULL",
    "HSRP",
    "VLAN",
  ],
  authors: [{ name: "Gbodimowo Isaac" }],
  creator: "Gbodimowo Isaac",
  openGraph: {
    title: "Gbodimowo Isaac — Software Engineer & Network Systems Specialist",
    description:
      "Architecting resilient digital infrastructure — bridging scalable web development with enterprise networking and systems diagnostics.",
    url: "https://isaacgbodimowo.dev",
    siteName: "Gbodimowo Isaac Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gbodimowo Isaac — Software Engineer & Network Systems Specialist",
    description:
      "Architecting resilient digital infrastructure — bridging scalable web development with enterprise networking and systems diagnostics.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#080808] text-neutral-100 selection:bg-[#bfff04] selection:text-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
