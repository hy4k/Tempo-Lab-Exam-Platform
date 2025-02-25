import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Flag, CheckCircle } from "lucide-react";

interface Question {
  id: number;
  number: number;
  status: "unanswered" | "answered" | "flagged";
  type: "mcq" | "essay" | "code";
}

interface QuestionSidebarProps {
  questions?: Question[];
  currentQuestionId?: number;
  onQuestionSelect?: (id: number) => void;
  onFlagQuestion?: (id: number) => void;
}

const defaultQuestions: Question[] = [
  { id: 1, number: 1, status: "answered", type: "mcq" },
  { id: 2, number: 2, status: "flagged", type: "essay" },
  { id: 3, number: 3, status: "unanswered", type: "mcq" },
  { id: 4, number: 4, status: "unanswered", type: "code" },
  { id: 5, number: 5, status: "answered", type: "mcq" },
];

const QuestionSidebar = ({
  questions = defaultQuestions,
  currentQuestionId = 1,
  onQuestionSelect = () => {},
  onFlagQuestion = () => {},
}: QuestionSidebarProps) => {
  const getStatusColor = (status: Question["status"]) => {
    switch (status) {
      case "answered":
        return "bg-green-100 text-green-800";
      case "flagged":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getQuestionTypeLabel = (type: Question["type"]) => {
    switch (type) {
      case "mcq":
        return "Multiple Choice";
      case "essay":
        return "Essay";
      case "code":
        return "Coding";
      default:
        return type;
    }
  };

  return (
    <div className="w-[300px] h-full bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Questions</h2>
        <div className="mt-2 flex gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            {questions.filter((q) => q.status === "answered").length} Answered
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Flag className="w-4 h-4" />
            {questions.filter((q) => q.status === "flagged").length} Flagged
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {questions.map((question) => (
            <div
              key={question.id}
              className={`p-3 rounded-lg border ${question.id === currentQuestionId ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Q{question.number}</span>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(question.status)}
                  >
                    {question.status}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFlagQuestion(question.id)}
                >
                  <Flag
                    className={`w-4 h-4 ${question.status === "flagged" ? "fill-yellow-500" : ""}`}
                  />
                </Button>
              </div>
              <div className="mt-2">
                <Badge variant="outline">
                  {getQuestionTypeLabel(question.type)}
                </Badge>
              </div>
              <Button
                variant="ghost"
                className="w-full mt-2"
                onClick={() => onQuestionSelect(question.id)}
              >
                View Question
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default QuestionSidebar;
