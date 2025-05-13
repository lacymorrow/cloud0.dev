import type React from "react"
import { File, FolderTree, LayoutGrid } from "lucide-react"
import { GearIcon } from "@radix-ui/react-icons"

export default function Sidebar() {
  return (
    <div className="w-12 bg-[#252526] flex flex-col items-center py-2 border-r border-[#1e1e1e]">
      <SidebarIcon icon={<File className="w-5 h-5" />} isActive={true} />
      <SidebarIcon icon={<FolderTree className="w-5 h-5" />} />
      <SidebarIcon icon={<LayoutGrid className="w-5 h-5" />} />
      <SidebarIcon icon={<GearIcon className="w-5 h-5" />} />
    </div>
  )
}

function SidebarIcon({ icon, isActive = false }: { icon: React.ReactNode; isActive?: boolean }) {
  return (
    <div
      className={`relative w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-[#2a2d2e] ${isActive ? "after:absolute after:left-0 after:top-0 after:bottom-0 after:w-0.5 after:bg-white" : ""}`}
    >
      <div className={`${isActive ? "text-white" : "text-gray-400"}`}>{icon}</div>
    </div>
  )
}
