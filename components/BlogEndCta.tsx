import { PhoneButton, WhatsAppButton } from "./CtaButtons";
import { SiteSearch } from "./SiteSearch";

export function BlogEndCta({ context }: { context?: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-2xl bg-[var(--color-navy-900)] p-6 text-center text-white md:p-8">
        <h2 className="text-xl font-bold md:text-2xl">
          {context ? `${context} için yardıma mı ihtiyacınız var?` : "Yardıma mı ihtiyacınız var?"}
        </h2>
        <p className="mt-2 text-[var(--color-navy-200)]">
          Fiyat almak için hemen arayınız. 7/24 buradayız.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <PhoneButton />
          <WhatsAppButton />
        </div>
      </div>
      <div className="mt-8">
        <SiteSearch />
      </div>
    </section>
  );
}
