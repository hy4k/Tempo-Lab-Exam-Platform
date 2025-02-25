import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Flag, ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  id: string;
  type: "multiple-choice" | "essay";
  content: string;
  options?: string[];
}

interface QuestionDisplayProps {
  question?: Question;
  onAnswer?: (answer: string) => void;
  onFlag?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  isFlagged?: boolean;
}

const defaultQuestion: Question = {
  id: "1",
  type: "multiple-choice",
  content: "What is the capital of France?",
  options: ["London", "Paris", "Berlin", "Madrid"],
};

const QuestionDisplay = ({
  question = defaultQuestion,
  onAnswer = () => {},
  onFlag = () => {},
  onNext = () => {},
  onPrevious = () => {},
  isFlagged = false,
}: QuestionDisplayProps) => {
  return (
    <div className="h-full w-full bg-white p-6">
      <Card className="h-full">
        <div className="flex flex-col h-full p-6">
          {/* Question Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Question {question.id}</h2>
            <Button
              variant={isFlagged ? "destructive" : "outline"}
              onClick={onFlag}
              className="flex items-center gap-2"
            >
              <Flag className="h-4 w-4" />
              {isFlagged ? "Flagged" : "Flag Question"}
            </Button>
          </div>

          {/* Question Content */}
          <div className="flex-grow">
            <div className="prose max-w-none mb-8">
              <p className="text-lg">{question.content}</p>
            </div>

            {/* Answer Section */}
            <div className="space-y-6">
              {question.type === "multiple-choice" && question.options && (
                <RadioGroup onValueChange={onAnswer} className="space-y-3">
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === "essay" && (
                <Textarea
                  placeholder="Type your answer here..."
                  className="min-h-[200px]"
                  onChange={(e) => onAnswer(e.target.value)}
                />
              )}
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <Button
              variant="outline"
              onClick={onPrevious}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button onClick={onNext} className="flex items-center gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuestionDisplay;
