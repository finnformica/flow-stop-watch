import { ClockMode } from "@/types";
import { Clock } from "lucide-react";
import { motion } from "motion/react";

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
      className="absolute top-4 left-4 z-10 flex gap-0.5 bg-muted rounded-lg p-0.5 border"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={transition(3)}
    >
      {/* Sliding background */}
      <motion.div
        layout
        className="absolute bg-card shadow-sm rounded-md"
        style={{
          width: "56px",
          height: "calc(100% - 4px)",
          top: "2px",
          left: clockMode === "analog" ? "2px" : "calc(50% + 1px)",
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
        className={`relative px-2.5 py-1.5 rounded-md transition-colors duration-200 flex items-center justify-center w-14 z-10 ${
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
        className={`relative py-1.5 rounded-md transition-colors duration-200 flex items-center justify-center w-14 z-10 ${
          clockMode === "digital"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title="Digital clock"
      >
        <span className="text-xs font-mono font-medium">MM:SS</span>
      </button>
    </motion.div>
  );
};

export default ClockToggle;
