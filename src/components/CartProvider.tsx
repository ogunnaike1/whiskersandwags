"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/data";

export interface CartItem {
  id: number;
  qty: number;
}

interface CartCtx {
  cart: CartItem[];
  count: number;
  add: (p: Product, qty?: number) => void;
  setQty: (id: number, delta: number) => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  checkoutMsg: string;
  setCheckoutMsg: (m: string) => void;
  detail: { id: number; qty: number } | null;
  openDetail: (id: number) => void;
  closeDetail: () => void;
  setDetailQty: (q: number) => void;
  toast: { text: string; on: boolean };
  flash: (t: string) => void;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "ww-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutMsg, setCheckoutMsg] = useState("");
  const [detail, setDetail] = useState<CartCtx["detail"]>(null);
  const [toast, setToast] = useState({ text: "", on: false });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // hydrate from localStorage after mount (SSR has no storage, so initial state must stay empty)
  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem(KEY) || "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (Array.isArray(c)) setCart(c);
    } catch {}
  }, []);

  const save = useCallback((next: CartItem[]) => {
    setCart(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const flash = useCallback((text: string) => {
    setToast({ text, on: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast((t) => ({ ...t, on: false })), 1900);
  }, []);

  const add = useCallback(
    (p: Product, qty = 1) => {
      const next = cart.slice();
      const i = next.findIndex((c) => c.id === p.id);
      if (i > -1) next[i] = { ...next[i], qty: next[i].qty + qty };
      else next.push({ id: p.id, qty });
      save(next);
      flash(p.name + " added");
    },
    [cart, save, flash],
  );

  const setQty = useCallback(
    (id: number, d: number) => save(cart.map((c) => (c.id === id ? { ...c, qty: c.qty + d } : c)).filter((c) => c.qty > 0)),
    [cart, save],
  );

  const value = useMemo<CartCtx>(
    () => ({
      cart,
      count: cart.reduce((a, c) => a + c.qty, 0),
      add,
      setQty,
      cartOpen,
      openCart: () => {
        setCartOpen(true);
        setCheckoutMsg("");
      },
      closeCart: () => setCartOpen(false),
      checkoutMsg,
      setCheckoutMsg,
      detail,
      openDetail: (id) => setDetail({ id, qty: 1 }),
      closeDetail: () => setDetail(null),
      setDetailQty: (q) => setDetail((d) => (d ? { ...d, qty: Math.max(1, q) } : d)),
      toast,
      flash,
    }),
    [cart, add, setQty, cartOpen, checkoutMsg, detail, toast, flash],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
