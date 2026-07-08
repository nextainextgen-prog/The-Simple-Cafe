# 📄 Brief: ยกระดับเว็บ "The Simple Cafe" เป็นระบบ CMS + สั่งซื้อออนไลน์

> เอกสารนี้ใช้เป็น prompt/brief ส่งให้ AI Agent (หรือทีมพัฒนา) ไปสร้างฟีเจอร์เพิ่ม
> เป้าหมายหลัก: ให้เจ้าของร้าน (ไม่เขียนโค้ด) จัดการเนื้อหา/รูป/สินค้า/ออเดอร์ได้เองผ่านหลังบ้าน

---

## 0) บริบทโปรเจกต์ (อ่านก่อนเริ่มงาน — สำคัญ)

- เว็บที่มีอยู่แล้วเป็น **Next.js 16.2.10 (App Router, Turbopack) + React 19 + Tailwind v4 + TypeScript + motion + lucide-react** deploy บน **Vercel**
- ⚠️ **Next.js เวอร์ชันนี้มี breaking changes จากที่คุณอาจเคยรู้** — ก่อนเขียนโค้ดต้องอ่าน docs ใน `node_modules/next/dist/docs/` และทำตาม `AGENTS.md` ของ repo
- โครงสร้างหน้าปัจจุบัน: หน้าแรก `/`, สินค้า `/products`, จัดเบรก `/catering`, รับผลิต/ส่ง `/wholesale`, เกี่ยวกับเรา `/about`, ติดต่อ `/contact`
- ตอนนี้เนื้อหา **hardcode** อยู่ใน `lib/products.ts`, `lib/site.ts` และใน component ต่างๆ / รูปภาพเป็น component `ImagePlaceholder` ("รอใส่ภาพ") รอต่อข้อมูลจริง
- มี design system อยู่แล้ว (สี/ฟอนต์/component: `Art`, `Badge`, `Reveal`, `ImagePlaceholder`, `BreadDecor`) → **ต้องรักษาหน้าตา/แบรนด์เดิมไว้ อย่ารื้อดีไซน์**
- **เป้าหมายรวม:** ให้เจ้าของร้าน (ไม่เขียนโค้ด) แก้ข้อความ/รูป/สินค้า/ราคา และจัดการออเดอร์ได้เองผ่านหลังบ้าน โดยไม่ต้องแตะโค้ด

---

## 1) เป้าหมายหลัก 4 ข้อ

1. **ระบบจัดการเนื้อหา (CMS/หลังบ้าน)** — แก้ได้ทุกอย่าง: เพิ่ม/แก้รูป, แก้ข้อความ-รายละเอียด-ข้อมูลทุกหน้า, จัดการเองไม่ต้องแก้โค้ด
2. **การ์ด "สิ่งที่เราทำ"** — กดเปิดหน้ารายละเอียดเพิ่มเติมได้, รองรับ SEO, เพิ่ม/แก้เนื้อหาเองผ่านหลังบ้าน
3. **หน้าสั่งซื้อออนไลน์** — สั่งซื้อออนไลน์ได้ + ระบบจัดการคำสั่งซื้อหลังบ้าน (ตรวจสอบสถานะ/จัดการออเดอร์) + **แจ้งเตือนออเดอร์ผ่าน LINE**
4. **รีวิวลูกค้า** — ดึงรีวิวจาก **Google Reviews** + อัปโหลดโลโก้/รูปแบรนด์ลูกค้าที่เคยใช้บริการผ่านหลังบ้าน

---

## 2) Stack & สถาปัตยกรรมที่แนะนำ (ปรับได้ แต่ต้องอยู่บน Vercel ได้)

- **Headless CMS + Admin:** แนะนำ **Payload CMS 3** (native Next.js, ฝัง admin ที่ `/admin` ในโปรเจกต์เดียวกัน, TypeScript, สิทธิ์ผู้ใช้, อัปโหลดสื่อ, rich text, draft/publish, versioning) — ทางเลือก: Sanity หรือ Strapi ถ้าต้องการแยก service
- **Database:** **Neon Postgres** ผ่าน Vercel Marketplace (serverless) — ทางเลือก: **Supabase** (ดูหัวข้อ 2.1)
- **ที่เก็บรูป/ไฟล์:** **Vercel Blob** (รองรับ public/private) — ใช้ `next/image` แสดงผล
- **Auth หลังบ้าน:** ระบบ auth ของ Payload หรือ Clerk (Marketplace) — role: `admin`, `editor`
- **Cron/งานเบื้องหลัง:** Vercel Cron (เช่น sync Google Reviews วันละครั้ง)
- **จัดการ env:** ใช้ `vercel env` / OIDC — **ห้าม hardcode secret/key ในโค้ด**
- คงการ deploy แบบ Fluid Compute (ค่าเริ่มต้น), ใช้ ISR/Cache Components สำหรับหน้า public เพื่อความเร็ว

### 2.1 เรื่องฐานข้อมูล — ต้องใช้ Supabase ไหม?

**ไม่จำเป็นต้องเป็น Supabase** — สิ่งที่ "ต้องมี" จริงๆ คือ 3 อย่าง: (1) ฐานข้อมูล (Postgres) (2) ที่เก็บไฟล์ (3) auth หลังบ้าน
Supabase แค่รวม 3 อย่างนี้ไว้ในเจ้าเดียว จึงเป็น *ตัวเลือกหนึ่ง* ไม่ใช่ข้อบังคับ

| แนวทาง | DB | Storage | Auth | เหมาะเมื่อ |
|---|---|---|---|---|
| **Payload + Neon + Vercel Blob** (แนะนำ) | Neon Postgres | Vercel Blob | Payload จัดการเอง | อยากอยู่บน Vercel ล้วน บิลรวมที่เดียว |
| **Supabase (all-in-one)** | Supabase Postgres | Supabase Storage | Supabase Auth | อยากได้ครบเจ้าเดียว หรือจะเขียน admin เอง |
| **ผสม** — Payload + Supabase | Supabase | Supabase/Blob | Payload | มี Supabase อยู่แล้วอยากใช้ต่อ |

- ถ้าใช้ **Payload CMS** → มี auth + admin ในตัวแล้ว การใช้ Supabase Auth จะซ้ำซ้อน เหลือแค่ต้องมี Postgres + storage
- ถ้าจะ **เขียนหลังบ้านเองจากศูนย์** → Supabase คุ้ม เพราะได้ auth/storage/db ครบในตัว
- **Postgres คือหัวใจร่วมของทุกแนวทาง** ต่างกันแค่จะเอา storage/auth จากใคร

---

## 3) รายละเอียดฟีเจอร์ (spec + acceptance criteria)

### 3.1 CMS หลังบ้าน (แก้ได้ทุกหน้า)

สร้าง collections/globals ให้ครอบคลุมเนื้อหาที่ตอนนี้ hardcode:

- **Global – SiteSettings:** ชื่อแบรนด์, โลโก้, ข้อมูลติดต่อ (ที่อยู่/โทร/LINE ID/อีเมล/เวลาทำการ), ลิงก์ LINE, ข้อความ marquee (แถบวิ่ง), เมนู nav, footer, สถิติ (6+ ปี / 60+ ลูกค้า ฯลฯ)
- **Collection – Products:** ชื่อ, รูป (หลายรูป), ราคา (optional = "สอบถามราคา"), หมวด (เค้ก/คัพเค้ก/ขนมปัง/ครัวซองต์/คุกกี้/อื่นๆ — แก้/เพิ่มหมวดได้), badge (ขายดี/ใหม่), เกรด, คำอธิบาย, สถานะแสดง/ซ่อน, ลำดับ
- **Collection – WhatWeDo (สิ่งที่เราทำ):** หัวข้อ, สรุปสั้น, รูป/ไอคอน, **เนื้อหารายละเอียด (rich text)**, slug, ฟิลด์ SEO
- **Collection – CateringPackages** + **MenuItems** (กลุ่มเบเกอรี่/เครื่องดื่ม): แก้ชื่อ/ราคา/รูป/รายการได้
- **Collection – Reviews** และ **ClientLogos**
- **Collection – Pages/Sections** สำหรับ About (Brand Story/กระบวนการผลิต/มาตรฐาน), Hero, CTA ต่างๆ
- **Media library** (Vercel Blob / Supabase Storage) + **Users/Roles**
- ต้องมี: อัปโหลด/ครอปรูป, rich text, draft & publish, ประวัติเวอร์ชัน, ค้นหา, จัดลำดับ (drag)
- **งาน migration:** ย้ายข้อมูลที่ hardcode ทั้งหมดเข้า CMS แล้วแก้หน้า public ให้ดึงจาก CMS (มี seed script ข้อมูลปัจจุบันเป็นค่าเริ่มต้น)
- ✅ *เกณฑ์ผ่าน:* เจ้าของแก้ข้อความ/รูป/สินค้า/ราคาในหลังบ้านแล้วหน้าเว็บอัปเดตได้เอง โดยไม่แตะโค้ด

### 3.2 การ์ด "สิ่งที่เราทำ" → หน้ารายละเอียด + SEO

- ทำ dynamic route `/what-we-do/[slug]` ดึงจาก CMS
- การ์ดในหน้าแรกกดแล้วลิงก์เข้าหน้ารายละเอียด (รักษาแอนิเมชัน/สไตล์การ์ดเดิม)
- ใส่ `generateMetadata` (title/description/OG), JSON-LD (`Service`/`Article`), breadcrumb, canonical
- แก้เนื้อหา/เพิ่มการ์ดใหม่ได้จากหลังบ้าน
- ✅ *เกณฑ์ผ่าน:* เพิ่มการ์ดใหม่ในหลังบ้าน → มีหน้า detail + sitemap + meta ครบอัตโนมัติ

### 3.3 สั่งซื้อออนไลน์ + จัดการออเดอร์หลังบ้าน

- **หน้าร้าน:** ตะกร้าสินค้า (cart), เลือกจำนวน, หน้า checkout (ชื่อ/เบอร์/ที่อยู่จัดส่ง/วันรับ/หมายเหตุ), กติกาขั้นต่ำ (เช่นจัดเบรกขั้นต่ำ 20 ท่าน), คำนวณค่าส่งตามโซน
- **การชำระเงิน:** เชื่อม **payment provider ที่รองรับไทย** เช่น Omise / 2C2P / Stripe + **PromptPay QR** — ⚠️ ใช้ระบบของผู้ให้บริการ (PCI-DSS) **ห้ามเก็บเลขบัตรเอง**, รองรับ "โอนแล้วแนบสลิป" เป็นทางเลือก
- **Orders model:** เลขออเดอร์, รายการ, ยอดรวม, สถานะ (`รอชำระ → ชำระแล้ว → กำลังเตรียม → จัดส่ง → สำเร็จ → ยกเลิก`), ข้อมูลลูกค้า, ช่องทางชำระ, timestamps
- **หลังบ้าน:** รายการออเดอร์ + ฟิลเตอร์/ค้นหา, เปลี่ยนสถานะ, ดูรายละเอียด, export CSV, dashboard ยอดขายเบื้องต้น
- ✅ *เกณฑ์ผ่าน:* ลูกค้าสั่งซื้อจนจบ flow, ออเดอร์เข้า admin, เปลี่ยนสถานะได้
- ⚠️ ต้องทำตาม **PDPA** (เก็บข้อมูลส่วนบุคคลเท่าที่จำเป็น, มี privacy policy, consent)

### 3.4 แจ้งเตือนออเดอร์ผ่าน LINE

- ใช้ **LINE Messaging API** (หมายเหตุ: **LINE Notify ปิดบริการแล้ว** อย่าใช้)
- เมื่อมีออเดอร์ใหม่/เปลี่ยนสถานะ → push แจ้งร้าน (LINE Official Account / กลุ่มแอดมิน)
- (option) แจ้งลูกค้าผ่าน LINE ถ้าล็อกอินด้วย LINE Login
- ทำเป็น webhook/route handler + retry เมื่อส่งไม่สำเร็จ, เก็บ credential ใน env
- ✅ *เกณฑ์ผ่าน:* สั่งซื้อ 1 ครั้ง → ร้านได้ข้อความ LINE ภายในไม่กี่วินาที

### 3.5 รีวิว Google + โลโก้ลูกค้า

- ดึงรีวิวจาก **Google Places API (Place Details → reviews)** ด้วย Place ID ของร้าน
- ⚠️ Places API คืนรีวิวได้จำกัด (~5 รายการ) → **cache ลง DB ผ่าน Vercel Cron วันละครั้ง** เพื่อลดโควตา/ค่าใช้จ่าย และให้แสดงเร็ว
- แสดงคะแนนเฉลี่ย + รีวิว, ใส่ JSON-LD `AggregateRating`/`Review`
- **โลโก้ลูกค้า:** อัปโหลดผ่านหลังบ้าน (ClientLogos) → แทนที่ placeholder "โลโก้ลูกค้า" ในหน้าแรก/wholesale
- ✅ *เกณฑ์ผ่าน:* รีวิวจริงแสดงอัตโนมัติ + แอดมินอัปโหลดโลโก้ได้

---

## 4) SEO (ทำทั้งเว็บ)

- ใช้ Next.js **Metadata API** + `generateMetadata` ทุกหน้า (title/description/canonical/OG/Twitter)
- **`sitemap.ts` แบบ dynamic** (รวมสินค้า/หน้า what-we-do), **`robots.ts`**
- **JSON-LD structured data:** `LocalBusiness`/`Bakery` (ที่อยู่/เวลาทำการ/พิกัด), `Product`, `Review`+`AggregateRating`, `BreadcrumbList`
- OG image อัตโนมัติ (ImageResponse), `lang="th"`, heading hierarchy, alt ครบ, internal linking
- performance: Core Web Vitals, `next/image`, ISR/cache, ลด JS

---

## 5) Non-functional / คุณภาพงาน

- **Responsive** ทุกอุปกรณ์ + **Accessibility** (WCAG AA: คอนทราสต์/คีย์บอร์ด/aria)
- ภาษาไทยเป็นหลัก (เผื่อ i18n ไทย/อังกฤษในอนาคต), ฟอร์แมตราคา/วันที่แบบไทย
- **Security:** validate ทุก input, rate limit, CSRF, ป้องกัน admin ด้วย auth, ใช้ Vercel WAF/BotID กับ endpoint สั่งซื้อ
- backup DB, error monitoring (เช่น Sentry), logging
- เขียนโค้ดสไตล์เดียวกับ repo เดิม, มี type ครบ, ไม่พังหน้าเดิม

---

## 6) เฟสการส่งงาน (ทำทีละเฟส ให้รีวิวได้)

- **Phase 1:** ตั้ง CMS (Payload) + DB + Storage + auth → migrate เนื้อหาปัจจุบันเข้า CMS + ต่อหน้า public ให้ดึงจาก CMS
- **Phase 2:** การ์ด "สิ่งที่เราทำ" → หน้า detail + SEO/sitemap/JSON-LD ทั้งเว็บ
- **Phase 3:** รีวิว Google (cron cache) + อัปโหลดโลโก้ลูกค้า
- **Phase 4:** ตะกร้า/checkout/ชำระเงิน + จัดการออเดอร์หลังบ้าน + แจ้งเตือน LINE
- แต่ละเฟส: PR แยก, มี migration/seed, README วิธีตั้งค่า env, และวิธีทดสอบ

---

## 7) สิ่งที่ต้องขอจากเจ้าของร้านก่อน (ให้ agent ถาม/รอข้อมูลนี้)

- Google **Place ID** + Google Maps/Places **API key**
- **LINE**: Messaging API channel (Channel access token / secret) ของ LINE OA
- **Payment provider** ที่จะใช้ + คีย์ทดสอบ (Omise/2C2P/Stripe) และต้องการ PromptPay ไหม
- **โซน/ค่าจัดส่ง** และกติกาขั้นต่ำการสั่ง
- โดเมนจริง (สำหรับ SEO/OG/sitemap)

---

## หมายเหตุสำคัญ

- ส่วน **การชำระเงิน** ให้เชื่อมผ่านผู้ให้บริการที่ได้มาตรฐาน (ห้ามเก็บข้อมูลบัตรเอง) และเจ้าของต้องเป็นคนกรอก/ยืนยัน credential การเงินเอง
- จงใจให้ทำ **CMS ก่อน แล้วค่อยทำระบบสั่งซื้อ** เพราะระบบขายพึ่งข้อมูลสินค้าใน CMS อยู่แล้ว จะได้ไม่ต้องรื้อซ้ำ
