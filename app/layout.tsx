import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CompareProviderShell from "@/components/CompareProviderShell";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CarInfo — 2026 Cars India",
  description:
    "Compare 2026 Kia Seltos, Hyundai Creta, Tata Nexon, Punch, Venue, and Skoda Kylaq variants, prices, and specifications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <CompareProviderShell>{children}</CompareProviderShell>
      </body>
    </html>
  );
}
