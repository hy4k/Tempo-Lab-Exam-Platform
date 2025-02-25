import React, { useState } from "react";
import ExamContainer from "@/components/exam/ExamContainer";
import SystemCheck from "@/components/exam/SystemCheck";

interface ExamPageProps {
  examId?: string;
}

const ExamPage = ({ examId = "1" }: ExamPageProps) => {
  const [systemCheckPassed, setSystemCheckPassed] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isProctoring, setIsProctoring] = useState(true);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [lastSaved, setLastSaved] = useState("Just now");

  const handleSystemCheckContinue = () => {
    setSystemCheckPassed(true);
  };

  const handleSystemCheckRetry = () => {
    // Implement system check retry logic
  };

  const handleQuestionSelect = (id: number) => {
    setCurrentQuestionId(id);
  };

  const handleFlagQuestion = (id: number) => {
    // Implement flag question logic
  };

  const handleAnswerSubmit = (answer: string) => {
    setLastSaved("Just now");
    // Implement answer submission logic
  };

  if (!systemCheckPassed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <SystemCheck
          onContinue={handleSystemCheckContinue}
          onRetry={handleSystemCheckRetry}
        />
      </div>
    );
  }

  return (
    <ExamContainer
      isOnline={isOnline}
      isProctoring={isProctoring}
      timeRemaining="2:45:30"
      lastSaved={lastSaved}
      currentQuestionId={currentQuestionId}
      onQuestionSelect={handleQuestionSelect}
      onFlagQuestion={handleFlagQuestion}
      onAnswerSubmit={handleAnswerSubmit}
    />
  );
};

export default ExamPage;
