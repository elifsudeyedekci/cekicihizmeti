import type { Metadata } from "next";
import Link from "next/link";
import { avrupaDistricts } from "@/lib/data/districts";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PhoneButton, WhatsAppButton } from "@/components/CtaButtons";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "İstanbul Avrupa Yakası 7/24 Çekici Hizmeti",
  description:
    "Beşiktaş, Şişli, Bakırköy, Bağcılar, Esenyurt dahil Avrupa Yakası'nın 25 ilçesinde 7/24 oto çekici ve yol yardım hizmeti. Hemen arayın: 0535 404 80 44",
  alternates: { canonical: "/bolgeler/avrupa-yakasi" },
};

const faqs = [
  { q: "Avrupa Yakası'nın hangi ilçelerine hizmet veriyorsunuz?", a: "Arnavutköy'den Zeytinburnu'na, Beşiktaş'tan Silivri'ye kadar Avrupa Yakası'nın 25 ilçesinin tamamına 7/24 hizmet veriyoruz." },
  { q: "Avrupa Yakası'nda ortalama varış süreniz nedir?", a: "Merkezi ilçelerde (Şişli, Bakırköy, Bağcılar) ortalama 15-25 dakika, uzak ilçelerde (Silivri, Çatalca) 35-60 dakika arasında değişir." },
  { q: "Avrupa Yakası'ndan Anadolu Yakası'na araç taşıyor musunuz?", a: "Evet, köprüler veya Avrasya Tüneli üzerinden karşı yakaya düzenli taşıma yapıyoruz." },
  { q: "TEM ve D-100 otoyollarının Avrupa Yakası kesimlerinde hizmetiniz var mı?", a: "Evet, Mahmutbey, Habipler, Bayrampaşa, Avcılar dahil her iki otoyolun tüm kesimlerine otoyol güvenlik prosedürüyle müdahale ediyoruz." },
  { q: "İstanbul Havalimanı çevresinde hizmetiniz var mı?", a: "Evet, Arnavutköy ve Başakşehir üzerinden havalimanı çevresine ve bağlantı yollarına düzenli hizmet veriyoruz." },
  { q: "Gece de Avrupa Yakası'nda hizmet veriyor musunuz?", a: "Evet, 7/24 nöbetçi ekiplerimiz Avrupa Yakası'nın tüm ilçelerinde gece dahil hizmet verir." },
  { q: "Silivri ve Çatalca gibi uzak ilçelere gerçekten geliyor musunuz?", a: "Evet, bu ilçeler düzenli hizmet bölgemizdir; uzaklık nedeniyle varış süresini baştan net söyleriz." },
  { q: "Avrupa Yakası çekici ücreti ne kadar?", a: "Ücret ilçeye, mesafeye ve araç tipine göre değişir. Fiyat almak için hemen arayınız: 0535 404 80 44." },
  { q: "Ağır vasıta (kamyon, TIR) hizmetiniz Avrupa Yakası'nda var mı?", a: "Evet, özellikle Ambarlı, Hadımköy ve İkitelli sanayi bölgelerinde ağır vasıta kurtarma hizmeti veriyoruz." },
  { q: "Elektrikli araçlar için Avrupa Yakası'nda özel hizmetiniz var mı?", a: "Evet, elektrikli araçları yalnızca kayar platformla taşıyoruz ve en yakın hızlı şarj istasyonuna yönlendirme yapıyoruz." },
];

export default function AvrupaYakasiPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Bölgelerimiz", href: "/bolgeler" }, { name: "Avrupa Yakası", href: "/bolgeler/avrupa-yakasi" }]} />
      <section className="mx-auto max-w-3xl px-4 pb-6">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">
          İstanbul Avrupa Yakası 7/24 Çekici Hizmeti
        </h1>
        <p className="mt-4 text-lg font-medium text-[#2d3f57]">
          Avrupa Yakası'nın 25 ilçesinin tamamında — Arnavutköy'den Zeytinburnu'na, Beşiktaş'tan Silivri'ye — 0535 404 80 44
          numarasından 7/24 oto çekici ve yol yardım hizmeti alabilirsiniz.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <PhoneButton />
          <WhatsAppButton />
        </div>
        <div className="prose-tow mt-8">
          <p>
            Avrupa Yakası, TEM Otoyolu'nun Mahmutbey-Hadımköy hattı, D-100'ün Silivri-Topkapı kesimi, İstanbul
            Havalimanı bağlantı yolları ve Boğaz köprülerinin Avrupa ayakları ile geniş bir trafik ağına
            sahiptir. Bu ağın her noktasında konumlanmış ekiplerimizle ilçe merkezlerine ortalama 15-25
            dakikada, Silivri ve Çatalca gibi uzak noktalara 35-60 dakikada ulaşıyoruz.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-6">
        <h2 className="mb-4 text-xl font-bold text-[var(--color-navy-900)]">Avrupa Yakası İlçeleri</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {avrupaDistricts.map((d) => (
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
