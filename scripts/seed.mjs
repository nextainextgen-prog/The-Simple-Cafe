// Seed the CMS with current hardcoded content (lib/products.ts + lib/site.ts)
// via the REST API using an admin JWT. Idempotent-ish: skips a category/product
// if one with the same key/name already exists.
//
// Usage: node scripts/seed.mjs [baseUrl] [email] [password]
const BASE = process.argv[2] || "http://localhost:3007";
const EMAIL = process.argv[3] || "admin@simplecafe.co";
const PASSWORD = process.argv[4] || "SimpleCafe123!";

const CATEGORIES = [
  { key: "cake", label: "เค้ก", order: 0 },
  { key: "cupcake", label: "คัพเค้ก", order: 1 },
  { key: "bread", label: "ขนมปัง", order: 2 },
  { key: "croissant", label: "ครัวซองต์", order: 3 },
  { key: "cookie", label: "คุกกี้", order: 4 },
  { key: "other", label: "อื่นๆ", order: 5 },
];

const PRODUCTS = [
  { name: "ครัวซองต์เนยฝรั่งเศส", price: 65, category: "croissant", badge: "ขายดี", grade: "พรีเมียม", order: 0 },
  { name: "ซาวโดว์โฮมเมด", price: 120, category: "bread", badge: "ขายดี", grade: "none", order: 1 },
  { name: "คุกกี้ช็อกโกแลตชิป", price: 45, category: "cookie", badge: "none", grade: "มาตรฐาน", order: 2 },
  { name: "บัตเตอร์เค้กเนยสด", price: 320, category: "cake", badge: "ใหม่", grade: "พรีเมียม", order: 3 },
  { name: "บาแกตต์ฝรั่งเศส", price: 75, category: "bread", badge: "none", grade: "none", order: 4 },
  { name: "โดนัทเคลือบช็อก", price: 55, category: "other", badge: "ใหม่", grade: "none", order: 5 },
  { name: "คัพเค้ก (รอข้อมูล)", category: "cupcake", badge: "ใหม่", grade: "none", order: 6 },
  { name: "คัพเค้ก (รอข้อมูล)", category: "cupcake", badge: "none", grade: "none", order: 7 },
  { name: "คัพเค้ก (รอข้อมูล)", category: "cupcake", badge: "none", grade: "none", order: 8 },
];

// lexical rich-text helper — สร้าง editor state จาก array ย่อหน้า
function richText(paragraphs) {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        textFormat: 0,
        children: [
          { type: "text", detail: 0, format: 0, mode: "normal", style: "", text, version: 1 },
        ],
      })),
    },
  };
}

const WHATWEDO = [
  {
    title: "ผลิตเบเกอรี่",
    slug: "bakery-production",
    summary: "อบสดใหม่ทุกวัน คัดวัตถุดิบพรีเมียม",
    art: "/mascot/outline-mixing.png",
    order: 0,
    content: richText([
      "Simple Cafe ผลิตเบเกอรี่คราฟต์อบสดใหม่ทุกวัน คัดวัตถุดิบพรีเมียม เนยแท้ แป้งคุณภาพ ไม่ใส่สารกันเสีย",
      "เรามีทั้งสูตรมาตรฐานยอดนิยมและพร้อมพัฒนาสูตรเฉพาะตามความต้องการของลูกค้า ควบคุมคุณภาพทุกล็อตการผลิต",
    ]),
  },
  {
    title: "จัดเบรก",
    slug: "catering-break",
    summary: "เบเกอรี่ + เครื่องดื่ม ครบชุดพร้อมเสิร์ฟ",
    art: "/mascot/outline-serving.png",
    order: 1,
    content: richText([
      "บริการจัดเบรกครบวงจรสำหรับงานสัมมนา ประชุม อบรม และงานเลี้ยงบริษัท เบเกอรี่อบสดใหม่พร้อมเครื่องดื่ม จัดเป็นชุดพร้อมเสิร์ฟ",
      "เลือกแพ็กเกจได้ตามงบประมาณและจำนวนคน พร้อมจัดส่งตรงเวลาถึงสถานที่จัดงานทั้งในขอนแก่นและพื้นที่ใกล้เคียง",
    ]),
  },
  {
    title: "Wholesale / OEM",
    slug: "wholesale-oem",
    summary: "รับผลิตส่งธุรกิจ ทำแบรนด์ของคุณได้",
    art: "/mascot/outline-hug-donut.png",
    order: 2,
    content: richText([
      "รับผลิตเบเกอรี่ส่งธุรกิจ ทั้งร้านคาเฟ่ ร้านอาหาร โรงแรม และร้านค้าปลีก ในราคาส่งพิเศษ ปริมาณยืดหยุ่นตามรอบการสั่ง",
      "บริการ OEM รับผลิตภายใต้แบรนด์ของคุณ ตั้งแต่พัฒนาสูตร แพ็กเกจจิ้ง จนถึงจัดส่ง เหมาะสำหรับธุรกิจที่ต้องการสร้างแบรนด์เบเกอรี่ของตัวเอง",
    ]),
  },
  {
    title: "ร้านคาเฟ่",
    slug: "cafe",
    summary: "กาแฟและเบเกอรี่หน้าร้าน ขอนแก่น",
    art: "/mascot/outline-coffee.png",
    order: 3,
    content: richText([
      "ร้านคาเฟ่ Simple Cafe ที่ขอนแก่น เสิร์ฟกาแฟและเบเกอรี่อบสดใหม่หน้าร้าน บรรยากาศอบอุ่นเป็นกันเอง",
      "แวะมานั่งชิลล์ จิบกาแฟ พร้อมเลือกเบเกอรี่โฮมเมดหลากหลายเมนู หรือสั่งกลับบ้านก็ได้",
    ]),
  },
];

const SITE = {
  brandName: "Simple Cafe",
  tagline: "คราฟต์เบเกอรี่ อบสดใหม่ทุกวัน",
  phone: "0X-XXX-XXXX",
  lineId: "@simplecafe",
  lineUrl: "https://page.line.me/thesimplecafe.kk?openQrModal=true",
  email: "hello@simplecafe.co",
  address: "ขอนแก่น",
  hours: "ทุกวัน 08:00 – 18:00 น.",
  nav: [
    { label: "หน้าแรก", href: "/" },
    { label: "สินค้า", href: "/products" },
    { label: "จัดเบรก", href: "/catering" },
    { label: "รับผลิต/ส่ง", href: "/wholesale" },
    { label: "เกี่ยวกับเรา", href: "/about" },
    { label: "ติดต่อ", href: "/contact" },
  ],
  stats: [
    { value: "6+", label: "ปีประสบการณ์" },
    { value: "60+", label: "ลูกค้าองค์กร" },
    { value: "ทุกวัน", label: "อบสดใหม่" },
    { value: "ทั่วประเทศ", label: "จัดส่ง" },
  ],
};

async function main() {
  // 1. login
  const loginRes = await fetch(`${BASE}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  const login = await loginRes.json();
  if (!login.token) throw new Error("login failed: " + JSON.stringify(login));
  const auth = { "Content-Type": "application/json", Authorization: `JWT ${login.token}` };
  console.log("✓ logged in as", login.user?.email);

  // 2. categories (skip if key exists) -> map key -> id
  const catId = {};
  const existingCats = await (await fetch(`${BASE}/api/categories?limit=100`, { headers: auth })).json();
  for (const c of existingCats.docs || []) catId[c.key] = c.id;
  for (const c of CATEGORIES) {
    if (catId[c.key]) { console.log("• category exists:", c.key); continue; }
    const r = await fetch(`${BASE}/api/categories`, { method: "POST", headers: auth, body: JSON.stringify(c) });
    const d = await r.json();
    catId[c.key] = d.doc?.id;
    console.log("＋ category:", c.label, "->", d.doc?.id);
  }

  // 3. products (skip if name+order exists)
  const existingProds = await (await fetch(`${BASE}/api/products?limit=200`, { headers: auth })).json();
  const seen = new Set((existingProds.docs || []).map((p) => `${p.name}#${p.order}`));
  for (const p of PRODUCTS) {
    if (seen.has(`${p.name}#${p.order}`)) { console.log("• product exists:", p.name, p.order); continue; }
    const body = { ...p, category: catId[p.category], visible: true };
    const r = await fetch(`${BASE}/api/products`, { method: "POST", headers: auth, body: JSON.stringify(body) });
    const d = await r.json();
    console.log(d.doc?.id ? "＋ product:" : "✗ product FAIL:", p.name, d.doc?.id || JSON.stringify(d.errors || d));
  }

  // 3b. what-we-do (skip if slug exists)
  const existingWwd = await (await fetch(`${BASE}/api/what-we-do?limit=100`, { headers: auth })).json();
  const wwdSlugs = new Set((existingWwd.docs || []).map((w) => w.slug));
  for (const w of WHATWEDO) {
    if (wwdSlugs.has(w.slug)) { console.log("• what-we-do exists:", w.slug); continue; }
    const r = await fetch(`${BASE}/api/what-we-do`, { method: "POST", headers: auth, body: JSON.stringify({ ...w, visible: true }) });
    const d = await r.json();
    console.log(d.doc?.id ? "＋ what-we-do:" : "✗ what-we-do FAIL:", w.title, d.doc?.id || JSON.stringify(d.errors || d));
  }

  // 4. site-settings global
  const r = await fetch(`${BASE}/api/globals/site-settings`, { method: "POST", headers: auth, body: JSON.stringify(SITE) });
  const d = await r.json();
  console.log(r.ok ? "✓ site-settings saved" : "✗ site-settings FAIL: " + JSON.stringify(d).slice(0, 200));

  console.log("\nSeed done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
