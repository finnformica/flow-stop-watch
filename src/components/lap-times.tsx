import { LapTime } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { memo } from "react";

type LapTimeItemProps = {
  lap: LapTime;
  fastestLap: number | null;
  slowestLap: number | null;
  maxSplit: number;
  formatTime: (time: number | null) => string;
};

const LapTimeItem = ({
  lap,
  fastestLap,
  slowestLap,
  maxSplit,
  formatTime,
}: LapTimeItemProps) => {
  const isFastest = lap.split === fastestLap;
  const isSlowest = lap.split === slowestLap;
  const barWidth = (lap.split / maxSplit) * 100;

  const getLapColors = () => {
    if (isFastest) {
      return {
        barColor: "bg-success",
        textColor: "text-success",
      };
    }

    if (isSlowest) {
      return {
        barColor: "bg-destructive",
        textColor: "text-destructive",
      };
    }
    return {
      barColor: "bg-accent",
      textColor: "text-foreground",
    };
  };

  const { barColor, textColor } = getLapColors();

  return (
    <motion.div
      className="flex items-center gap-4 py-2 px-3 mb-1"
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      layout
    >
      <div className="w-12 text-sm font-medium text-muted-foreground">
        Lap {lap.id}
      </div>
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${barColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          />
        </div>
        <div className="w-20 text-right">
          <div className={`text-sm ${textColor}`}>{formatTime(lap.split)}</div>
        </div>
        <div className="w-24 text-right">
          <div className="text-sm text-muted-foreground">
            {formatTime(lap.cumulative)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

type LapTimesProps = {
  lapTimes: LapTime[];
  formatTime: (time: number | null) => string;
};

const LapTimes = ({ lapTimes, formatTime }: LapTimesProps) => {
  const fastestLap =
    lapTimes.length > 0 ? Math.min(...lapTimes.map((lap) => lap.split)) : null;
  const slowestLap =
    lapTimes.length > 0 ? Math.max(...lapTimes.map((lap) => lap.split)) : null;
  const maxSplit = Math.max(...lapTimes.map((l) => l.split));

  const lapStats = [
    {
      label: "Total Laps",
      value: lapTimes.length.toString(),
      textColor: "text-foreground",
    },
    {
      label: "Fastest Lap",
      value: formatTime(fastestLap),
      textColor: "text-success",
    },
    {
      label: "Slowest Lap",
      value: formatTime(slowestLap),
      textColor: "text-destructive",
    },
  ];

  return (
    <AnimatePresence>
      {lapTimes.length > 0 && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          layout
        >
          <motion.h3
            className="text-xl font-medium text-foreground text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            layout
          >
            Lap Times
          </motion.h3>

          {/* Lap Statistics */}
          <motion.div
            className="grid grid-cols-3 gap-4 bg-muted rounded-xl p-4 border"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            layout
          >
            {lapStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                layout
              >
                <div className="text-sm text-muted-foreground mb-1">
                  {stat.label}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    className={`text-lg font-medium ${stat.textColor}`}
                    key={stat.value}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    layout
                  >
                    {stat.value}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Lap Time Visualisation */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <motion.h4
              className="text-sm font-medium text-foreground mb-3"
              layout
            >
              Lap Performance
            </motion.h4>
            <motion.div className="space-y-1" layout>
              <AnimatePresence>
                {lapTimes.map((lap) => (
                  <motion.div
                    key={lap.id}
                    layout
                    initial={{ opacity: 0, y: -20, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      layout: { duration: 0.3, ease: "easeInOut" },
                      scale: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        duration: 0.4,
                      },
                    }}
                  >
                    <LapTimeItem
                      lap={lap}
                      fastestLap={fastestLap}
                      slowestLap={slowestLap}
                      maxSplit={maxSplit}
                      formatTime={formatTime}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(LapTimes);
