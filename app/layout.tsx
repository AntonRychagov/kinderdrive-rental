import type { Metadata, Viewport } from "next";
import { landingData } from "@/lib/landing-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: landingData.seo.title,
  description: landingData.seo.description,
  keywords: landingData.seo.keywords,
  openGraph: {
    title: landingData.seo.openGraphTitle,
    description: landingData.seo.openGraphDescription,
    type: "website",
    locale: "ru_RU"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
