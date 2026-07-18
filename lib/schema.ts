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
    email: SITE.email,
    foundingDate: `${SITE.foundingYear}`,
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
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phoneIntl,
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: ["tr", "en", "ar"],
    },
    areaServed: districts.map((d) => ({
      "@type": "City",
      name: `${d.name}, İstanbul`,
    })),
    sameAs: PROFILES,
  };
}

/**
 * WebSite şeması + SearchAction — Google'ın "sitelinks search box" özelliği için gereklidir.
 * /ara sayfası gerçek bir arama sonucu döndürür (bkz. app/ara/page.tsx), bu yüzden action
 * gerçek/işlevsel bir URL şablonuna işaret eder (sahte/boş bir action değildir).
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: "tr-TR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/ara?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * HowTo şeması — "adım adım ne yapmalısınız" tipi numaralı talimat bölümleri için.
 * `steps` her biri "1. **Başlık**: açıklama" veya "1. açıklama" formatındaki paragraf
 * dizisidir (bkz. districtSafetyGuide, vehicleTypeSafetySection vb.); burada parse edilip
 * yapılandırılmış HowToStep dizisine çevrilir.
 */
export function howToSchema(opts: { name: string; description: string; steps: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((raw, i) => {
      const cleaned = raw.replace(/^\s*\d+\.\s*/, "");
      const boldMatch = cleaned.match(/^\*\*([^*]+)\*\*:?\s*(.*)$/);
      const name = boldMatch ? boldMatch[1] : cleaned.slice(0, 60);
      const text = (boldMatch ? boldMatch[2] : cleaned).replace(/\*\*/g, "");
      return {
        "@type": "HowToStep",
        position: i + 1,
        name,
        text: text || name,
      };
    }),
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
