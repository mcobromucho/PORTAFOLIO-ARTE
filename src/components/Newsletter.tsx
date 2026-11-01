"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export default function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json: { error?: string } = await res.json();
      if (!res.ok) throw new Error(json.error ?? "No se pudo suscribir.");
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  if (status === "ok") {
    return (
      <p role="status" className="mt-8 text-bone">
        Listo. Revisa tu correo: tu 10 % de descuento llega en la primera carta.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Tu correo
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Tu correo"
        className="w-full rounded-full border border-bone/15 bg-ink/60 px-5 py-3 text-bone placeholder:text-bone/40 focus:border-ultra focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-ultra px-6 py-3 text-sm font-medium text-bone transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Suscribirme gratis"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-400 sm:basis-full">
          {message}
        </p>
      )}
    </form>
  );
}
