import Counter from "./counter";

const DigitalClock = ({ elapsedTime }: { elapsedTime: number }) => {
  // Convert elapsed time to minutes, seconds, and centiseconds for the counter
  const totalMs = Math.floor(elapsedTime);
  const minutes = Math.floor(totalMs / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const centiseconds = Math.floor((totalMs % 1000) / 10);

  return (
    <div className="flex items-center justify-center w-80 h-80 mx-auto">
      <div className="bg-white rounded-2xl px-8 py-6 shadow-lg border border-gray-100 flex items-center gap-6">
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
            textColor="#1f2937"
            fontWeight="300"
            containerStyle={{ background: "#f9fafb", borderRadius: "8px" }}
            counterStyle={{}}
            digitStyle={{}}
            gradientHeight={12}
            gradientFrom="#f9fafb"
            gradientTo="transparent"
            topGradientStyle={{}}
            bottomGradientStyle={{}}
          />
          <span className="text-xs text-gray-500 mt-2 font-medium">MIN</span>
        </div>

        <span className="text-3xl font-light text-gray-400">:</span>

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
            textColor="#1f2937"
            fontWeight="300"
            containerStyle={{ background: "#f9fafb", borderRadius: "8px" }}
            counterStyle={{}}
            digitStyle={{}}
            gradientHeight={12}
            gradientFrom="#f9fafb"
            gradientTo="transparent"
            topGradientStyle={{}}
            bottomGradientStyle={{}}
          />
          <span className="text-xs text-gray-500 mt-2 font-medium">SEC</span>
        </div>

        <span className="text-3xl font-light text-gray-400">.</span>

        {/* Centiseconds */}
        <div className="flex flex-col items-center">
          <Counter
            value={centiseconds}
            fontSize={32}
            padding={6}
            places={[10, 1]}
            gap={2}
            borderRadius={6}
            horizontalPadding={8}
            textColor="#6b7280"
            fontWeight="300"
            containerStyle={{ background: "#f9fafb", borderRadius: "6px" }}
            counterStyle={{}}
            digitStyle={{}}
            gradientHeight={8}
            gradientFrom="#f9fafb"
            gradientTo="transparent"
            topGradientStyle={{}}
            bottomGradientStyle={{}}
          />
          <span className="text-xs text-gray-500 mt-2 font-medium">CS</span>
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
