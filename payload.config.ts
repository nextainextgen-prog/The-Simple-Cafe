import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Categories } from "./payload/collections/Categories";
import { Products } from "./payload/collections/Products";
import { WhatWeDo } from "./payload/collections/WhatWeDo";
import { Reviews } from "./payload/collections/Reviews";
import { ClientLogos } from "./payload/collections/ClientLogos";
import { SiteSettings } from "./payload/globals/SiteSettings";
import { SocialProof } from "./payload/globals/SocialProof";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "· Simple Cafe หลังบ้าน",
    },
  },
  collections: [Users, Media, Categories, Products, WhatWeDo, Reviews, ClientLogos],
  globals: [SiteSettings, SocialProof],
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
