"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { EditorTabsProps, TabProps } from "./types";

export default function EditorTabs({
  files,
  activeFile,
  onSelectFile,
}: EditorTabsProps) {
  return (
    <div className="h-9 flex bg-[#252526] border-b border-[#1e1e1e] overflow-x-auto">
      {files.map((file) => (
        <Tab
          key={file.id}
          file={file}
          isActive={file.id === activeFile}
          onClick={() => onSelectFile(file.id)}
        />
      ))}
    </div>
  );
}

function Tab({ file, isActive, onClick }: TabProps) {
  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith(".py")) {
      return (
        <div className="w-4 h-4 mr-2 flex-shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
              fill="#3776AB"
            />
          </svg>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`flex items-center px-3 py-1 cursor-pointer border-r border-[#1e1e1e] min-w-[120px] max-w-[200px] ${
        isActive ? "bg-[#1e1e1e]" : "bg-[#2d2d2d] hover:bg-[#2a2a2a]"
      }`}
      onClick={onClick}
    >
      {getFileIcon(file.name)}
      <span className="text-sm truncate flex-1">{file.name}</span>
      <button className="ml-2 opacity-50 hover:opacity-100">
        <Cross2Icon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
