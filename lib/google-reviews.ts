// ดึงรีวิว + คะแนนรวมจาก Google Places API
// อ่าน config จาก env ล้วน — ยังไม่มีคีย์ = คืน mock ให้เว็บมีของโชว์ระหว่างรอ
//   GOOGLE_PLACES_API_KEY  = คีย์ Google Cloud (เปิด Places API)
//   GOOGLE_PLACE_ID        = Place ID ของร้าน
// เรียกผ่าน cron วันละครั้ง (ดู app/(payload)/api/cron/sync-reviews) เพื่อลดโควตา

export type NormalizedReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhoto: string;
  sourceId: string; // กันซ้ำตอน sync
};

export type ReviewsPayload = {
  rating: number | null; // คะแนนเฉลี่ยรวมจาก Google
  total: number | null; // จำนวนรีวิวทั้งหมด
  reviews: NormalizedReview[];
  mocked: boolean; // true = ยังไม่ได้ตั้งค่า env จริง
};

// รีวิว mock ระหว่างรอคีย์จริง — โทนลูกค้า B2B/จัดเบรกขอนแก่น
const MOCK_REVIEWS: NormalizedReview[] = [
  {
    authorName: "คุณพิมพ์ชนก",
    rating: 5,
    text: "สั่งเบรกประชุมบริษัทประจำ ขนมสดใหม่ทุกครั้ง แพ็กสวย ส่งตรงเวลา ประทับใจมากค่ะ",
    relativeTime: "2 สัปดาห์ที่แล้ว",
    profilePhoto: "",
    sourceId: "mock-1",
  },
  {
    authorName: "คุณธนวัฒน์",
    rating: 5,
    text: "รับผลิตครัวซองต์ส่งหน้าร้าน คุณภาพนิ่งมาก ลูกค้าติดใจ ทำงานเป็นมืออาชีพ",
    relativeTime: "1 เดือนที่แล้ว",
    profilePhoto: "",
    sourceId: "mock-2",
  },
  {
    authorName: "คุณศิริพร",
    rating: 5,
    text: "เค้กสวยเกินราคา รสชาติดี ทีมงานคุยง่าย ปรับแบบให้ได้ตามงาน แนะนำเลยค่ะ",
    relativeTime: "1 เดือนที่แล้ว",
    profilePhoto: "",
    sourceId: "mock-3",
  },
  {
    authorName: "คุณอนุชา",
    rating: 4,
    text: "ขนมอร่อย ราคาส่งเป็นกันเอง สั่งประจำสำหรับร้านกาแฟ ส่งไว",
    relativeTime: "2 เดือนที่แล้ว",
    profilePhoto: "",
    sourceId: "mock-4",
  },
  {
    authorName: "คุณเมธาวี",
    rating: 5,
    text: "จัดเบรกงานสัมมนา 200 ท่าน จัดการครบจบในที่เดียว ประทับใจการบริการมากค่ะ",
    relativeTime: "3 เดือนที่แล้ว",
    profilePhoto: "",
    sourceId: "mock-5",
  },
];

const MOCK_PAYLOAD: ReviewsPayload = {
  rating: 4.9,
  total: 312,
  reviews: MOCK_REVIEWS,
  mocked: true,
};

export function isGoogleConfigured(): boolean {
  return Boolean(process.env.GOOGLE_PLACES_API_KEY && process.env.GOOGLE_PLACE_ID);
}

/* eslint-disable @typescript-eslint/no-explicit-any */

// ดึงจริงจาก Places API (legacy Place Details) — คืนรีวิวได้จำกัด ~5 รายการ
export async function fetchGoogleReviews(): Promise<ReviewsPayload> {
  if (!isGoogleConfigured()) return MOCK_PAYLOAD;

  const key = process.env.GOOGLE_PLACES_API_KEY as string;
  const placeId = process.env.GOOGLE_PLACE_ID as string;
  const url =
    "https://maps.googleapis.com/maps/api/place/details/json" +
    `?place_id=${encodeURIComponent(placeId)}` +
    "&fields=rating,user_ratings_total,reviews" +
    "&reviews_sort=newest&language=th" +
    `&key=${encodeURIComponent(key)}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Places API HTTP ${res.status}`);
  }
  const data: any = await res.json();
  if (data.status !== "OK") {
    throw new Error(`Places API status ${data.status}: ${data.error_message || ""}`);
  }

  const result = data.result || {};
  const reviews: NormalizedReview[] = Array.isArray(result.reviews)
    ? result.reviews.map((r: any) => ({
        authorName: r.author_name || "ลูกค้า Google",
        rating: typeof r.rating === "number" ? r.rating : 5,
        text: r.text || "",
        relativeTime: r.relative_time_description || "",
        profilePhoto: r.profile_photo_url || "",
        // Google ไม่มี id ต่อรีวิว → ประกอบ id เองจาก author+time ให้กันซ้ำได้
        sourceId: `google-${r.author_name || "x"}-${r.time || "0"}`,
      }))
    : [];

  return {
    rating: typeof result.rating === "number" ? result.rating : null,
    total: typeof result.user_ratings_total === "number" ? result.user_ratings_total : null,
    reviews,
    mocked: false,
  };
}

export const MOCK_REVIEWS_PAYLOAD = MOCK_PAYLOAD;
