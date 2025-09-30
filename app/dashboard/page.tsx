"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Infograficos from "../../components/Infograficos";
import QuizTabs from "../../components/Quiz";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introducao");

  const sections = [
    { id: "introducao", label: "Introdução", bg: "" },
    { id: "artigos", label: "📚 Artigos", bg: "bg-[#EAF6EA]" },
    { id: "quiz", label: "❓ Quiz", bg: "bg-[#CEF0C2]" },
    { id: "infograficos", label: "📊 Infográficos", bg: "bg-[#DFF2D8]" },
    { id: "dicas", label: "💡 Dicas", bg: "bg-[#BEE5B0]" },
  ];

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    const handleScroll = () => {
      let current = "introducao";
      for (let section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop - 100;
          if (window.scrollY >= top) current = section.id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (status === "loading") return <p className="p-6">Carregando...</p>;
  if (!session) return null;

  return (
    <main className="font-sans text-[#0A421C]">
      <header className="fixed top-0 left-0 w-full bg-[#0A421C] text-white p-4 sm:p-6 shadow-md z-50 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="font-bold text-sm sm:text-base">
            {session.user.name || session.user.email}
          </span>
        </div>

        <nav className="hidden md:flex space-x-4 items-center">
          {sections.slice(1).map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`transition-colors ${activeSection === section.id
                ? "font-bold text-[#F4F0E6] underline"
                : "text-gray-300 hover:text-white"
                }`}
            >
              {section.label.replace(/[^a-zA-ZÀ-ú ]/g, "")}
            </a>
          ))}
          <button
            onClick={() => {
              window.localStorage.setItem("logoutManual", "1");
              signOut();
              setTimeout(() => { window.location.href = "/"; }, 500);
            }}
            className="ml-4 font-semibold hover:underline text-white"
          >
            Sair
          </button>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-[#0A421C] shadow-md rounded-lg flex flex-col py-2 z-20 md:hidden">
            {sections.slice(1).map((section) => (
              <a key={section.id} href={`#${section.id}`} className="px-4 py-2 hover:bg-[#065732]/50" onClick={() => setMenuOpen(false)}>
                {section.label.replace(/[^a-zA-ZÀ-ú ]/g, "")}
              </a>
            ))}
            <button onClick={() => { window.localStorage.setItem("logoutManual", "1"); signOut(); setTimeout(() => { window.location.href = "/"; }, 500); }} className="px-4 py-2 text-left hover:bg-[#065732]/50 text-white font-semibold">Sair</button>
          </div>
        )}
      </header>

      <section id="introducao" className="relative min-h-screen flex items-center justify-center pt-24">
        <div className="absolute inset-0 z-0">
          <img src="/dash.jpg" alt="Fundo Dashboard" className="w-full h-full object-cover blur-sm opacity-70" />
        </div>

        <div className="relative z-10 max-w-3xl mx-4 bg-[#F4F0E6]/75 backdrop-blur-md p-8 sm:p-12 rounded-2xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#0A421C]">Bem-vindo(a)!</h1>
          <p className="text-lg sm:text-xl mb-6 text-[#0A421C]/90">
            Aqui você pode explorar conteúdos educativos, artigos, quizzes, infográficos, e dicas para entender os impactos ambientais da produção industrial e aprender práticas mais sustentáveis.
          </p>
          <a href="#artigos" className="inline-block bg-[#0A421C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#065732] transition">
            Começar a Explorar
          </a>
        </div>
      </section>


      <section id="artigos" className="bg-[#EAF6EA] min-h-screen flex flex-col items-center pt-24 pb-16 px-4">
        <div className="max-w-4xl w-full mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-[#0A421C] text-center">📚 Artigos Científicos</h1>
          <p className="text-lg text-[#0A421C]/90 text-center mb-10">Explore estudos relevantes sobre sustentabilidade e indústria.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            <a href="/artigo1" className="bg-[#F4F0E6] rounded-xl shadow-lg p-6 flex flex-col items-center transition hover:scale-105 hover:shadow-xl cursor-pointer">
              <span className="text-3xl mb-2">💧</span>
              <h2 className="font-bold text-xl mb-2 text-[#0A421C] text-center">Gestão da Água na Indústria Brasileira</h2>
              <p className="text-[#0A421C]/80 text-center text-sm">Análise do uso da água e boas práticas de gestão hídrica no setor industrial.</p>
            </a>

            <a href="/artigo2" className="bg-[#F4F0E6] rounded-xl shadow-lg p-6 flex flex-col items-center transition hover:scale-105 hover:shadow-xl cursor-pointer">
              <span className="text-3xl mb-2">🌍</span>
              <h2 className="font-bold text-xl mb-2 text-[#0A421C] text-center">Impactos Ambientais da Mineração</h2>
              <p className="text-[#0A421C]/80 text-center text-sm">Análise dos impactos ambientais e medidas mitigadoras na mineração brasileira.</p>
            </a>
            <a href="/artigo3" className="bg-[#F4F0E6] rounded-xl shadow-lg p-6 flex flex-col items-center transition hover:scale-105 hover:shadow-xl cursor-pointer">
              <span className="text-3xl mb-2">�</span>
              <h2 className="font-bold text-xl mb-2 text-[#0A421C] text-center">Contabilidade Ambiental e Tecnologias Limpas</h2>
              <p className="text-[#0A421C]/80 text-center text-sm">Estudo sobre práticas limpas e mensuração de benefícios em agroindústria de alimentos.</p>
            </a>
          </div>
        </div>
      </section>

      <section id="quiz" className="bg-[#CEF0C2] min-h-screen flex flex-col items-center pt-24 pb-16 px-4">
        <div className="max-w-4xl w-full mx-auto">

          <QuizTabs />
        </div>
      </section>

      <Infograficos />

      <section id="dicas" className="bg-[#BEE5B0] min-h-screen flex flex-col items-center pt-24 pb-16 px-4">
        <div className="max-w-4xl w-full mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-[#0A421C] text-center">💡 Dicas</h1>
          <p className="text-lg text-[#0A421C]/90 text-center mb-10">Confira dicas práticas para adotar hábitos mais sustentáveis no seu dia a dia industrial e pessoal.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#F4F0E6] rounded-xl shadow-lg p-6 flex flex-col items-center transition hover:scale-105 hover:shadow-xl">
              <span className="text-3xl mb-2">🌱</span>
              <h2 className="font-bold text-xl mb-2 text-[#0A421C]">Reduza o desperdício</h2>
              <p className="text-[#0A421C]/80 text-center">Implemente processos para reaproveitar materiais e minimizar resíduos na produção.</p>
            </div>
            <div className="bg-[#F4F0E6] rounded-xl shadow-lg p-6 flex flex-col items-center transition hover:scale-105 hover:shadow-xl">
              <span className="text-3xl mb-2">💧</span>
              <h2 className="font-bold text-xl mb-2 text-[#0A421C]">Economize água</h2>
              <p className="text-[#0A421C]/80 text-center">Adote tecnologias de reutilização e monitoramento do consumo de água.</p>
            </div>
            <div className="bg-[#F4F0E6] rounded-xl shadow-lg p-6 flex flex-col items-center transition hover:scale-105 hover:shadow-xl">
              <span className="text-3xl mb-2">⚡</span>
              <h2 className="font-bold text-xl mb-2 text-[#0A421C]">Otimize energia</h2>
              <p className="text-[#0A421C]/80 text-center">Prefira fontes renováveis e mantenha equipamentos eficientes para reduzir o consumo.</p>
            </div>
            <div className="bg-[#F4F0E6] rounded-xl shadow-lg p-6 flex flex-col items-center transition hover:scale-105 hover:shadow-xl">
              <span className="text-3xl mb-2">🚚</span>
              <h2 className="font-bold text-xl mb-2 text-[#0A421C]">Logística sustentável</h2>
              <p className="text-[#0A421C]/80 text-center">Otimize rotas e priorize transportes menos poluentes para distribuição de produtos.</p>
            </div>
            <div className="bg-[#F4F0E6] rounded-xl shadow-lg p-6 flex flex-col items-center transition hover:scale-105 hover:shadow-xl">
              <span className="text-3xl mb-2">🔄</span>
              <h2 className="font-bold text-xl mb-2 text-[#0A421C]">Recicle e reutilize</h2>
              <p className="text-[#0A421C]/80 text-center">Separe resíduos e busque parcerias para reciclagem e reaproveitamento de insumos.</p>
            </div>
            <div className="bg-[#F4F0E6] rounded-xl shadow-lg p-6 flex flex-col items-center transition hover:scale-105 hover:shadow-xl">
              <span className="text-3xl mb-2">👥</span>
              <h2 className="font-bold text-xl mb-2 text-[#0A421C]">Engaje sua equipe</h2>
              <p className="text-[#0A421C]/80 text-center">Promova treinamentos e campanhas internas sobre sustentabilidade e boas práticas ambientais.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
