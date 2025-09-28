"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function FeedbackButton() {
  const [alerta, setAlerta] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerta(true);
      setTimeout(() => setAlerta(false), 2500);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {alerta && (
        <div className="mb-2 px-4 py-2 rounded-xl bg-[#0A421C] text-white shadow-lg animate-bounce text-sm font-semibold">
          Avalie o site! Sua opinião é importante 💬
        </div>
      )}
      <Link href="/feedback">
        <button
          aria-label="Enviar feedback"
          className={`w-16 h-16 rounded-full bg-[#0A421C] shadow-lg flex items-center justify-center hover:bg-[#065732] transition-colors border-4 border-[#F4F0E6] ${alerta ? "animate-bounce" : ""}`}
        >
          <span className="text-white text-2xl font-bold">💬</span>
        </button>
      </Link>
    </div>
  );
}
