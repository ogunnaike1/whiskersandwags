"use client";

import { useState } from "react";
import { TONES, fmt, type Product } from "@/lib/data";
import { useCart } from "./CartProvider";
import { useWidth } from "./hooks";
import { J, O } from "./ui";

export default function ProductCard({ p }: { p: Product }) {
  const { add, openDetail } = useCart();
  const w = useWidth();
  const [hover, setHover] = useState(false);
  const t = TONES[p.tone];
  const show = hover || w < 900;
  return (
    <article>
      <div
        role="button"
        tabIndex={0}
        aria-label={`View ${p.name}`}
        onClick={() => openDetail(p.id)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && e.target === e.currentTarget && (e.preventDefault(), openDetail(p.id))}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", background: t[0], cursor: "pointer" }}
      >
        <div style={{ position: "absolute", inset: 0, background: t[1], transition: "transform 1.1s cubic-bezier(.16,1,.3,1)", transform: `scale(${hover ? 1.06 : 1})` }} />
        <span style={{ position: "absolute", left: 12, top: 12, font: `400 10px ${O}`, background: "#F6F9F4", padding: "3px 6px" }}>PRODUCT · {p.name.toLowerCase()}</span>
        {p.tag && <span style={{ position: "absolute", right: 12, top: 12, font: `600 11px ${J}`, letterSpacing: ".06em", background: "#5E6F55", color: "#fff", padding: "4px 8px" }}>{p.tag}</span>}
        <button
          onClick={(e) => { e.stopPropagation(); add(p, 1); }}
          className="hv-charcoal"
          style={{ position: "absolute", left: 12, right: 12, bottom: 12, background: "#5E6F55", color: "#F6F9F4", border: 0, padding: 15, font: `600 13px ${J}`, letterSpacing: ".03em", minHeight: 48, transition: "transform .55s cubic-bezier(.16,1,.3,1),opacity .4s,background .3s", transform: `translateY(${show ? 0 : 70}px)`, opacity: show ? 1 : 0 }}
        >
          Quick add — {fmt(p.price)}
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingTop: 14 }}>
        <div>
          <div style={{ font: `700 17px ${J}`, letterSpacing: "-.02em" }}>{p.name}</div>
          <div style={{ fontSize: 13, color: "#6b6a60", marginTop: 3 }}>{p.cat}</div>
        </div>
        <div style={{ font: `700 16px ${J}` }}>{fmt(p.price)}</div>
      </div>
    </article>
  );
}
