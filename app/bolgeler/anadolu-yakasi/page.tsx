import type { Metadata } from "next";
import Link from "next/link";
import { anadoluDistricts } from "@/lib/data/districts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PhoneButton, WhatsAppButton } from "@/components/CtaButtons";
import { FaqSection } from "@/components/FaqSection";
import { TowImageGallery } from "@/components/TowImageGallery";
import { socialMeta } from "@/lib/seo";

const TITLE = "İstanbul Anadolu Yakası 7/24 Çekici Hizmeti";
const DESCRIPTION =
  "Kadıköy, Üsküdar, Ümraniye, Maltepe, Kartal, Pendik dahil Anadolu Yakası'nın 14 ilçesinde 7/24 oto çekici ve yol yardım hizmeti. Hemen arayın: 0535 404 80 44";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/bolgeler/anadolu-yakasi" },
  ...socialMeta("/bolgeler/anadolu-yakasi", "anadolu-yakasi", "Anadolu Yakası", {
    title: TITLE,
    description: DESCRIPTION,
  }),
};

const faqs = [
  { q: "Anadolu Yakası'nın hangi ilçelerine hizmet veriyorsunuz?", a: "Adalar, Ataşehir, Beykoz, Çekmeköy, Kadıköy, Kartal, Maltepe, Pendik, Sancaktepe, Sultanbeyli, Şile, Tuzla, Ümraniye ve Üsküdar dahil 14 ilçenin tamamına 7/24 hizmet veriyoruz." },
  { q: "Anadolu Yakası'nda ortalama varış süreniz nedir?", a: "Merkezi ilçelerde (Kadıköy, Üsküdar, Ümraniye) ortalama 15-25 dakika, uzak ilçelerde (Şile, Beykoz'un kuzeyi) 30-60 dakika arasında değişir." },
  { q: "Anadolu Yakası'ndan Avrupa Yakası'na araç taşıyor musunuz?", a: "Evet, köprüler veya Avrasya Tüneli üzerinden karşı yakaya düzenli taşıma yapıyoruz." },
  { q: "Gece de Anadolu Yakası'nda hizmet veriyor musunuz?", a: "Evet, 7/24 nöbetçi ekiplerimiz Anadolu Yakası'nın tüm ilçelerinde gece dahil hizmet verir." },
  { q: "Şile ve Beykoz gibi uzak ilçelere gerçekten geliyor musunuz?", a: "Evet, bu ilçeler düzenli hizmet bölgemizdir; uzaklık nedeniyle varış süresini baştan net söyleriz." },
  { q: "TEM ve D-100 otoyollarının Anadolu Yakası kesimlerinde hizmetiniz var mı?", a: "Evet, her iki otoyolun Anadolu Yakası'ndaki tüm kesimlerine otoyol güvenlik prosedürüyle müdahale ediyoruz." },
  { q: "Anadolu Yakası çekici ücreti ne kadar?", a: "Ücret ilçeye, mesafeye ve araç tipine göre değişir. Fiyat almak için hemen arayınız: 0535 404 80 44." },
  { q: "Ağır vasıta (kamyon, TIR) hizmetiniz Anadolu Yakası'nda var mı?", a: "Evet, özellikle Tuzla ve Pendik sanayi bölgelerinde ağır vasıta kurtarma hizmeti veriyoruz." },
  { q: "Kaza sonrası Anadolu Yakası'nda hizmet alabilir miyim?", a: "Evet, kaza sonrası hasarlı araç çekimi ve sigorta süreci yönlendirmesi Anadolu Yakası'nın tüm ilçelerinde mevcuttur." },
  { q: "Elektrikli araçlar için Anadolu Yakası'nda özel hizmetiniz var mı?", a: "Evet, elektrikli araçları yalnızca kayar platformla taşıyoruz ve en yakın hızlı şarj istasyonuna yönlendirme yapıyoruz." },
];

export default function AnadoluYakasiPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Bölgelerimiz", href: "/bolgeler" }, { name: "Anadolu Yakası", href: "/bolgeler/anadolu-yakasi" }]} />
      <section className="mx-auto max-w-3xl px-4 pb-6">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">
          İstanbul Anadolu Yakası 7/24 Çekici Hizmeti
        </h1>
        <p className="mt-4 text-lg font-medium text-[#2d3f57]">
          Anadolu Yakası'nın 14 ilçesinin tamamında — Adalar'dan Şile'ye, Kadıköy'den Tuzla'ya — 0535 404 80 44
          numarasından 7/24 oto çekici ve yol yardım hizmeti alabilirsiniz.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <PhoneButton />
          <WhatsAppButton />
        </div>
        <div className="prose-tow mt-8">
          <p>
            Anadolu Yakası, TEM Otoyolu'nun Kavacık-Sultanbeyli hattı, D-100'ün Kadıköy-Tuzla kesimi ve iki
            büyük Boğaz köprüsünün (15 Temmuz Şehitler Köprüsü ve Fatih Sultan Mehmet Köprüsü) Anadolu ayakları
            ile örülü bir trafik ağına sahiptir. Bu ağın her noktasında konumlanmış ekiplerimizle ilçe merkezlerine
            ortalama 15-25 dakikada, Şile ve Beykoz'un kuzey kesimleri gibi uzak noktalara 30-60 dakikada ulaşıyoruz.
          </p>
        </div>
        <TowImageGallery seed="anadolu-yakasi" keyword="Anadolu Yakası" />
      </section>
      <section className="mx-auto max-w-3xl px-4 py-6">
        <h2 className="mb-4 text-xl font-bold text-[var(--color-navy-900)]">Anadolu Yakası İlçeleri</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {anadoluDistricts.map((d) => (
            <Link key={d.slug} href={`/bolgeler/${d.slug}`} className="rounded-lg border border-[var(--color-navy-100)] bg-white px-4 py-3 text-sm font-medium hover:border-[var(--color-cta-500)]">
              {d.name} Çekici Hizmeti
            </Link>
          ))}
        </div>
      </section>
      <FaqSection faqs={faqs} />
    </>
  );
}
