import { useTheme } from "@/contexts/theme-context";
import Counter from "./counter";

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

  return (
    <div className="flex items-center justify-center w-80 h-80 mx-auto select-none font-mono">
      <div className="flex items-center gap-2">
        {/* Minutes */}
        <div className="flex flex-col items-center">
          <Counter
            value={minutes}
            fontSize={48}
            padding={8}
            places={[10, 1]}
            gap={2}
            borderRadius={8}
            horizontalPadding={12}
            textColor={textColor}
            fontWeight="300"
            containerStyle={{ background: containerBg, borderRadius: "8px" }}
            counterStyle={{}}
            digitStyle={{}}
            gradientHeight={12}
            gradientFrom={gradientFrom}
            gradientTo="transparent"
            topGradientStyle={{}}
            bottomGradientStyle={{}}
          />
          <span className="text-xs text-muted-foreground mt-2 font-medium">
            MIN
          </span>
        </div>

        {/* Colon - positioned to center between counter boxes only */}
        <div className="flex flex-col items-center">
          <span className="text-3xl font-light text-muted-foreground h-16 flex items-center">
            :
          </span>
          <div className="h-6"></div> {/* Spacer to match label height */}
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <Counter
            value={seconds}
            fontSize={48}
            padding={8}
            places={[10, 1]}
            gap={2}
            borderRadius={8}
            horizontalPadding={12}
            textColor={textColor}
            fontWeight="300"
            containerStyle={{ background: containerBg, borderRadius: "8px" }}
            counterStyle={{}}
            digitStyle={{}}
            gradientHeight={12}
            gradientFrom={gradientFrom}
            gradientTo="transparent"
            topGradientStyle={{}}
            bottomGradientStyle={{}}
          />
          <span className="text-xs text-muted-foreground mt-2 font-medium">
            SEC
          </span>
        </div>

        {/* Colon - positioned to center between counter boxes only */}
        <div className="flex flex-col items-center">
          <span className="text-3xl font-light text-muted-foreground h-16 flex items-center">
            :
          </span>
          <div className="h-6"></div> {/* Spacer to match label height */}
        </div>

        {/* Milliseconds */}
        <div className="flex flex-col items-center">
          <Counter
            value={centiseconds}
            fontSize={48}
            padding={8}
            places={[10, 1]}
            gap={2}
            borderRadius={8}
            horizontalPadding={12}
            textColor={textColor}
            fontWeight="300"
            containerStyle={{ background: containerBg, borderRadius: "8px" }}
            counterStyle={{}}
            digitStyle={{}}
            gradientHeight={12}
            gradientFrom={gradientFrom}
            gradientTo="transparent"
            topGradientStyle={{}}
            bottomGradientStyle={{}}
          />
          <span className="text-xs text-muted-foreground mt-2 font-medium">
            MS
          </span>
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
