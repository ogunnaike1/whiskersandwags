"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CATS, NAV } from "@/lib/data";
import { useCart } from "./CartProvider";
import { useScrolled, useWidth } from "./hooks";
import { J, M, O } from "./ui";

export default function Nav() {
  const path = usePathname();
  const router = useRouter();
  const scrolled = useScrolled();
  const w = useWidth();
  const mobile = w < 860;
  const { count, openCart } = useCart();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!menu) return;
    const on = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [menu]);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const goSearch = () => {
    setMenu(false);
    router.push("/shop?focus=search");
  };

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          transition: "background .4s,backdrop-filter .4s,border-color .4s",
          background: scrolled ? "rgba(246,249,244,.72)" : "rgba(246,249,244,0)",
          backdropFilter: scrolled ? "blur(16px) saturate(1.5)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.5)" : "none",
          borderBottom: `1px solid ${scrolled ? "rgba(46,46,42,.08)" : "transparent"}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px clamp(20px,5vw,72px)" }}>
          <Link href="/" aria-label="Whiskers and Wags home" style={{ display: "flex", alignItems: "baseline", gap: 6, color: "#2E2E2A" }}>
            <span style={{ fontFamily: M, fontWeight: 700, fontSize: 20, letterSpacing: "-.03em" }}>Whiskers</span>
            <span style={{ fontFamily: M, fontWeight: 300, fontSize: 22, color: "#5E6F55" }}>&amp;</span>
            <span style={{ fontFamily: J, fontWeight: 700, fontSize: 20, letterSpacing: "-.03em" }}>Wags</span>
          </Link>
          {!mobile && (
            <nav aria-label="Primary" style={{ display: "flex", gap: 36 }}>
              {NAV.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={path === l.href ? "page" : undefined}
                  style={{ padding: "6px 0", font: `600 14px ${J}`, letterSpacing: ".01em", color: "#2E2E2A", position: "relative" }}
                >
                  {l.label}
                  <span
                    style={{ position: "absolute", left: 0, bottom: 0, height: 1.5, background: "#5E6F55", transition: "width .45s cubic-bezier(.65,0,.35,1)", width: path === l.href ? "100%" : 0 }}
                  />
                </Link>
              ))}
            </nav>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconBtn label="Search" onClick={goSearch}>
              <Search size={20} strokeWidth={1.8} />
            </IconBtn>
            <IconBtn label="Open cart" onClick={openCart} style={{ position: "relative" }}>
              <ShoppingBag size={21} strokeWidth={1.8} />
              <span style={{ position: "absolute", top: 3, right: 1, minWidth: 18, height: 18, borderRadius: 9, background: "#5E6F55", color: "#fff", font: `700 11px ${J}`, display: "grid", placeItems: "center", padding: "0 5px" }}>
                {count}
              </span>
            </IconBtn>
            {mobile && (
              <IconBtn label="Menu" onClick={() => setMenu(true)} expanded={menu}>
                <Menu size={22} strokeWidth={1.8} />
              </IconBtn>
            )}
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className="on-dark"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menu}
        inert={!menu}
        style={{
          position: "fixed", inset: 0, zIndex: 70, background: "#2E2E2A", color: "#F6F9F4", display: "flex", flexDirection: "column", overflowY: "auto", overflowX: "hidden",
          padding: "14px clamp(20px,5vw,72px) max(28px,env(safe-area-inset-bottom))", transition: "clip-path .7s cubic-bezier(.76,0,.24,1)",
          clipPath: menu ? "inset(0 0 0 0)" : "inset(0 0 100% 0)", pointerEvents: menu ? "auto" : "none", visibility: menu ? "visible" : "hidden",
        }}
      >
        {/* soft sage orb, echoing the newsletter section */}
        <div aria-hidden style={{ position: "absolute", right: "-22%", top: "-10%", width: "78vw", maxWidth: 420, aspectRatio: "1", background: "radial-gradient(closest-side,rgba(143,169,143,.34),rgba(143,169,143,0))", pointerEvents: "none" }} />

        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 56 }}>
          <Link href="/" onClick={() => setMenu(false)} aria-label="Whiskers and Wags home" style={{ display: "flex", alignItems: "baseline", gap: 6, color: "#F6F9F4" }}>
            <span style={{ fontFamily: M, fontWeight: 700, fontSize: 20, letterSpacing: "-.03em" }}>Whiskers</span>
            <span style={{ fontFamily: M, fontWeight: 300, fontSize: 22, color: "#8FA98F" }}>&amp;</span>
            <span style={{ fontFamily: J, fontWeight: 700, fontSize: 20, letterSpacing: "-.03em" }}>Wags</span>
          </Link>
          <button onClick={() => setMenu(false)} aria-label="Close menu" style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(246,249,244,.1)", border: "1px solid rgba(246,249,244,.22)", color: "#F6F9F4", display: "grid", placeItems: "center" }}>
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>

        <nav aria-label="Mobile" style={{ position: "relative", marginTop: "clamp(20px,5vh,44px)" }}>
          {NAV.map((l, i) => {
            const active = path === l.href;
            const d = 0.18 + i * 0.07;
            return (
              <Link
                key={l.href}
                href={l.href}
                tabIndex={menu ? 0 : -1}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenu(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 16, minHeight: 72, padding: "10px 0", color: active ? "#8FA98F" : "#F6F9F4", borderTop: "1px solid rgba(246,249,244,.14)",
                  transition: `transform .7s cubic-bezier(.16,1,.3,1) ${d}s,opacity .6s ${d}s,color .3s`, transform: menu ? "none" : "translateY(36px)", opacity: menu ? 1 : 0,
                }}
              >
                <span style={{ font: `500 12px ${O}`, letterSpacing: ".1em", color: "#8FA98F", width: 22 }}>0{i + 1}</span>
                <span style={{ flex: 1, font: `700 clamp(38px,11vw,56px)/1 ${M}`, letterSpacing: "-.045em" }}>{l.label}</span>
                {active ? (
                  <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: "#8FA98F" }} />
                ) : (
                  <ArrowUpRight size={22} strokeWidth={1.6} color="#8FA98F" aria-hidden />
                )}
              </Link>
            );
          })}
          <div style={{ borderTop: "1px solid rgba(246,249,244,.14)" }} />
        </nav>

        <div style={{ position: "relative", marginTop: 28, transition: "opacity .6s .5s, transform .7s .5s cubic-bezier(.16,1,.3,1)", opacity: menu ? 1 : 0, transform: menu ? "none" : "translateY(20px)" }}>
          <div style={{ font: `400 11px ${O}`, letterSpacing: ".14em", color: "#8FA98F", marginBottom: 12 }}>SHOP BY CATEGORY</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CATS.map((c) => (
              <Link
                key={c}
                href={`/shop?cat=${encodeURIComponent(c)}`}
                tabIndex={menu ? 0 : -1}
                onClick={() => setMenu(false)}
                style={{ minHeight: 44, display: "inline-flex", alignItems: "center", padding: "0 16px", borderRadius: 22, border: "1px solid rgba(246,249,244,.28)", background: "rgba(246,249,244,.08)", color: "#F6F9F4", font: `600 13px ${J}` }}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", marginTop: "auto", paddingTop: 32, transition: "opacity .6s .6s", opacity: menu ? 1 : 0 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
            <button
              onClick={() => { setMenu(false); goSearch(); }}
              style={{ flex: 1, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#F6F9F4", color: "#2E2E2A", border: 0, font: `600 14px ${J}` }}
            >
              <Search size={18} strokeWidth={1.8} /> Search
            </button>
            <button
              onClick={() => { setMenu(false); openCart(); }}
              style={{ flex: 1, minHeight: 52, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#5E6F55", color: "#F6F9F4", border: 0, font: `600 14px ${J}` }}
            >
              <ShoppingBag size={18} strokeWidth={1.8} /> Cart ({count})
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px 16px", font: `400 13px ${O}`, color: "#8FA98F" }}>
            <a href="mailto:hello@whiskersandwags.example" style={{ color: "#8FA98F", minHeight: 32, display: "inline-flex", alignItems: "center" }}>hello@whiskersandwags.example</a>
            <span style={{ display: "inline-flex", gap: 16, alignItems: "center" }}>
              <a href="#" style={{ color: "#8FA98F" }}>Instagram</a>
              <a href="#" style={{ color: "#8FA98F" }}>Pinterest</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function IconBtn({ label, onClick, children, style, color = "#2E2E2A", expanded }: { label: string; onClick: () => void; children: React.ReactNode; style?: React.CSSProperties; color?: string; expanded?: boolean }) {
  return (
    <button onClick={onClick} aria-label={label} aria-expanded={expanded} style={{ width: 44, height: 44, background: "none", border: 0, display: "grid", placeItems: "center", color, ...style }}>
      {children}
    </button>
  );
}
