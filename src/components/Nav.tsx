"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/data";
import { useCart } from "./CartProvider";
import { useScrolled, useWidth } from "./hooks";
import { J, M } from "./ui";

export default function Nav() {
  const path = usePathname();
  const router = useRouter();
  const scrolled = useScrolled();
  const w = useWidth();
  const mobile = w < 860;
  const { count, openCart } = useCart();
  const [menu, setMenu] = useState(false);

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
        aria-hidden={!menu}
        style={{
          position: "fixed", inset: 0, zIndex: 70, background: "#2E2E2A", color: "#F6F9F4", display: "flex", flexDirection: "column",
          padding: "20px clamp(20px,5vw,72px) 40px", transition: "clip-path .7s cubic-bezier(.76,0,.24,1)",
          clipPath: menu ? "inset(0 0 0 0)" : "inset(0 0 100% 0)", pointerEvents: menu ? "auto" : "none", visibility: menu ? "visible" : "hidden",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: M, fontStyle: "italic", fontSize: 22, color: "#8FA98F" }}>Whiskers &amp; Wags</span>
          <IconBtn label="Close menu" onClick={() => setMenu(false)} color="#F6F9F4">
            <X size={22} strokeWidth={1.8} />
          </IconBtn>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
          {NAV.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              tabIndex={menu ? 0 : -1}
              onClick={() => setMenu(false)}
              style={{
                color: "#F6F9F4", font: `700 clamp(44px,12vw,72px)/1.1 ${M}`, letterSpacing: "-.04em", padding: "6px 0", minHeight: 56,
                transition: `transform .6s cubic-bezier(.16,1,.3,1) ${0.15 + i * 0.07}s,opacity .6s ${0.15 + i * 0.07}s`,
                transform: menu ? "none" : "translateY(40px)", opacity: menu ? 1 : 0,
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ font: "400 12px var(--font-outfit)", color: "#8FA98F" }}>hello@whiskersandwags.example</div>
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
