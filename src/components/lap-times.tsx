import { LapTime } from "@/types";
import { Flag, Pause, Play, Square } from "lucide-react";

type LapTimesProps = {
  isRunning: boolean;
  lapTimes: LapTime[];
  onToggleTimer: () => void;
  onAddLap: () => void;
  onReset: () => void;
  formatTime: (time: number | null) => string;
};

const LapTimes = ({
  isRunning,
  lapTimes,
  onToggleTimer,
  onAddLap,
  onReset,
  formatTime,
}: LapTimesProps) => {
  const fastestLap =
    lapTimes.length > 0 ? Math.min(...lapTimes.map((lap) => lap.split)) : null;
  const slowestLap =
    lapTimes.length > 0 ? Math.max(...lapTimes.map((lap) => lap.split)) : null;

  return (
    <div className="space-y-8">
      {/* Running Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={onToggleTimer}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card ${
            isRunning
              ? "bg-destructive text-white hover:opacity-90"
              : "bg-accent text-white hover:bg-accent-hover"
          }`}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          {isRunning ? "Pause" : "Resume"}
        </button>

        <button
          onClick={onAddLap}
          disabled={!isRunning}
          className="flex items-center gap-3 px-6 py-3 bg-success/80 text-white rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md font-medium focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 focus:ring-offset-card"
        >
          <Flag size={20} />
          Lap
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-3 px-6 py-3 bg-muted text-foreground rounded-xl hover:text-muted-foreground transition-all duration-200 shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card"
        >
          <Square size={20} />
          Stop
        </button>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="text-center py-4 border-y border-border">
        <div className="inline-flex items-center gap-6 text-sm">
          <span className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-mono border">
              Space
            </kbd>
            <span className="text-muted-foreground">Start/Pause</span>
          </span>
          <span className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-mono border">
              L
            </kbd>
            <span className="text-muted-foreground">Lap (while running)</span>
          </span>
        </div>
      </div>

      {/* Lap Times */}
      {lapTimes.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-foreground text-center">
            Lap Times
          </h3>

          {/* Lap Statistics */}
          <div className="grid grid-cols-3 gap-4 bg-muted rounded-xl p-4 border">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">
                Total Laps
              </div>
              <div className="text-lg font-medium text-foreground">
                {lapTimes.length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">
                Fastest Lap
              </div>
              <div className="text-lg font-medium text-success">
                {formatTime(fastestLap)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">
                Slowest Lap
              </div>
              <div className="text-lg font-medium text-destructive">
                {formatTime(slowestLap)}
              </div>
            </div>
          </div>

          {/* Lap Time Visualization */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground mb-3">
              Lap Performance
            </h4>
            <div className="space-y-1">
              {lapTimes.map((lap) => {
                const isFastest = lap.split === fastestLap;
                const isSlowest =
                  lap.split === slowestLap && lapTimes.length > 1;
                const maxSplit = Math.max(...lapTimes.map((l) => l.split));
                const barWidth = (lap.split / maxSplit) * 100;

                return (
                  <div
                    key={lap.id}
                    className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-card-hover transition-colors border border-transparent hover:border-border"
                  >
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
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LapTimes;
