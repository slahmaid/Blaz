import Image from "next/image";
import { notFound } from "next/navigation";
import { destinations } from "@/data/destinations";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return {};
  return {
    title: `${dest.name} Travel Guide`,
    description: dest.excerpt,
    openGraph: {
      images: [dest.image],
    },
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return notFound();

  return (
    <main className="bg-white">
      <section className="relative h-[45svh] overflow-hidden">
        <Image src={dest.image} alt={dest.name} fill className="object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 h-full flex items-end">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-10">
            <h1 className="text-white text-4xl md:text-5xl font-semibold">{dest.name}</h1>
            <p className="text-white/90 mt-2 max-w-2xl">{dest.excerpt}</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-zinc max-w-none">
            <p>{dest.body}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
