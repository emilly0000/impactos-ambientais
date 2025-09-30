"use client";

import Link from "next/link";

export default function Artigo1Page() {
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
        <h1 className="text-4xl font-bold mb-4 text-[#0A421C] text-center">Gestão da água na indústria brasileira</h1>
        <p className="text-lg text-[#0A421C]/90 mb-6 text-center">O estudo apresenta uma análise detalhada sobre o uso da água no setor industrial brasileiro e propõe a Matriz de Coeficientes Técnicos, ferramenta que mede a quantidade de água utilizada, consumida e devolvida em diferentes ramos industriais.<br /><br />
          A pesquisa mostra que a indústria tem papel central no consumo de recursos hídricos e destaca a importância da gestão eficiente da água para reduzir desperdícios e impactos ambientais. A Rede de Recursos Hídricos da Indústria, criada pela CNI em 2009, tem promovido boas práticas, como recirculação e reaproveitamento da água. Exemplos positivos aparecem em setores como siderurgia (reciclagem acima de 96%), mineração (até 95% de reuso), indústria química, de bebidas e automotiva, que reduziram significativamente sua captação.<br /><br />
          O estudo ainda evidencia desafios: falta de dados detalhados por produto/processo, necessidade de atualização constante dos coeficientes e adaptação às realidades locais. Mesmo assim, a matriz fornece referências importantes para planejamento público, gestão industrial e políticas de uso sustentável da água.<br /><br />
          A indústria reconhece que cada produto e processo possui um padrão específico de consumo, e que a evolução tecnológica tende a reduzir a dependência hídrica. Por isso, defende a atualização periódica dos indicadores e a cooperação contínua entre poder público e setor produtivo.
        </p>
        <a href="https://www.imasul.ms.gov.br/wp-content/uploads/2017/12/Uso-de-%C3%81gua-no-Setor-Industrial-Brasileiro.pdf" target="_blank" rel="noopener" className="block w-full text-center bg-[#0A421C] text-white py-3 rounded-lg font-semibold hover:bg-[#065732] transition mb-4">Baixar artigo completo (PDF)</a>
        <Link href="/dashboard#artigos" className="block w-full text-center text-[#0A421C] underline font-medium mt-2">Voltar</Link>
      </div>
    </main>
  );
}
