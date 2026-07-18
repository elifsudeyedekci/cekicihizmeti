import Link from "next/link";

/**
 * Hafif metin işaretleyici: "**kalın**" -> <strong>, "[metin](/yol)" -> dahili <Link>.
 * Tam markdown değil; sadece blog/hizmet içeriğinde kullanılan iki basit kalıbı destekler.
 */
export function RichParagraph({ text, className }: { text: string; className?: string }) {
  const tokens = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(\/[^)]+\))/g);
  return (
    <p className={className}>
      {tokens.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        const linkMatch = part.match(/^\[([^\]]+)\]\((\/[^)]+)\)$/);
        if (linkMatch) {
          return (
            <Link key={i} href={linkMatch[2]} className="font-semibold text-[var(--color-cta-600)] underline">
              {linkMatch[1]}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}
