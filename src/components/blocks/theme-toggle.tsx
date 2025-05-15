"use client";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-10 h-10 bg-background/10 backdrop-blur-md border border-border/20"
      >
        <span className="sr-only">Toggle theme</span>
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full w-10 h-10 bg-background/10 backdrop-blur-md border border-border/20 relative overflow-hidden"
    >
      <span className="sr-only">Toggle theme</span>
      <div className="relative z-10 w-10 h-10 flex items-center justify-center">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{
            rotate: isDark ? 180 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.5, type: "spring" }}
          className="absolute"
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </motion.div>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{
            rotate: isDark ? 0 : -180,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.5, type: "spring" }}
          className="absolute"
        >
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </motion.div>
      </div>

      {/* Animated background glow */}
      <motion.div
        className={`absolute inset-0 opacity-20 ${isDark ? "bg-purple-500" : "bg-amber-300"} blur-md`}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </Button>
  );
}
