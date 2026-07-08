import type { CollectionConfig } from "payload";

// หมวดสินค้า (เค้ก/คัพเค้ก/ขนมปัง/ครัวซองต์/คุกกี้/อื่นๆ) — เพิ่ม/แก้/ลบเองได้
export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "key", "order"],
    group: "สินค้า",
  },
  labels: {
    singular: "หมวดสินค้า",
    plural: "หมวดสินค้า",
  },
  defaultSort: "order",
  fields: [
    {
      name: "label",
      type: "text",
      label: "ชื่อหมวด (แสดงบนเว็บ)",
      required: true,
    },
    {
      name: "key",
      type: "text",
      label: "คีย์ (ภาษาอังกฤษ ใช้ในระบบ)",
      required: true,
      unique: true,
      admin: { description: "เช่น cake, bread, cookie — ห้ามซ้ำ" },
    },
    {
      name: "order",
      type: "number",
      label: "ลำดับการแสดง",
      defaultValue: 0,
    },
  ],
};
