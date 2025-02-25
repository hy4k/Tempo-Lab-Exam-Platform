import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Webcam } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SystemRequirement {
  name: string;
  status: "success" | "error" | "pending";
  message: string;
}

interface SystemCheckProps {
  requirements?: SystemRequirement[];
  onRetry?: () => void;
  onContinue?: () => void;
}

const defaultRequirements: SystemRequirement[] = [
  {
    name: "Browser Compatibility",
    status: "success",
    message: "Your browser is compatible with the exam system",
  },
  {
    name: "Webcam Access",
    status: "error",
    message: "Unable to access webcam. Please enable camera permissions",
  },
  {
    name: "Internet Connection",
    status: "success",
    message: "Your internet connection is stable",
  },
];

const SystemCheck = ({
  requirements = defaultRequirements,
  onRetry = () => {},
  onContinue = () => {},
}: SystemCheckProps) => {
  const allPassed = requirements.every((req) => req.status === "success");

  const getStatusIcon = (status: SystemRequirement["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Webcam className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[400px] w-[600px] bg-white p-6 rounded-lg shadow-lg">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">System Check</h2>
            <p className="text-gray-600">
              Please ensure your system meets all requirements before proceeding
            </p>
          </div>

          <div className="space-y-4">
            {requirements.map((requirement, index) => (
              <Alert
                key={index}
                variant={
                  requirement.status === "error" ? "destructive" : "default"
                }
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(requirement.status)}
                  <div>
                    <AlertTitle>{requirement.name}</AlertTitle>
                    <AlertDescription>{requirement.message}</AlertDescription>
                  </div>
                </div>
              </Alert>
            ))}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={onRetry}>
              Retry Check
            </Button>
            <Button disabled={!allPassed} onClick={onContinue}>
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemCheck;
