import type React from "react";
import { Metadata } from "next";
import "./globals.css";
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator";
import { AnimationProvider } from "@/contexts/animation-context";
import { SiteHeader } from "@/components/site-header";
import { getMetaInfo } from "@/lib/data";

const metaInfo = getMetaInfo();

export const metadata: Metadata = {
  title: metaInfo.title,
  description: metaInfo.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AnimationProvider>
          <SiteHeader />
          <ScrollProgressIndicator />
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
