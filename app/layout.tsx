import type { Metadata } from "next";
import { Barlow_Condensed, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { buildThemeInitScript } from "@/lib/themes";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display-condensed",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans-body",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-code",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kiinnggss.github.io/isaac-portfolio/"),
  title: "Gbodimowo Isaac: Software Engineer & Network Systems Specialist",
  description:
    "Portfolio of Gbodimowo Isaac: Software Engineer and Network Systems Specialist based in Lagos, Nigeria. Engineering distributed web applications, Cisco IOS enterprise topologies, and systems diagnostics.",
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
    title: "Gbodimowo Isaac: Software Engineer & Network Systems Specialist",
    description:
      "Engineering resilient digital infrastructure across scalable web platforms, Cisco IOS enterprise routing, and hardware diagnostics.",
    url: "https://kiinnggss.github.io/isaac-portfolio/",
    siteName: "Gbodimowo Isaac Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://kiinnggss.github.io/isaac-portfolio/og-card.png",
        width: 1200,
        height: 630,
        alt: "Gbodimowo Isaac: Software Engineer & Network Systems Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gbodimowo Isaac: Software Engineer & Network Systems Specialist",
    description:
      "Engineering resilient digital infrastructure across scalable web platforms, Cisco IOS enterprise routing, and hardware diagnostics.",
    images: ["https://kiinnggss.github.io/isaac-portfolio/og-card.png"],
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
      suppressHydrationWarning
      className={`${barlowCondensed.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: buildThemeInitScript() }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
