"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine } from "@/lib/orders";
import { calcSubtotal } from "@/lib/orders";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  ready: boolean; // อ่านจาก localStorage เสร็จแล้ว (กัน hydration mismatch)
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "sc-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  // โหลดจาก localStorage ครั้งแรก
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  // เซฟทุกครั้งที่เปลี่ยน (หลังพร้อมแล้ว)
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, ready]);

  const value = useMemo<CartContextValue>(() => {
    const add: CartContextValue["add"] = (item, qty = 1) => {
      setLines((prev) => {
        const found = prev.find((l) => l.id === item.id);
        if (found) {
          return prev.map((l) =>
            l.id === item.id ? { ...l, qty: l.qty + qty } : l
          );
        }
        return [...prev, { ...item, qty }];
      });
    };
    const setQty: CartContextValue["setQty"] = (id, qty) => {
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => l.id !== id)
          : prev.map((l) => (l.id === id ? { ...l, qty } : l))
      );
    };
    const remove: CartContextValue["remove"] = (id) =>
      setLines((prev) => prev.filter((l) => l.id !== id));
    const clear = () => setLines([]);

    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: calcSubtotal(lines),
      add,
      setQty,
      remove,
      clear,
      ready,
    };
  }, [lines, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
