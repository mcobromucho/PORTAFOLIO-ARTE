"use client";

import { useState } from "react";

interface BuyButtonProps {
  artworkId: string;
  /** Opcional: enlace de PayPal.me o botón de pago de PayPal para esta obra */
  paypalUrl?: string;
}

export default function BuyButton({ artworkId, paypalUrl }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleBuy() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkId }),
      });
      const data: { url?: string; error?: string } = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "No se pudo iniciar el pago.");
      }
      window.location.href = data.url; // Stripe Checkout (página de pago segura)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleBuy}
        disabled={loading}
        className="w-full rounded-full bg-ultra px-6 py-3 text-sm font-medium text-bone transition hover:brightness-110 disabled:opacity-60"
      >
        {loading ? "Abriendo el pago..." : "Comprar esta obra"}
      </button>
      {paypalUrl && (
        <a
          href={paypalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-sm text-bone/70 underline underline-offset-4 hover:text-bone"
        >
          Pagar con PayPal
        </a>
      )}
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
