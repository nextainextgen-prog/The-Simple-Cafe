import type { CollectionConfig } from "payload";

// หลังบ้าน: ผู้ใช้ที่ล็อกอินเข้า /admin ได้ (admin/editor)
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "ระบบ",
  },
  labels: {
    singular: "ผู้ใช้",
    plural: "ผู้ใช้",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "ชื่อ",
    },
    {
      name: "role",
      type: "select",
      label: "สิทธิ์",
      defaultValue: "editor",
      options: [
        { label: "แอดมิน (จัดการทุกอย่าง)", value: "admin" },
        { label: "เอดิเตอร์ (แก้เนื้อหา)", value: "editor" },
      ],
      required: true,
    },
  ],
};
