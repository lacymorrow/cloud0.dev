"use client";

import type {
  CodePanelProps,
  LineNumbersProps,
  SyntaxHighlightedCodeProps,
} from "./types";

export default function CodePanel({
  content,
  language,
  fileName,
}: CodePanelProps) {
  const lines = content.split("\n");

  return (
    <div className="flex-1 bg-[#1e1e1e] overflow-auto">
      <div className="flex">
        <LineNumbers count={lines.length} />
        <SyntaxHighlightedCode code={content} language={language} />
      </div>
    </div>
  );
}

function LineNumbers({ count }: LineNumbersProps) {
  return (
    <div className="text-right pr-4 pt-4 select-none bg-[#1e1e1e] text-gray-500">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="leading-6 text-xs">
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
          `<span class="text-[#C586C0]">${keyword}</span>`,
        );
      });

      // Highlight strings
      highlightedLine = highlightedLine.replace(
        /(["'])(.*?)\1/g,
        '<span class="text-[#CE9178]">$1$2$1</span>',
      );

      // Highlight function definitions
      highlightedLine = highlightedLine.replace(
        /def\s+([a-zA-Z_][a-zA-Z0-9_]*)/g,
        'def <span class="text-[#DCDCAA]">$1</span>',
      );

      // Highlight function calls
      highlightedLine = highlightedLine.replace(
        /\b([a-zA-Z_][a-zA-Z0-9_]*)\(/g,
        '<span class="text-[#DCDCAA]">$1</span>(',
      );

      // Highlight comments
      highlightedLine = highlightedLine.replace(
        /#.*/g,
        '<span class="text-[#6A9955]">$&</span>',
      );

      // Highlight array indices
      highlightedLine = highlightedLine.replace(
        /\[([^\]]*)\]/g,
        '[<span class="text-[#9CDCFE]">$1</span>]',
      );

      return (
        <div
          key={i}
          className="leading-6 text-sm"
          dangerouslySetInnerHTML={{ __html: highlightedLine }}
        />
      );
    });
  };

  return (
    <div className="pt-4 pl-2 pr-4 text-[#D4D4D4] font-mono overflow-x-auto">
      {language === "python"
        ? highlightPython(code)
        : code.split("\n").map((line, i) => (
            <div key={i} className="leading-6 text-sm">
              {line}
            </div>
          ))}
    </div>
  );
}
