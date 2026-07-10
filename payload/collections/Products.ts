import type { CollectionConfig } from "payload";

// สินค้า — แก้ชื่อ/ราคา/รูป/หมวด/badge/การแสดงผล เองได้จากหลังบ้าน
export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "price", "visible", "order"],
    group: "สินค้า",
  },
  labels: {
    singular: "สินค้า",
    plural: "สินค้า",
  },
  defaultSort: "order",
  fields: [
    {
      name: "name",
      type: "text",
      label: "ชื่อสินค้า",
      required: true,
    },
    {
      name: "price",
      type: "number",
      label: "ราคา (บาท)",
      admin: { description: "เว้นว่าง = แสดง \"สอบถามราคา\"" },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: "หมวด",
      required: true,
    },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      label: "รูปสินค้า",
      hasMany: true,
    },
    {
      name: "badge",
      type: "select",
      label: "ป้าย",
      options: [
        { label: "— ไม่มี —", value: "none" },
        { label: "ขายดี", value: "ขายดี" },
        { label: "ใหม่", value: "ใหม่" },
      ],
      defaultValue: "none",
    },
    {
      name: "grade",
      type: "select",
      label: "เกรด",
      options: [
        { label: "— ไม่ระบุ —", value: "none" },
        { label: "มาตรฐาน", value: "มาตรฐาน" },
        { label: "พรีเมียม", value: "พรีเมียม" },
      ],
      defaultValue: "none",
    },
    {
      name: "description",
      type: "textarea",
      label: "คำอธิบาย",
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
