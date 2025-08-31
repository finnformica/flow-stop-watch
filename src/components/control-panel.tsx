import { Flag, Pause, Play, RotateCcw, Square } from "lucide-react";

const ControlPanel = ({
  isRunning,
  disabled,
  toggleTimer,
  addLap,
  resetTimer,
}: {
  isRunning: boolean;
  disabled: boolean;
  toggleTimer: () => void;
  addLap: () => void;
  resetTimer: () => void;
}) => {
  if (isRunning) {
    return (
      <>
        {/* Running Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleTimer}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card ${
              isRunning
                ? "bg-destructive text-white hover:opacity-90 focus:ring-destructive"
                : "bg-accent text-white hover:bg-accent-hover focus:ring-accent"
            }`}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
            {isRunning ? "Pause" : "Resume"}
          </button>

          <button
            onClick={addLap}
            disabled={!isRunning}
            className="flex items-center gap-3 px-6 py-3 bg-success/80 text-white rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md font-medium focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 focus:ring-offset-card"
          >
            <Flag size={20} />
            Lap
          </button>

          <button
            onClick={resetTimer}
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
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={toggleTimer}
          className="flex items-center gap-3 px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-200 shadow-sm hover:shadow-md font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        >
          <Play size={20} />
          Start
        </button>
        <button
          onClick={resetTimer}
          disabled={disabled}
          className="flex items-center gap-3 px-6 py-3 bg-muted text-foreground rounded-xl hover:bg-card-hover hover:text-muted-foreground transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        >
          <RotateCcw size={20} />
          Reset
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
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
