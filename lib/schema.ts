import { SITE, PROFILES } from "./config";
import { districts } from "./data/districts";
import type { Faq } from "./data/types";

/** JSON-LD schema builder'lar — her sayfa <script type="application/ld+json"> ile bunları gömer. */

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.legalName,
    alternateName: SITE.name,
    image: `${SITE.url}/logo.png`,
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
    image: opts.image ?? `${SITE.url}/og-default.jpg`,
    publisher: {
      "@type": "Organization",
      name: SITE.legalName,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` },
    },
    author: { "@type": "Organization", name: SITE.legalName },
  };
}

/** Sayfaya birden fazla JSON-LD şeması gömmek için birleşik script tag üretici (React component'lerde kullanılır) */
export function jsonLdScript(schema: object) {
  return JSON.stringify(schema);
}
