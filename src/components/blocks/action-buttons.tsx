"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { BookOpen, Code, Database, Lightbulb } from "lucide-react";
import { useTheme } from "next-themes";
import type React from "react";
import { useState } from "react";

type ActionButton = {
  icon: React.ReactNode;
  label: string;
  lightColors: {
    color: string;
    hoverColor: string;
  };
  darkColors: {
    color: string;
    hoverColor: string;
  };
};

export default function ActionButtons() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const buttons: ActionButton[] = [
    {
      icon: <MagnifyingGlassIcon className="h-5 w-5" />,
      label: "Research",
      lightColors: {
        color: "from-blue-400/10 to-cyan-400/10",
        hoverColor: "from-blue-400 to-cyan-400",
      },
      darkColors: {
        color: "from-blue-500/20 to-cyan-400/20",
        hoverColor: "from-blue-500 to-cyan-400",
      },
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      label: "Create",
      lightColors: {
        color: "from-amber-400/10 to-orange-400/10",
        hoverColor: "from-amber-400 to-orange-400",
      },
      darkColors: {
        color: "from-amber-500/20 to-orange-400/20",
        hoverColor: "from-amber-500 to-orange-400",
      },
    },
    {
      icon: <Database className="h-5 w-5" />,
      label: "Analyze",
      lightColors: {
        color: "from-emerald-400/10 to-green-400/10",
        hoverColor: "from-emerald-400 to-green-400",
      },
      darkColors: {
        color: "from-emerald-500/20 to-green-400/20",
        hoverColor: "from-emerald-500 to-green-400",
      },
    },
    {
      icon: <Code className="h-5 w-5" />,
      label: "Build",
      lightColors: {
        color: "from-purple-400/10 to-violet-400/10",
        hoverColor: "from-purple-400 to-violet-400",
      },
      darkColors: {
        color: "from-purple-500/20 to-violet-400/20",
        hoverColor: "from-purple-500 to-violet-400",
      },
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Learn",
      lightColors: {
        color: "from-pink-400/10 to-rose-400/10",
        hoverColor: "from-pink-400 to-rose-400",
      },
      darkColors: {
        color: "from-pink-500/20 to-rose-400/20",
        hoverColor: "from-pink-500 to-rose-400",
      },
    },
  ];

  const getColors = (button: ActionButton) => {
    return isDark ? button.darkColors : button.lightColors;
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {buttons.map((button, index) => {
        const colors = getColors(button);

        return (
          <motion.button
            key={button.label}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background/20 backdrop-blur-sm border border-border/10 text-foreground transition-all duration-300 overflow-hidden group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ y: 0 }}
            whileHover={{
              y: -5,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            whileTap={{
              y: -2,
              scale: 0.98,
              transition: { type: "spring", stiffness: 400, damping: 17 },
            }}
          >
            {/* Background gradient */}
            <motion.div
              className={`absolute inset-0 -z-10 bg-gradient-to-r ${colors.color} opacity-0 group-hover:opacity-100`}
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Border glow effect */}
            <motion.div
              className={`absolute -inset-0.5 -z-20 bg-gradient-to-r ${colors.hoverColor} rounded-xl opacity-0 blur-md group-hover:opacity-70`}
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 0.7 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Icon with animation */}
            <motion.div
              className="relative z-10"
              animate={{
                rotate: hoveredIndex === index ? [0, -10, 10, -5, 5, 0] : 0,
                scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                ease: "easeInOut",
              }}
            >
              {button.icon}
            </motion.div>

            {/* Text with subtle animation */}
            <motion.span
              className="relative z-10 font-medium"
              animate={{
                x: hoveredIndex === index ? [0, 2, 0] : 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              {button.label}
            </motion.span>

            {/* Particle effect on hover */}
            {hoveredIndex === index && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${colors.hoverColor}`}
                    initial={{
                      x: "50%",
                      y: "50%",
                      scale: 0,
                      opacity: 0.8,
                    }}
                    animate={{
                      x: `${50 + (Math.random() * 60 - 30)}%`,
                      y: `${50 + (Math.random() * 60 - 30)}%`,
                      scale: [0, Math.random() * 0.8 + 0.2, 0],
                      opacity: [0.8, 0.4, 0],
                    }}
                    transition={{
                      duration: 1 + Math.random() * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
