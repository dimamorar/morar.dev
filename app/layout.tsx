import type React from "react";
import { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator";
import { SiteHeader } from "@/components/site-header";
import { PersonSchema } from "@/components/person-schema";
import { getMetaInfo } from "@/lib/data";
import { RootProvider } from "fumadocs-ui/provider/next";

const metaInfo = getMetaInfo();
const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://morar.dev"),
  title: {
    default: metaInfo.title,
    template: "%s | Dmytro Morar",
  },
  description: metaInfo.description,
  openGraph: {
    title: metaInfo.title,
    description: metaInfo.description,
    url: "https://morar.dev",
    siteName: "Dmytro Morar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dmytro Morar - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metaInfo.title,
    description: metaInfo.description,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://morar.dev",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body suppressHydrationWarning>
        <PersonSchema />
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
