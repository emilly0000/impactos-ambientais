'use client';
import Link from "next/link";
import { useState } from "react";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus("Enviamos um link de recuperação para o seu email.");
    } else {
      setStatus("Erro ao enviar. Verifique o email informado.");
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center font-sans px-4">
      <div className="absolute inset-0 z-0">
        <img
          src="/fundo.png"
          alt="Fundo"
          className="w-full h-full object-cover blur-sm opacity-70"
        />
      </div>

      <div className="relative z-10 bg-[#F4F0E6]/75 backdrop-blur-md shadow-xl ring-1 ring-[#0A421C]/10 rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-[#0A421C] text-center">
          Recuperar Senha
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="block mb-1 font-semibold text-[#0A421C]"
              htmlFor="email"
            >
              Digite seu Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full rounded-lg px-3 py-2 border border-black/10 bg-white/80 placeholder:text-[#0A421C]/60 text-black focus:outline-none focus:ring-2 focus:ring-[#0A421C]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A421C] text-white py-2 rounded-lg font-bold hover:bg-[#065732] transition"
          >
            Enviar link
          </button>

          {status && <p className="text-center text-sm mt-2">{status}</p>}

          <div className="text-center mt-4">
            <Link
              href="/login"
              className="text-[#0A421C] font-semibold hover:underline underline-offset-4"
            >
              ← Voltar para o Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
