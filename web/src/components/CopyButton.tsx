"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      className="group mr-2 h-full bg-transparent px-2 text-foreground hover:bg-border/50"
      onClick={() => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 500);
        }
      }}
    >
      <span
        className={cn(
          "transition-transform spring-bounce-30 spring-duration-200 group-active:scale-90",
          copied && "scale-125",
        )}
      >
        {copied ? (
          <ClipboardCheckIcon className="inline-block h-4 w-4" />
        ) : (
          <ClipboardIcon className="inline-block h-4 w-4" />
        )}
      </span>
    </Button>
  );
}
