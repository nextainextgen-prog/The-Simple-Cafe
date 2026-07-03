import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20 text-center">
        {eyebrow && <Badge tone="gold">{eyebrow}</Badge>}
        <h1 className="mt-4 text-4xl sm:text-5xl font-semibold text-ink">{title}</h1>
        {desc && (
          <p className="mt-4 text-ink-soft max-w-xl mx-auto leading-relaxed">{desc}</p>
        )}
      </div>
    </section>
  );
}
