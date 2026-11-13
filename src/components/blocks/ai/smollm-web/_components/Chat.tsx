"use client";

import DOMPurify from "dompurify";
import { marked } from "marked";

import BotIcon from "./icons/BotIcon";
import UserIcon from "./icons/UserIcon";

import "./Chat.css";
import { useEffect } from "react";
import type { ChatMessage } from "../types";

function render(text: string): string {
  return DOMPurify.sanitize(marked.parse(text, { async: false }));
}

interface ChatProps {
  messages: ChatMessage[];
}

export default function Chat({ messages }: ChatProps) {
  const empty = messages.length === 0;

  useEffect(() => {
    window.MathJax?.typeset?.();
  }, [messages]);

  return (
    <div
      className={`w-full max-w-[960px] flex-1 p-6 ${empty ? "flex flex-col items-center justify-end" : "space-y-4"}`}
    >
      {empty ? (
        <div className="text-xl">Ready!</div>
      ) : (
        messages.map((msg, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: messages are append-only, so the index is stable
          <div key={`message-${i}`} className="flex items-start space-x-4">
            {msg.role === "assistant" ? (
              <>
                <BotIcon className="my-3 h-6 min-h-6 w-6 min-w-6 text-gray-500 dark:text-gray-300" />
                <div className="rounded-lg bg-gray-200 p-4 dark:bg-gray-700">
                  <p className="overflow-wrap-anywhere min-h-6 text-gray-800 dark:text-gray-200">
                    {msg.content.length > 0 ? (
                      <span
                        className="markdown"
                        // biome-ignore lint/security/noDangerouslySetInnerHtml: model output is sanitized by DOMPurify in render()
                        dangerouslySetInnerHTML={{
                          __html: render(msg.content),
                        }}
                      />
                    ) : (
                      <span className="flex h-6 items-center gap-1">
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-gray-600 dark:bg-gray-300" />
                        <span className="animation-delay-200 h-2.5 w-2.5 animate-pulse rounded-full bg-gray-600 dark:bg-gray-300" />
                        <span className="animation-delay-400 h-2.5 w-2.5 animate-pulse rounded-full bg-gray-600 dark:bg-gray-300" />
                      </span>
                    )}
                  </p>
                </div>
              </>
            ) : (
              <>
                <UserIcon className="my-3 h-6 min-h-6 w-6 min-w-6 text-gray-500 dark:text-gray-300" />
                <div className="rounded-lg bg-blue-500 p-4 text-white">
                  <p className="overflow-wrap-anywhere min-h-6">{msg.content}</p>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
