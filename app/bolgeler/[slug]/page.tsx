import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { districts, getDistrict, districtMapEmbed, YAKA_LABEL } from "@/lib/data/districts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { BlogEndCta } from "@/components/BlogEndCta";
import { ArrivalTable } from "@/components/ArrivalTable";
import { PhoneButton, WhatsAppButton, ShareLocationButton } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { SITE } from "@/lib/config";
import { TowImageGallery } from "@/components/TowImageGallery";
import { socialMeta } from "@/lib/seo";

const RESERVED = ["anadolu-yakasi", "avrupa-yakasi"];

export function generateStaticParams() {
  return districts.filter((d) => !RESERVED.includes(d.slug)).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDistrict(slug);
  if (!d) return {};
  const arrival = /\d/.test(d.arrivalMinutes) ? `ortalama ${d.arrivalMinutes} dk varış süresi` : d.arrivalMinutes.toLowerCase();
  const title = `${d.name} Çekici Hizmeti | 7/24 — 0535 404 80 44`;
  const description = `${d.name}'de 7/24 oto çekici ve yol yardım hizmeti veriyoruz. K1 belgeli, sigortalı ekibimizle ${arrival}. Hemen arayın: 0535 404 80 44`;
  const path = `/bolgeler/${d.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    ...socialMeta(path, d.slug, d.name, { title, description }),
  };
}

export default async function DistrictPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (RESERVED.includes(slug)) notFound();
  const d = getDistrict(slug);
  if (!d) notFound();

  const neighbors = d.neighbors.map((n) => getDistrict(n)).filter((n): n is NonNullable<typeof n> => Boolean(n));

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `${d.name} Çekici Hizmeti`,
          description: d.intro,
          url: `${SITE.url}/bolgeler/${d.slug}`,
          areaName: `${d.name}, İstanbul`,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Bölgelerimiz", href: "/bolgeler" },
          { name: YAKA_LABEL[d.yaka], href: `/bolgeler/${d.yaka === "anadolu" ? "anadolu-yakasi" : "avrupa-yakasi"}` },
          { name: d.name, href: `/bolgeler/${d.slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">
          {d.name} Çekici Hizmeti
        </h1>
        <p className="mt-4 text-lg font-medium text-[#2d3f57]">{d.intro}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <PhoneButton />
          <WhatsAppButton message={`Merhaba, ${d.name}'de aracım bozuldu.`} />
          <ShareLocationButton message={`Merhaba, ${d.name}'de konumum:`} />
        </div>

        <TowImageGallery seed={d.slug} keyword={d.name} />

        <h2 className="mt-8 mb-3 text-xl font-bold text-[var(--color-navy-900)]">Tahmini Varış Süreleri</h2>
        <ArrivalTable rows={d.arrivalTable} />

        <div className="prose-tow mt-6">
          <h2>Hizmet Bölgesi</h2>
          <p>
            {d.name} sınırları içinde <strong>{d.neighborhoods.join(", ")}</strong> mahallelerine ve
            <strong> {d.roads.join(", ")}</strong> güzergâhlarına 7/24 hizmet veriyoruz. Bilinen noktalar:{" "}
            {d.landmarks.join(", ")}.
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-[var(--color-navy-100)]">
          <iframe
            title={`${d.name} haritası`}
            src={districtMapEmbed(d.name)}
            className="h-72 w-full"
            loading="lazy"
          />
        </div>

        <div className="prose-tow mt-6">
          <Link href={`/blog/${d.slug}-cekici-hizmeti`}>
            {d.name} hakkında daha detaylı bilgi ve yerel rehber için blog yazımızı okuyun →
          </Link>
        </div>
      </article>

      <FaqSection faqs={d.faqs.slice(0, 6)} />

      {neighbors.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-6">
          <h2 className="mb-4 text-xl font-bold text-[var(--color-navy-900)]">Komşu İlçeler</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {neighbors.map((n) => (
              <li key={n.slug}>
                <Link href={`/bolgeler/${n.slug}`} className="block rounded-lg border border-[var(--color-navy-100)] px-4 py-3 hover:border-[var(--color-cta-500)]">
                  {n.name} Çekici Hizmeti
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <BlogEndCta context={`${d.name} Çekici Hizmeti`} />
    </>
  );
}
