"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "error";

const inputClass =
  "w-full rounded-xl border border-bone/15 bg-ink/60 px-4 py-3 text-bone placeholder:text-bone/40 focus:border-ultra focus:outline-none";

export default function SponsorForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setMessage("");

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: { error?: string } = await res.json();
      if (!res.ok) throw new Error(json.error ?? "No se pudo enviar.");
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  if (status === "ok") {
    return (
      <p role="status" className="mt-8 text-lg text-bone">
        Mensaje enviado. Te respondo en un máximo de 48 horas.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="nombre" required placeholder="Tu nombre" className={inputClass} autoComplete="name" />
        <input name="marca" required placeholder="Marca o empresa" className={inputClass} autoComplete="organization" />
      </div>
      <input name="email" type="email" required placeholder="Correo de contacto" className={inputClass} autoComplete="email" />
      <div className="grid gap-4 sm:grid-cols-2">
        <select name="interes" required defaultValue="" className={inputClass}>
          <option value="" disabled>Tipo de alianza</option>
          <option value="Mecenas">Mecenas</option>
          <option value="Colaboración de marca">Colaboración de marca</option>
          <option value="Encargo y espacio">Encargo y espacio</option>
          <option value="Otro">Otro</option>
        </select>
        <select name="presupuesto" defaultValue="" className={inputClass}>
          <option value="">Presupuesto aproximado (opcional)</option>
          <option value="Menos de 1,000">Menos de 1,000</option>
          <option value="1,000 a 5,000">1,000 a 5,000</option>
          <option value="Más de 5,000">Más de 5,000</option>
        </select>
      </div>
      <textarea
        name="mensaje"
        required
        rows={5}
        placeholder="Cuéntame tu idea, fechas y qué esperas de la colaboración"
        className={inputClass}
      />

      {/* Trampa anti-spam: los humanos no ven este campo, los bots sí lo rellenan */}
      <input
        name="web"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-ultra px-7 py-3 font-medium text-bone transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Enviar propuesta"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {message}
        </p>
      )}
    </form>
  );
}
