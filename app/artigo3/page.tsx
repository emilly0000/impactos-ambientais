"use client";

import Link from "next/link";

export default function Artigo3Page() {
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
      <div className="max-w-2xl w-full mx-auto bg-[#F4F0E6] rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4 text-[#0A421C] text-center">Contabilidade Ambiental e Tecnologias Limpas em Agroindústria</h1>
        <p className="text-lg text-[#0A421C]/90 mb-6 text-center">
          O estudo analisa como a Contabilidade Ambiental (CA) pode mensurar custos e benefícios da adoção de tecnologias limpas em uma agroindústria de alimentos no estado de Goiás, especializada em carne de frango e com forte presença nacional e internacional.<br /><br />
          Foram identificadas três práticas principais:<br /><br />
          <b>Instalação de filtros e uso de cavacos de madeira na caldeira</b> – reduziu emissões de gases de efeito estufa e o consumo de lenha.<br /><br />
          <b>Construção de Estação de Tratamento de Efluentes (ETE) e reaproveitamento de resíduos sólidos</b> – possibilitou eliminação de odores, retorno de água tratada ao meio ambiente, geração de receita com subprodutos e redução de 55,58 toneladas de CO₂.<br /><br />
          <b>Projeto piloto de energia solar</b> – reduziu o consumo de energia convencional, ampliando o uso de fontes renováveis e gerando economia de recursos naturais.<br /><br />
          Os resultados mostram que a adoção de tecnologias limpas trouxe ganhos ambientais, sociais e econômicos, como menor poluição, uso eficiente de recursos, receitas adicionais e empregos diretos. O artigo também destaca que a Contabilidade Ambiental é um instrumento importante para integrar sustentabilidade às decisões empresariais, fortalecendo a competitividade e a imagem institucional.<br /><br />
          A pesquisa conclui que a Produção Mais Limpa é uma estratégia eficaz para reduzir impactos ambientais, mas ainda existem desafios, como maior capacitação de gestores, monitoramento constante e aproximação entre empresas e meio acadêmico.
        </p>
        <a href="https://www.alice.cnptia.embrapa.br/alice/bitstream/doc/1161318/1/wander-sober-ne-2023.pdf" target="_blank" rel="noopener" className="block w-full text-center bg-[#0A421C] text-white py-3 rounded-lg font-semibold hover:bg-[#065732] transition mb-4">Baixar artigo completo (PDF)</a>
        <Link href="/dashboard#artigos" className="block w-full text-center text-[#0A421C] underline font-medium mt-2">Voltar</Link>
      </div>
    </main>
  );
}
