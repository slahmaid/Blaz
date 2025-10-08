import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const DESTINATIONS = [
  {
    slug: "marrakech",
    title: "Marrakech",
    cover:
      "https://images.unsplash.com/photo-1544989164-31dc3c645987?w=1600&q=80&auto=format&fit=crop",
    excerpt:
      "The Red City: medinas, gardens, palaces, and vibrant souks at every turn.",
  },
  {
    slug: "fes",
    title: "Fes",
    cover:
      "https://images.unsplash.com/photo-1543357480-c60d40007a0b?w=1600&q=80&auto=format&fit=crop",
    excerpt: "Ancient alleys, tanneries, and the world’s oldest university.",
  },
  {
    slug: "sahara-desert",
    title: "Sahara Desert",
    cover:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80&auto=format&fit=crop",
    excerpt: "Endless dunes, Berber camps, and skies full of stars.",
  },
  {
    slug: "chefchaouen",
    title: "Chefchaouen",
    cover:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80&auto=format&fit=crop",
    excerpt: "The Blue City nestled in the Rif Mountains.",
  },
  {
    slug: "essaouira",
    title: "Essaouira",
    cover:
      "https://images.unsplash.com/photo-1555597408-22a0a0a162d3?w=1600&q=80&auto=format&fit=crop",
    excerpt: "Coastal charm, sea breeze, and relaxed vibes.",
  },
  {
    slug: "casablanca",
    title: "Casablanca",
    cover:
      "https://images.unsplash.com/photo-1595514532977-8c8bb6b7db27?w=1600&q=80&auto=format&fit=crop",
    excerpt: "Modern Morocco with Art Deco heritage and the Hassan II Mosque.",
  },
];

export async function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dest = DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) return {} as Metadata;
  return {
    title: `${dest.title} Travel Guide | Discover Morocco`,
    description: dest.excerpt,
    openGraph: {
      title: `${dest.title} Travel Guide | Discover Morocco`,
      description: dest.excerpt,
      images: [{ url: dest.cover }],
    },
  } as Metadata;
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = DESTINATIONS.find((d) => d.slug === slug);
  if (!dest)
    return (
      <main className="min-h-screen container-px py-10">
        <p>Destination not found.</p>
      </main>
    );
  return (
    <main className="min-h-screen">
      <div className="relative h-[45vh] w-full">
        <Image src={dest.cover} alt={dest.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50" />
      </div>
      <article className="max-w-3xl mx-auto container-px py-10">
        <h1 className="section-title">{dest.title}</h1>
        <p className="mt-3 text-neutral-700">{dest.excerpt}</p>
        <div className="mt-8 space-y-4 text-neutral-800 leading-relaxed">
          <p>
            Discover the best of {dest.title}. Stroll historic streets, taste local cuisine, and
            connect with Morocco’s rich heritage.
          </p>
          <p>
            Practical tips: consider shoulder seasons for fewer crowds, and plan ahead for popular
            experiences.
          </p>
        </div>
        <div className="mt-10">
          <Link href="/" className="text-[var(--morocco-clay)] hover:underline">
            ← Back to home
          </Link>
        </div>
      </article>
    </main>
  );
}
