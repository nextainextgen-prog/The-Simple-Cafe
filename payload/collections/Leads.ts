import type { Access, CollectionConfig } from "payload";

// เฉพาะแอดมิน (ใช้กับ collection access — req.user มี role)
const isAdmin: Access = ({ req }) =>
  (req.user as { role?: string } | undefined)?.role === "admin";

// ล็อกอินหลังบ้านได้ (แอดมิน/เอดิเตอร์) — ทีมงานต้องเห็น lead เพื่อติดต่อกลับ
const isLoggedIn: Access = ({ req }) => Boolean(req.user);

// lead จากฟอร์มหน้าเว็บ — ฟอร์มติดต่อ (/contact) และขอใบเสนอราคา (/wholesale)
export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "source", "status", "createdAt"],
    group: "ลูกค้า",
  },
  labels: {
    singular: "ลูกค้าที่ติดต่อเข้ามา",
    plural: "ลูกค้าที่ติดต่อเข้ามา",
  },
  access: {
    // ปิด create ฝั่ง REST/GraphQL — เขียนได้ทางเดียวคือผ่าน Server Action ที่ overrideAccess
    // กันคนยิง POST /api/leads ตรงๆ ถล่มเป็นสแปม (Server Action มี CSRF origin check ให้)
    create: () => false,
    read: isLoggedIn,
    update: isLoggedIn,
    delete: isAdmin,
  },
  fields: [
    {
      name: "source",
      type: "select",
      label: "มาจากฟอร์ม",
      required: true,
      admin: { readOnly: true },
      options: [
        { label: "ติดต่อเรา", value: "contact" },
        { label: "ขอใบเสนอราคา", value: "quote" },
      ],
    },
    {
      name: "status",
      type: "select",
      label: "สถานะ",
      defaultValue: "new",
      options: [
        { label: "ใหม่ ยังไม่ติดต่อ", value: "new" },
        { label: "ติดต่อกลับแล้ว", value: "contacted" },
        { label: "ปิดงาน", value: "closed" },
      ],
    },
    {
      name: "name",
      type: "text",
      label: "ชื่อผู้ติดต่อ",
      required: true,
      admin: { readOnly: true },
    },
    {
      name: "phone",
      type: "text",
      label: "เบอร์โทร / LINE",
      admin: { readOnly: true },
    },
    {
      name: "lineId",
      type: "text",
      label: "LINE ID",
      admin: { readOnly: true, condition: (data) => data?.source === "quote" },
    },
    {
      name: "email",
      type: "email",
      label: "อีเมล",
      admin: { readOnly: true, condition: (data) => data?.source === "quote" },
    },
    {
      name: "message",
      type: "textarea",
      label: "ข้อความ",
      admin: { readOnly: true, condition: (data) => data?.source === "contact" },
    },
    {
      name: "businessName",
      type: "text",
      label: "ชื่อธุรกิจ / ร้าน",
      admin: { readOnly: true, condition: (data) => data?.source === "quote" },
    },
    {
      name: "businessType",
      type: "select",
      label: "ประเภทธุรกิจ",
      admin: { readOnly: true, condition: (data) => data?.source === "quote" },
      options: [
        { label: "คาเฟ่", value: "cafe" },
        { label: "ร้านอาหาร", value: "restaurant" },
        { label: "โรงแรม", value: "hotel" },
        { label: "จัดเลี้ยง / จัดเบรก", value: "catering" },
        { label: "อื่นๆ", value: "other" },
      ],
    },
    {
      name: "volume",
      type: "text",
      label: "ปริมาณ & ความถี่",
      admin: { readOnly: true, condition: (data) => data?.source === "quote" },
    },
    {
      name: "products",
      type: "text",
      label: "สินค้าที่สนใจ",
      admin: { readOnly: true, condition: (data) => data?.source === "quote" },
    },
    {
      name: "note",
      type: "textarea",
      label: "โน้ตภายใน (ทีมงานกรอกเอง)",
    },
  ],
};
