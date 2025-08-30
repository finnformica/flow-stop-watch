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
          className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg font-medium ${
            isRunning
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          {isRunning ? "Pause" : "Resume"}
        </button>

        <button
          onClick={onAddLap}
          disabled={!isRunning}
          className="flex items-center gap-3 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg font-medium"
        >
          <Flag size={20} />
          Lap
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-3 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          <Square size={20} />
          Stop
        </button>
      </div>

      {/* Lap Times */}
      {lapTimes.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 text-center">
            Lap Times
          </h3>

          {/* Lap Statistics */}
          <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-xl p-4">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Total Laps</div>
              <div className="text-lg font-medium text-gray-900">
                {lapTimes.length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Fastest Lap</div>
              <div className="text-lg font-medium text-green-600">
                {formatTime(fastestLap)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Slowest Lap</div>
              <div className="text-lg font-medium text-red-500">
                {formatTime(slowestLap)}
              </div>
            </div>
          </div>

          {/* Lap Time Visualization */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Lap Performance
            </h4>
            <div className="space-y-1">
              {lapTimes.map((lap, index) => {
                const isFastest = lap.split === fastestLap;
                const isSlowest =
                  lap.split === slowestLap && lapTimes.length > 1;
                const maxSplit = Math.max(...lapTimes.map((l) => l.split));
                const barWidth = (lap.split / maxSplit) * 100;

                return (
                  <div
                    key={lap.id}
                    className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 text-sm font-medium text-gray-500">
                      Lap {lap.id}
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ease-out ${
                            isFastest
                              ? "bg-green-500"
                              : isSlowest
                              ? "bg-red-500"
                              : "bg-blue-500"
                          }`}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                      <div className="w-20 text-right">
                        <div
                          className={`text-sm font-mono ${
                            isFastest
                              ? "text-green-600"
                              : isSlowest
                              ? "text-red-500"
                              : "text-gray-700"
                          }`}
                        >
                          {formatTime(lap.split)}
                        </div>
                      </div>
                      <div className="w-24 text-right">
                        <div className="text-sm font-mono text-gray-500">
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
