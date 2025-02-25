import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Flag, CheckCircle } from "lucide-react";

interface Question {
  id: number;
  number: number;
  status: "unanswered" | "answered" | "flagged";
}

interface NavigationSidebarProps {
  questions?: Question[];
  currentQuestion?: number;
  onQuestionSelect?: (questionId: number) => void;
  onFlagQuestion?: (questionId: number) => void;
}

const NavigationSidebar = ({
  questions = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    number: i + 1,
    status: i % 3 === 0 ? "answered" : i % 3 === 1 ? "flagged" : "unanswered",
  })),
  currentQuestion = 1,
  onQuestionSelect = () => {},
  onFlagQuestion = () => {},
}: NavigationSidebarProps) => {
  return (
    <div className="w-[400px] h-full bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Question Navigator</h2>
        <p className="text-sm text-gray-500 mt-1">
          {questions.filter((q) => q.status === "answered").length} of{" "}
          {questions.length} answered
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-4 gap-2">
          {questions.map((question) => (
            <Button
              key={question.id}
              variant={currentQuestion === question.id ? "default" : "outline"}
              className={`relative h-12 w-full ${
                question.status === "answered"
                  ? "border-green-500"
                  : question.status === "flagged"
                    ? "border-yellow-500"
                    : "border-gray-200"
              }`}
              onClick={() => onQuestionSelect(question.id)}
            >
              <span>{question.number}</span>
              {question.status === "flagged" && (
                <Flag className="w-3 h-3 absolute top-1 right-1 text-yellow-500" />
              )}
              {question.status === "answered" && (
                <CheckCircle className="w-3 h-3 absolute top-1 right-1 text-green-500" />
              )}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-green-500" />
            <span className="text-sm">Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-yellow-500" />
            <span className="text-sm">Flagged</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-gray-200" />
            <span className="text-sm">Unanswered</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => onFlagQuestion(currentQuestion)}
        >
          <Flag className="w-4 h-4 mr-2" />
          Flag Current Question
        </Button>
      </div>
    </div>
  );
};

export default NavigationSidebar;
