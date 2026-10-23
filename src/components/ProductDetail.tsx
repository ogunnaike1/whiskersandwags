"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { TONES, fmt, getProductSync } from "@/lib/data";
import { useCart } from "./CartProvider";
import Photo from "./Photo";
import { PRODUCT_PHOTOS } from "@/lib/images";
import { J, M, O } from "./ui";

export default function ProductDetail() {
  const { detail, closeDetail, setDetailQty, add, openCart } = useCart();
  const p = detail ? getProductSync(detail.id) : undefined;
  const open = !!p;

  useEffect(() => {
    if (!open) return;
    const on = (e: KeyboardEvent) => e.key === "Escape" && closeDetail();
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [open, closeDetail]);

  // keep last product rendered while the close transition plays
  const shown = p ?? getProductSync(1)!;
  const t = TONES[shown.tone];
  const qty = detail?.qty ?? 1;

  return (
    <div
      onClick={closeDetail}
      aria-hidden={!open}
      inert={!open}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(34,37,33,.55)", backdropFilter: "blur(4px)", transition: "opacity .45s", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", display: "grid", placeItems: "center", padding: 20, overflow: "auto" }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={shown.name}
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(100%,1000px)", background: "#F6F9F4", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", transition: "transform .7s cubic-bezier(.16,1,.3,1)", transform: `translateY(${open ? 0 : 40}px)`, maxHeight: "92vh", overflow: "auto" }}
      >
        <div style={{ position: "relative", minHeight: 320, background: t[0] }}>
          <div style={{ position: "absolute", inset: 0, background: t[1] }} />
          {open && <Photo photo={PRODUCT_PHOTOS[shown.id]} sizes="(max-width:1000px) 100vw, 500px" />}
        </div>
        <div style={{ padding: "clamp(24px,3.5vw,48px)", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ font: `400 11px ${O}`, color: "#5E6F55", letterSpacing: ".08em" }}>{shown.cat.toUpperCase()}</span>
            <button onClick={closeDetail} aria-label="Close" style={{ width: 44, height: 44, margin: "-10px -10px 0 0", background: "none", border: 0, display: "grid", placeItems: "center" }}>
              <X size={22} strokeWidth={1.8} />
            </button>
          </div>
          <h3 style={{ margin: 0, font: `700 clamp(28px,3.2vw,44px)/1.02 ${M}`, letterSpacing: "-.04em" }}>{shown.name}</h3>
          <div style={{ font: `700 22px ${J}` }}>{fmt(shown.price)}</div>
          <p style={{ margin: 0, lineHeight: 1.65, color: "#4a4d47" }}>{shown.desc}</p>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8, color: "#4a4d47", fontSize: 14 }}>
            {shown.details.map((x) => <li key={x}>{x}</li>)}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: "auto", paddingTop: 10 }}>
            <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #2E2E2A" }}>
              <button onClick={() => setDetailQty(qty - 1)} aria-label="Decrease" style={{ width: 46, height: 50, background: "none", border: 0, fontSize: 18 }}>−</button>
              <span style={{ minWidth: 28, textAlign: "center", font: `600 15px ${J}` }}>{qty}</span>
              <button onClick={() => setDetailQty(qty + 1)} aria-label="Increase" style={{ width: 46, height: 50, background: "none", border: 0, fontSize: 18 }}>+</button>
            </div>
            <button
              onClick={() => { add(shown, qty); closeDetail(); openCart(); }}
              className="hv-charcoal"
              style={{ flex: "1 1 160px", background: "#5E6F55", color: "#F6F9F4", border: 0, font: `600 14px ${J}`, minHeight: 52 }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
