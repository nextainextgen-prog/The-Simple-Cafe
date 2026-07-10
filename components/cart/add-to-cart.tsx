"use client";

import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { cn } from "@/lib/utils";

// ปุ่มเพิ่มลงตะกร้า — สินค้าที่ไม่มีราคา (สอบถามราคา) จะกดไม่ได้
export function AddToCart({
  id,
  name,
  price,
}: {
  id: string;
  name: string;
  price?: number;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (price == null) {
    return (
      <span className="mt-3 block text-center text-xs text-ink-soft">
        สอบถามราคาผ่าน LINE
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        add({ id, name, price });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1200);
      }}
      className={cn(
        "mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition",
        added
          ? "border-brand-deep bg-brand-deep text-cream"
          : "border-line bg-cream text-ink hover:border-brand hover:bg-surface"
      )}
      aria-label={`เพิ่ม ${name} ลงตะกร้า`}
    >
      {added ? (
        <>
          <Check size={16} /> เพิ่มแล้ว
        </>
      ) : (
        <>
          <Plus size={16} /> เพิ่มลงตะกร้า
        </>
      )}
    </button>
  );
}
