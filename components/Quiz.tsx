import { useState } from "react";
import quizzes from "../data/quizzes";


const THEME = {
  artigo1: { icon: "💧", color: "bg-[#BEE5B0]", border: "border-[#065732]" },
  artigo2: { icon: "⛏️", color: "bg-[#EAF6EA]", border: "border-[#065732]" },
  artigo3: { icon: "🌱", color: "bg-[#CEF0C2]", border: "border-[#065732]" },
};

function QuizTabs() {
  const [activeQuiz, setActiveQuiz] = useState(0);

  return (
    <div className="bg-transparent">
      <div className="mb-6 flex justify-center">
        <div className="bg-white/90 px-6 py-4 rounded-xl shadow-md flex items-center gap-4">
          <span className="text-3xl">🎯</span>
          <div className="text-left">
            <h3 className="text-2xl font-bold text-[#065732]">Quiz</h3>
            <p className="text-sm italic text-[#0A421C]/80">Teste seus conhecimentos sobre os artigos!</p>
          </div>
        </div>
      </div>


      <div className="flex justify-center mb-8 gap-4">
        {quizzes.map((quiz, idx) => {
          const meta = THEME[quiz.id] || { icon: "❓", color: "bg-[#F4F0E6]", border: "border-[#065732]" };
          return (
            <button
              key={quiz.id}
              onClick={() => setActiveQuiz(idx)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition transform shadow-md ${activeQuiz === idx ? "scale-105 bg-[#065732] text-white" : `bg-white text-[#065732] border-2 ${meta.border}`}`}
              aria-pressed={activeQuiz === idx}
            >
              <span className="text-xl">{meta.icon}</span>
              <span className="hidden sm:inline">{quiz.title}</span>
            </button>
          );
        })}
      </div>


      <Quiz quiz={quizzes[activeQuiz]} />
    </div>
  );
}

function Quiz({ quiz }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const total = quiz.questions.length;

  const handleSelect = (idx) => {
    setSelected(idx);
  };

  const handleNext = () => {
    setAnswers((a) => [...a, selected]);
    setSelected(null);
    if (step < total - 1) setStep((s) => s + 1);
    else setShowResult(true);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
    setSelected(null);
  };


  const progress = Math.round(((step + (selected !== null ? 1 : 0)) / total) * 100);

  if (!showResult) {
    const q = quiz.questions[step];
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-3">
          <div className="w-full bg-[#EAF6EA] rounded-full h-3 overflow-hidden shadow-inner">
            <div className="h-full bg-[#065732] transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-sm text-right text-[#0A421C]/80 mt-1">Pergunta {step + 1} de {total}</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h4 className="text-xl md:text-2xl font-bold text-center text-[#065732] mb-4">{q.question}</h4>
          <div className="grid gap-4 md:grid-cols-1 sm:grid-cols-1 mt-4">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left py-4 px-5 rounded-2xl border-2 transition transform shadow-sm flex items-center justify-between ${selected === idx ? 'bg-[#065732] text-white scale-102' : 'bg-[#F4F0E6] text-[#0A421C] hover:bg-[#BEE5B0]'} sm:text-sm`}
                aria-pressed={selected === idx}
              >
                <span className="font-medium">{opt}</span>
                {selected === idx && <span className="text-sm opacity-80">Selecionado</span>}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNext}
              disabled={selected === null}
              className={`px-6 py-3 rounded-full font-semibold transition ${selected === null ? 'bg-[#BEE5B0] text-[#0A421C] cursor-not-allowed' : 'bg-[#065732] text-white hover:bg-[#0A421C]'}`}
            >
              {step < total - 1 ? 'Próxima' : 'Finalizar'}
            </button>
          </div>
        </div>
      </div>
    );
  }


  let score = 0;
  const corrections = [];
  quiz.questions.forEach((qq, i) => {
    const user = answers[i];
    if (user === qq.answer) score++;
    else corrections.push({ idx: i, question: qq.question, correct: qq.options[qq.answer], user: qq.options[user] || '—' });
  });

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-[#065732] mb-2">Resultado</h3>
        <p className="text-lg text-[#0A421C]/90 mb-4">Você acertou <span className="font-bold">{score}</span> de {total} perguntas.</p>

        {corrections.length > 0 ? (
          <div className="text-left mt-4">
            <h4 className="font-semibold text-[#0A421C] mb-2">Correções</h4>
            <ul className="list-disc pl-5 space-y-3 text-sm text-[#0A421C]/90">
              {corrections.map((c, i) => (
                <li key={i}>
                  <div className="font-semibold">Pergunta {c.idx + 1}:</div>
                  <div>{c.question}</div>
                  <div className="text-[#B91C1C]">Sua resposta: {c.user}</div>
                  <div className="text-[#065732]">Correta: {c.correct}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-[#0A421C] font-semibold">Parabéns! Você acertou todas as perguntas!</p>
        )}

        <div className="mt-6 flex justify-center gap-4">
          <button onClick={resetQuiz} className="px-6 py-2 rounded-full bg-[#065732] text-white font-semibold hover:bg-[#0A421C]">Refazer</button>
        </div>
      </div>
    </div>
  );
}

export default QuizTabs;