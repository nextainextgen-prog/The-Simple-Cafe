import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { NAV, BRAND, LINE_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <>
      <footer className="mt-24 border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* แบรนด์ */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="/mascot/outline-hello.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="font-display text-lg font-semibold text-ink">
                {BRAND.name}
              </span>
            </div>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">
              {BRAND.tagline}
              <br />
              รับผลิต OEM · จัดเบรก · ส่งทั่วประเทศ
            </p>
          </div>

          {/* เมนู */}
          <nav className="flex flex-col gap-2.5">
            <p className="font-display font-semibold text-ink mb-1">เมนู</p>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-ink-soft hover:text-brand transition-colors w-fit"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ติดต่อ */}
          <div className="flex flex-col gap-3">
            <p className="font-display font-semibold text-ink mb-1">ติดต่อ</p>
            <span className="flex items-start gap-2 text-sm text-ink-soft">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand" />
              {BRAND.address}
            </span>
            <span className="flex items-center gap-2 text-sm text-ink-soft">
              <Phone size={16} className="shrink-0 text-brand" />
              {BRAND.phone}
            </span>
            <span className="flex items-center gap-2 text-sm text-ink-soft">
              <Clock size={16} className="shrink-0 text-brand" />
              {BRAND.hours}
            </span>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <p className="font-display font-semibold text-ink mb-1">
              สั่ง / ขอใบเสนอราคา
            </p>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#06C755] px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-95 w-fit"
            >
              <MessageCircle size={16} /> แอด LINE
            </a>
            <Link
              href="/wholesale"
              className="inline-flex items-center justify-center rounded-full border border-brand-deep px-4 py-2.5 text-sm font-medium text-brand-deep transition hover:bg-brand-deep hover:text-cream w-fit"
            >
              ขอใบเสนอราคา
            </Link>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 text-xs text-ink-soft flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              © {new Date().getFullYear()} {BRAND.name}. สงวนลิขสิทธิ์
            </span>
            <span>อบสดใหม่ทุกวัน · ไม่ใส่สารกันเสีย</span>
          </div>
        </div>
      </footer>

      {/* Floating LINE (มือถือ) */}
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="แอด LINE"
        className="sm:hidden fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#06C755] text-white shadow-lg active:scale-95 transition"
      >
        <MessageCircle size={26} />
      </a>
    </>
  );
}
