import React from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type QuestionType = "mcq" | "essay" | "code";

interface Question {
  id: string;
  type: QuestionType;
  content: string;
  options?: string[];
}

interface QuestionAreaProps {
  question?: Question;
  onAnswerSubmit?: (answer: string) => void;
}

const defaultQuestion: Question = {
  id: "1",
  type: "mcq",
  content: "What is the capital of France?",
  options: ["London", "Paris", "Berlin", "Madrid"],
};

const QuestionArea = ({
  question = defaultQuestion,
  onAnswerSubmit = () => {},
}: QuestionAreaProps) => {
  const [answer, setAnswer] = React.useState("");

  const handleSubmit = () => {
    onAnswerSubmit(answer);
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case "mcq":
        return (
          <RadioGroup
            className="mt-4 space-y-4"
            value={answer}
            onValueChange={setAnswer}
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "essay":
        return (
          <Textarea
            className="mt-4 min-h-[200px]"
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        );
      case "code":
        return (
          <Textarea
            className="mt-4 min-h-[200px] font-mono"
            placeholder="Write your code here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-white p-6">
      <Card className="p-6">
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">Question</h2>
          <p className="text-gray-700 mb-6">{question.content}</p>
          {renderQuestionContent()}
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSubmit}>Save Answer</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuestionArea;
