"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { TONES, fmt, getProductSync } from "@/lib/data";
import { useCart } from "./CartProvider";
import { J, M, O } from "./ui";

export default function CartDrawer() {
  const { cart, count, cartOpen, closeCart, setQty, checkoutMsg, setCheckoutMsg } = useCart();
  const router = useRouter();
  const lines = cart.flatMap((c) => {
    const p = getProductSync(c.id);
    return p ? [{ p, qty: c.qty }] : [];
  });
  const sub = lines.reduce((a, l) => a + l.p.price * l.qty, 0);
  const empty = lines.length === 0;

  useEffect(() => {
    if (!cartOpen) return;
    const on = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [cartOpen, closeCart]);

  return (
    <>
      <div onClick={closeCart} style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(34,37,33,.45)", transition: "opacity .5s", opacity: cartOpen ? 1 : 0, pointerEvents: cartOpen ? "auto" : "none" }} />
      <aside
        aria-label="Shopping cart"
        aria-hidden={!cartOpen}
        inert={!cartOpen}
        style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 90, width: "min(100%,440px)", background: "#F6F9F4", display: "flex", flexDirection: "column", transition: "transform .7s cubic-bezier(.16,1,.3,1)", transform: `translateX(${cartOpen ? "0" : "105%"})`, boxShadow: "-20px 0 60px rgba(34,37,33,.15)" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 24px", borderBottom: "1px solid #D7E4D6" }}>
          <div style={{ font: `700 22px ${M}`, letterSpacing: "-.03em" }}>
            Your cart <span style={{ font: `400 13px ${O}`, color: "#6b6a60" }}>({count})</span>
          </div>
          <button onClick={closeCart} aria-label="Close cart" style={{ width: 44, height: 44, background: "none", border: 0, display: "grid", placeItems: "center" }}>
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "8px 24px" }}>
          {empty && (
            <div style={{ padding: "60px 0", textAlign: "center" }}>
              <div style={{ font: `300 28px ${M}` }}>Your cart is empty.</div>
              <button onClick={() => { closeCart(); router.push("/shop"); }} style={{ marginTop: 18, background: "none", border: 0, borderBottom: "1.5px solid #2E2E2A", font: `600 14px ${J}`, padding: "4px 0" }}>
                Browse the collection
              </button>
            </div>
          )}
          {lines.map(({ p, qty }) => (
            <div key={p.id} style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: "1px solid #D7E4D6" }}>
              <div style={{ width: 84, height: 104, flex: "none", background: TONES[p.tone][1] }} />
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div>
                    <div style={{ font: `700 15px ${J}` }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: "#6b6a60" }}>{p.cat}</div>
                  </div>
                  <div style={{ font: `700 15px ${J}` }}>{fmt(p.price * qty)}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #2E2E2A" }}>
                    <button onClick={() => setQty(p.id, -1)} aria-label={`Decrease quantity of ${p.name}`} style={{ width: 40, height: 40, background: "none", border: 0, fontSize: 18 }}>−</button>
                    <span style={{ minWidth: 24, textAlign: "center", font: `600 14px ${J}` }}>{qty}</span>
                    <button onClick={() => setQty(p.id, 1)} aria-label={`Increase quantity of ${p.name}`} style={{ width: 40, height: 40, background: "none", border: 0, fontSize: 18 }}>+</button>
                  </div>
                  <button onClick={() => setQty(p.id, -qty)} style={{ background: "none", border: 0, fontSize: 13, color: "#6b6a60", textDecoration: "underline", minHeight: 40 }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "20px 24px 26px", borderTop: "1px solid #D7E4D6", background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", font: `700 18px ${J}`, marginBottom: 6 }}>
            <span>Subtotal</span>
            <span>{fmt(sub)}</span>
          </div>
          <div style={{ fontSize: 12, color: "#6b6a60", marginBottom: 16 }}>{sub >= 60 ? "Free shipping applied." : "Free shipping on orders over $60."}</div>
          <button
            onClick={() => setCheckoutMsg("Demo store — payments aren’t connected yet.")}
            disabled={empty}
            className="hv-charcoal"
            style={{ width: "100%", background: "#5E6F55", color: "#F6F9F4", border: 0, padding: 17, font: `600 14px ${J}`, minHeight: 52, opacity: empty ? 0.4 : 1 }}
          >
            Checkout
          </button>
          <div aria-live="polite" style={{ fontSize: 12, color: "#5E6F55", marginTop: 10, minHeight: 16 }}>{checkoutMsg}</div>
        </div>
      </aside>
    </>
  );
}
