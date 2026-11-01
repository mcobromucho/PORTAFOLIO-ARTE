export interface Artwork {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  price: number;
  currency: "usd" | "mxn" | "eur";
  available: boolean;
  image?: string;
  gradient: string;
}

export const artworks: Artwork[] = [
  {
    id: "obra-01",
    title: "Colibrí",
    year: 2025,
    medium: "Grafito sobre papel",
    dimensions: "21 × 15 cm",
    price: 1200,
    currency: "mxn",
    available: true,
    image: "/obras/obra-01.png",
    gradient: "radial-gradient(60% 60% at 50% 40%, #c8bfb0, transparent 70%), #141416",
  },
  {
    id: "obra-02",
    title: "Ardilla en verde",
    year: 2025,
    medium: "Acrílico y técnica mixta sobre lienzo",
    dimensions: "30 × 40 cm",
    price: 2200,
    currency: "mxn",
    available: true,
    image: "/obras/obra-02.jpeg",
    gradient: "radial-gradient(55% 55% at 40% 35%, #7db86e, transparent 70%), radial-gradient(50% 60% at 70% 70%, #f2e44e, transparent 70%), #141416",
  },
  {
    id: "obra-03",
    title: "Pájaro azul",
    year: 2025,
    medium: "Acrílico sobre lienzo",
    dimensions: "30 × 30 cm",
    price: 2800,
    currency: "mxn",
    available: true,
    image: "/obras/obra-03.png",
    gradient: "radial-gradient(60% 60% at 35% 40%, #4f5bff, transparent 70%), radial-gradient(50% 50% at 70% 65%, #ff5a36, transparent 70%), #141416",
  },
  {
    id: "obra-04",
    title: "Tigre en agua",
    year: 2025,
    medium: "Acrílico sobre lienzo",
    dimensions: "40 × 30 cm",
    price: 3200,
    currency: "mxn",
    available: true,
    image: "/obras/obra-04.jpeg",
    gradient: "radial-gradient(60% 60% at 50% 50%, #1a3a4a, transparent 70%), radial-gradient(40% 40% at 70% 30%, #5bcfee, transparent 70%), #0a0a0d",
  },
  {
    id: "obra-05",
    title: "Jaguar sobre piedra",
    year: 2026,
    medium: "Acrílico sobre lienzo",
    dimensions: "50 × 35 cm",
    price: 3800,
    currency: "mxn",
    available: true,
    image: "/obras/obra-05.jpeg",
    gradient: "radial-gradient(60% 60% at 50% 45%, #d4cfc8, transparent 70%), #141416",
  },
  {
    id: "obra-06",
    title: "Autorretrato Xalapa",
    year: 2025,
    medium: "Acrílico y técnica mixta sobre lienzo",
    dimensions: "35 × 25 cm",
    price: 3500,
    currency: "mxn",
    available: true,
    image: "/obras/obra-06.png",
    gradient: "radial-gradient(55% 55% at 30% 40%, #5bcfee, transparent 70%), radial-gradient(50% 60% at 65% 65%, #f2e44e, transparent 70%), #141416",
  },
];