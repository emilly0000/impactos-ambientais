"use client";
import QuizTabs from "../../components/Quiz";

export default function QuizPage() {
  return (
    <main className="font-sans text-[#0A421C] bg-[#CEF0C2] min-h-[100vh]">
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <QuizTabs />
        </div>
      </div>
    </main>
  );
}