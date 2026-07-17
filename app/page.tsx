import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config";
import { services } from "@/lib/data/services";
import { districts } from "@/lib/data/districts";
import { posts } from "@/lib/blog/registry";
import { PhoneButton, WhatsAppButton } from "@/components/CtaButtons";
import { TrustBadges, StatsCounter } from "@/components/TrustBadges";
import { GeoDetect } from "@/components/GeoDetect";
import { FaqSection } from "@/components/FaqSection";
import { PillarContentSection } from "@/components/PillarContentSection";

export const metadata: Metadata = {
  title: `${SITE.name} | 7/24 Oto Çekici, Yol Yardım — ${SITE.phone}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

const FEATURED_SERVICE_SLUGS = [
  "oto-cekici-hizmeti",
  "7-24-cekici-hizmeti",
  "kaza-sonrasi-arac-cekme",
  "yol-yardim-hizmeti",
  "agir-vasita-kamyon-cekici",
  "elektrikli-arac-cekici",
  "aku-takviyesi",
  "sehirlerarasi-cekici",
];

const homeFaqs = [
  { q: "İstanbul'un her ilçesine geliyor musunuz?", a: "Evet, Adalar'dan Şile'ye, Çatalca'dan Silivri'ye kadar İstanbul'un 39 ilçesinin tamamına 7/24 hizmet veriyoruz." },
  { q: "Çekici ne kadar sürede gelir?", a: "Merkezi ilçelerde ortalama 15-25 dakika, uzak ilçelerde (Şile, Çatalca, Silivri) 35-60 dakika arasında değişir. Konumunuzu WhatsApp'tan paylaşırsanız net süre veririz." },
  { q: "Fiyatlarınız ne kadar?", a: "Ücret mesafeye, araç tipine ve işlemin zorluğuna göre değişir. Fiyat almak için hemen arayınız: 0535 404 80 44." },
  { q: "Gece de hizmet veriyor musunuz?", a: "Evet, 7/24 nöbetçi ekiplerimiz gece dahil kesintisiz hizmet verir; gece varış sürelerimiz genellikle daha kısadır." },
  { q: "Aracım çekilirken hasar görür mü?", a: "Hayır; kayar platformlu (flatbed) araçlarımızla dört tekerleği yerden kesilmiş şekilde, sabitleyerek taşıyoruz. Yükleme öncesi/sonrası fotoğraflı durum raporu düzenliyoruz." },
  { q: "Otomatik vitesli, elektrikli veya dört çeker aracım nasıl çekilir?", a: "Bu araçlar kesinlikle tam platformda taşınır; tekerlek üzerinde çekim aktarma organlarına ve elektrikli araçlarda motora zarar verir. Biz her zaman üretici prosedürüne uygun taşırız." },
  { q: "Kaza sonrası aracımı çekebilir misiniz?", a: "Evet; tutanak/tespit süreci tamamlandıktan sonra hasarlı aracınızı vinç destekli platformla güvenle yükleyip istediğiniz servise veya otoparka taşırız." },
  { q: "Kasko/sigorta çekici masrafını karşılar mı?", a: "Çoğu kasko poliçesinde çekme-kurtarma teminatı vardır; faturamızı dosyanızda kullanabilirsiniz. Detay için arayın, süreçte yol gösteririz." },
  { q: "Ağır vasıta (kamyon, TIR, otobüs) çekiyor musunuz?", a: "Evet, tonaja uygun ağır hizmet kurtarıcılarımızla kamyon, TIR, otobüs ve iş makinesi taşıyoruz." },
  { q: "Şehirlerarası araç taşıma yapıyor musunuz?", a: "Evet, İstanbul'dan Türkiye'nin 81 iline sigortalı, fotoğraflı raporlu araç taşıma hizmetimiz var." },
  { q: "Ödeme yöntemleriniz nedir?", a: "Nakit, kredi kartı ve havale/IBAN ile ödeme alıyor, fatura düzenliyoruz." },
  { q: "K1 belgeniz ve sigortanız var mı?", a: "Evet, K1 yetki belgeli ve sigortalı olarak resmi kayıtlı şekilde hizmet veriyoruz." },
];

export default function HomePage() {
  const featuredServices = FEATURED_SERVICE_SLUGS.map((slug) => services.find((s) => s.slug === slug)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s)
  );
  const featuredDistricts = districts.slice(0, 8);
  const featuredPosts = posts.slice(0, 6);

  return (
    <>
      <section className="bg-[var(--color-navy-900)] py-14 text-white md:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-semibold">
            🕐 7/24 Kesintisiz Hizmet
          </p>
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            İstanbul'un Her Yerinde 7/24 Oto Çekici ve Yol Yardım
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-navy-200)]">
            Aracınız bozulduysa, kaza yaptıysanız veya yolda kaldıysanız 0535 404 80 44 numarasını
            arayın. İstanbul'un 39 ilçesine ortalama 20-40 dakikada, K1 belgeli ve sigortalı ekiplerle
            ulaşıyoruz.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <PhoneButton className="text-lg" />
            <WhatsAppButton className="text-lg" />
          </div>
        </div>
      </section>

      <div className="py-4">
        <GeoDetect />
      </div>

      <TrustBadges />
      <StatsCounter />

      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-[var(--color-navy-900)] md:text-3xl">Hizmetlerimiz</h2>
          <Link href="/hizmetler" className="text-sm font-semibold text-[var(--color-cta-600)]">
            Tümünü Gör →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((s) => (
            <Link
              key={s.slug}
              href={`/hizmetler/${s.slug}`}
              className="rounded-xl border border-[var(--color-navy-100)] bg-white p-5 transition-colors hover:border-[var(--color-cta-500)]"
            >
              <h3 className="font-bold text-[var(--color-navy-900)]">{s.shortName}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-[#5a6b80]">{s.intro}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-navy-50)] py-10">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-[var(--color-navy-900)] md:text-3xl">Bölgelerimiz</h2>
            <Link href="/bolgeler" className="text-sm font-semibold text-[var(--color-cta-600)]">
              39 İlçenin Tümü →
            </Link>
          </div>
          <div className="mb-4 flex flex-wrap gap-3">
            <Link href="/bolgeler/anadolu-yakasi" className="rounded-lg bg-[var(--color-navy-900)] px-5 py-3 font-semibold text-white">
              Anadolu Yakası
            </Link>
            <Link href="/bolgeler/avrupa-yakasi" className="rounded-lg bg-[var(--color-navy-900)] px-5 py-3 font-semibold text-white">
              Avrupa Yakası
            </Link>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDistricts.map((d) => (
              <Link key={d.slug} href={`/bolgeler/${d.slug}`} className="rounded-lg border border-[var(--color-navy-100)] bg-white px-4 py-3 text-sm font-medium hover:border-[var(--color-cta-500)]">
                {d.name} Çekici
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="mb-6 text-2xl font-bold text-[var(--color-navy-900)] md:text-3xl">Neden Bizi Tercih Etmelisiniz</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "K1 Belgeli, Sigortalı", d: "Resmi kayıtlı, sigortalı taşıma ile aracınız güvende." },
            { t: "Gerçek 7/24 Hizmet", d: "Gece dahil telefonu her zaman açan nöbetçi ekip." },
            { t: "Hasarsız Taşıma", d: "Kayar platformla dört tekerlek yerden kesilerek taşıma." },
            { t: "39 İlçenin Tamamı", d: "Şile'den Silivri'ye İstanbul'un her noktasına ulaşıyoruz." },
            { t: "Şeffaf Süreç", d: "Yükleme öncesi/sonrası fotoğraflı durum raporu." },
            { t: "Net Fiyat Bilgisi", d: "Telefonda anında ve net fiyat, sürpriz yok." },
          ].map((item) => (
            <div key={item.t} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[var(--color-navy-100)]">
              <h3 className="font-bold text-[var(--color-navy-900)]">{item.t}</h3>
              <p className="mt-2 text-sm text-[#5a6b80]">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="bg-[var(--color-navy-50)] py-10">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-2xl font-bold text-[var(--color-navy-900)] md:text-3xl">Rehberlerimiz</h2>
              <Link href="/blog" className="text-sm font-semibold text-[var(--color-cta-600)]">
                Tüm Yazılar →
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-lg border border-[var(--color-navy-100)] bg-white px-4 py-3 text-sm font-medium hover:border-[var(--color-cta-500)]">
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqSection faqs={homeFaqs} title="Sık Sorulan Sorular" />

      <PillarContentSection />
    </>
  );
}
