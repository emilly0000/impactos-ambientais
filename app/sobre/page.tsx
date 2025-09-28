import Link from "next/link";

export default function SobrePage() {
  return (
    <main
      className="bg-cover bg-center min-h-screen flex items-center justify-center font-sans text-[#0A421C]"
      style={{
        backgroundImage: "url('/fundo.png')",
      }}
    >
      <div className="bg-[#F4F0E6]/90 backdrop-blur-md p-10 rounded-xl max-w-3xl mx-auto shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 border-b-2 border-[#0A421C] pb-2 text-center">
          Sobre o Projeto
        </h1>

        <p className="mb-4 text-lg leading-relaxed">
          Este projeto foi criado como parte de uma atividade escolar com o objetivo de explorar os
          <strong> impactos ambientais causados pela produção industrial</strong>. Buscamos compreender os
          efeitos dessa prática e propor soluções mais conscientes.
        </p>

        <p className="mb-4 text-lg leading-relaxed">
          Analisamos como o uso excessivo de recursos naturais, a emissão de poluentes e a geração de resíduos
          impactam o planeta de forma alarmante. É essencial refletirmos sobre o nosso papel nessa cadeia produtiva.
        </p>

        <p className="mb-4 text-lg leading-relaxed">
          Nosso propósito é <strong>conscientizar</strong> e <strong>inspirar mudanças</strong>, incentivando ações
          sustentáveis em diversos setores e construindo juntos um futuro mais verde, justo e equilibrado.
        </p>

        <p className="text-base italic text-right mt-8">
          Produzido por Emilly Nogueira, Luise Uchôa, Victor Marcelo, João V. Ramos e Vinicius Rocha. — Informática 3.
        </p>

        <div className="text-center mt-4">
          <Link href="/" className="text-[#0A421C] font-semibold hover:underline">
            ← Voltar para a Home
          </Link>
        </div>

      </div>
    </main>
  );
}
