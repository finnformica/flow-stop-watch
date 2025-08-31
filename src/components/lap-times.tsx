import { LapTime } from "@/types";

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

  return (
    <div className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-card-hover transition-colors border border-transparent hover:border-border">
      <div className="w-12 text-sm font-medium text-muted-foreground">
        Lap {lap.id}
      </div>
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden border">
          <div
            className={`h-full transition-all duration-500 ease-out ${
              isFastest
                ? "bg-success"
                : isSlowest
                ? "bg-destructive"
                : "bg-accent"
            }`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
        <div className="w-20 text-right">
          <div
            className={`text-sm ${
              isFastest
                ? "text-success"
                : isSlowest
                ? "text-destructive"
                : "text-foreground"
            }`}
          >
            {formatTime(lap.split)}
          </div>
        </div>
        <div className="w-24 text-right">
          <div className="text-sm text-muted-foreground">
            {formatTime(lap.cumulative)}
          </div>
        </div>
      </div>
    </div>
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
    lapTimes.length > 0 && (
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-foreground text-center">
          Lap Times
        </h3>

        {/* Lap Statistics */}
        <div className="grid grid-cols-3 gap-4 bg-muted rounded-xl p-4 border">
          {lapStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-sm text-muted-foreground mb-1">
                {stat.label}
              </div>
              <div className={`text-lg font-medium ${stat.textColor}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Lap Time Visualization */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Lap Performance
          </h4>
          <div className="space-y-1">
            {lapTimes.map((lap) => (
              <LapTimeItem
                key={lap.id}
                lap={lap}
                fastestLap={fastestLap}
                slowestLap={slowestLap}
                maxSplit={maxSplit}
                formatTime={formatTime}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default LapTimes;
