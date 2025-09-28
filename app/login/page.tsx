"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password: senha,
      callbackUrl: "/dashboard",
    });

    if (res?.error) {
      setError("Email ou senha incorretos");
    } else {
      router.push("/dashboard");
    }
  };

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
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <label
              className="block mb-1 font-semibold text-[#0A421C]"
              htmlFor="email"
            >
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
            <label
              className="block mb-1 font-semibold text-[#0A421C]"
              htmlFor="senha"
            >
              Senha
            </label>
            <input
              type="password"
              id="senha"
              required
              placeholder="Digite sua senha"
              className="w-full rounded-lg px-3 py-2 border border-black/10 bg-white/80 placeholder:text-[#0A421C]/60 text-black focus:outline-none focus:ring-2 focus:ring-[#0A421C]"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="text-right -mt-2 mb-2">
            <Link
              href="/recuperar-senha"
              className="text-sm text-[#0A421C] hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A421C] text-white py-2 rounded-lg font-bold hover:bg-[#065732] transition"
          >
            Entrar
          </button>

          <div className="text-center mt-2">
            <span className="text-sm text-[#0A421C]/80">
              Não tem login?{" "}
              <Link
                href="/cadastro"
                className="font-semibold text-[#0A421C] hover:underline"
              >
                Cadastre-se
              </Link>
            </span>
          </div>

          <div className="text-center mt-4">
            <Link
              href="/"
              className="text-[#0A421C] font-semibold hover:underline underline-offset-4"
            >
              ← Voltar para a Home
            </Link>
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
