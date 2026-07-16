import type { GlobalConfig } from "payload";

// ข้อมูลกลางของเว็บ — แบรนด์/ติดต่อ/เมนู/สถิติ แก้ที่เดียว ใช้ทั้งเว็บ
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "ตั้งค่าเว็บไซต์",
  admin: {
    group: "ตั้งค่า",
  },
  fields: [
    {
      type: "collapsible",
      label: "แบรนด์",
      fields: [
        { name: "brandName", type: "text", label: "ชื่อแบรนด์", defaultValue: "Simple Cafe" },
        { name: "tagline", type: "text", label: "สโลแกน" },
        { name: "logo", type: "upload", relationTo: "media", label: "โลโก้" },
      ],
    },
    {
      type: "collapsible",
      label: "ข้อมูลติดต่อ",
      fields: [
        { name: "phone", type: "text", label: "เบอร์โทร" },
        { name: "lineId", type: "text", label: "LINE ID" },
        { name: "lineUrl", type: "text", label: "ลิงก์ LINE" },
        { name: "email", type: "email", label: "อีเมล" },
        { name: "address", type: "text", label: "ที่อยู่" },
        { name: "hours", type: "text", label: "เวลาทำการ" },
      ],
    },
    {
      name: "marquee",
      type: "text",
      label: "ข้อความแถบวิ่ง (marquee)",
    },
    {
      name: "nav",
      type: "array",
      label: "เมนูนำทาง",
      fields: [
        { name: "label", type: "text", label: "ชื่อเมนู", required: true },
        { name: "href", type: "text", label: "ลิงก์", required: true },
      ],
    },
    {
      name: "stats",
      type: "array",
      label: "สถิติ (เช่น 6+ ปี, 60+ ลูกค้า)",
      fields: [
        { name: "value", type: "text", label: "ตัวเลข", required: true },
        { name: "label", type: "text", label: "คำอธิบาย", required: true },
      ],
    },
  ],
};
