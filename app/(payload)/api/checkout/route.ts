import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { getProducts } from "@/lib/cms";
import {
  calcDeliveryFee,
  makeOrderNumber,
  meetsMinimum,
  type CartLine,
} from "@/lib/orders";
import { getPaymentProvider } from "@/lib/payment";
import { pushOrderNotification } from "@/lib/line";

// สร้างออเดอร์จากหน้าร้าน (แยกจาก /api/orders ซึ่งเป็น REST ของ Payload สำหรับหลังบ้าน)
// ราคาคำนวณจากฝั่ง server เสมอ (อ้างจาก CMS) กัน client แก้ราคา
export const dynamic = "force-dynamic";

/* eslint-disable @typescript-eslint/no-explicit-any */

type Body = {
  items?: { id: string; qty: number }[];
  customer?: {
    name?: string;
    phone?: string;
    address?: string;
    deliveryDate?: string;
    note?: string;
  };
  consentPDPA?: boolean;
};

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items : [];
  const c = body.customer || {};

  // validate
  if (!items.length) {
    return NextResponse.json({ ok: false, error: "ตะกร้าว่าง" }, { status: 400 });
  }
  if (!c.name || !c.phone) {
    return NextResponse.json(
      { ok: false, error: "กรุณากรอกชื่อและเบอร์โทร" },
      { status: 400 }
    );
  }
  if (!body.consentPDPA) {
    return NextResponse.json(
      { ok: false, error: "กรุณายอมรับการเก็บข้อมูล (PDPA)" },
      { status: 400 }
    );
  }

  // ราคาจริงจาก CMS
  const products = await getProducts();
  const priceMap = new Map(products.map((p) => [p.id, p]));
  const lines: CartLine[] = [];
  for (const it of items) {
    const p = priceMap.get(it.id);
    const qty = Math.max(1, Math.floor(Number(it.qty) || 0));
    if (!p || p.price == null) {
      return NextResponse.json(
        { ok: false, error: `สินค้า ${it.id} สั่งซื้อออนไลน์ไม่ได้` },
        { status: 400 }
      );
    }
    lines.push({ id: p.id, name: p.name, price: p.price, qty });
  }

  if (!meetsMinimum(lines)) {
    return NextResponse.json(
      { ok: false, error: "ยอดสั่งซื้อยังไม่ถึงขั้นต่ำ" },
      { status: 400 }
    );
  }

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const deliveryFee = calcDeliveryFee(subtotal);
  const total = subtotal + deliveryFee;
  const orderNumber = makeOrderNumber(
    Date.now(),
    Math.random().toString(36).slice(2)
  );

  try {
    const payload = await getPayload({ config });

    // ชำระเงิน (provider จาก env — default mock)
    const provider = getPaymentProvider();
    const intent = await provider.createIntent({
      orderNumber,
      amount: total,
      customerName: c.name,
      customerPhone: c.phone,
    });

    const order = await payload.create({
      collection: "orders",
      data: {
        orderNumber,
        status: intent.status === "paid" ? "ชำระแล้ว" : "รอชำระ",
        items: lines.map((l) => ({
          productId: l.id,
          name: l.name,
          price: l.price,
          qty: l.qty,
        })),
        subtotal,
        deliveryFee,
        total,
        customerName: c.name,
        customerPhone: c.phone,
        address: c.address || "",
        deliveryDate: c.deliveryDate || "",
        note: c.note || "",
        paymentProvider: intent.provider,
        paymentReference: intent.reference,
        consentPDPA: true,
      } as any,
    });

    // แจ้งร้านผ่าน LINE (mock-log ถ้ายังไม่ตั้ง env) — ไม่ให้ล้ม flow
    const notify = await pushOrderNotification({
      orderNumber,
      customerName: c.name,
      customerPhone: c.phone,
      total,
      itemCount: lines.reduce((s, l) => s + l.qty, 0),
      deliveryDate: c.deliveryDate || "-",
    }).catch(() => ({ sent: false, mocked: true }));

    return NextResponse.json({
      ok: true,
      orderNumber,
      orderId: (order as any).id,
      subtotal,
      deliveryFee,
      total,
      payment: {
        status: intent.status,
        provider: intent.provider,
        instructions: intent.instructions,
        qrImage: intent.qrImage,
        redirectUrl: intent.redirectUrl,
      },
      notified: notify.sent,
    });
  } catch (err: any) {
    console.error("[checkout] create order failed:", err);
    return NextResponse.json(
      { ok: false, error: "สร้างออเดอร์ไม่สำเร็จ ลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
