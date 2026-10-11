import type { Metadata, Viewport } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { SnowParticles } from "@/components/snow-particles";
import { CustomCursor } from "@/components/custom-cursor";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050a14" },
    { media: "(prefers-color-scheme: light)", color: "#eef6fc" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nsoc.in"),
  title: "Nexus Spring of Code | Open Source Contribution Program for Developers",
  description:
    "Nexus Spring of Code (NSoC) Winter Edition is an open source contribution program where project maintainers bring real-world projects and contributors solve actual issues, building features and shipping production-ready code.",
  applicationName: "Nexus Spring of Code",
  authors: [{ name: "Deepanshu Prajapati", url: "https://www.linkedin.com/in/deepanshu-prajapati01/" }],
  creator: "Deepanshu Prajapati",
  publisher: "Deepanshu Prajapti",
  keywords: [
    "Nexus Spring of Code",
    "NSoC",
    "NSoC 2026",
    "Open Source",
    "Hackathon",
    "Developer Sprint",
    "Coding Contest",
    "Winter Edition",
    "Git",
    "GitHub",
  ],
  alternates: {
    canonical: "https://www.nsoc.in",
  },
  openGraph: {
    title: "Nexus Spring of Code | Open Source Contribution Program for Developers",
    description:
      "A 45-day open source program where project maintainers bring real-world projects, and contributors work on solving actual issues, building features, and shipping production-ready code.",
    url: "https://www.nsoc.in",
    siteName: "Nexus Spring of Code",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Spring of Code | Open Source Contribution Program for Developers",
    description:
      "A 45-day open source program where project maintainers bring real-world projects, and contributors work on solving actual issues, building features, and shipping production-ready code.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} font-inter antialiased bg-background text-foreground selection:bg-sky-500/30 selection:text-sky-200`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <AuthProvider>
            <CustomCursor />
            <SnowParticles />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
