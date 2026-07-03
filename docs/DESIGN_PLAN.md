# Design Plan — Simple Cafe Website

> แผนออกแบบ + เครื่องมือ (tech stack) ฉบับละเอียด
> อ้างอิง: teardown เว็บ Brooki Bakehouse + Levain Bakery (ดึงค่าสี/ฟอนต์จริงจากซอร์ส) + สีแบรนด์จริง The Simple + research UX (`RESEARCH_UX.md`)
> วันที่: 3 ก.ค. 2026

---

## 0. สรุปทิศทาง (ถ้าอ่านแค่ย่อหน้าเดียว)

เว็บ Simple Cafe = **"warm craft bakery ระดับพรีเมียม"** — เอา**โครงเล่าเรื่องแบบ landing page ของ Brooki** มาเป็นโครงหน้า + ใส่**ดีเทลคราฟต์ของ Levain** (label เครื่องพิมพ์ดีด, badge หลากสี, hover ภาพมีชีวิต, จับคู่ฟอนต์ editorial) + คุมด้วย**พาเลตสีแบรนด์จริง** (เขียวมะกอก + ครีม + ทองมัสตาร์ด + เขียวเข้ม) ที่อบอุ่นน่ากินแต่ดูแพงและสะอาด mobile-first

---

## 1. วิเคราะห์ 2 เว็บอ้างอิง — หยิบอะไรมาบ้าง

### Brooki Bakehouse (brookibakehouse.com) — เอา "โครง + บุคลิก"
| องค์ประกอบ | ของเขา | หยิบมาใช้กับเรา |
|---|---|---|
| โครงหน้าแรก | สลับ product grid กับ story/press/locations เป็นจังหวะ เล่าแบรนด์+ขายของในหน้าเดียว | ใช้เป็นโครงหน้าแรก Simple Cafe |
| Navigation | คิดตาม use-case จริง (Delivery / Pick Up / Corporate) ก่อนประเภทสินค้า | เราแยกตามสายธุรกิจ (ปลีก / จัดเบรก / B2B) |
| ปุ่ม | pill-shape (radius 2.4rem) ดำ-ขาว hover invert | เอามาทำปุ่มหลัก แต่ใช้สีแบรนด์ |
| การ์ดสินค้า | hover สลับภาพ 2 รูป (image-swap) | เอามาใช้ตรงๆ |
| Social proof | review widget (ดาว+จำนวน+Verified) วางตั้งแต่ต้นหน้า + press logo strip | เอามาทั้งคู่ |
| Typography | DM Sans ตัวเดียวทั้งเว็บ, heading letter-spacing แน่น, เล่น lowercase ตัดกับ ALL-CAPS | ยืมหลักการ + เพิ่มมิติแบบ Levain |
| สี | ครีม+ชมพูนุ่มเป็นฐาน, ดำเป็น text, แดง+teal เป็น pop | เราแทนด้วยพาเลตแบรนด์ตัวเอง |

### Levain Bakery (levainbakery.com) — เอา "ดีเทลพรีเมียม-คราฟต์"
| องค์ประกอบ | ของเขา | หยิบมาใช้กับเรา |
|---|---|---|
| Brand anchor สี | น้ำเงินกล่อง #000096 ผูกกับ packaging จริง จำได้ทันที | เราใช้ **เขียวมะกอก #737C49** เป็น anchor |
| Label/badge | typewriter mono เอียง -4deg เหมือนสติกเกอร์แปะมือ | เอามาทำ badge ราคา/หมวด/Best Seller |
| Badge system | หลายสี แต่ละสีมี bg/fg/border ของตัวเอง | ทำเป็น token จากพาเลตแบรนด์ |
| Product hover | static → animated GIF (สื่อ gooey/fresh) | เฟสแรกใช้ image-swap, เฟสหลังเสริม GIF |
| Photography | close-up cross-section โชว์เนื้อ + packaging + ribbon | สั่งถ่ายสินค้าแนวนี้ (ครัวซองต์ผ่าครึ่ง/ซาวโดว์เนื้อใน) |
| โครงหน้า catalog | long-scroll แบ่ง section มี label ชัด จัดกลุ่มตาม intent | ใช้กับหน้าสินค้า/แคตตาล็อก |
| Typography | จับคู่ 3 ฟอนต์: display + sans body + mono accent | เป็นสูตรที่เราจะทำ (เวอร์ชันรองรับไทย) |
| Copywriting | อบอุ่น เล่าเรื่อง มี heritage ("the cookie that started it all") | เขียนเสียงแบรนด์เราเอง |

### จุดที่ 2 เว็บเหมือนกัน (= ของชัวร์ ทำตาม)
- ฐานพื้นสว่าง (ขาว/ครีม) + accent เป็นจุดๆ ไม่เทสีทั้งหน้า
- ภาพสินค้าคุณภาพสูงเป็นพระเอก, hover ให้ภาพมีชีวิต
- storefront ที่เล่าแบรนด์ ไม่ใช่แค่ตะกร้าสินค้า
- social proof (รีวิว + press) วางเด่น
- ปุ่มมุมมน, section คั่นด้วย whitespace + สลับสีพื้น ไม่ใช้เส้นหนัก

---

## 2. Design System

### 2.1 สี (จากแบรนด์จริง → semantic token)

พาเลตแบรนด์:
| ชื่อ | HEX | บทบาทบนเว็บ |
|---|---|---|
| Verdant Views (เขียวมะกอก) | `#737C49` | **brand primary** — โลโก้, ลิงก์, จุดเน้นหลัก |
| Green Tone (เขียวเข้ม) | `#44553C` | ปุ่มหลัก, heading เข้ม, footer |
| เขียวเข้มมาก | `#2E3F26` | **text หลัก** (แทนดำล้วน ให้อบอุ่นกว่า) |
| Magnolia (ครีมนวล) | `#FFFAE3` | **พื้นหลังหลักของเว็บ** |
| ครีมอ่อนสุด | `#FFFCF0` | พื้น card / surface |
| Tropical Moss (ทองมัสตาร์ด) | `#D0C077` | **accent** — badge, ปุ่มรอง, ไฮไลต์ |
| ทองสด | `#EACD71` | badge "Best Seller", hover ทอง |
| ชมพูบลัช | `#F3DED7` | พื้น section สลับ (โซนหวานๆ) |
| แทน/เบจ | `#E4D4A6` | เส้นแบ่ง / border อุ่น |
| น้ำตาลอบ | `#5B4528` | text รอง, ดีเทลคราฟต์ |

Semantic tokens (จะเซ็ตเป็น CSS variable + Tailwind theme):
```
--bg-base:        #FFFAE3   (Magnolia)   พื้นเว็บ
--bg-surface:     #FFFCF0                card/กล่อง
--bg-soft:        #F3DED7                section สลับ (บลัช)
--brand:          #737C49   (olive)      primary
--brand-deep:     #44553C   (green)      ปุ่มหลัก/เข้ม
--text:           #2E3F26                ตัวอักษรหลัก
--text-muted:     #5B4528                ตัวอักษรรอง
--accent:         #D0C077   (gold)       ไฮไลต์/badge
--accent-bright:  #EACD71                badge เด่น
--border:         #E4D4A6                เส้น/ขอบ
```

CTA เชิงกลยุทธ์:
- **ปุ่มหลัก:** พื้น `--brand-deep` (#44553C) + ตัวอักษรครีม → hover invert เป็นพื้นครีม ตัวอักษรเขียว (แบบ Brooki)
- **ปุ่มรอง:** เส้นขอบเขียว พื้นโปร่ง
- **ทอง = ไฮไลต์เท่านั้น** (badge, ราคา, underline) อย่าใช้เป็นพื้นใหญ่ จะเลี่ยน

### 2.2 Typography (รองรับไทย — สำคัญสุด เพราะ reference เป็นอังกฤษหมด)

สูตร 3 ระดับแบบ Levain แต่เลือกฟอนต์ที่มีคู่ไทยสวย:

| ระดับ | อังกฤษ | ไทย | ใช้ตรงไหน |
|---|---|---|---|
| **Display / Heading** | Fraunces (serif อบอุ่น editorial) | Noto Serif Thai | พาดหัวใหญ่ hero, ชื่อ section |
| **Body** | DM Sans | IBM Plex Sans Thai | เนื้อหา, เมนู, การ์ด |
| **Label / Accent (mono)** | DM Mono | IBM Plex Sans Thai (weight เบา + letter-spacing) | badge, ราคา, หมวด, "BEST SELLER" |

> ทำไม Fraunces: เป็น serif variable ที่ให้ warmth + premium มาก นิยมมากกับแบรนด์ food/bakery ปี 2024-2026 — ได้อารมณ์ editorial แบบ Levain โดยไม่ต้องซื้อ foundry font
> ทางเลือกสำรอง (ถ้าอยากมินิมอลแบบ Brooki): ใช้ sans ตัวเดียวทั้งเว็บ = **Anuphan** หรือ **IBM Plex Sans Thai** คุมทั้ง heading+body แล้วสร้างมิติด้วยขนาด/น้ำหนัก/สีแทน
> ทุกตัวฟรีบน Google Fonts โหลดผ่าน `next/font` (เร็ว ไม่กระพริบ)

หลักการ type:
- Heading letter-spacing แน่น (-0.02em ถึง -0.03em) แบบ Brooki
- เล่น lowercase กับหัวข้อบางจุดเพื่อความเป็นกันเอง + ALL-CAPS กับ label
- ขนาด contrast สูง (hero ใหญ่มาก vs body 16-18px)

### 2.3 Spacing / Radius / Shadow
- Spacing: ยึด Tailwind scale, section padding กว้าง (whitespace เยอะ = พรีเมียม)
- Radius: card 8px (แบบ Brooki), ปุ่ม pill (เต็มโค้ง), badge 4px
- Shadow: บางมาก/แทบไม่มี — ใช้ border อุ่น (#E4D4A6) แทนเงา
- Mobile-first: ทุก component ออกแบบจอเล็กก่อน

### 2.4 Signature details (ตัวชูโรง — เอามาจาก 2 เว็บ)
1. **Typewriter badge เอียงเล็กน้อย** (mono + rotate -3deg) สำหรับ "ขายดี" / "ใหม่" / ราคา — ดีเทลคราฟต์แบบ Levain
2. **Product card hover image-swap** — ภาพหลัก ↔ ภาพที่สอง (เฟสหลังเสริม GIF)
3. **ปุ่ม pill hover-invert** — แบบ Brooki แต่สีแบรนด์
4. **Press logo strip + review widget** — social proof
5. **Section สลับพื้น** ครีม ↔ บลัช ↔ เขียวอ่อน คั่นด้วย whitespace

---

## 3. โครงแต่ละหน้า (ตาม sitemap ที่พี่โด้วาง + section ละเอียด)

### หน้าแรก (Homepage)
1. **Announcement bar** — โปรฯ/ไฮไลต์ (เช่น "ส่งขอนแก่นทุกวัน / สั่งล่วงหน้าได้")
2. **Header sticky** — โลโก้ + nav + ปุ่ม LINE เด่น + (เฟสหลัง) ตะกร้า
3. **Hero** — ภาพสินค้า/ร้านเต็มจอ + พาดหัว (Fraunces) + CTA คู่ ("ดูสินค้า" + "ขอใบเสนอราคา")
4. **Trust strip** — ไอคอนหมุน: อบสดทุกวัน / ส่งทั่วประเทศ / 6+ ปี / รับผลิต OEM
5. **What We Do** — 4 การ์ด: ผลิตเบเกอรี่ / จัดเบรก / Wholesale / คาเฟ่
6. **Featured Products** — grid การ์ด (Best Seller + New) hover image-swap + typewriter badge
7. **Why Simple Cafe** — story block ภาพใหญ่คู่ข้อความ (จุดเด่น + คราฟต์)
8. **Social Proof** — review widget (ดาว+จำนวน) + press strip + โลโก้ลูกค้าองค์กร
9. **Catering Preview** — ภาพชุดเบรก + CTA ไปหน้า Catering
10. **Newsletter/LINE CTA** — ชวนแอด LINE OA
11. **Footer** — ติดต่อ + แผนที่ย่อ + social + sitemap

### หน้าสินค้า (Products)
- Hero สั้น + **Filter bar** (เค้ก / คัพเค้ก / ขนมปัง / ครัวซองต์ / อื่นๆ) — sticky บนมือถือ
- **Product grid** การ์ด: ภาพ + ชื่อ + ราคาปลีก + badge — hover image-swap
- (ถ้าลูกค้ามีหลายเกรด) tag "มาตรฐาน / พรีเมียม" บนการ์ด
- แบ่ง section แบบ long-scroll มี label หมวด (แบบ Levain)
- CTA ท้าย: "สนใจสั่งจำนวนมาก? ขอใบเสนอราคา"

### หน้าจัดเบรก (Catering)
- **Hero** — ภาพชุดเบรก/table setting
- **Package Overview** — การ์ดแพ็กเกจ + **ช่วงราคา** (หน้านี้โชว์ราคาได้ ตาม research)
- **ตัวอย่างเมนู** — grid เบเกอรี่ + เครื่องดื่ม แยกหมวด (เช้า/ว่างบ่าย/เครื่องดื่ม)
- **เงื่อนไข** — ขั้นต่ำ / จองล่วงหน้า / พื้นที่ส่ง (accordion)
- **CTA 3 ทาง** (แบบ Flour Bakery) — โหลดเมนู PDF / ขอจัดเบรก (ฟอร์ม) / LINE

### หน้า B2B / Wholesale
- **Hero** — "รับผลิต & ส่งเบเกอรี่สำหรับธุรกิจ" + จุดขาย OEM
- **Who We Serve** — คาเฟ่ / ร้านอาหาร / โรงแรม / จัดเลี้ยง (แบบ Cake & Bacon)
- **Product Catalog Preview** — โชว์หมวดสินค้าส่ง **ไม่โชว์ราคา**
- **ข้อมูลสั่งซื้อ B2B** — MOQ / รอบส่ง / ขั้นตอน OEM
- **Social proof** — โลโก้ลูกค้าองค์กร + ตัวเลข
- **ฟอร์มขอใบเสนอราคา** — ชื่อธุรกิจ / ประเภท (dropdown) / ปริมาณ / สินค้าสนใจ / ชื่อ-เบอร์-LINE-email + "ตอบใน 2-3 วัน"

### หน้าเกี่ยวกับเรา (About)
- **Brand Story** — เล่าจุดเริ่ม (voice อบอุ่นแบบ Levain)
- **กระบวนการผลิต** — สเต็ปการอบ (ภาพเบื้องหลัง) สื่อคราฟต์
- **มาตรฐานการผลิต** — อย./GMP/HACCP (โลโก้+เลขที่)

### หน้าติดต่อ (Contact)
- ข้อมูลติดต่อ (ชื่อ/เบอร์/LINE/email/เวลาทำการ)
- แผนที่ (Google Maps embed)
- ฟอร์มติดต่อ
- ปุ่ม social / LINE เด่น

### Customer journey (เส้นทางลูกค้า)
- **ปลีก:** Home → Products → (ราคา/รายละเอียด) → LINE/สั่ง
- **จัดเบรก:** Home/Catering → ดูแพ็กเกจ+ราคา → ฟอร์ม/LINE
- **B2B:** Home → B2B → Who We Serve/Catalog → ขอใบเสนอราคา → ทีมตอบใน 2-3 วัน

---

## 4. เครื่องมือ / Tech Stack (วิเคราะห์ว่าใช้อะไร ทำไม)

| ชั้น | เครื่องมือ | ทำไมเลือก |
|---|---|---|
| **Framework** | Next.js 15 (App Router) + TypeScript | SEO ดีสุด (สำคัญกับ local search ขอนแก่น), server component เร็ว, เผื่อต่อ backend เฟส B ได้ไม่ต้องรื้อ |
| **Styling** | Tailwind CSS v4 | คุม design token/สีแบรนด์ที่เดียว, มินิมอลเร็ว, สม่ำเสมอทั้งเว็บ |
| **UI components** | shadcn/ui | component สำเร็จรูปสวยระดับโปร (accordion, dropdown, form, dialog) แก้ได้อิสระ |
| **Icons** | lucide-react | ไอคอนเส้นมินิมอล ตรงกฎ "ไม่มีอิโมจิ" |
| **Fonts** | next/font (Fraunces + DM Sans + DM Mono / Noto Serif Thai + IBM Plex Sans Thai) | โหลดเร็ว ไม่กระพริบ ฟรี รองรับไทย |
| **Motion** | Framer Motion (motion) | scroll reveal, hover, micro-interaction แบบ subtle (แบบ 2 เว็บ ref) |
| **Images** | next/image | ย่อ/เลือกไซซ์อัตโนมัติ, lazy load, รองรับ hover image-swap — ภาพคือหัวใจเว็บ |
| **Carousel** | Embla Carousel | press strip / testimonial / gallery |
| **Form** | React Hook Form + Zod | ฟอร์มขอใบเสนอราคา validate แน่น |
| **ปลายทางฟอร์ม** | Resend (email) + ผูก LINE Notify / Google Sheet | ส่งเรื่องเข้าอีเมล/LINE ทีมทันที (รอพี่โด้เคาะว่าเอาทางไหน) |
| **SEO** | Metadata API + JSON-LD (LocalBusiness/Bakery) + sitemap + robots | ดัน local search + rich result |
| **Analytics** | Vercel Analytics (+ ตัวเลือก GA4) | ดู traffic/conversion |
| **Hosting** | Vercel | deploy คลิกเดียว, preview URL ทุก push, เร็ว |
| **Data (เฟส A)** | ไฟล์ static (TS/JSON) | สินค้ายังไม่เยอะ ไม่ต้องมี DB — เผื่อย้ายเข้า CMS/DB เฟส B |
| **CMS (เฟส B — ทางเลือก)** | Sanity หรือ Payload | ให้ทีมแก้สินค้า/เนื้อหาเองได้ทีหลัง |
| **DB (เฟส B)** | PostgreSQL + Prisma | ตอนต่อระบบสั่งของ/ตะกร้า |

หลักการวางโครงข้อมูล: เก็บสินค้าเป็น typed data (`lib/products.ts`) แยก schema ชัด → เฟส B ยกเข้า DB/CMS ได้โดยไม่ต้องรื้อ UI

---

## 5. แผนงานเป็นเฟส (Roadmap)

**เฟส 0 — Setup (เริ่มได้ทันที ไม่ต้องรอลูกค้า)**
- Scaffold Next.js + Tailwind + shadcn/ui + lucide + fonts
- วาง design token (สีแบรนด์จริง) + global style
- Layout หลัก (Header sticky + Footer) + ปุ่ม/การ์ด/badge base component

**เฟส 1 — โครงหน้า + placeholder**
- ทำครบทุกหน้าตาม sitemap ด้วยเนื้อหา/รูป placeholder
- ให้พี่โด้เห็นภาพรวม + คลิกดูได้จริง

**เฟส 2 — ใส่ของจริง**
- เสียบรูปสินค้า + เนื้อหาจริงจากลูกค้า
- ฟอร์มขอใบเสนอราคา + ผูกปลายทาง (email/LINE)
- ปุ่ม LINE OA ทุกหน้า

**เฟส 3 — SEO + ขัดเงา**
- Metadata + JSON-LD + sitemap + local SEO ขอนแก่น
- Motion/micro-interaction, ตรวจ responsive, ทดสอบความเร็ว
- Google Business Profile

**เฟส B (อนาคต) — ระบบสั่งของ**
- ตะกร้า + checkout + ติดตามออเดอร์ + DB/CMS

---

## 6. สิ่งที่รอลูกค้า (ไม่บล็อกเฟส 0-1 — ใส่ placeholder ไปก่อน)
- โลโก้ไฟล์ต้นฉบับ (มีสีแบรนด์แล้ว)
- รูปสินค้ารายชิ้น + ชื่อ + แพ็กเกจ + ราคาปลีก/ส่ง
- ภาพหน้าร้าน / เบื้องหลังการอบ / งานจัดเบรก / อีเวนต์
- แพ็กเกจจัดเบรก + ราคา + เมนู + เงื่อนไขจอง
- โลโก้ลูกค้าองค์กร + testimonial
- ข้อมูลติดต่อจริง (ชื่อ/เบอร์/LINE/email/ที่อยู่)
- (ทยอยได้) OEM: MOQ/ขั้นตอน/ประเภทที่รับผลิต + ใบรับรอง อย./GMP/HACCP

---

## 7. คำถามที่อยากให้พี่โด้เคาะก่อนลงมือ
1. **ฟอนต์:** เอาสูตร 3 ระดับ (Fraunces serif heading + DM Sans body + mono label) หรือมินิมอล sans ตัวเดียว (Anuphan/IBM Plex Sans Thai)?
2. **ปลายทางฟอร์ม:** ให้ข้อความขอใบเสนอราคาส่งเข้า email / LINE / Google Sheet อันไหน?
3. **เริ่มเฟส 0 (scaffold + design system) เลยไหม** ระหว่างรอรูป/เนื้อหาจากลูกค้า?
