import type { Metadata } from "next";
import { SITE } from "@/lib/config";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
};

export default function KvkkPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "KVKK Aydınlatma Metni", href: "/kvkk" }]} />
      <article className="mx-auto max-w-3xl px-4 pb-12">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">
          KVKK Aydınlatma Metni
        </h1>
        <p className="mt-2 text-sm text-[#5a6b80]">Son güncelleme: 15.01.2026</p>

        <div className="prose-tow mt-6">
          <h2>1. Veri Sorumlusunun Kimliği</h2>
          <p>
            İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") madde 10
            uyarınca, veri sorumlusu sıfatıyla <strong>{SITE.legalName}</strong> ("Şirket") tarafından,
            hizmetlerimizden faydalanan kişilerin kişisel verilerinin işlenmesine ilişkin usul ve
            esaslar hakkında sizleri bilgilendirmek amacıyla hazırlanmıştır. İletişim bilgilerimize{" "}
            <a href="/iletisim">İletişim</a> sayfasından ulaşabilirsiniz.
          </p>

          <h2>2. İşlenen Kişisel Veri Kategorileri</h2>
          <ul>
            <li><strong>Kimlik Bilgisi:</strong> Ad, soyad.</li>
            <li><strong>İletişim Bilgisi:</strong> Telefon numarası, WhatsApp iletişim bilgisi, e-posta adresi (iletişime geçtiğiniz durumlarda).</li>
            <li><strong>Konum Bilgisi:</strong> Hizmet talebiniz sırasında paylaştığınız veya tarayıcı/cihaz izniyle elde edilen konum bilgisi.</li>
            <li><strong>Araç Bilgisi:</strong> Araç plakası, marka/model bilgisi (hizmetin ifası için).</li>
            <li><strong>İşlem Güvenliği Bilgisi:</strong> IP adresi, çerez kayıtları, log kayıtları.</li>
            <li><strong>Finansal Bilgi:</strong> Fatura düzenlenmesi için gerekli bilgiler (ödeme kartı bilgileriniz tarafımızca saklanmaz).</li>
          </ul>

          <h2>3. Kişisel Verilerin İşlenme Amaçları</h2>
          <ul>
            <li>Çekici, yol yardım ve ilgili hizmetlerin talep edilmesi, planlanması ve ifası,</li>
            <li>Hizmet kalitesinin ölçülmesi ve iyileştirilmesi,</li>
            <li>Müşteri ilişkileri yönetimi ve iletişim süreçlerinin yürütülmesi,</li>
            <li>Faturalandırma ve muhasebe süreçlerinin yürütülmesi,</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi ve talep/şikâyetlerin yönetilmesi,</li>
            <li>Web sitesi güvenliğinin ve işlerliğinin sağlanması (çerezler dahil).</li>
          </ul>

          <h2>4. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
          <p>
            Kişisel verileriniz; telefon görüşmesi, WhatsApp yazışması, web sitesi üzerinden yapılan
            etkileşimler ve çerezler aracılığıyla, KVKK madde 5/2 kapsamındaki "bir sözleşmenin
            kurulması veya ifasıyla doğrudan doğruya ilgili olması", "veri sorumlusunun hukuki
            yükümlülüğünü yerine getirebilmesi için zorunlu olması" ve "ilgili kişinin temel hak ve
            özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati" hukuki sebeplerine
            dayanılarak işlenmektedir.
          </p>

          <h2>5. Kişisel Verilerin Aktarılması</h2>
          <p>
            Kişisel verileriniz; yasal yükümlülüklerimiz kapsamında yetkili kamu kurum ve kuruluşlarına,
            hizmetin ifası için iş birliği yaptığımız iş ortaklarına (örn. sigorta şirketleri, anlaşmalı
            servisler) ve hizmet aldığımız tedarikçilere (örn. barındırma, analitik hizmet sağlayıcılar)
            KVKK'nın 8. ve 9. maddelerinde belirtilen şartlar dahilinde aktarılabilmektedir.
          </p>

          <h2>6. Saklama Süresi</h2>
          <p>
            Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen
            (örneğin Vergi Usul Kanunu kapsamında fatura kayıtları için 5 yıl) zamanaşımı süreleri
            boyunca saklanır; süre sonunda silinir, yok edilir veya anonim hale getirilir.
          </p>

          <h2>7. İlgili Kişinin Hakları (KVKK Madde 11)</h2>
          <p>KVKK'nın 11. maddesi uyarınca, Şirketimize başvurarak;</p>
          <ul>
            <li>Kişisel verinizin işlenip işlenmediğini öğrenme,</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
            <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
            <li>Yurt içinde/yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
            <li>Eksik/yanlış işlenmişse düzeltilmesini isteme,</li>
            <li>KVKK'da öngörülen şartlar çerçevesinde silinmesini/yok edilmesini isteme,</li>
            <li>Düzeltme/silme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme,</li>
            <li>İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
            <li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.</li>
          </ul>
          <p>
            Bu haklarınıza ilişkin taleplerinizi <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{" "}
            adresine veya {SITE.phone} numarasına ulaşarak iletebilirsiniz.
          </p>
        </div>
      </article>
    </>
  );
}
