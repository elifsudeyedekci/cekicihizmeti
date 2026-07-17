import type { Metadata } from "next";
import { SITE, STATS } from "@/lib/config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PhoneButton, WhatsAppButton } from "@/components/CtaButtons";
import { TrustBadges, StatsCounter } from "@/components/TrustBadges";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "İstanbul'un 39 ilçesinde K1 belgeli, sigortalı ve 7/24 çalışan oto çekici ve yol yardım ekibi. Kim olduğumuzu ve nasıl çalıştığımızı öğrenin.",
  alternates: { canonical: "/hakkimizda" },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Hakkımızda", href: "/hakkimizda" }]} />
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">Hakkımızda</h1>
        <p className="mt-4 text-lg font-medium text-[#2d3f57]">
          {SITE.legalName}, İstanbul'un tüm ilçelerinde 7/24 oto çekici, yol yardım ve oto kurtarma
          hizmeti veren K1 yetki belgeli, sigortalı bir kuruluştur.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <PhoneButton />
          <WhatsAppButton />
        </div>

        <div className="prose-tow mt-8">
          <h2>Kim Olduğumuz</h2>
          <p>
            {SITE.foundingYear} yılından bu yana İstanbul'da faaliyet gösteriyoruz. Bu süre içinde
            binlerce sürücüye yolun ortasında, gecenin bir yarısında veya kaza sonrası en zor anlarında
            yardımcı olduk. Bugün {STATS.yearsInService}+ yıllık deneyimimizle, Anadolu ve Avrupa
            Yakası'nın 39 ilçesinin tamamına ortalama {STATS.avgArrivalMinutes} dakikada ulaşan bir
            ekip büyüttük.
          </p>

          <h2>Ne Yapıyoruz</h2>
          <p>
            Oto çekici, 7/24 acil müdahale, kaza sonrası araç çekme, ağır vasıta (kamyon/TIR/otobüs)
            kurtarma, motosiklet taşıma, lüks ve elektrikli araç için hassas taşıma, şehirlerarası araç
            nakli, akü takviyesi, lastik değişimi ve yakıt ikmali hizmetlerini tek numaradan
            sağlıyoruz. Binek araçtan ağır vasıtaya, klasik otomobilden elektrikli araca kadar her araç
            tipi için doğru ekipmanla çalışıyoruz.
          </p>

          <h2>Nasıl Çalışıyoruz</h2>
          <p>
            Aradığınızda önce durumu telefonda dinliyor, mümkünse yerinde çözüm (akü takviyesi, lastik
            değişimi) sunuyoruz — her arıza çekici gerektirmez ve biz gereksiz masraf çıkarmayı tercih
            etmiyoruz. Çekim gerekiyorsa, aracınızın tipine uygun platformla (kompakt, standart, alçak
            tavanlı veya ağır hizmet) hasarsız taşıma yapıyor, yükleme öncesi ve sonrası fotoğraflı
            durum raporu düzenliyoruz.
          </p>
          <p>
            Fiyat konusunda tek bir kuralımız var: hiçbir sayfada rakam paylaşmıyoruz, ancak arayan
            herkese telefonda anında ve net fiyat bilgisi veriyoruz. Sürpriz ek ücret uygulamıyoruz.
          </p>

          <h2>Güvenlik ve Belgelendirme</h2>
          <p>
            {SITE.k1Belge} olarak resmi kayıtlı şekilde faaliyet gösteriyoruz. Taşımalarımız
            sigortalıdır; aracınızın taşıma sürecindeki durumunu fotoğraflı raporla belgeliyoruz. Gece
            operasyonlarında güvenliğiniz için ekibimiz yola çıktığında plaka ve sürücü bilgisini
            SMS/WhatsApp ile paylaşır.
          </p>

          <h2>Neden Bize Güvenebilirsiniz</h2>
          <p>
            Bugüne kadar {STATS.vehiclesRescued.toLocaleString("tr-TR")}+ aracı güvenle kurtardık.
            İstanbul'un {STATS.districtsCovered} ilçesinin tamamında hizmet veriyor, ilçeye özgü trafik
            düzenini, otoyol yaklaşımlarını ve mahalle dokusunu bilen ekiplerle çalışıyoruz. Amacımız
            basit: yolda kaldığınız anda, en kısa sürede, güvenle yanınızda olmak.
          </p>
        </div>
      </article>

      <TrustBadges />
      <StatsCounter />
    </>
  );
}
