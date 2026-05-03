import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ui/ThemeProvider";

const fontSans = Syne({
  variable: "--gridnest-font-sans",
  subsets: ["latin"],
});

const fontBody = DM_Sans({
  variable: "--gridnest-font-body",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--gridnest-font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GridNest - Design System & Component Library",
    template: "%s | GridNest",
  },
  description: "A production-grade design system and component library built with Next.js 15, TypeScript, and Framer Motion. Editorial precision meets developer utility.",
  keywords: ["Design System", "Component Library", "Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript", "UI Kit"],
  authors: [{ name: "GridNest Team" }],
  creator: "GridNest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gridnest.dev",
    siteName: "GridNest",
    title: "GridNest - Design System & Component Library",
    description: "Production-grade components with editorial precision.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GridNest Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GridNest - Design System & Component Library",
    description: "Production-grade components with editorial precision.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CustomCursor } from "../components/ui/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontBody.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-[var(--gridnest-bg)] text-[var(--gridnest-text-primary)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
