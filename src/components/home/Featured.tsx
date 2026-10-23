import { getProductsSync } from "@/lib/data";
import ProductCard from "../ProductCard";
import { Reveal } from "../Motion";
import { M } from "../ui";

export default function Featured() {
  const items = [1, 2, 3, 4, 5, 6].map((id) => getProductsSync().find((p) => p.id === id)!);
  return (
    <section style={{ padding: "clamp(40px,6vw,90px) clamp(20px,5vw,72px) clamp(56px,8vw,120px)" }}>
      <Reveal style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20, marginBottom: "clamp(28px,4vw,56px)" }}>
        <h2 style={{ margin: 0, font: `700 clamp(34px,4.6vw,68px)/1.02 ${M}`, letterSpacing: "-.04em" }}>
          Curated <span style={{ font: `300 1.05em ${M}`, color: "#5E6F55" }}>favourites</span>
        </h2>
        <p style={{ margin: 0, maxWidth: 320, color: "#4a4d47", lineHeight: 1.55 }}>Six pieces we’d choose for our own. Natural materials, built to last.</p>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,270px),1fr))", gap: "clamp(20px,2.4vw,36px) 20px" }}>
        {items.map((p, i) => (
          <Reveal key={p.id} index={i}>
            <ProductCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
