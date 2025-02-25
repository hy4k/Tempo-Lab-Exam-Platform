import React, { useState } from "react";
import QuestionDisplay from "./QuestionDisplay";
import NavigationSidebar from "./NavigationSidebar";

interface Question {
  id: string;
  type: "multiple-choice" | "essay";
  content: string;
  options?: string[];
  status: "unanswered" | "answered" | "flagged";
}

interface ExamContentProps {
  questions?: Question[];
  currentQuestionId?: string;
  onQuestionChange?: (questionId: string) => void;
  onAnswerSubmit?: (questionId: string, answer: string) => void;
  onQuestionFlag?: (questionId: string) => void;
}

const defaultQuestions: Question[] = [
  {
    id: "1",
    type: "multiple-choice",
    content: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    status: "unanswered",
  },
  {
    id: "2",
    type: "essay",
    content: "Explain the process of photosynthesis.",
    status: "unanswered",
  },
  {
    id: "3",
    type: "multiple-choice",
    content: "Which planet is closest to the sun?",
    options: ["Venus", "Mercury", "Mars", "Earth"],
    status: "unanswered",
  },
];

const ExamContent = ({
  questions = defaultQuestions,
  currentQuestionId = "1",
  onQuestionChange = () => {},
  onAnswerSubmit = () => {},
  onQuestionFlag = () => {},
}: ExamContentProps) => {
  const [currentId, setCurrentId] = useState(currentQuestionId);
  const [localQuestions, setLocalQuestions] = useState(questions);

  const currentQuestion = localQuestions.find((q) => q.id === currentId);

  const handleQuestionSelect = (questionId: number) => {
    const newId = questionId.toString();
    setCurrentId(newId);
    onQuestionChange(newId);
  };

  const handleAnswer = (answer: string) => {
    const updatedQuestions = localQuestions.map((q) =>
      q.id === currentId ? { ...q, status: "answered" as const } : q,
    );
    setLocalQuestions(updatedQuestions);
    onAnswerSubmit(currentId, answer);
  };

  const handleFlag = () => {
    const updatedQuestions = localQuestions.map((q) =>
      q.id === currentId
        ? {
            ...q,
            status:
              q.status === "flagged" ? "unanswered" : ("flagged" as const),
          }
        : q,
    );
    setLocalQuestions(updatedQuestions);
    onQuestionFlag(currentId);
  };

  const handleNext = () => {
    const currentIndex = localQuestions.findIndex((q) => q.id === currentId);
    if (currentIndex < localQuestions.length - 1) {
      const nextId = localQuestions[currentIndex + 1].id;
      setCurrentId(nextId);
      onQuestionChange(nextId);
    }
  };

  const handlePrevious = () => {
    const currentIndex = localQuestions.findIndex((q) => q.id === currentId);
    if (currentIndex > 0) {
      const prevId = localQuestions[currentIndex - 1].id;
      setCurrentId(prevId);
      onQuestionChange(prevId);
    }
  };

  return (
    <div className="flex h-full w-full bg-gray-50">
      <div className="flex-1">
        <QuestionDisplay
          question={currentQuestion}
          onAnswer={handleAnswer}
          onFlag={handleFlag}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFlagged={currentQuestion?.status === "flagged"}
        />
      </div>
      <NavigationSidebar
        questions={localQuestions.map((q, index) => ({
          id: parseInt(q.id),
          number: index + 1,
          status: q.status,
        }))}
        currentQuestion={parseInt(currentId)}
        onQuestionSelect={handleQuestionSelect}
        onFlagQuestion={(id) => onQuestionFlag(id.toString())}
      />
    </div>
  );
};

export default ExamContent;
