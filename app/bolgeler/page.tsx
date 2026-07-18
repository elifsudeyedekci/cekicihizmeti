import type { Metadata } from "next";
import Link from "next/link";
import { anadoluDistricts, avrupaDistricts } from "@/lib/data/districts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PhoneButton, WhatsAppButton } from "@/components/CtaButtons";
import { TowImageGallery } from "@/components/TowImageGallery";
import { socialMeta } from "@/lib/seo";

const TITLE = "Bölgelerimiz — İstanbul'un 39 İlçesinde Çekici Hizmeti";
const DESCRIPTION =
  "Anadolu Yakası ve Avrupa Yakası'nın tüm ilçelerinde 7/24 oto çekici ve yol yardım hizmeti. İlçenizi seçin, tahmini varış sürenizi görün.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/bolgeler" },
  ...socialMeta("/bolgeler", "bolgeler", "İstanbul'un 39 ilçesi", { title: TITLE, description: DESCRIPTION }),
};

export default function RegionsHubPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Bölgelerimiz", href: "/bolgeler" }]} />
      <section className="mx-auto max-w-5xl px-4 pb-6">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">Bölgelerimiz</h1>
        <p className="mt-3 max-w-2xl text-[#2d3f57]">
          İstanbul'un 39 ilçesinin tamamında 7/24 çekici hizmeti veriyoruz. Bölgenizi seçerek tahmini
          varış sürenizi ve o bölgeye özel bilgileri görebilirsiniz.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <PhoneButton />
          <WhatsAppButton />
        </div>
        <TowImageGallery seed="bolgeler" keyword="İstanbul'un 39 ilçesi" />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/bolgeler/anadolu-yakasi" className="rounded-xl bg-[var(--color-navy-900)] p-6 text-white">
            <h2 className="text-xl font-bold">Anadolu Yakası</h2>
            <p className="mt-1 text-sm text-[var(--color-navy-200)]">{anadoluDistricts.length} ilçe</p>
          </Link>
          <Link href="/bolgeler/avrupa-yakasi" className="rounded-xl bg-[var(--color-navy-900)] p-6 text-white">
            <h2 className="text-xl font-bold">Avrupa Yakası</h2>
            <p className="mt-1 text-sm text-[var(--color-navy-200)]">{avrupaDistricts.length} ilçe</p>
          </Link>
        </div>
      </section>

      {[
        { label: "Anadolu Yakası İlçeleri", list: anadoluDistricts },
        { label: "Avrupa Yakası İlçeleri", list: avrupaDistricts },
      ].map((group) => (
        <section key={group.label} className="mx-auto max-w-5xl px-4 py-6">
          <h2 className="mb-4 text-xl font-bold text-[var(--color-navy-900)]">{group.label}</h2>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {group.list.map((d) => (
              <Link
                key={d.slug}
                href={`/bolgeler/${d.slug}`}
                className="rounded-lg border border-[var(--color-navy-100)] bg-white px-4 py-3 text-sm font-medium hover:border-[var(--color-cta-500)]"
              >
                {d.name}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
