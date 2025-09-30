"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Sun, Leaf, BatteryCharging } from "lucide-react";

export default function Artigo3Page() {
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
          <h1 className="text-4xl font-bold mb-4 text-[#0A421C] text-center">Contabilidade Ambiental e Tecnologias Limpas em Agroindústria</h1>
          <p className="text-lg text-[#0A421C]/90 mb-6">
            O estudo analisa como a Contabilidade Ambiental (CA) pode mensurar custos e benefícios da adoção de tecnologias limpas em uma agroindústria de alimentos no estado de Goiás, especializada em carne de frango e com forte presença nacional e internacional.<br /><br />
            Foram identificadas três práticas principais:<br /><br />
            <b>Instalação de filtros e uso de cavacos de madeira na caldeira</b> – reduziu emissões de gases de efeito estufa e o consumo de lenha.<br /><br />
            <b>Construção de Estação de Tratamento de Efluentes (ETE) e reaproveitamento de resíduos sólidos</b> – possibilitou eliminação de odores, retorno de água tratada ao meio ambiente, geração de receita com subprodutos e redução de 55,58 toneladas de CO₂.<br /><br />
            <b>Projeto piloto de energia solar</b> – reduziu o consumo de energia convencional, ampliando o uso de fontes renováveis e gerando economia de recursos naturais.<br /><br />
            Os resultados mostram que a adoção de tecnologias limpas trouxe ganhos ambientais, sociais e econômicos, como menor poluição, uso eficiente de recursos, receitas adicionais e empregos diretos. O artigo também destaca que a Contabilidade Ambiental é um instrumento importante para integrar sustentabilidade às decisões empresariais, fortalecendo a competitividade e a imagem institucional.<br /><br />
            A pesquisa conclui que a Produção Mais Limpa é uma estratégia eficaz para reduzir impactos ambientais, mas ainda existem desafios, como maior capacitação de gestores, monitoramento constante e aproximação entre empresas e meio acadêmico.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <img src="/ambiental.jpg" alt="Contabilidade Ambiental" className="rounded-lg shadow-md w-full h-auto mb-6" />
          <div className="flex items-center space-x-4">
            <Sun className="w-12 h-12 text-yellow-500" />
            <p className="text-lg text-[#0A421C]/90">Energia renovável e sustentável.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Leaf className="w-12 h-12 text-green-600" />
            <p className="text-lg text-[#0A421C]/90">Redução de emissões de CO₂.</p>
          </div>
          <div className="flex items-center space-x-4">
            <BatteryCharging className="w-12 h-12 text-blue-500" />
            <p className="text-lg text-[#0A421C]/90">Uso de tecnologias limpas.</p>
          </div>
          <div className="mt-6 flex flex-col items-center space-y-4 w-full">
            <a href="https://www.alice.cnptia.embrapa.br/alice/bitstream/doc/1161318/1/wander-sober-ne-2023.pdf" target="_blank" rel="noopener" className="block text-center bg-[#0A421C] text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#065732] transition">Baixar artigo completo (PDF)</a>
            <Link href="/dashboard#artigos" className="block text-center bg-[#EAF6EA] text-[#0A421C] py-3 px-8 rounded-lg font-semibold border border-[#0A421C] hover:bg-[#CDE5CD] transition">Voltar</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
