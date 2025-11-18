"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();


  useEffect(() => {

    const saiu = window.localStorage.getItem("logoutManual");
    if (status === "authenticated" && !saiu) {
      router.replace("/dashboard");
    }

    if (saiu) {
      window.localStorage.removeItem("logoutManual");
    }
  }, [status, router]);

  const handleSaibaMais = () => {
    if (status === "loading") return;
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/cadastro");
    }
  };

  return (
    <main className="font-sans min-h-screen w-full relative text-[#0A421C]">
      <div className="fixed inset-0 -z-10">
        <img src="/fundo.png" alt="Fundo industrial" className="w-full h-full object-cover blur-sm opacity-70" />
      </div>

      <header className="flex justify-between items-center p-6 text-sm bg-[#14532d] shadow-md">
        <Link href="/">
          <img src="/logo.png" alt="Logo" width={50} height={50} />
        </Link>
        <button
          className="md:hidden block focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-white 2xl">☰</span>
        </button>
        <nav className="hidden md:flex space-x-4">
          <Link href="/login" className="text-white font-semibold hover:underline">Login</Link>
          <Link href="/cadastro" className="text-white font-semibold hover:underline">Cadastro</Link>
          <Link href="/sobre" className="text-white font-semibold hover:underline">Sobre</Link>
        </nav>
      </header>

      {menuOpen && (
        <nav className="md:hidden bg-[#14532d] p-4 flex flex-col space-y-2">
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="text-white font-semibold hover:underline"
          >
            Login
          </Link>
          <Link
            href="/cadastro"
            onClick={() => setMenuOpen(false)}
            className="text-white font-semibold hover:underline"
          >
            Cadastro
          </Link>
          <Link
            href="/sobre"
            onClick={() => setMenuOpen(false)}
            className="text-white font-semibold hover:underline"
          >
            Sobre
          </Link>
        </nav>
      )}

      <section className="relative px-4 sm:px-6 py-16 sm:py-20 text-center flex flex-col items-center justify-center">
        <div className="relative z-10 max-w-xl sm:max-w-3xl mx-auto bg-[#F4F0E6]/80 backdrop-blur-md p-8 sm:p-12 rounded-2xl text-center shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#0A421C] drop-shadow">Impactos Ambientais na Produção Industrial</h1>
          <p className="text-lg sm:text-xl mb-6 text-[#0A421C]/90">A produção industrial tem um impacto profundo no meio ambiente. Este site explora como fábricas, processos produtivos e consumo de energia afetam nosso planeta – e o que podemos fazer para mudar isso.</p>
          <button
            onClick={handleSaibaMais}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded shadow transition w-full sm:w-auto"
          >
            SAIBA MAIS
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 px-4 sm:px-12 max-w-6xl mx-auto">
        <div className="bg-[#F4F0E6]/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h2 className="font-bold text-lg mb-2 text-[#0A421C]">Nossa Missão</h2>
          <p className="text-[#0A421C]">Conscientizar sobre os efeitos da produção industrial no meio ambiente e incentivar práticas mais sustentáveis em todos os setores da sociedade.</p>
        </div>
        <div className="bg-[#F4F0E6]/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h2 className="font-bold text-lg mb-2 text-[#0A421C]">Impacto</h2>
          <p className="text-[#0A421C]">A produção industrial afeta o solo, o ar e a água. Nosso objetivo é mostrar esses impactos e apontar caminhos para reduzir os danos ao planeta.</p>
        </div>
      </section>

      <footer className="w-full bg-[#14532d] text-[#F4F0E6] border-t border-[#F4F0E6]/20 py-8 px-4 flex flex-col items-center gap-2 mt-12 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <img src="/logo.png" alt="Logo Tecnosfera" width={32} height={32} className="rounded" />
          <span className="font-bold text-lg tracking-wide">Tecnosfera</span>
        </div>
        <div className="text-center text-xs sm:text-sm max-w-xl">
          © 2025 Tecnosfera – Todos os direitos reservados.<br />
          Desenvolvido com <span className="text-green-300">Next.js</span> e <span className="text-green-300">React</span> | Projeto educacional sem fins lucrativos
        </div>
        <div className="flex gap-4 mt-2">
          <a href="/sobre" className="hover:underline text-green-200">Sobre</a>
          <a href="mailto:contato@ecoindustria.com" className="hover:underline text-green-200">Contato</a>
        </div>
      </footer>
    </main>
  );
}
