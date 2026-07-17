import Script from "next/script";

/**
 * GA4, Google Tag Manager ve Yandex Metrica için script yükleyici.
 * İlgili ortam değişkeni tanımlı değilse o script hiç render edilmez (sahte ID kullanılmaz).
 * Bkz. .env.example — NEXT_PUBLIC_GA4_ID, NEXT_PUBLIC_GTM_ID, NEXT_PUBLIC_YANDEX_METRICA_ID
 */
export function Analytics() {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;

  return (
    <>
      {gtmId && (
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}

      {ga4Id && (
        <>
          <Script
            id="ga4-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4Id}');`}
          </Script>
        </>
      )}

      {yandexId && (
        <Script id="yandex-metrica" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(${yandexId}, "init", {
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true
});`}
        </Script>
      )}
    </>
  );
}
