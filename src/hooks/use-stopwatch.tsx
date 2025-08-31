import { LapTime } from "@/types";
import { useCallback, useEffect, useState } from "react";

const useStopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [lapTimes, setLapTimes] = useState<LapTime[]>([]);

  const toggleTimer = useCallback(() => {
    if (isRunning) {
      // Pausing - just stop the timer
      setIsRunning(false);
    } else {
      // Starting/Resuming - set start time accounting for any previous elapsed time
      setStartTime(performance.now() - elapsedTime);
      setIsRunning(true);
    }
  }, [isRunning, elapsedTime]);

  const resetTimer = useCallback(() => {
    setElapsedTime(0);
    setIsRunning(false);
    setStartTime(0);
    setLapTimes([]);
  }, []);

  const addLap = useCallback(() => {
    if (isRunning && elapsedTime > 0) {
      const newLap = {
        id: lapTimes.length + 1,
        cumulative: elapsedTime,
        split:
          lapTimes.length === 0
            ? elapsedTime
            : elapsedTime - lapTimes[lapTimes.length - 1].cumulative,
      };
      setLapTimes((prev) => [...prev, newLap]);
    }
  }, [isRunning, elapsedTime, lapTimes]);

  const formatTime = (ms: number | null) => {
    if (ms === null) return "00:00:00";

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  // Update the elapsed time
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(performance.now() - startTime);
      }, 10); // Update every 10ms - balance smooth animation and client-side performance
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, startTime]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        toggleTimer();
      } else if (e.code === "KeyL" && isRunning) {
        e.preventDefault();
        addLap();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [addLap, isRunning, toggleTimer]);

  return {
    elapsedTime,
    isRunning,
    lapTimes,
    toggleTimer,
    resetTimer,
    addLap,
    formatTime,
  };
};

export default useStopwatch;
