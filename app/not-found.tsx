import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data/services";
import { districts } from "@/lib/data/districts";
import { PhoneButton, WhatsAppButton } from "@/components/CtaButtons";
import { SiteSearch } from "@/components/SiteSearch";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı (404) | Çekici Hizmeti İstanbul",
  description:
    "Aradığınız sayfa bulunamadı. Çekici ve yol yardım için 0535 404 80 44'ü arayın veya sitede arama yapıp aradığınız ilçe/hizmet sayfasına ulaşın.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const popularServices = services.slice(0, 6);
  const popularDistricts = districts.slice(0, 8);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 text-center">
      <p className="text-7xl font-extrabold text-[var(--color-navy-100)]">404</p>
      <h1 className="mt-2 text-2xl font-bold text-[var(--color-navy-900)] md:text-3xl">
        Aradığınız sayfayı bulamadık
      </h1>
      <p className="mt-3 text-[#2d3f57]">
        Ama merak etmeyin — aracınızla ilgili yardıma ihtiyacınız varsa hemen arayabilir veya aşağıdan
        aradığınızı bulabilirsiniz.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <PhoneButton />
        <WhatsAppButton />
      </div>

      <div className="mt-8">
        <SiteSearch />
      </div>

      <div className="mt-10 text-left">
        <h2 className="mb-3 text-lg font-bold text-[var(--color-navy-900)]">Popüler Hizmetler</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {popularServices.map((s) => (
            <Link key={s.slug} href={`/hizmetler/${s.slug}`} className="rounded-lg border border-[var(--color-navy-100)] bg-white px-4 py-3 text-sm font-medium hover:border-[var(--color-cta-500)]">
              {s.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 text-left">
        <h2 className="mb-3 text-lg font-bold text-[var(--color-navy-900)]">Popüler İlçeler</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {popularDistricts.map((d) => (
            <Link key={d.slug} href={`/bolgeler/${d.slug}`} className="rounded-lg border border-[var(--color-navy-100)] bg-white px-4 py-3 text-sm font-medium hover:border-[var(--color-cta-500)]">
              {d.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-sm font-semibold text-[var(--color-cta-600)] underline">
          Anasayfaya dön
        </Link>
      </div>
    </div>
  );
}
