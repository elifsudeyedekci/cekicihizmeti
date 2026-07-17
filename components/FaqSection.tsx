import type { Faq } from "@/lib/data/types";
import { JsonLd } from "./JsonLd";
import { faqPageSchema } from "@/lib/schema";

export function FaqSection({ faqs, title = "Sık Sorulan Sorular" }: { faqs: Faq[]; title?: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={faqPageSchema(faqs)} />
      <h2 className="mb-6 text-2xl font-bold text-[var(--color-navy-900)]">{title}</h2>
      <div className="divide-y divide-[var(--color-navy-100)] rounded-xl border border-[var(--color-navy-100)] bg-white">
        {faqs.map((f, i) => (
          <details key={i} className="group p-4 open:bg-[var(--color-navy-50)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-[var(--color-navy-900)]">
              {f.q}
              <span className="shrink-0 text-[var(--color-cta-500)] transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-[#2d3f57]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
