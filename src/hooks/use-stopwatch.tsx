import { LapTime } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";

const useStopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [lapTimes, setLapTimes] = useState<LapTime[]>([]);

  // Use refs to access current values without causing re-renders
  const isRunningRef = useRef(isRunning);
  const elapsedTimeRef = useRef(elapsedTime);
  const lapTimesRef = useRef(lapTimes);

  // Update refs when state changes
  isRunningRef.current = isRunning;
  elapsedTimeRef.current = elapsedTime;
  lapTimesRef.current = lapTimes;

  const toggleTimer = useCallback(() => {
    if (isRunningRef.current) {
      // Pausing - just stop the timer
      setIsRunning(false);
    } else {
      // Starting/Resuming - set start time accounting for any previous elapsed time
      setStartTime(performance.now() - elapsedTimeRef.current);
      setIsRunning(true);
    }
  }, []);

  const resetTimer = useCallback(() => {
    setElapsedTime(0);
    setIsRunning(false);
    setStartTime(0);
    setLapTimes([]);
  }, []);

  const addLap = useCallback(() => {
    if (isRunningRef.current && elapsedTimeRef.current > 0) {
      const split =
        lapTimesRef.current.length === 0
          ? elapsedTimeRef.current
          : elapsedTimeRef.current - lapTimesRef.current[0].cumulative;

      const newLap = {
        id: lapTimesRef.current.length + 1,
        cumulative: elapsedTimeRef.current,
        split,
      };

      setLapTimes([newLap, ...lapTimesRef.current]);
    }
  }, []);

  const formatTime = useCallback((ms: number | null) => {
    if (ms === null) return "00:00:00";

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  }, []);

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
      } else if (e.code === "KeyR" && !isRunning && elapsedTime > 0) {
        e.preventDefault();
        resetTimer();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [addLap, elapsedTime, isRunning, resetTimer, toggleTimer]);

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
