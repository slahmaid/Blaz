export type Destination = {
  slug: string;
  name: string;
  image: string;
  excerpt: string;
  body: string;
};

export const destinations: Destination[] = [
  {
    slug: "marrakech",
    name: "Marrakech",
    image: "https://images.unsplash.com/photo-1544989164-31dc3c645987?auto=format&fit=crop&w=1600&q=60",
    excerpt: "Medina mazes, vibrant souks, and Jardin Majorelle.",
    body:
      "Explore the Red City’s bustling Jemaa el-Fnaa, serene riads, and world-class cuisine.",
  },
  {
    slug: "fes",
    name: "Fes",
    image: "https://images.unsplash.com/photo-1553882803-57ab84b8b9b8?auto=format&fit=crop&w=1600&q=60",
    excerpt: "UNESCO-listed medina and ancient tanneries.",
    body:
      "Wander the labyrinthine alleys of Fes el-Bali and visit the Chouara Tannery.",
  },
  {
    slug: "sahara",
    name: "Sahara Desert",
    image: "https://images.unsplash.com/photo-1548783307-f63a30c0dbf0?auto=format&fit=crop&w=1600&q=60",
    excerpt: "Golden dunes, camel treks, and starry nights.",
    body:
      "Ride into the dunes of Merzouga or Zagora and sleep under a galaxy of stars.",
  },
  {
    slug: "chefchaouen",
    name: "Chefchaouen",
    image: "https://images.unsplash.com/photo-1545424273-94b3688cc1ac?auto=format&fit=crop&w=1600&q=60",
    excerpt: "The Blue City tucked in the Rif Mountains.",
    body:
      "Pastel-blue lanes, mountain air, and relaxed cafes define this photogenic town.",
  },
  {
    slug: "essaouira",
    name: "Essaouira",
    image: "https://images.unsplash.com/photo-1606046604972-77cc76aee944?auto=format&fit=crop&w=1600&q=60",
    excerpt: "Atlantic winds, ramparts, and fresh seafood.",
    body:
      "From kitesurfing beaches to historic ports, Essaouira blends culture and chill.",
  },
  {
    slug: "casablanca",
    name: "Casablanca",
    image: "https://images.unsplash.com/photo-1588413337014-b0b0b5a4a7de?auto=format&fit=crop&w=1600&q=60",
    excerpt: "Modern city life and the Hassan II Mosque.",
    body:
      "Morocco’s cosmopolitan hub with striking oceanfront architecture and dining.",
  },
];
