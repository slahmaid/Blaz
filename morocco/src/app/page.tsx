"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, cubicBezier } from "framer-motion";

const heroImages = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80&auto=format&fit=crop", // Sahara dunes
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80&auto=format&fit=crop", // Chefchaouen blue
  "https://images.unsplash.com/photo-1544989164-31dc3c645987?w=1600&q=80&auto=format&fit=crop", // Marrakech souks
];

const destinations = [
  {
    slug: "marrakech",
    title: "Marrakech",
    image:
      "https://images.unsplash.com/photo-1544989164-31dc3c645987?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "fes",
    title: "Fes",
    image:
      "https://images.unsplash.com/photo-1543357480-c60d40007a0b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "sahara-desert",
    title: "Sahara Desert",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "chefchaouen",
    title: "Chefchaouen",
    image:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "essaouira",
    title: "Essaouira",
    image:
      "https://images.unsplash.com/photo-1555597408-22a0a0a162d3?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "casablanca",
    title: "Casablanca",
    image:
      "https://images.unsplash.com/photo-1595514532977-8c8bb6b7db27?w=1200&q=80&auto=format&fit=crop",
  },
];

const easeOutCustom = cubicBezier(0.22, 1, 0.36, 1);
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutCustom },
  },
};

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -80]);
  const y2 = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[100svh] w-full">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div style={{ y: y1 }} className="absolute inset-0">
            <Image
              src={heroImages[0]}
              alt="Sahara desert dunes"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute inset-0 mix-blend-multiply">
            <div className="w-full h-full" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.55) 100%)" }} />
          </motion.div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white container-px">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="section-title text-white drop-shadow-xl"
          >
            Discover Morocco
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15 }}
            className="mt-4 max-w-2xl text-lg md:text-xl text-white/90"
          >
            A journey through colors, culture, and landscapes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3 }}
            className="mt-8 flex gap-3"
          >
            <a
              href="#destinations"
              className="px-5 py-3 rounded-md text-white bg-[var(--morocco-burnt)] hover:opacity-90 transition"
            >
              Explore Destinations
            </a>
            <Link
              href="/blog"
              className="px-5 py-3 rounded-md text-neutral-900 bg-white/90 hover:bg-white transition"
            >
              Read the Blog
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Top Destinations */}
      <section id="destinations" className="relative py-16 md:py-24 bg-[var(--morocco-sand)]">
        <div className="container mx-auto container-px">
          <motion.h2
            className="section-title text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            Top Destinations
          </motion.h2>
          <motion.p
            className="mt-3 text-center text-neutral-600 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            From ancient medinas to golden dunes, explore Morocco’s must-see places.
          </motion.p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((d, i) => (
              <motion.article
                key={d.slug}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <Link href={`/destinations/${d.slug}`}>
                  <div className="relative h-60 w-full">
                    <Image
                      src={d.image}
                      alt={d.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end">
                    <h3 className="text-white text-xl font-semibold drop-shadow">{d.title}</h3>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Highlights */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="container mx-auto container-px grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Cultural Highlights</h2>
            <p className="mt-4 text-neutral-700 leading-relaxed">
              Savor fragrant tagines, wander through bustling souks, and celebrate vibrant
              festivals like Eid and Gnawa. Morocco’s traditions blend Berber, Arab, and
              Andalusian influences, shaping its music, art, and cuisine.
            </p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <li className="rounded-md bg-[var(--morocco-sand)] px-3 py-2">Moroccan Food</li>
              <li className="rounded-md bg-[var(--morocco-sand)] px-3 py-2">Festivals</li>
              <li className="rounded-md bg-[var(--morocco-sand)] px-3 py-2">Traditions</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative h-80 md:h-full min-h-64"
          >
            <Image
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80&auto=format&fit=crop"
              alt="Moroccan cuisine and spices"
              fill
              className="object-cover rounded-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="container mx-auto container-px">
          <motion.h2
            className="section-title text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            From the Blog
          </motion.h2>
          <motion.p
            className="mt-3 text-center text-neutral-600 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            Travel guides, culture deep-dives, and itineraries.
          </motion.p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group rounded-xl overflow-hidden border bg-white hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog`}>
                  <div className="relative h-48">
                    <Image
                      src={heroImages[(i + 1) % heroImages.length]}
                      alt="Morocco"
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">Sample Article Title</h3>
                    <p className="mt-2 text-sm text-neutral-600">
                      A brief introduction to Morocco’s treasures and travel tips.
                    </p>
                    <span className="inline-flex items-center mt-4 text-[var(--morocco-clay)] font-medium">
                      Read More →
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto container-px text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl"
          >
            <h2 className="section-title">Plan Your Trip</h2>
            <p className="mt-3 text-neutral-700">
              Start your Moroccan adventure today. Find great tours, stays, and more.
            </p>
            <a
              href="https://www.getyourguide.com/-l169/?partner_id=3U9I2G1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-3 rounded-md text-white bg-[var(--morocco-burnt)] hover:opacity-90 transition"
            >
              Plan with our partner
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-[var(--morocco-sand)]/60">
        <div className="container mx-auto container-px py-10 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold">About Morocco</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Discover destinations, culture, and tips for an unforgettable journey.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Contact</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a className="hover:underline" href="mailto:hello@example.com">hello@example.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Social</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a className="hover:underline" href="#" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#" target="_blank" rel="noopener noreferrer">
                  YouTube
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#" target="_blank" rel="noopener noreferrer">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Newsletter</h3>
            <form className="mt-2 flex gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Your email"
                className="flex-1 rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--morocco-gold)]"
              />
              <button
                className="px-4 py-2 rounded-md text-white bg-[var(--morocco-clay)] hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="py-6 text-center text-xs text-neutral-600">© {new Date().getFullYear()} Discover Morocco</div>
      </footer>
    </main>
  );
}
