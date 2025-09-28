"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Cadastro feito com sucesso! Faça login.");
      router.push("/login");
    } else {
      setError(data.message || "Erro ao cadastrar.");
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center font-sans px-4 sm:px-6">
      <div className="absolute inset-0 z-0">
        <img
          src="/fundo.png"
          alt="Fundo"
          className="w-full h-full object-cover blur-sm opacity-70"
        />
      </div>

      <div className="relative z-10 bg-[#F4F0E6]/75 backdrop-blur-md shadow-xl ring-1 ring-[#0A421C]/10 rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-[#0A421C] text-center">Cadastro</h1>

        <form className="space-y-4" onSubmit={handleSignup}>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <label className="block mb-1 font-semibold text-[#0A421C]" htmlFor="nome">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              required
              placeholder="Digite seu nome"
              className="w-full rounded-lg px-3 py-2 border border-black/10 bg-white/80 placeholder:text-[#0A421C]/60 text-black focus:outline-none focus:ring-2 focus:ring-[#0A421C]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#0A421C]" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="Digite seu email"
              className="w-full rounded-lg px-3 py-2 border border-black/10 bg-white/80 placeholder:text-[#0A421C]/60 text-black focus:outline-none focus:ring-2 focus:ring-[#0A421C]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#0A421C]" htmlFor="senha">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              required
              placeholder="Crie uma senha"
              className="w-full rounded-lg px-3 py-2 border border-black/10 bg-white/80 placeholder:text-[#0A421C]/60 text-black focus:outline-none focus:ring-2 focus:ring-[#0A421C]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A421C] text-white py-2 rounded-lg font-bold hover:bg-[#065732] transition"
          >
            Cadastrar
          </button>

          <div className="text-center mt-4">
            <a
              href="/"
              className="text-[#0A421C] font-semibold hover:underline underline-offset-4"
            >
              ← Voltar para a Home
            </a>
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-[#0A421C]/80">
              Já tem cadastro?{' '}
              <a href="/login" className="font-semibold text-[#0A421C] hover:underline">Faça o login</a>
            </span>
          </div>
        </form>
        <div className="mt-8 flex flex-col items-center animate-bounce">
          <div className="bg-[#E6F4EA] border border-[#0A421C]/30 rounded-xl px-6 py-4 shadow text-center max-w-md">
            <span className="text-lg font-semibold text-[#0A421C]">Crie sua conta grátis para acessar <span className="text-green-700">quizzes</span>, baixar <span className="text-green-700">infográficos</span> e visualizar <span className="text-green-700">artigos completos</span>!</span>
          </div>
        </div>
      </div>
    </main>
  );
}
