import Link from "next/link";
import { SITE } from "@/lib/config";
import { districts } from "@/lib/data/districts";
import { services } from "@/lib/data/services";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-black/5 bg-[var(--color-navy-950)] text-[var(--color-navy-200)]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 text-sm md:grid-cols-4">
        <div>
          <h3 className="mb-3 font-bold text-white">{SITE.name}</h3>
          <p className="text-[var(--color-navy-300)]">{SITE.description}</p>
          <p className="mt-3 font-semibold text-white">{SITE.phone}</p>
          <p className="mt-1 text-xs text-[var(--color-navy-400)]">{SITE.k1Belge} · Sigortalı Taşıma</p>
        </div>
        <div>
          <h3 className="mb-3 font-bold text-white">Hizmetlerimiz</h3>
          <ul className="space-y-2">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/hizmetler/${s.slug}`} className="hover:text-white">
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold text-white">Popüler İlçeler</h3>
          <ul className="space-y-2">
            {districts.slice(0, 6).map((d) => (
              <li key={d.slug}>
                <Link href={`/bolgeler/${d.slug}`} className="hover:text-white">
                  {d.name} Çekici
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold text-white">Kurumsal</h3>
          <ul className="space-y-2">
            <li><Link href="/hakkimizda" className="hover:text-white">Hakkımızda</Link></li>
            <li><Link href="/iletisim" className="hover:text-white">İletişim</Link></li>
            <li><Link href="/sss" className="hover:text-white">Sık Sorulan Sorular</Link></li>
            <li><Link href="/fiyatlandirma" className="hover:text-white">Fiyatlandırma</Link></li>
            <li><Link href="/kvkk" className="hover:text-white">KVKK Aydınlatma Metni</Link></li>
            <li><Link href="/gizlilik-politikasi" className="hover:text-white">Gizlilik ve Çerez Politikası</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-[var(--color-navy-400)]">
        © {year} {SITE.legalName}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
