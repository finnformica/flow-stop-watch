import { Clock } from "lucide-react";
import { useState } from "react";

import useStopwatch from "@/hooks/use-stopwatch";

import AnalogClock from "./analog-clock";
import ControlPanel from "./control-panel";
import DigitalClock from "./digital-clock";
import LapTimes from "./lap-times";
import ThemeToggle from "./theme-toggle";

const Stopwatch = () => {
  const {
    elapsedTime,
    isRunning,
    lapTimes,
    formatTime,
    toggleTimer,
    addLap,
    resetTimer,
  } = useStopwatch();

  const [clockMode, setClockMode] = useState("analog");

  return (
    <div className="min-h-screen bg-background transition-colors duration-200 min-w-lg max-w-6xl mx-auto p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Stopwatch</h1>
          <p className="text-muted-foreground">
            Because &ldquo;a minute&rdquo; is rarely ever a minute
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* Main Clock Display Card */}
      <div className="border border-border rounded-xl shadow-sm dark:shadow-none transition-all duration-200 overflow-hidden relative">
        {/* Clock Mode Toggle - Top Left */}
        <div className="absolute top-4 left-4 z-10 flex gap-0.5 bg-muted rounded-lg p-0.5 border">
          <button
            onClick={() => setClockMode("analog")}
            className={`px-2.5 py-1.5 rounded-md transition-all duration-200 flex items-center justify-center w-14 ${
              clockMode === "analog"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
            }`}
            title="Analog clock"
          >
            <Clock size={14} />
          </button>
          <button
            onClick={() => setClockMode("digital")}
            className={`py-1.5 rounded-md transition-all duration-200 flex items-center justify-center w-14 ${
              clockMode === "digital"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
            }`}
            title="Digital clock"
          >
            <span className="text-xs font-mono font-medium">MM:SS</span>
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

      <ControlPanel
        isRunning={isRunning}
        disabled={elapsedTime === 0}
        toggleTimer={toggleTimer}
        addLap={addLap}
        resetTimer={resetTimer}
      />

      <LapTimes lapTimes={lapTimes} formatTime={formatTime} />
    </div>
  );
};

export default Stopwatch;
