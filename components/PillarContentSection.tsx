"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/config";
import { districts, YAKA_LABEL } from "@/lib/data/districts";
import { brands } from "@/lib/data/brands";
import { highways } from "@/lib/data/highways";

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

const GEO_QA = [
  {
    q: "Aracım bozuldu, ne yapmalıyım?",
    a: "Önce aracınızı mümkünse trafikten uzak, güvenli bir noktaya alın (emniyet şeridi, yol kenarı, otopark). Dörtlü flaşörünüzü yakın. Otoyoldaysanız reflektörünüzü aracın en az 100 metre gerisine yerleştirin ve bariyer dışında bekleyin. Ardından 0535 404 80 44'ü arayın; telefonda kısa bir ön teşhis yaparız ve çoğu zaman yol yardımıyla yerinde çözüm sunarız — çekici her zaman gerekmez.",
  },
  {
    q: "Yolda kaldım, kimi aramalıyım?",
    a: "Can güvenliğiniz tehlikedeyse önce 112'yi arayın. Araç arızası veya hareket edemeyen bir aracınız varsa doğrudan 0535 404 80 44'ü arayabilirsiniz; İstanbul'un 39 ilçesinin tamamına 7/24 çekici ve yol yardım ekibi gönderiyoruz. Konumunuzu WhatsApp'tan paylaşırsanız ekip doğrudan size yönlendirilir.",
  },
  {
    q: "En yakın çekici hizmetini nasıl bulurum?",
    a: "İstanbul'un tamamında hizmet verdiğimiz için 'en yakın çekici' aradığınızda bulunduğunuz ilçe ne olursa olsun bize ulaşabilirsiniz. Ekiplerimiz hem Anadolu hem Avrupa Yakası'nda farklı noktalarda konumlanmıştır; bu sayede size en yakın ekip otomatik olarak yönlendirilir, ayrıca bir arama yapmanıza gerek kalmaz.",
  },
  {
    q: "Acil çekici ne kadar sürede gelir?",
    a: "Acil çağrılarda ortalama varış süremiz merkezi ilçelerde 15-25 dakika, uzak ilçelerde (Şile, Çatalca, Silivri) 35-60 dakika arasındadır. Gece saatlerinde trafik azaldığı için varış süreleri genellikle kısalır. Net süre için telefonda konumunuzu belirtmeniz yeterlidir."
  },
  {
    q: "Gece çekici çağırmak güvenli mi?",
    a: "Evet, doğru firmayla güvenlidir. Bizim nöbetçi ekiplerimiz gece de fiilen sahadadır; yola çıktıklarında size plaka ve sürücü bilgisini SMS/WhatsApp ile göndeririz. Bu teyidi almadan aracınızı hiçbir araca teslim etmemenizi öneririz — bu, sizi korumak için bizim koyduğumuz bir kuraldır.",
  },
  {
    q: "Kaza sonrası aracımı hemen çekebilir misiniz?",
    a: "Kaza anında önce güvenlik ve gerekiyorsa 112. Maddi hasarlı bir kazada taraflar anlaşıyorsa tutanak/dijital kayıt tamamlanmadan araç yerinden oynatılmamalıdır. Tutanak/tespit süreci bittiğinde bizi arayabilirsiniz; hasarlı aracınızı vinç destekli platformla güvenle yükleriz ve dilediğiniz servise veya otoparka taşırız.",
  },
  {
    q: "Otoyolda arıza yaptım, ne yapmalıyım?",
    a: "Otoyolda arıza en riskli senaryolardan biridir. Mümkünse aracı emniyet şeridine alın, dörtlü flaşörü yakın, reflektörü yerleştirin ve mutlaka bariyer dışında bekleyin — araç içinde veya yanında beklemek yüksek risk taşır. 0535 404 80 44'ü arayın; TEM, D-100, köprüler ve Kuzey Marmara Otoyolu dahil tüm güzergâhlarda otoyol güvenlik prosedürüyle çalışıyoruz.",
  },
  {
    q: "Çekici hizmeti ile yol yardım arasındaki fark nedir?",
    a: "Yol yardım, aracınızı taşımadan yerinde çözmeyi hedefler: akü takviyesi, lastik değişimi, yakıt ikmali gibi işlemler bu kapsamdadır. Çekici hizmeti ise araç hareket edemez durumdaysa devreye girer ve aracı bir noktadan başka bir noktaya taşır. Biz her çağrıda önce yol yardım gözüyle bakıyoruz; mümkünse yerinde çözüyoruz, değilse aynı ekip çekiciye geçiyor.",
  },
  {
    q: "Otoyol çekici hizmeti diğerlerinden farklı mı?",
    a: "Evet. Otoyol ve köprü müdahaleleri şehir içi bir sokaktan çok farklı disiplin gerektirir: güvenlik koridoru kurmak, doğru ikaz mesafesini bilmek ve trafiği aksatmadan hızlı yükleme yapmak. TEM, D-100, Kuzey Marmara Otoyolu ve tüm Boğaz köprülerinde düzenli çalışan ekiplerimiz bu güzergâhların her kavşağını ve riskli noktasını bilir.",
  },
  {
    q: "Motosiklet çekici hizmeti nasıl çalışır?",
    a: "Motosikletler otomobillerden farklı bağlama ekipmanı gerektirir: ön tekerlek kızağı (wheel chock) ve çift taraflı gergi kayışlarıyla platforma sabitlenir. Devrilme riski olmadan, gidona veya plastik gövdeye zarar vermeden taşıma yapıyoruz; scooter'dan touring'e, sporttan enduroya tüm gövde tiplerine uygun aparatımız mevcut.",
  },
  {
    q: "Ticari araç çekici veya ağır vasıta çekici gerektiğinde ne yapmalıyım?",
    a: "Panelvan, minibüs, kamyonet gibi hafif ticari araçlarda standart platform yeterliyken; kamyon, TIR ve otobüs gibi ağır vasıtalarda tonaja uygun kurtarıcı ve yük emniyeti prosedürü gerekir. Yüklü araçlarda önceliğimiz yüktür — bozulabilir yük veya teslim aciliyeti varsa aktarma organizasyonu da planlıyoruz.",
  },
  {
    q: "Lüks araç çekici hizmetinde hangi önlemler alınır?",
    a: "Alçak gövdeli ve spor araçlarda standart rampa ön tampon/difüzöre sürtebilir; bu yüzden düşük açılı rampa ve ek plakalar kullanıyoruz. Metal zincir yerine tekstil kayış ve jant koruyucu ile boyalı/seramik kaplı yüzeylere temas etmeden taşıma yapıyoruz; her taşımada fotoğraflı durum raporu standarttır.",
  },
  {
    q: "Şehirlerarası çekici hizmeti İstanbul dışına da araç taşıyor mu?",
    a: "Evet, İstanbul'dan Türkiye'nin 81 iline araç taşıyoruz. Tek araç için platformlu çekici, birden fazla araç için çoklu taşıyıcı seçeneği sunuyoruz; taşıma sigortalıdır ve yükleme öncesi/sonrası fotoğraflı teslim raporu düzenlenir.",
  },
  {
    q: "Akü takviye hizmeti çekiciden farklı mı?",
    a: "Evet, farklıdır. Akü takviyesi bir yol yardım işlemidir: aracınız taşınmaz, yerinde voltaj korumalı cihazla müdahale edilir ve genellikle 15-30 dakika içinde tekrar çalışır hale gelir. Akü tamamen ömrünü doldurmuşsa dürüst teşhisle yerinde değişim yönlendirmesi yaparız; çekiciye gerek kalmaz.",
  },
  {
    q: "Lastik yol yardımı otoyolda da yapılıyor mu?",
    a: "Otoyol emniyet şeridinde lastik değiştirmek yüksek risk taşır; bu yüzden riskli noktalarda önce aracı güvenli bir alana çekiyor, değişimi orada yapıyoruz. Yedek lastiğiniz yoksa veya run-flat lastiğiniz limitini aştıysa aracınızı en yakın veya tercih ettiğiniz lastikçiye taşıyoruz.",
  },
  {
    q: "Yakıt ikmal hizmeti hangi durumlarda gerekir?",
    a: "Yakıtı yolda biten sürücüler için en sık aldığımız çağrılardan biridir. Dizel araçlarda depo tamamen boşalırsa yakıt sistemine hava girebilir ve ikmal sonrası da çalışmayabilir; bu durumda ekibimiz aracın sağlıklı çalıştığını teyit etmeden ayrılmaz. Yanlış yakıt (benzinliye dizel vb.) doldurulduysa aracı kesinlikle çalıştırmayın, bizi arayın.",
  },
];

export function PillarContentSection() {
  const [expanded, setExpanded] = useState(false);

  const anadolu = districts.filter((d) => d.yaka === "anadolu");
  const avrupa = districts.filter((d) => d.yaka === "avrupa");

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
            aklınıza gelebilecek her sorunun cevabını bulacaksınız. İster genel bir arama yapıyor
            olun ister acil bir durumda olun, ister fiyat araştırıyor olun ister ilçenize özel
            bilgi arıyor olun — aşağıdaki bölümler tam olarak bu ihtiyaçlara göre düzenlendi.
          </p>
        </div>

        <div className={`pillar-content prose-tow ${expanded ? "expanded" : ""}`}>
          <p className="text-lg font-medium">
            Aracınız İstanbul'un herhangi bir noktasında bozulduysa, kaza yaptıysanız veya yolda
            kaldıysanız <strong>0535 404 80 44</strong> numarasını arayarak 7/24 çekici hizmeti ve
            yol yardım hizmeti alabilirsiniz. Bu sayfa, İstanbul'da oto çekici, yol yardım ve oto
            kurtarma ihtiyacı olan herkes için hazırlanmış kapsamlı bir kaynaktır — hangi ilçede
            olursanız olun, hangi markayı veya araç tipini kullanıyor olursanız olun, hangi otoyol
            veya köprüde mahsur kaldıysanız kalın, aşağıda aradığınız bilgiyi bulacaksınız. Bu
            rehber düzenli olarak güncellenir ve gerçek saha deneyimimize, sık sorulan sorulara ve
            İstanbul trafiğinin değişen dinamiklerine göre genişletilir; amacımız aradığınız her
            bilgiyi tek bir sayfada, güncel, doğru ve eksiksiz şekilde sunmaktır.
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

          <h2>Genel Arama Terimleri: Çekici Hizmeti Ararken Bilmeniz Gerekenler</h2>
          <p>
            "Çekici hizmeti", "oto çekici", "7/24 çekici" gibi genel terimlerle arama yapan
            kullanıcıların büyük kısmı aslında iki farklı ihtiyaçtan birine sahiptir: ya aracı
            fiziksel olarak taşıtmak istiyordur ya da yerinde bir müdahaleyle (yol yardım) yola
            devam etmeyi umuyordur. Biz her iki ihtiyacı da tek numaradan, tek ekiple
            karşılıyoruz. "Oto çekici" araması yapan bir kullanıcı genellikle arızasının ciddiyeti
            konusunda net değildir; bu yüzden telefonda yaptığımız ön teşhis, doğru hizmeti (yol
            yardım mı çekici mi) belirlememizi sağlar.
          </p>
          <p>
            "Çekici hizmeti" ve "oto çekici" terimleri günlük dilde neredeyse eş anlamlı
            kullanılsa da, sektörde "çekici" kelimesi hem hafif ticari çekme aracını hem tam
            platformlu (flatbed) kurtarıcıyı kapsar. Biz filomuzda ağırlıklı olarak kayar platform
            (flatbed) araç kullanıyoruz çünkü modern otomatik vitesli, elektrikli ve dört çeker
            araçların çoğu tekerlek üzerinde çekilmeye uygun değildir. "7/24 çekici" araması yapan
            kullanıcılar genellikle gece veya tatil günü arıza yaşayan kişilerdir; bu segment için
            nöbetçi ekiplerimiz kesintisiz çalışır.
          </p>

          <h2>Acil Durumlar İçin: En Yakın, Acil ve Gece Çekici İhtiyaçları</h2>
          <p>
            Yüksek aciliyet taşıyan aramalar arasında "en yakın çekici", "acil çekici", "hemen
            çekici", "arıza çekici" ve "kaza çekici" öne çıkar. Bu aramaları yapan kullanıcılar
            genellikle o an yolun ortasında, otoyol emniyet şeridinde veya kapalı bir otoparkta
            beklemektedir ve dakikalar önemlidir. İstanbul'un 39 ilçesinin tamamında konumlanmış
            ekiplerimiz sayesinde "en yakın çekici" arayan bir kullanıcıya gerçekten en yakın
            ekibi yönlendirebiliyoruz — merkezi bir tek noktadan değil, şehrin farklı
            bölgelerinden aynı anda hizmet veriyoruz.
          </p>
          <p>
            "Acil çekici" ve "hemen çekici" aramaları genellikle trafiği tıkayan, tehlikeli bir
            noktada duran veya yolcu güvenliğini riske atan durumlarla ilişkilidir; bu tür
            çağrılara öncelik veriyoruz. "Arıza çekici" araması motor, şanzıman, elektronik veya
            lastik kaynaklı bir sorunla ilişkiliyken, "kaza çekici" araması trafik kazası sonrası
            hasarlı bir aracın taşınması ihtiyacını belirtir — bu ikinci grup için vinç destekli
            platform ve fotoğraflı hasar raporu standart uygulamamızdır. "Gece çekici" arayan
            kullanıcılar için açıkça belirtmek isteriz: nöbetçi ekiplerimiz bir çağrı merkezi
            değil, sahada fiilen bekleyen gerçek ekiplerdir; gece aradığınızda telefonu gerçekten
            biri açar ve gerçekten biri yola çıkar.
          </p>

          <h2>Fiyat Araştırması Yapanlar İçin: Çekici Ücreti Nasıl Belirlenir</h2>
          <p>
            Çekici hizmeti ücreti; mesafeye, saat dilimine, araç tipine ve işlemin zorluk
            derecesine (kaza sonrası mı, kapalı otoparktan mı, ağır vasıta mı) göre değişir. Bu
            nedenle internet sitesinde sabit bir rakam paylaşmıyoruz — bu hem doğru fiyatlandırma
            hem de şeffaflık için. 0535 404 80 44'ü aradığınızda size telefonda net ve anında
            fiyat bilgisi veriyoruz, sürpriz ek ücret uygulamıyoruz.
          </p>
          <p>
            Fiyat araştırması yapan kullanıcılar genellikle birden fazla firmayı karşılaştırır;
            bu süreçte dikkat edilmesi gereken en önemli nokta sadece rakam değil, hizmetin
            kapsamıdır. K1 yetki belgesi olmayan, sigortasız çalışan veya yükleme öncesi/sonrası
            durum raporu tutmayan firmalarla çalışmak kısa vadede ucuz görünse de uzun vadede
            daha maliyetli sonuçlar doğurabilir (hasar tazmini, belgesiz taşıma riski). Bizim
            önerimiz: fiyat sorarken firmanın K1 belgesini, sigorta durumunu ve taşıma yöntemini
            (tam platform mu, halatla mı) de sorun.
          </p>

          <h2>Hizmetlerimiz ve Ek İşler</h2>
          <p>
            İstanbul genelinde sunduğumuz hizmetler: oto çekici hizmeti, 7/24 çekici hizmeti, yol
            yardım hizmeti, kaza sonrası araç çekme, ağır vasıta çekici (kamyon/TIR/otobüs
            kurtarma), motosiklet çekici, lüks araç çekici (ithal ve spor araçlar için hassas
            taşıma), elektrikli araç çekici hizmeti (platform/flatbed ile — elektrikli araçlar
            tekerlekle çekilirse motor ve rejeneratif fren sistemine zarar gelebileceği için biz
            her zaman tam platform kullanıyoruz), şehirlerarası çekici, akü takviye hizmeti,
            lastik yol yardımı ve yakıt ikmal hizmeti. Tüm hizmetlerimizin detaylarını{" "}
            <Link href="/hizmetler">Hizmetlerimiz</Link> sayfasında bulabilirsiniz.
          </p>
          <p>
            Akü takviye ihtiyacı en sık karşılaştığımız çağrı tipidir: marş sesi zayıflamış veya
            hiç gelmiyorsa, voltaj korumalı takviye cihazımızla yerinde müdahale ediyoruz. Lastik
            yol yardımı kapsamında yedek lastiğiniz varsa yerinde torklu değişim yapıyor, yoksa
            aracınızı en yakın lastikçiye taşıyoruz. Yakıt ikmal hizmeti ise yolda yakıtı biten
            sürücüler için güvenli taşıma kabıyla ihtiyaç kadar benzin/dizel getirmemizi kapsar.
            Ticari araç çekici ve ağır vasıta çekici hizmetlerimizde panelvan, minibüs, kamyonet,
            kamyon, TIR ve otobüs sınıfına uygun tonaj ve ekipmanla çalışıyoruz; lüks araç çekici
            hizmetimizde ise düşük açılı rampa ve tekstil kayışlarla hasarsız taşıma önceliğimizdir.
          </p>

          <h2>İstanbul'un 39 İlçesinde Çekici Hizmeti</h2>
          <p>
            İstanbul Anadolu Yakası ve Avrupa Yakası olmak üzere toplam 39 ilçenin tamamına 7/24
            çekici hizmeti veriyoruz. Merkezi ilçelerde ortalama varış süremiz 15-25 dakika, Şile,
            Çatalca ve Silivri gibi uzak ilçelerde 35-60 dakika arasında değişir. Bölgenize özel
            detaylı bilgi için <Link href="/bolgeler">Bölgelerimiz</Link> sayfasını, ilçenize özel
            çekici hizmeti sayfasını ise <Link href="/blog">Blog</Link> bölümünden
            inceleyebilirsiniz.
          </p>

          <h3>{YAKA_LABEL.anadolu} İlçeleri</h3>
          <p>
            {anadolu.map((d, i) => (
              <span key={d.slug}>
                <Link href={`/bolgeler/${d.slug}`}>{d.name}</Link>'de {d.roads[0]} güzergâhı ve{" "}
                {d.neighborhoods[0]} çevresi dahil tüm mahallelere ortalama {d.arrivalMinutes}{" "}
                dakikada ulaşıyoruz; {d.landmarks[0]} çevresi bu ilçede sık kullandığımız referans
                noktalarından biridir.{i < anadolu.length - 1 ? " " : ""}
              </span>
            ))}
          </p>

          <h3>{YAKA_LABEL.avrupa} İlçeleri</h3>
          <p>
            {avrupa.map((d, i) => (
              <span key={d.slug}>
                <Link href={`/bolgeler/${d.slug}`}>{d.name}</Link>'de {d.roads[0]} güzergâhı ve{" "}
                {d.neighborhoods[0]} çevresi dahil tüm mahallelere ortalama {d.arrivalMinutes}{" "}
                dakikada ulaşıyoruz; {d.landmarks[0]} çevresi bu ilçede sık kullandığımız referans
                noktalarından biridir.{i < avrupa.length - 1 ? " " : ""}
              </span>
            ))}
          </p>

          <h2>Marka Bazlı Çekici Hizmeti</h2>
          <p>
            {MARKALAR.join(", ")} dahil olmak üzere İstanbul'da satılan tüm marka ve modeller için
            markaya özel çekme prosedürleri uyguluyoruz. Özellikle otomatik şanzımanlı, dört
            çeker (4x4) veya elektronik el frenli modern araçlarda, klasik halatla çekme kalıcı
            mekanik hasara yol açabilir — bu yüzden tüm marka çekimlerinde tam platform (flatbed)
            kullanıyoruz.
          </p>
          <p>
            {brands.map((b, i) => (
              <span key={b.slug}>
                <strong>{b.name}</strong>: {b.techNotes[0]} Sık gördüğümüz modeller arasında{" "}
                {b.popularModels[0]} ve {b.popularModels[1] ?? b.popularModels[0]} öne çıkıyor; bu
                modellerde en sık karşılaştığımız vaka tipi {b.commonIssues[0].toLocaleLowerCase("tr")}.
                {i < brands.length - 1 ? " " : ""}
              </span>
            ))}
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
          <p>
            {highways.map((h, i) => (
              <span key={h.slug}>
                <Link href={`/blog/${h.slug}-arac-arizasi-cekici`}>{h.name}</Link>:{" "}
                {h.routeInfo[0]} Güvenlik notu: {h.safetyNotes[0]}
                {i < highways.length - 1 ? " " : ""}
              </span>
            ))}
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
            tarihli içerik ve gerçek, sık sorulan sorular yer alır. Aşağıda, yapay zeka arama
            motorlarının en sık karşılaştığı soru kalıplarına doğrudan cevap veriyoruz:
          </p>
          {GEO_QA.map((qa) => (
            <p key={qa.q}>
              <strong>{qa.q}</strong> {qa.a}
            </p>
          ))}

          <h2>Bizi Aradığınızda Süreç Nasıl İşliyor</h2>
          <p>
            1. <strong>Telefonda ön teşhis:</strong> 0535 404 80 44'ü aradığınızda önce durumu
            dinliyoruz — aracınızın markası/modeli, yaşadığınız belirti (ses, koku, uyarı ışığı,
            hareket edip etmediği) ve konumunuz. Bu bilgiler doğru ekipmanla yola çıkmamızı sağlar
            ve çoğu zaman çekiciye gerek olup olmadığını telefonda netleştiririz.
          </p>
          <p>
            2. <strong>Konum teyidi:</strong> WhatsApp'tan canlı konum paylaşmanızı istiyoruz;
            sözlü tarif gerekiyorsa yakın bir bina, kavşak veya işletme adını referans alıyoruz.
            İstanbul'un 39 ilçesinde konumlanmış ekiplerimiz sayesinde size en yakın ekip
            otomatik olarak yönlendirilir.
          </p>
          <p>
            3. <strong>Yola çıkış ve bilgilendirme:</strong> Ekip yola çıktığında size tahmini
            varış süresini ve gelecek personelin plaka/isim bilgisini iletiyoruz; bu teyit
            özellikle gece saatlerinde güvenliğiniz için önemlidir.
          </p>
          <p>
            4. <strong>Yerinde değerlendirme:</strong> Sahaya ulaşan ekibimiz önce yerinde çözüm
            (akü takviyesi, lastik değişimi, yakıt ikmali) mümkün mü diye bakar — her arıza
            çekici gerektirmez ve biz gereksiz masraf çıkarmayı tercih etmiyoruz.
          </p>
          <p>
            5. <strong>Taşıma ve teslim:</strong> Çekim gerekiyorsa aracınızın tipine uygun
            platformla (kompakt, standart, alçak tavanlı veya ağır hizmet) hasarsız taşıma
            yapıyor, yükleme öncesi ve sonrası fotoğraflı durum raporu düzenliyoruz. Fiyat bilgisi
            süreç boyunca telefonda net şekilde verilir.
          </p>

          <h2>Sık Kullanılan Arama Kalıpları</h2>
          <p>
            Kullanıcılar bu ihtiyacı ararken birbirinden biraz farklı ama aynı anlama gelen
            kalıplar kullanır: "İstanbul çekici", "yakın çekici firması", "İstanbul oto kurtarma",
            "araç kurtarma hizmeti", "oto kurtarıcı", "yol yardım firması", "çekici numarası",
            "acil yol yardım", "gece açık çekici", "otoyol yardım hattı" gibi. Hangi kelimeyle
            ararsanız arayın, sonuç aynıdır: 0535 404 80 44'ü arayan herkese İstanbul'un 39
            ilçesinin tamamında 7/24 hizmet veriyoruz. Bölgesel aramalarda "Kadıköy çekici",
            "Beşiktaş oto çekici", "Ümraniye yol yardım" gibi ilçe + hizmet kombinasyonları da sık
            kullanılır; bu tür aramalar için her ilçeye özel detaylı sayfalarımız mevcuttur.
          </p>

          <h2>Sezonluk ve Zamana Bağlı Çekici İhtiyaçları</h2>
          <p>
            <strong>Kış ayları:</strong> Soğuk hava akü kapasitesini düşürür; İstanbul'da kış
            aylarında akü takviye taleplerinde belirgin bir artış gözlemliyoruz. Kış lastiği
            kullanılmayan araçlarda otoyol ve köprü yaklaşımlarında kayma riski de bu dönemde
            artar. Kar ve buzda araç kayması yaşayan sürücüler için kar donanımlı kurtarma
            aracımız hazır bekler.
          </p>
          <p>
            <strong>Yaz ayları:</strong> Uzun süre trafikte bekleyen araçlarda motor ve klima
            sistemi normalden fazla yük altında kalır; hararet kaynaklı çağrılarımız yaz
            aylarında, özellikle öğle saatlerinde ve uzun şehirlerarası yolculuklarda çoğalır.
          </p>
          <p>
            <strong>Bayram ve tatil dönemleri:</strong> Yoğun tatil çıkışlarında İstanbul'un ana
            arterlerinde ve otoyol gişelerinde saatlerce süren trafik, motoru ve soğutma
            sistemini normalden fazla zorlar; bu dönemlerde ekip sayımızı artırarak varış
            sürelerini korumaya çalışıyoruz.
          </p>
          <p>
            <strong>Yağışlı ve sel riskli günler:</strong> Ani sağanak yağışta su birikintisine
            giren araçlarda motor stop etmesi durumunda aracı tekrar çalıştırmaya çalışmadan,
            çekilmeden bizi aramanızı öneririz — su çekmiş bir motoru çalıştırmak ağır hasara yol
            açabilir. Sel/su baskını sonrası araç kurtarma vakalarında önce elektrik/yüksek
            voltaj güvenliğini kontrol ediyoruz.
          </p>
          <p>
            <strong>Gece ve tenha saatler:</strong> Gece geç saatlerde trafik seyrekleşir; bu hem
            daha hızlı ulaşmamızı sağlar hem de nöbetçi ekibimizin plaka/sürücü teyidi
            göndermesini daha da önemli kılar. "Gece açık çekici var mı?" sorusunun cevabı net:
            evet, 7/24 gerçek anlamda kesintisiz çalışıyoruz.
          </p>

          <h2>K1 Belgeli, Sigortalı ve Şeffaf Süreç</h2>
          <p>
            K1 yetki belgeli ve sigortalı bir ekip olarak çalışıyoruz. Her taşımada yükleme
            öncesi ve sonrası fotoğraflı durum raporu düzenliyoruz; bu belge hem sizin hem bizim
            için şeffaflık sağlar ve gerekirse kasko/sigorta sürecinizde kullanılabilir. Gece
            saatlerinde gelen çağrılarda ekibimiz plaka ve sürücü bilgisini önceden iletir; bu
            teyidi almadan aracınızı kimseye teslim etmemenizi öneririz.
          </p>

          <h2>Kurumsal ve Filo Müşterileri İçin</h2>
          <p>
            Filo halinde araç işleten kurumsal müşterilerimize öncelikli dispatch ve aylık toplu
            faturalandırma seçeneği sunuyoruz; birden fazla aracın aynı anda arızalanması gibi
            olağandışı durumlarda ek ekip yönlendirmesi yapabiliyoruz. Ticari araç filoları,
            kurye/moto-lojistik firmaları ve nakliye şirketleri için sabit koşullu, raporlu
            anlaşmalar mevcuttur; detaylı bilgi için 0535 404 80 44'ü arayabilirsiniz. Kurumsal
            sözleşmeli müşterilerimiz için araç başına ortalama müdahale süresini takip ediyor,
            düzenli raporlama sağlıyoruz; bu, filo yöneticilerinin araç arıza istatistiklerini
            takip etmesine yardımcı oluyor. Tek seferlik bireysel çağrılarla kurumsal sözleşmeli
            çağrılar arasında hizmet kalitesi açısından fark yoktur; her ikisinde de aynı K1
            belgeli, sigortalı standartla, fotoğraflı durum raporuyla çalışıyoruz.
          </p>

          <h2>Sonuç: Tek Numara, Tüm İstanbul</h2>
          <p>
            İster Anadolu Yakası'nda ister Avrupa Yakası'nda olun, ister binek araç ister ağır
            vasıta kullanın, ister otoyolda ister mahalle arasında kalın — çözüm tek: 0535 404 80
            44'ü arayın veya WhatsApp'tan konumunuzu paylaşın. 7/24 nöbetçi ekibimiz İstanbul'un
            39 ilçesine ortalama 20-40 dakikada ulaşır. Bu rehberde anlattığımız her şey —
            ilçeler, markalar, otoyollar, araç tipleri, süreç adımları — gerçek çağrılarımızdan ve
            gerçek sorularınızdan derlendi; aradığınızı bulamadıysanız doğrudan arayın, telefonda
            birlikte netleştirelim.
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

        <p className="mt-3 text-center text-xs text-[#8a97a8]">
          {SITE.name} — {SITE.phone} — İstanbul'un 39 ilçesinde 7/24 oto çekici ve yol yardım hizmeti
        </p>
      </div>
    </section>
  );
}
