import { GearIcon } from "@radix-ui/react-icons";
import { File, FolderTree, LayoutGrid } from "lucide-react";
import type React from "react";

export default function Sidebar() {
  return (
    <div className="flex w-12 flex-col items-center border-r border-[#1e1e1e] bg-[#252526] py-2">
      <SidebarIcon icon={<File className="h-5 w-5" />} isActive={true} />
      <SidebarIcon icon={<FolderTree className="h-5 w-5" />} />
      <SidebarIcon icon={<LayoutGrid className="h-5 w-5" />} />
      <SidebarIcon icon={<GearIcon className="h-5 w-5" />} />
    </div>
  );
}

function SidebarIcon({ icon, isActive = false }: { icon: React.ReactNode; isActive?: boolean }) {
  return (
    <div
      className={`relative flex h-12 w-12 cursor-pointer items-center justify-center hover:bg-[#2a2d2e] ${isActive ? "after:absolute after:top-0 after:bottom-0 after:left-0 after:w-0.5 after:bg-white" : ""}`}
    >
      <div className={`${isActive ? "text-white" : "text-gray-400"}`}>{icon}</div>
    </div>
  );
}
