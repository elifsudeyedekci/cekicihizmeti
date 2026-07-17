/** Ortak veri tipleri — tüm sayfa ve bloglar bu tiplerden beslenir. */

export interface Faq {
  q: string;
  a: string;
}

export interface ArrivalRow {
  area: string; // mahalle / bölge adı
  minutes: string; // "15-25 dk"
}

export interface District {
  slug: string;
  name: string;
  yaka: "anadolu" | "avrupa";
  /** İlçedeki gerçek mahalleler (görsel alt-text, içerik ve SSS'lerde kullanılır) */
  neighborhoods: string[];
  /** İlçeden geçen / ilçeye bağlanan gerçek yol, otoyol, köprüler */
  roads: string[];
  /** Bilinen noktalar (AVM, hastane, meydan, liman vb.) */
  landmarks: string[];
  /** Ortalama varış süresi (dk aralığı) */
  arrivalMinutes: string;
  /** Bölge içi tahmini varış süresi tablosu */
  arrivalTable: ArrivalRow[];
  /** Alıntılanabilir direkt cevap — sayfanın/blogun ilk paragrafı (GEO kuralı) */
  intro: string;
  /** İlçeye özgü trafik/coğrafya/operasyon notu (benzersiz içerik unsuru) */
  localNote: string;
  /** Benzersiz örnek senaryo anlatımı */
  scenario: string;
  /** İlçeye özgü, kopyalanmamış 10 SSS */
  faqs: Faq[];
  /** Komşu ilçe slug'ları (iç link silosu) */
  neighbors: string[];
  /** Blog için ilave benzersiz paragraflar */
  blogParagraphs: string[];
}

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  description: string[];
  bullets: string[];
  faqs: Faq[];
  relatedServiceSlugs: string[];
}

export interface Brand {
  slug: string;
  name: string;
  /** Markaya özgü çekme/teknik notlar (benzersiz içerik) */
  techNotes: string[];
  /** Türkiye'de yaygın modeller */
  popularModels: string[];
  /** Sık görülen arıza/çağrı sebepleri */
  commonIssues: string[];
  intro: string;
  faqs: Faq[];
}

export interface Highway {
  slug: string;
  name: string;
  metaTitle: string;
  intro: string;
  /** Güzergâh / kesim bilgisi */
  routeInfo: string[];
  /** Bu yolda mahsur kalınca yapılacaklar — yola özgü */
  safetyNotes: string[];
  /** Yol üzerindeki / bağlantılı ilçeler (slug) */
  districtSlugs: string[];
  faqs: Faq[];
}

export interface VehicleType {
  slug: string;
  name: string;
  intro: string;
  techNotes: string[];
  /** Bu araç sınıfında sık görülen arıza/çağrı sebepleri (Brand.commonIssues ile aynı desen) */
  commonIssues: string[];
  /** Sahiplerin sık yaptığı hatalar / önleyici öneriler */
  checklist: string[];
  faqs: Faq[];
}
