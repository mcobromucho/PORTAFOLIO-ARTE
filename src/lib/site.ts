// Cambia estos datos una sola vez; toda la web se actualiza.
export const site = {
  artist: "Jair Trillo",
  title: "Jair Trillo | Pintura contemporánea",
  description:
    "Pintura contemporánea: obras originales en venta, comisiones y alianzas con marcas y patrocinadores.",
  email: "mcobromucho@gmail.com",
  instagram: "https://www.instagram.com/mcobromucho/",
  tiktok: "https://www.tiktok.com/@mcobromucho",
  nav: [
    { label: "Colección", href: "#coleccion" },
    { label: "Sobre mí", href: "#sobre-mi" },
    { label: "Alianzas", href: "#alianzas" },
    { label: "Comunidad", href: "#comunidad" },
  ],
  // Cinta de prueba social en la portada: usa solo datos reales.
  proof: [
    "Obras originales con certificado",
    "Envíos internacionales",
    "Abierta a colaboraciones con marcas",
    "Edición nueva cada mes",
  ],
} as const;
