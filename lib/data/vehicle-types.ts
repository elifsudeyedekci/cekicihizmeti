import type { VehicleType } from "./types";

/** 5 araç tipi bazlı blog verisi */
export const vehicleTypes: VehicleType[] = [
  {
    slug: "suv-cekici",
    name: "SUV Çekici Hizmeti",
    intro:
      "SUV'unuz İstanbul'da yolda mı kaldı? 0535 404 80 44'ü arayın: yüksek karoserli, ağır ve çoğu 4x4 olan SUV'lar için uygun rampa açısı ve tam platform taşımayla 7/24 hizmet veriyoruz.",
    techNotes: [
      "SUV'ların çoğu 4x4/AWD sistemle gelir; bu sistemler kısmi çekime (iki tekerlek yerde) izin vermez, tam platform şarttır.",
      "Yüksek karoseri ve ağır dingil yükü nedeniyle standart binek rampası bazı büyük SUV'larda (Land Cruiser, Suburban tipi) yetersiz kalabilir; güçlendirilmiş rampa kullanırız.",
      "Off-road lastikli SUV'larda blok deseni nedeniyle platform üzerinde ek sabitleme (tekerlek kaması) uygularız.",
      "Çekme kancası olmayan modern SUV'larda (estetik tampon nedeniyle) çekme gözü konumunu bagaj/kullanım kılavuzundan teyit ederiz.",
    ],
    commonIssues: [
      "4x4/AWD sistem arıza ikazı",
      "Akü tükenmesi (ağır elektrik yükü ve çok sayıda elektronik donanım)",
      "Off-road lastik hasarı ve blok deseni kaynaklı denge kaybı",
      "Arazi/çamur/kar zemininde saplanma",
      "Devrilme veya yan yatma sonrası kurtarma",
    ],
    checklist: [
      "Çekme kancasını tampon altında zannedip aracı halatla çekmeye çalışmak — modern SUV'larda çekme gözü kapaklı ve gizlidir, yanlış noktadan çekiş şasiye zarar verir.",
      "4x4 sistemi devredeyken iki tekerleği yerde bırakarak çekmeye çalışmak — transfer kutusuna kalıcı hasar verir.",
      "Off-road lastikle uzun süre asfaltta yüksek hızda seyretmek — blok deseni ısınıp erken aşınır, patlak riski artar.",
      "Arazide saplandığında gaza basarak kurtulmaya çalışmak — tekerlek daha derine gömülür, vinçli kurtarma gerekir hale gelir.",
      "Katlı otoparklarda yükseklik sınırını kontrol etmeden girmek — SUV'ların tavan yüksekliği çoğu zaman binek sınırını aşar.",
    ],
    faqs: [
      { q: "SUV'um 4x4, nasıl çekilir?", a: "Yalnızca tam platformda; dört çeker sistemler kısmi kaldırmaya izin vermez. Tekerlek üzerinde çekim aktarma organlarına zarar verir." },
      { q: "Büyük SUV'um (7 koltuklu) ağır, standart çekici taşıyabilir mi?", a: "Evet, ağır hizmet platformlarımız büyük SUV'ların tonajına uygundur; gerekirse güçlendirilmiş rampa kullanırız." },
      { q: "SUV çekici ücreti ne kadar?", a: "Araç tipine ve mesafeye göre değişir. Fiyat almak için hemen arayınız: 0535 404 80 44." },
      { q: "Off-road lastiklerim platformda kayar mı?", a: "Kaymaz; blok desenli lastikler için ek tekerlek kaması ve sıkı kayış düzeni uygularız." },
      { q: "SUV'umun çekme kancası görünmüyor, nasıl bulacaksınız?", a: "Çoğu modern SUV'da çekme gözü tampon arkasında kapaklıdır; kullanım kılavuzu veya bilgimizle konumunu buluruz." },
      { q: "Arazide saplanan SUV'umu kurtarıyor musunuz?", a: "Evet, vinçli kurtarma aracımızla toprak/çamur/kum zeminlerden SUV çıkarıyoruz." },
      { q: "Elektrikli/hibrit SUV'um (örn. RAV4 Hybrid, EV6) için kural farklı mı?", a: "Evet, elektrikli ve hibrit SUV'lar kesinlikle tam platformda taşınır; tekerlek üzerinde çekilmez." },
      { q: "SUV'umu kapalı otoparktan çekebiliyor musunuz?", a: "Evet, ancak SUV'ların yüksekliği bazı katlı otoparklarda sınırlayıcı olabilir; giriş öncesi yükseklik bilgisini kontrol ederiz." },
      { q: "SUV'um kaza yaptı ve yana yattı, kurtarma yapıyor musunuz?", a: "Evet, vinç kapasiteli aracımızla devrilmiş SUV'ları güvenle kaldırıp platforma alıyoruz." },
      { q: "SUV'da en sık gördüğünüz arıza nedir?", a: "Akü (ağır elektrik yükü), lastik (off-road kullanım) ve 4x4 sistem uyarıları en sık gördüğümüz vakalardır." },
    ],
  },
  {
    slug: "elektrikli-arac-cekici-rehberi",
    name: "Elektrikli Araç Çekici Rehberi",
    intro:
      "Elektrikli aracınız için çekici ararken bilmeniz gereken tek kural şudur: EV'ler yalnızca kayar platformla (flatbed) taşınır. 0535 404 80 44 — İstanbul'da bu kurala %100 uyan EV çekici hizmeti.",
    techNotes: [
      "Elektrikli araçlarda tekerlekler doğrudan elektrik motoruna bağlıdır; halatla çekiminde dönen tekerlek motorda kontrolsüz gerilim (rejeneratif etki) üretir ve invertere/motor sargılarına zarar verebilir.",
      "12V yardımcı akü bitince araç 'tamamen ölü' görünür (kapılar/vites açılmaz); bu EV'lerde çekici değil, 12V takviyesiyle çözülen en sık vakadır.",
      "Yüksek voltaj güvenliği: kazalı EV'lerde üretici acil müdahale kılavuzu (rescue sheet) referans alınır; batarya hasarı şüphesinde güvenlik mesafesi ve açık alan parkı uygulanır.",
      "Şarj bitiminde en pratik çözüm aracı en yakın DC hızlı şarj istasyonuna platformla taşımaktır.",
    ],
    commonIssues: [
      "12V yardımcı akü bitmesi ('araç tamamen ölü' hissi)",
      "Şarj bitmesi / yol ortasında enerji tükenmesi",
      "Kaza sonrası yüksek voltaj güvenlik uyarısı",
      "Şarj kablosu/portu kilitlenmesi",
      "Elektronik park kilidi açılmaması",
    ],
    checklist: [
      "Aracı 'açılmıyor' diye halatla çekmeye çalışmak — büyük ihtimalle sorun 12V akü, çözüm takviyedir; halatla çekim motor/invertere zarar verir.",
      "Şarj yüzdesi kritik seviyeye inene kadar yola devam etmek — tahmini menzil trafik/hava koşuluyla değişir, tükenmeden önce şarj planlamak gerekir.",
      "Kazadan sonra bataryaya kendiliğinden müdahale etmeye çalışmak — yüksek voltaj riski taşır, üretici kurtarma prosedürü beklenmelidir.",
      "Şarj kablosunu zorla çekmeye çalışmak — port kilitliyken zorlama konektöre zarar verir, önce araç menüsünden kilit açma denenmelidir.",
      "Uzun süre şarjsız bırakmak — 12V akü de zamanla tükenir ve aracı tamamen 'uyandırma' ihtiyacı doğar.",
    ],
    faqs: [
      { q: "Elektrikli aracım neden halatla çekilmez?", a: "Tekerlekler motora bağlı olduğundan dönme motorda kontrolsüz gerilim üretir; inverter ve sargılar hasar görebilir. Bu yüzden EV'ler istisnasız tam platformda taşınır." },
      { q: "Aracım hiç açılmıyor, tamamen ölü gibi; ne yapmalıyım?", a: "Büyük ihtimalle 12V yardımcı akü bitmiştir; bu EV'lerde en sık görülen vakadır ve 12V takviyesiyle çözülür." },
      { q: "Şarjım bitti, yolda mobil şarj yapıyor musunuz?", a: "Mobil şarj yerine aracınızı platformla en yakın DC hızlı şarj istasyonuna taşımak hem daha hızlı hem daha güvenlidir." },
      { q: "EV çekici ücreti ne kadar?", a: "Araç tipine ve mesafeye göre değişir. Fiyat almak için hemen arayınız: 0535 404 80 44." },
      { q: "Kazalı elektrikli aracımda yangın riski var mı?", a: "Batarya hasarı şüphesinde risk ciddiye alınır; güvenlik mesafesi ve açık alan parkı uygularız, gerekirse itfaiyeyi bilgilendiririz." },
      { q: "Hibrit araçlar için de aynı kural geçerli mi?", a: "Evet, hibritlerde de elektrik motoru aksa bağlı olduğundan tam platform taşıma önerilir/uygulanır." },
      { q: "Vites N'ye alınmıyor (park kilidi elektronik), nasıl yükleyeceksiniz?", a: "12V takviyesiyle aracı uyandırıp taşıma moduna alırız; olmuyorsa tekerlek paletleriyle hasarsız yükleriz." },
      { q: "Şarj kablom araçta/istasyonda kilitli kaldı, çözer misiniz?", a: "Evet, 12V destek ve araç menü prosedürüyle kilidi açmayı deneriz; olmuyorsa marka çağrı merkeziyle koordine oluruz." },
      { q: "EV'mi şehirlerarası taşıtabilir miyim?", a: "Evet, uzun mesafe EV taşıması yapıyoruz; varış noktasında şarj planlaması için öneri de veririz." },
      { q: "Yağmur/su birikintisinde kalan EV güvenli mi?", a: "EV'ler yalıtımlıdır ancak derin su geçişi şüphesinde aracı çalıştırmadan platformla servise taşımak en güvenlisidir." },
    ],
  },
  {
    slug: "panelvan-ticari-arac-cekici",
    name: "Panelvan / Ticari Araç Çekici",
    intro:
      "Panelvan veya ticari aracınız mı arızalandı? 0535 404 80 44 — yüklü haldeki panelvan, minibüs ve kamyonetleri yük emniyetini bozmadan İstanbul'un her noktasında 7/24 taşıyoruz.",
    techNotes: [
      "Yoğun kullanılan ticari araçlarda debriyaj ve şanzıman en sık arıza kalemidir; sürücüler genelde 'kayma/koku' belirtisini geç fark eder.",
      "Yüklü taşımada yük dağılımı ve sabitleme kritik; platform üzerinde yükün kaymaması için ek kayış noktaları kullanılır.",
      "Bozulabilir/zaman kritik yük (gıda, ilaç, e-ticaret teslimatı) taşıyan araçlarda iki aşamalı çözüm uygulanır: önce teslimat/aktarma, sonra servis.",
      "Filo araçlarında kurumsal anlaşma ile öncelikli müdahale ve raporlu taşıma sunulur.",
    ],
    commonIssues: [
      "Debriyaj/şanzıman yıpranması (yoğun durma-kalkma trafiği)",
      "Aşırı yükleme kaynaklı süspansiyon ve lastik hasarı",
      "Akü tükenmesi (sık kapı açma-kapama, iç donanım yükü)",
      "Yakıt sistemi arızaları (yoğun km kullanımı)",
      "Kaza/çarpma sonrası kasa hasarı ve yük kayması",
    ],
    checklist: [
      "Debriyaj kayma/koku belirtisiyle sürmeye devam etmek — kavrama tamamen bitene kadar zorlamak servis maliyetini büyütür.",
      "Yükü platform/kasada sabitlemeden yola çıkmak — ani fren veya kazada yük kayması hem sürücü hem çevre için risklidir.",
      "Zaman kritik yükü (soğuk zincir, e-ticaret) bildirmeden çağrı açmak — bildirilirse önceliklendirip iki aşamalı (teslimat + taşıma) çözüm kurarız.",
      "Aracı kapasite üstü yüklemek — dingil dengesi bozulur, lastik ve süspansiyon ömrü kısalır.",
      "Filo aracını münferit çağrı gibi bildirmek — kurumsal/filo anlaşmanız varsa belirtin, öncelikli müdahale ve raporlu süreç işletilir.",
    ],
    faqs: [
      { q: "Panelvanım yüklüyken arızalandı, yükle birlikte taşıyor musunuz?", a: "Evet, yük emniyetini koruyarak yüklü taşıma yapıyoruz; gerekirse önce teslimat noktasına uğrarız." },
      { q: "Debriyajım kokuyor ve kayma yapıyor, sürmeye devam edeyim mi?", a: "Önerilmez; debriyaj tamamen bitmeden aracı durdurup platforma almak daha ekonomiktir." },
      { q: "Ticari araç çekici ücreti ne kadar?", a: "Araç tipine, yük durumuna ve mesafeye göre değişir. Fiyat almak için hemen arayınız: 0535 404 80 44." },
      { q: "Soğuk zincir (frigorifik) aracım arızalandı, yük bozulur mu?", a: "Yükün zaman kritik olduğunu bildirin; önceliklendirip hızlı aktarma veya taşıma planlarız." },
      { q: "Minibüs hattımız yolcularla birlikte arızalandı, öncelik var mı?", a: "Evet, içinde yolcu olan toplu taşıma araçlarına en yüksek önceliği veriyoruz." },
      { q: "Kamyonetimin lastiği patladı, yük ağırlığı sorun olur mu?", a: "Hayır, yük ağırlığına uygun ekipmanla yerinde değişim veya taşıma yapıyoruz." },
      { q: "Filo araçlarımız için kurumsal anlaşma yapıyor musunuz?", a: "Evet, öncelikli müdahale ve raporlu taşıma içeren filo anlaşmaları sunuyoruz; detay için arayın." },
      { q: "Ticari aracım dar sokakta arızalandı, büyük çekici girer mi?", a: "Kompakt platform aracımızla dar sokaklarda da çalışıyoruz; gerekirse tekerlek paletiyle uygun noktaya kaydırırız." },
      { q: "Ticari aracımın aküsü sürekli bitiyor, öneriniz ne?", a: "Yoğun durma-kalkma kullanımı aküyü hızla yıpratır; takviye sonrası test edip akü ömrünü doldurduysa değişim öneririz." },
      { q: "Ticari aracımı şehirlerarası taşıtabilir miyim?", a: "Evet, panelvan ve kamyonetler için şehirlerarası taşıma hizmetimiz var." },
    ],
  },
  {
    slug: "cip-4x4-cekici",
    name: "Cip / 4x4 Çekici Hizmeti",
    intro:
      "4x4 cipiniz arazide veya yolda mı kaldı? 0535 404 80 44 — dört çeker sistemlere uygun tam platform taşıma ve arazi kurtarma (vinçli) hizmeti 7/24.",
    techNotes: [
      "Dört çeker (4x4/4WD/AWD) sistemler kısmi çekime (iki tekerlek yerde, iki tekerlek platformda) izin vermez; transfer kutusu ve diferansiyellere zarar verir. Tam platform zorunludur.",
      "Kilitli diferansiyel veya arıza modunda 'sürülemez' duruma geçen ciplerde tekerlek dönmeyebilir; bu durumda tekerlek paletleriyle (go-jack) yükleme yapılır.",
      "Arazi/off-road kurtarmalarında (çamur, kum, kaya) vinç halatı ve doğru askı noktası hesabı kritik; yanlış çekiş noktası şasi hasarı yaratır.",
      "Yüksek yerden yükseklik nedeniyle bazı ciplerin platforma çıkış rampası eğimi ayrıca ayarlanır.",
    ],
    commonIssues: [
      "Arazide (çamur/kum/kaya) saplanma",
      "Diferansiyel kilidi/transfer kutusu arıza modu",
      "Şasi altı temas/hasar (yüksek engelli arazi)",
      "Off-road lastik patlağı",
      "Devrilme sonrası kurtarma",
    ],
    checklist: [
      "Saplanan aracı gaza basarak kurtarmaya çalışmak — tekerlek daha derine gömülür, çoğu zaman vinçli kurtarmayı zorunlu hale getirir.",
      "Yanlış noktadan (plastik tampon, egzoz borusu) halat bağlamak — doğru çekme gözü/askı noktası kullanılmazsa şasi veya yakıt hattı zarar görür.",
      "Diferansiyel kilitliyken tekerleği zorla döndürmeye çalışmak — tekerlek paletleriyle (go-jack) hasarsız kaydırmak tek güvenli yöntemdir.",
      "Arazi turu öncesi lastik basıncını düşürüp sonrasında normale döndürmeyi unutmak — otoyolda düşük basınçlı lastik patlağa çok daha yatkındır.",
      "Devrilme sonrası aracı kendi imkânlarıyla doğrultmaya çalışmak — kontrolsüz kaldırma ek hasar ve yaralanma riski taşır, vinç kapasiteli ekip beklenmelidir.",
    ],
    faqs: [
      { q: "4x4 cipim nasıl çekilir?", a: "Yalnızca tam platformda; dört çeker sistemler kısmi kaldırmaya izin vermez, aksi halde transfer kutusu/diferansiyel hasar görür." },
      { q: "Cipim arazide çamura/kaya arasına saplandı, kurtarıyor musunuz?", a: "Evet, vinçli kurtarma aracımızla doğru askı noktalarından güvenli çekiş yapıyoruz." },
      { q: "4x4 çekici ücreti ne kadar?", a: "Araç tipine, arazi zorluğuna ve mesafeye göre değişir. Fiyat almak için hemen arayınız: 0535 404 80 44." },
      { q: "Diferansiyel kilitli, tekerlek dönmüyor; yükleme nasıl olacak?", a: "Tekerlek paletleri (go-jack) ile santim santim kaydırarak hasarsız platforma alırız." },
      { q: "Cipimin şasisi altından takoz koyup çekmek zarar verir mi?", a: "Yanlış noktadan çekiş şasi/egzoz/yakıt hattına zarar verebilir; doğru çekme gözü/askı noktasını kullanırız." },
      { q: "Kayalık arazide devrilen cipimi kaldırabiliyor musunuz?", a: "Evet, vinç kapasiteli aracımızla kontrollü kaldırma yapıyoruz." },
      { q: "Off-road lastiklerim (mud terrain) platformda sabit durur mu?", a: "Evet, blok desenli lastikler için ek kama ve sıkı kayış düzeni uygularız." },
      { q: "Cipimi arazi turundan sonra şehir merkezine taşır mısınız?", a: "Evet, arazi noktasından alıp istediğiniz servise veya adrese taşıyoruz." },
      { q: "Elektrikli/hibrit 4x4 (örn. bazı yeni SUV'lar) için kural farklı mı?", a: "Evet, elektrikli/hibrit 4x4'ler kesinlikle tam platformda taşınır." },
      { q: "Cipimde en sık gördüğünüz arıza nedir?", a: "Arazi kurtarma dışında akü ve lastik vakaları en sık görülenlerdir; şehir içi kullanımda da 4x4 sistem uyarıları görülür." },
    ],
  },
  {
    slug: "kamyonet-cekici",
    name: "Kamyonet Çekici Hizmeti",
    intro:
      "Kamyonetiniz mi yolda kaldı? 0535 404 80 44 — yüklü veya boş kamyonetleri (1.5-3.5 ton sınıfı) dingil dengesini koruyarak İstanbul'un her noktasında 7/24 taşıyoruz.",
    techNotes: [
      "Kamyonetler (Kango, Doblo, Fiorino, Transit gibi hafif ticari + pikaplar) binek platformundan farklı dingil yükü dağılımına sahiptir; yükleme sırasında ön/arka denge gözetilir.",
      "Yüklü kamyonette platform üzerinde yükün kaymaması için ek sabitleme noktaları kullanılır; ağır yük varsa önce boşaltma/aktarma önerilir.",
      "Kasa üstü ilave donanım (soğutucu, tente, özel kasa) taşıma sırasında ekstra yükseklik/genişlik yaratabilir; rampa geçişinde bu ölçülür.",
      "Yoğun şehir içi kullanım debriyaj ve fren sistemini hızlı yıpratır; bu iki kalem en sık gördüğümüz kamyonet arızasıdır.",
    ],
    commonIssues: [
      "Debriyaj/fren sistemi yıpranması (yoğun şehir içi kullanım)",
      "Aşırı/yanlış dağıtılmış yük kaynaklı denge kaybı",
      "Akü ve marş sorunları",
      "Kasa üstü donanım (soğutucu, tente) kaynaklı yükseklik/genişlik sorunları",
      "Lastik patlağı (yük altında)",
    ],
    checklist: [
      "Fren tutmaz durumdayken sürmeye devam etmek — ciddi kaza riski taşır, aracı olduğu yerde bırakıp taşıma istemek en güvenlisidir.",
      "Yükü öne/arkaya yanlış dağıtmak — dingil dengesi bozulur, hem sürüş güvenliği hem yükleme sırasında risk oluşturur.",
      "Soğutucu/tenteli kasanın yüksekliğini ölçmeden rampa/tünel/otopark girişine yönelmek — kasa üstü donanım standart ölçüleri aşabilir.",
      "Yük ağırlığını bildirmeden çağrı açmak — doğru ekipman ve rampa açısı seçimi için yük bilgisi önemlidir.",
      "Debriyaj kokusu/kaymasını görmezden gelmek — kamyonetlerde en sık gördüğümüz arıza kalemidir, erken müdahale masrafı azaltır.",
    ],
    faqs: [
      { q: "Kamyonetim yüklüyken arızalandı, yükle taşıyor musunuz?", a: "Evet, yük dengesini koruyarak taşıyoruz; ağır yükte önce boşaltma/aktarma önerebiliriz." },
      { q: "Kamyonetimin freni tutmuyor, ne yapmalıyım?", a: "Aracı sürmeyin; fren arızası ciddi risktir. Aracı olduğu yerde bırakıp bizi arayın, platformla taşıyalım." },
      { q: "Kamyonet çekici ücreti ne kadar?", a: "Araç tipine, yük durumuna ve mesafeye göre değişir. Fiyat almak için hemen arayınız: 0535 404 80 44." },
      { q: "Kasamda soğutucu var, taşıma sırasında elektrik kesilir mi?", a: "Kesilebilir; bozulabilir yük varsa süreyi kısa tutmak için önceliklendirir, gerekirse aktarma öneririz." },
      { q: "Debriyajım şehir içi kullanımdan bitti, ne kadar sık görülüyor?", a: "Çok sık — kamyonetlerde en yaygın arıza kalemidir. Zorlamadan platforma alıp servise taşırız." },
      { q: "Kamyonetim dar sokakta arızalandı, girer misiniz?", a: "Evet, kompakt platform aracımızla dar sokaklarda çalışıyoruz." },
      { q: "Pazarcıyım, kamyonetim mal yükleriyle kaldı; hızlı çözüm var mı?", a: "Esnaf çağrılarına öncelik veriyoruz; malın teslim/aktarma ihtiyacını gözeterek hızlı planlarız." },
      { q: "Kamyonetimin lastiği patladı, yük var; yerinde değişim yapılır mı?", a: "Yedek varsa yük ağırlığına uygun ekipmanla yerinde değiştiririz; yoksa lastikçiye taşırız." },
      { q: "Filomuz kamyonetlerden oluşuyor, kurumsal anlaşma var mı?", a: "Evet, öncelikli müdahale içeren filo anlaşmaları sunuyoruz." },
      { q: "Kamyonetimi şehirlerarası taşıtabilir miyim?", a: "Evet, kamyonet sınıfı için şehirlerarası taşıma hizmetimiz mevcuttur." },
    ],
  },
];

export function getVehicleType(slug: string): VehicleType | undefined {
  return vehicleTypes.find((v) => v.slug === slug);
}
