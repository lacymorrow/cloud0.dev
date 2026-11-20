import { ThreadListItemPrimitive, ThreadListPrimitive } from "@assistant-ui/react";
import { ArchiveIcon, PlusIcon } from "lucide-react";
import type { FC } from "react";

import { TooltipIconButton } from "@/components/blocks/tooltip-icon-button";
import { Button } from "@/components/ui/button";

export const ThreadList: FC = () => {
  return (
    <ThreadListPrimitive.Root className="flex max-h-[50vh] flex-col items-stretch gap-1.5 overflow-y-auto rounded-lg border-border/20 bg-background/10 p-2 backdrop-blur-md">
      <ThreadListNew />
      <ThreadListItems />
    </ThreadListPrimitive.Root>
  );
};

const ThreadListNew: FC = () => {
  return (
    <ThreadListPrimitive.New asChild>
      <Button
        className="flex items-center justify-start gap-1 rounded-lg px-2.5 py-2 text-start backdrop-blur-sm hover:bg-muted/30 data-[active]:bg-muted/30"
        variant="ghost"
      >
        <PlusIcon />
        New Thread
      </Button>
    </ThreadListPrimitive.New>
  );
};

const ThreadListItems: FC = () => {
  return <ThreadListPrimitive.Items components={{ ThreadListItem }} />;
};

const ThreadListItem: FC = () => {
  return (
    <ThreadListItemPrimitive.Root className="flex items-center gap-2 rounded-lg backdrop-blur-sm transition-all hover:bg-muted/30 focus-visible:bg-muted/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none data-[active]:bg-muted/30">
      <ThreadListItemPrimitive.Trigger className="flex-grow px-3 py-2 text-start">
        <ThreadListItemTitle />
      </ThreadListItemPrimitive.Trigger>
      <ThreadListItemArchive />
    </ThreadListItemPrimitive.Root>
  );
};

const ThreadListItemTitle: FC = () => {
  return (
    <p className="text-sm">
      <ThreadListItemPrimitive.Title fallback="New Chat" />
    </p>
  );
};

const ThreadListItemArchive: FC = () => {
  return (
    <ThreadListItemPrimitive.Archive asChild>
      <TooltipIconButton
        className="mr-3 ml-auto size-4 p-0 text-foreground hover:text-primary"
        variant="ghost"
        tooltip="Archive thread"
      >
        <ArchiveIcon />
      </TooltipIconButton>
    </ThreadListItemPrimitive.Archive>
  );
};
