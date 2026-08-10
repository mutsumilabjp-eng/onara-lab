import type { Metadata } from "next";
import "./globals.css";
import "./release.css";
import { siteConfig } from "./site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s｜${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: { index: siteConfig.isPublicRelease, follow: siteConfig.isPublicRelease },
  openGraph: { type: "website", locale: "ja_JP", siteName: siteConfig.name, title: siteConfig.name, description: siteConfig.description, url: siteConfig.url },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
