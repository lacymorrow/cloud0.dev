"use client";

import { Button } from "@/components/ui/button";
import { useThreadRuntime } from "@assistant-ui/react";
import { motion } from "framer-motion";
import { ArrowUpIcon, PaperclipIcon, SparklesIcon } from "lucide-react";
import { useTheme } from "next-themes";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export default function CommandInput({
  onFirstSubmit,
}: { onFirstSubmit?: () => void } = {}) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const threadRuntime = useThreadRuntime();
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);

  useEffect(() => {
    console.log("CommandInput mounted. Thread runtime:", threadRuntime);
    if (threadRuntime) {
      console.log(
        "append function available on threadRuntime:",
        typeof threadRuntime.append === "function",
      );
    }
  }, [threadRuntime]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }, [inputValue]);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    console.log("Attempting to append message:", inputValue.trim());
    if (threadRuntime && typeof threadRuntime.append === "function") {
      threadRuntime.append({
        role: "user",
        content: [{ type: "text", text: inputValue.trim() }],
      });
      console.log("Message appended via threadRuntime.append");
      if (isFirstSubmit) {
        onFirstSubmit?.();
        setIsFirstSubmit(false);
      }
    } else {
      console.error(
        "append function is not available on threadRuntime or threadRuntime is null",
      );
    }
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={`
        relative w-full rounded-2xl transition-all duration-300 overflow-hidden
        glass-morphism ${isFocused ? "focused" : ""}
      `}
      style={{
        isolation: "isolate",
      }}
    >
      {/* Inner content */}
      <div className="relative z-10">
        <div className="flex items-start p-5">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask Cloud0 anything..."
            className="flex-1 bg-transparent border-0 outline-none resize-none text-foreground placeholder:text-foreground/60 min-h-[28px] max-h-[200px] py-1 text-lg"
            rows={1}
          />
        </div>

        <div className="flex items-center justify-between px-5 pb-5 relative z-10">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-foreground/70 hover:text-foreground hover:bg-background/20"
            >
              <PaperclipIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground/70 hover:text-foreground hover:bg-background/20 gap-1.5"
            >
              <SparklesIcon className="h-4 w-4" />
              <span>Enhance</span>
            </Button>
          </div>

          <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
            <Button
              onClick={handleSubmit}
              disabled={!inputValue.trim()}
              size="icon"
              className={`h-10 w-10 rounded-full transition-all duration-300 ${
                inputValue.trim()
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white dark:text-white"
                  : "bg-background/20 text-foreground/50"
              }`}
            >
              <ArrowUpIcon className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Animated bottom border */}
        {isFocused && (
          <motion.div
            className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-pink-500 z-20"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: 1,
              opacity: 1,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            layoutId="inputUnderline"
          />
        )}
      </div>

      {/* Invisible border to create mask shape */}
      <div className="absolute inset-0 rounded-2xl border border-transparent z-0"></div>
    </div>
  );
}
