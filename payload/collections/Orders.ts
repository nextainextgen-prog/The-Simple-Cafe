import type { CollectionConfig, PayloadRequest } from "payload";

// ออเดอร์ — สร้างจากหน้าร้าน (/api/orders) แก้สถานะ/ดูรายละเอียดในหลังบ้าน
// สร้างผ่านเว็บได้โดยไม่ต้องล็อกอิน (create เปิด) แต่ดู/แก้ต้องเป็นแอดมิน
export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "orderNumber",
    defaultColumns: ["orderNumber", "customerName", "total", "status", "createdAt"],
    group: "ออเดอร์",
  },
  labels: {
    singular: "ออเดอร์",
    plural: "ออเดอร์",
  },
  access: {
    // ลูกค้าหน้าร้านสร้างออเดอร์ได้ (ผ่าน local API อยู่แล้วก็ bypass) — เปิด create ไว้
    create: () => true,
    // ดู/แก้/ลบ เฉพาะผู้ล็อกอินหลังบ้าน
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "orderNumber",
      type: "text",
      label: "เลขออเดอร์",
      required: true,
      unique: true,
      admin: { readOnly: true },
    },
    {
      name: "status",
      type: "select",
      label: "สถานะ",
      required: true,
      defaultValue: "รอชำระ",
      options: [
        { label: "รอชำระ", value: "รอชำระ" },
        { label: "ชำระแล้ว", value: "ชำระแล้ว" },
        { label: "กำลังเตรียม", value: "กำลังเตรียม" },
        { label: "จัดส่ง", value: "จัดส่ง" },
        { label: "สำเร็จ", value: "สำเร็จ" },
        { label: "ยกเลิก", value: "ยกเลิก" },
      ],
    },
    {
      name: "items",
      type: "array",
      label: "รายการสินค้า",
      fields: [
        { name: "productId", type: "text", label: "รหัสสินค้า" },
        { name: "name", type: "text", label: "ชื่อ", required: true },
        { name: "price", type: "number", label: "ราคา/ชิ้น", required: true },
        { name: "qty", type: "number", label: "จำนวน", required: true },
      ],
    },
    {
      name: "subtotal",
      type: "number",
      label: "ยอดสินค้า",
      required: true,
    },
    {
      name: "deliveryFee",
      type: "number",
      label: "ค่าจัดส่ง",
      defaultValue: 0,
    },
    {
      name: "total",
      type: "number",
      label: "ยอดรวมสุทธิ",
      required: true,
    },
    {
      type: "collapsible",
      label: "ข้อมูลลูกค้า",
      fields: [
        { name: "customerName", type: "text", label: "ชื่อ", required: true },
        { name: "customerPhone", type: "text", label: "เบอร์โทร", required: true },
        { name: "address", type: "textarea", label: "ที่อยู่จัดส่ง" },
        { name: "deliveryDate", type: "text", label: "วันรับ/ส่ง" },
        { name: "note", type: "textarea", label: "หมายเหตุ" },
      ],
    },
    {
      type: "collapsible",
      label: "การชำระเงิน",
      fields: [
        { name: "paymentProvider", type: "text", label: "ช่องทาง", admin: { readOnly: true } },
        { name: "paymentReference", type: "text", label: "อ้างอิงการชำระ", admin: { readOnly: true } },
        {
          name: "consentPDPA",
          type: "checkbox",
          label: "ยินยอมเก็บข้อมูล (PDPA)",
          admin: { readOnly: true },
        },
      ],
    },
  ],
  endpoints: [
    {
      // ดาวน์โหลด CSV: GET /api/orders/export (ต้องล็อกอินหลังบ้าน)
      path: "/export",
      method: "get",
      handler: async (req: PayloadRequest) => {
        if (!req.user) {
          return Response.json({ error: "unauthorized" }, { status: 401 });
        }
        const { docs } = await req.payload.find({
          collection: "orders",
          limit: 10000,
          sort: "-createdAt",
          depth: 0,
        });
        const header = [
          "orderNumber",
          "createdAt",
          "status",
          "customerName",
          "customerPhone",
          "subtotal",
          "deliveryFee",
          "total",
          "items",
        ];
        const esc = (v: unknown) => {
          const s = String(v ?? "");
          return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        };
        const rows = docs.map((o) => {
          const items = Array.isArray((o as Record<string, unknown>).items)
            ? ((o as Record<string, unknown>).items as { name: string; qty: number }[])
                .map((i) => `${i.name} x${i.qty}`)
                .join("; ")
            : "";
          const rec = o as Record<string, unknown>;
          return [
            rec.orderNumber,
            rec.createdAt,
            rec.status,
            rec.customerName,
            rec.customerPhone,
            rec.subtotal,
            rec.deliveryFee,
            rec.total,
            items,
          ]
            .map(esc)
            .join(",");
        });
        const csv = "﻿" + [header.join(","), ...rows].join("\n");
        return new Response(csv, {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="orders.csv"`,
          },
        });
      },
    },
  ],
};
