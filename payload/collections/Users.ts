import type { CollectionConfig, Access, FieldAccess } from "payload";

// เฉพาะแอดมินเท่านั้น (ใช้กับ collection access — req.user มี role)
const isAdmin: Access = ({ req }) =>
  (req.user as { role?: string } | undefined)?.role === "admin";

// เฉพาะแอดมิน (ใช้กับ field access)
const isAdminField: FieldAccess = ({ req }) =>
  (req.user as { role?: string } | undefined)?.role === "admin";

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
  access: {
    // สร้าง/ลบ ผู้ใช้ = แอดมินเท่านั้น (ผู้ใช้คนแรกยังสมัครได้ผ่าน first-register ซึ่ง bypass access)
    create: isAdmin,
    delete: isAdmin,
    // อ่าน = ล็อกอินก็เห็นได้; แก้ = แอดมินแก้ได้ทุกคน / เอดิเตอร์แก้ได้เฉพาะตัวเอง
    read: ({ req }) => Boolean(req.user),
    update: ({ req, id }) =>
      (req.user as { role?: string } | undefined)?.role === "admin" ||
      (Boolean(req.user) && req.user?.id === id),
  },
  hooks: {
    // ผู้ใช้คนแรกของระบบให้เป็นแอดมินอัตโนมัติ (กันภาวะไม่มีแอดมินเลย → เลื่อน role ไม่ได้)
    beforeChange: [
      async ({ req, operation, data }) => {
        if (operation === "create") {
          const { totalDocs } = await req.payload.count({ collection: "users" });
          if (totalDocs === 0) {
            return { ...data, role: "admin" };
          }
        }
        return data;
      },
    ],
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
      // เฉพาะแอดมินเท่านั้นที่ตั้ง/แก้ role ได้ — กัน editor เลื่อนตัวเองเป็น admin
      access: {
        create: isAdminField,
        update: isAdminField,
      },
      options: [
        { label: "แอดมิน (จัดการทุกอย่าง)", value: "admin" },
        { label: "เอดิเตอร์ (แก้เนื้อหา)", value: "editor" },
      ],
      required: true,
    },
  ],
};
