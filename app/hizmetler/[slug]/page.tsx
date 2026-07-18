import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/data/services";
import { districts } from "@/lib/data/districts";
import { highways } from "@/lib/data/highways";
import type { Service, ServiceSection } from "@/lib/data/types";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { BlogEndCta } from "@/components/BlogEndCta";
import { PhoneButton, WhatsAppButton } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { RichParagraph } from "@/components/RichParagraph";
import { serviceSchema } from "@/lib/schema";
import { SITE } from "@/lib/config";
import { TowImageGallery } from "@/components/TowImageGallery";
import { socialMeta } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const path = `/hizmetler/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: path },
    ...socialMeta(path, service.slug, service.shortName, {
      title: service.metaTitle,
      description: service.metaDescription,
    }),
  };
}

/** Bu hizmetin verildiği ilçelerden bir örneklem — gerçek yol/landmark verisiyle, dahili linkli. */
function serviceDistrictCoverage(service: Service): ServiceSection {
  const step = Math.max(1, Math.floor(districts.length / 16));
  const sample = districts.filter((_, i) => i % step === 0).slice(0, 16);
  const paragraphs = sample.map(
    (d) =>
      `**${d.name}**: [${d.name}'de ${service.shortName.toLowerCase()} ihtiyacınızda](/bolgeler/${d.slug}) ${d.roads[0]} güzergâhı ve ${d.landmarks[0]} çevresi dahil tüm mahallelere ortalama ${d.arrivalMinutes} dakikada ulaşıyoruz.`
  );
  return { heading: `İstanbul'un Çeşitli İlçelerinde ${service.shortName} Hizmeti`, paragraphs };
}

/** İlgili otoyol/köprü rehberlerine dahili link — otoyol sayfaları /blog altında yayınlanıyor. */
function serviceHighwayCoverage(service: Service): ServiceSection {
  const sample = highways.slice(0, 5);
  const paragraphs = sample.map(
    (h) =>
      `**${h.name}**: [${h.name} üzerinde arıza yaptıysanız](/blog/${h.slug}-arac-arizasi-cekici) ${service.shortName.toLowerCase()} ekibimiz güvenlik prosedürüyle 7/24 müdahale eder.`
  );
  return { heading: `Otoyol ve Köprülerde ${service.shortName}`, paragraphs };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.relatedServiceSlugs
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.metaDescription,
          url: `${SITE.url}/hizmetler/${service.slug}`,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Hizmetlerimiz", href: "/hizmetler" },
          { name: service.name, href: `/hizmetler/${service.slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">{service.name}</h1>
        <p className="mt-4 text-lg font-medium text-[#2d3f57]">{service.intro}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <PhoneButton />
          <WhatsAppButton />
        </div>

        <div className="prose-tow mt-8">
          {service.description.map((p, i) => (
            <RichParagraph key={i} text={p} />
          ))}
        </div>

        <TowImageGallery seed={service.slug} keyword={service.shortName} />

        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 rounded-lg bg-[var(--color-navy-50)] px-4 py-3 text-sm font-medium text-[var(--color-navy-900)]">
              <span aria-hidden="true">✓</span>
              {b}
            </li>
          ))}
        </ul>

        <div className="prose-tow mt-8">
          {(service.sections ?? []).map((section, i) => (
            <section key={i}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <RichParagraph key={j} text={p} />
              ))}
            </section>
          ))}

          {[serviceDistrictCoverage(service), serviceHighwayCoverage(service)].map((section, i) => (
            <section key={`coverage-${i}`}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <RichParagraph key={j} text={p} />
              ))}
            </section>
          ))}
        </div>
      </article>

      <FaqSection faqs={service.faqs} />

      {related.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-6">
          <h2 className="mb-4 text-xl font-bold text-[var(--color-navy-900)]">İlgili Hizmetler</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {related.map((s) => (
              <li key={s.slug}>
                <Link href={`/hizmetler/${s.slug}`} className="block rounded-lg border border-[var(--color-navy-100)] px-4 py-3 hover:border-[var(--color-cta-500)]">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <BlogEndCta context={service.name} />
    </>
  );
}
