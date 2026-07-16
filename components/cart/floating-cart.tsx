"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";

// ปุ่มตะกร้าลอย — โผล่เมื่อมีของในตะกร้า (มุมขวาล่าง เหนือปุ่ม LINE)
export function FloatingCart() {
  const { count, ready } = useCart();
  if (!ready || count === 0) return null;

  return (
    <Link
      href="/cart"
      className="fixed bottom-24 right-5 z-40 flex items-center gap-2 rounded-full bg-brand-deep px-5 py-3 text-cream shadow-lg transition hover:bg-brand sm:bottom-6"
      aria-label={`ตะกร้า ${count} รายการ`}
    >
      <ShoppingBag size={20} />
      <span className="text-sm font-semibold">ตะกร้า</span>
      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-cream px-1.5 text-xs font-bold text-brand-deep">
        {count}
      </span>
    </Link>
  );
}
