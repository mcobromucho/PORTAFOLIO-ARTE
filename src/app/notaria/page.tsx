import React from 'react';

// Componente visual para las tarjetas del mosaico
function TarjetaBento({ titulo, descripcion, icono }: { titulo: string; descripcion: string; icono: string }) {
  return (
    <div className="p-8 rounded-3xl bg-[#141416] border border-white/5 hover:border-white/20 transition-all duration-300 group">
      <span className="text-3xl block mb-4">{icono}</span>
      <h3 className="font-serif text-2xl font-light text-white mb-2 group-hover:text-[#4f5bff] transition-colors">
        {titulo}
      </h3>
      <p className="text-sm leading-relaxed text-white/60">{descripcion}</p>
    </div>
  );
}

export default function PaginaNueva() {
  return (
    <main className="bg-[#0c0c0d] min-h-screen text-white py-24 px-6">
      <div className="mx-auto max-w-6xl">
        
        {/* Encabezado */}
        <div className="mb-16">
          <span className="text-xs font-mono text-[#4f5bff] uppercase tracking-widest">Maqueta de Prueba</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light mt-2">Nueva Página Express</h1>
          <p className="mt-4 text-white/60">Modifica estos bloques con la IA para adaptarlos a tu cliente.</p>
        </div>

        {/* Rejilla de bloques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TarjetaBento icono="⚖️" titulo="Servicio Uno" descripcion="Ideal para el beneficio principal del cliente." />
          <TarjetaBento icono="🛡️" titulo="Confianza" descripcion="Para poner certificaciones o años de experiencia." />
          <TarjetaBento icono="💬" titulo="Contacto Directo" descripcion="Botón de enlace directo a atención." />
        </div>

      </div>
    </main>
  );
}
