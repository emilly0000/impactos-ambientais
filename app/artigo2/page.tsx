"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Globe, Trees } from "lucide-react";

export default function Artigo2Page() {
  useEffect(() => {
    window.history.replaceState(null, "", "/dashboard#artigos");
  }, []);

  return (
    <main className="font-sans text-[#0A421C] bg-[#EAF6EA] min-h-[100vh]">
      <header className="fixed top-0 left-0 w-full bg-[#0A421C] text-white p-4 sm:p-6 shadow-md z-50 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="font-bold text-sm sm:text-base">Artigo Científico</span>
        </div>
        <nav className="hidden md:flex space-x-4 items-center">
          <Link href="/dashboard#artigos" className="transition-colors text-gray-300 hover:text-white font-semibold">Artigos</Link>
          <Link href="/dashboard#quiz" className="transition-colors text-gray-300 hover:text-white font-semibold">Quiz</Link>
          <Link href="/dashboard#infograficos" className="transition-colors text-gray-300 hover:text-white font-semibold">Infográficos</Link>
          <Link href="/dashboard#dicas" className="transition-colors text-gray-300 hover:text-white font-semibold">Dicas</Link>
          <Link href="/dashboard" className="ml-4 font-semibold hover:underline text-white">Voltar</Link>
        </nav>
      </header>
      <div className="h-24 sm:h-28"></div>
      <div className="max-w-6xl w-full mx-auto bg-[#F4F0E6] rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-[#0A421C] text-center">Impactos ambientais da mineração no Brasil</h1>
          <p className="text-lg text-[#0A421C]/90 mb-6">
            O estudo analisa os principais impactos ambientais gerados pela mineração e as medidas mitigadoras possíveis. A mineração, apesar de sua relevância econômica para o Brasil, causa alterações significativas no meio ambiente, modificando paisagens e comprometendo ecossistemas.<br /><br />

            <b>Os impactos foram classificados em quatro categorias:</b><br /><br />

            <b>Recursos hídricos:</b> grande consumo de água, rebaixamento do lençol freático, contaminação de rios e lagos, além do risco de desastres como rompimento de barragens de rejeito.<br /><br />

            <b>Ar:</b> emissão de poeira e gases tóxicos durante escavações, transporte e beneficiamento do minério, afetando a qualidade do ar e a saúde das populações próximas.<br /><br />

            <b>Poluição sonora:</b> ruídos intensos provocados por explosões e máquinas pesadas, que prejudicam comunidades vizinhas e estruturas locais.<br /><br />

            <b>Solo:</b> desmatamento, remoção da camada fértil, erosão e deposição de rejeitos, que resultam em perda de fertilidade, alteração do relevo e poluição visual.<br /><br />

            Como medidas mitigadoras, destacam-se: impermeabilização de rejeitos para evitar contaminação da água, sistemas de despoeiramento e controle de gases, barreiras contra ruídos, recuperação de áreas degradadas e reaterro com cobertura vegetal.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <img src="/mineração.jpg" alt="Mineração" className="rounded-lg shadow-md w-full h-auto" />
          <div className="flex items-center space-x-4">
            <Globe className="w-12 h-12 text-gray-600" />
            <p className="text-lg text-[#0A421C]/90">Impactos da mineração.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Globe className="w-12 h-12 text-blue-600" />
            <p className="text-lg text-[#0A421C]/90">Contaminação de recursos naturais.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Trees className="w-12 h-12 text-green-600" />
            <p className="text-lg text-[#0A421C]/90">Desmatamento e erosão.</p>
          </div>
          <div className="mt-6 flex flex-col items-center space-y-4 w-full">
            <a href="https://www.confea.org.br/midias/uploads-imce/Contecc2021/Civil/OS%20IMPACTOS%20AMBIENTAIS%20CAUSADOS%20PELA%20ATIVIDADE%20MINERADORA.pdf" target="_blank" rel="noopener" className="block text-center bg-[#0A421C] text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#065732] transition">Baixar artigo completo (PDF)</a>
            <Link href="/dashboard#artigos" className="block text-center bg-[#EAF6EA] text-[#0A421C] py-3 px-8 rounded-lg font-semibold border border-[#0A421C] hover:bg-[#CDE5CD] transition">Voltar</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
