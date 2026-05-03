import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ui/ThemeProvider";

const fontSans = Syne({
  variable: "--forge-font-sans",
  subsets: ["latin"],
});

const fontBody = DM_Sans({
  variable: "--forge-font-body",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--forge-font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ForgeUI - Design System",
  description: "Editorial Precision meets Developer Utility",
};

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
      <body className="min-h-full flex flex-col font-body bg-[var(--forge-bg)] text-[var(--forge-text-primary)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
