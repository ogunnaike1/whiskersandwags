"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CATS, getProductsSync, type Category } from "@/lib/data";
import { useWidth } from "./hooks";
import ProductCard from "./ProductCard";
import { J, M, O, eyebrow } from "./ui";

type Sort = "featured" | "low" | "high" | "az";

/** Re-keyed on the query string so /shop?cat=… links reset filters without syncing state in an effect. */
export default function ShopView() {
  const params = useSearchParams();
  return <Shop key={params.toString()} initialCat={params.get("cat")} focusSearch={params.get("focus") === "search"} />;
}

function Shop({ initialCat, focusSearch }: { initialCat: string | null; focusSearch: boolean }) {
  const w = useWidth();
  const mobile = w < 860;
  const [cat, setCat] = useState<"All" | Category>(CATS.includes(initialCat as Category) ? (initialCat as Category) : "All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (!focusSearch) return;
    const t = setTimeout(() => document.getElementById("shop-search")?.focus({ preventScroll: true }), 350);
    return () => clearTimeout(t);
  }, [focusSearch]);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    let l = getProductsSync().filter((p) => (cat === "All" || p.cat === cat) && (!term || (p.name + " " + p.cat).toLowerCase().includes(term)));
    if (sort === "low") l = l.slice().sort((a, b) => a.price - b.price);
    if (sort === "high") l = l.slice().sort((a, b) => b.price - a.price);
    if (sort === "az") l = l.slice().sort((a, b) => a.name.localeCompare(b.name));
    return l;
  }, [q, cat, sort]);

  return (
    <main style={{ padding: "clamp(32px,5vw,72px) clamp(20px,5vw,72px) clamp(56px,8vw,110px)", minHeight: "90vh" }}>
      <div style={{ marginBottom: "clamp(28px,4vw,48px)" }}>
        <div style={{ ...eyebrow(), marginBottom: 16 }}>The Collection · Autumn</div>
        <h1 style={{ margin: 0, font: `700 clamp(44px,8vw,120px)/.95 ${M}`, letterSpacing: "-.05em" }}>
          Everyday <span style={{ font: `300 1.05em ${M}`, color: "#5E6F55" }}>essentials.</span>
        </h1>
      </div>
      <div style={{ position: "sticky", top: 80, zIndex: 20, background: "#F6F9F4", padding: "14px 0", borderTop: "1px solid #D7E4D6", borderBottom: "1px solid #D7E4D6", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <label style={{ flex: "1 1 220px", maxWidth: 420, display: "flex", alignItems: "center", gap: 10, borderBottom: "1.5px solid #2E2E2A", padding: "6px 0" }}>
            <Search size={18} strokeWidth={1.8} />
            <input id="shop-search" type="search" placeholder="Search products" aria-label="Search products" value={q} onChange={(e) => setQ(e.target.value)} style={{ flex: 1, minWidth: 0, border: 0, background: "none", outline: "none", fontSize: 16, minHeight: 32 }} />
          </label>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {mobile && (
              <button onClick={() => setFiltersOpen((o) => !o)} aria-expanded={filtersOpen} style={{ minHeight: 44, padding: "0 16px", border: "1.5px solid #2E2E2A", background: "none", font: `600 13px ${J}` }}>
                Filters {cat !== "All" ? "(1)" : ""}
              </button>
            )}
            <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} style={{ minHeight: 44, padding: "0 12px", border: "1.5px solid #2E2E2A", background: "#F6F9F4", font: `600 13px ${J}` }}>
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="az">Name: A–Z</option>
            </select>
          </div>
        </div>
        {(!mobile || filtersOpen) && (
          <div role="group" aria-label="Category filters" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(["All", ...CATS] as const).map((c) => {
              const on = cat === c;
              return (
                <button key={c} onClick={() => setCat(c)} aria-pressed={on} style={{ minHeight: 44, padding: "0 18px", border: "1.5px solid #2E2E2A", background: on ? "#2E2E2A" : "transparent", color: on ? "#F6F9F4" : "#2E2E2A", font: `600 13px ${J}`, transition: "background .3s,color .3s" }}>
                  {c}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div role="status" style={{ font: `400 12px ${O}`, color: "#6b6a60", margin: "20px 0" }}>
        {list.length} {list.length === 1 ? "product" : "products"}
        {cat !== "All" ? ` · ${cat}` : ""}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,260px),1fr))", gap: "clamp(24px,3vw,40px) 20px" }}>
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
      {list.length === 0 && (
        <div style={{ padding: "80px 0", textAlign: "center" }}>
          <div style={{ font: `300 32px ${M}` }}>Nothing matches that — yet.</div>
          <button onClick={() => { setQ(""); setCat("All"); }} className="hv-charcoal" style={{ marginTop: 20, background: "#5E6F55", color: "#F6F9F4", border: 0, padding: "14px 24px", font: `600 14px ${J}`, minHeight: 48 }}>Clear filters</button>
        </div>
      )}
    </main>
  );
}
