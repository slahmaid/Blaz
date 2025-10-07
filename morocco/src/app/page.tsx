"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const heroImage =
  "https://images.unsplash.com/photo-1548783307-f63a30c0dbf0?auto=format&fit=crop&w=2000&q=60"; // Sahara dunes

const destinations = [
  { slug: "marrakech", name: "Marrakech", img: "https://images.unsplash.com/photo-1544989164-31dc3c645987?auto=format&fit=crop&w=1000&q=60" },
  { slug: "fes", name: "Fes", img: "https://images.unsplash.com/photo-1553882803-57ab84b8b9b8?auto=format&fit=crop&w=1000&q=60" },
  { slug: "sahara", name: "Sahara Desert", img: heroImage },
  { slug: "chefchaouen", name: "Chefchaouen", img: "https://images.unsplash.com/photo-1545424273-94b3688cc1ac?auto=format&fit=crop&w=1000&q=60" },
  { slug: "essaouira", name: "Essaouira", img: "https://images.unsplash.com/photo-1606046604972-77cc76aee944?auto=format&fit=crop&w=1000&q=60" },
  { slug: "casablanca", name: "Casablanca", img: "https://images.unsplash.com/photo-1588413337014-b0b0b5a4a7de?auto=format&fit=crop&w=1000&q=60" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0vh", "30vh"]);
  const opacityFade = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <main className="font-sans">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[100svh] overflow-hidden">
        <motion.div style={{ y: yParallax, opacity: opacityFade }} className="absolute inset-0">
          <Image src={heroImage} alt="Sahara dunes" fill priority className="object-cover" />
        </motion.div>
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 h-full flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white text-5xl md:text-7xl font-semibold tracking-tight">
              Discover Morocco
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-white/90 mt-4 text-lg md:text-xl max-w-2xl">
              A journey through colors, culture, and landscapes.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }} className="mt-8 flex gap-3">
              <a href="#destinations" className="btn-primary">Explore Destinations</a>
              <a href="#plan" className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-white/60 text-white hover:bg-white/10">
                Plan Your Trip
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section id="destinations" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Top Destinations
          </motion.h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((d, i) => (
              <motion.div key={d.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl card-shadow">
                <Image src={d.img} alt={d.name} width={800} height={600} className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">{d.name}</h3>
                  <Link href={`/destinations/${d.slug}`} className="inline-block mt-2 text-sm font-medium hover:underline">
                    Read mini guide →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Highlights */}
      <section id="culture" className="py-24 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Cultural Highlights
          </motion.h2>
          <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-lg text-black/80">
                Savor fragrant tagines, freshly baked bread, and mint tea in bustling souks.
                Experience vibrant festivals, Andalusian rhythms, and Berber traditions across the Atlas.
              </p>
              <ul className="mt-6 space-y-2 text-black/80">
                <li>• Moroccan food: tagine, couscous, pastilla, mint tea</li>
                <li>• Festivals: Mawazine, Gnaoua, Imilchil</li>
                <li>• Crafts: zellige tiles, leatherwork, rugs</li>
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <Image src="https://images.unsplash.com/photo-1553284965-72dc7b266c2a?auto=format&fit=crop&w=1200&q=60" alt="Moroccan food" width={1200} height={900} className="rounded-2xl object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <BlogPreview />

      {/* CTA */}
      <section id="plan" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Ready to plan your trip?
          </motion.h2>
          <p className="mt-4 text-black/70 max-w-2xl mx-auto">
            We partner with trusted providers to create unforgettable journeys across Morocco.
          </p>
          <a
            className="btn-primary mt-8"
            href="https://www.getyourguide.com/-l169/?partner_id=2ZV7JY5&utm_medium=online_publisher&cmp=discover-morocco"
            target="_blank" rel="noreferrer"
          >
            Plan Your Trip
          </a>
        </div>
      </section>
    </main>
  );
}

function BlogPreview() {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Latest from the Blog
        </motion.h2>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.article key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group rounded-2xl overflow-hidden border border-black/10">
              <div className="relative h-48">
                <Image src={`https://images.unsplash.com/photo-1548783307-f63a30c0dbf0?auto=format&fit=crop&w=1000&q=60`} alt="Sahara" fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Morocco Travel Tips #{i}</h3>
                <p className="text-sm text-black/70 mt-1">Practical advice for a memorable trip.</p>
                <Link href={`/blog/sample-post-${i}`} className="inline-block mt-3 text-brand hover:text-brand-dark font-medium">Read more →</Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
