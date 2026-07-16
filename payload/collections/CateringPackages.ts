import type { CollectionConfig } from "payload";

// แพ็กเกจจัดเบรก — เดิม hardcode ราคา 89/139/199 ในหน้า catering เจ้าของแก้เองไม่ได้
export const CateringPackages: CollectionConfig = {
  slug: "catering-packages",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "pricePerPerson", "featured", "order"],
    group: "จัดเบรก",
  },
  defaultSort: "order",
  labels: {
    singular: "แพ็กเกจจัดเบรก",
    plural: "แพ็กเกจจัดเบรก",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", label: "ชื่อแพ็กเกจ", required: true },
    {
      name: "pricePerPerson",
      type: "number",
      label: "ราคาต่อท่าน (บาท)",
      required: true,
      min: 0,
    },
    {
      name: "featured",
      type: "checkbox",
      label: "แพ็กเกจแนะนำ (ไฮไลต์)",
      defaultValue: false,
    },
    {
      name: "items",
      type: "array",
      label: "รายการในแพ็กเกจ",
      minRows: 1,
      fields: [{ name: "text", type: "text", label: "รายการ", required: true }],
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
