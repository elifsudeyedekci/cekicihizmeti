import type { Metadata } from "next";
import { SITE } from "@/lib/config";
import { districtMapEmbed } from "@/lib/data/districts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PhoneButton, WhatsAppButton, ShareLocationButton } from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${SITE.name} ile 7/24 iletişime geçin: ${SITE.phone} numarasından arayın veya WhatsApp'tan yazın. İstanbul'un her ilçesine hizmet veriyoruz.`,
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "İletişim", href: "/iletisim" }]} />
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">İletişim</h1>
        <p className="mt-4 text-lg font-medium text-[#2d3f57]">
          Aracınız yolda kaldıysa beklemeyin — 7/24 buradayız. En hızlı yol telefonla aramak veya
          WhatsApp'tan konumunuzu paylaşmaktır.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <a href={SITE.phoneHref} className="rounded-xl bg-[var(--color-navy-900)] p-5 text-center text-white">
            <div className="text-sm text-[var(--color-navy-300)]">Telefon</div>
            <div className="mt-1 text-xl font-bold">{SITE.phone}</div>
          </a>
          <div className="rounded-xl bg-white p-5 text-center ring-1 ring-[var(--color-navy-100)]">
            <div className="text-sm text-[#5a6b80]">Çalışma Saatleri</div>
            <div className="mt-1 text-xl font-bold text-[var(--color-navy-900)]">7/24 Kesintisiz</div>
          </div>
          <div className="rounded-xl bg-white p-5 text-center ring-1 ring-[var(--color-navy-100)]">
            <div className="text-sm text-[#5a6b80]">Hizmet Bölgesi</div>
            <div className="mt-1 text-xl font-bold text-[var(--color-navy-900)]">İstanbul (39 İlçe)</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <PhoneButton />
          <WhatsAppButton />
          <ShareLocationButton />
        </div>

        <div className="prose-tow mt-8">
          <h2>Bize Nasıl Ulaşırsınız</h2>
          <p>
            En hızlı iletişim yolu telefon: {SITE.phone}. Yazışmayı tercih ediyorsanız WhatsApp
            üzerinden yazabilir, konumunuzu tek tıkla paylaşabilirsiniz. Sitede yapay zekâ destekli
            canlı sohbet veya form kullanmıyoruz — doğrudan bir insana ulaşıyorsunuz.
          </p>
          <h2>E-posta</h2>
          <p>Acil olmayan sorularınız için: {SITE.email}</p>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-[var(--color-navy-100)]">
          <iframe
            title="İstanbul hizmet bölgesi haritası"
            src={districtMapEmbed("İstanbul")}
            className="h-80 w-full"
            loading="lazy"
          />
        </div>
      </article>
    </>
  );
}
