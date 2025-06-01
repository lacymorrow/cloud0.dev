"use client";

import { Thread } from "@/components/blocks/thread";
import { ThreadList } from "@/components/blocks/thread-list";
import GradientBackground from "@/components/gradient-background";
import { Badge } from "@/components/ui/badge";
import CommandInput from "@/components/ui/command-input";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AnimatePresence, motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const runtime = useChatRuntime({
    api: "/chat",
  });
  const [hasChatStarted, setHasChatStarted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleFirstSubmit = () => {
    setHasChatStarted(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <GradientBackground />
      <AnimatePresence mode="wait">
        {!hasChatStarted ? (
          <motion.main
            key="initial-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center relative bg-transparent"
          >
            <div className="z-10 w-full max-w-3xl px-4 sm:px-6 md:px-8 flex flex-col flex-grow justify-center">
              <div className="text-center mb-10">
                <Badge
                  variant="outline"
                  className="bg-background/10 backdrop-blur-sm border-primary/20 px-3 py-1 mb-4 rounded-full"
                >
                  <SparklesIcon className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  <span className="text-sm font-medium">Cloud0 Alpha</span>
                </Badge>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                  What can I do for you?
                </h1>
                <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto">
                  Ask me anything, I can help you with anything you need.
                </p>
              </div>

              <div className="w-full">
                <CommandInput onFirstSubmit={handleFirstSubmit} />
              </div>

              <div className="pt-8 pb-4 text-center text-foreground/60 text-sm">
                Cloud0 is in early alpha.{" "}
                <Link
                  href="https://lacy.sh"
                  className="transition-colors text-foreground/60 hover:text-foreground p-0 h-auto font-normal text-sm"
                >
                  Learn more here
                </Link>
                .
              </div>
            </div>
          </motion.main>
        ) : (
          <motion.div
            key="chat-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex h-[calc(100vh-76px)] w-full flex-col bg-transparent "
          >
            <div className="flex flex-1">
              <aside
                className={`
                  fixed top-16 bottom-0 left-0 z-40
                  sm:relative sm:top-auto sm:bottom-auto
                  w-[280px] sm:w-[200px] flex-shrink-0
                  bg-background/10 backdrop-blur-md sm:bg-background/10 sm:backdrop-blur-md
                  shadow-md
                  rounded-md
                  transition-transform duration-300 ease-in-out
                  transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
                  sm:translate-x-0
                  overflow-y-auto p-4
                `}
              >
                <ThreadList />
              </aside>

              <main className="flex-1 overflow-y-auto bg-background/10 backdrop-blur-md rounded-md p-0 sm:p-4">
                <Thread />
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AssistantRuntimeProvider>
  );
}
