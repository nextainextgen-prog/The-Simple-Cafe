# Prompt สำหรับ Claude Design (Prototype) — Simple Cafe

> Project type: **Prototype** · Design system: **None** · Model: Claude Opus 4.8
> ก็อปทั้งบล็อกด้านล่างไปวางในช่อง "What will you design today?"
> หมายเหตุ: instruction เขียนอังกฤษเพื่อความแม่น แต่ UI copy ทั้งหมดเป็นภาษาไทยจริง / ภาพเว้นเป็น placeholder

---

```
Design a high-fidelity, multi-page marketing website prototype for "Simple Cafe" — a Thai artisan bakery + cafe in Khon Kaen that produces bakery goods (cakes, bread, croissants, sourdough), runs coffee-break catering, and supplies wholesale/OEM to businesses (cafes, restaurants, hotels, caterers). Audience is both B2B and retail. Style: warm, premium, minimal, editorial — a blend of Brooki Bakehouse (storytelling storefront, bold-but-friendly voice) and Levain Bakery (craft detail, editorial typography). MOBILE-FIRST and fully responsive. NO emojis anywhere — use clean line icons only. All UI text must be in THAI (copy provided below).

## DESIGN SYSTEM (use these exact values)

Colors:
- Page background (base): #FFFAE3  (warm magnolia cream)
- Card / surface: #FFFCF0
- Soft section background (alternate): #F3DED7  (blush)
- Brand primary (olive green): #737C49  — logo, links, key accents
- Brand deep (dark green): #44553C  — primary buttons, dark sections, footer
- Text primary: #2E3F26  (near-black green, use instead of pure black)
- Text muted: #5B4528  (baked brown)
- Accent (mustard gold): #D0C077  — highlights, secondary buttons
- Accent bright (gold): #EACD71  — "best seller" badge, hover gold
- Border / divider (warm): #E4D4A6

Typography:
- Headings / display: a warm editorial SERIF (e.g. Fraunces or similar), tight letter-spacing (-0.02em), large and confident. Some section titles may be lowercase for a friendly tone.
- Body: a clean modern SANS (e.g. DM Sans), 16-18px, comfortable line-height.
- Labels / badges / prices: MONOSPACE, uppercase, letter-spaced (typewriter feel).

Components & signature details:
- Buttons: pill-shaped (fully rounded). Primary = deep green #44553C bg + cream text, hover inverts to cream bg + green text. Secondary = green outline, transparent fill.
- Cards: 8px radius, thin warm border (#E4D4A6), almost no shadow (use border, not heavy shadow).
- Signature "typewriter badge": small monospace uppercase tag rotated -3deg (like a hand-stuck sticker) for "ขายดี" (best seller) / "ใหม่" (new) / prices. Use gold #EACD71 or blush #F3DED7 backgrounds.
- Generous whitespace, airy grid layouts, sections separated by alternating backgrounds (cream ↔ blush ↔ light green) — no heavy divider lines.
- Sticky header. A prominent LINE contact button in the header and floating on mobile.

## IMAGES — DO NOT use real or AI photos
For every image, render an EMPTY PLACEHOLDER box: filled with #FFFCF0 or #E4D4A6, a thin dashed warm border, a centered line-icon (image/photo icon), and a small Thai caption describing what photo goes there + its aspect ratio. Example caption style: "ภาพครัวซองต์ close-up · 4:3". This shows the client exactly where photography belongs.

## PAGES (build all as linked pages with a shared sticky header + footer)

### 1) Home (หน้าแรก)
- Announcement bar: "ส่งขอนแก่นทุกวัน · รับผลิต & จัดเบรกครบวงจร"
- Header: logo "Simple Cafe" (left) + nav [หน้าแรก · สินค้า · จัดเบรก · รับผลิต/ส่ง · เกี่ยวกับเรา · ติดต่อ] + LINE button (right).
- HERO: full-width. Left = big serif headline "เบเกอรี่อบสดใหม่ทุกวัน ส่งตรงถึงธุรกิจคุณ", sub "คราฟต์เบเกอรี่คุณภาพ รับผลิต OEM · จัดเบรก · ส่งทั่วประเทศ · ประสบการณ์กว่า 6 ปี", two buttons "ดูสินค้า" (primary) + "ขอใบเสนอราคา" (secondary). Right = large image placeholder "ภาพเบเกอรี่ signature / หน้าร้าน · 4:5".
- Trust strip: 4 line-icon items — "อบสดทุกวัน" · "ส่งทั่วประเทศ" · "ประสบการณ์ 6+ ปี" · "รับผลิต OEM".
- WHAT WE DO: 4 cards — "ผลิตเบเกอรี่" / "จัดเบรก" / "Wholesale" / "ร้านคาเฟ่", each with line-icon + short Thai text + small image placeholder.
- FEATURED PRODUCTS: section title "เมนูขายดี" + grid of 6 product cards. Each card: image placeholder (1:1, caption "ภาพสินค้า"), name (e.g. "ครัวซองต์เนยฝรั่งเศส"), typewriter price badge "฿65", and a "ขายดี"/"ใหม่" rotated badge on some.
- WHY SIMPLE CAFE: story block — left image placeholder "เบื้องหลังการอบ · 4:3", right heading "ทำไมต้อง Simple Cafe" + bullet list (อบสดใหม่ทุกวัน ไม่ใส่สารกันเสีย / รับผลิตทุกรูปแบบ OEM / ส่งทั่วประเทศ ขอนแก่นส่งทุกวัน / ลูกค้าองค์กร 60+ ราย).
- SOCIAL PROOF: star rating row "4.9 จากรีวิว 300+" + a row of 5 empty "โลโก้ลูกค้า" placeholder boxes + one testimonial quote card.
- CATERING PREVIEW: wide blush section, image placeholder "ชุดจัดเบรก / table setting · 16:9" + heading "บริการจัดเบรกครบวงจร" + button "ดูแพ็กเกจจัดเบรก".
- CTA band (deep green bg): "สนใจสั่งผลิต หรือขอใบเสนอราคา?" + buttons "แอด LINE" + "กรอกฟอร์ม".
- Footer: contact info, map placeholder, social line-icons, sitemap links, LINE.

### 2) Products (สินค้า)
- Short hero "สินค้าของเรา".
- Sticky FILTER BAR: pills [ทั้งหมด · เค้ก · คัพเค้ก · ขนมปัง · ครัวซองต์ · อื่นๆ].
- PRODUCT GRID: responsive cards (image placeholder 1:1 + name + monospace price badge + optional "ขายดี"/"ใหม่" rotated tag). ~9-12 items grouped by category with category labels.
- Bottom CTA: "สั่งจำนวนมาก? ขอใบเสนอราคาสำหรับธุรกิจ".

### 3) Catering (จัดเบรก)
- HERO: image placeholder "ชุดเบรก / table setting · 16:9" + heading "จัดเบรกครบวงจร เบเกอรี่ + เครื่องดื่ม".
- PACKAGE OVERVIEW: 3 package cards WITH prices (e.g. "แพ็กเกจเริ่มต้น ฿89/ท่าน", "มาตรฐาน ฿139/ท่าน", "พรีเมียม ฿199/ท่าน") — bullet contents + "เลือกแพ็กเกจนี้" button.
- SAMPLE MENU: grid of bakery + drink items with image placeholders, grouped (เบเกอรี่ / ของว่าง / เครื่องดื่ม).
- CONDITIONS: accordion (ขั้นต่ำ / จองล่วงหน้า / พื้นที่จัดส่ง).
- CTA: three buttons "โหลดเมนู (PDF)" · "ขอจัดเบรก" · "แอด LINE".

### 4) Wholesale / B2B (รับผลิต / ส่ง)
- HERO: heading "รับผลิต & ส่งเบเกอรี่สำหรับธุรกิจ" + sub about OEM.
- WHO WE SERVE: 4 cards — คาเฟ่ / ร้านอาหาร / โรงแรม / จัดเลี้ยง (line-icons).
- CATALOG PREVIEW: product grid WITHOUT prices (B2B shows no public pricing) — just image placeholder + name + a "ขอราคาส่ง" small link.
- B2B INFO: three info blocks — "ยอดสั่งขั้นต่ำ (MOQ)" / "รอบการส่ง" / "ขั้นตอนรับผลิต OEM" (numbered steps).
- SOCIAL PROOF: client logo placeholder row + numbers ("ลูกค้าองค์กร 60+ ราย · ส่งทั่วประเทศ").
- REQUEST-A-QUOTE FORM: fields — ชื่อธุรกิจ, ประเภทธุรกิจ (dropdown: คาเฟ่/ร้านอาหาร/โรงแรม/จัดเลี้ยง/อื่นๆ), ปริมาณ & ความถี่, สินค้าที่สนใจ, ชื่อผู้ติดต่อ, เบอร์โทร, LINE ID, อีเมล + note "ทีมงานตอบกลับภายใน 2-3 วันทำการ" + submit button "ขอใบเสนอราคา".

### 5) About (เกี่ยวกับเรา)
- BRAND STORY: image placeholder "ร้าน / ทีมงาน · 3:2" + heading "เรื่องราวของเรา" + 2-3 warm Thai paragraphs (founded, why bakery, craft).
- PRODUCTION PROCESS: horizontal step row (numbered) with small image placeholders — "คัดวัตถุดิบ → นวด → อบสด → ส่งถึงมือคุณ".
- STANDARDS: row of certification placeholder badges "อย." / "GMP" / "HACCP" + short text.

### 6) Contact (ติดต่อ)
- Two-column: left = contact info (ที่อยู่ร้าน, เบอร์โทร, LINE OA, อีเมล, เวลาทำการ, พื้นที่ให้บริการ). right = contact form (ชื่อ, เบอร์/LINE, ข้อความ).
- Full-width MAP placeholder box "แผนที่ Google Maps · 16:9".
- Social row (line-icons) + big LINE button.

## DELIVERABLE
Cohesive, polished, premium-yet-warm, mobile-first. Consistent use of the color system, serif headings + sans body + monospace labels, pill buttons with hover-invert, and typewriter badges. Every photo is an empty labeled placeholder. Thai UI copy throughout, zero emojis, line icons only.
```

---

## หมายเหตุการใช้งาน
- ถ้า Claude Design ทำทีเดียวหนักไป ให้เริ่มจากหน้า Home ก่อน (ตัด section pages 2-6 ออกชั่วคราว) แล้วค่อยสั่งเพิ่มทีละหน้า
- อยากปรับ copy/สี/section ไหน แก้ในบล็อกได้เลย แล้ววางใหม่
- พอได้ดีไซน์ที่ชอบ ส่งกลับมาให้ผม ผมแปลงเป็นโค้ด Next.js จริงตาม design system เดียวกันได้เลย
