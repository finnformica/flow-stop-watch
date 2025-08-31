import React from "react";

import { useTheme } from "@/contexts/theme-context";
import Counter from "./counter";

const CounterLabel = ({ label }: { label: string }) => {
  return (
    <span className="text-xs text-muted-foreground mt-2 font-medium">
      {label}
    </span>
  );
};

const CounterSeparator = () => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-light text-muted-foreground h-16 flex items-center">
        :
      </span>
      <div className="h-6"></div>
    </div>
  );
};

const DigitalClock = ({ elapsedTime }: { elapsedTime: number }) => {
  const { resolvedTheme } = useTheme();

  // Convert elapsed time to minutes, seconds, and centiseconds for the counter
  const totalMs = Math.floor(elapsedTime);
  const minutes = Math.floor(totalMs / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const centiseconds = Math.floor((totalMs % 1000) / 10);

  // Theme-based colors
  const isDark = resolvedTheme === "dark";
  const textColor = isDark ? "#e9e9e7" : "#37352f";
  const containerBg = isDark ? "#2f2f2f" : "#f9fafb";
  const gradientFrom = containerBg;

  const timeUnits = [
    { value: minutes, label: "MIN" },
    { value: seconds, label: "SEC" },
    { value: centiseconds, label: "MS" },
  ];

  return (
    <div className="flex items-center justify-center w-80 h-80 mx-auto select-none font-mono">
      <div className="flex items-center gap-2">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center">
              <Counter
                value={unit.value}
                fontSize={48}
                padding={8}
                places={[10, 1]}
                gap={2}
                borderRadius={8}
                horizontalPadding={12}
                textColor={textColor}
                fontWeight="300"
                containerStyle={{
                  background: containerBg,
                  borderRadius: "8px",
                }}
                counterStyle={{}}
                digitStyle={{}}
                gradientHeight={12}
                gradientFrom={gradientFrom}
                gradientTo="transparent"
                topGradientStyle={{}}
                bottomGradientStyle={{}}
              />
              <CounterLabel label={unit.label} />
            </div>

            {index < timeUnits.length - 1 && <CounterSeparator />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DigitalClock;
