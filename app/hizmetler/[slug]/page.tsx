import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/data/services";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { BlogEndCta } from "@/components/BlogEndCta";
import { PhoneButton, WhatsAppButton } from "@/components/CtaButtons";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { SITE } from "@/lib/config";
import { TowImageGallery } from "@/components/TowImageGallery";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/hizmetler/${service.slug}` },
  };
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
            <p key={i}>{p}</p>
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
