import type { Metadata } from "next";
import { SITE } from "@/lib/config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TowImageGallery } from "@/components/TowImageGallery";
import { socialMeta } from "@/lib/seo";

const TITLE = "Gizlilik ve Çerez Politikası";
const DESCRIPTION =
  "Çekici Hizmeti İstanbul web sitesinde kullanılan çerezler, Google Analytics/Yandex Metrica gibi üçüncü taraf araçlar ve gizlilik uygulamalarımız hakkında bilgi.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...socialMeta("/gizlilik-politikasi", "gizlilik-politikasi", "İstanbul", { title: TITLE, description: DESCRIPTION }),
  alternates: { canonical: "/gizlilik-politikasi" },
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Gizlilik ve Çerez Politikası", href: "/gizlilik-politikasi" }]} />
      <article className="mx-auto max-w-3xl px-4 pb-12">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">
          Gizlilik ve Çerez Politikası
        </h1>
        <p className="mt-2 text-sm text-[#5a6b80]">Son güncelleme: 15.01.2026</p>

        <TowImageGallery seed="gizlilik-politikasi" keyword="İstanbul" count={2} />

        <div className="prose-tow mt-6">
          <h2>1. Genel Bilgi</h2>
          <p>
            {SITE.legalName} olarak, {SITE.domain} web sitesini ziyaret eden kullanıcılarımızın
            gizliliğine önem veriyoruz. Bu politika, sitemizde çerezlerin nasıl kullanıldığını ve
            gizlilik uygulamalarımızı açıklar. Kişisel verilerinizin işlenmesine dair detaylı bilgi
            için <a href="/kvkk">KVKK Aydınlatma Metni</a>'ni inceleyebilirsiniz.
          </p>

          <h2>2. Çerez Nedir</h2>
          <p>
            Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza kaydedilen küçük metin
            dosyalarıdır. Sitemizi daha iyi çalıştırmak, tercihlerinizi hatırlamak ve site
            performansını ölçmek için çerezler kullanıyoruz.
          </p>

          <h2>3. Kullandığımız Çerez Kategorileri</h2>
          <ul>
            <li>
              <strong>Zorunlu Çerezler:</strong> Sitenin temel işlevleri (örn. çıkış amaçlı popup'ın
              tekrar gösterilmemesi, konum önerisinin hatırlanması) için gereklidir; kapatılamaz.
            </li>
            <li>
              <strong>Analitik Çerezler:</strong> Google Analytics 4 (GA4) ve Yandex Metrica ile site
              trafiğini, hangi sayfaların ziyaret edildiğini ve kullanıcı davranışlarını anonim/istatistiksel
              olarak ölçmek için kullanılır.
            </li>
            <li>
              <strong>Pazarlama/Retargeting Çerezleri:</strong> Meta (Facebook/Instagram) ve Google Ads
              piksel/etiketleri ile daha önce sitemizi ziyaret eden kullanıcılara ilgili reklamların
              gösterilmesi amacıyla kullanılabilir.
            </li>
          </ul>

          <h2>4. Kullandığımız Üçüncü Taraf Araçlar</h2>
          <ul>
            <li>Google Analytics 4 ve Google Tag Manager (site trafiği ve dönüşüm ölçümü)</li>
            <li>Yandex Metrica ve Yandex Webmaster (Türkiye trafiği analizi)</li>
            <li>Google Search Console ve Bing Webmaster Tools (arama motoru performansı)</li>
            <li>WhatsApp Business (iletişim ve mesajlaşma)</li>
            <li>Google Haritalar (harita gömme)</li>
          </ul>
          <p>
            Bu araçların her biri kendi gizlilik politikalarına tabidir; ilgili sağlayıcıların
            gizlilik politikalarını incelemenizi öneririz.
          </p>

          <h2>5. Çerezleri Nasıl Yönetebilirsiniz</h2>
          <p>
            Tarayıcınızın ayarlarından çerezleri silebilir, engelleyebilir veya çerez kabul
            etmeden önce bilgilendirilmeyi tercih edebilirsiniz. Zorunlu çerezleri devre dışı
            bırakmanız, sitenin bazı işlevlerinin (örn. konum önerisi) düzgün çalışmamasına neden
            olabilir.
          </p>

          <h2>6. Veri Güvenliği</h2>
          <p>
            Sitemiz SSL/HTTPS ile şifrelenmiştir. Kişisel verileriniz, yetkisiz erişime karşı makul
            teknik ve idari tedbirlerle korunmaktadır.
          </p>

          <h2>7. İletişim</h2>
          <p>
            Bu politika hakkında sorularınız için {SITE.email} adresinden veya {SITE.phone}{" "}
            numarasından bize ulaşabilirsiniz.
          </p>
        </div>
      </article>
    </>
  );
}
