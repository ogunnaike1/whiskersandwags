import Link from "next/link";
import { CATS, NAV } from "@/lib/data";
import { J, M, O } from "./ui";

const label = { font: `400 11px ${O}`, color: "#8FA98F", marginBottom: 16 } as const;
const link = { color: "#F6F9F4", textAlign: "left", padding: "8px 0", fontSize: 15, minHeight: 40, display: "block" } as const;

export default function Footer() {
  return (
    <footer className="on-dark" style={{ background: "#2E2E2A", color: "#F6F9F4", padding: "clamp(48px,7vw,96px) clamp(20px,5vw,72px) 28px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,170px),1fr))", gap: 36, maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ gridColumn: "span 2", minWidth: "min(100%,240px)" }}>
          <div style={{ font: `700 28px ${M}`, letterSpacing: "-.04em" }}>
            Whiskers <span style={{ font: `300 1.05em ${M}`, color: "#8FA98F" }}>&amp;</span> Wags
          </div>
          <p style={{ color: "#8FA98F", maxWidth: 300, lineHeight: 1.6, margin: "14px 0 0" }}>Thoughtfully chosen essentials for the pets who make life extraordinary.</p>
        </div>
        <div>
          <div style={label}>EXPLORE</div>
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className="hv-sage" style={link}>{l.label}</Link>
          ))}
        </div>
        <div>
          <div style={label}>SHOP</div>
          {CATS.map((c) => (
            <Link key={c} href={`/shop?cat=${encodeURIComponent(c)}`} className="hv-sage" style={link}>{c}</Link>
          ))}
        </div>
        <div>
          <div style={label}>CONNECT</div>
          <a href="#" className="hv-sage" style={link}>Instagram</a>
          <a href="#" className="hv-sage" style={link}>Pinterest</a>
          <a href="mailto:hello@whiskersandwags.example" className="hv-sage" style={link}>Email us</a>
        </div>
      </div>
      <div style={{ maxWidth: 1400, margin: "56px auto 0", paddingTop: 20, borderTop: "1px solid #3b3f39", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, fontSize: 12, color: "#8a8d84" }}>
        <span>© 2026 Whiskers &amp; Wags. Demo storefront.</span>
        <span style={{ fontFamily: J }}>Shipping · Returns · Privacy</span>
      </div>
    </footer>
  );
}
