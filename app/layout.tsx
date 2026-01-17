import type React from "react";
import { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator";
import { SiteHeader } from "@/components/site-header";
import { getMetaInfo } from "@/lib/data";
import { RootProvider } from "fumadocs-ui/provider/next";

const metaInfo = getMetaInfo();
const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

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
    <html
      lang="en"
      className="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <body>
        {umamiScriptUrl && umamiWebsiteId ? (
          <Script
            defer
            src={umamiScriptUrl}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        ) : null}
        <RootProvider
          search={{
            enabled: false,
          }}
          theme={{
            enabled: false,
          }}
        >
          <SiteHeader />
          <ScrollProgressIndicator />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
