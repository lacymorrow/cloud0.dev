"use client";

import { useState } from "react";
import CodePanel from "./code-panel";
import EditorTabs from "./editor-tabs";
import ExplanationPanel from "./explanation-panel";
import Sidebar from "./sidebar";
import Titlebar from "./titlebar";
import type { File } from "./types";

export default function CodeEditorLayout() {
  const [activeFile, setActiveFile] = useState<string>("bubble-sort.py");

  const files: File[] = [
    {
      id: "bubble-sort.py",
      name: "bubble-sort.py",
      language: "python",
      content: `def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                
    return arr`,
    },
    {
      id: "main.py",
      name: "main.py",
      language: "python",
      content: `from bubble_sort import bubble_sort

# Test the bubble sort function
test_array = [64, 34, 25, 12, 22, 11, 90]
sorted_array = bubble_sort(test_array)

print("Sorted array:", sorted_array)`,
    },
  ];

  const activeFileContent =
    files.find((file) => file.id === activeFile)?.content || "";

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-white overflow-hidden">
      <Titlebar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <EditorTabs
            files={files}
            activeFile={activeFile}
            onSelectFile={setActiveFile}
          />

          <div className="flex-1 flex overflow-hidden">
            <CodePanel
              content={activeFileContent}
              language={
                files.find((file) => file.id === activeFile)?.language ||
                "python"
              }
              fileName={activeFile}
            />

            <ExplanationPanel
              fileName={activeFile}
              content={activeFileContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
