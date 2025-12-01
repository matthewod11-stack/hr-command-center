import type { Metadata } from "next";
import { DM_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "HR Command Center | The HR Platform That Lets You Just Ask",
  description:
    "Chat-first HR automation powered by Claude AI. 25 specialized skills, zero learning curve. Skip the clicks, just chat.",
  keywords: [
    "HR automation",
    "chat-first HR",
    "AI HR platform",
    "workforce analytics",
    "HR document automation",
    "Claude AI",
    "natural language HR",
  ],
  openGraph: {
    title: "HR Command Center | The HR Platform That Lets You Just Ask",
    description:
      "Chat-first HR automation powered by Claude AI. 25 specialized skills, zero learning curve.",
    url: "https://hrcommandcenter.com",
    siteName: "HR Command Center",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HR Command Center | The HR Platform That Lets You Just Ask",
    description:
      "Chat-first HR automation powered by Claude AI. 25 specialized skills, zero learning curve.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${fraunces.variable} ${jetbrainsMono.variable} antialiased bg-stone-50 text-stone-800`}
      >
        {children}
      </body>
    </html>
  );
}
