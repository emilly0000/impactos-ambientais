import { useState } from "react";
import quizzes from "../data/quizzes";

function QuizTabs() {
  const [activeQuiz, setActiveQuiz] = useState(0);
  return (
    <div>
      <div className="flex justify-center mb-8 gap-4">
        {quizzes.map((quiz, idx) => (
          <button
            key={quiz.id}
            onClick={() => setActiveQuiz(idx)}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors shadow-md border-2 border-[#0A421C] ${activeQuiz === idx
                ? "bg-[#0A421C] text-white"
                : "bg-[#F4F0E6] text-[#0A421C] hover:bg-[#BEE5B0]"
              }`}
          >
            {quiz.title}
          </button>
        ))}
      </div>
      <Quiz quiz={quizzes[activeQuiz]} />
    </div>
  );
}

function Quiz({ quiz }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleOption = (optionIdx) => {
    setAnswers([...answers, optionIdx]);
    if (step < quiz.questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (!showResult) {
    const q = quiz.questions[step];
    return (
      <div className="bg-[#DFF2D8] rounded-xl shadow-lg p-8 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#0A421C]">
          Pergunta {step + 1} de {quiz.questions.length}
        </h2>
        <p className="text-lg mb-6 text-[#0A421C]/90">{q.question}</p>
        <div className="flex flex-col gap-4">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOption(idx)}
              className="bg-[#CEF0C2] hover:bg-[#BEE5B0] text-[#0A421C] font-semibold py-3 px-6 rounded-lg shadow transition-colors border border-[#0A421C]"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Resultado
  let score = 0;
  const corrections = [];
  quiz.questions.forEach((q, idx) => {
    if (answers[idx] === q.answer) score++;
    else
      corrections.push({
        idx,
        question: q.question,
        correct: q.options[q.answer],
        user: q.options[answers[idx]],
      });
  });

  return (
    <div className="bg-[#DFF2D8] rounded-xl shadow-lg p-8 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4 text-[#0A421C]">Resultado</h2>
      <p className="text-lg mb-6 text-[#0A421C]/90">
        Você acertou <span className="font-bold">{score}</span> de {quiz.questions.length} perguntas!
      </p>
      {corrections.length > 0 ? (
        <div className="text-left mt-6">
          <h3 className="font-bold text-[#0A421C] mb-2">Correção das perguntas erradas:</h3>
          <ul className="list-disc pl-6">
            {corrections.map((c, i) => (
              <li key={i} className="mb-4">
                <span className="font-semibold">Pergunta {c.idx + 1}:</span> {c.question}
                <br />
                <span className="text-[#B91C1C]">Sua resposta: {c.user}</span>
                <br />
                <span className="text-[#0A421C]">Resposta correta: {c.correct}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-[#0A421C] font-semibold">Parabéns! Você acertou todas as perguntas!</p>
      )}
      <button
        onClick={resetQuiz}
        className="mt-8 bg-[#0A421C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#065732] transition"
      >
        Refazer Quiz
      </button>
    </div>
  );
}

export default QuizTabs;