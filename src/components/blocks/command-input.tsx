"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUp, Paperclip, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function CommandInput() {
  const [inputValue, setInputValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
  }, [inputValue])

  const handleSubmit = () => {
    if (!inputValue.trim()) return
    console.log("Submitted:", inputValue)
    setInputValue("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

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
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground/70 hover:text-foreground hover:bg-background/20 gap-1.5"
            >
              <Sparkles className="h-4 w-4" />
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
              <ArrowUp className="h-5 w-5" />
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
  )
}
