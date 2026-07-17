import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data/services";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PhoneButton, WhatsAppButton } from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "Hizmetlerimiz — Oto Çekici, Yol Yardım, Kaza Çekicisi",
  description:
    "İstanbul'da 7/24 oto çekici, yol yardım, kaza sonrası araç çekme, ağır vasıta, motosiklet, lüks/elektrikli araç ve şehirlerarası taşıma hizmetleri.",
  alternates: { canonical: "/hizmetler" },
};

export default function ServicesHubPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Hizmetlerimiz", href: "/hizmetler" }]} />
      <section className="mx-auto max-w-5xl px-4 pb-6">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">Hizmetlerimiz</h1>
        <p className="mt-3 max-w-2xl text-[#2d3f57]">
          İstanbul'un 39 ilçesinde 7/24 çekici ve yol yardım hizmeti veriyoruz. Aşağıdan ihtiyacınıza
          uygun hizmeti seçebilir veya doğrudan arayabilirsiniz.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <PhoneButton />
          <WhatsAppButton />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/hizmetler/${s.slug}`}
              className="rounded-xl border border-[var(--color-navy-100)] bg-white p-5 transition-colors hover:border-[var(--color-cta-500)]"
            >
              <h2 className="font-bold text-[var(--color-navy-900)]">{s.name}</h2>
              <p className="mt-2 text-sm text-[#5a6b80] line-clamp-3">{s.intro}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
