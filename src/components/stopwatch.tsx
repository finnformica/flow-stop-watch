import { AnimatePresence, Easing, motion } from "motion/react";
import { useEffect, useState } from "react";

import useStopwatch from "@/hooks/use-stopwatch";

import { ClockMode } from "@/types";
import AnalogClock from "./analog-clock";
import ClockToggle from "./clock-toggle";
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

  const [clockMode, setClockMode] = useState<ClockMode>("analog");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // After initial animations complete, mark as no longer initial load
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2000); // Wait for initial animations to complete
    return () => clearTimeout(timer);
  }, []);

  const initial = { opacity: 0, y: 20 };
  const animate = { opacity: 1, y: 0 };
  const exit = { opacity: 0, y: -20 };
  const transition = (i: number) => ({
    duration: 0.5,
    delay: (1 + i) * 0.25,
    ease: "easeOut" as Easing,
  });

  return (
    <div className="min-h-screen bg-background transition-colors duration-200 min-w-lg max-w-6xl mx-auto p-8 space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={initial}
        animate={animate}
        transition={transition(0)}
      >
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Stopwatch</h1>
          <p className="text-muted-foreground">
            Because &ldquo;a minute&rdquo; is rarely ever a minute
          </p>
        </div>

        <ThemeToggle />
      </motion.div>

      {/* Main Clock Display Card */}
      <motion.div
        className="border border-border rounded-xl shadow-sm dark:shadow-none transition-all duration-200 overflow-hidden relative"
        initial={initial}
        animate={animate}
        transition={transition(1)}
      >
        <ClockToggle
          clockMode={clockMode}
          setClockMode={setClockMode}
          transition={transition}
        />

        <div className="p-8">
          <AnimatePresence mode="wait">
            {clockMode === "analog" ? (
              <motion.div
                key="analog"
                initial={initial}
                animate={animate}
                exit={exit}
                transition={
                  isInitialLoad
                    ? transition(3)
                    : { duration: 0.3, ease: "easeOut" }
                }
              >
                <AnalogClock
                  elapsedTime={elapsedTime}
                  isInitialLoad={isInitialLoad}
                />
              </motion.div>
            ) : (
              <motion.div
                key="digital"
                initial={initial}
                animate={animate}
                exit={exit}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <DigitalClock elapsedTime={elapsedTime} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        className="space-y-6"
        initial={initial}
        animate={animate}
        transition={transition(2)}
      >
        <ControlPanel
          isRunning={isRunning}
          disabled={elapsedTime === 0}
          toggleTimer={toggleTimer}
          addLap={addLap}
          resetTimer={resetTimer}
        />
      </motion.div>

      <LapTimes lapTimes={lapTimes} formatTime={formatTime} />
    </div>
  );
};

export default Stopwatch;
