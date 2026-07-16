"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { Button, ButtonEl } from "@/components/ui/button";
import {
  calcDeliveryFee,
  formatTHB,
  meetsMinimum,
  MIN_ORDER_TOTAL,
} from "@/lib/orders";

export default function CartPage() {
  const { lines, subtotal, setQty, remove, ready } = useCart();

  if (!ready) return null;

  const delivery = calcDeliveryFee(subtotal);
  const total = subtotal + delivery;
  const ok = meetsMinimum(lines);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-24 text-center">
        <ShoppingBag size={48} className="mx-auto text-line" />
        <h1 className="mt-4 text-2xl font-semibold text-ink">ตะกร้าว่างอยู่</h1>
        <p className="mt-2 text-ink-soft">เลือกเบเกอรี่ที่ชอบ แล้วกลับมาสั่งได้เลย</p>
        <div className="mt-6">
          <Button href="/products">ดูสินค้าทั้งหมด</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-semibold text-ink">ตะกร้าของคุณ</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* รายการ */}
        <ul className="space-y-3">
          {lines.map((l) => (
            <li
              key={l.id}
              className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4"
            >
              <div className="flex-1">
                <p className="font-medium text-ink">{l.name}</p>
                <p className="text-sm text-ink-soft">{formatTHB(l.price)} / ชิ้น</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty(l.id, l.qty - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line hover:border-brand"
                  aria-label="ลดจำนวน"
                >
                  <Minus size={15} />
                </button>
                <span className="w-8 text-center font-medium">{l.qty}</span>
                <button
                  onClick={() => setQty(l.id, l.qty + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line hover:border-brand"
                  aria-label="เพิ่มจำนวน"
                >
                  <Plus size={15} />
                </button>
              </div>
              <div className="w-24 text-right font-accent font-semibold text-brand">
                {formatTHB(l.price * l.qty)}
              </div>
              <button
                onClick={() => remove(l.id)}
                className="text-ink-soft hover:text-red-600"
                aria-label={`ลบ ${l.name}`}
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>

        {/* สรุป */}
        <div className="h-fit rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-semibold text-ink">สรุปคำสั่งซื้อ</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">ยอดสินค้า</dt>
              <dd className="font-medium">{formatTHB(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">ค่าจัดส่ง</dt>
              <dd className="font-medium">
                {delivery > 0 ? formatTHB(delivery) : "ฟรี / นัดรับ"}
              </dd>
            </div>
            <div className="mt-3 flex justify-between border-t border-line pt-3 text-base">
              <dt className="font-semibold">รวมสุทธิ</dt>
              <dd className="font-accent font-bold text-brand">{formatTHB(total)}</dd>
            </div>
          </dl>

          {!ok && (
            <p className="mt-4 rounded-lg bg-cream px-3 py-2 text-xs text-ink-soft">
              ยอดขั้นต่ำในการสั่ง {formatTHB(MIN_ORDER_TOTAL)} — เพิ่มสินค้าอีกนิดนะครับ
            </p>
          )}

          {ok ? (
            <Button href="/checkout" className="mt-5 w-full">
              ไปชำระเงิน
            </Button>
          ) : (
            <ButtonEl disabled className="mt-5 w-full opacity-50">
              ไปชำระเงิน
            </ButtonEl>
          )}
          <Link
            href="/products"
            className="mt-3 block text-center text-sm text-ink-soft hover:text-brand"
          >
            เลือกสินค้าเพิ่ม
          </Link>
        </div>
      </div>
    </div>
  );
}
