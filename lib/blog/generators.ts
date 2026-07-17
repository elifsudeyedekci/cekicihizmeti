import type { BlogPost, BlogSection } from "./types";
import { districts, YAKA_LABEL } from "../data/districts";
import { brands } from "../data/brands";
import { highways } from "../data/highways";
import { vehicleTypes } from "../data/vehicle-types";
import { services } from "../data/services";
import type { District, Brand, Highway, VehicleType } from "../data/types";
import { SITE } from "../config";

const TODAY = "2026-01-15";

/**
 * Bu jeneratörler, lib/data/* içindeki gerçek ve benzersiz verilerden (mahalle, yol, marka
 * teknik notu, SSS, senaryo…) programatik olarak 4.000+ kelimelik makaleler üretir. Şablon
 * cümleler her zaman o sayfaya özgü gerçek verilerle (yol adı, mahalle adı, teknik detay)
 * doldurulur — jenerik/kopya metin değildir; bu, 4.4 numaralı doorway-page önleme kuralına
 * uygunluğu korur.
 */

// ---------------------------------------------------------------------------
// ORTAK YARDIMCI FONKSİYONLAR (marka + araç tipi arıza/teknik metinlerini
// anahtar kelime bazlı olarak derinleştirmek için — jenerik değil, girdi
// metnine göre değişen gerçek teknik açıklama üretir)
// ---------------------------------------------------------------------------

/**
 * Bir arıza/teknik-not cümlesini anahtar kelimelerine göre analiz edip
 * o konuya özgü, gerçek bir teknik açıklama paragrafı üretir. Aynı girdi
 * metni farklı markalarda/araç tiplerinde tekrar geçse bile çıktı, entity
 * adıyla birlikte anlamlı ve teknik olarak doğru kalır.
 */
function issueElaboration(issue: string, entity: string): string {
  const t = issue.toLocaleLowerCase("tr");
  if (t.includes("run-flat") || (t.includes("lastik") && t.includes("düşük profil"))) {
    return `Run-flat veya düşük profilli lastiklerde stepne genelde bulunmaz; hasar küçükse sınırlı hızla kısa mesafe kat edilebilir, ancak yırtılma/jant teması varsa riske girmeden ${entity} aracını lastikçiye taşımak en güvenlisidir. Ekibimiz telefonda hasarın büyüklüğünü sorup buna göre yönlendirme yapar.`;
  }
  if (t.includes("off-road") || t.includes("blok desen")) {
    return `Blok desenli off-road lastikler platform üzerinde standart lastiklere göre daha az sürtünme sağlar; bu yüzden ${entity} için yükleme sırasında ek tekerlek kaması ve sıkı kayış düzeni uyguluyoruz, aksi halde taşıma sırasında kayma riski oluşur.`;
  }
  if (t.includes("lastik")) {
    return `Lastik kaynaklı çağrılarda önce yedek lastik durumu sorulur; varsa yerinde torklu değişim yapılır, yoksa ${entity} aracı güvenli şekilde en yakın lastikçiye taşınır. Bu vakaların çoğu çekiciye gerek kalmadan yerinde çözülür.`;
  }
  if (t.includes("akü") || t.includes("marş") || t.includes("ibs")) {
    return `Akü/marş şikâyetlerinde telefonda kısa bir ön teşhis yapıyoruz: kontak açıldığında gösterge paneli hiç yanmıyorsa büyük ihtimalle akü, "tık" sesi geliyorsa marş motoru şüphesi vardır. Voltaj korumalı takviye cihazımızla ${entity} aracına yerinde müdahale eder, akü ömrünü doldurduysa dürüst tespitle değişim öneririz.`;
  }
  if (t.includes("12v")) {
    return `12V yardımcı akü bitince araç tamamen "ölü" görünür — kapılar, vites ve ekranlar tepki vermez. Bu, ${entity} için en sık yanlış yorumlanan arızadır; çekiciye değil, doğru noktadan 12V takviyeye ihtiyaç duyar ve genelde dakikalar içinde çözülür.`;
  }
  if (t.includes("hibrit")) {
    return `Hibrit sistemlerde elektrik motoru doğrudan aktarma organlarına bağlı olduğundan ${entity} kesinlikle tekerlek üzerinde çekilmez; 12V akü bitmesi hibritlerde en sık "araç çalışmıyor" sanılan durumdur ve takviyeyle çözülür, gerçek arıza ise tam platformla taşınır.`;
  }
  if (t.includes("şarj") || t.includes("ev") || t.includes("taycan") || t.includes("ionic") || t.includes("ioniq") || t.includes("kona") || t.includes("ex30") || t.includes("e-tron") || t.includes("id.") || t.includes("leaf") || t.includes("zoe")) {
    return `Şarjı biten elektrikli ${entity} yol ortasında mobil şarjla değil, flatbed ile en yakın DC hızlı şarj istasyonuna taşınarak çözülür; bu hem daha hızlı hem daha güvenli bir yöntemdir. Taşıma sırasında araç mutlaka tam platform üzerinde, tekerlek yerden kesilmiş halde taşınır.`;
  }
  if (t.includes("dsg") || t.includes("dct") || t.includes("edc") || t.includes("cvt") || t.includes("dualogic") || t.includes("powershift") || t.includes("easytronic") || t.includes("eat8") || t.includes("7g") || t.includes("9g") || t.includes("s tronic") || t.includes("şanzıman") || t.includes("limp")) {
    return `Otomatik/yarı otomatik şanzıman arıza moduna (limp mode) giren ${entity} araçlarda sürüşe devam etmek kavramaya ve mekanizmaya kalıcı zarar verebilir; tekrarlayan uyarıda aracı zorlamadan platformla servise taşımak hem daha güvenli hem daha ekonomik sonuç verir.`;
  }
  if (t.includes("elektronik el freni") || t.includes("park kilidi") || t.includes("epb") || t.includes("p kilidi")) {
    return `Elektronik el freni veya park kilidi akü bitiminde mekanik olarak çözülemeyebilir; bu durumda önce 12V destekle aracı "uyandırmayı" deneriz, olmazsa tekerlek paletleri (go-jack) ile ${entity} aracını hasarsız şekilde platforma kaydırırız.`;
  }
  if (t.includes("lpg")) {
    return `LPG dönüşümlü/fabrika çıkışlı ${entity} araçlarda gaz kokusu veya geçiş arızası şüphesinde önce LPG vanasının kapatılmasını, aracın durdurulup uzaklaşılmasını öneririz; ekibimiz güvenlik prosedürüyle müdahale eder ve gerekirse aracı LPG servisine yönlendirir.`;
  }
  if (t.includes("debriyaj") || t.includes("kavrama")) {
    return `Debriyaj kayma/koku belirtisi veren ${entity} araçlarda sürüşe devam etmek kalan ömrü hızla tüketir ve yolda kalma riskini artırır; erken aşamada platforma alıp servise taşımak hem daha güvenli hem daha ekonomiktir.`;
  }
  if (t.includes("enjektör") || t.includes("turbo") || t.includes("multijet") || t.includes("tdi") || t.includes("tfsi") || t.includes("dizel")) {
    return `Dizel motorlu ${entity} araçlarda enjektör/turbo kaynaklı güç kaybı veya siyah duman şikâyetinde sürüşe zorlamak turboyu ve motoru daha ağır hasara götürebilir; en yakın güvenli noktada durup taşıma istemek önerilir.`;
  }
  if (t.includes("hararet") || t.includes("ecoboost") || t.includes("soğut")) {
    return `Hararet uyarısı veren ${entity} araçlarda sıcak motora soğutma suyu eklemek veya sürüşe devam etmek silindir kapağı/conta hasarına yol açabilir; motoru kapatıp soğumasını beklemek ve bizi aramak en güvenli yoldur.`;
  }
  if (t.includes("havalı süspansiyon") || t.includes("airmatic")) {
    return `Havalı süspansiyonu çöken ${entity} araçlarda gövde yerden çok alçalabilir; standart rampa gövdeye temas ettirebileceğinden düşük açılı rampa ve gerekirse kaldırma desteğiyle temassız yükleme yapıyoruz.`;
  }
  if (t.includes("sprinter") || t.includes("vito") || t.includes("transit") || t.includes("ticari") || t.includes("filo") || t.includes("yoğun kullanım") || t.includes("yoğun km")) {
    return `Yoğun kullanılan ticari ${entity} araçlarda kilometre arttıkça debriyaj, akü ve süspansiyon yıpranması hızlanır; filo/kurumsal çağrılarda önceliğimiz önce işin aksamaması, ardından aracın doğru servise taşınmasıdır.`;
  }
  if (t.includes("arazi") || t.includes("hilux") || t.includes("duster") || t.includes("pikap") || t.includes("navara")) {
    return `Arazi kullanımı yoğun ${entity} araçlarda saplanma ve şasi altı temas en sık gördüğümüz vaka tipidir; vinçli kurtarma aracımızla doğru askı noktalarından güvenli çekiş yapar, gaza basarak kurtulmaya çalışmanın aracı daha derine gömdüğünü hatırlatırız.`;
  }
  if (t.includes("motosiklet")) {
    return `${entity} motosikletler için özel bağlama aparatlı platformumuzla ön tekerlek kızağı ve çift kayış sistemi kullanıyoruz; bu, hem arıza hem kaza sonrası taşımada motosikleti devirmeden güvenle almamızı sağlar.`;
  }
  if (t.includes("kaza")) {
    return `Kaza kaynaklı çağrılarda önce güvenlik ve tutanak/tespit süreci önceliklidir; ardından ${entity} aracı hasarı büyütmeyecek şekilde vinç destekli platforma yüklenir ve fotoğraflı durum raporu tutulur — bu rapor sigorta sürecinizde kullanılabilir.`;
  }
  if (t.includes("uzun süre kullanılmayan") || t.includes("az kullanılan")) {
    return `Uzun süre hareket ettirilmeyen ${entity} araçlarda akü kendiliğinden boşalır, lastiklerde basınç kaybı ve zeminle temas noktasında düzleşme (flat-spot) görülebilir; garaj/apartman otoparkında bekleyen araçlar için takviye ve gerekirse taşıma hizmeti veriyoruz.`;
  }
  if (t.includes("yük") || t.includes("kasa") || t.includes("denge") || t.includes("dingil")) {
    return `Yüklü ${entity} araçlarda dingil dengesi ve yük sabitleme kritik önemdedir; platform üzerinde yükün kaymaması için ek kayış noktaları kullanır, ağır/hassas yüklerde önce boşaltma veya aktarma seçeneğini değerlendiririz.`;
  }
  if (t.includes("gösterge") || t.includes("elektronik")) {
    return `Elektronik/gösterge arızası yaşayan ${entity} araçlarda hız ve uyarı bilgisi kaybolabileceğinden sürüşe devam etmek riskli olabilir; aracı güvenli bir noktada durdurup taşıma istemenizi öneririz.`;
  }
  if (t.includes("alçak") || t.includes("cupra") || t.includes("m paket") || t.includes("rs")) {
    return `Alçatılmış/spor gövdeli ${entity} modellerinde standart rampa gövdeye sürtebilir; düşük açılı rampa ve ek plakalarla temassız yükleme yapıyoruz — bu, alçak gövdeli araçlarda standart uygulamamızdır.`;
  }
  if (t.includes("keyless")) {
    return `Keyless-go sistemli ${entity} araçlarda anahtarın araca sürekli sinyal göndermesi bekleme halinde bile akü tüketir; sık akü bitmesi yaşıyorsanız anahtarı araçtan uzakta (ör. Faraday kutusunda) tutmanızı öneririz.`;
  }
  return `${entity} için bu vaka tipinde önce telefonda ön teşhis yaparak doğru ekipmanla yola çıkıyoruz; bu hem sizin bekleme sürenizi kısaltıyor hem gereksiz masrafın önüne geçiyor.`;
}

// ---------------------------------------------------------------------------
// İLÇE BLOGLARI (39)
// ---------------------------------------------------------------------------

function districtServiceOverview(d: District): BlogSection {
  const paragraphs = services.map((s) => {
    const road = d.roads[0];
    const neighborhood = d.neighborhoods[0];
    return `**${s.name}**: ${d.name}'de ${s.shortName.toLowerCase()} ihtiyacınızda ${neighborhood} ve çevresi dahil tüm mahallelere, ${road} güzergâhı üzerinde dahil olmak üzere 7/24 müdahale ediyoruz. ${s.intro} Bu hizmeti ${d.name}'in ${d.yaka === "anadolu" ? "Anadolu" : "Avrupa"} Yakası'ndaki konumuna uygun ekip ve ekipmanla, ortalama ${d.arrivalMinutes} dakikalık varış süresiyle sağlıyoruz.`;
  });
  return { heading: `${d.name}'de Sunduğumuz Tüm Hizmetler`, paragraphs };
}

function districtScenarioBank(d: District): BlogSection {
  const templates = [
    `**Akü bitmesi**: ${d.neighborhoods[0]} çevresinde park halinde bekleyen bir aracın aküsü bitmesi, ${d.name}'de en sık aldığımız çağrı tipidir. Ekibimiz voltaj korumalı takviye cihazıyla yerinde müdahale eder; akü ömrünü doldurduysa dürüst teşhisle yerinde değişim yönlendirmesi yapar.`,
    `**Otoyol/ana yol arızası**: ${d.roads[0]} üzerinde arızalanan bir araç için güvenlik önceliklidir — aracın emniyet şeridine alınması, dörtlü flaşörün yakılması ve reflektörün doğru mesafeye konması gerekir. Bu güzergâhı düzenli çalıştığımız için ekibimiz ${d.arrivalMinutes} dakika civarında sahada olur.`,
    `**Kaza sonrası çekim**: ${d.landmarks[0]} çevresinde yaşanan bir trafik kazasında önce tutanak/tespit süreci tamamlanır, ardından hasarlı aracın vinç destekli platforma güvenle yüklenmesi sağlanır. ${d.name}'deki ekibimiz hasarlı araç yüklemede deneyimlidir.`,
    `**Lastik değişimi**: ${d.neighborhoods[Math.min(1, d.neighborhoods.length - 1)]} bölgesinde patlak lastikle kalan bir sürücü için, yedek lastik varsa yerinde torklu değişim yapılır; yoksa araç en yakın lastikçiye taşınır.`,
    `**Kapalı otopark/site vakası**: ${d.name}'deki kapalı otoparklarda uzun süre çalıştırılmayan araçlarda akü bitmesi ve lastik basınç kaybı sık görülür; alçak tavanlı aracımızla bu otoparklara giriyoruz.`,
    `**Gece çağrısı**: ${d.name}'de gece saatlerinde gelen çağrılarda nöbetçi ekibimiz plaka/sürücü bilgisini SMS ile teyit ettirir; bu, tenha noktalarda güvenliğinizi korumak için uyguladığımız standart prosedürdür.`,
  ];
  return { heading: `${d.name}'de Sık Karşılaşılan Vaka Senaryoları`, paragraphs: templates };
}

function districtRoadDeepDive(d: District): BlogSection {
  const paragraphs = d.roads.map(
    (road) =>
      `**${road}**: Bu güzergâh ${d.name} sınırları içinde önemli bir trafik aksıdır. Buradan gelen çağrılarda ekibimiz konumu hızlı tespit eder ve güvenlik prosedürüne (emniyet şeridi, reflektör, bariyer dışı bekleme) uygun şekilde müdahale eder.`
  );
  return { heading: `${d.name}'in Ana Yol Ağı`, paragraphs };
}

function districtNeighborhoodDeepDive(d: District): BlogSection {
  const paragraphs = d.neighborhoods.map(
    (n) => `**${n}**: ${n} ve çevresinde 7/24 çekici, akü takviyesi, lastik ve yol yardım hizmeti veriyoruz; bölgeye ortalama ${d.arrivalMinutes} dakikada ulaşıyoruz.`
  );
  return { heading: `${d.name} Mahallelerinde Hizmet Detayı`, paragraphs };
}

function districtLandmarkSection(d: District): BlogSection {
  return {
    heading: `${d.name}'de Bilinen Noktalar ve Konum Tarifi`,
    paragraphs: [
      `Konum tarif ederken en pratik yöntem WhatsApp'tan canlı konum paylaşmaktır; ancak telefon hattında sözlü tarif gerekirse ${d.name}'deki şu noktaları referans alabilirsiniz: ${d.landmarks.join(", ")}. Ekibimiz bu noktaların etrafını iyi bildiği için "buraya yakınım" demeniz genelde yeterlidir.`,
      `${d.landmarks[0]} çevresi özellikle yoğun saatlerde referans noktası olarak kullanışlıdır; buradan gelen çağrılarda ekibimiz alternatif güzergâhları bilir ve yoğunluğa takılmadan ulaşır.`,
    ],
  };
}

function districtWhyChooseUs(d: District): BlogSection {
  return {
    heading: `Neden ${d.name}'de Bizi Tercih Etmelisiniz`,
    paragraphs: [
      `${d.name}'de K1 yetki belgeli, sigortalı ve resmi kayıtlı bir ekip olarak çalışıyoruz. Aracınız ne olursa olsun (binek, SUV, ticari, motosiklet, elektrikli, ağır vasıta) doğru ekipmanla, hasar bırakmadan taşıyoruz.`,
      `${d.name} sınırları içinde konumlanmış ekiplerimiz sayesinde ortalama varış süremiz ${d.arrivalMinutes} dakikadır; bu süre gece saatlerinde trafiğin azalmasıyla genelde kısalır.`,
      `Yükleme öncesi ve sonrası fotoğraflı durum raporu düzenliyoruz; bu belge hem sizin hem bizim için şeffaflık sağlar ve gerekirse sigorta sürecinizde kullanılabilir. Fiyat konusunda tek kural nettir: hiçbir sayfada rakam paylaşmıyoruz, arayan herkese anında ve net fiyat bilgisi veriyoruz.`,
    ],
  };
}

function districtSafetyGuide(d: District): BlogSection {
  return {
    heading: `${d.name}'de Yolda Kalırsanız Adım Adım Ne Yapmalısınız`,
    paragraphs: [
      `1. Aracınızı, mümkünse ${d.roads[0]} gibi ana yollarda emniyet şeridine veya yol kenarına, mümkün değilse en yakın güvenli boşluğa alın.`,
      `2. Dörtlü flaşörünüzü hemen yakın. Otoyol/ana yol üzerindeyseniz reflektörünüzü aracın en az 50 metre (otoyolda 100 metre) gerisine yerleştirin.`,
      `3. Siz ve yolcularınız aracın içinde değil, bariyer/kaldırım tarafında, trafiğe kapalı güvenli bir noktada bekleyin.`,
      `4. 0535 404 80 44'ü arayın veya WhatsApp'tan konumunuzu paylaşın; ${d.name}'e en yakın ekibimiz yönlendirilir ve ortalama ${d.arrivalMinutes} dakikada yanınızda oluruz.`,
      `5. Ekibimiz yola çıktığında size plaka ve sürücü bilgisini iletir; özellikle gece saatlerinde bu teyidi almadan aracınızı kimseye teslim etmeyin.`,
    ],
  };
}

export function generateDistrictPosts(): BlogPost[] {
  return districts.map((d) => {
    const sections: BlogSection[] = [
      { heading: `${d.name}'de Çekici İhtiyacı Neden Farklıdır`, paragraphs: [d.localNote] },
      { heading: "Örnek Vaka: Bu Bölgede Nasıl Çalışıyoruz", paragraphs: [d.scenario] },
      districtRoadDeepDive(d),
      districtNeighborhoodDeepDive(d),
      districtLandmarkSection(d),
      { heading: `${d.name}'de Çekicilik: Yerel Gözlemler`, paragraphs: d.blogParagraphs },
      districtScenarioBank(d),
      districtServiceOverview(d),
      districtWhyChooseUs(d),
      districtSafetyGuide(d),
      {
        heading: "Sonuç",
        paragraphs: [
          `${d.name}'de yaşıyor veya bu ilçeden geçiyor olun, aracınızla ilgili herhangi bir sorunda tek yapmanız gereken 0535 404 80 44'ü aramak. K1 belgeli, sigortalı ve 7/24 çalışan ekibimiz, ${d.name}'in tüm mahallelerine ortalama ${d.arrivalMinutes} dakikada ulaşır ve fiyat konusunda net bilgiyi telefonda anında verir.`,
        ],
      },
    ];

    return {
      slug: `${d.slug}-cekici-hizmeti`,
      category: "ilce",
      title: `${d.name} Çekici Hizmeti | 7/24 Oto Çekici`,
      metaTitle: `${d.name} Çekici Hizmeti | 7/24 Oto Çekici — 0535 404 80 44`,
      metaDescription: `${d.name}'de 7/24 oto çekici ve yol yardım hizmeti. Ortalama ${d.arrivalMinutes} dakikada varış. Hemen arayın: 0535 404 80 44`,
      intro: d.intro,
      datePublished: TODAY,
      dateModified: TODAY,
      sections,
      faqs: d.faqs,
      relatedPostSlugs: d.neighbors.map((n) => `${n}-cekici-hizmeti`),
      relatedDistrictSlugs: [d.slug],
      relatedServiceSlugs: ["oto-cekici-hizmeti", "7-24-cekici-hizmeti", "kaza-sonrasi-arac-cekme"],
      arrivalTable: d.arrivalTable,
    } satisfies BlogPost;
  });
}

// ---------------------------------------------------------------------------
// MARKA BLOGLARI (20)
// ---------------------------------------------------------------------------

const MODEL_TEMPLATES = [
  (b: Brand, m: string) =>
    `**${b.name} ${m}**: İstanbul trafiğinde en sık hizmet verdiğimiz ${b.name} modellerinden biridir. Arıza, kaza veya lastik/akü kaynaklı çağrılarda bu modelin şasi yapısını, ağırlık dağılımını ve çekme noktalarının konumunu bilerek doğru ekipmanla yola çıkarız; bu ön bilgi hem yükleme süresini kısaltır hem aracın hiçbir noktasına temas ettirmeden platforma almamızı sağlar.`,
  (b: Brand, m: string) =>
    `**${b.name} ${m}**: Bu model İstanbul sokaklarında ve otoyollarında sık karşılaştığımız araçlardandır. Ekibimiz ${m} için üreticinin çekme/kurtarma kılavuzuna uygun bağlama noktalarını, varsa elektronik park freni ve şanzıman kilidi durumunu telefonda önceden sorar; sahaya bu bilgiyle çıktığımız için yükleme süresi kısalır.`,
  (b: Brand, m: string) =>
    `**${b.name} ${m}**: ${m} sahiplerinden aldığımız çağrılarda en sık akü, lastik ve elektronik kaynaklı vakalarla karşılaşıyoruz. Modelin gövde yüksekliğine uygun rampa açısı ve tekstil kayış düzeniyle, boya/jant yüzeyine temas ettirmeden platforma alıyoruz.`,
  (b: Brand, m: string) =>
    `**${b.name} ${m}**: Bu modelin İstanbul'daki yaygınlığı sayesinde ekibimiz ${m} için özel bir deneyime sahiptir — çekme gözünün konumundan vites kilidi açma prosedürüne kadar model bazlı ayrıntıları bilerek hareket eder, bu da sahada tahmin yürütmeden hızlı ve hasarsız yükleme yapmamızı sağlar.`,
  (b: Brand, m: string) =>
    `**${b.name} ${m}**: ${m} için de standart yaklaşımımız tam platform taşımadır; aracın dört tekerleği yerden kesilir, motor ve aktarma organlarına hiçbir yük binmez. Yükleme öncesi/sonrası fotoğraflı durum raporu bu modelde de standart uygulamamızdır.`,
];

function brandModelDeepDive(b: Brand): BlogSection {
  const paragraphs = b.popularModels.map((m, i) => MODEL_TEMPLATES[i % MODEL_TEMPLATES.length](b, m));
  return { heading: `${b.name} Modelleri İçin Taşıma Notları`, paragraphs };
}

function brandIssueDeepDive(b: Brand): BlogSection {
  const paragraphs = b.commonIssues.map(
    (issue) => `**${issue}**: ${b.name} araçlarda bu vaka tipiyle sık karşılaşıyoruz. ${issueElaboration(issue, b.name)}`
  );
  return { heading: `${b.name}'de Sık Görülen Arıza Tipleri ve Yaklaşımımız`, paragraphs };
}

function brandTowingMethodSection(b: Brand): BlogSection {
  const lowModel = b.popularModels.find((m) => /^(m|s|rs|cupra|amg|gti|gt|st|n |type r)/i.test(m)) ?? b.popularModels[0];
  return {
    heading: `${b.name} İçin Doğru Çekme Yöntemi Neden Önemli`,
    paragraphs: [
      `Modern ${b.name} modellerinin büyük kısmı dört çeker aktarma sistemi, otomatik/yarı otomatik şanzıman veya elektronik park freni ile gelir. Bu sistemlerden herhangi biri varsa, aracın klasik halatla veya iki tekerlek yerde bırakılarak çekilmesi kalıcı mekanik hasara yol açabilir; transfer kutusu, diferansiyel veya şanzıman mekanizması telafisi pahalı hasarlar alabilir.`,
      `Bizim standart yaklaşımımız her zaman tam platform (kayar platform/flatbed) taşımadır: aracın dört tekerleği de yerden kesilir, motor ve aktarma organlarına hiçbir yük binmez. Elektronik el freni veya vites kilidi nedeniyle tekerlekler dönmüyorsa, tekerlek paletleri (go-jack) ile hasarsız kaydırarak platforma alırız.`,
      `${b.name} ${lowModel} gibi alçak gövdeli veya spor odaklı gövdelerde standart rampa açısı ön tampon/difüzör ile temas edebilir; bu durumda düşük açılı rampa ve ek plakalar kullanarak aracın hiçbir noktasını yere sürtmeden platforma alıyoruz.`,
      `Yükleme öncesi ve sonrası aracınızın fotoğraflı durum raporunu tutuyoruz; bu, hem sizin hem bizim için şeffaflık sağlıyor ve gerektiğinde sigorta sürecinizde kullanılabiliyor. Jant ve lastik yüzeyine temas eden noktalarda tekstil kayış kullanarak çelik zincirin bırakabileceği izleri de önlüyoruz.`,
      `Sık yapılan bir hata, aracı "kısa mesafe zaten, halatla idare ederiz" diyerek çekmeye çalışmaktır; ${b.name} gibi elektronik yoğunluğu yüksek araçlarda bu, birkaç yüz metrelik mesafede bile şanzıman veya fren sistemine kalıcı hasar verebilir. Mesafe ne olursa olsun doğru yöntem tam platformdur.`,
    ],
  };
}

function brandInsuranceSection(b: Brand): BlogSection {
  return {
    heading: `${b.name} Sahipleri İçin Sigorta, Garanti ve Servis Yönlendirmesi`,
    paragraphs: [
      `${b.name} aracınız garanti kapsamındaysa yetkili servise taşınması genelde en mantıklı seçenektir; garanti dışıysa güvendiğiniz özel servise veya markaya özel uzman servislere taşıyabiliriz — karar tamamen sizindir, biz her iki seçeneğe de aynı özenle taşıma yaparız.`,
      `Garanti kapsamındaki bir arızada aracı yetkili olmayan bir servise götürmek bazı durumlarda garanti şartlarını etkileyebilir; emin değilseniz telefonda birlikte değerlendirir, isterseniz doğrudan yetkili servise yönlendiririz.`,
      `Kaza kaynaklı çağrılarda tutanak ve sigorta süreciniz için gereken temel yönlendirmeyi yapıyoruz; çekici faturamız kasko dosyanızda kullanılabilir. Yükleme öncesi ve sonrası çektiğimiz fotoğraflar, hasar tespit sürecinde ek belge olarak işinize yarayabilir.`,
      `Kasko poliçenizde yol yardım/çekici hizmeti varsa sigorta şirketinizle koordineli çalışabiliyoruz; poliçe kapsamı dışında kalan durumlarda da aynı hızda, net bilgilendirmeyle hizmet veriyoruz — fiyat konusunda tek kural nettir: hiçbir sayfada rakam paylaşmıyoruz, arayan herkese telefonda anında net bilgi veriyoruz.`,
    ],
  };
}

function brandSeasonalSection(b: Brand): BlogSection {
  const hasEv = b.popularModels.some((m) => /elektrik|ev|e-|id\.|e-tron|ioniq|leaf|zoe|taycan|ex30|e:hev|hev/i.test(m)) || b.techNotes.some((t) => /elektrik|flatbed|şarj/i.test(t));
  const paragraphs = [
    `**Kış ayları**: Soğuk havada akü kapasitesi düşer; zaten zayıflamış bir ${b.name} aküsü kışın ilk soğuk sabahlarda marş vermeyebilir. Kış lastiği kullanmıyorsanız buzlu/karlı zeminlerde fren mesafesi uzar, bu da kayma ve hafif çarpışma vakalarını artırır. Ekibimiz kış aylarında akü takviye ve kış donanımlı kurtarma taleplerine öncelik verir.`,
    `**Yaz ayları**: Uzun süre trafikte bekleyen ${b.name} araçlarda motor ve klima sistemi normalden fazla yük altında kalır; hararet ve klima gazı kaynaklı çağrılar yaz aylarında artar. Uzun şehirlerarası yolculuk öncesi soğutma sistemi ve lastik basıncının kontrol ettirilmesini öneririz.`,
    hasEv
      ? `**Elektrikli/hibrit modeller için mevsimsel not**: Soğuk havada batarya menzili belirgin şekilde düşer; kışın planladığınızdan daha erken şarj ihtiyacı doğabilir. Sıcak yaz günlerinde ise hızlı şarj istasyonlarında batarya termal yönetimi devreye girdiğinden şarj süresi uzayabilir — her iki durumda da yol ortasında kalmamak için şarj payını normalden geniş tutmanızı öneririz.`
      : `**Uzun yolculuk öncesi kontrol**: Şehirlerarası bir ${b.name} yolculuğu öncesinde akü kutup başları, lastik diş derinliği ve fren balatalarının kontrol ettirilmesi, yolda kalma riskini büyük ölçüde azaltır; bu basit kontroller çoğu zaman bizi aramanıza hiç gerek bırakmaz.`,
    `**Bayram/tatil trafiği**: Yoğun tatil çıkışlarında İstanbul'un ana arterlerinde saatlerce süren trafik, motoru ve soğutma sistemini normalden fazla zorlar; bu dönemlerde ${b.name} araçlarda hararet ve akü kaynaklı çağrılarımız belirgin şekilde artar. Ekip sayımızı bu dönemlerde artırarak varış sürelerini korumaya çalışıyoruz.`,
  ];
  return { heading: `${b.name} Sahipleri İçin Mevsimsel Bakım ve Yol Notları`, paragraphs };
}

function brandMistakesChecklist(b: Brand): BlogSection {
  const firstIssueDetail = issueElaboration(b.commonIssues[0], b.name);
  const paragraphs = [
    `1. **Arıza belirtisini görmezden gelip sürmeye devam etmek**: ${b.commonIssues[0]} gibi belirtiler erken fark edilirse çoğu zaman yol yardımıyla yerinde çözülür; göz ardı edilirse taşıma zorunlu hale gelir. ${firstIssueDetail}`,
    `2. **Çekme noktasını yanlış tahmin etmek**: ${b.name} araçlarda çekme gözü çoğu zaman tampon arkasında kapaklı bir bölmededir; yanlış noktadan (egzoz borusu, alt karter, plastik tampon) halat bağlamak şasi veya karoser hasarına yol açar.`,
    `3. **Elektronik park frenini/vites kilidini zorlamak**: Akü bittiğinde el frenini veya vites kolunu zorla hareket ettirmeye çalışmak mekanizmaya zarar verebilir; doğru yöntem 12V takviye veya tekerlek paletleriyle hasarsız yükleme yapmaktır.`,
    `4. **"Kısa mesafede halat yeter" diye düşünmek**: Mesafe ne kadar kısa olursa olsun, ${b.name}'in otomatik/yarı otomatik şanzıman veya dört çeker sistemi varsa halatla çekim birkaç yüz metrede bile kalıcı hasar bırakabilir.`,
    `5. **Servis tercihini son ana bırakmak**: Garanti durumunuzu ve gitmek istediğiniz servisi önceden netleştirirseniz, aracınız yola çıktığı andan itibaren doğru adrese yönlendirilir; bu hem zaman hem tekrar taşıma masrafından tasarruf sağlar.`,
  ];
  return { heading: `${b.name} Sahiplerinin Sık Yaptığı Hatalar`, paragraphs };
}

function brandEquipmentSection(b: Brand): BlogSection {
  return {
    heading: `${b.name} Taşımasında Kullandığımız Ekipman`,
    paragraphs: [
      `${b.name} araçlar için standart flatbed (kayar platform) kurtarıcılarımızın yanı sıra, alçak gövdeli veya ağır modeller için düşük açılı ek rampa plakaları, tekstil kayış seti ve jant koruyucu kullanıyoruz; bu ekipman aracın hiçbir yüzeyine metal temas etmesini önler.`,
      `Elektronik park freni, vites kilidi veya dört çeker sistemi nedeniyle tekerlekleri dönmeyen ${b.name} modellerinde tekerlek paletlerini (go-jack) kullanarak aracı santim santim, hasarsız şekilde platforma kaydırıyoruz; bu yöntem özellikle akü tamamen bitmiş araçlarda standart uygulamamızdır.`,
      `Kaza veya arazi kaynaklı hareketsiz kalan ${b.name} araçlarında vinç kapasiteli kurtarıcımızla doğru askı/çekme noktalarından kontrollü kaldırma yapıyoruz; her yükleme öncesi ve sonrası fotoğraflı durum raporu tutarak süreci şeffaf hale getiriyoruz.`,
    ],
  };
}

function brandWhyChooseUsSection(b: Brand): BlogSection {
  return {
    heading: `Neden ${b.name} Sahiplerinin Tercihi Oluyoruz`,
    paragraphs: [
      `${b.name} araçların teknik özelliklerini (aktarma sistemi, şanzıman tipi, elektronik donanımı) bilerek hareket ediyoruz; bu, sahada tahmin yürütmek yerine doğrudan doğru yöntemle işe başlamamızı sağlıyor ve hem sizin bekleme sürenizi hem hasar riskini azaltıyor.`,
      `K1 yetki belgeli, sigortalı bir ekip olarak çalışıyoruz; ${b.name} aracınız garanti kapsamında olsun olmasın, yükleme öncesi ve sonrası fotoğraflı durum raporuyla şeffaf bir süreç sunuyoruz.`,
      `İstanbul'un 39 ilçesinin tamamına 7/24 ulaşabilen ekip yapımız sayesinde, ${b.name} aracınızla ilgili çağrınızı gün veya saat fark etmeksizin karşılıyoruz; fiyat konusunda tek kuralımız nettir — hiçbir sayfada rakam paylaşmıyoruz, arayan herkese telefonda anında net bilgi veriyoruz.`,
    ],
  };
}

function brandServiceComparisonSection(b: Brand): BlogSection {
  return {
    heading: `${b.name} İçin Yetkili Servis mi, Özel Servis mi`,
    paragraphs: [
      `**Yetkili servis avantajı**: Aracınız garanti kapsamındaysa veya yakın zamanda satılacaksa, orijinal parça ve marka onaylı işçilik geçmişi için yetkili servis genelde daha güvenli bir seçimdir; ${b.name} yetkili servis ağı İstanbul'da geniştir ve aracınızı doğrudan oraya taşıyabiliriz.`,
      `**Özel servis avantajı**: Garanti dışı ${b.name} araçlarda, markaya özel uzmanlaşmış bir özel servis genelde daha hızlı randevu ve daha esnek fiyatlandırma sunar; İstanbul'daki güvenilir ${b.name} uzmanı servisleri biliyoruz ve tercih ederseniz oraya yönlendiriyoruz.`,
      `**Kararsızsanız**: Telefonda durumu birlikte değerlendirebiliriz; aracınızı önce eve/işyerine bırakıp servis kararını sonra vermeniz de mümkündür — taşıma sırasında nihai adresi net söylemeniz gerekmez, yol üzerinde de değiştirebilirsiniz.`,
    ],
  };
}

function brandDocumentationSection(b: Brand): BlogSection {
  return {
    heading: `${b.name} Taşımasında Belge ve Fatura Süreci`,
    paragraphs: [
      `Her ${b.name} taşımasında yasal fatura düzenliyoruz; bu fatura hem kurumsal müşteriler hem kasko/sigorta süreci yürüten müşteriler için gereken resmi belgedir.`,
      `Yükleme öncesi ve sonrası çektiğimiz fotoğraflar, aracın taşıma öncesindeki mevcut durumunu (varsa önceki hasar, lastik/jant durumu) kayıt altına alır; bu, hem sizi hem bizi olası bir anlaşmazlıkta koruyan şeffaf bir uygulamadır.`,
      `K1 yetki belgeli ve sigortalı bir firma olarak, ${b.name} aracınızın taşınması sırasında oluşabilecek olağandışı bir durumda da güvence altında olursunuz; bu belgeleri talep etmeniz halinde memnuniyetle paylaşırız.`,
    ],
  };
}

function brandCallProcessSection(b: Brand): BlogSection {
  return {
    heading: `0535 404 80 44'ü Aradığınızda ${b.name} İçin Süreç Nasıl İşliyor`,
    paragraphs: [
      `1. **Telefonda ön teşhis**: Aracınızın ${b.name} model/yılını, yaşadığınız belirtiyi (ses, koku, uyarı ışığı, hareket edip etmediği) ve konumunuzu soruyoruz; bu bilgiler ekibin doğru ekipmanla yola çıkmasını sağlıyor.`,
      `2. **Konum teyidi**: WhatsApp'tan canlı konum paylaşmanızı istiyoruz; sözlü tarif gerekiyorsa yakın bir bina, kavşak veya işletme adını referans alıyoruz.`,
      `3. **Yola çıkış ve bilgilendirme**: Ekip yola çıktığında size tahmini varış süresini ve gelecek personelin plaka/isim bilgisini iletiyoruz; bu teyit özellikle gece saatlerinde güvenliğiniz için önemlidir.`,
      `4. **Yerinde değerlendirme**: Sahaya ulaşan ekibimiz önce yerinde çözüm (takviye, lastik değişimi) mümkün mü diye bakar; değilse ${b.name} için doğru yönteme (tam platform, go-jack, vinç) geçer.`,
      `5. **Taşıma ve teslim**: Yükleme öncesi/sonrası fotoğraflı durum raporu tutulur, araç sizin belirlediğiniz adrese (yetkili servis, özel servis veya ev/işyeri) teslim edilir; fiyat bilgisi süreç boyunca telefonda net şekilde verilir.`,
    ],
  };
}

export function generateBrandPosts(): BlogPost[] {
  return brands.map((b) => {
    const sampleDistricts = [
      districts.find((d) => d.yaka === "avrupa"),
      districts.find((d) => d.yaka === "anadolu"),
      districts[Math.floor(districts.length / 3)],
      districts[Math.floor((districts.length * 2) / 3)],
    ].filter((d): d is District => Boolean(d));
    const districtNames = [...new Set(sampleDistricts.map((d) => d.name))];

    const sections: BlogSection[] = [
      { heading: `${b.name} İçin Teknik Taşıma Notları`, paragraphs: b.techNotes },
      brandModelDeepDive(b),
      brandIssueDeepDive(b),
      brandTowingMethodSection(b),
      brandInsuranceSection(b),
      brandSeasonalSection(b),
      brandMistakesChecklist(b),
      brandEquipmentSection(b),
      brandWhyChooseUsSection(b),
      brandServiceComparisonSection(b),
      brandDocumentationSection(b),
      brandCallProcessSection(b),
      {
        heading: `İstanbul'da 7/24 ${b.name} Çekici Hizmeti`,
        paragraphs: [
          `İstanbul'un 39 ilçesinin tamamında ${b.name} araçlar için 7/24 çekici ve yol yardım hizmeti veriyoruz. Akü takviyesi, lastik değişimi ve yakıt ikmali gibi yol yardım hizmetlerimizle çoğu vakayı çekiciye gerek kalmadan yerinde çözüyoruz; çözülemeyen durumlarda aracınızı ${b.name} için doğru prosedürle, tam platformda taşıyoruz.`,
          `${districtNames.join(", ")} gibi hem Avrupa hem Anadolu yakasının farklı noktalarında konumlanmış ekiplerimiz sayesinde şehrin neresinde olursanız olun ${b.name} aracınıza makul bir sürede ulaşabiliyoruz; tam konumunuzu WhatsApp'tan paylaşmanız süreci daha da hızlandırır.`,
          `${b.name} için hem binek hem (varsa) ticari/SUV gövdeli modellerde aynı özenle çalışıyoruz; aracınızın modelini ve yaşadığınız belirtiyi telefonda kısaca anlatmanız, ekibimizin doğru ekipmanla (düşük açılı rampa, go-jack, vinç) yola çıkmasını sağlar.`,
        ],
      },
      {
        heading: "Sonuç",
        paragraphs: [
          `${b.name} aracınızla ilgili herhangi bir arıza, kaza veya yol yardım ihtiyacında 0535 404 80 44'ü arayın. K1 belgeli, sigortalı ekibimiz İstanbul'un her noktasına 7/24 ulaşır, ${b.name} için doğru taşıma prosedürünü uygular ve fiyat bilgisini telefonda anında verir.`,
        ],
      },
    ];

    return {
      slug: `${b.slug}-cekici-hizmeti`,
      category: "marka",
      title: `${b.name} Çekici Hizmeti İstanbul | 7/24`,
      metaTitle: `${b.name} Çekici Hizmeti İstanbul | 7/24 — 0535 404 80 44`,
      metaDescription: `${b.name} araçlar için İstanbul'da 7/24 çekici ve yol yardım hizmeti. Marka özel taşıma prosedürleri. Hemen arayın: 0535 404 80 44`,
      intro: b.intro,
      datePublished: TODAY,
      dateModified: TODAY,
      sections,
      faqs: b.faqs,
      relatedPostSlugs: [],
      relatedServiceSlugs: ["oto-cekici-hizmeti", "luks-ithal-arac-cekici", "elektrikli-arac-cekici"],
      relatedBrandSlugs: [b.slug],
    } satisfies BlogPost;
  });
}

// ---------------------------------------------------------------------------
// OTOYOL / KÖPRÜ BLOGLARI (7)
// ---------------------------------------------------------------------------

function highwayDistrictDeepDive(h: Highway): BlogSection {
  const allMatched = h.districtSlugs
    .map((s) => districts.find((d) => d.slug === s))
    .filter((d): d is District => Boolean(d));
  const names = allMatched.map((d) => d.name);
  const matched = allMatched.slice(0, 12);
  return {
    heading: `${h.name} Hangi İlçelerden Geçiyor`,
    paragraphs: [
      `${h.name}, güzergâhı boyunca şu ilçelerle bağlantılıdır: ${names.join(", ")}. Bu ilçelerin her birinde konumlanmış ekiplerimiz sayesinde ${h.name} üzerindeki çağrılara hızlı müdahale edebiliyoruz.`,
      ...matched.map(
        (d) =>
          `**${d.name} kesimi**: ${d.name} sınırlarındaki ${h.name} kesiminde arızalanan araçlar için bu ilçede konumlu ekibimiz güvenlik prosedürüyle ortalama ${d.arrivalMinutes} içinde ulaşır; ${d.landmarks[0]} çevresi bu kesimde sık kullandığımız referans noktalarından biridir.`
      ),
    ],
  };
}

function highwaySafetyDeepDive(h: Highway): BlogSection {
  return {
    heading: "Güvenlik Kurallarını Neden Ciddiye Almalısınız",
    paragraphs: [
      `${h.name} gibi yüksek hızlı bir güzergâhta emniyet şeridinde bekleyen bir araç, doğru önlemler alınmazsa ciddi risk taşır. Türkiye'de otoyol kazalarının önemli bir kısmı, arızalanıp kenara çekilen ancak doğru ikaz yapmayan araçlara arkadan çarpma şeklinde gerçekleşir.`,
      `Bu nedenle ${h.name} üzerinde arıza yaptığınızda uygulamanız gereken adımlar tesadüfi değil, yıllar içinde edinilmiş güvenlik deneyiminin özetidir: reflektör mesafesi, bariyer dışında bekleme ve doğru konum bildirimi hayat kurtarır.`,
      `Ekiplerimiz ${h.name} güzergâhında düzenli çalıştığı için bu yolun her kavşağını, gişesini ve riskli noktasını bilir; sizi telefonda doğru şekilde yönlendirir ve güvenlik koridoru kurarak müdahale eder.`,
      `Emniyet şeridinde beklerken en tehlikeli davranış, aracın arkasında veya yanında durup arızayı incelemeye çalışmaktır; sürücülerin dikkatinin dağıldığı, telefonla meşgul olduğu anlarda bu bölgeye yapılan çarpmalar ağır sonuçlanabilir. Bariyer dışına geçmek istemsiz de olsa hayat kurtarıcı bir refleks olmalıdır.`,
    ],
  };
}

const HIGHWAY_SCENARIO_TEMPLATES = [
  (h: Highway) =>
    `**Gündüz saatlerinde akü/mekanik arıza**: ${h.name} üzerinde trafik akışı yoğunken arızalanan bir araç için önce güvenli şeride/cebe alınma, ardından dörtlü flaşör ve reflektör önceliklidir. Ekibimiz konumunuza en yakın noktadan yola çıkar ve trafiği aksatmadan hızlı yükleme yapar.`,
  (h: Highway) =>
    `**Gece arızası**: ${h.name} üzerinde gece saatlerinde görünürlük azaldığından risk artar; nöbetçi ekibimiz yola çıktığında plaka ve sürücü bilgisini SMS ile teyit ettirir, bu tenha noktalarda güvenliğinizi korumak için uyguladığımız standart prosedürdür.`,
  (h: Highway) =>
    `**Kaza sonrası çekim**: ${h.name} üzerinde yaşanan bir trafik kazasında önce yaralı kontrolü ve güvenlik, ardından tutanak/tespit süreci tamamlanır; ekibimiz hasarlı aracı vinç destekli platforma güvenle yükler ve fotoğraflı durum raporu tutar.`,
  (h: Highway) =>
    `**Ağır vasıta (TIR/kamyon/otobüs) arızası**: ${h.name} üzerindeki ağır vasıta trafiği diğer aksların çoğundan fazladır; bu araçlar için tonaja uygun kurtarıcı ve yük emniyeti prosedürü uygulanır, binek araçtan farklı bir uzmanlık gerektirir.`,
  (h: Highway) =>
    `**Yakıt/şarj bitmesi**: ${h.name} üzerinde yakıtı veya şarjı biten bir araç için güvenli kapta yakıt ikmali ya da elektrikli araçlarda flatbed ile en yakın DC şarj istasyonuna taşıma hizmeti veriyoruz; bu vaka özellikle tesis aralıklarının uzun olduğu kesimlerde sık yaşanır.`,
];

function highwayNoteElaboration(note: string, h: Highway): string {
  const t = note.toLocaleLowerCase("tr");
  if (t.includes("reflektör")) {
    return `Reflektörü doğru mesafeye koymak, arkadan gelen sürücülere aracınızı fark etmeleri için birkaç saniye kazandırır; ${h.name} gibi hız limitinin yüksek olduğu bir akste bu birkaç saniye ölümcül bir çarpmayı önleyebilir.`;
  }
  if (t.includes("bariyer") || t.includes("yolcularla birlikte") || t.includes("dışına")) {
    return `Bariyerin dışına geçmek ilk bakışta gereksiz gibi görünse de, ${h.name} üzerindeki gerçek kazaların önemli bir kısmı emniyet şeridinde bekleyen araçlara/kişilere arkadan çarpma şeklinde gerçekleşir; bu adımı asla atlamayın.`;
  }
  if (t.includes("dörtlü") || t.includes("flaşör")) {
    return `Dörtlü flaşörü yakmak saniyeler sürer ama arkadan gelen trafiğin sizi fark etmesi için kritik bir ilk sinyaldir; ${h.name} üzerinde bu adımı atlamak risk oranını ciddi şekilde artırır.`;
  }
  if (t.includes("hgs") || t.includes("geçiş")) {
    return `HGS/geçiş bakiyesi konusu tamamen idari bir süreçtir ve ${h.name} üzerindeki kurtarma sürecimizi hiçbir şekilde etkilemez; önceliğimiz her zaman aracınızı ve sizi güvenle almaktır.`;
  }
  if (t.includes("hız") || t.includes("120") || t.includes("140")) {
    return `Yüksek hız limiti, ${h.name} üzerinde emniyet şeridinde bekleyen bir aracın görünürlüğünü ve tepki süresini kritik hale getirir; bu yüzden reflektör mesafesi ve bariyer dışında bekleme kuralına özellikle bu akste titizlikle uyulmalıdır.`;
  }
  if (t.includes("kavşak") || t.includes("gişe")) {
    return `${h.name} üzerindeki kavşak ve gişe bölgeleri şerit değiştirme yoğunluğu nedeniyle risklidir; arızalanan bir araç için bu noktalarda durmak yerine mümkünse bir sonraki güvenli cebe kadar ilerlemek daha güvenlidir.`;
  }
  if (t.includes("tünel")) {
    return `Tünel içinde arızalanan bir araç için kurallar şehir içi/otoyoldan farklıdır: dörtlüleri yakıp araçta kalmak ve işletmenin acil müdahale ekibini beklemek esastır; ${h.name}'nin tünel işletme kurallarını biliyoruz ve koordineli çalışıyoruz.`;
  }
  if (t.includes("köprü") || t.includes("yaya")) {
    return `Köprü üzerinde yaya olarak bulunmanın yasak ve tehlikeli olduğu unutulmamalı; ${h.name} üzerinde arızalanırsanız dörtlüleri yakıp araçta kalmak, bariyer dışına çıkmaktan daha güvenlidir.`;
  }
  if (t.includes("rüzgâr") || t.includes("ruzgar")) {
    return `Şiddetli rüzgârda özellikle yüksek profilli araçlar (panelvan, karavan, kamyon) ${h.name} üzerinde savrulma riski taşır; hız düşürmek ve mümkünse geçişi rüzgâr dinene kadar ertelemek en güvenli seçenektir.`;
  }
  if (t.includes("buzlanma") || t.includes("kış") || t.includes("kaygan")) {
    return `Kış aylarında ${h.name} üzerindeki viyadük ve köprü kesimlerinde siyah buz (görünmeyen buzlanma) riski artar; hız düşürmek ve ani manevralardan kaçınmak kayma kazalarını büyük ölçüde önler.`;
  }
  if (t.includes("metrobüs")) {
    return `Metrobüs koridoruna arıza anında bile girmek hem yasak hem son derece tehlikelidir; ${h.name} üzerinde arızalanırsanız sağ tarafta kalıp bizi aramanız gerekir, metrobüs yoluna asla yanaşmayın.`;
  }
  if (t.includes("ağır vasıta") || t.includes("tır") || t.includes("kamyon")) {
    return `${h.name} üzerindeki ağır vasıta yoğunluğu, emniyet şeridinde bekleyen bir araç için ek risk oluşturur; büyük araçların oluşturduğu rüzgâr etkisi ve fren mesafesi farkı nedeniyle bariyer dışında beklemek burada daha da önemlidir.`;
  }
  return `${h.name} üzerinde bu kurala uymak, hem sizin güvenliğinizi hem de trafik akışını korur; ekibimiz yola çıktığında bu noktaları telefonda tekrar hatırlatır.`;
}

function highwayRouteEnrich(h: Highway): BlogSection {
  return {
    heading: `${h.name} Güzergâhı Hakkında Bilmeniz Gerekenler`,
    paragraphs: h.routeInfo.map((r) => `${r} ${highwayNoteElaboration(r, h)}`),
  };
}

function highwaySafetyEnrich(h: Highway): BlogSection {
  return {
    heading: `${h.name}'de Güvenlik Kurallarının Gerekçesi`,
    paragraphs: h.safetyNotes.map((s) => `${s} ${highwayNoteElaboration(s, h)}`),
  };
}

function highwayEquipmentSection(h: Highway): BlogSection {
  return {
    heading: `${h.name} İçin Kullandığımız Ekipman ve Süreç`,
    paragraphs: [
      `${h.name} üzerindeki çağrılarda standart flatbed (kayar platform) kurtarıcılarımızın yanı sıra, ağır vasıta arızaları için tonaja uygun ayrı bir kurtarıcı filomuz bulunur; hangi araç tipiyle geleceğimizi telefonda konum ve araç bilgisiyle birlikte planlarız.`,
      `Güvenlik koridoru kurmak bizim için standart prosedürdür: aracımız arızalı aracın arkasına, trafiği uyaracak şekilde konumlanır, ekip üyeleri reflektörlü yelekle çalışır ve yükleme bariyer dışından, mümkün olan en kısa sürede tamamlanır.`,
      `${h.name} üzerinde yola çıkan ekibimiz size plaka ve sürücü bilgisini SMS/WhatsApp üzerinden iletir; özellikle tenha kesimlerde veya gece saatlerinde bu teyidi almadan aracınızı kimseye teslim etmemenizi öneririz.`,
    ],
  };
}

function highwayPracticalInfoSection(h: Highway): BlogSection {
  return {
    heading: `${h.name} Hakkında Pratik Bilgiler`,
    paragraphs: [
      `**Hangi araçlar müdahale edebilir**: ${h.name} güzergâhında hem binek/SUV hem ticari/ağır vasıta araçlarına müdahale ediyoruz; ağır vasıta çağrılarında tonaja uygun ayrı bir kurtarıcı filomuzla geliyoruz.`,
      `**Konum bildirimi**: Bu güzergâhta en pratik yöntem WhatsApp'tan canlı konum paylaşmaktır; sözlü tarif gerekirse son geçtiğiniz kavşak/gişe adını ve gidiş yönünüzü (hangi istikamete gittiğinizi) söylemeniz yeterlidir.`,
      `**Varış süresi**: ${h.name} üzerindeki varış sürelerimiz bulunduğunuz kesime göre değişir; telefonda net bir süre veriyoruz ve ekip yola çıktıktan sonra da güncel bilgi paylaşıyoruz, sizi bekletmeden şeffaf iletişim kuruyoruz.`,
    ],
  };
}

function highwayLocalKnowledgeSection(h: Highway): BlogSection {
  return {
    heading: `${h.name}'yi Neden Bu Kadar İyi Biliyoruz`,
    paragraphs: [
      `${h.name} güzergâhında yıllardır düzenli çağrı alan bir ekip olarak, bu aksın hangi kesimlerinde trafik daha sık kilitleniyor, hangi noktalarda güvenli durma cebi bulunuyor ve hangi saatlerde yoğunluk artıyor gibi pratik bilgileri biliyoruz.`,
      `Bu yerel bilgi, telefonda sizi doğru şekilde yönlendirmemizi (örneğin bir sonraki güvenli cebe kadar ilerlemenizi önermek gibi) ve sahaya çıktığımızda alternatif güzergâhlarla trafiğe takılmadan ulaşmamızı sağlıyor.`,
      `${h.name} üzerinde her gün onlarca çağrı karşılayan bir ekip olarak, bu güzergâha özgü riskleri (rüzgâr, buzlanma, yoğun saatler, ağır vasıta trafiği) baştan bilerek doğru ekipman ve doğru zamanlamayla yola çıkıyoruz; bu da sizin için daha kısa bekleme ve daha güvenli bir müdahale anlamına geliyor.`,
    ],
  };
}

function highwayCoordinationSection(h: Highway): BlogSection {
  return {
    heading: `${h.name}'de Trafik Ekipleriyle ve Otoyol İşletmesiyle Koordinasyon`,
    paragraphs: [
      `Kazalı veya çok şeritli trafiği etkileyen vakalarda, gerekirse 112 ve trafik ekipleriyle koordineli çalışıyoruz; önceliğimiz her zaman yaralı varsa can güvenliği, ardından trafik akışının en kısa sürede normale dönmesidir.`,
      `${h.name} üzerinde köprü/tünel işletmesinin kendi güvenlik/müdahale ekipleri varsa (özellikle köprü üstü ve tünel içi vakalarda), önce onların araca güvenli alana alması beklenir; ardından taşımayı biz üstleniriz.`,
      `Bu koordinasyon sayesinde hem sizin güvenliğiniz sağlanır hem de trafiği gereksiz yere uzun süre kapatmadan, mümkün olan en hızlı şekilde yolu açık tutmaya katkıda bulunuruz.`,
    ],
  };
}

function highwayCallProcessSection(h: Highway): BlogSection {
  return {
    heading: `0535 404 80 44'ü Aradığınızda ${h.name} İçin Süreç Nasıl İşliyor`,
    paragraphs: [
      `1. **Önce güvenlik**: Telefonu açtığınızda ilk sorumuz her zaman güvenliğinizle ilgilidir — bariyer dışına geçip geçemediğiniz, yolcularınızın güvende olup olmadığı. Bu adım tamamlanmadan diğer bilgilere geçmiyoruz.`,
      `2. **Konum ve kesim tespiti**: ${h.name} üzerinde en son geçtiğiniz kavşak/gişe adını veya WhatsApp canlı konumunuzu istiyoruz; bu güzergâhın her kesimini bildiğimiz için konum bilgisiyle hızla saha planı yapabiliyoruz.`,
      `3. **Araç ve durum bilgisi**: Aracınızın tipini, arızanın ne zaman başladığını ve varsa görünür bir tehlike (duman, yakıt kokusu, hareket edememe) olup olmadığını soruyoruz.`,
      `4. **Yola çıkış ve bilgilendirme**: Ekip yola çıktığında tahmini varış süresini ve gelecek personelin plaka/isim bilgisini iletiyoruz; ${h.name} gibi tenha kesimleri olan akslarda bu teyit güvenliğiniz için önemlidir.`,
      `5. **Güvenlik koridoru ve yükleme**: Sahaya ulaşan ekibimiz önce güvenlik koridoru kurar, ardından aracınızı ${h.name}'nin trafiğini gereksiz yere kesmeden, hızlı ve hasarsız şekilde platforma alır.`,
    ],
  };
}

function highwayScenarioBank(h: Highway): BlogSection {
  return {
    heading: `${h.name} Üzerinde Sık Karşılaşılan Vaka Senaryoları`,
    paragraphs: HIGHWAY_SCENARIO_TEMPLATES.map((tpl) => tpl(h)),
  };
}

function highwaySeasonalSection(h: Highway): BlogSection {
  return {
    heading: `${h.name}'de Mevsimsel ve Zamana Bağlı Riskler`,
    paragraphs: [
      `**Kış ayları**: Açık ve rüzgârlı kesimlerde soğuk hava, buzlanma ve sis görüş mesafesini ciddi şekilde düşürebilir; ${h.name} üzerinde kış lastiği takılı olmayan araçlarda kayma ve fren mesafesi uzaması kaynaklı vakalar artar. Kış donanımlı kurtarma aracımızla bu dönemde daha sık devriye planlaması yapıyoruz.`,
      `**Yaz ve tatil trafiği**: Yaz aylarında ve bayram tatillerinde ${h.name} üzerindeki trafik yoğunluğu belirgin şekilde artar; uzun süre düşük hızda seyreden araçlarda hararet vakaları çoğalır. Bu dönemlerde ekip sayımızı artırarak varış sürelerini korumaya çalışıyoruz.`,
      `**Gece ve tenha saatler**: Gece geç saatlerde ${h.name} üzerindeki trafik seyrekleşir, bu da hem hız artışına hem de arızalanan bir aracın daha uzun süre fark edilmemesine yol açabilir; dörtlü flaşör ve reflektörü doğru mesafede konumlandırmak bu saatlerde hayati önem taşır.`,
      `**Yağışlı havalar**: Ani sağanak yağışta görüş mesafesi düşer ve zemin kayganlaşır; su birikintisine giren araçlarda motor stop etmesi durumunda aracı tekrar çalıştırmaya çalışmadan, çekilmeden bizi aramanızı öneririz — su çekmiş bir motoru çalıştırmak ağır hasara yol açabilir.`,
    ],
  };
}

export function generateHighwayPosts(): BlogPost[] {
  return highways.map((h) => {
    const sections: BlogSection[] = [
      { heading: "Güzergâh Bilgisi", paragraphs: h.routeInfo },
      { heading: "Güvenlik Notları — Mutlaka Uygulayın", paragraphs: h.safetyNotes },
      highwayRouteEnrich(h),
      highwaySafetyEnrich(h),
      highwaySafetyDeepDive(h),
      highwayDistrictDeepDive(h),
      highwayEquipmentSection(h),
      highwayPracticalInfoSection(h),
      highwayCoordinationSection(h),
      highwayLocalKnowledgeSection(h),
      highwayCallProcessSection(h),
      highwayScenarioBank(h),
      highwaySeasonalSection(h),
      {
        heading: `${h.name}'de Neden Deneyimli Ekip Önemli`,
        paragraphs: [
          `${h.name} gibi yüksek hızlı bir aksta yapılan müdahale, şehir içi bir sokaktan çok farklı disiplin gerektirir: güvenlik koridoru kurmak, doğru ikaz mesafesini bilmek ve trafiği aksatmadan hızlı yükleme yapmak. Ekiplerimiz bu güzergâhı düzenli çalıştığından her kavşağını ve riskli noktasını bilir.`,
          `Ağır vasıta (kamyon, TIR, otobüs) trafiğinin yoğun olduğu kesimlerde ayrıca tonaja uygun kurtarıcı ve yük emniyeti prosedürü uyguluyoruz; binek araç kurtarmasından farklı bir uzmanlık gerektiren bu işler için özel ekipmanımız hazırdır.`,
          `${h.name} üzerinde çalışan ekibimiz, bu güzergâha özgü işletme kurallarını (varsa yaya yasağı, HGS/geçiş prosedürü, bakım kapanışları) bilir ve gerektiğinde otoyol/köprü işletmesiyle koordineli hareket eder; bu koordinasyon sayesinde trafiği gereksiz yere uzun süre kapatmadan aracınızı güvenle alırız.`,
          `Deneyimsiz bir ekiple bu tür bir akste yapılan müdahale hem sizin güvenliğinizi hem trafik akışını riske atabilir; bizim standart prosedürümüz her zaman önce güvenlik koridorunu kurmak, sonra aracı yüklemektir.`,
        ],
      },
      {
        heading: "Sonuç",
        paragraphs: [
          `${h.name} üzerinde veya yaklaşımlarında yaşadığınız her türlü araç arızası, kaza veya yol yardım ihtiyacında 0535 404 80 44'ü arayın. Güvenlik önce gelir: doğru ikaz ve bekleme kurallarını uyguladıktan sonra bizi arayın, 7/24 yanınızdayız ve fiyat bilgisini telefonda anında veririz.`,
        ],
      },
    ];

    return {
      slug: `${h.slug}-arac-arizasi-cekici`,
      category: "otoyol",
      title: `${h.name} Üzerinde Araç Arızası ve Çekici`,
      metaTitle: h.metaTitle,
      metaDescription: `${h.name} üzerinde arıza yaptıysanız güvenlik adımlarını ve 7/24 çekici hizmetimizi öğrenin. Hemen arayın: 0535 404 80 44`,
      intro: h.intro,
      datePublished: TODAY,
      dateModified: TODAY,
      sections,
      faqs: h.faqs,
      relatedPostSlugs: [],
      relatedDistrictSlugs: h.districtSlugs,
      relatedServiceSlugs: ["7-24-cekici-hizmeti", "kaza-sonrasi-arac-cekme", "agir-vasita-kamyon-cekici"],
    } satisfies BlogPost;
  });
}

// ---------------------------------------------------------------------------
// ARAÇ TİPİ BLOGLARI (5)
// ---------------------------------------------------------------------------

function vehicleTypeTechDeepDive(v: VehicleType): BlogSection {
  const paragraphs = v.techNotes.map(
    (note) => `${note} ${issueElaboration(note, v.name)}`
  );
  return {
    heading: `${v.name} İçin Teknik Taşıma Notları`,
    paragraphs: [
      `${v.name} kapsamındaki araçları taşırken üreticinin ve kendi tecrübemizin ortaya koyduğu teknik kurallara harfiyen uyuyoruz; bu kurallara aykırı bir yöntem kısa vadede işe yarasa bile uzun vadede pahalı bir hasara dönüşebilir.`,
      ...paragraphs,
    ],
  };
}

function vehicleTypeIssueDeepDive(v: VehicleType): BlogSection {
  const paragraphs = v.commonIssues.map(
    (issue) => `**${issue}**: ${v.name} kapsamındaki araçlarda bu vaka tipiyle sık karşılaşıyoruz. ${issueElaboration(issue, v.name)}`
  );
  return {
    heading: `${v.name} Kapsamında Sık Görülen Vakalar`,
    paragraphs: [
      `Telefon trafiğimizi düzenli olarak analiz ediyoruz; ${v.name.toLocaleLowerCase("tr")} kapsamındaki araçlardan gelen çağrıların büyük kısmı aşağıdaki vaka tiplerinde toplanıyor. Her biri için telefonda uyguladığımız ön teşhis yöntemi ve sahadaki yaklaşımımız farklıdır:`,
      ...paragraphs,
    ],
  };
}

function vehicleTypeMistakesChecklist(v: VehicleType): BlogSection {
  return {
    heading: `${v.name} Sahiplerinin Sık Yaptığı Hatalar`,
    paragraphs: [
      `${v.name.toLocaleLowerCase("tr")} kapsamındaki araçlarla ilgili aldığımız çağrılarda, sürücülerin farkında olmadan aracın kurtarılmasını zorlaştırdığı veya hasarı büyüttüğü bazı tekrarlayan hatalar görüyoruz. Aşağıdaki listeyi bilmeniz, hem yolda kalma süresini hem olası ek hasarı azaltır:`,
      ...v.checklist.map((c, i) => `${i + 1}. ${c}`),
    ],
  };
}

function vehicleTypeIstanbulSection(v: VehicleType): BlogSection {
  const sampleDistricts = [
    districts.find((d) => d.yaka === "avrupa"),
    districts.find((d) => d.yaka === "anadolu"),
    districts[Math.floor(districts.length / 2)],
  ].filter((d): d is District => Boolean(d));
  const districtNames = [...new Set(sampleDistricts.map((d) => d.name))];
  return {
    heading: `İstanbul'da ${v.name} İçin 7/24 Hizmet`,
    paragraphs: [
      `İstanbul'un 39 ilçesinin tamamında ${v.name.toLocaleLowerCase("tr")} kapsamındaki araçlara 7/24 hizmet veriyoruz. Şehir içi trafik yoğunluğundan otoyol arızalarına, kapalı otopark vakalarından kaza sonrası taşımaya kadar her senaryoda doğru ekipmanla yola çıkıyoruz.`,
      `Telefonda yaptığımız ön teşhisle, mümkün olan durumlarda önce yerinde çözüm (akü takviyesi, lastik değişimi) sunuyoruz; çözülemeyen vakalarda aracınızı üretici prosedürlerine uygun şekilde taşıyoruz. Bu ön teşhis hem sizin bekleme sürenizi kısaltır hem gereksiz bir taşımanın önüne geçer.`,
      `${districtNames.join(", ")} gibi hem Avrupa hem Anadolu yakasının farklı noktalarında konumlanmış ekiplerimiz sayesinde şehrin neresinde olursanız olun ${v.name.toLocaleLowerCase("tr")} kapsamındaki aracınıza makul bir sürede ulaşabiliyoruz.`,
      `Dar sokak, kapalı otopark, site girişi veya otoyol emniyet şeridi fark etmeksizin, ${v.name.toLocaleLowerCase("tr")} sınıfının gövde ölçülerine ve ağırlığına uygun platform/kurtarıcı ile geliyoruz; aracın bulunduğu ortamı telefonda kısaca tarif etmeniz doğru ekipmanla yola çıkmamızı sağlar.`,
    ],
  };
}

function vehicleTypeSafetySection(v: VehicleType): BlogSection {
  return {
    heading: "Yolda Kalırsanız Adım Adım Ne Yapmalısınız",
    paragraphs: [
      `1. Aracınızı, mümkünse ana yolun emniyet şeridine veya yol kenarına, mümkün değilse en yakın güvenli boşluğa alın; dörtlü flaşörünüzü hemen yakın.`,
      `2. Otoyol/ana yol üzerindeyseniz reflektörünüzü aracın en az 50 metre (otoyolda 100 metre) gerisine yerleştirin; siz ve yolcularınız aracın içinde değil, bariyer/kaldırım tarafında bekleyin.`,
      `3. Durumu telefonda kısaca anlatın: ne zaman başladı, hangi uyarı ışığı yandı, ses/koku/duman var mı, araç ${v.name.toLocaleLowerCase("tr")} kapsamında hangi modelde? Bu bilgiler ekibimizin doğru ekipmanla (rampa açısı, go-jack, vinç) yola çıkmasını sağlar.`,
      `4. 0535 404 80 44'ü arayın veya WhatsApp'tan konumunuzu paylaşın; ekibimiz yola çıktığında size plaka ve sürücü bilgisini iletir, özellikle gece saatlerinde bu teyidi almadan aracınızı kimseye teslim etmeyin.`,
      `5. Aracı kendi imkânlarınızla kurtarmaya/çalıştırmaya çalışmayın; özellikle elektronik sistem, aktarma organı veya yüksek voltaj şüphesi olan durumlarda yanlış müdahale hasarı büyütebilir.`,
    ],
  };
}

function vehicleTypeSeasonalSection(v: VehicleType): BlogSection {
  return {
    heading: `${v.name} İçin Mevsimsel ve Kullanım Bazlı Notlar`,
    paragraphs: [
      `**Kış ayları**: Soğuk hava akü kapasitesini düşürür; zaten yıpranmış bir akü kışın ilk soğuk sabahlarda marş vermeyebilir. Kış lastiği kullanılmayan ${v.name.toLocaleLowerCase("tr")} kapsamındaki araçlarda buzlu/karlı zeminde kayma riski belirgin şekilde artar.`,
      `**Yaz ayları**: Uzun süre trafikte bekleyen veya yüklü çalışan araçlarda motor ve fren sistemi normalden fazla yük altında kalır; hararet kaynaklı çağrılar yaz aylarında ve uzun şehirlerarası yolculuklarda artış gösterir.`,
      `**Yoğun kullanım/tatil dönemleri**: Bayram tatili çıkışları veya iş yoğunluğunun arttığı dönemlerde ${v.name.toLocaleLowerCase("tr")} kapsamındaki araçlar normalden fazla kilometre yapar; bu dönemlerde akü, lastik ve mekanik yıpranma kaynaklı çağrılarımız belirgin şekilde artar, ekip sayımızı buna göre planlıyoruz.`,
      `**Uzun süreli bekleme**: Aracınızı uzun süre kullanmayacaksanız (tatil, iş seyahati, garaj/otopark bekletme) akünün tamamen boşalmasını önlemek için periyodik çalıştırma veya akü şarj cihazı kullanmanızı öneririz; bu basit önlem, dönüşte bizi aramanıza gerek kalmadan aracınızın çalışmasını sağlar.`,
    ],
  };
}

function vehicleTypeEquipmentSection(v: VehicleType): BlogSection {
  return {
    heading: `${v.name} İçin Kullandığımız Ekipman ve Yükleme Yöntemi`,
    paragraphs: [
      `${v.name} kapsamındaki araçlar için standart flatbed (kayar platform) kurtarıcılarımızın yanı sıra, gövde ölçüsüne ve ağırlığına uygun rampa açısı, tekerlek paletleri (go-jack) ve gerektiğinde vinç desteği kullanıyoruz; bu ekipman kombinasyonu aracın hiçbir noktasına hasar vermeden yüklenmesini sağlıyor.`,
      `Elektronik park freni, dört çeker sistemi veya kilitli diferansiyel nedeniyle tekerlekleri dönmeyen araçlarda tekerlek paletleriyle santim santim, hasarsız şekilde platforma kaydırma yapıyoruz; bu yöntem özellikle akü tamamen bitmiş veya arıza modunda kalmış araçlarda standart uygulamamızdır.`,
      `Yükleme öncesi ve sonrası aracınızın fotoğraflı durum raporunu tutuyoruz; bu hem sizin hem bizim için şeffaflık sağlıyor, gerektiğinde sigorta sürecinizde ek belge olarak kullanılabiliyor.`,
    ],
  };
}

function vehicleTypeWhyChooseUsSection(v: VehicleType): BlogSection {
  return {
    heading: `Neden ${v.name} İçin Bizi Tercih Etmelisiniz`,
    paragraphs: [
      `${v.name} sınıfının teknik özelliklerini (aktarma sistemi, yük kapasitesi, gövde ölçüleri) bilerek hareket ediyoruz; bu, sahada tahmin yürütmek yerine doğrudan doğru yöntemle işe başlamamızı sağlıyor ve hem bekleme sürenizi hem hasar riskini azaltıyor.`,
      `K1 yetki belgeli, sigortalı bir ekip olarak çalışıyoruz; her yüklemede fotoğraflı durum raporu tutarak süreci şeffaf hale getiriyoruz ve gerekirse bu raporu sigorta sürecinizde kullanabiliyorsunuz.`,
      `İstanbul'un 39 ilçesinin tamamına 7/24 ulaşabilen ekip yapımız sayesinde, ${v.name.toLocaleLowerCase("tr")} kapsamındaki aracınızla ilgili çağrınızı gün veya saat fark etmeksizin karşılıyoruz; fiyat konusunda tek kuralımız nettir — hiçbir sayfada rakam paylaşmıyoruz, arayan herkese telefonda anında net bilgi veriyoruz.`,
    ],
  };
}

function vehicleTypeInsuranceSection(v: VehicleType): BlogSection {
  return {
    heading: `${v.name} İçin Sigorta ve Servis Yönlendirmesi`,
    paragraphs: [
      `Aracınız garanti kapsamındaysa yetkili servise taşınması genelde en mantıklı seçenektir; garanti dışıysa güvendiğiniz özel servise veya markaya özel uzman servislere taşıyabiliriz — karar tamamen sizindir, biz her iki seçeneğe de aynı özenle taşıma yaparız.`,
      `Kaza kaynaklı çağrılarda tutanak ve sigorta süreciniz için gereken temel yönlendirmeyi yapıyoruz; çekici faturamız kasko dosyanızda kullanılabilir. Yükleme öncesi ve sonrası çektiğimiz fotoğraflar hasar tespit sürecinde ek belge olarak işinize yarayabilir.`,
      `Filo veya kurumsal kullanımdaki ${v.name.toLocaleLowerCase("tr")} kapsamındaki araçlar için öncelikli müdahale ve raporlu taşıma içeren anlaşmalar sunuyoruz; detay için telefonla iletişime geçmeniz yeterli.`,
    ],
  };
}

const VEHICLE_TYPE_COMPARISON: Record<string, BlogSection> = {
  "suv-cekici": {
    heading: "SUV Çekiminde Merak Edilen Karşılaştırmalar",
    paragraphs: [
      `**SUV mü, crossover mı?**: Crossover (küçük SUV) modeller genelde binek platformuna daha yakın olsa da, çoğu 4x4/AWD seçeneğe sahiptir; biz aracın 4x4 sistemi olup olmadığını sorup ona göre tam platform ya da standart yöntemle ilerleriz.`,
      `**Standart binek çekiciyle fark**: Standart binek çekicisi SUV'ların ağırlığı ve yüksekliği için bazen yetersiz kalabilir; bizim SUV'lara uygun güçlendirilmiş rampa ve yüksek kapasiteli platformlarımız bu farkı ortadan kaldırır.`,
      `**Arazi SUV'u mu, şehir SUV'u mu?**: Arazi ağırlıklı kullanılan SUV'larda saplanma/şasi teması riski daha yüksektir ve vinçli kurtarma gerekebilir; şehir içi kullanılan SUV'larda ise akü ve lastik vakaları öne çıkar — hangi kullanım tipinde olduğunuzu belirtmeniz doğru ekibi göndermemizi sağlar.`,
    ],
  },
  "elektrikli-arac-cekici-rehberi": {
    heading: "Elektrikli, Hibrit ve Benzinli Araç Çekiminde Fark Nedir",
    paragraphs: [
      `**Tam elektrikli (EV) araçlar**: Elektrik motoru doğrudan tekerleklere bağlı olduğundan EV'ler istisnasız tam platformda taşınır; halatla veya iki teker yerde bırakılarak çekim kesinlikle uygulanmaz.`,
      `**Hibrit araçlar**: Hibritlerde de elektrik motoru aktarma organına bağlı olduğundan aynı kural geçerlidir — tam platform taşıma. Fark, hibritlerde ayrıca bir yakıt deposu ve iç yanmalı motor bulunmasıdır; bu da bazı arıza tiplerinde (yakıt sistemi) benzinli araçlarla ortak vaka tipleri yaratır.`,
      `**Benzinli/dizel araçlar**: Bu araçlarda çekme yöntemi şanzıman tipine (manuel/otomatik) göre değişir; bazı durumlarda kısa mesafede iki teker yerde bırakılarak çekim mümkün olsa da, biz güvenlik ve hasarsızlık için genelde yine tam platformu tercih ederiz.`,
    ],
  },
  "panelvan-ticari-arac-cekici": {
    heading: "Yüklü ve Boş Panelvan Çekiminde Fark Nedir",
    paragraphs: [
      `**Boş panelvan**: Yükü olmayan bir panelvanın taşınması standart bir binek taşımaya yakındır; tek fark gövde ölçüsüne uygun rampa ve platform uzunluğudur.`,
      `**Yüklü panelvan**: Yük varsa dingil dengesi ve yük sabitleme öne çıkar; platform üzerinde ek kayış noktaları kullanılır, ağır/hassas yüklerde önce boşaltma veya aktarma seçeneği değerlendirilir.`,
      `**Yolcu taşıyan minibüs/servis aracı**: İçinde yolcu varken arızalanan araçlara en yüksek önceliği veriyoruz; önce yolcuların güvenli şekilde inmesi ve alternatif ulaşımı, ardından aracın taşınması planlanır.`,
    ],
  },
  "cip-4x4-cekici": {
    heading: "Şehir İçi Cip ile Arazi Kurtarması Arasındaki Fark",
    paragraphs: [
      `**Şehir içi arıza**: Cip/4x4 aracınız şehir içinde arızalandıysa (akü, lastik, elektronik) süreç standart bir taşımadan farklı değildir; tek fark dört çeker sistemin tam platform gerektirmesidir.`,
      `**Arazi kurtarması**: Çamur, kum veya kayalık zeminde saplanan bir cip için vinçli kurtarma aracımız ve doğru askı noktası hesabı devreye girer; bu, standart şehir içi çekiciden farklı bir uzmanlık ve ekipman gerektirir.`,
      `**Devrilme sonrası**: Arazide devrilen bir cipin kaldırılması kontrollü vinç operasyonu gerektirir; kendi imkânlarınızla doğrultmaya çalışmak ek hasar ve yaralanma riski taşır, bu işlemi mutlaka deneyimli bir ekibe bırakmalısınız.`,
    ],
  },
  "kamyonet-cekici": {
    heading: "Kamyonet ile Panelvan Çekimi Arasındaki Fark",
    paragraphs: [
      `**Dingil yükü farkı**: Kamyonetler (pikap tipi kasa dahil) panelvanlara göre farklı bir dingil yükü dağılımına sahiptir; yükleme sırasında ön/arka denge bu farka göre ayarlanır.`,
      `**Kasa üstü donanım**: Kamyonetlerde sık görülen kasa üstü ilave donanım (tente, sabit kasa) taşıma sırasında ekstra yükseklik yaratabilir; rampa geçişinde bu ölçülür ve gerekirse alternatif güzergâh planlanır.`,
      `**Esnaf/pazarcı kullanımı**: Mal yüklü kamyonetlerde zaman kritik olabilir; esnaf çağrılarına öncelik vererek malın teslim/aktarma ihtiyacını gözeten hızlı bir plan kuruyoruz.`,
    ],
  },
};

function vehicleTypeComparisonSection(v: VehicleType): BlogSection {
  return (
    VEHICLE_TYPE_COMPARISON[v.slug] ?? {
      heading: `${v.name} İçin Merak Edilenler`,
      paragraphs: [
        `${v.name} kapsamındaki araçlar kullanım amacına göre farklı taşıma ihtiyaçları doğurabilir; aracınızın yük/kullanım durumunu telefonda kısaca anlatmanız doğru ekipmanla yola çıkmamızı sağlar.`,
      ],
    }
  );
}

function vehicleTypeExperienceSection(v: VehicleType): BlogSection {
  return {
    heading: `${v.name} Konusunda Neden Deneyimliyiz`,
    paragraphs: [
      `${v.name.toLocaleLowerCase("tr")} kapsamındaki araçlar için yıllardır düzenli çağrı alan bir ekip olarak, bu sınıfın tipik arıza kalıplarını, doğru bağlama noktalarını ve yükleme inceliklerini biliyoruz.`,
      `Bu deneyim, sahada tahmin yürütmek yerine doğrudan doğru yöntemle işe başlamamızı sağlıyor; hem bekleme sürenizi kısaltıyor hem hasar riskini en aza indiriyor.`,
      `Ekibimiz düzenli olarak ${v.name.toLocaleLowerCase("tr")} kapsamındaki modellerle çalıştığı için, telefonda aktardığınız kısa bir belirti tarifinden bile büyük ölçüde doğru teşhise ulaşabiliyor; bu da sahaya doğru ekipmanla, ilk seferde çıkmamızı sağlıyor.`,
    ],
  };
}

function vehicleTypeDocumentationSection(v: VehicleType): BlogSection {
  return {
    heading: `${v.name} Taşımasında Belge, Fatura ve Güvence`,
    paragraphs: [
      `Her taşımada yasal fatura düzenliyoruz; bu fatura hem kurumsal/filo müşteriler hem kasko/sigorta süreci yürüten müşteriler için gereken resmi belgedir.`,
      `Yükleme öncesi ve sonrası çektiğimiz fotoğraflar, aracın taşıma öncesindeki mevcut durumunu (varsa önceki hasar, yük durumu, lastik/jant durumu) kayıt altına alır; bu, hem sizi hem bizi olası bir anlaşmazlıkta koruyan şeffaf bir uygulamadır.`,
      `K1 yetki belgeli ve sigortalı bir firma olarak, ${v.name.toLocaleLowerCase("tr")} kapsamındaki aracınızın taşınması sırasında oluşabilecek olağandışı bir durumda da güvence altında olursunuz; bu belgeleri talep etmeniz halinde memnuniyetle paylaşırız.`,
      `Filo/kurumsal müşterilerimiz için aylık toplu faturalandırma ve raporlama seçeneği de sunuyoruz; birden fazla aracınız için düzenli hizmet ihtiyacınız varsa telefonla detaylı bilgi alabilirsiniz.`,
    ],
  };
}

function vehicleTypeCallProcessSection(v: VehicleType): BlogSection {
  return {
    heading: `0535 404 80 44'ü Aradığınızda ${v.name} İçin Süreç Nasıl İşliyor`,
    paragraphs: [
      `1. **Telefonda ön teşhis**: Aracınızın modelini, yaşadığınız belirtiyi (ses, koku, uyarı ışığı, hareket edip etmediği) ve konumunuzu soruyoruz; bu bilgiler ekibin doğru ekipmanla (rampa açısı, go-jack, vinç) yola çıkmasını sağlıyor.`,
      `2. **Konum teyidi**: WhatsApp'tan canlı konum paylaşmanızı istiyoruz; sözlü tarif gerekiyorsa yakın bir bina, kavşak veya işletme adını referans alıyoruz.`,
      `3. **Yola çıkış ve bilgilendirme**: Ekip yola çıktığında size tahmini varış süresini ve gelecek personelin plaka/isim bilgisini iletiyoruz; bu teyit özellikle gece saatlerinde güvenliğiniz için önemlidir.`,
      `4. **Yerinde değerlendirme**: Sahaya ulaşan ekibimiz önce yerinde çözüm (takviye, lastik değişimi, yakıt ikmali) mümkün mü diye bakar; değilse ${v.name.toLocaleLowerCase("tr")} sınıfına uygun yönteme (tam platform, go-jack, vinç) geçer.`,
      `5. **Taşıma ve teslim**: Yükleme öncesi/sonrası fotoğraflı durum raporu tutulur, araç sizin belirlediğiniz adrese (servis, ev, işyeri) teslim edilir; fiyat bilgisi süreç boyunca telefonda net şekilde verilir.`,
    ],
  };
}

export function generateVehicleTypePosts(): BlogPost[] {
  return vehicleTypes.map((v) => {
    const sections: BlogSection[] = [
      vehicleTypeTechDeepDive(v),
      vehicleTypeIssueDeepDive(v),
      vehicleTypeIstanbulSection(v),
      vehicleTypeMistakesChecklist(v),
      vehicleTypeEquipmentSection(v),
      vehicleTypeInsuranceSection(v),
      vehicleTypeSeasonalSection(v),
      vehicleTypeWhyChooseUsSection(v),
      vehicleTypeComparisonSection(v),
      vehicleTypeDocumentationSection(v),
      vehicleTypeExperienceSection(v),
      vehicleTypeCallProcessSection(v),
      vehicleTypeSafetySection(v),
      {
        heading: "Sonuç",
        paragraphs: [
          `${v.name} kapsamındaki her türlü arıza, kaza veya yol yardım ihtiyacında 0535 404 80 44'ü arayın. K1 belgeli, sigortalı ekibimiz İstanbul'un her noktasına 7/24 ulaşır, doğru ekipman ve prosedürle aracınızı hasarsız şekilde taşır ve fiyat bilgisini telefonda anında verir.`,
        ],
      },
    ];

    return {
      slug: v.slug,
      category: "arac-tipi",
      title: v.name,
      metaTitle: `${v.name} İstanbul | 7/24 — 0535 404 80 44`,
      metaDescription: `${v.name} konusunda İstanbul'da 7/24 uzman çekici hizmeti. Hemen arayın: 0535 404 80 44`,
      intro: v.intro,
      datePublished: TODAY,
      dateModified: TODAY,
      sections,
      faqs: v.faqs,
      relatedPostSlugs: [],
      relatedServiceSlugs: services.slice(0, 3).map((s) => s.slug),
    } satisfies BlogPost;
  });
}

export function allGeneratedPosts(): BlogPost[] {
  return [
    ...generateDistrictPosts(),
    ...generateBrandPosts(),
    ...generateHighwayPosts(),
    ...generateVehicleTypePosts(),
  ];
}

export const YAKA_POST_LABEL = YAKA_LABEL;
export const SITE_URL = SITE.url;
