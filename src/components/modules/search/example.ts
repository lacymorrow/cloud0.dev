import { routes } from "@/config/routes";
import type { MainNavItem, SidebarNavItem } from "@/types/nav";

export interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
  featuresNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Contact",
      href: routes.contact,
    },
  ],
  sidebarNav: [],
  featuresNav: [],
};
