import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScholarTrack — Find scholarships. Understand them.",
  description:
    "Discover, understand, save, and prepare for scholarship opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}