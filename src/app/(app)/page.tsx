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
import { SparklesIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });
  const [hasChatStarted, setHasChatStarted] = useState(false);

  const handleFirstSubmit = () => {
    setHasChatStarted(true);
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
        <div className="grid h-dvh grid-cols-[auto_1fr] sm:grid-cols-[200px_1fr] gap-x-2 px-4 py-4 bg-transparent">
          <div className="absolute top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <div className="hidden sm:block">
            <ThreadList />
          </div>
          {/* On smaller screens, ThreadList might be hidden or accessible via a burger menu (not implemented here) */}
          {/* For now, ensuring ThreadList is visible on sm+ and Thread takes full width or column on xs */}
          <Thread />
        </div>
      )}
    </AssistantRuntimeProvider>
  );
}
