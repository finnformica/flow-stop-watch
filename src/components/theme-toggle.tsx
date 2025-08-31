"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo } from "react";

import { useTheme } from "@/contexts/theme-context";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const initial = { rotate: 45, opacity: 0 };
  const animate = { rotate: 0, opacity: 1 };
  const exit = { rotate: -45, opacity: 0 };

  const divProps = {
    exit,
    initial,
    animate,
    style: { originY: 1, originX: 0.5 },
    transition: { duration: 0.3, ease: "easeInOut" as const },
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-card-hover text-foreground hover:text-muted-foreground rounded-lg border transition-all duration-200"
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
    >
      <AnimatePresence mode="wait">
        {resolvedTheme === "dark" ? (
          <motion.div key="sun" {...divProps}>
            <Sun size={16} />
          </motion.div>
        ) : (
          <motion.div key="moon" {...divProps}>
            <Moon size={16} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.span
          key={resolvedTheme}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="hidden sm:inline"
        >
          {resolvedTheme === "dark" ? "Light" : "Dark"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default memo(ThemeToggle);
