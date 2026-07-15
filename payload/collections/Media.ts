import type { CollectionConfig } from "payload";

// คลังสื่อ (รูปภาพ) — dev: เก็บลงดิสก์ที่ public/media
// prod: ใช้ Vercel Blob (เปิดใช้อัตโนมัติเมื่อมี BLOB_READ_WRITE_TOKEN — ดู payload.config.ts)
export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "ระบบ",
  },
  labels: {
    singular: "สื่อ/รูปภาพ",
    plural: "คลังสื่อ",
  },
  access: {
    // รูปต้องเปิดให้สาธารณะอ่านได้ ไม่งั้นหน้าเว็บโหลดรูปเป็น 403 (แก้/ลบ/อัป ยังต้องล็อกอิน)
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 400 },
      { name: "card", width: 768 },
      { name: "hero", width: 1600 },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "คำอธิบายรูป (alt — สำคัญต่อ SEO)",
    },
  ],
};
