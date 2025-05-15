import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

export default function Titlebar() {
  return (
    <div className="h-10 flex items-center px-3 bg-[#252526] border-b border-[#1e1e1e]">
      <div className="flex space-x-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
        <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
        <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
      </div>

      <div className="flex items-center space-x-2 mr-4">
        <button className="p-1 hover:bg-[#3c3c3c] rounded">
          <ArrowLeftIcon className="w-4 h-4 text-gray-400" />
        </button>
        <button className="p-1 hover:bg-[#3c3c3c] rounded">
          <ArrowRightIcon className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 max-w-2xl mx-auto">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-2 top-1.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-7 bg-[#3c3c3c] text-sm rounded px-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
