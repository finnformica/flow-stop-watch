const AnalogClock = ({ elapsedTime }: { elapsedTime: number }) => {
  // Analog clock calculations
  const totalSeconds = elapsedTime / 1000;
  const minutes = totalSeconds / 60;
  const seconds = (totalSeconds % 60) / 60;
  const milliseconds = (elapsedTime % 1000) / 1000;

  const minuteAngle = (minutes % 60) * 6; // 360/60 = 6 degrees per minute
  const secondAngle = seconds * 360;
  const msAngle = milliseconds * 360;

  return (
    <div className="relative w-80 h-80 mx-auto select-none">
      {/* Clock face */}
      <div className="absolute inset-0 rounded-full border-2 border-border bg-card shadow-lg dark:shadow-none">
        {/* Minute markers */}
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className={`absolute w-px bg-muted-foreground ${
              i % 5 === 0 ? "h-6" : "h-3"
            } ${i % 10 === 0 ? "bg-foreground w-0.5" : ""}`}
            style={{
              top: "8px",
              left: "50%",
              transformOrigin: "50% 152px",
              transform: `translateX(-50%) rotate(${i * 6}deg)`,
            }}
          />
        ))}

        {/* Numbers for 10-minute intervals */}
        {Array.from({ length: 6 }, (_, i) => {
          const angle = i * 60 - 90;
          const radius = 110;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <div
              key={i}
              className="absolute text-base font-medium font-mono text-foreground flex items-center justify-center w-10 h-10 z-50"
              style={{
                left: `calc(50% + ${x}px - 20px)`,
                top: `calc(50% + ${y}px - 20px)`,
              }}
            >
              {i * 10}
            </div>
          );
        })}

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2 z-40" />

        {/* Minute hand */}
        <div
          className="absolute top-1/2 left-1/2 origin-bottom bg-accent rounded-full transition-transform duration-75 ease-out z-10"
          style={{
            width: "4px",
            height: "100px",
            marginLeft: "-2px",
            marginTop: "-100px",
            transform: `rotate(${minuteAngle}deg)`,
          }}
        />

        {/* Second hand */}
        <div
          className="absolute top-1/2 left-1/2 origin-bottom bg-destructive rounded-full transition-transform duration-75 ease-out z-20"
          style={{
            width: "2px",
            height: "120px",
            marginLeft: "-1px",
            marginTop: "-120px",
            transform: `rotate(${secondAngle}deg)`,
          }}
        />

        {/* Millisecond hand - thinner and slightly different color */}
        <div
          className="absolute top-1/2 left-1/2 origin-bottom rounded-full z-30"
          style={{
            width: "1px",
            height: "140px",
            marginLeft: "-0.5px",
            marginTop: "-140px",
            transform: `rotate(${msAngle}deg)`,
            transition: "none", // No transition for smooth millisecond movement
            backgroundColor: "var(--accent)",
            opacity: "0.8",
          }}
        />
      </div>
    </div>
  );
};

export default AnalogClock;
