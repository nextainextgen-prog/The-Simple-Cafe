import path from "path";
import { fileURLToPath } from "url";
import { buildConfig, type CollectionConfig, type GlobalConfig, type Plugin } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Categories } from "./payload/collections/Categories";
import { Products } from "./payload/collections/Products";
import { WhatWeDo } from "./payload/collections/WhatWeDo";
import { Reviews } from "./payload/collections/Reviews";
import { ClientLogos } from "./payload/collections/ClientLogos";
import { Orders } from "./payload/collections/Orders";
import { Leads } from "./payload/collections/Leads";
import { SiteSettings } from "./payload/globals/SiteSettings";
import { SocialProof } from "./payload/globals/SocialProof";
import { revalidateSite } from "./lib/revalidate";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// collection ที่เป็นเนื้อหาหน้าเว็บ — แก้แล้วต้อง revalidate หน้าเว็บทันที
const CONTENT_SLUGS = new Set([
  "products",
  "categories",
  "what-we-do",
  "reviews",
  "client-logos",
  "media",
]);

const revalidateHook = () => {
  revalidateSite();
};

// ผูก afterChange/afterDelete เพื่อ revalidate ให้ collection เนื้อหา (ที่เดียว ไม่ต้องแก้ทุกไฟล์)
function withRevalidate(collection: CollectionConfig): CollectionConfig {
  if (!CONTENT_SLUGS.has(collection.slug)) return collection;
  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      afterChange: [...(collection.hooks?.afterChange ?? []), revalidateHook],
      afterDelete: [...(collection.hooks?.afterDelete ?? []), revalidateHook],
    },
  };
}

function withGlobalRevalidate(global: GlobalConfig): GlobalConfig {
  return {
    ...global,
    hooks: {
      ...global.hooks,
      afterChange: [...(global.hooks?.afterChange ?? []), revalidateHook],
    },
  };
}

// เก็บรูปบน Vercel Blob เมื่อมี token (prod) — dev ไม่มี token ใช้ดิสก์ public/media ตามเดิม
const storagePlugins: Plugin[] = process.env.BLOB_READ_WRITE_TOKEN
  ? [
      vercelBlobStorage({
        collections: { media: true },
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }),
    ]
  : [];

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "· Simple Cafe หลังบ้าน",
    },
  },
  // Leads ผ่าน withRevalidate ได้ปลอดภัย — "leads" ไม่อยู่ใน CONTENT_SLUGS จึงไม่ติด hook
  // (lead ไม่ได้ขึ้นหน้าเว็บ ไม่ต้อง revalidate ทั้งเว็บทุกครั้งที่ลูกค้าส่งฟอร์ม)
  collections: [
    Users,
    Media,
    Categories,
    Products,
    WhatWeDo,
    Reviews,
    ClientLogos,
    Orders,
    Leads,
  ].map(withRevalidate),
  globals: [SiteSettings, SocialProof].map(withGlobalRevalidate),
  plugins: storagePlugins,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
});
