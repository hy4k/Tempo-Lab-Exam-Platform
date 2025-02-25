import React from "react";
import { Wifi, WifiOff, Video, VideoOff, Save } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface StatusBarProps {
  isOnline?: boolean;
  isProctoring?: boolean;
  timeRemaining?: string;
  lastSaved?: string;
}

const StatusBar = ({
  isOnline = true,
  isProctoring = true,
  timeRemaining = "2:45:30",
  lastSaved = "Just now",
}: StatusBarProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-10 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 z-50">
      <div className="flex items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center">
                {isOnline ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isOnline ? "Connected" : "Offline"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center">
                {isProctoring ? (
                  <Video className="h-4 w-4 text-green-500" />
                ) : (
                  <VideoOff className="h-4 w-4 text-red-500" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isProctoring ? "Proctoring Active" : "Proctoring Inactive"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Save className="h-4 w-4" />
          <span>Last saved: {lastSaved}</span>
        </div>
      </div>

      <div className="flex items-center">
        <div className="text-sm font-medium">
          Time Remaining: <span className="text-blue-600">{timeRemaining}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
