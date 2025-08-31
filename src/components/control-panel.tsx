import { Flag, Play, RotateCcw, Square } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  variant: "primary" | "secondary" | "destructive" | "success";
  icon: React.ReactNode;
  children: React.ReactNode;
};

const Button = ({
  onClick,
  disabled = false,
  variant,
  icon,
  children,
}: ButtonProps) => {
  const baseClasses =
    "flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-accent text-white hover:bg-accent-hover focus:ring-accent",
    secondary:
      "bg-muted text-foreground hover:bg-card-hover hover:text-muted-foreground focus:ring-accent",
    destructive:
      "bg-destructive text-white hover:opacity-90 focus:ring-destructive",
    success: "bg-success/80 text-white hover:opacity-90 focus:ring-success",
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
};

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
  const keyboardShortcuts = [
    {
      key: "Space",
      label: "Start/Pause",
    },
    ...(isRunning
      ? [
          {
            key: "L",
            label: "Lap (while running)",
          },
        ]
      : []),
  ];

  const buttons = isRunning
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

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={isRunning ? "running" : "stopped"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center justify-center gap-4"
        >
          {buttons.map((button, index) => (
            <Button key={index} {...button} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Keyboard Shortcuts */}
      <div className="w-full flex items-center justify-center gap-6 py-4 border-y border-border text-sm">
        {keyboardShortcuts.map((shortcut) => (
          <motion.span
            layout
            key={shortcut.key}
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              layout: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2, delay: 0.2 },
            }}
          >
            <kbd className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-mono border">
              {shortcut.key}
            </kbd>
            <span className="text-muted-foreground">{shortcut.label}</span>
          </motion.span>
        ))}
      </div>
    </>
  );
};

export default ControlPanel;
