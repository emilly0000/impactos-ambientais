"use client";

export default function FeedbackPage() {
  const { data: session } = require("next-auth/react").useSession();
  const isLogged = !!session;

  return (
    <main className={`font-sans ${isLogged ? "text-[#0A421C]" : "text-[#F4F0E6]"} bg-[#F4F0E6] min-h-[100vh]`}>
      {isLogged ? (
        <header className="fixed top-0 left-0 w-full bg-[#0A421C] text-white p-4 sm:p-6 shadow-md z-50 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo (2).png" alt="Logo" className="w-10 h-10" />
            <span className="font-bold text-sm sm:text-base">Feedback</span>
          </div>
          <nav className="hidden md:flex space-x-4 items-center">
            <a href="/dashboard#artigos" className="transition-colors text-gray-300 hover:text-white font-semibold">Artigos</a>
            <a href="/dashboard#quiz" className="transition-colors text-gray-300 hover:text-white font-semibold">Quiz</a>
            <a href="/dashboard#infograficos" className="transition-colors text-gray-300 hover:text-white font-semibold">Infográficos</a>
            <a href="/dashboard#dicas" className="transition-colors text-gray-300 hover:text-white font-semibold">Dicas</a>
            <a href="/dashboard" className="ml-4 font-semibold hover:underline text-white">Voltar</a>
          </nav>
        </header>
      ) : (
        <header className="flex justify-between items-center p-6 text-sm bg-[#14532d] shadow-md">
          <a href="/">
            <img src="/logo (2).png" alt="Logo" width={50} height={50} />
          </a>
          <nav className="hidden md:flex space-x-4">
            <a href="/login">Login</a>
            <a href="/cadastro">Cadastro</a>
            <a href="/sobre">Sobre</a>
          </nav>
        </header>
      )}
      <div className="h-24 sm:h-28"></div>
      <div className="max-w-xl w-full bg-white/80 rounded-2xl shadow-lg p-8 mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-[#0A421C]">Deixe seu feedback!</h1>
        <p className="text-lg text-[#0A421C]/80 mb-6 text-center">Sua opinião é muito importante para melhorarmos o site. Responda o formulário abaixo:</p>
        <div className="w-full flex justify-center">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfDUMMYFORMURL/viewform?embedded=true"
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="rounded-lg border border-[#0A421C]/20 shadow"
            title="Formulário de Feedback"
            allowFullScreen
          >Carregando…</iframe>
        </div>
        <div className="text-center mt-6">
          <a href={isLogged ? "/dashboard" : "/"} className="inline-block bg-[#0A421C] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#065732] transition">Voltar</a>
        </div>
      </div>
    </main>
  );
}
