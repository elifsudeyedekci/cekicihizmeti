import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { socialMeta } from "@/lib/seo";
import { AraResults } from "./AraResults";

const TITLE = "Sitede Ara — Çekici Hizmeti İstanbul";
const DESCRIPTION =
  "İlçe, marka, hizmet veya otoyol adıyla sitede arama yapın; aradığınız çekici ve yol yardım sayfasına doğrudan ulaşın.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ara" },
  robots: { index: false, follow: true },
  ...socialMeta("/ara", "ara", "Sitede Ara", { title: TITLE, description: DESCRIPTION }),
};

export default function SearchPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Sitede Ara", href: "/ara" }]} />
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">Sitede Ara</h1>
        <p className="mt-3 text-[#2d3f57]">
          İlçe, marka, hizmet veya otoyol adı yazın; size en uygun sayfaya hemen yönlendirelim.
        </p>
        <Suspense fallback={null}>
          <AraResults />
        </Suspense>
      </section>
    </>
  );
}
