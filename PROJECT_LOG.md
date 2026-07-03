# PROJECT LOG — Simple Cafe Website

> สมุดบันทึกการตัดสินใจของโปรเจกต์ — จดทุกอย่างที่ตกลงกันไว้ที่นี่
> เปิด session ใหม่ให้อ่านไฟล์นี้ก่อนเสมอ จะได้งานต่อเนื่อง ไม่หลงทาง
> จดจากใหม่สุดไว้บนสุด

---

## 3 ก.ค. 2026 (2) — Scaffold เว็บจริง + หน้าแรกเสร็จ

**เคาะแล้ว:**
- เริ่มโค้ดเว็บจริง (ข้าม prototype — prototype เก็บเป็น reference)
- ฟอนต์ = Olimpico (heading) + Arrière Garde (accent) + Longhand LP Bold (ลายมือ) + Noto Sans Thai (ไทย/body) — "ใช้ 4 ตัวนี้เท่านั้น"
  - Noto Sans Thai ฟรีแล้ว, อีก 3 ตัวรอไฟล์ .woff2 วางใน `public/fonts/` (ดู README ในนั้น) ระหว่างรอ fallback = Noto

**ทำไปแล้ว:**
- Scaffold Next.js 16 + React 19 + Tailwind v4 + TS + lucide-react + motion
- Design system สีแบรนด์เป็น token: cream/surface/soft/brand/brand-deep/ink/ink-soft/gold/gold-bright/line
  - หมายเหตุ: ชื่อ token `base` ชนกับ `text-base` (font-size) ของ Tailwind → ใช้ชื่อ `cream` แทน
- มาสคอต 27 ไฟล์ → `public/mascot` + `public/icons` (resize 5000→1400px), ตั้งชื่อสื่อความหมายตาม MASCOT_MAP
- Components: SiteHeader (sticky + mobile menu + LINE), SiteFooter (+floating LINE มือถือ), Button (pill hover-invert), Badge (typewriter stamp), Reveal (motion — มีโหมด `now` สำหรับ above-fold), Art (next/image wrapper)
- lib/site.ts (nav/brand/stats), lib/products.ts (typed เผื่อต่อ DB)
- **หน้าแรกเสร็จครบ 8 section**: hero / trust strip / what-we-do / featured / why / social proof / catering preview / CTA band
- รันจริง localhost:3000 → สวย สีถูก มาสคอตขึ้นครบ ตัวอักษรครีมบนพื้นเขียวถูกต้อง

**อัปเดต — ครบทุกหน้าแล้ว:** products / catering (แพ็กเกจ+เมนู+accordion+CTA 3 ทาง) / wholesale (who-we-serve+catalog ไม่โชว์ราคา+OEM steps+ฟอร์มขอใบเสนอราคา) / about (story+process+standards) / contact (info+ฟอร์ม+map) / 404 (มาสคอต)
- Components เพิ่ม: PageHero, ImagePlaceholder, Accordion, QuoteForm, ContactForm, ProductGrid (filter)
- **build production ผ่าน + TypeScript ผ่าน + ทุกหน้า static prerender (9 หน้า)** กดได้ทุกหน้า

**ค้าง / ต่อไป (รอลูกค้า):**
- ไฟล์ฟอนต์ 3 ตัว (Olimpico / Arrière Garde / Longhand LP) → วางใน public/fonts/
- ข้อมูลจริง + รูปถ่ายสินค้า/ร้าน/จัดเบรก + contact/LINE จริง → เติมแทน placeholder
- ปลายทางฟอร์ม (email/LINE/Sheet) ตอนพร้อมใช้จริง
- ยังไม่ deploy (รอพี่โด้สั่ง)
- **Git remote: https://github.com/nextainextgen-prog/The-Simple-Cafe.git** (ยังไม่ได้ set remote / push — รอพี่โด้สั่ง)

---

## 3 ก.ค. 2026 — ได้สีแบรนด์จริง + reference เว็บ + เริ่มวางแผนดีไซน์

### สีแบรนด์จริง (The Simple — จากพี่โด้)
Primary:
- Verdant Views (เขียวมะกอก) = #737C49
- Magnolia (ครีมนวล) = #FFFAE3
Secondary:
- Tropical Moss (ทองมัสตาร์ด) = #D0C077
- Green Tone (เขียวเข้ม) = #44553C
Extended palette:
- #FFFCF0 (ขาวครีมอ่อนสุด), #F3DED7 (ชมพูบลัช), #EACD71 (ทองสด),
  #2E3F26 (เขียวเข้มมาก/near-black), #E4D4A6 (แทน/เบจ), #5B4528 (น้ำตาลอบ)

### มาสคอต "น้องโดว์" (ได้ asset จริง 27 ไฟล์)
- อยู่ที่ `~/Desktop/The Simple - Drive Images/` — สีเต็ม 14, Secret 3, Outline 10
- แผนผังวางมาสคอตแต่ละหน้า = `docs/MASCOT_MAP.md`
- prototype ทำเสร็จใน Claude Design แล้ว (Simple Cafe.dc.html, 6 หน้า)
- ต้องเคลียร์: ไอคอนสินค้า outline มีแค่ 2 (croissant/loaf), Outline-07 พื้นดำ, อยากได้ SVG ต้นฉบับ

### Reference ที่ลูกค้าอยากได้ (ผสม 2 สไตล์)
- https://brookibakehouse.com/ (bold/playful/warm — viral bakery)
- https://levainbakery.com/pages/our-cookies (clean/editorial/premium cookie close-up)
- โจทย์: ผสม 2 สไตล์เข้าด้วยกัน ให้ออกมามินิมอลพรีเมียมแต่มีความอบอุ่นน่ากิน
- แผนดีไซน์เต็ม = `docs/DESIGN_PLAN.md`

---

## 2 ก.ค. 2026 — เคาะ Sitemap + ทำ Client Brief

- พี่โด้วางโครงสร้างเว็บมาเอง (ตรงกับ research): Home / Products / Catering / B2B-Wholesale / About / Contact
- โครง section แต่ละหน้าเคาะแล้ว (ดู `docs/SITEMAP.md` ถ้าจะทำต่อ) — ยึดตามที่พี่โด้ส่ง
- ทำเช็กลิสต์ข้อมูล/แอสเซ็ตที่ต้องขอเจ้าของธุรกิจ = `docs/CLIENT_BRIEF.md` (ส่งต่อผู้จ้างได้เลย)
- research เต็ม = `docs/RESEARCH_UX.md`
- กฎราคาที่ยึด: หน้า B2B ไม่โชว์ราคา (ใช้ปุ่มขอใบเสนอราคา) / หน้า Catering โชว์ราคาได้
- ขั้นต่อไป: รอเจ้าของส่งของกลุ่ม A (โลโก้+สี) + รูปสินค้า แล้วเริ่ม scaffold Next.js

---

## 2 ก.ค. 2026 — Kickoff + เคาะสโคปรอบแรก

### เจ้าของงาน / วิธีทำงาน (ตกลงแล้ว)
- เจ้าของงาน: **พี่โด้**
- โทนคุย: Gen Z เป็นกันเอง ไม่อัดศัพท์เทคนิค
- ดีไซน์: มินิมอล โมเดิร์น ระดับบริษัทใหญ่ — **ห้ามอิโมจิ ใช้ไอคอนเท่านั้น**
- Workflow: คอมมิตเป็นก้อนๆ ทุกครั้งที่เสร็จ **ห้าม deploy จนพี่โด้สั่ง**
- เขียนโค้ดเสร็จทุกครั้ง = สรุป (ทำอะไร / หน้าไหน / ใช้ตรงไหน / ต่อไปทำอะไร)

### เคาะแล้ว (รอบนี้)

**1. เป้าหมายเว็บ (ตัวตนของแบรนด์บนเว็บ)**
- เป็นเว็บที่สื่อว่าเป็น "ทั้งคาเฟ่" แต่ **เน้นหนักที่งานเบเกอรี่รับผลิต (B2B)** เป็นพระเอก
- หัวใจของเว็บ = **โชว์โปรดักส์** ให้น่ากิน ดูพรีเมียม น่าเชื่อถือ

**2. Simple Cafe x MADE CAKE**
- ความสัมพันธ์ = **ซัพพลายเออร์**
- ตีความปัจจุบัน: Simple Cafe อยู่ในสายการรับผลิต/ซัพพลายเบเกอรี่ (B2B)
- > ยังต้องเคลียร์ให้ชัด 100%: ใครซัพพลายให้ใคร และ MADE CAKE จะโผล่บนเว็บไหม
    (โลโก้/ชื่อ/เครดิต) — รอแบรนด์ไกด์จากพี่โด้แล้วค่อยล็อก

**3. สโคปเว็บ**
- **เฟสแรก = แบบ A**: เว็บโปรไฟล์ + แคตตาล็อกสินค้า + ฟอร์มติดต่อ/ขอใบเสนอราคา (static, ไม่มี database)
- **SEO = สำคัญ** ทำโครงสร้างรองรับตั้งแต่แรก (โฟกัสค้นหาในพื้นที่ขอนแก่น + B2B)
- **อนาคต = แบบ B**: ระบบสั่งของออนไลน์ / ตะกร้า / ติดตามออเดอร์
- > ดังนั้นสถาปัตยกรรมต้อง "เผื่อ B ไว้" ตั้งแต่วันแรก (โครงสร้างข้อมูลสินค้าแยกชัด, พร้อมต่อ backend+DB ทีหลังโดยไม่ต้องรื้อ)

**4. Tech Stack — พี่โด้ให้เลือก "อันที่ดีและนิยมที่สุด" → เคาะเป็น:**
| ส่วน | เลือกใช้ |
|------|----------|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Icons | lucide-react |
| Fonts | IBM Plex Sans Thai (ไทยหลัก) — ปรับได้เมื่อได้แบรนด์ไกด์ |
| Hosting | Vercel |
| DB (เฟส B ในอนาคต) | PostgreSQL + Prisma (ยังไม่ติดตั้งตอนนี้) |

**5. แบรนด์ / โทนสี / โลโก้**
- **ยังไม่มี** — พี่โด้จะส่งให้ภายหลัง (มีเดี๋ยวส่งให้)
- ระหว่างรอ: ใช้ระบบสีชั่วคราวโทนคาเฟ่อุ่น (ครีม/ขาวนวล + เทาถ่าน + accent น้ำตาลอบขนม) วางเป็น CSS variable ไว้ พอได้แบรนด์ไกด์แล้วเปลี่ยนที่เดียวจบ

### ค้างอยู่ / รอพี่โด้
- [ ] แบรนด์ไกด์ + โลโก้ + โทนสีจริง
- [ ] เคลียร์ความสัมพันธ์ Simple Cafe / MADE CAKE ให้ชัด (จะแสดงบนเว็บยังไง)
- [ ] รายการสินค้าจริง + รูปโปรดักส์คุณภาพสูง (หัวใจของเว็บ)
- [ ] ข้อมูลติดต่อจริง (เบอร์ / LINE / ที่อยู่ / พื้นที่ส่ง / เวลาทำการ)

### ขั้นต่อไป (แผนงาน — ยังไม่เริ่มจนพี่โด้ไฟเขียว)
1. Scaffold โปรเจกต์ Next.js + Tailwind + shadcn/ui + lucide-react
2. วาง Design System ชั่วคราว (สี/ฟอนต์/spacing เป็น token) + layout หลัก (nav + footer)
3. หน้าแรก (hero โชว์เบเกอรี่ + จุดขาย + CTA ขอใบเสนอราคา)
4. หน้าแคตตาล็อกสินค้า (โครงสร้างข้อมูลเผื่อต่อ DB เฟส B)
5. หน้าบริการรับผลิต/จัดเบรก + เกี่ยวกับเรา + ติดต่อ
6. ใส่ SEO foundation (metadata, sitemap, structured data, local SEO)
