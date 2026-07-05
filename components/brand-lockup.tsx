import Link from "next/link";
import { cn } from "@/lib/utils";

// โลโก้ THE SIMPLE cafe & bakery — สัดส่วนตาม image 50 (SIMPLE เด่น, 3 บรรทัดจัดกึ่งกลางกัน)
// serif = Cormorant, ลายมือ = Caveat · สีเขียว ink (สีเดิม)
export function BrandLockup({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="THE SIMPLE cafe & bakery — หน้าแรก"
      className={cn(
        "inline-block text-center leading-none text-ink select-none",
        className
      )}
    >
      <div className="font-serif font-medium tracking-[0.45em] text-[11px] sm:text-xs">
        THE
      </div>
      <div className="font-serif font-semibold tracking-[0.03em] text-[30px] sm:text-[38px] leading-[0.9]">
        SIMPLE
      </div>
      <div className="font-hand text-xl sm:text-2xl leading-none -mt-0.5">
        cafe &amp; bakery
      </div>
    </Link>
  );
}
