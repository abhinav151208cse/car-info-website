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
  title: "AutoVerse — 2026 Cars India",
  description:
    "AutoVerse — compare 2026 car variants, ex-showroom prices, and specifications across Kia, Tata, Hyundai, Maruti, Skoda, Toyota, and more.",
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
