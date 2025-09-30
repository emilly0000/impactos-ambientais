"use client";
import { useState } from "react";
import styles from "./quiz.module.css";

const quizzes = [
  {
    title: "💧 Gestão da Água na Indústria Brasileira",
    color: "#BEE5B0",
    questions: [
      {
        question: "Qual é o principal objetivo da gestão hídrica na indústria?",
        options: [
          "Reduzir custos operacionais",
          "Minimizar o uso e desperdício de água",
          "Aumentar a produção",
          "Melhorar a imagem da empresa",
        ],
        correct: 1,
      },
    ],
  },
  {
    title: "⛏️ Impactos Ambientais da Mineração",
    color: "#EAF6EA",
    questions: [
      {
        question: "Qual é uma medida mitigadora na mineração?",
        options: [
          "Uso de tecnologias limpas",
          "Aumento da exploração",
          "Redução de custos",
          "Expansão de áreas mineradas",
        ],
        correct: 0,
      },
    ],
  },
  {
    title: "🌱 Contabilidade Ambiental e Tecnologias Limpas",
    color: "#CEF0C2",
    questions: [
      {
        question: "Qual é o benefício das tecnologias limpas?",
        options: [
          "Aumento de resíduos",
          "Redução de impactos ambientais",
          "Maior consumo de energia",
          "Expansão industrial",
        ],
        correct: 1,
      },
    ],
  },
];

export default function QuizPage() {
  const [activeQuiz, setActiveQuiz] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizzes[activeQuiz].questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestion < quizzes[activeQuiz].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Você terminou o quiz! Sua pontuação: ${score}/${quizzes[activeQuiz].questions.length}`);
      setActiveQuiz((activeQuiz + 1) % quizzes.length);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  return (
    <div className={styles.quizContainer}>
      <header className={styles.quizHeader}>
        <div className={styles.titleCard}>
          <h1 className={styles.quizTitle}>🎯 Quiz</h1>
          <p className={styles.quizSubtitle}>Teste seus conhecimentos sobre os artigos!</p>
        </div>
      </header>

      <div className={styles.quizContent}>
        <h2
          className={styles.quizTopic}
          style={{ backgroundColor: quizzes[activeQuiz].color }}
        >
          {quizzes[activeQuiz].title}
        </h2>
        <div className={styles.questionBox}>
          <p className={styles.questionText}>{quizzes[activeQuiz].questions[currentQuestion].question}</p>
          <div className={styles.optionsContainer}>
            {quizzes[activeQuiz].questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`${styles.optionButton} ${selectedOption === index ? styles.selectedOption : ""}`}
                onClick={() => handleOptionClick(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <button
          className={styles.nextButton}
          onClick={handleNextQuestion}
          disabled={selectedOption === null}
        >
          Próxima Pergunta
        </button>
      </div>
    </div>
  );
}