import type { District } from "./types";

/** Avrupa Yakası ilçeleri — Bölüm 4/4 */
export const avrupa4: District[] = [
  {
    slug: "silivri",
    name: "Silivri",
    yaka: "avrupa",
    neighborhoods: ["Piri Mehmet Paşa", "Alibey", "Selimpaşa", "Değirmenköy", "Çanta", "Gümüşyaka", "Kavaklı", "Ortaköy köyü", "Semizkumlar"],
    roads: ["TEM (O-3) Silivri gişeleri", "D-100 (E-5) Silivri kesimi", "Silivri-Çorlu bağlantısı", "sahil yolu (Selimpaşa-Silivri)"],
    landmarks: ["Silivri sahili ve limanı", "Marmara Cezaevi yerleşkesi", "Selimpaşa sahil", "Silivri Kapalı Cezaevi kavşağı", "yazlık site bölgeleri"],
    arrivalMinutes: "35-55",
    arrivalTable: [
      { area: "Silivri merkez / sahil", minutes: "35-50 dk" },
      { area: "Selimpaşa / Çanta", minutes: "30-45 dk" },
      { area: "TEM gişeleri / D-100 kesimi", minutes: "30-50 dk" },
      { area: "Değirmenköy / iç kesimler", minutes: "45-60 dk" },
    ],
    intro:
      "Silivri'de aracınız bozulduysa 0535 404 80 44 numarasını arayın; TEM gişeleri, D-100 kesimi, sahil ve köyler dahil her noktaya 7/24 çekici gönderiyoruz. Uzaklığı dürüstçe söyleriz: merkeze ortalama 35-50 dakikada ulaşır, yol boyunca sizi bilgilendiririz.",
    localNote:
      "Silivri, İstanbul'un batı sınırı: TEM ve D-100'ün il çıkışındaki son ilçesi olarak 'İstanbul'dan çıkarken/girerken yolda kaldım' vakalarının merkezi. Yazlık sahil siteleri (Selimpaşa, Çanta, Gümüşyaka) mevsimsel nüfus getirir; kışın boş kalan yazlık araçları bahar başında toplu akü vakalarına dönüşür. Tekirdağ yönüne devam mı, İstanbul'a dönüş mü — Silivri vakalarında iki yönlü taşıma seçeneği sunarız.",
    scenario:
      "Örnek: Tekirdağ'dan İstanbul'a dönerken TEM Silivri gişelerinden sonra aracınız yağ lambası yakıp güç kaybetti. Bizi aradığınızda gişe sonrası ceplerden birine çekilmenizi tarif eder, 30-40 dakikada ulaşırız; motor riskliyse aracı çalıştırmadan platforma alır, İstanbul'daki servisinize taşırız.",
    faqs: [
      { q: "Silivri'ye çekici gerçekten geliyor mu? Çoğu firma uzak diye gelmiyor.", a: "Evet, Silivri düzenli hizmet bölgemizdir; merkez, sahil ve köyler dahil her noktaya gidiyoruz. Varış süresini baştan net söyleriz." },
      { q: "TEM Silivri gişelerinde aracım kaldı, ne yapmalıyım?", a: "Gişe bölgesinde durmayın; mümkünse gişe sonrası cebe ilerleyin, dörtlüleri yakın, bariyer dışında bekleyin ve bizi arayın." },
      { q: "Selimpaşa'daki yazlığa geldik, kış boyu duran araç çalışmıyor; ne yapmalı?", a: "Uzun süre duran araçlarda akü, fren sıkışması ve lastik deformasyonu birlikte görülür; takviye ekibi gönderir, gerekirse platformla servise taşırız." },
      { q: "Silivri çekici ücreti ne kadar?", a: "Ücret mesafe ve araç tipine göre değişir. Fiyat almak için hemen arayınız: 0535 404 80 44." },
      { q: "Aracım Silivri'de bozuldu ama ben Tekirdağ yönüne devam etmek istiyorum, o yöne de taşır mısınız?", a: "Evet, il sınırı ötesine — Çorlu, Çerkezköy, Tekirdağ yönüne de taşıma yapıyoruz; iki yönün de bedelini söyler, kararı size bırakırız." },
      { q: "Çanta sahilinde kuma saplandım, kurtarıyor musunuz?", a: "Evet, vinçli kurtarma aracımızla kumdan ve yumuşak zeminden araç çıkarıyoruz." },
      { q: "Gece Silivri merkezde lastiğim patladı, bölgede nöbetçi lastikçi yok; ne yapıyorsunuz?", a: "Yedek varsa yerinde takarız; yoksa aracı en yakın çözüm noktasına veya güvenli otoparka taşırız — 7/24." },
      { q: "Değirmenköy tarafına, köy yoluna geliyor musunuz?", a: "Evet, iç köyler dahil ilçenin her noktasına gidiyoruz; stabilize yollar için uygun araç seçiyoruz." },
      { q: "Karavanım Silivri kampında arızalandı, karavan çekiyor musunuz?", a: "Evet, karavan ve römork taşıma ekipmanımız mevcut." },
      { q: "D-100 Silivri kesiminde yüklü TIR'ım arızalandı, ağır vasıta kurtarıcınız var mı?", a: "Evet, ağır vasıta kurtarıcımızla TIR ve kamyon müdahalesi yapıyoruz; yük emniyeti prosedürüyle çalışırız." },
    ],
    neighbors: ["buyukcekmece", "catalca"],
    blogParagraphs: [
      "Silivri, İstanbul çekiciliğinin batı ileri karakoludur: TEM ve D-100'ün il çıkışındaki son kesimleri buradan geçer ve 'şehirlerarası yolculuğun ilk/son arızası' vakaları bu coğrafyada toplanır. Trakya yönüne çıkanların hazırlıksız yakalandığı hararet, lastik ve yakıt vakaları ile İstanbul'a dönenlerin 'son 50 kilometrede' yaşadığı yorgunluk arızaları, Silivri çağrılarının ana gövdesidir. İl sınırına yakınlık nedeniyle iki yönlü taşıma (İstanbul'a dönüş veya Tekirdağ yönüne devam) seçeneğini standart olarak sunarız.",
      "İlçenin sahil kimliği mevsimsel bir ritim yaratır: Selimpaşa'dan Gümüşyaka'ya uzanan yazlık site kuşağı, haziran-eylül arasında on binlerce aileyi ağırlar. Yaz vakaları plaj ve site otoparkı ağırlıklıdır; asıl ilginç dönem ise bahardır — kış boyu çalıştırılmamış yazlık araçlarının toplu uyanışı, nisan-mayıs aylarında akü ve fren sıkışması çağrılarını patlatır. Bu döneme 'yazlık servisi' kapasitesiyle hazırlanırız.",
      "Silivri'nin iç kesimleri (Değirmenköy, Ortaköy, Fener yönü) tarım karakterli köy dokusudur; stabilize yollar ve traktör trafiği, standart çekici yerine yüksek karoserli, vinçli araç gerektirir. D-100'ün Silivri geçişindeki kamyon-TIR yoğunluğu da (Trakya lojistik koridoru) ağır vasıta kurtarma talebini besler — Silivri, ağır vasıta ekibimizin Avrupa Yakası'ndaki en batı görev sahasıdır.",
    ],
  },
  {
    slug: "sultangazi",
    name: "Sultangazi",
    yaka: "avrupa",
    neighborhoods: ["Sultançiftliği", "Cebeci", "Esentepe", "Habipler", "İsmetpaşa", "50. Yıl", "Uğur Mumcu", "Yunus Emre", "Eski Habipler"],
    roads: ["TEM (O-3) bağlantıları (Habipler)", "Eski Edirne Asfaltı Sultangazi kesimi", "Cebeci yolu", "Hasdal-Kemerburgaz bağlantısı"],
    landmarks: ["Sultangazi Meydanı", "Cebeci taş ocakları bölgesi", "Habipler tramvay son durağı", "Gazi Mahallesi sınırı", "Kent Ormanı güney girişi"],
    arrivalMinutes: "20-30",
    arrivalTable: [
      { area: "Sultançiftliği / merkez", minutes: "20-30 dk" },
      { area: "Habipler / TEM bağlantısı", minutes: "15-25 dk" },
      { area: "Cebeci / Esentepe", minutes: "20-30 dk" },
      { area: "Eski Edirne Asfaltı hattı", minutes: "15-25 dk" },
    ],
    intro:
      "Sultangazi'de aracınız bozulduysa 0535 404 80 44 numarasından 7/24 çekici çağırabilirsiniz. Eski Edirne Asfaltı, Habipler ve tüm mahallelere ortalama 20-30 dakikada ulaşıyoruz.",
    localNote:
      "Sultangazi, Avrupa Yakası'nın kuzey konut kuşağında yoğun nüfuslu, genç bir ilçe. Eski Edirne Asfaltı ana omurga; Habipler, tramvay son durağı ve TEM bağlantısıyla geçiş noktasıdır. Cebeci bölgesindeki taş ocakları ve hafriyat trafiği, ilçeye özgü bir vaka tipi üretir: hafriyat kamyonlarıyla paylaşılan yollarda lastik hasarları ve sıkışma kazaları.",
    scenario:
      "Örnek: Cebeci yolunda seyir halindeyken hafriyat kamyonundan dökülen moloz nedeniyle iki lastiğiniz birden hasar aldı; tek yedekle çözüm mümkün değil. Bizi aradığınızda aracı platforma alır, tercihinize göre lastikçiye taşır; tutanak için hasar fotoğraflarını da raporlarız.",
    faqs: [
      { q: "Sultangazi'de çekici ne kadar sürede gelir?", a: "Habipler ve Eski Edirne Asfaltı hattına 15-25 dakikada; merkez, Cebeci ve Esentepe'ye 20-30 dakikada ulaşıyoruz." },
      { q: "Cebeci yolunda lastiğim moloz yüzünden patladı, iki lastik birden gitti; ne yapabilirsiniz?", a: "Çift lastik hasarında yerinde çözüm mümkün olmaz; aracı platforma alıp lastikçiye taşırız, hasar fotoğraflarını tutanak için raporlarız." },
      { q: "TEM Habipler bağlantısında arıza yaptım, ne yapmalıyım?", a: "Emniyet şeridine alın, dörtlüleri yakın, bariyer arkasında bekleyin ve arayın; bağlantı rampalarını iyi biliyoruz." },
      { q: "Sultangazi çekici ücreti ne kadar?", a: "Ücret mesafe ve araç tipine göre değişir. Fiyat almak için hemen arayınız: 0535 404 80 44." },
      { q: "50. Yıl Mahallesi'nin dik sokaklarında kışın aracım kaydı, geliyor musunuz?", a: "Evet, kış aylarında eğimli mahalleler için zincir donanımlı kurtarma aracımız hazırdır." },
      { q: "Tramvayla işe gidiyorum, aracım Habipler otoparkında; akşam çalışmazsa gelir misiniz?", a: "Evet, tramvay ve toplu taşıma otoparklarına akü takviyesi için düzenli gidiyoruz." },
      { q: "Gece Sultançiftliği'nde aküm bitti, o saatte hizmet var mı?", a: "Evet, 7/24 hizmet veriyoruz; gece varışımız genellikle 20 dakika civarındadır." },
      { q: "Kamyonetimle pazara mal taşıyorum, araç yüklüyken arızalandı; yüklü çekiyor musunuz?", a: "Evet, yüklü kamyonet ve panelvanları yük emniyetiyle taşıyoruz." },
      { q: "Sultangazi'den Anadolu Yakası'na araç taşınıyor mu?", a: "Evet, TEM üzerinden köprülerle Anadolu Yakası'nın tüm ilçelerine taşıma yapıyoruz." },
      { q: "Kent Ormanı tarafında piknik dönüşü aracım toprak yolda kaldı, kurtarır mısınız?", a: "Evet, vinçli aracımızla orman yolu ve toprak zeminlerden araç çıkarıyoruz." },
    ],
    neighbors: ["gaziosmanpasa", "esenler", "arnavutkoy", "eyupsultan", "basaksehir"],
    blogParagraphs: [
      "Sultangazi'nin çekici profili, hızlı büyüyen kuzey konut kuşağının ihtiyaçlarını yansıtır: yoğun nüfus, genç ama yoğun kullanılan araç parkı ve günlük hayat vakaları (akü, lastik, marş). Eski Edirne Asfaltı, ilçenin tüm trafiğini taşıyan omurga olarak müdahale önceliğimizin merkezindedir; tramvay hattıyla paylaşılan kesimlerde raya yaklaşmadan yükleme prosedürü uygularız.",
      "İlçeye özgü en karakteristik vaka tipi Cebeci bölgesinden gelir: taş ocakları ve hafriyat sahalarının kamyon trafiği, yollara dökülen moloz ve agregayla binek araçlar için lastik hasarı riski yaratır. Çift lastik hasarı — tek yedekle çözülemeyen durum — Sultangazi'de İstanbul ortalamasının üzerindedir; bu vakalarda platformla lastikçiye taşıma standart çözümümüzdür.",
      "Habipler'in TEM bağlantısı ve Hasdal-Kemerburgaz aksına komşuluğu, ilçeyi kuzey otoyol ağına bağlar; Kuzey Marmara Otoyolu'na ve İstanbul Havalimanı'na hızlı erişim, Sultangazi'den havalimanı yönlü taşıma taleplerini artırdı. Kış aylarında ilçenin yüksek kesimlerindeki (Esentepe, 50. Yıl) eğimli sokaklar buzlanma müdahalelerinin adresidir — bu bölgeler için kış donanımlı aracımızı hazır tutarız.",
    ],
  },
  {
    slug: "sisli",
    name: "Şişli",
    yaka: "avrupa",
    neighborhoods: ["Mecidiyeköy", "Nişantaşı", "Osmanbey", "Bomonti", "Fulya", "Esentepe", "Gülbağ", "Kurtuluş", "Feriköy", "Okmeydanı sınırı"],
    roads: ["Büyükdere Caddesi", "D-100 / O-1 Mecidiyeköy kesimi", "Halaskargazi Caddesi", "Abide-i Hürriyet Caddesi", "Darülaceze-Okmeydanı bağlantısı"],
    landmarks: ["Cevahir AVM", "Mecidiyeköy metrobüs ve metro aktarma", "Nişantaşı çarşı bölgesi", "Trump Towers", "Bomonti rezidans bölgesi", "Şişli Etfal Hastanesi"],
    arrivalMinutes: "15-25",
    arrivalTable: [
      { area: "Mecidiyeköy / Esentepe", minutes: "15-20 dk" },
      { area: "Nişantaşı / Osmanbey", minutes: "15-25 dk" },
      { area: "Bomonti / Feriköy / Kurtuluş", minutes: "15-25 dk" },
      { area: "Fulya / Gülbağ", minutes: "15-25 dk" },
    ],
    intro:
      "Şişli'de aracınız bozulduysa 0535 404 80 44 numarasını arayarak 7/24 çekici hizmeti alabilirsiniz. Mecidiyeköy'den Nişantaşı'na, Bomonti'den Fulya'ya tüm Şişli'ye ortalama 15-25 dakikada ulaşıyoruz.",
    localNote:
      "Şişli, İstanbul'un ticari yoğunluk merkezlerinden: Mecidiyeköy, metrobüs-metro aktarmasının ve O-1'in kesişiminde Avrupa Yakası'nın en işlek kavşağıdır. Büyükdere Caddesi plaza koridoru, Nişantaşı-Osmanbey lüks çarşı bölgesi, Bomonti dikey rezidans kuşağıdır. Dar sokak + yoğun vale + kapalı otopark kombinasyonu, Şişli vakalarının tipik zeminidir.",
    scenario:
      "Örnek: Nişantaşı'nda valeye verdiğiniz araç teslimde çalışmadı; vale otoparkı dar bir arka sokakta ve çıkış rampası dik. Bizi aradığınızda kompakt çekicimiz 20 dakikada gelir; rampalı dar otoparktan aracı paletlerle çıkarıp platforma alır, servise taşırken size fotoğraflı durum raporu geçeriz.",
    faqs: [
      { q: "Şişli'de çekici ne kadar sürede gelir?", a: "Mecidiyeköy ve Esentepe'ye 15-20 dakikada; Nişantaşı, Bomonti ve Kurtuluş'a 15-25 dakikada ulaşıyoruz." },
      { q: "Mecidiyeköy'de O-1 üzerinde arıza yaptım, çok yoğun; ne yapmalıyım?", a: "Emniyet şeridine alın, dörtlüleri yakın, bariyer arkasında bekleyin; Mecidiyeköy kavşağının tüm ayaklarını bildiğimiz için hızla ulaşırız." },
      { q: "Nişantaşı'nın dar sokaklarında çekici çalışabiliyor mu?", a: "Evet, kompakt platform ve tekerlek paletlerimizle dar sokak ve vale otoparklarında çalışıyoruz." },
      { q: "Cevahir otoparkında aracım çalışmadı, geliyor musunuz?", a: "Evet, Cevahir ve çevre AVM kapalı otoparklarına alçak tavanlı aracımızla giriyoruz." },
      { q: "Şişli çekici ücreti ne kadar?", a: "Ücret mesafe ve araç tipine göre değişir. Fiyat almak için hemen arayınız: 0535 404 80 44." },
      { q: "Plaza otoparkında (Esentepe) eksi katta lüks aracım kaldı, hassas taşıma var mı?", a: "Evet, lüks araç protokolümüz (tam platform, tekstil kayış, fotoğraflı rapor) ve eksi kat ekipmanımız mevcut." },
      { q: "Bomonti'de rezidans otoparkı çok dik rampalı, aracım rampayı çıkamıyor; ne yapıyorsunuz?", a: "Vinç destekli kontrollü çekişle rampadan çıkarıyoruz; debriyaj/şanzıman sorunlu araçlarda bu standart uygulamamızdır." },
      { q: "Şişli Etfal'e hasta getirdim, aracım sorun çıkardı; öncelik verir misiniz?", a: "Evet, hastane çevresi çağrılarına öncelik tanıyoruz." },
      { q: "Gece Kurtuluş'ta aküm bitti, gelir misiniz?", a: "Evet, 7/24 hizmetteyiz; gece Kurtuluş'a 15 dakika civarında ulaşırız." },
      { q: "Osmanbey'de yükleme yaparken ticari aracım arızalandı, esnaf çağrısına hızlı bakar mısınız?", a: "Evet, ticari araç ve esnaf çağrılarında teslimat aciliyetini gözeterek öncelikli planlama yapıyoruz." },
    ],
    neighbors: ["besiktas", "kagithane", "beyoglu", "sariyer"],
    blogParagraphs: [
      "Şişli'nin çekici haritasının merkezinde Mecidiyeköy vardır: metrobüs, iki metro hattı, O-1 çevre yolu ve Büyükdere Caddesi'nin kesiştiği bu kavşak, Avrupa Yakası'nın en karmaşık trafik düğümüdür. Kavşağın hangi ayağında olduğunuzu tarif etmek zor olduğundan, Şişli çağrılarında WhatsApp canlı konum neredeyse zorunlu araçtır. O-1'in Mecidiyeköy geçişindeki arızalar, dakikalar içinde hem çevre yolu hem alt yolları etkiler — bu kesim en yüksek öncelikli müdahale bölgemizdir.",
      "Nişantaşı-Osmanbey, İstanbul'un lüks perakende kalbi olarak kendine özgü vakalar üretir: vale otoparklarında sıkışan araçlar, dar arka sokaklarda teslim sorunları ve yüksek segment araçların hassas taşıma ihtiyacı. Vale işletmeleriyle kurduğumuz düzenli ilişki sayesinde bu bölgede 'vale çağrısı' diye ayrı bir kategorimiz vardır: işletme adına, araç sahibinin onayıyla, çift taraflı fotoğraflı raporla çalışırız.",
      "Bomonti'nin dikey dönüşümü (rezidans kuleleri) İstanbul'un en dik otopark rampalarından bazılarını yarattı; debriyaj sorunu yaşayan araçların bu rampaları çıkamaması, Bomonti'ye özgü klasik vakadır. Büyükdere koridorunun plaza otoparkları ise eksi katlarda alçak tavan ekipmanı gerektirir. Şişli ayrıca hastane yoğun bir ilçedir (Şişli Etfal ve özel hastaneler kuşağı); sağlık bağlantılı çağrılarda önceliklendirme prosedürümüz burada sık devreye girer.",
    ],
  },
  {
    slug: "zeytinburnu",
    name: "Zeytinburnu",
    yaka: "avrupa",
    neighborhoods: ["Merkezefendi", "Kazlıçeşme", "Telsiz", "Beştelsiz", "Seyitnizam", "Gökalp", "Sümer", "Veliefendi", "Maltepe Mahallesi (Topkapı sınırı)"],
    roads: ["D-100 (E-5) Topkapı-Zeytinburnu kesimi", "Kennedy Caddesi (sahil yolu)", "O-1 Topkapı bağlantısı", "10. Yıl Caddesi", "Avrasya Tüneli yaklaşımı (sahil aksı)"],
    landmarks: ["Veliefendi Hipodromu", "Olivium AVM", "Kazlıçeşme Marmaray", "Zeytinburnu sahili", "Topkapı kültür parkı", "Merkezefendi mezarlığı bölgesi"],
    arrivalMinutes: "15-25",
    arrivalTable: [
      { area: "Zeytinburnu merkez / Olivium çevresi", minutes: "15-20 dk" },
      { area: "D-100 Topkapı kesimi", minutes: "15-20 dk" },
      { area: "Kazlıçeşme / sahil", minutes: "15-25 dk" },
      { area: "Veliefendi / Seyitnizam", minutes: "15-25 dk" },
    ],
    intro:
      "Zeytinburnu'nda aracınız bozulduysa 0535 404 80 44 numarasından 7/24 çekici çağırabilirsiniz. D-100 Topkapı kesimi, sahil yolu ve tüm mahallelere ortalama 15-25 dakikada ulaşıyoruz.",
    localNote:
      "Zeytinburnu, D-100'ün Topkapı geçişi ile Kennedy Caddesi'nin sahil aksı arasında sıkışmış, kompakt ve yoğun bir ilçe. Topkapı, tramvay-metro-otobüs aktarmasıyla tarihi bir ulaşım kavşağıdır. Kazlıçeşme Marmaray ve sahil etkinlik alanı bölgeye yeni trafik ekledi. Deri ve tekstil ticareti geçmişinden gelen atölye dokusu, ticari araç vakalarını besler.",
    scenario:
      "Örnek: D-100 Topkapı kesiminde sağ şeritte aracınız stop etti; arkadan gelen otobüsler şerit değiştirmekte zorlanıyor. Bizi aradığınızda bu kesime en yakın ekibimiz 15 dakikada ulaşır, ikaz düzeniyle güvenliği kurar, aracı hızla platforma alır ve D-100'ü rahatlatırız.",
    faqs: [
      { q: "Zeytinburnu'nda çekici ne kadar sürede gelir?", a: "İlçe kompakt olduğu için tüm mahallelere ortalama 15-25 dakikada ulaşıyoruz; D-100 çağrılarına öncelik veriyoruz." },
      { q: "D-100 Topkapı kesiminde arıza yaptım, ne yapmalıyım?", a: "Emniyet şeridine alın, dörtlüleri yakın, bariyer arkasında bekleyin; bu kesim en hızlı ulaştığımız noktalardandır." },
      { q: "Kennedy Caddesi'nde sahilde aracım kaldı, Avrasya Tüneli'ne yakınım; ne olacak?", a: "Tünel yaklaşımı çağrılarına öncelik veriyoruz; aracı hızla alıp tünel trafiğini etkilemeden taşırız." },
      { q: "Zeytinburnu çekici ücreti ne kadar?", a: "Ücret mesafe ve araç tipine göre değişir. Fiyat almak için hemen arayınız: 0535 404 80 44." },
      { q: "Olivium otoparkında aracım çalışmadı, geliyor musunuz?", a: "Evet, AVM kapalı otoparklarına alçak tavanlı aracımızla giriyoruz." },
      { q: "Deri/tekstil atölyemizin yüklü aracı kaldı, malla birlikte taşıyor musunuz?", a: "Evet, yük emniyetini koruyarak yüklü ticari araç taşıyoruz; esnafa kurumsal anlaşma sunuyoruz." },
      { q: "Veliefendi'de yarış günü hipodrom çevresinde aracım kaldı, ulaşır mısınız?", a: "Evet, yarış günlerindeki yoğunluğu biliyoruz; alternatif sokaklardan ulaşırız." },
      { q: "Kazlıçeşme Marmaray otoparkında aküm bitti, gelir misiniz?", a: "Evet, Marmaray otoparklarına akü takviyesi için düzenli gidiyoruz." },
      { q: "Gece sahilde (Zeytinburnu sahil parkı) aracım çalışmadı, o saatte hizmet var mı?", a: "Evet, 7/24 hizmetteyiz; sahil bölgesine gece 15 dakika civarında ulaşırız." },
      { q: "Tramvay hattına yakın yerde arıza yaptım (Topkapı), tramvayı engellemeden nasıl çalışıyorsunuz?", a: "Raya yaklaşmadan, tramvay işletmesiyle koordineli hızlı yükleme prosedürümüz var; siz güvenli noktada bekleyin." },
    ],
    neighbors: ["fatih", "bakirkoy", "gungoren", "bayrampasa", "bahcelievler"],
    blogParagraphs: [
      "Zeytinburnu, küçük yüzölçümüne rağmen İstanbul trafiğinin iki ana damarını birden taşır: kuzeyde D-100'ün Topkapı geçişi, güneyde Kennedy Caddesi'nin sahil aksı. Topkapı, yüzyıllardır İstanbul'un kara giriş kapısı olma rolünü bugün tramvay-metro-otobüs aktarma merkezi olarak sürdürür; bu kavşak çevresindeki arızalar toplu taşıma akışını da etkilediği için önceliklidir. Avrasya Tüneli'nin sahil yaklaşımı ise ilçenin güney sınırında yeni bir kritik nokta yarattı.",
      "İlçenin ekonomik DNA'sı — Kazlıçeşme'nin deri geçmişinden bugünün tekstil ve konfeksiyon atölyelerine — ticari araç yoğunluğunu belirler: yüklü panelvanlar, sevkiyat kamyonetleri ve esnaf araçları gündüz çağrılarımızın ana kaynağıdır. Merter'e (Güngören) komşuluk bu trafiği güçlendirir. Ticari vakalarda iki aşamalı çözümümüz (önce teslimat, sonra servis) burada da standarttır.",
      "Kazlıçeşme'nin dönüşümü — Marmaray istasyonu, sahil etkinlik alanı ve yeni konut projeleri — ilçeye yeni vaka tipleri ekledi: etkinlik günü otopark yoğunluğu, Marmaray 'park et-devam et' vakaları ve rezidans kapalı otoparkları. Veliefendi Hipodromu'nun yarış günleri de benzer bir takvimli yoğunluk üretir. Zeytinburnu'nun kompaktlığı sayesinde tüm bu noktalara 15-25 dakika bandında ulaşırız.",
    ],
  },
  {
    slug: "catalca",
    name: "Çatalca",
    yaka: "avrupa",
    neighborhoods: ["Ferhatpaşa (merkez)", "Kaleiçi", "Binkılıç", "Karacaköy", "Çakıl", "Subaşı", "Hallaçlı", "Gökçeali", "İnceğiz"],
    roads: ["TEM (O-3) Çatalca gişeleri", "D-100 bağlantısı (Çatalca kavşağı)", "Çatalca-Binkılıç yolu", "Karacaköy-Karadeniz sahil bağlantısı"],
    landmarks: ["Çatalca surları (Anastasius Suru)", "İnceğiz mağaraları", "Çilingoz tabiat parkı", "Ferhatpaşa merkez meydan", "Yalıköy sahili"],
    arrivalMinutes: "35-60",
    arrivalTable: [
      { area: "Çatalca merkez (Ferhatpaşa)", minutes: "35-50 dk" },
      { area: "TEM gişeleri / kavşak", minutes: "30-45 dk" },
      { area: "Binkılıç / Karacaköy", minutes: "50-70 dk" },
      { area: "Yalıköy / Çilingoz sahili", minutes: "55-75 dk" },
    ],
    intro:
      "Çatalca'da aracınız bozulduysa 0535 404 80 44 numarasını arayın; TEM gişeleri, merkez ve köyler dahil ilçenin her noktasına 7/24 çekici gönderiyoruz. Merkeze ortalama 35-50 dakikada ulaşır, yoldayken sizi bilgilendiririz.",
    localNote:
      "Çatalca, İstanbul'un yüzölçümü en büyük, nüfus yoğunluğu en düşük ilçesi: Trakya'nın kırsal dokusu il sınırları içinde burada yaşar. TEM'in Çatalca gişeleri Trakya yönü çıkışın ana kapısıdır. Köyler arası mesafeler uzun, bazı yollar stabilizedir; Karadeniz kıyısındaki Yalıköy-Çilingoz hattı yazın kampçı ve günübirlikçi çeker. Kırsal vaka profili — traktör, tarım aracı, toprak yol kurtarması — İstanbul'un başka hiçbir ilçesinde bu kadar yoğun değildir.",
    scenario:
      "Örnek: Çilingoz'da kamp dönüşü, Karacaköy'e inen stabilize yolda aracınızın karteri taşa vurdu ve yağ sızdırıyor. Bizi aradığınızda motoru çalıştırmamanızı söyleriz; vinçli aracımız 60 dakika içinde ulaşır, aracı çalıştırmadan platforma alır ve İstanbul'daki servisinize taşırız.",
    faqs: [
      { q: "Çatalca'ya çekici geliyor mu? Köylere de geliyor musunuz?", a: "Evet, Çatalca merkez, Binkılıç, Karacaköy ve tüm köyler dahil ilçenin her noktasına gidiyoruz; varış süresini baştan dürüstçe söyleriz." },
      { q: "TEM Çatalca gişelerinde aracım kaldı, ne yapmalıyım?", a: "Gişe bölgesinde durmayın; cebe ilerleyin, dörtlüleri yakın, bariyer dışında bekleyin ve bizi arayın." },
      { q: "Traktörüm tarlada/yolda arızalandı, traktör çekiyor musunuz?", a: "Evet, traktör ve tarım araçları için uygun platform ve vinç ekipmanımız var; kırsal vakalar Çatalca'da rutin işimizdir." },
      { q: "Çatalca çekici ücreti ne kadar?", a: "Ücret mesafe, araç tipi ve kurtarma zorluğuna göre değişir. Fiyat almak için hemen arayınız: 0535 404 80 44." },
      { q: "Yalıköy sahilinde kuma saplandım, kurtarıyor musunuz?", a: "Evet, vinçli kurtarma aracımızla kumdan araç çıkarıyoruz; gaza yüklenmeden bizi bekleyin." },
      { q: "Stabilize köy yolunda aracımın altı vurdu, yağ sızdırıyor; ne yapmalıyım?", a: "Motoru kesinlikle çalıştırmayın — yağsız çalışan motor dakikalar içinde ağır hasar alır. Aracı çalıştırmadan platforma alıp servise taşırız." },
      { q: "Gece Binkılıç tarafında yolda kaldım, bölge çok tenha; güvenlik için ne önerirsiniz?", a: "Aracın içinde kapılar kilitli bekleyin, dörtlüleri yakın; ekibimiz yola çıktığında plaka ve ekip bilgisini SMS'le göndeririz — teyitsiz araca binmeyin, aracınızı teslim etmeyin." },
      { q: "Çilingoz kamp alanından karavan çekiyor musunuz?", a: "Evet, karavan ve römork taşıma ekipmanımızla kamp alanlarından çekim yapıyoruz." },
      { q: "İstanbul'a dönmek yerine Tekirdağ/Kırklareli yönüne taşıma yapar mısınız?", a: "Evet, il dışına — Trakya'nın tüm illerine taşıma yapıyoruz; iki yönün bedelini söyler, kararı size bırakırız." },
      { q: "Kışın kar yağınca Çatalca köy yollarına ulaşabiliyor musunuz?", a: "Evet, kar koşullarında zincir donanımlı aracımızla çalışıyoruz; yoğun karda varış süresini gerçekçi şekilde güncelleyip sizi bilgilendiririz." },
    ],
    neighbors: ["silivri", "buyukcekmece", "arnavutkoy"],
    blogParagraphs: [
      "Çatalca, İstanbul çekiciliğinin en geniş ve en kırsal görev sahasıdır: il yüzölçümünün önemli bölümünü kaplayan ilçede köyler arası mesafeler 20-30 kilometreyi bulur ve vaka profili şehirden tamamen farklıdır. Traktör ve tarım aracı kurtarması, stabilize yolda karter/şasi hasarları, av ve kamp dönüşü toprak yolda saplanmalar — bunlar Çatalca'nın günlük gerçekleridir ve hepsi vinçli, yüksek karoserli kurtarma aracı gerektirir.",
      "İlçenin TEM gişeleri, Trakya yönü şehirlerarası trafiğin İstanbul'daki son eşiğidir; Edirne-Avrupa yönüne çıkan araçların arızaları burada yoğunlaşır. Yaz aylarında ikinci bir dalga eklenir: Yalıköy ve Çilingoz'un Karadeniz plajlarına akan günübirlikçiler ile kamp tutkunları. Plaj kumunda saplanma, orman içi yolda alt vurma ve dönüş konvoyunda hararet, temmuz-ağustos çağrılarımızın klasikleridir.",
      "Çatalca'da operasyonun iki altın kuralı vardır. Birincisi dürüst süre bildirimi: mesafeler uzun olduğu için varış süresini baştan net söyler, yolda güncelleriz — 'geliyoruz' deyip bekletmek bu coğrafyada kabul edilemez. İkincisi güvenlik teyidi: tenha köy yollarında gece bekleyen sürücüye ekip plakasını SMS'le göndeririz; teyitsiz hiçbir araca güvenmemesini açıkça söyleriz. Kırsal çekicilik, şehir çekiciliğinden daha fazla güven işidir.",
    ],
  },
];
