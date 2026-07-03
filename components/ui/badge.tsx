import { cn } from "@/lib/utils";

type Tone = "gold" | "blush" | "green";

const tones: Record<Tone, string> = {
  gold: "bg-gold-bright text-ink",
  blush: "bg-soft text-ink",
  green: "bg-brand-deep text-base",
};

// Typewriter sticker badge เอียง -3deg แบบ Levain
export function Badge({
  children,
  tone = "gold",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "badge-stamp inline-block rounded-[4px] px-2.5 py-1 text-[11px] font-semibold shadow-sm",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
