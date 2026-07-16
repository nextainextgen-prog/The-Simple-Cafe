import type { CollectionConfig } from "payload";

// เงื่อนไข/คำถามที่พบบ่อยของจัดเบรก — เดิม hardcode ในหน้า catering
export const CateringFaq: CollectionConfig = {
  slug: "catering-faq",
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "order"],
    group: "จัดเบรก",
  },
  defaultSort: "order",
  labels: {
    singular: "คำถามจัดเบรก (FAQ)",
    plural: "คำถามจัดเบรก (FAQ)",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "question", type: "text", label: "คำถาม", required: true },
    { name: "answer", type: "textarea", label: "คำตอบ", required: true },
    {
      name: "visible",
      type: "checkbox",
      label: "แสดงบนเว็บ",
      defaultValue: true,
    },
    { name: "order", type: "number", label: "ลำดับการแสดง", defaultValue: 0 },
  ],
};
