"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-4 text-left"
          >
            <span className="font-medium text-ink">{it.q}</span>
            {open === i ? (
              <Minus size={18} className="text-brand shrink-0" />
            ) : (
              <Plus size={18} className="text-brand shrink-0" />
            )}
          </button>
          {open === i && (
            <p className="pb-4 -mt-1 text-sm text-ink-soft leading-relaxed">{it.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
