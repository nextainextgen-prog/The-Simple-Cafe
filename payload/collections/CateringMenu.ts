import type { CollectionConfig } from "payload";

// กลุ่มเมนูตัวอย่างจัดเบรก (เบเกอรี่ / เครื่องดื่ม) — เดิม hardcode ในหน้า catering
export const CateringMenu: CollectionConfig = {
  slug: "catering-menu",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "order"],
    group: "จัดเบรก",
  },
  defaultSort: "order",
  labels: {
    singular: "กลุ่มเมนูจัดเบรก",
    plural: "กลุ่มเมนูจัดเบรก",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", label: "ชื่อกลุ่ม (เช่น เบเกอรี่)", required: true },
    {
      name: "items",
      type: "array",
      label: "รายการเมนู",
      minRows: 1,
      fields: [{ name: "label", type: "text", label: "ชื่อเมนู", required: true }],
    },
    {
      name: "visible",
      type: "checkbox",
      label: "แสดงบนเว็บ",
      defaultValue: true,
    },
    { name: "order", type: "number", label: "ลำดับการแสดง", defaultValue: 0 },
  ],
};
