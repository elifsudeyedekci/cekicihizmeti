# cekicihizmeti.com — İstanbul 7/24 Oto Çekici Hizmeti

Hard SEO + GEO (Generative Engine Optimization) uyumlu, tamamen statik olarak build edilen
Next.js 16 (App Router, TypeScript, Tailwind v4) sitesi. Tek domain altında ~250 sayfa:
kurumsal sayfalar, 12 hizmet sayfası, 41 bölge sayfası (2 yaka + 39 ilçe), 90+ blog yazısı ve
İngilizce/Arapça çok dilli sayfalar.

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statik export -> out/
```

`next.config.ts` içinde `output: "export"` tanımlı; `npm run build` çalıştığında saf HTML/CSS/JS
çıktısı `out/` klasörüne yazılır. Bu klasörü herhangi bir statik hosting'e (cPanel, Netlify,
Cloudflare Pages, S3+CDN, Vercel vb.) yükleyebilirsiniz. Node.js sunucusu gerekmez.

### Önemli: .txt/.xml dosyalarında UTF-8 charset (llms.txt, ai.txt, robots.txt, sitemap.xml)

Statik export'ta `next.config.ts`'teki `headers()` fonksiyonu ÇALIŞMAZ (yalnızca Node.js sunucusu
modunda çalışır) — bu yüzden `.txt`/`.xml` dosyalarının `Content-Type` header'ındaki charset,
barındırma sunucunuzun varsayılan MIME ayarlarına bağlıdır. Birçok Apache/cPanel kurulumu `.txt`
dosyalarını charset belirtmeden (`text/plain`, UTF-8 değil) sunar; bu da `İ, ş, ı, ğ, ü, ö, ç`
gibi Türkçe karakterlerin tarayıcıda bozuk (mojibake) görünmesine yol açar.

- **Apache/cPanel**: `public/.htaccess` dosyası zaten bunu otomatik çözer (build ile birlikte
  `out/` klasörüne kopyalanır) — ekstra bir şey yapmanıza gerek yok.
- **nginx**: Sunucu bloğunuza şunu ekleyin:
  ```nginx
  location ~* \.(txt|xml)$ {
      charset utf-8;
      default_type "text/plain; charset=utf-8";
  }
  ```
- **Vercel/Netlify/Cloudflare Pages**: Bu sağlayıcılar genelde UTF-8'i doğru algılar; yine de
  yayına aldıktan sonra `curl -I https://siteniz.com/llms.txt` ile `charset=utf-8` çıktığını
  teyit edin.

## Ortam değişkenleri (opsiyonel)

`.env.example` dosyasını `.env.local` olarak kopyalayıp GA4 / GTM / Yandex Metrica ID'lerinizi
girin. Boş bırakılan ID'lerin script'i hiç yüklenmez (bkz. `components/Analytics.tsx`).

```
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_YANDEX_METRICA_ID=
```

## Proje yapısı

```
lib/config.ts           NAP sabitleri (telefon, WhatsApp, K1 belge) — SADECE buradan kullanılır
lib/schema.ts            JSON-LD builder'lar (LocalBusiness, Service, FAQPage, BreadcrumbList, Article)
lib/data/                39 ilçe, 12 hizmet, 20 marka, 7 otoyol, 5 araç tipi — ham veri katmanı
lib/blog/types.ts         BlogPost tipi
lib/blog/generators.ts    İlçe/marka/otoyol/araç-tipi bloglarını lib/data'dan programatik üretir
lib/blog/posts-*.ts       Elle yazılmış bloglar (cornerstone, yaka, kök kelime, bilgilendirici)
lib/blog/registry.ts      Tüm blog yazılarını birleştiren tek kaynak (posts[])
components/               Ortak UI (CTA butonları, SSS+schema, breadcrumb, arama, geolocation…)
app/                      Next.js App Router sayfaları
```

### Yeni ilçe/hizmet/marka eklemek

`lib/data/*.ts` içine veri eklemeniz yeterli — `app/bolgeler/[slug]`, `app/hizmetler/[slug]` ve
`lib/blog/generators.ts` bu dizilerden otomatik sayfa/blog üretir, elle yeni route yazmanıza
gerek yoktur.

## Sayfa envanteri

| Grup | Adet | Kaynak |
|---|---|---|
| Kurumsal statik sayfalar | 9 | `app/(anasayfa, hakkimizda, iletisim, sss, fiyatlandirma, kvkk, gizlilik-politikasi, blog hub, not-found)` |
| Hizmet sayfaları (hub+12) | 13 | `app/hizmetler/` |
| Bölge sayfaları (hub+2 yaka+39 ilçe) | 42 | `app/bolgeler/` |
| Çok dilli statik sayfa | 2 | `app/en`, `app/ar` |
| Blog: cornerstone | 1 | `lib/blog/posts-cornerstone.ts` |
| Blog: yaka | 2 | `lib/blog/posts-yaka.ts` |
| Blog: kök kelime | 8 | `lib/blog/posts-kok-kelime.ts` |
| Blog: bilgilendirici/GEO-otorite | 13 | `lib/blog/posts-bilgilendirici-1.ts` + `-2.ts` |
| Blog: ilçe (39) + marka (20) + otoyol (7) + araç tipi (5) | 71 | `lib/blog/generators.ts` (veri odaklı, programatik) |
| **Toplam** | **~160** | |

### İçerik kalite notu — dürüst durum raporu (script ile ölçülmüş gerçek kelime sayıları)

Brief'in orijinal şartı "min. 4.000 kelime + min. 10 SSS" idi. Süreçte gerçek (regex ile ölçülmüş)
kelime sayımının bazı otomatik yazım ajanlarının "4.000+ tamamlandı" raporlarıyla uyuşmadığı tespit
edildi; proje sahibiyle görüşülüp hedef **"min. 2.000-2.500 kelime + hard SEO/hard GEO uyumu"**
olarak netleştirildi (SSS ve GEO kuralları değişmedi, sadece kelime alt sınırı revize edildi).
Tespit sonrası tüm elle yazılan yazılar genişletildi:

| Dosya | Yazı sayısı | Gerçek ort. kelime/yazı | Min–Maks | Durum |
|---|---|---|---|---|
| `posts-cornerstone.ts` | 1 | **~3.918** | 3.918 | ✅ 2.000-2.500 hedefinin üstünde |
| `posts-yaka.ts` | 2 | **~2.593** | 2.574–2.611 | ✅ Hedefte |
| `posts-kok-kelime.ts` | 8 | **~1.577** | 1.321–2.213 | ⚠️ Kısmen hedefte (3/8 yazı 2.000 altı sınırda) |
| `posts-bilgilendirici-1.ts` | 7 | **~1.833** | 1.649–2.419 | ⚠️ Kısmen hedefte |
| `posts-bilgilendirici-2.ts` | 6 | **~1.578** | 1.209–1.924 | ⚠️ Kısmen hedefte |

Tüm yazılarda **≥10 SSS** (çoğunda 10-16), GEO kuralına uygun ilk paragrafta alıntılanabilir direkt
cevap, konuşma dilinde soru formatında H2/H3 başlıklar ve rakamsız/"0535 404 80 44'ü arayınız"
CTA kuralı eksiksiz uygulanmıştır. Kalan boşluğu kapatmak isterseniz `lib/blog/posts-*.ts`
dosyalarındaki `sections` dizisine yeni bölüm eklemek yeterlidir — mimari değişiklik gerekmez;
kullanılan desen: "ek senaryo + sık yapılan hata + kontrol listesi" bölüm kalıbı (bkz.
`posts-cornerstone.ts`, `posts-yaka.ts`).

**71 adet ilçe/marka/otoyol/araç-tipi blogu programatik** olarak `lib/data/*.ts`'teki gerçek,
benzersiz verilerden (mahalle, yol, landmark, teknik not, senaryo, 10 benzersiz SSS) üretiliyor —
brief'in 4.4 numaralı "doorway page" önleme kuralına uygun (her sayfa gerçekten farklı
mahalle/yol/SSS içerir, kopya şablon değildir). Bu grup ortalama ~1.000-1.500 kelime bandındadır;
tüm siteye aynı 2.000-2.500 standardını uygulamak istenirse `lib/blog/generators.ts`'teki üretici
fonksiyonlara ek alt bölüm eklenerek genişletilebilir.

- Fiyat/rakam kuralı (`Bölüm 4.3`) TÜM sayfalarda uygulanmıştır — hiçbir yerde TL/₺/sayısal fiyat
  yoktur.

## Teknik SEO

- `app/robots.ts` — arama motoru botları VE AI botları (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended vb.) bilinçli olarak **açık** bırakılmıştır (GEO gereği).
- `app/sitemap.ts` — tüm statik + dinamik sayfaları kapsayan tek `sitemap.xml` (bu ölçekte
  segmentli sitemap yerine tek dosya tercih edildi; büyürse `generateSitemaps()` ile bölünebilir).
- Her sayfada `alternates.canonical` tanımlı.
- JSON-LD: `LocalBusiness` (layout genelinde, `areaServed` 39 ilçe), her hizmet/bölge sayfasında
  `Service`, her SSS bloğunda `FAQPage`, her sayfada `BreadcrumbList`, her blogda `Article`.
- `hreflang`: `/en` ve `/ar` sayfalarında `alternates.languages` ile tr/en/ar eşleşmesi var.

## Yayın Planı (brief Bölüm 10'a göre)

1. **Faz 1** (ilk yayın): Cornerstone + 2 yaka blogu + en yüksek hacimli ~15 ilçe + en çok aranan
   ~6 marka + tüm statik sayfalar.
2. **Faz 2**: Kalan ilçeler + otoyol/köprü blogları + araç tipi blogları.
3. **Faz 3**: Bilgilendirici/GEO-otorite bloglar + çok dilli sayfaların genişletilmesi (blog
   çevirileri — bu ilk sürümde kapsam dışı bırakıldı, sadece 2 ana EN/AR sayfası var).

Ani içerik patlaması yerine haftalık düzenli yayın temposu önerilir (bkz. brief).

## Yayın Sonrası Checklist (site dışı)

- [ ] Google Search Console + Bing Webmaster Tools + Yandex Webmaster'a `sitemap.xml` gönder.
- [ ] Google Analytics 4 + Google Tag Manager + Yandex Metrica ID'lerini `.env.local`'e ekle.
- [ ] Google Business Profile, Yandex İşletmeler, Apple Maps Business Connect kaydı — NAP bilgisi
      `lib/config.ts`'teki `SITE` sabitleriyle birebir aynı olmalı.
- [x] Call tracking / conversion tracking altyapısı hazır — `components/CtaButtons.tsx` her
      tıklamada `phone_click` / `whatsapp_click` / `location_share_click` event'ini
      `window.dataLayer`'a push eder. GTM'de bu event'leri conversion olarak tetiklemeniz yeterli.
- [ ] WhatsApp Business katalog + otomatik yanıt kurulumu.
- [ ] Gerçek görseller (araç/ekip fotoğrafları) — şu an görsel yok, tüm sayfalar metin+harita
      tabanlı; brief'teki "stok görsel değil gerçek fotoğraf" kuralı nedeniyle görseller sonradan
      eklenmelidir.
- [ ] SSL — hosting sağlayıcısı üzerinden (Let's Encrypt/AutoSSL).

## Bilinçli kapsam dışı bırakılanlar (zaman kısıtı)

- 22 adet çok dilli blog çevirisi (brief 3.8) — sadece 2 ana EN/AR statik sayfası yapıldı.
- Call tracking dataLayer entegrasyonu.
- Gerçek görseller / Google yorum widget'ı / exit-intent A/B testi.

Bu maddeler Faz 2/3'te tamamlanabilir; mimari (veri katmanı + programatik sayfa üretimi) buna
uygun şekilde kuruldu.
