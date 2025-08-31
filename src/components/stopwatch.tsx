import { Clock, Timer } from "lucide-react";
import { useState } from "react";

import useStopwatch from "@/hooks/use-stopwatch";
import ThemeToggle from "./theme-toggle";

import AnalogClock from "./analog-clock";
import ControlPanel from "./control-panel";
import DigitalClock from "./digital-clock";
import LapTimes from "./lap-times";

const Stopwatch = () => {
  const {
    elapsedTime,
    isRunning,
    lapTimes,
    toggleTimer,
    resetTimer,
    addLap,
    formatTime,
  } = useStopwatch();

  const [clockMode, setClockMode] = useState("analog");

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">Stopwatch</h1>
            <p className="text-muted-foreground">Track your time with precision</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Main Clock Display Card */}
        <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden relative">
          {/* Clock Mode Toggle - Top Left */}
          <div className="absolute top-4 left-4 z-10 flex gap-1 bg-muted rounded-lg p-1 border">
            <button
              onClick={() => setClockMode("analog")}
              className={`p-2 rounded-md transition-all duration-200 ${
                clockMode === "analog"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
              }`}
              title="Analog clock"
            >
              <Clock size={16} />
            </button>
            <button
              onClick={() => setClockMode("digital")}
              className={`p-2 rounded-md transition-all duration-200 ${
                clockMode === "digital"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
              }`}
              title="Digital clock"
            >
              <Timer size={16} />
            </button>
          </div>
          
          <div className="p-8">
            {clockMode === "analog" ? (
              <AnalogClock elapsedTime={elapsedTime} />
            ) : (
              <DigitalClock elapsedTime={elapsedTime} />
            )}
          </div>
        </div>

        {/* Control Panel or Lap Times Card */}
        <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <div className="p-8">
            {!isRunning && lapTimes.length === 0 ? (
              <ControlPanel
                onStart={toggleTimer}
                onReset={resetTimer}
                disabled={elapsedTime === 0}
              />
            ) : (
              <LapTimes
                isRunning={isRunning}
                lapTimes={lapTimes}
                onToggleTimer={toggleTimer}
                onAddLap={addLap}
                onReset={resetTimer}
                formatTime={formatTime}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
