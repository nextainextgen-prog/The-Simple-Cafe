"use client";

import { RefreshRouteOnSave as PayloadRefresh } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3002";

// อยู่ในหน้าเว็บจริง — เมื่อแอดมิน save ใน Live Preview จะสั่ง router.refresh()
// ให้หน้าดึงเนื้อหาใหม่จาก CMS ทันที (แก้หลังบ้าน → เห็นผลสดข้างๆ)
//
// ต้องเรนเดอร์เฉพาะตอนอยู่ใน iframe ของ Live Preview เท่านั้น:
// RefreshRouteOnSave ยิง refresh() ทิ้งไว้ตั้งแต่ mount โดยไม่สนว่าอยู่ใน iframe ไหม
// (ดู node_modules/@payloadcms/live-preview-react/dist/RefreshRouteOnSave.js)
// ถ้าปล่อยให้เรนเดอร์ทุกหน้า ลูกค้าจริงทุกคนจะโดน router.refresh() ฟรี 1 รอบต่อการเปิดเว็บ
//
// useSyncExternalStore ไม่ใช่ useEffect+setState เพราะค่านี้ไม่เคยเปลี่ยนหลัง mount
// (subscribe คืน no-op) — ได้ค่า false ตอน SSR, true/false ตอน hydrate จบ ในสเต็ปเดียว
const subscribe = () => () => {};
const isInIframe = () => window.self !== window.top;
const isInIframeOnServer = () => false;

export function LivePreviewRefresh() {
  const router = useRouter();
  const inPreviewFrame = useSyncExternalStore(subscribe, isInIframe, isInIframeOnServer);

  if (!inPreviewFrame) return null;

  return <PayloadRefresh refresh={() => router.refresh()} serverURL={SERVER_URL} />;
}
