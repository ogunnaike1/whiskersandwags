"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CATS, CAT_SPAN, CAT_TONE, TONES, getProductsSync } from "@/lib/data";
import { useWidth } from "../hooks";
import { Reveal } from "../Motion";
import { J, M, O, eyebrow } from "../ui";

export default function Categories() {
  const w = useWidth();
  const [hover, setHover] = useState<string | null>(null);
  const products = getProductsSync();
  return (
    <section style={{ padding: "clamp(56px,8vw,120px) clamp(20px,5vw,72px)" }}>
      <Reveal style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20, marginBottom: "clamp(28px,4vw,56px)" }}>
        <div>
          <div style={{ ...eyebrow(), marginBottom: 14 }}>Shop by category</div>
          <h2 style={{ margin: 0, font: `700 clamp(34px,4.6vw,68px)/1.02 ${M}`, letterSpacing: "-.04em" }}>
            Find the <span style={{ font: `300 1.05em ${M}` }}>right</span> fit.
          </h2>
        </div>
        <Link href="/shop" style={{ borderBottom: "1.5px solid #2E2E2A", padding: "4px 0", font: `600 14px ${J}`, color: "#2E2E2A" }}>View everything →</Link>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,230px),1fr))", gap: 14, gridAutoRows: "clamp(260px,30vw,380px)" }}>
        {CATS.map((c, i) => {
          const h = hover === c;
          return (
            <Reveal key={c} index={i} style={{ gridColumn: `span ${w < 860 ? 1 : CAT_SPAN[c]}`, display: "grid" }}>
              <Link
                href={`/shop?cat=${encodeURIComponent(c)}`}
                onMouseEnter={() => setHover(c)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(c)}
                onBlur={() => setHover(null)}
                style={{ position: "relative", overflow: "hidden", textAlign: "left", color: "#2E2E2A", background: "#D7E4D6" }}
              >
                <div style={{ position: "absolute", inset: 0, background: TONES[CAT_TONE[c]][1], transition: "transform 1.1s cubic-bezier(.16,1,.3,1)", transform: `scale(${h ? 1.06 : 1})` }} />
                <span style={{ position: "absolute", left: 14, top: 14, font: `400 10px ${O}`, background: "#F6F9F4", padding: "3px 6px" }}>PHOTO · {c.toLowerCase()}</span>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 22, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div style={{ background: "rgba(246,249,244,.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", padding: "12px 16px" }}>
                    <div style={{ font: `700 20px ${J}`, letterSpacing: "-.03em" }}>{c}</div>
                    <div style={{ fontSize: 12, color: "#4a4d47" }}>{products.filter((p) => p.cat === c).length} pieces</div>
                  </div>
                  <span style={{ width: 44, height: 44, borderRadius: "50%", color: "#F6F9F4", display: "grid", placeItems: "center", transition: "transform .5s cubic-bezier(.16,1,.3,1),background .3s", transform: `translateX(${h ? 4 : 0}px)`, background: h ? "#5E6F55" : "#2E2E2A" }}>
                    <ArrowRight size={18} />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
