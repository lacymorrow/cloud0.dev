"use client";

import { Thread } from "@/components/blocks/thread";
import { ThreadList } from "@/components/blocks/thread-list";
import GradientBackground from "@/components/gradient-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CommandInput from "@/components/ui/command-input";
import { ThemeToggle } from "@/components/ui/theme";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { MenuIcon, SparklesIcon, XIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });
  const [hasChatStarted, setHasChatStarted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleFirstSubmit = () => {
    setHasChatStarted(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {!hasChatStarted ? (
        <main className="flex min-h-screen w-full flex-col items-center justify-center relative overflow-x-hidden bg-transparent">
          <GradientBackground />

          <div className="z-10 w-full max-w-3xl px-4 sm:px-6 md:px-8 flex flex-col flex-grow justify-center">
            <div className="text-center mb-10">
              <Badge
                variant="outline"
                className="bg-background/10 backdrop-blur-sm border-border/20 px-3 py-1 mb-4"
              >
                <SparklesIcon className="h-3.5 w-3.5 mr-1.5 text-primary" />
                <span className="text-sm font-medium">Cloud0 Alpha</span>
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                Hi there
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto">
                What would you like to do today?
              </p>
            </div>

            <div className="w-full">
              <CommandInput onFirstSubmit={handleFirstSubmit} />
            </div>

            <div className="mt-auto pt-8 pb-4 text-center text-foreground/60 text-sm">
              Cloud0 is in early alpha.{" "}
              <Button
                variant="link"
                className="text-foreground/60 hover:text-foreground p-0 h-auto font-normal text-sm"
              >
                Learn more here
              </Button>
            </div>
          </div>
        </main>
      ) : (
        <div className="relative flex h-dvh w-full flex-col bg-transparent overflow-hidden">
          <header className="absolute top-0 left-0 right-0 z-[60] flex h-16 items-center justify-between border-b border-border/20 bg-background/50 backdrop-blur-md px-4">
            <div className="sm:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className="text-foreground"
              >
                {isMobileMenuOpen ? (
                  <XIcon className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </Button>
            </div>
            <div className="hidden sm:block w-[200px] flex-shrink-0" />
            <div className="flex-grow" />
            <ThemeToggle />
          </header>

          <div className="flex flex-1 pt-16 overflow-hidden">
            <aside
              className={`
                fixed top-16 bottom-0 left-0 z-40
                sm:relative sm:top-auto sm:bottom-auto
                w-[280px] sm:w-[200px] flex-shrink-0
                bg-background/80 backdrop-blur-lg sm:bg-transparent sm:backdrop-blur-none
                border-r border-border/20
                transition-transform duration-300 ease-in-out
                transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
                sm:translate-x-0
              `}
            >
              <div className="h-full overflow-y-auto p-4">
                <ThreadList />
              </div>
            </aside>

            <main className="flex-1 overflow-y-auto">
              <div className="h-full p-0 sm:p-4">
                <Thread />
              </div>
            </main>
          </div>
        </div>
      )}
    </AssistantRuntimeProvider>
  );
}
