import React, { useState, useEffect } from "react";
import ExamHeader from "./exam/ExamHeader";
import ExamContent from "./exam/ExamContent";
import ProctoringOverlay from "./exam/ProctoringOverlay";
import { getExams, submitAnswer, flagQuestion } from "@/lib/supabase";

interface ExamPageProps {
  examTitle?: string;
  timeLimit?: number; // in seconds
  questions?: Array<{
    id: string;
    type: "multiple-choice" | "essay";
    content: string;
    options?: string[];
    status: "unanswered" | "answered" | "flagged";
  }>;
}

const defaultQuestions = [
  {
    id: "1",
    type: "multiple-choice" as const,
    content: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    status: "unanswered" as const,
  },
  {
    id: "2",
    type: "essay" as const,
    content: "Explain the process of photosynthesis.",
    status: "unanswered" as const,
  },
  {
    id: "3",
    type: "multiple-choice" as const,
    content: "Which planet is closest to the sun?",
    options: ["Venus", "Mercury", "Mars", "Earth"],
    status: "unanswered" as const,
  },
];

const ExamPage = ({
  examTitle = "Sample Examination",
  timeLimit = 3600,
  questions = defaultQuestions,
}: ExamPageProps) => {
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState<any>(null);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [isConnected, setIsConnected] = useState(true);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [webcamActive, setWebcamActive] = useState(true);
  const [examQuestions, setExamQuestions] = useState(questions);

  useEffect(() => {
    const loadExam = async () => {
      try {
        const examData = await getExams();
        if (examData && examData.length > 0) {
          const currentExam = examData[0];
          setExam(currentExam);
          setTimeRemaining(currentExam.time_limit);

          // Transform questions to match the expected format
          const formattedQuestions = currentExam.questions.map((q) => ({
            id: q.id,
            type: q.type as "multiple-choice" | "essay",
            content: q.content,
            options: q.type === "multiple-choice" ? q.options : undefined,
            status: q.is_flagged ? "flagged" : "unanswered",
          }));

          setExamQuestions(formattedQuestions);
        }
      } catch (error) {
        console.error("Error loading exam:", error);
      } finally {
        setLoading(false);
      }
    };

    loadExam();
  }, []);

  // Simulated timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Connection status check
  useEffect(() => {
    const connectionCheck = setInterval(() => {
      setIsConnected(navigator.onLine);
    }, 5000);

    return () => clearInterval(connectionCheck);
  }, []);

  // Simulated webcam monitoring
  useEffect(() => {
    const simulateWarnings = () => {
      const possibleWarnings = [
        "Looking away from screen",
        "Multiple faces detected",
        "Suspicious movement detected",
        "Background activity detected",
      ];

      const randomWarning =
        possibleWarnings[Math.floor(Math.random() * possibleWarnings.length)];
      setWarnings((prev) =>
        prev.includes(randomWarning)
          ? prev.filter((w) => w !== randomWarning)
          : [...prev, randomWarning],
      );
    };

    const warningSimulator = setInterval(simulateWarnings, 10000);

    return () => clearInterval(warningSimulator);
  }, []);

  const handleQuestionChange = (questionId: string) => {
    console.log("Question changed to:", questionId);
  };

  const handleAnswerSubmit = async (questionId: string, answer: string) => {
    try {
      await submitAnswer(questionId, answer);
      console.log("Answer submitted successfully");
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleQuestionFlag = async (questionId: string) => {
    try {
      await flagQuestion(questionId, true);
      console.log("Question flagged successfully");
    } catch (error) {
      console.error("Error flagging question:", error);
    }
  };

  if (loading) {
    return <div>Loading exam...</div>;
  }

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col">
      <ExamHeader
        examTitle={exam?.title || examTitle}
        timeRemaining={timeRemaining}
        isConnected={isConnected}
      />
      <div className="flex-1 overflow-hidden">
        <ExamContent
          questions={examQuestions}
          onQuestionChange={handleQuestionChange}
          onAnswerSubmit={handleAnswerSubmit}
          onQuestionFlag={handleQuestionFlag}
        />
      </div>
      <ProctoringOverlay
        isOnline={isConnected}
        webcamActive={webcamActive}
        warnings={warnings}
        position="top-right"
      />
    </div>
  );
};

export default ExamPage;
