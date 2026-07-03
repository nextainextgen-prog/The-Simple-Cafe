import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// กล่อง placeholder รูปภาพ — บอกชัดว่าตรงนี้ใส่ภาพอะไร (รอรูปจริงจากลูกค้า)
export function ImagePlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-[10px] border border-dashed border-line bg-surface text-ink-soft/70",
        className
      )}
    >
      <ImageIcon size={26} />
      <span className="font-accent text-[11px] uppercase tracking-wide px-3 text-center">
        {label}
      </span>
    </div>
  );
}
