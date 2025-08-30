import { Clock, Timer } from "lucide-react";
import { useState } from "react";

import useStopwatch from "@/hooks/use-stopwatch";

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Stopwatch</h1>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setClockMode("analog")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                clockMode === "analog"
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Clock size={20} />
              Analogue
            </button>
            <button
              onClick={() => setClockMode("digital")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                clockMode === "digital"
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Timer size={20} />
              Digital
            </button>
          </div>
        </div>

        {/* Main Clock Display */}
        <div className="mb-12">
          {clockMode === "analog" ? (
            <AnalogClock elapsedTime={elapsedTime} />
          ) : (
            <DigitalClock elapsedTime={elapsedTime} />
          )}
        </div>

        {/* Control Panel or Lap Times */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 transition-all duration-300">
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

        {/* Keyboard Shortcuts Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <span className="inline-flex items-center gap-4">
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
              Space
            </kbd>
            <span>Start/Pause</span>
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
              L
            </kbd>
            <span>Lap (while running)</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
