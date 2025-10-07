"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { PiCompassDuotone } from "react-icons/pi";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? "bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <PiCompassDuotone className="text-brand" size={24} />
            <span className="font-semibold tracking-tight">Discover Morocco</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#destinations" className="hover:text-brand-dark transition-colors">Destinations</a>
            <a href="#culture" className="hover:text-brand-dark transition-colors">Culture</a>
            <a href="#blog" className="hover:text-brand-dark transition-colors">Blog</a>
            <a href="#plan" className="btn-primary h-10 px-5">Plan Your Trip</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
