"use client";

import { useState } from "react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PRODUCTS, CATEGORIES, type Category } from "@/lib/products";

type Filter = Category | "all";

export function ProductGrid() {
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  const pills: { key: Filter; label: string }[] = [
    { key: "all", label: "ทั้งหมด" },
    ...CATEGORIES.map((c) => ({ key: c.key as Filter, label: c.label })),
  ];

  return (
    <div>
      {/* filter bar */}
      <div className="sticky top-[104px] z-30 -mx-4 px-4 py-3 bg-cream/90 backdrop-blur-sm sm:static sm:bg-transparent sm:backdrop-blur-none sm:py-0 sm:mx-0 sm:px-0">
        <div className="flex flex-wrap gap-2 justify-center">
          {pills.map((p) => (
            <button
              key={p.key}
              onClick={() => setActive(p.key)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                active === p.key
                  ? "bg-brand-deep text-cream border-brand-deep"
                  : "bg-surface text-ink border-line hover:border-brand"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* grid */}
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="group rounded-[10px] border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_-12px_rgba(46,63,38,0.25)]"
          >
            <div className="relative">
              <span className="absolute -top-1 left-0 z-10 flex gap-1">
                {p.badge && (
                  <Badge tone={p.badge === "ขายดี" ? "gold" : "blush"}>{p.badge}</Badge>
                )}
                {p.grade === "พรีเมียม" && <Badge tone="green">พรีเมียม</Badge>}
              </span>
              <ImagePlaceholder label="ภาพสินค้า · 1:1" className="aspect-square w-full" />
            </div>
            <h3 className="mt-3 text-center font-medium text-ink text-sm sm:text-base">
              {p.name}
            </h3>
            <p className="mt-1 text-center font-accent text-brand font-semibold">
              ฿{p.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
