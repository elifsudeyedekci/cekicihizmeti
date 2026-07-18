import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { PhoneButton, WhatsAppButton } from "@/components/CtaButtons";
import { TowImageGallery } from "@/components/TowImageGallery";
import { socialMeta } from "@/lib/seo";

const TITLE = "Sık Sorulan Sorular";
const DESCRIPTION =
  "Çekici hizmeti, fiyatlandırma, sigorta, gece hizmeti ve daha fazlası hakkında sık sorulan sorular ve cevapları.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/sss" },
  ...socialMeta("/sss", "sss", "Sık Sorulan Sorular", { title: TITLE, description: DESCRIPTION }),
};

const faqs = [
  { q: "İstanbul'un her ilçesine geliyor musunuz?", a: "Evet, Adalar'dan Şile'ye, Çatalca'dan Silivri'ye kadar İstanbul'un 39 ilçesinin tamamına 7/24 hizmet veriyoruz." },
  { q: "Çekici ne kadar sürede gelir?", a: "Merkezi ilçelerde ortalama 15-25 dakika, uzak ilçelerde (Şile, Çatalca, Silivri) 35-60 dakika arasında değişir. Konumunuzu WhatsApp'tan paylaşırsanız net süre veririz." },
  { q: "Fiyatlarınız ne kadar?", a: "Ücret mesafeye, araç tipine ve işlemin zorluğuna göre değişir; sitede rakam paylaşmıyoruz. Fiyat almak için hemen arayınız: 0535 404 80 44." },
  { q: "Gece de hizmet veriyor musunuz?", a: "Evet, 7/24 nöbetçi ekiplerimiz gece dahil kesintisiz hizmet verir; gece varış sürelerimiz genellikle daha kısadır." },
  { q: "Gece çekici çağırmak güvenli mi?", a: "Evet; ekibimiz yola çıktığında plaka ve sürücü bilgisini SMS/WhatsApp ile gönderir. Bu teyidi almadan aracınızı kimseye teslim etmeyin." },
  { q: "Aracım çekilirken hasar görür mü?", a: "Hayır; kayar platformlu (flatbed) araçlarımızla dört tekerleği yerden kesilmiş şekilde, sabitleyerek taşıyoruz. Yükleme öncesi/sonrası fotoğraflı durum raporu düzenliyoruz." },
  { q: "Otomatik vitesli, elektrikli veya dört çeker aracım nasıl çekilir?", a: "Bu araçlar kesinlikle tam platformda taşınır; tekerlek üzerinde çekim aktarma organlarına ve elektrikli araçlarda motora zarar verir." },
  { q: "Vites P'de kilitli veya el freni çekili aracım çekilebilir mi?", a: "Evet, tekerlek paletleri (go-jack) ile kilitli tekerlekli araçları da hasarsız platforma alıyoruz." },
  { q: "Kaza sonrası aracımı çekebilir misiniz?", a: "Evet; tutanak/tespit süreci tamamlandıktan sonra hasarlı aracınızı vinç destekli platformla güvenle yükleyip istediğiniz servise veya otoparka taşırız." },
  { q: "Kasko/sigorta çekici masrafını karşılar mı?", a: "Çoğu kasko poliçesinde çekme-kurtarma teminatı vardır; faturamızı dosyanızda kullanabilirsiniz. Detay için arayın, süreçte yol gösteririz." },
  { q: "Ağır vasıta (kamyon, TIR, otobüs) çekiyor musunuz?", a: "Evet, tonaja uygun ağır hizmet kurtarıcılarımızla kamyon, TIR, otobüs ve iş makinesi taşıyoruz." },
  { q: "Motosiklet taşıyor musunuz?", a: "Evet, motosiklete özel bağlama aparatlı platformumuzla hasarsız taşıma yapıyoruz." },
  { q: "Lüks/spor aracım için hassas taşıma var mı?", a: "Evet, düşük açılı rampa, tekstil kayış ve fotoğraflı rapor içeren lüks araç protokolümüzle taşıyoruz." },
  { q: "Elektrikli aracım nasıl taşınır?", a: "Elektrikli araçlar yalnızca kayar platformla taşınır; tekerlek üzerinde çekim motor ve rejeneratif fren sistemine zarar verebilir." },
  { q: "Şehirlerarası araç taşıma yapıyor musunuz?", a: "Evet, İstanbul'dan Türkiye'nin 81 iline sigortalı, fotoğraflı raporlu araç taşıma hizmetimiz var." },
  { q: "Akü takviyesi ne kadar sürede gelir?", a: "İstanbul içinde ortalama 15-30 dakikada yerinde takviye yapıyoruz." },
  { q: "Lastik değişimi yapıyor musunuz?", a: "Evet, yedek lastiğiniz varsa yerinde değiştiriyoruz; yoksa aracı en yakın lastikçiye taşıyoruz." },
  { q: "Yakıt bitince ne yapmalıyım?", a: "Bizi arayın; güvenli taşıma kabıyla ihtiyacınız kadar yakıtı yerinizde getiriyoruz." },
  { q: "Ödeme yöntemleriniz nedir?", a: "Nakit, kredi kartı ve havale/IBAN ile ödeme alıyor, fatura düzenliyoruz." },
  { q: "K1 belgeniz ve sigortanız var mı?", a: "Evet, K1 yetki belgeli ve sigortalı olarak resmi kayıtlı şekilde hizmet veriyoruz." },
];

export default function FaqPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Sık Sorulan Sorular", href: "/sss" }]} />
      <section className="mx-auto max-w-3xl px-4 pb-4">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">Sık Sorulan Sorular</h1>
        <p className="mt-4 text-lg font-medium text-[#2d3f57]">
          Çekici hizmeti hakkında en çok merak edilen sorular ve cevapları. Aradığınızı bulamazsanız
          bizi hemen arayın.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <PhoneButton />
          <WhatsAppButton />
        </div>
        <TowImageGallery seed="sss" keyword="Sık Sorulan Sorular" />
      </section>
      <FaqSection faqs={faqs} title="Tüm Sorular" />
    </>
  );
}
