import { Clock, MessageCircle } from "lucide-react";
import type { ExplanationPanelProps } from "./types";

export default function ExplanationPanel({ fileName, content }: ExplanationPanelProps) {
  // Only show explanation for bubble-sort.py
  if (fileName !== "bubble-sort.py") {
    return null;
  }

  return (
    <div className="w-[400px] overflow-y-auto border-l border-[#333333] bg-[#1e1e1e]">
      <div className="p-4">
        <div className="mb-4 flex items-center">
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#333]">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
                fill="#3776AB"
              />
            </svg>
          </div>
          <span className="font-medium">bubble-sort.py</span>
          <span className="ml-auto text-xs text-gray-400">32:55</span>
        </div>

        <div className="mb-4 rounded-lg bg-[#252526] p-4">
          <div className="mb-4 font-mono text-sm">
            <SyntaxHighlightedSnippet />
          </div>

          <div className="text-sm text-gray-300">why does this code not return a sorted list?</div>
        </div>

        <div className="mb-4 rounded-lg bg-[#252526] p-4">
          <div className="mb-2 flex items-start">
            <div className="mt-0.5 mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#333]">
              <MessageCircle className="h-3.5 w-3.5 text-gray-300" />
            </div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-gray-300">
                The code modifies the input list in-place but does not explicitly return the sorted
                list.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4 rounded-lg bg-[#252526] p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">See it in action</span>
            </div>
            <span className="text-xs text-gray-400">1 min 33 sec</span>
          </div>
          <div className="flex h-16 items-center justify-center rounded bg-black">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#333]">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5V19L19 12L8 5Z" fill="white" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button type="button" className="text-sm text-blue-400 hover:underline">
            Add a follow-up
          </button>
          <div className="flex items-center space-x-2">
            <button type="button" className="text-xs text-gray-400 hover:text-gray-300">
              Add context
            </button>
            <button type="button" className="text-xs text-gray-400 hover:text-gray-300">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SyntaxHighlightedSnippet() {
  return (
    <div>
      <div className="flex">
        <div className="pr-2 text-right text-gray-500 select-none">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
        </div>
        <div className="text-[#D4D4D4]">
          <div>
            <span className="text-[#C586C0]">def</span>{" "}
            <span className="text-[#DCDCAA]">bubble_sort</span>(
            <span className="text-[#9CDCFE]">arr</span>):
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;n = <span className="text-[#DCDCAA]">len</span>(
            <span className="text-[#9CDCFE]">arr</span>)
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#C586C0]">for</span> i{" "}
            <span className="text-[#C586C0]">in</span> <span className="text-[#DCDCAA]">range</span>
            (n - 1):
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#C586C0]">for</span> j <span className="text-[#C586C0]">in</span>{" "}
            <span className="text-[#DCDCAA]">range</span>(n - i - 1):
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#C586C0]">if</span> <span className="text-[#9CDCFE]">arr</span>
            [j] &gt; <span className="text-[#9CDCFE]">arr</span>[j + 1]:
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#9CDCFE]">arr</span>[j],{" "}
            <span className="text-[#9CDCFE]">arr</span>[j + 1] ={" "}
            <span className="text-[#9CDCFE]">arr</span>[j + 1],{" "}
            <span className="text-[#9CDCFE]">arr</span>[j]
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
