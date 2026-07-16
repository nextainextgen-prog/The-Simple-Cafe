import type { CollectionConfig } from "payload";

// รีวิวลูกค้า — ดึงจาก Google Places API แล้ว cache ลง DB (ผ่าน cron วันละครั้ง)
// เพิ่มรีวิวเองด้วยมือก็ได้ (source = manual). แอดมินซ่อน/จัดลำดับได้
export const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: {
    useAsTitle: "authorName",
    defaultColumns: ["authorName", "rating", "source", "visible", "order"],
    group: "รีวิว",
  },
  labels: {
    singular: "รีวิว",
    plural: "รีวิว",
  },
  defaultSort: "order",
  fields: [
    {
      name: "authorName",
      type: "text",
      label: "ชื่อผู้รีวิว",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      label: "คะแนน (1-5)",
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: "text",
      type: "textarea",
      label: "ข้อความรีวิว",
    },
    {
      name: "relativeTime",
      type: "text",
      label: "ช่วงเวลา (เช่น 2 สัปดาห์ที่แล้ว)",
      admin: { description: "ข้อความช่วงเวลาแบบที่ Google ส่งมา" },
    },
    {
      name: "profilePhoto",
      type: "text",
      label: "รูปโปรไฟล์ (URL)",
    },
    {
      name: "source",
      type: "select",
      label: "แหล่งที่มา",
      defaultValue: "manual",
      options: [
        { label: "Google", value: "google" },
        { label: "เพิ่มเอง", value: "manual" },
      ],
    },
    {
      name: "sourceId",
      type: "text",
      label: "รหัสอ้างอิงจากแหล่งที่มา (กันซ้ำ)",
      unique: true,
      admin: {
        description: "ใช้ระบบ sync กันรีวิวซ้ำ — ปล่อยว่างสำหรับรีวิวที่เพิ่มเอง",
        readOnly: true,
      },
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
