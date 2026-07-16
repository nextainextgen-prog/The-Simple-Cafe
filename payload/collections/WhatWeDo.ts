import type { CollectionConfig } from "payload";

// "สิ่งที่เราทำ" — การ์ดบริการหน้าแรก + หน้ารายละเอียด /what-we-do/[slug]
// เจ้าของร้านเพิ่ม/แก้การ์ด + เนื้อหา + SEO เองได้จากหลังบ้าน
export const WhatWeDo: CollectionConfig = {
  slug: "what-we-do",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "visible", "order"],
    group: "เนื้อหาเว็บ",
  },
  labels: {
    singular: "สิ่งที่เราทำ",
    plural: "สิ่งที่เราทำ",
  },
  defaultSort: "order",
  fields: [
    {
      name: "title",
      type: "text",
      label: "หัวข้อ",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug (ใช้ใน URL)",
      required: true,
      unique: true,
      admin: { description: "เช่น bakery-production — ใช้เป็น /what-we-do/<slug> ห้ามซ้ำ" },
    },
    {
      name: "summary",
      type: "textarea",
      label: "สรุปสั้น (แสดงบนการ์ด)",
      required: true,
    },
    {
      name: "art",
      type: "text",
      label: "ภาพมาสคอต (path)",
      admin: { description: "เช่น /mascot/outline-mixing.png — ไอคอนบนการ์ด" },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "รูปประกอบหน้ารายละเอียด",
    },
    {
      name: "content",
      type: "richText",
      label: "เนื้อหารายละเอียด",
    },
    {
      type: "collapsible",
      label: "SEO",
      fields: [
        { name: "metaTitle", type: "text", label: "Meta title (เว้นว่าง = ใช้หัวข้อ)" },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta description (เว้นว่าง = ใช้สรุปสั้น)",
        },
      ],
    },
    {
      name: "visible",
      type: "checkbox",
      label: "แสดงบนเว็บ",
      defaultValue: true,
    },
    {
      name: "order",
      type: "number",
      label: "ลำดับการแสดง",
      defaultValue: 0,
    },
  ],
};
