"use client";

import type React from "react";
import { track } from "@/lib/umami";

type SocialPlatform = "github" | "x" | "email";

type Props = {
  href: string;
  platform: SocialPlatform;
  ariaLabel: string;
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  children: React.ReactNode;
};

export function TrackedSocialLink({
  href,
  platform,
  ariaLabel,
  className,
  target,
  rel,
  children,
}: Props) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      aria-label={ariaLabel}
      onClick={() => track("social_click", { platform })}
    >
      {children}
    </a>
  );
}

