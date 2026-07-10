"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { ButtonEl, Button } from "@/components/ui/button";
import { calcDeliveryFee, formatTHB, meetsMinimum } from "@/lib/orders";

type Result = {
  orderNumber: string;
  total: number;
  payment: { status: string; instructions?: string; redirectUrl?: string };
};

export default function CheckoutPage() {
  const { lines, subtotal, clear, ready } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<Result | null>(null);

  const delivery = calcDeliveryFee(subtotal);
  const total = subtotal + delivery;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    if (!form.get("consent")) {
      setError("กรุณายอมรับการเก็บข้อมูล (PDPA)");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({ id: l.id, qty: l.qty })),
          customer: {
            name: form.get("name"),
            phone: form.get("phone"),
            address: form.get("address"),
            deliveryDate: form.get("deliveryDate"),
            note: form.get("note"),
          },
          consentPDPA: true,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "สั่งซื้อไม่สำเร็จ");
        return;
      }
      clear();
      setDone({
        orderNumber: data.orderNumber,
        total: data.total,
        payment: data.payment,
      });
    } catch {
      setError("เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
    } finally {
      setSubmitting(false);
    }
  }

  if (!ready) return null;

  // สั่งซื้อสำเร็จ
  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 sm:px-6 py-24 text-center">
        <CheckCircle2 size={56} className="mx-auto text-brand" />
        <h1 className="mt-4 text-2xl font-semibold text-ink">รับออเดอร์แล้ว!</h1>
        <p className="mt-2 text-ink-soft">
          เลขที่ออเดอร์ <span className="font-semibold text-ink">{done.orderNumber}</span>
        </p>
        <p className="mt-1 text-ink-soft">ยอดรวม {formatTHB(done.total)}</p>
        {done.payment.instructions && (
          <p className="mt-6 rounded-xl border border-line bg-surface px-5 py-4 text-sm text-ink">
            {done.payment.instructions}
          </p>
        )}
        <div className="mt-8">
          <Button href="/products">กลับไปเลือกสินค้าต่อ</Button>
        </div>
      </div>
    );
  }

  // ตะกร้าว่าง / ยังไม่ถึงขั้นต่ำ
  if (lines.length === 0 || !meetsMinimum(lines)) {
    return (
      <div className="mx-auto max-w-xl px-4 sm:px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-ink">ยังสั่งซื้อไม่ได้</h1>
        <p className="mt-2 text-ink-soft">
          {lines.length === 0 ? "ตะกร้ายังว่างอยู่" : "ยอดสั่งซื้อยังไม่ถึงขั้นต่ำ"}
        </p>
        <div className="mt-6">
          <Button href="/cart">กลับไปที่ตะกร้า</Button>
        </div>
      </div>
    );
  }

  const field =
    "mt-1 w-full rounded-xl border border-line bg-cream px-4 py-2.5 text-ink outline-none focus:border-brand";

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-semibold text-ink">ชำระเงิน</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-ink">ชื่อผู้สั่ง *</label>
            <input name="name" required className={field} />
          </div>
          <div>
            <label className="text-sm font-medium text-ink">เบอร์โทร *</label>
            <input name="phone" required inputMode="tel" className={field} />
          </div>
          <div>
            <label className="text-sm font-medium text-ink">ที่อยู่จัดส่ง</label>
            <textarea name="address" rows={3} className={field} />
          </div>
          <div>
            <label className="text-sm font-medium text-ink">วันที่ต้องการรับ/ส่ง</label>
            <input name="deliveryDate" type="date" className={field} />
          </div>
          <div>
            <label className="text-sm font-medium text-ink">หมายเหตุ</label>
            <textarea name="note" rows={2} className={field} />
          </div>

          <label className="flex items-start gap-2 text-sm text-ink-soft">
            <input type="checkbox" name="consent" className="mt-1" />
            <span>
              ยินยอมให้เก็บและใช้ข้อมูลส่วนบุคคลเพื่อดำเนินการสั่งซื้อและจัดส่งตาม{" "}
              <Link href="/privacy" className="text-brand underline">
                นโยบายความเป็นส่วนตัว
              </Link>{" "}
              (PDPA)
            </span>
          </label>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <ButtonEl type="submit" disabled={submitting} className="w-full">
            {submitting ? "กำลังส่งคำสั่งซื้อ..." : `ยืนยันสั่งซื้อ · ${formatTHB(total)}`}
          </ButtonEl>
        </form>

        {/* สรุป */}
        <div className="h-fit rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-semibold text-ink">รายการ</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {lines.map((l) => (
              <li key={l.id} className="flex justify-between">
                <span className="text-ink-soft">
                  {l.name} × {l.qty}
                </span>
                <span className="font-medium">{formatTHB(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">ยอดสินค้า</dt>
              <dd>{formatTHB(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">ค่าจัดส่ง</dt>
              <dd>{delivery > 0 ? formatTHB(delivery) : "ฟรี / นัดรับ"}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-2 text-base">
              <dt className="font-semibold">รวมสุทธิ</dt>
              <dd className="font-accent font-bold text-brand">{formatTHB(total)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
