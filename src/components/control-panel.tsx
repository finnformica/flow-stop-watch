import { Flag, Play, RotateCcw, Square } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useMemo } from "react";

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  variant: "primary" | "secondary" | "destructive" | "success";
  icon: React.ReactNode;
  children: React.ReactNode;
};

const Button = memo(
  ({ onClick, disabled = false, variant, icon, children }: ButtonProps) => {
    const baseClasses =
      "flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      primary: "bg-accent text-white hover:bg-accent/80 focus:ring-accent",
      secondary:
        "bg-muted text-foreground hover:text-muted-foreground focus:ring-accent",
      destructive:
        "bg-destructive/80 text-white hover:bg-destructive/60 focus:ring-destructive",
      success:
        "bg-success/80 text-white hover:bg-success/60 focus:ring-success",
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant]}`}
      >
        {icon}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

type KeyboardShortcutProps = {
  label: string;
  _key: string;
};

const KeyboardShortcut = memo(({ label, _key }: KeyboardShortcutProps) => {
  return (
    <motion.span
      className="flex items-center justify-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <kbd className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-mono border">
        {_key}
      </kbd>
      <span className="text-muted-foreground">{label}</span>
    </motion.span>
  );
});

KeyboardShortcut.displayName = "KeyboardShortcut";

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
  const buttons = useMemo(() => {
    return isRunning
      ? [
          {
            onClick: toggleTimer,
            variant: "destructive" as const,
            icon: <Square size={20} />,
            children: "Stop",
          },
          {
            onClick: addLap,
            disabled: !isRunning,
            variant: "success" as const,
            icon: <Flag size={20} />,
            children: "Lap",
          },
        ]
      : [
          {
            onClick: toggleTimer,
            variant: "primary" as const,
            icon: <Play size={20} />,
            children: "Start",
          },
          {
            onClick: resetTimer,
            disabled,
            variant: "secondary" as const,
            icon: <RotateCcw size={20} />,
            children: "Reset",
          },
        ];
  }, [isRunning, disabled, toggleTimer, addLap, resetTimer]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={isRunning ? "running" : "stopped"}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 sm:mb-6"
        >
          {buttons.map((button, index) => (
            <Button key={index} {...button} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Keyboard Shortcuts */}
      <div className="w-full hidden sm:flex items-center justify-center gap-6 py-4 border-y border-border text-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={isRunning ? "running-shortcuts" : "stopped-shortcuts"}
            className="flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {isRunning
              ? [
                  <KeyboardShortcut key="Stop" _key="Space" label="Stop" />,
                  <KeyboardShortcut key="L" _key="L" label="Lap" />,
                ]
              : [
                  <KeyboardShortcut key="Start" _key="Space" label="Start" />,
                  <KeyboardShortcut key="R" _key="R" label="Reset" />,
                ]}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default memo(ControlPanel);
