"use client";

import { Thread } from "@/components/blocks/thread";
import { ThreadList } from "@/components/blocks/thread-list";
import GradientBackground from "@/components/gradient-background";
import { Badge } from "@/components/ui/badge";
import CommandInput from "@/components/ui/command-input";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AnimatePresence, motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({ api: "/chat" }),
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
            className="relative flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center bg-transparent"
          >
            <div className="z-10 flex w-full max-w-3xl flex-grow flex-col justify-center px-4 sm:px-6 md:px-8">
              <div className="mb-10 text-center">
                <Badge
                  variant="outline"
                  className="mb-4 rounded-full border-primary/20 bg-background/10 px-3 py-1 backdrop-blur-sm"
                >
                  <SparklesIcon className="mr-1.5 h-3.5 w-3.5 text-primary" />
                  <span className="text-sm font-medium">Cloud0 Alpha</span>
                </Badge>

                <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
                  What can I do for you?
                </h1>
                <p className="mx-auto max-w-2xl text-xl text-foreground/80 md:text-2xl">
                  Ask me anything, I can help you with anything you need.
                </p>
              </div>

              <div className="w-full">
                <CommandInput onFirstSubmit={handleFirstSubmit} />
              </div>

              <div className="pt-8 pb-4 text-center text-sm text-foreground/60">
                Cloud0 is in early alpha, by{" "}
                <Link
                  href="https://lacymorrow.com"
                  className="h-auto p-0 text-sm font-normal text-foreground/60 transition-colors hover:text-foreground"
                >
                  Lacy Morrow
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
            className="relative flex h-[calc(100vh-76px)] w-full flex-col bg-transparent"
          >
            <div className="flex flex-1">
              <aside
                className={`fixed top-16 bottom-0 left-0 z-40 w-[280px] flex-shrink-0 transform rounded-md bg-background/10 shadow-md backdrop-blur-md transition-transform duration-300 ease-in-out sm:relative sm:top-auto sm:bottom-auto sm:w-[200px] sm:bg-background/10 sm:backdrop-blur-md ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} overflow-y-auto p-4 sm:translate-x-0`}
              >
                <ThreadList />
              </aside>

              <main className="flex-1 overflow-y-auto rounded-md bg-background/10 p-0 backdrop-blur-md sm:p-4">
                <Thread />
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AssistantRuntimeProvider>
  );
}
