# แผนผังการใช้งานมาสคอต "น้องโดว์" — Simple Cafe

> มาสคอต: ก้อนแป้งโดว์รูปเมฆ สวมหมวกเชฟเขียว ชุดเชฟ ป้าย "S"
> ไฟล์อยู่ที่ `~/Desktop/The Simple - Drive Images/`
> วันที่: 3 ก.ค. 2026 · อ้างอิงโครงเว็บจาก `DESIGN_PLAN.md`

---

## หลักการเลือก "สีเต็ม vs เส้นเขียว"
- **สีเต็ม (Character 01-14)** = จุดที่ต้องเด่น สะดุดตา → Hero, CTA band, feature ใหญ่, หน้าerror
- **เส้นเขียว (Outline 01-10)** = accent เบา กลมกลืนโทนมินิมอล → step diagram, empty state, ข้าง label, watermark, footer, floating
- **Secret 01-03** = easter egg (ท่าผจญภัย มีหมวกปีก + โลโก้) → About / 404 / hover surprise
- **ไอคอนสินค้า** = filter หมวด, badge, bullet

---

## คลังไฟล์ (ยืนยันแล้วว่าไฟล์ไหน = ท่าไหน)

### มาสคอตสีเต็ม
| ไฟล์ | ท่า |
|---|---|
| `01_Character_The Simple-01.png` | ยืนตรง ยิ้ม (idle/ทักทาย) |
| `01_Character_The Simple-02.png` | ถือไม้นวดแป้ง + ตะกร้อ (baking tools) |
| `01_Character_The Simple-03.png` | ถือชามตีแป้ง เปื้อนแก้ม (mixing) |
| `01_Character_The Simple-04.png` | ถือถาดครัวซองต์ มีควัน (เสิร์ฟ/อบสด) |
| `01_Character_The Simple-05.png` | นั่งถือบาแกตต์ + โดนัท |
| `01_Character_The Simple-06.png` | กอดกองขนม โดนัทหล่น (carrying/oops) |
| `01_Character_The Simple-07.png` | เข็นรถเข็นโดนัท + โลโก้ (delivery) |
| `01_Character_The Simple-08.png` | กอดโดนัทยักษ์ + ถุงโลโก้ |

### ไอคอนสินค้าสีเต็ม
| ไฟล์ | สินค้า |
|---|---|
| `01_Character_The Simple-09.png` | ครัวซองต์ |
| `01_Character_The Simple-10.png` | ขนมปังก้อน (loaf) |
| `01_Character_The Simple-11.png` | พาย |
| `01_Character_The Simple-12.png` | โดนัท/คุกกี้ 3 ชิ้น |
| `01_Character_The Simple-13.png` | บาแกตต์ |
| `01_Character_The Simple-14.png` | คุกกี้เดี่ยว |

### Secret (ท่าพิเศษ มีโลโก้)
| ไฟล์ | ท่า |
|---|---|
| `01_Secret_The Simple.png` | ปีนลงก้อนขนมปัง + บันได |
| `02_Secret_The Simple.png` | นอนชิลบนก้อนขนมปัง |
| `03_Secret_The Simple.png` | ยืนเลื่อยขนมปัง แลบลิ้นซน |

### มาสคอตเส้นเขียว (Outline)
| ไฟล์ | ท่า |
|---|---|
| `Outline_Character_The Simple-01.png` | ยืนตรง (คู่กับ 01) |
| `Outline_Character_The Simple-02.png` | ถือไม้นวด + ตะกร้อ |
| `Outline_Character_The Simple-03.png` | ตีแป้งในชาม |
| `Outline_Character_The Simple-04.png` | ถือถาดครัวซองต์ มีควัน |
| `Outline_Character_The Simple-05.png` | ถือถ้วยกาแฟ/ชา (ท่าใหม่ ไม่มีในเซ็ตสี) |
| `Outline_Character_The Simple-06.png` | กอดกองขนม โดนัทหล่น |
| `Outline_Character_The Simple-07.png` | เข็นรถเข็น + โลโก้ (พื้นดำ เส้นเขียว — ดูหมายเหตุ) |
| `Outline_Character_The Simple-08.png` | กอดโดนัท + ถุงโลโก้ |
| `Outline_Character_The Simple-09.png` | ครัวซองต์ (ไอคอน outline) |
| `Outline_Character_The Simple-10.png` | ขนมปังก้อน (ไอคอน outline) |

---

## วางที่ไหนบ้าง (แยกตามหน้า)

### หน้าแรก (Home)
| ตำแหน่ง | ไฟล์ | เหตุผล |
|---|---|---|
| **Hero (พระเอก ข้าง headline)** | `01_Character-04` (ถาดครัวซองต์ ควันลอย) | สื่อ "อบสด เสิร์ฟร้อนๆ" ทันที · ทางเลือก: `-01` ยืนทักทาย |
| Trust strip "อบสดทุกวัน" | ไอน้ำจาก `-04` / ไอคอนสินค้า | ตอกย้ำความสด |
| **What We Do 4 การ์ด** (ใช้ outline ให้กลมกลืน) | ผลิตเบเกอรี่ → `Outline-03` · จัดเบรก → `Outline-04` · Wholesale → `Outline-08` · คาเฟ่ → `Outline-05` (ถือกาแฟ) | แต่ละท่าตรงกับบริการเป๊ะ |
| Featured Products (การ์ด/หมวด) | ไอคอนสินค้าสีเต็ม `-09..-14` | เป็น icon การ์ด/แท็กหมวด |
| Why Simple Cafe (story block) | `01_Character-03` (ตีแป้ง) | สื่อคราฟต์ อบเอง |
| Catering Preview | `01_Character-06` (กอดกองขนม) | สื่อจัดเบรกเยอะๆ |
| **CTA band (พื้นเขียวเข้ม)** | `01_Character-07` (delivery) | มีโลโก้ + สื่อ "ส่งถึงที่" |
| Footer | `Outline-01` (หัวเล็ก) | accent เบาๆ |

### หน้าสินค้า (Products)
| ตำแหน่ง | ไฟล์ |
|---|---|
| Filter bar หมวด | ครัวซองต์ `-09` · ขนมปัง `-10` · เค้ก/พาย `-11` · คุกกี้ `-12`/`-14` · บาแกตต์ `-13` |
| Empty state "ไม่เจอสินค้า" | `Outline-06` (oops โดนัทหล่น) |
| Product card badge | ไอคอนสินค้าเล็ก |

### หน้าจัดเบรก (Catering)
| ตำแหน่ง | ไฟล์ |
|---|---|
| Hero | `01_Character-04` (ถาดเสิร์ฟ) หรือ `-06` (กอดกองขนม) |
| Package cards / Sample menu | ไอคอนสินค้า `-09..-14` แยกหมวด |

### หน้ารับผลิต/B2B (Wholesale)
| ตำแหน่ง | ไฟล์ | เหตุผล |
|---|---|---|
| **Hero** | `01_Character-07` (เข็นรถเข็นส่งของ) | สื่อ "ส่งให้ธุรกิจ" ตรงมาก มีโลโก้ |
| **ขั้นตอน OEM (step diagram)** | `Outline-03` (นวด/ตี) → `Outline-02` (เตรียม) → `Outline-04` (อบ/เสิร์ฟ) → `Outline-08` (ส่ง) | เล่าเป็น 4 สเต็ปสวยงาม กลมกลืน |
| Form ส่งสำเร็จ | `01_Character-01` (ยืนยิ้ม) | ยินดีต้อนรับลูกค้าใหม่ |

### หน้าเกี่ยวกับเรา (About)
| ตำแหน่ง | ไฟล์ |
|---|---|
| Brand Story | `02_Secret` (นอนชิลบนขนมปัง) — เล่าเรื่องสบายๆ |
| กระบวนการผลิต (สเต็ป) | `Outline-03` → `Outline-02` → `Outline-04` |
| Easter egg แทรกสนุก | `01_Secret` (ปีนขนมปัง) + `03_Secret` (เลื่อยขนมปัง) |

### หน้าติดต่อ (Contact)
| ตำแหน่ง | ไฟล์ |
|---|---|
| ข้างข้อมูลติดต่อ | `Outline-05` (ถือกาแฟ ชวนนั่ง) หรือ `01_Character-01` |
| Form ส่งสำเร็จ | `01_Character-01` (ยิ้ม) |

### ทั้งเว็บ (Global)
| ตำแหน่ง | ไฟล์ |
|---|---|
| Floating LINE companion (มือถือ) | หัวมาสคอตเล็ก (crop จาก `-01`) |
| หน้า 404 | `01_Character-06` หรือ `Outline-06` (oops) |
| Loading | `Outline-03` (ตีแป้ง — วนได้เป็น loop) |

---

## หมายเหตุ / สิ่งที่ต้องเคลียร์ก่อนโค้ด
1. **ไอคอนสินค้า outline มีแค่ 2 ชิ้น** (ครัวซองต์ + ขนมปังก้อน) — ถ้าอยากได้ filter bar เป็นเส้นเขียวครบทั้ง 5 หมวด ต้องทำเพิ่มอีก 3 (พาย/คุกกี้/บาแกตต์) หรือใช้ไอคอนสีเต็มทั้งแถว
2. **`Outline-07` พื้นดำ เส้นเขียว** — วางบนพื้นครีมตรงๆ ไม่ได้ ต้องแยก element เขียวออกก่อน (เลยเลือก `Outline-08` แทนในหน้า Home/B2B)
3. **Secret มีหมวกปีก (fedora) คนละลุคกับหมวกเชฟ** — ใช้เป็น "โหมดผจญภัย" easter egg เท่านั้น อย่าปนกับท่าปกติในหน้าหลัก
4. ไฟล์เป็น PNG ความละเอียดสูง — ตอนโค้ดจริงผมจะแปลงเป็น WebP/ย่อขนาด + ถ้ามีไฟล์ SVG ต้นฉบับจะดีสุด (คมทุกขนาด เบา)
