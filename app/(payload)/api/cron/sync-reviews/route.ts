import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { fetchGoogleReviews } from "@/lib/google-reviews";

// Cron: ดึงรีวิว Google แล้ว cache ลง DB — ตั้งเวลาใน vercel.json (วันละครั้ง)
// ป้องกันด้วย CRON_SECRET (Vercel Cron ส่ง header Authorization: Bearer <CRON_SECRET>)
// รับ secret ทาง header เท่านั้น — ไม่รับผ่าน query string (กัน secret หลุดเข้า log)
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/* eslint-disable @typescript-eslint/no-explicit-any */

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  // fail-closed: ยังไม่ตั้ง secret = ปฏิเสธ (กัน endpoint เปิดสาธารณะตอน deploy รอบแรก)
  if (!secret) return false;
  const header = req.headers.get("authorization") || "";
  const bearer = header.replace(/^Bearer\s+/i, "");
  return bearer === secret;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const data = await fetchGoogleReviews();

    // Google ยังไม่ได้ตั้งค่า → fetchGoogleReviews คืน mock — อย่าเขียน mock ลง DB เป็นรีวิว "google" จริง
    if (data.mocked) {
      return NextResponse.json({
        ok: true,
        mocked: true,
        skipped: "google-not-configured",
        synced: 0,
        created: 0,
        updated: 0,
      });
    }

    const payload = await getPayload({ config });

    let created = 0;
    let updated = 0;

    for (const r of data.reviews) {
      const existing = await payload.find({
        collection: "reviews",
        where: { sourceId: { equals: r.sourceId } },
        limit: 1,
      });
      const doc = {
        authorName: r.authorName,
        rating: r.rating,
        text: r.text,
        relativeTime: r.relativeTime,
        profilePhoto: r.profilePhoto,
        source: "google" as const,
        sourceId: r.sourceId,
      };
      if (existing.docs[0]) {
        await payload.update({
          collection: "reviews",
          id: (existing.docs[0] as any).id,
          data: doc,
        });
        updated++;
      } else {
        await payload.create({ collection: "reviews", data: doc });
        created++;
      }
    }

    await payload.updateGlobal({
      slug: "social-proof",
      data: {
        googleRating: data.rating ?? undefined,
        googleReviewCount: data.total ?? undefined,
        lastSyncedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      ok: true,
      mocked: data.mocked,
      synced: data.reviews.length,
      created,
      updated,
      rating: data.rating,
      total: data.total,
    });
  } catch (err: any) {
    console.error("[cron] sync-reviews failed:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "sync failed" },
      { status: 500 }
    );
  }
}
