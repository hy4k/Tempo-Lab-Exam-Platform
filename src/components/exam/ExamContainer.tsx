import React from "react";
import StatusBar from "./StatusBar";
import QuestionArea from "./QuestionArea";
import QuestionSidebar from "./QuestionSidebar";

interface ExamContainerProps {
  isOnline?: boolean;
  isProctoring?: boolean;
  timeRemaining?: string;
  lastSaved?: string;
  currentQuestionId?: number;
  onQuestionSelect?: (id: number) => void;
  onFlagQuestion?: (id: number) => void;
  onAnswerSubmit?: (answer: string) => void;
}

const ExamContainer = ({
  isOnline = true,
  isProctoring = true,
  timeRemaining = "2:45:30",
  lastSaved = "Just now",
  currentQuestionId = 1,
  onQuestionSelect = () => {},
  onFlagQuestion = () => {},
  onAnswerSubmit = () => {},
}: ExamContainerProps) => {
  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col">
      <StatusBar
        isOnline={isOnline}
        isProctoring={isProctoring}
        timeRemaining={timeRemaining}
        lastSaved={lastSaved}
      />

      <div className="flex flex-1 mt-10">
        <div className="flex-1 overflow-auto">
          <QuestionArea onAnswerSubmit={onAnswerSubmit} />
        </div>
        <QuestionSidebar
          currentQuestionId={currentQuestionId}
          onQuestionSelect={onQuestionSelect}
          onFlagQuestion={onFlagQuestion}
        />
      </div>
    </div>
  );
};

export default ExamContainer;
