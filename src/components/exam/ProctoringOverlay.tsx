import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Webcam, Wifi, WifiOff } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProctoringOverlayProps {
  isOnline?: boolean;
  webcamActive?: boolean;
  warnings?: string[];
  position?: "top-right" | "bottom-right";
}

const ProctoringOverlay = ({
  isOnline = true,
  webcamActive = true,
  warnings = ["Looking away from screen", "Multiple faces detected"],
  position = "top-right",
}: ProctoringOverlayProps) => {
  const positionClasses = {
    "top-right": "top-4 right-4",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <Card className="bg-white/90 backdrop-blur-sm p-4 w-[320px] shadow-lg">
        <div className="space-y-4">
          {/* Status Indicators */}
          <div className="flex items-center justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-2">
                    {isOnline ? (
                      <Wifi className="h-4 w-4 text-green-500" />
                    ) : (
                      <WifiOff className="h-4 w-4 text-red-500" />
                    )}
                    <Badge
                      variant={isOnline ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {isOnline ? "Connected" : "Offline"}
                    </Badge>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isOnline ? "System is connected" : "Check your connection"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-2">
                    <Webcam
                      className={`h-4 w-4 ${
                        webcamActive ? "text-green-500" : "text-red-500"
                      }`}
                    />
                    <Badge
                      variant={webcamActive ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {webcamActive ? "Webcam Active" : "Webcam Error"}
                    </Badge>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {webcamActive
                      ? "Webcam is functioning normally"
                      : "Webcam access required"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Warnings Section */}
          {warnings.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-500">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Active Warnings</span>
              </div>
              <div className="space-y-1">
                {warnings.map((warning, index) => (
                  <div
                    key={index}
                    className="text-xs text-gray-600 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-500" />
                    {warning}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProctoringOverlay;
