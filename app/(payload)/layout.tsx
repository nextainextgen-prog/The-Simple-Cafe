import type { ServerFunctionClient } from "payload";
import config from "@payload-config";
import "@payloadcms/next/css";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import { Noto_Sans_Thai } from "next/font/google";
import React from "react";

import { importMap } from "./admin/importMap.js";
// ธีมแบรนด์ — ต้อง import หลัง @payloadcms/next/css เพื่อให้ @layer payload ทับ payload-default ได้
import "./custom.scss";

// หลังบ้านเดิมใช้ system font ทำให้ภาษาไทยหน้าตาคนละเรื่องกับหน้าเว็บ
const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-noto-thai",
  display: "swap",
});

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  // htmlProps = ช่องทางเดียวที่ RootLayout เปิดให้ยัด attribute ลง <html>
  // ต้องใส่ที่ <html> เพราะ custom.scss อ่าน --font-noto-thai จาก :root
  <RootLayout
    config={config}
    htmlProps={{ className: notoThai.variable }}
    importMap={importMap}
    serverFunction={serverFunction}
  >
    {children}
  </RootLayout>
);

export default Layout;
