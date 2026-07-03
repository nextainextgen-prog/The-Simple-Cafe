import Image from "next/image";
import { cn } from "@/lib/utils";

// wrapper สำหรับมาสคอต/ไอคอน (PNG หลาย ratio) — fill + object-contain กันภาพเพี้ยน
export function Art({
  src,
  alt = "",
  className,
  sizes = "(max-width: 768px) 60vw, 420px",
  priority = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain"
      />
    </div>
  );
}
