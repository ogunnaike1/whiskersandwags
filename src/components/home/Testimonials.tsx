"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { QUOTES } from "@/lib/data";
import { Reveal } from "../Motion";
import { J, M, O, eyebrow } from "../ui";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(false);
  const busy = useRef(false);
  const q = QUOTES[idx];

  const slide = (d: number) => {
    if (busy.current) return;
    busy.current = true;
    setFade(true);
    setTimeout(() => {
      setIdx((i) => (i + d + QUOTES.length) % QUOTES.length);
      setFade(false);
      busy.current = false;
    }, 350);
  };

  const arrow = { width: 48, height: 48, border: "1.5px solid #2E2E2A", background: "none", color: "#2E2E2A", display: "grid", placeItems: "center" } as const;

  return (
    <section style={{ padding: "clamp(64px,9vw,140px) clamp(20px,5vw,72px)", textAlign: "center", background: "#F6F9F4" }}>
      <Reveal style={{ ...eyebrow(), marginBottom: 34 }}>
        Kind words <span style={{ color: "#6b6a60", letterSpacing: ".06em", textTransform: "none", font: `400 11px ${O}` }}>· demo content</span>
      </Reveal>
      <div aria-live="polite" style={{ maxWidth: 880, margin: "0 auto", minHeight: "clamp(220px,26vw,280px)", position: "relative" }}>
        <blockquote style={{ margin: 0, transition: "opacity .5s,transform .6s cubic-bezier(.16,1,.3,1)", opacity: fade ? 0 : 1, transform: `translateY(${fade ? 12 : 0}px)` }}>
          <p style={{ margin: "0 0 30px", font: `300 clamp(26px,3.8vw,52px)/1.18 ${M}`, letterSpacing: "-.01em" }}>“{q.text}”</p>
          <footer style={{ font: `600 14px ${J}` }}>
            {q.who} <span style={{ fontWeight: 400, color: "#6b6a60" }}>· {q.pet}</span>
          </footer>
        </blockquote>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 20 }}>
        <button onClick={() => slide(-1)} aria-label="Previous review" className="hv-charcoal" style={arrow}><ArrowLeft size={18} /></button>
        <span style={{ font: `400 12px ${O}`, color: "#6b6a60" }}>0{idx + 1} / 0{QUOTES.length}</span>
        <button onClick={() => slide(1)} aria-label="Next review" className="hv-charcoal" style={arrow}><ArrowRight size={18} /></button>
      </div>
    </section>
  );
}
