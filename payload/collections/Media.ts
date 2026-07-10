import type { CollectionConfig } from "payload";

// คลังสื่อ (รูปภาพ) — dev: เก็บลงดิสก์ที่ public/media
// prod: จะย้ายไป Vercel Blob ตอน deploy
export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "ระบบ",
  },
  labels: {
    singular: "สื่อ/รูปภาพ",
    plural: "คลังสื่อ",
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
