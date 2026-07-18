import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data/services";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PhoneButton, WhatsAppButton } from "@/components/CtaButtons";
import { FaqSection } from "@/components/FaqSection";
import { TowImageGallery } from "@/components/TowImageGallery";

export const metadata: Metadata = {
  title: "Fiyatlandırma",
  description:
    "Çekici ve yol yardım hizmetlerimizde ücret; mesafe, araç tipi ve işlemin zorluğuna göre belirlenir. Fiyat almak için hemen arayın: 0535 404 80 44",
  alternates: { canonical: "/fiyatlandirma" },
};

const faqs = [
  { q: "Neden sitede fiyat/rakam yazmıyorsunuz?", a: "Çekici ücreti; mesafe, araç tipi, saat (gece/gündüz) ve işlemin zorluğuna (kaza, ağır vasıta, arazi kurtarma vb.) göre değişir. Sabit bir rakam yazmak yanıltıcı olur; bu yüzden her çağrıda size özel, net fiyatı telefonda anında veriyoruz." },
  { q: "Fiyatı ne zaman öğrenebilirim?", a: "Aradığınız anda, aracınızın konumu ve durumunu öğrendikten sonra telefonda net fiyat bilgisi veriyoruz — beklemeden karar verebilirsiniz." },
  { q: "Sürpriz ek ücret çıkar mı?", a: "Hayır. Telefonda verdiğimiz fiyat nettir; işlem sırasında durum değişmedikçe ek ücret talep etmiyoruz." },
  { q: "Ödeme yöntemleriniz nedir?", a: "Nakit, kredi kartı ve havale/IBAN ile ödeme alıyor, talep halinde fatura düzenliyoruz." },
  { q: "Mesafe fiyatı nasıl etkiliyor?", a: "Genel kural: mesafe arttıkça ücret artar. Ancak İstanbul içi çoğu çağrıda fark küçüktür; net tutarı telefonda öğrenirsiniz." },
  { q: "Araç tipi (SUV, ticari, ağır vasıta) fiyatı değiştirir mi?", a: "Evet; ağır vasıta, lüks araç veya özel ekipman gerektiren işlemler (arazi kurtarma, hasarlı araç yükleme) farklı ekipman gerektirdiği için ücret buna göre belirlenir." },
  { q: "Gece ücreti farklı mı?", a: "Gece/gündüz koşullarını arama sırasında öğrenebilirsiniz; her durumda net fiyatı size anında bildiriyoruz." },
  { q: "Kasko/sigorta çekici ücretini karşılar mı?", a: "Çoğu kasko poliçesinde çekme-kurtarma teminatı vardır; faturamızı dosyanızda kullanabilirsiniz. Poliçenize göre değişir, sigortanızla teyit etmenizi öneririz." },
  { q: "Şehirlerarası taşımada fiyat nasıl belirlenir?", a: "Mesafe, araç tipi ve taşıma seçeneğine (tek araç/çoklu taşıyıcı) göre belirlenir. Fiyat almak için hemen arayınız." },
  { q: "Fiyat teklifini nasıl alabilirim?", a: "0535 404 80 44 numarasını arayın veya WhatsApp'tan yazın; konumunuzu ve aracınızın durumunu belirtin, size hemen net fiyat bilgisi verelim." },
];

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Fiyatlandırma", href: "/fiyatlandirma" }]} />
      <article className="mx-auto max-w-3xl px-4 pb-4">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">Fiyatlandırma</h1>
        <p className="mt-4 text-lg font-medium text-[#2d3f57]">
          Çekici ücreti; mesafe, araç tipi, saat ve işlemin zorluğuna göre değişir. Bu yüzden sitede
          rakam paylaşmıyoruz — ama merak etmeyin, aradığınız anda size özel net fiyatı telefonda
          anında veriyoruz.
        </p>
        <div className="mt-6 rounded-xl bg-[var(--color-cta-50)] p-6 text-center ring-1 ring-[var(--color-cta-200)]">
          <p className="text-xl font-extrabold text-[var(--color-navy-900)]">
            Fiyat almak için hemen arayınız: 0535 404 80 44
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <PhoneButton />
            <WhatsAppButton />
          </div>
        </div>

        <TowImageGallery seed="fiyatlandirma" keyword="Fiyatlandırma" />

        <div className="prose-tow mt-8">
          <h2>Ücreti Ne Belirler</h2>
          <ul>
            <li>Aracınızın bulunduğu ilçe ve taşınacağı mesafe</li>
            <li>Araç tipi (binek, SUV, ticari, motosiklet, ağır vasıta, elektrikli, lüks)</li>
            <li>İşlemin zorluğu (standart çekim, kaza sonrası hasarlı yükleme, arazi/vinçli kurtarma)</li>
            <li>Saat (gece/gündüz, hafta sonu/tatil)</li>
            <li>Ek hizmet ihtiyacı (yakıt ikmali, çoklu araç, şehirlerarası taşıma)</li>
          </ul>
          <h2>Hizmetlerimiz</h2>
          <p>Aşağıdaki hizmetlerimizin tümü için fiyat bilgisini telefonda anında alabilirsiniz:</p>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/hizmetler/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
      <FaqSection faqs={faqs} title="Fiyatlandırma Hakkında Sık Sorulan Sorular" />
    </>
  );
}
