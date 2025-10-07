import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Discover Morocco — Travel Guide & Blog",
    template: "%s | Discover Morocco",
  },
  description:
    "A journey through Morocco’s colors, culture, and landscapes. Explore Marrakech, Fes, the Sahara, Chefchaouen, Essaouira, and Casablanca.",
  keywords: [
    "Morocco",
    "Moroccan tourism",
    "Marrakech",
    "Sahara Desert",
    "Fes",
    "Chefchaouen",
    "Essaouira",
    "Casablanca",
    "Atlas Mountains",
    "Moroccan food",
    "travel blog",
    "travel guide",
  ],
  openGraph: {
    title: "Discover Morocco",
    description:
      "Inspiring travelers with guides to Marrakech, Fes, the Sahara, and more.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1548783307-f63a30c0dbf0?auto=format&fit=crop&w=1600&q=60",
        width: 1600,
        height: 900,
        alt: "Sahara dunes at sunset",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
