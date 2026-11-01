import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Sponsors from "@/components/Sponsors";
import Community from "@/components/Community";
import Footer from "@/components/Footer";

// Página única: el orden de las secciones es el orden del embudo de ventas.
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Sponsors />
        <Community />
      </main>
      <Footer />
    </>
  );
}
