import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, Clock } from "lucide-react";

interface ExamHeaderProps {
  examTitle?: string;
  timeRemaining?: number; // in seconds
  isConnected?: boolean;
}

const ExamHeader = ({
  examTitle = "Sample Examination",
  timeRemaining = 3600, // 1 hour default
  isConnected = true,
}: ExamHeaderProps) => {
  // Format time remaining into HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-16 bg-white border-b border-gray-200">
      <Card className="h-full shadow-none rounded-none">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">{examTitle}</h1>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-lg font-medium">
                {formatTime(timeRemaining)}
              </span>
            </div>

            <Badge
              variant={isConnected ? "default" : "destructive"}
              className="flex items-center space-x-2"
            >
              {isConnected ? (
                <>
                  <Wifi className="h-4 w-4" />
                  <span>Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4" />
                  <span>Offline</span>
                </>
              )}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExamHeader;
