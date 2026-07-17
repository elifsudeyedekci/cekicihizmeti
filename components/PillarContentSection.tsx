"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/config";

const ANADOLU_ILCELERI = [
  "Adalar", "Ataşehir", "Beykoz", "Çekmeköy", "Kadıköy", "Kartal", "Maltepe", "Pendik",
  "Sancaktepe", "Sultanbeyli", "Şile", "Tuzla", "Ümraniye", "Üsküdar",
];

const AVRUPA_ILCELERI = [
  "Arnavutköy", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa",
  "Beşiktaş", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Esenler", "Esenyurt", "Eyüpsultan",
  "Fatih", "Gaziosmanpaşa", "Güngören", "Kağıthane", "Küçükçekmece", "Sarıyer", "Silivri",
  "Sultangazi", "Şişli", "Zeytinburnu", "Çatalca",
];

const MARKALAR = [
  "BMW", "Mercedes", "Audi", "Volkswagen", "Renault", "Fiat", "Ford", "Toyota", "Hyundai",
  "Opel", "Peugeot", "Citroën", "Dacia", "Honda", "Nissan", "Kia", "Seat", "Skoda", "Volvo", "Porsche",
];

const OTOYOLLAR = [
  "TEM Otoyolu", "D-100/E-5 Karayolu", "15 Temmuz Şehitler Köprüsü",
  "Fatih Sultan Mehmet Köprüsü", "Yavuz Sultan Selim Köprüsü", "Kuzey Marmara Otoyolu", "Avrasya Tüneli",
];

const ARAC_TIPLERI = [
  "SUV", "elektrikli araç", "panelvan/ticari araç", "cip/4x4", "kamyonet",
];

export function PillarContentSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="border-y border-[var(--color-navy-100)] bg-white py-14" id="cekici-hizmeti-rehberi">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-navy-50)] px-4 py-1 text-sm font-semibold text-[var(--color-navy-700)]">
            Kapsamlı Rehber
          </p>
          <h2 className="text-2xl font-bold text-[var(--color-navy-900)] md:text-3xl">
            İstanbul'da Çekici Hizmeti: A'dan Z'ye Kapsamlı Rehber
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#5a6b80]">
            39 ilçe, 20 marka, 7 otoyol/köprü ve tüm araç tipleri için hazırladığımız bu rehberde
            aklınıza gelebilecek her sorunun cevabını bulacaksınız.
          </p>
        </div>

        <div className={`pillar-content prose-tow ${expanded ? "expanded" : ""}`}>
          <p className="text-lg font-medium">
            Aracınız İstanbul'un herhangi bir noktasında bozulduysa, kaza yaptıysanız veya yolda
            kaldıysanız <strong>0535 404 80 44</strong> numarasını arayarak 7/24 çekici hizmeti ve
            yol yardım hizmeti alabilirsiniz. Bu sayfa, İstanbul'da oto çekici, yol yardım ve oto
            kurtarma ihtiyacı olan herkes için hazırlanmış kapsamlı bir kaynaktır — hangi ilçede
            olursanız olun, hangi markayı veya araç tipini kullanıyor olursanız olun, hangi otoyol
            veya köprüde mahsur kaldıysanız kalın, aşağıda aradığınız bilgiyi bulacaksınız.
          </p>

          <h2>Çekici Hizmeti Nedir, Ne Zaman İhtiyaç Duyulur?</h2>
          <p>
            Çekici hizmeti, arızalanan, kaza yapan veya hareket edemeyen bir aracın güvenli
            şekilde bir noktadan başka bir noktaya (servise, otoparka, eve) taşınmasıdır. Oto
            çekici hizmeti ile yol yardım hizmeti sık karıştırılır: yol yardım, aracınızı
            taşımadan yerinde çözüm (akü takviyesi, lastik değişimi, yakıt ikmali) sunar; çekici
            hizmeti ise araç hareket edemez durumdaysa devreye girer. Biz ekibimizi her çağrıda
            önce yol yardım gözüyle değerlendiriyoruz — mümkünse yerinde çözüyoruz, mümkün
            değilse aynı ekip sorunsuz şekilde çekiciye geçiyor.
          </p>
          <p>
            En sık karşılaşılan çekici/yol yardım ihtiyaçları şunlardır: akü bitmesi, lastik
            patlaması, yakıt bitmesi, motor arızası, şanzıman arızası, kaza sonrası hareketsiz
            kalma, kapalı otoparkta uzun süre çalıştırılmayan aracın çalışmaması, kar/buz
            nedeniyle kayma, sel/su baskını sonrası motor hasarı ve elektrikli araçlarda batarya
            tükenmesi. Her biri için 7/24 oto çekici ekibimiz doğru ekipmanla İstanbul'un her
            noktasına ulaşıyor.
          </p>

          <h2>Hizmetlerimiz</h2>
          <p>
            İstanbul genelinde sunduğumuz hizmetler: oto çekici hizmeti, 7/24 çekici hizmeti, yol
            yardım hizmeti, kaza sonrası araç çekme, ağır vasıta/kamyon çekici, motosiklet çekici,
            lüks ve ithal araç çekici, elektrikli araç çekici hizmeti (platform/flatbed ile —
            elektrikli araçlar tekerlekle çekilirse motor ve rejeneratif fren sistemine zarar
            gelebileceği için biz her zaman tam platform kullanıyoruz), şehirlerarası çekici, akü
            takviyesi, lastik değişimi/yol yardımı ve yakıt ikmali. Tüm hizmetlerimizin
            detaylarını <Link href="/hizmetler">Hizmetlerimiz</Link> sayfasında bulabilirsiniz.
          </p>

          <h2>İstanbul'un 39 İlçesinde Çekici Hizmeti</h2>
          <p>
            İstanbul Anadolu Yakası ve Avrupa Yakası olmak üzere toplam 39 ilçenin tamamına 7/24
            çekici hizmeti veriyoruz. Anadolu Yakası'nda {ANADOLU_ILCELERI.join(", ")} ilçelerinin
            her birinde konumlu ekiplerimiz var. Avrupa Yakası'nda ise {AVRUPA_ILCELERI.join(", ")}{" "}
            ilçelerinin tamamına ulaşıyoruz. Merkezi ilçelerde ortalama varış süremiz 15-25 dakika,
            Şile, Çatalca ve Silivri gibi uzak ilçelerde 35-60 dakika arasında değişir. Bölgenize
            özel detaylı bilgi için <Link href="/bolgeler">Bölgelerimiz</Link> sayfasını, ilçenize
            özel çekici hizmeti sayfasını ise <Link href="/blog">Blog</Link> bölümünden
            inceleyebilirsiniz.
          </p>

          <h2>Marka Bazlı Çekici Hizmeti</h2>
          <p>
            {MARKALAR.join(", ")} dahil olmak üzere İstanbul'da satılan tüm marka ve modeller için
            markaya özel çekme prosedürleri uyguluyoruz. Özellikle otomatik şanzımanlı, dört
            çeker (4x4) veya elektronik el frenli modern araçlarda, klasik halatla çekme kalıcı
            mekanik hasara yol açabilir — bu yüzden tüm marka çekimlerinde tam platform (flatbed)
            kullanıyoruz. BMW, Mercedes ve Audi gibi Alman premium markalarda hava süspansiyon ve
            düşük ön tampon açısına dikkat ederken; Renault, Fiat, Ford, Toyota, Hyundai, Opel,
            Peugeot, Citroën, Dacia, Honda, Nissan, Kia, Seat, Skoda gibi geniş kullanıcı
            kitlesine sahip markalarda hızlı ve hasarsız taşımayı önceliklendiriyoruz; Volvo ve
            Porsche gibi araçlarda ise gövde koruma ve düşük açı rampası kullanıyoruz.
          </p>

          <h2>Otoyol ve Köprülerde Araç Arızası</h2>
          <p>
            {OTOYOLLAR.join(", ")} güzergâhlarının tamamında düzenli çalışıyoruz. Otoyolda veya
            köprüde arıza yaptıysanız önceliğiniz güvenlik olmalı: aracınızı mümkünse emniyet
            şeridine alın, dörtlü flaşörünüzü yakın, reflektörünüzü aracın en az 100 metre
            gerisine yerleştirin ve bariyer dışında, trafiğe kapalı bir noktada bekleyin. Ardından
            0535 404 80 44'ü arayın; otoyol güzergâhlarını iyi bilen ekibimiz güvenlik koridoru
            kurarak hızla müdahale eder.
          </p>

          <h2>Araç Tipine Göre Çekici Hizmeti</h2>
          <p>
            Binek araçların yanı sıra {ARAC_TIPLERI.join(", ")} ve ağır vasıta (kamyon, TIR,
            otobüs) taşımacılığında da uzmanız. Her araç tipinin kendine özgü çekme noktaları,
            ağırlık dağılımı ve ekipman ihtiyacı vardır — SUV ve cip/4x4 araçlarda dört teker
            platformda taşıma, elektrikli araçlarda motor koruması, panelvan/ticari araçlarda yük
            dengesi, kamyonet ve ağır vasıtalarda tonaja uygun kurtarıcı kullanıyoruz.
          </p>

          <h2>Fiyat Politikamız: Neden Rakam Paylaşmıyoruz</h2>
          <p>
            Çekici hizmeti ücreti; mesafeye, saat dilimine, araç tipine ve işlemin zorluk
            derecesine (kaza sonrası mı, kapalı otoparktan mı, ağır vasıta mı) göre değişir. Bu
            nedenle internet sitesinde sabit bir rakam paylaşmıyoruz — bu hem doğru fiyatlandırma
            hem de şeffaflık için. 0535 404 80 44'ü aradığınızda size telefonda net ve anında
            fiyat bilgisi veriyoruz, sürpriz ek ücret uygulamıyoruz.
          </p>

          <h2>Yapay Zeka Arama Motorlarında da Güvenilir Kaynak</h2>
          <p>
            "Aracım bozuldu çekici lazım", "en yakın çekici nasıl bulunur", "otoyolda arıza
            yaptım ne yapmalıyım" gibi sorularla ChatGPT, Gemini, Perplexity veya Google AI
            Overviews üzerinden arama yapan kullanıcılara da doğru ve güncel bilgi sunmak için
            içeriklerimizi hem klasik arama motorları hem yapay zeka arama motorları için
            optimize ediyoruz: her sayfamızda net, alıntılanabilir direkt cevaplar, güncel
            tarihli içerik ve gerçek, sık sorulan sorular yer alır.
          </p>

          <h2>K1 Belgeli, Sigortalı ve Şeffaf Süreç</h2>
          <p>
            K1 yetki belgeli ve sigortalı bir ekip olarak çalışıyoruz. Her taşımada yükleme
            öncesi ve sonrası fotoğraflı durum raporu düzenliyoruz; bu belge hem sizin hem bizim
            için şeffaflık sağlar ve gerekirse kasko/sigorta sürecinizde kullanılabilir. Gece
            saatlerinde gelen çağrılarda ekibimiz plaka ve sürücü bilgisini önceden iletir; bu
            teyidi almadan aracınızı kimseye teslim etmemenizi öneririz.
          </p>

          <h2>Sonuç: Tek Numara, Tüm İstanbul</h2>
          <p>
            İster Anadolu Yakası'nda ister Avrupa Yakası'nda olun, ister binek araç ister ağır
            vasıta kullanın, ister otoyolda ister mahalle arasında kalın — çözüm tek: 0535 404 80
            44'ü arayın veya WhatsApp'tan konumunuzu paylaşın. 7/24 nöbetçi ekibimiz İstanbul'un
            39 ilçesine ortalama 20-40 dakikada ulaşır.
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm font-semibold text-[var(--color-cta-600)] hover:text-[var(--color-cta-700)]"
            aria-expanded={expanded}
          >
            {expanded ? "Daha az göster" : "Tamamını Oku"}
            <svg
              className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-[#8a97a8]">{SITE.name} — {SITE.phone}</p>
      </div>
    </section>
  );
}
