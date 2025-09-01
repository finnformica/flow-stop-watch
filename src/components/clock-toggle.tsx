import { ClockMode } from "@/types";
import { Clock } from "lucide-react";
import { motion } from "motion/react";
import { memo } from "react";

const ClockToggle = ({
  clockMode,
  setClockMode,
  transition,
}: {
  clockMode: ClockMode;
  setClockMode: (mode: ClockMode) => void;
  transition: (delay: number) => object;
}) => {
  return (
    <motion.div
      className="absolute top-2 left-2 lg:top-4 lg:left-4 z-10 flex gap-0.5 bg-muted rounded-lg p-0.5 border w-20 sm:w-32"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={transition(3)}
    >
      {/* Sliding background */}
      <motion.div
        layout
        className="absolute top-0.5 bg-card shadow-sm rounded-md w-1/2"
        style={{
          height: "calc(100% - 4px)",
          left: clockMode === "analog" ? "2px" : "calc(50% - 2px)",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />

      {/* Analog button */}
      <button
        onClick={() => setClockMode("analog")}
        className={`relative px-2.5 py-1.5 rounded-md transition-colors duration-200 flex items-center justify-center w-1/2 z-10 ${
          clockMode === "analog"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title="Analog clock"
      >
        <Clock size={14} />
      </button>

      {/* Digital button */}
      <button
        onClick={() => setClockMode("digital")}
        className={`relative py-1.5 rounded-md transition-colors duration-200 flex items-center justify-center w-1/2 z-10 text-xs font-mono font-medium ${
          clockMode === "digital"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title="Digital clock"
      >
        <span className="hidden sm:block">MM:SS</span>
        <span className="block sm:hidden">00</span>
      </button>
    </motion.div>
  );
};

export default memo(ClockToggle);
