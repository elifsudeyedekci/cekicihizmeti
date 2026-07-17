import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/config";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCallBar } from "@/components/StickyCallBar";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { Analytics } from "@/components/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | 7/24 Oto Çekici, Yol Yardım — ${SITE.phone}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE.name,
    url: SITE.url,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={localBusinessSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCallBar />
        <ExitIntentPopup />
        <Analytics />
      </body>
    </html>
  );
}
