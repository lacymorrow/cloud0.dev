"use client";

import type { CodePanelProps, LineNumbersProps, SyntaxHighlightedCodeProps } from "./types";

export default function CodePanel({ content, language, fileName }: CodePanelProps) {
  const lines = content.split("\n");

  return (
    <div className="flex-1 overflow-auto bg-[#1e1e1e]">
      <div className="flex">
        <LineNumbers count={lines.length} />
        <SyntaxHighlightedCode code={content} language={language} />
      </div>
    </div>
  );
}

function LineNumbers({ count }: LineNumbersProps) {
  return (
    <div className="bg-[#1e1e1e] pt-4 pr-4 text-right text-gray-500 select-none">
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static line-number gutter
        <div key={i} className="text-xs leading-6">
          {i + 1}
        </div>
      ))}
    </div>
  );
}

function SyntaxHighlightedCode({ code, language }: SyntaxHighlightedCodeProps) {
  // Simple syntax highlighting for Python
  const highlightPython = (code: string) => {
    const keywords = [
      "def",
      "for",
      "in",
      "if",
      "return",
      "import",
      "from",
      "print",
      "range",
      "len",
    ];
    const builtins = ["print", "len", "range"];

    return code.split("\n").map((line, i) => {
      // Replace keywords with spans
      let highlightedLine = line;

      // Highlight keywords
      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "g");
        highlightedLine = highlightedLine.replace(
          regex,
          `<span class="text-[#C586C0]">${keyword}</span>`
        );
      });

      // Highlight strings
      highlightedLine = highlightedLine.replace(
        /(["'])(.*?)\1/g,
        '<span class="text-[#CE9178]">$1$2$1</span>'
      );

      // Highlight function definitions
      highlightedLine = highlightedLine.replace(
        /def\s+([a-zA-Z_][a-zA-Z0-9_]*)/g,
        'def <span class="text-[#DCDCAA]">$1</span>'
      );

      // Highlight function calls
      highlightedLine = highlightedLine.replace(
        /\b([a-zA-Z_][a-zA-Z0-9_]*)\(/g,
        '<span class="text-[#DCDCAA]">$1</span>('
      );

      // Highlight comments
      highlightedLine = highlightedLine.replace(/#.*/g, '<span class="text-[#6A9955]">$&</span>');

      // Highlight array indices
      highlightedLine = highlightedLine.replace(
        /\[([^\]]*)\]/g,
        '[<span class="text-[#9CDCFE]">$1</span>]'
      );

      return (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static highlighted lines
          key={i}
          className="text-sm leading-6"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: highlights the component's own static code prop, no user input
          dangerouslySetInnerHTML={{ __html: highlightedLine }}
        />
      );
    });
  };

  return (
    <div className="overflow-x-auto pt-4 pr-4 pl-2 font-mono text-[#D4D4D4]">
      {language === "python"
        ? highlightPython(code)
        : code.split("\n").map((line, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static code lines
            <div key={i} className="text-sm leading-6">
              {line}
            </div>
          ))}
    </div>
  );
}
