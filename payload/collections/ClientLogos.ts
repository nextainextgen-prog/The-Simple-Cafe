import type { CollectionConfig } from "payload";

// โลโก้ลูกค้า/พาร์ทเนอร์ — อัปโหลดผ่านหลังบ้าน แสดงบนหน้าแรก + หน้า wholesale
// แทนที่ placeholder "โลโก้ลูกค้า" เดิม
export const ClientLogos: CollectionConfig = {
  slug: "client-logos",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "visible", "order"],
    group: "รีวิว",
  },
  labels: {
    singular: "โลโก้ลูกค้า",
    plural: "โลโก้ลูกค้า",
  },
  defaultSort: "order",
  fields: [
    {
      name: "name",
      type: "text",
      label: "ชื่อลูกค้า/แบรนด์",
      required: true,
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "โลโก้ (แนะนำพื้นหลังโปร่ง PNG/SVG)",
      required: true,
    },
    {
      name: "url",
      type: "text",
      label: "ลิงก์เว็บลูกค้า (ถ้ามี)",
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
