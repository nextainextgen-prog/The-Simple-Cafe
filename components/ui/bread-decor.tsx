import { Art } from "@/components/ui/art";
import { cn } from "@/lib/utils";

// แถวไอคอนขนมปังจางๆ ไว้ตกแต่งหัวข้อ section (ไม่ใช่คอนเทนต์)
const ICONS = ["croissant", "loaf", "pie", "cookie", "donuts", "baguette"];

export function BreadDecor({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none flex items-center justify-center gap-3 opacity-25",
        className
      )}
    >
      {ICONS.map((name) => (
        <div key={name} className="h-8 w-8 sm:h-9 sm:w-9">
          <Art src={`/icons/${name}.png`} className="h-full w-full" sizes="36px" />
        </div>
      ))}
    </div>
  );
}
