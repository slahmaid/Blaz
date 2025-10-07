import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Discover Morocco | Colors, Culture, Landscapes",
  description:
    "A visually stunning guide to Moroccan tourism: Marrakech, Sahara Desert, Chefchaouen, Fes, Essaouira, Casablanca, food, festivals, and travel tips.",
  keywords: [
    "Morocco",
    "Marrakech",
    "Sahara Desert",
    "Chefchaouen",
    "Fes",
    "Essaouira",
    "Casablanca",
    "Moroccan food",
    "Moroccan culture",
    "Moroccan tourism",
  ],
  openGraph: {
    title: "Discover Morocco | Colors, Culture, Landscapes",
    description:
      "Inspire your journey through Morocco with destinations, culture, and travel blog.",
    type: "website",
    url: "https://example.com/",
    images: [
      {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200",
        width: 1200,
        height: 630,
        alt: "Sahara desert dunes at golden hour",
      },
    ],
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-neutral-900`}
      >
        {children}
      </body>
    </html>
  );
}
