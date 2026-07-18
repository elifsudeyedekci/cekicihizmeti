import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/config";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCallBar } from "@/components/StickyCallBar";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { AnalyticsHead, AnalyticsBodyStart } from "@/components/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} | 7/24 Oto Çekici, Yol Yardım`,
  description:
    "İstanbul'un 39 ilçesinde 7/24 oto çekici ve yol yardım veriyoruz. K1 belgeli, sigortalı taşıma, ortalama 20-40 dakika varış. Hemen arayın: 0535 404 80 44",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE.name,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: SITE.name,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#10233b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`}>
      <head>
        <AnalyticsHead />
      </head>
      <body className="flex min-h-full flex-col">
        <AnalyticsBodyStart />
        <JsonLd data={localBusinessSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCallBar />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
