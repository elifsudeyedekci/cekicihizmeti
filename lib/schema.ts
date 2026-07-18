import { SITE, PROFILES } from "./config";
import { districts } from "./data/districts";
import { TOW_IMAGES } from "./data/images";
import type { Faq } from "./data/types";

/** Şema görsellerinde kullanılacak varsayılan görsel (temsili çekici fotoğrafı) — bkz. lib/data/images.ts.
 * Böylece hiçbir sayfa artık var olmayan /logo.png veya /og-default.jpg gibi kırık bir URL'e referans vermez. */
const DEFAULT_SCHEMA_IMAGE = `${SITE.url}${TOW_IMAGES[0].file}`;

/** Gerçek kurumsal logo — Organization.logo ve publisher.logo alanlarında (temsili fotoğraflardan ayrı) kullanılır. */
const LOGO_URL = `${SITE.url}/images/cekici/logo-512.png`;

/** JSON-LD schema builder'lar — her sayfa <script type="application/ld+json"> ile bunları gömer. */

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.legalName,
    alternateName: SITE.name,
    image: DEFAULT_SCHEMA_IMAGE,
    logo: LOGO_URL,
    url: SITE.url,
    telephone: SITE.phoneIntl,
    priceRange: "$$",
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "İstanbul",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: districts.map((d) => ({
      "@type": "City",
      name: `${d.name}, İstanbul`,
    })),
    sameAs: PROFILES,
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  areaName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: {
      "@type": "City",
      name: opts.areaName ?? "İstanbul",
    },
  };
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    image: opts.image ?? DEFAULT_SCHEMA_IMAGE,
    publisher: {
      "@type": "Organization",
      name: SITE.legalName,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    author: { "@type": "Organization", name: SITE.legalName },
  };
}

/**
 * SpeakableSpecification — sesli asistan/GEO görünürlüğü için, sayfanın hangi CSS seçicilerinin
 * sesli okunmaya uygun (alıntılanabilir, kısa, net) olduğunu işaretler. Ana sayfada özet paragraf
 * ve SSS bölümü için kullanılır (bkz. app/page.tsx — .speakable-summary / .speakable-faq sınıfları).
 */
export function speakableSchema(cssSelectors: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: SITE.url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}

/** Sayfaya birden fazla JSON-LD şeması gömmek için birleşik script tag üretici (React component'lerde kullanılır) */
export function jsonLdScript(schema: object) {
  return JSON.stringify(schema);
}
