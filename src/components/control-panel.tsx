import { Play, RotateCcw } from "lucide-react";

const ControlPanel = ({
  onStart,
  onReset,
  disabled,
}: {
  onStart: () => void;
  onReset: () => void;
  disabled: boolean;
}) => (
  <div className="space-y-6">
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={onStart}
        className="flex items-center gap-3 px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-200 shadow-sm hover:shadow-md font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
      >
        <Play size={20} />
        Start
      </button>
      <button
        onClick={onReset}
        disabled={disabled}
        className="flex items-center gap-3 px-6 py-3 bg-muted text-foreground rounded-xl hover:bg-card-hover hover:text-muted-foreground transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
      >
        <RotateCcw size={20} />
        Reset
      </button>
    </div>

    {/* Keyboard Shortcuts */}
    <div className="text-center pt-4 border-t border-border">
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

export default ControlPanel;
