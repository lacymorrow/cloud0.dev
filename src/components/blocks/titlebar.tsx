import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Titlebar() {
  return (
    <div className="flex h-10 items-center border-b border-[#1e1e1e] bg-[#252526] px-3">
      <div className="mr-4 flex space-x-2">
        <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <div className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>

      <div className="mr-4 flex items-center space-x-2">
        <button type="button" className="rounded p-1 hover:bg-[#3c3c3c]">
          <ArrowLeftIcon className="h-4 w-4 text-gray-400" />
        </button>
        <button type="button" className="rounded p-1 hover:bg-[#3c3c3c]">
          <ArrowRightIcon className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      <div className="mx-auto max-w-2xl flex-1">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute top-1.5 left-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="h-7 w-full rounded bg-[#3c3c3c] px-8 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
