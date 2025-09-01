import { motion } from "motion/react";
import { memo } from "react";

const MobileSecondHand = ({ angle }: { angle: number }) => (
  <div
    className="absolute top-1/2 left-1/2 bg-destructive rounded-full z-20"
    style={{
      width: "1.5px",
      height: "90px",
      marginLeft: "-0.75px",
      marginTop: "-75px",
      transformOrigin: "50% calc(100% - 15px)",
      transform: `rotate(${angle}deg)`,
    }}
  />
);

const DesktopSecondHand = ({ angle }: { angle: number }) => (
  <div
    className="absolute top-1/2 left-1/2 bg-destructive rounded-full z-20"
    style={{
      width: "2px",
      height: "140px",
      marginLeft: "-1px",
      marginTop: "-120px",
      transformOrigin: "50% calc(100% - 20px)",
      transform: `rotate(${angle}deg)`,
    }}
  />
);

const MobileAnalogClock = ({
  elapsedTime,
  isInitialLoad,
}: {
  elapsedTime: number;
  isInitialLoad: boolean;
}) => {
  const totalSeconds = elapsedTime / 1000;
  const seconds = (totalSeconds % 60) / 60;
  const angle = seconds * 360;

  const initialDelay = (i: number) => (isInitialLoad ? 1.5 + i * 0.1 : 0);

  const numberVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: initialDelay(i),
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <div className="relative w-56 h-56 mx-auto select-none">
      <div className="absolute inset-0 rounded-full border-2 border-border bg-card shadow-lg dark:shadow-none">
        {/* Minute markers */}
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className={`absolute bg-muted-foreground rounded-full ${
              i % 5 === 0 ? "h-3 w-0.5" : "h-2 w-0.25"
            } ${i % 10 === 0 ? "bg-foreground" : ""}`}
            style={{
              top: "4px",
              left: "50%",
              transformOrigin: "50% 106px",
              transform: `translateX(-50%) rotate(${i * 6}deg)`,
            }}
          />
        ))}

        {/* Numbers */}
        {Array.from({ length: 6 }, (_, i) => {
          const angle = i * 60 - 30;
          const radius = 80;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <motion.div
              key={i}
              className="absolute text-xs font-medium font-mono text-foreground flex items-center justify-center w-5 h-5"
              style={{
                left: `calc(50% + ${x}px - 10px)`,
                top: `calc(50% + ${y}px - 10px)`,
              }}
              variants={numberVariants}
              initial={isInitialLoad ? "hidden" : "visible"}
              animate="visible"
              custom={i}
            >
              {(i + 1) * 10}
            </motion.div>
          );
        })}

        {/* Center dot */}
        <div
          className="absolute top-1/2 left-1/2 w-2 h-2 border border-destructive bg-card rounded-full transform -translate-x-1/2 -translate-y-1/2 z-40"
          style={{ borderColor: "var(--destructive)" }}
        />

        {/* Digital time display */}
        <motion.div
          className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={
            isInitialLoad
              ? { opacity: 0, scale: 0.8 }
              : { opacity: 1, scale: 1 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: isInitialLoad ? 1.6 : 0,
            ease: "easeOut",
          }}
        >
          <div className="bg-card/80 backdrop-blur-sm px-2 py-1">
            <div className="text-xs font-mono font-medium text-foreground tracking-wider">
              {Math.floor(elapsedTime / 60000)
                .toString()
                .padStart(2, "0")}
              :
              {Math.floor((elapsedTime % 60000) / 1000)
                .toString()
                .padStart(2, "0")}
              :
              {Math.floor((elapsedTime % 1000) / 10)
                .toString()
                .padStart(2, "0")}
            </div>
          </div>
        </motion.div>

        {/* Second hand */}
        <MobileSecondHand angle={angle} />
      </div>
    </div>
  );
};

// Desktop analog clock
const DesktopAnalogClock = ({
  elapsedTime,
  isInitialLoad,
}: {
  elapsedTime: number;
  isInitialLoad: boolean;
}) => {
  const totalSeconds = elapsedTime / 1000;
  const seconds = (totalSeconds % 60) / 60;
  const angle = seconds * 360;

  const initialDelay = (i: number) => (isInitialLoad ? 1.5 + i * 0.1 : 0);

  const numberVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: initialDelay(i),
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <div className="relative w-80 h-80 mx-auto select-none">
      <div className="absolute inset-0 rounded-full border-2 border-border bg-card shadow-lg dark:shadow-none">
        {/* Minute markers*/}
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className={`absolute bg-muted-foreground rounded-full ${
              i % 5 === 0 ? "h-6 w-0.5" : "h-3 w-0.25"
            } ${i % 10 === 0 ? "bg-foreground" : ""}`}
            style={{
              top: "6px",
              left: "50%",
              transformOrigin: "50% 152px",
              transform: `translateX(-50%) rotate(${i * 6}deg)`,
            }}
          />
        ))}

        {/* Numbers */}
        {Array.from({ length: 6 }, (_, i) => {
          const angle = i * 60 - 30;
          const radius = 112;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <motion.div
              key={i}
              className="absolute text-base font-medium font-mono text-foreground flex items-center justify-center w-10 h-10"
              style={{
                left: `calc(50% + ${x}px - 20px)`,
                top: `calc(50% + ${y}px - 20px)`,
              }}
              variants={numberVariants}
              initial={isInitialLoad ? "hidden" : "visible"}
              animate="visible"
              custom={i}
            >
              {(i + 1) * 10}
            </motion.div>
          );
        })}

        {/* Center dot */}
        <div
          className="absolute top-1/2 left-1/2 w-2.5 h-2.5 border-2 bg-card rounded-full transform -translate-x-1/2 -translate-y-1/2 z-40"
          style={{ borderColor: "var(--destructive)" }}
        />

        {/* Digital time display */}
        <motion.div
          className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={
            isInitialLoad
              ? { opacity: 0, scale: 0.8 }
              : { opacity: 1, scale: 1 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: isInitialLoad ? 1.6 : 0,
            ease: "easeOut",
          }}
        >
          <div className="bg-card/80 backdrop-blur-sm px-3 py-1.5">
            <div className="text-sm font-mono font-medium text-foreground tracking-wider">
              {Math.floor(elapsedTime / 60000)
                .toString()
                .padStart(2, "0")}
              :
              {Math.floor((elapsedTime % 60000) / 1000)
                .toString()
                .padStart(2, "0")}
              :
              {Math.floor((elapsedTime % 1000) / 10)
                .toString()
                .padStart(2, "0")}
            </div>
          </div>
        </motion.div>

        {/* Second hand */}
        <DesktopSecondHand angle={angle} />
      </div>
    </div>
  );
};

// Main component
const AnalogClock = ({
  elapsedTime,
  isInitialLoad,
}: {
  elapsedTime: number;
  isInitialLoad: boolean;
}) => {
  return (
    <>
      <div className="sm:hidden">
        <MobileAnalogClock
          elapsedTime={elapsedTime}
          isInitialLoad={isInitialLoad}
        />
      </div>

      <div className="hidden sm:block">
        <DesktopAnalogClock
          elapsedTime={elapsedTime}
          isInitialLoad={isInitialLoad}
        />
      </div>
    </>
  );
};

export default memo(AnalogClock);
