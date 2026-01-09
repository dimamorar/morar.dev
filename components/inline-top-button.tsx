"use client";

import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type InlineTopButtonProps = {
  className?: string;
};

export function InlineTopButton({ className }: InlineTopButtonProps) {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center gap-1 text-base text-muted-foreground hover:text-accent transition-colors",
        className
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-4 w-4" />
      <span>Top</span>
    </button>
  );
}
