"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { HERO, fmt, getProductSync } from "@/lib/data";
import { useCart } from "../CartProvider";
import { useReducedMotion, useWidth } from "../hooks";
import Photo from "../Photo";
import { HERO_PHOTOS } from "@/lib/images";
import { Magnetic, Parallax } from "../Motion";
import { J, M, O } from "../ui";

const INTERVAL = 5600;
const glass = {
  background: "rgba(246,249,244,.14)",
  backdropFilter: "blur(18px) saturate(1.4)",
  WebkitBackdropFilter: "blur(18px) saturate(1.4)",
  border: "1px solid rgba(246,249,244,.28)",
} as const;

export default function HeroCarousel() {
  const router = useRouter();
  const { openDetail } = useCart();
  const w = useWidth();
  const mobile = w < 860;
  const reduced = useReducedMotion();
  const [hs, setHs] = useState(0);
  const [hp, setHp] = useState(-1);
  const [dir, setDir] = useState(1);
  const [ready, setReady] = useState(false);
  const root = useRef<HTMLElement>(null);
  const tx = useRef(0);
  const L = HERO.length;

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  const go = useCallback(
    (n: number, d: number) => {
      const nn = (n + L) % L;
      if (nn === hs) return;
      setHp(hs);
      setHs(nn);
      setDir(d);
    },
    [hs, L],
  );

  // autoplay: restarts whenever the slide changes (so manual nav resets the timer); skipped on hidden tab / reduced motion
  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (document.hidden) t = setTimeout(tick, INTERVAL);
      else go(hs + 1, 1);
    };
    t = setTimeout(tick, INTERVAL);
    return () => clearTimeout(t);
  }, [hs, go, reduced]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced || w < 860 || !root.current) return;
    const r = root.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    root.current.querySelectorAll<HTMLElement>("[data-hpar]").forEach((p) => {
      p.style.transition = "transform .8s cubic-bezier(.16,1,.3,1)";
      p.style.transform = `translate3d(${(-x * 34).toFixed(1)}px,${(-y * 22).toFixed(1)}px,0)`;
    });
  };

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="on-dark"
      onTouchStart={(e) => (tx.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - tx.current;
        if (Math.abs(dx) > 50) go(hs + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      }}
      onMouseMove={onMove}
      style={{ position: "relative", height: "calc(100vh - 80px)", minHeight: 580, maxHeight: 1000, overflow: "hidden", background: "#2E2E2A", color: "#F6F9F4", touchAction: "pan-y" }}
    >
      <Parallax speed={0.06} style={{ position: "absolute", inset: "-5% 0" }}>
        {HERO.map((h, i) => {
          const cur = hs === i;
          const prev = hp === i && !cur;
          return (
            <div
              key={i}
              aria-hidden
              style={{
                position: "absolute", inset: 0, zIndex: cur ? 3 : prev ? 2 : 1, opacity: cur || prev ? 1 : 0,
                clipPath: cur || prev ? "inset(0 0 0 0)" : dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
                transition: `clip-path 1.5s cubic-bezier(.76,0,.24,1),opacity 0s linear ${cur || prev ? "0s" : "1.6s"}`,
              }}
            >
              <div data-hpar="1" style={{ position: "absolute", inset: "-4%" }}>
                <div
                  style={{
                    position: "absolute", inset: 0, background: h.bg,
                    transform: cur ? "scale(1) translateX(0)" : prev ? `scale(1.06) translateX(${dir > 0 ? "-5%" : "5%"})` : "scale(1.2) translateX(0)",
                    transition: "transform 2.6s cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  <Photo photo={HERO_PHOTOS[i]} sizes="100vw" priority={i === 0} />
                </div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(46,46,42,.68),rgba(46,46,42,.18) 72%),linear-gradient(0deg,rgba(46,46,42,.55),transparent 45%)" }} />
            </div>
          );
        })}
      </Parallax>

      {/* copy */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "grid", padding: "clamp(24px,5vw,72px) clamp(20px,5vw,72px) clamp(112px,12vw,140px)", pointerEvents: "none" }}>
        {HERO.map((h, i) => {
          const cur = hs === i;
          const on = cur && ready;
          const T = on ? "translateY(0)" : "translateY(112%)";
          const tr = (d: number) => (on ? `transform 1.1s cubic-bezier(.16,1,.3,1) ${d}s` : "transform .4s ease 0s");
          const n = h.l.length;
          return (
            <div key={i} aria-hidden={!cur} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${L}`} style={{ gridArea: "1/1", alignSelf: "end", maxWidth: "min(100%,1000px)", pointerEvents: cur ? "auto" : "none" }}>
              <div style={{ overflow: "hidden", marginBottom: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, font: `500 12px ${J}`, letterSpacing: ".18em", textTransform: "uppercase", color: "#D7E4D6", transform: T, transition: tr(0.4) }}>
                  <span style={{ width: 36, height: 1, background: "#D7E4D6" }} />
                  {h.tag}
                </div>
              </div>
              {cur ? <h1 style={h1}>{lines(h.l, T, tr)}</h1> : <h2 style={h1}>{lines(h.l, T, tr)}</h2>}
              <div style={{ overflow: "hidden", margin: "26px 0 34px" }}>
                <p style={{ margin: 0, maxWidth: 440, font: `300 clamp(16px,1.35vw,20px)/1.6 ${O}`, color: "#EEF3EC", transform: T, transition: tr(0.55 + n * 0.12) }}>{h.desc}</p>
              </div>
              <div style={{ overflow: "hidden", padding: 2 }}>
                <div style={{ transform: T, transition: tr(0.7 + n * 0.12) }}>
                  <Magnetic
                    className="hv-forest"
                    onClick={() => router.push(h.cat ? `/shop?cat=${encodeURIComponent(h.cat)}` : "/about")}
                    style={{ background: "#F6F9F4", color: "#2E2E2A", border: 0, padding: "0 30px", font: `600 14px ${J}`, letterSpacing: ".02em", minHeight: 52 }}
                  >
                    <span tabIndex={cur ? 0 : -1} style={{ pointerEvents: cur ? "auto" : "none" }}>{h.cta} →</span>
                  </Magnetic>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* featured glass card */}
      {!mobile && (
        <div style={{ position: "absolute", zIndex: 12, right: "clamp(20px,5vw,72px)", bottom: "clamp(28px,4vw,56px)", display: "grid" }}>
          {HERO.map((h, i) => {
            const on = hs === i && ready;
            const p = getProductSync(h.ft + 1)!;
            return (
              <button
                key={i}
                onClick={() => openDetail(p.id)}
                tabIndex={hs === i ? 0 : -1}
                style={{ gridArea: "1/1", textAlign: "left", color: "#F6F9F4", padding: "16px 20px", minWidth: 240, ...glass, boxShadow: "0 18px 50px rgba(46,46,42,.18)", transition: "opacity .7s,transform .9s cubic-bezier(.16,1,.3,1)", opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(16px)", pointerEvents: hs === i ? "auto" : "none" }}
              >
                <div style={{ font: `400 11px ${O}`, letterSpacing: ".14em", color: "#D7E4D6" }}>FEATURED</div>
                <div style={{ font: `600 16px ${J}`, marginTop: 6, letterSpacing: "-.01em" }}>{p.name}</div>
                <div style={{ font: `300 14px ${O}`, marginTop: 2 }}>{fmt(p.price)} · view piece →</div>
              </button>
            );
          })}
        </div>
      )}

      {/* controls */}
      <div style={{ position: "absolute", zIndex: 12, left: "clamp(20px,5vw,72px)", bottom: "clamp(28px,4vw,56px)", display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", ...glass, maxWidth: "calc(100% - 40px)" }}>
        <CtrlBtn label="Previous slide" onClick={() => go(hs - 1, -1)}><ArrowLeft size={18} /></CtrlBtn>
        <CtrlBtn label="Next slide" onClick={() => go(hs + 1, 1)}><ArrowRight size={18} /></CtrlBtn>
        <span style={{ width: 1, height: 24, background: "rgba(246,249,244,.3)", margin: "0 6px" }} />
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {HERO.map((_, i) => {
            const cur = hs === i;
            return (
              <button
                key={i}
                onClick={() => go(i, i > hs ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={cur}
                style={{ minHeight: 44, padding: "0 6px", background: "none", border: 0, color: "#F6F9F4", display: "flex", flexDirection: "column", justifyContent: "center", gap: 6, opacity: cur ? 1 : 0.6, transition: "opacity .4s" }}
              >
                <span style={{ font: `500 11px ${O}`, letterSpacing: ".1em" }}>0{i + 1}</span>
                <span style={{ display: "block", height: 2, width: cur ? (mobile ? 44 : 72) : mobile ? 16 : 28, background: "rgba(246,249,244,.3)", overflow: "hidden", transition: "width .6s cubic-bezier(.16,1,.3,1)" }}>
                  {/* key restarts the fill whenever the slide (re)activates */}
                  <span key={`${i}-${cur}`} style={{ display: "block", height: "100%", background: "#F6F9F4", width: cur && reduced ? "100%" : 0, animation: cur && !reduced ? `ww-fill ${INTERVAL}ms linear forwards` : "none" }} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <style>{`@keyframes ww-fill{from{width:0}to{width:100%}}`}</style>
    </section>
  );
}

const h1 = { margin: 0, font: `700 clamp(42px,7vw,104px)/1 ${M}`, letterSpacing: "-.045em" } as const;

function lines(l: string[], T: string, tr: (d: number) => string) {
  return l.map((x, j) => (
    <span key={j} style={{ display: "block", overflow: "hidden", paddingBottom: ".1em" }}>
      <span style={{ display: "block", transform: T, transition: tr(0.5 + j * 0.12) }}>{x}</span>
    </span>
  ));
}

function CtrlBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-label={label} className="hv-glass" style={{ width: 44, height: 44, background: "none", border: 0, color: "#F6F9F4", display: "grid", placeItems: "center" }}>
      {children}
    </button>
  );
}
