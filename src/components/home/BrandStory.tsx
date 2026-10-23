import { Parallax, Reveal } from "../Motion";
import { GoLink } from "../GoLink";
import { J, M, O, eyebrow } from "../ui";

const p = { fontSize: "clamp(16px,1.3vw,19px)", lineHeight: 1.65, maxWidth: 480, color: "#2E2E2A" } as const;

export default function BrandStory() {
  return (
    <section style={{ background: "#8FA98F", padding: "clamp(56px,8vw,130px) clamp(20px,5vw,72px)", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: "clamp(32px,6vw,100px)", alignItems: "center", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ position: "relative", height: "clamp(420px,52vw,680px)" }}>
          <Reveal mask style={{ position: "absolute", inset: "0 12% 10% 0", overflow: "hidden" }}>
            <Parallax speed={0.05} style={{ position: "absolute", inset: "-8% 0", background: "repeating-linear-gradient(135deg,#D7E4D6 0 16px,#C5D6C4 16px 32px)", display: "flex", alignItems: "flex-end", padding: 18 }}>
              <span style={{ font: `400 11px ${O}`, color: "#6b6a60", background: "#F6F9F4", padding: "4px 8px", alignSelf: "flex-end" }}>PHOTO · owner and dog on a woodland walk · 4:5</span>
            </Parallax>
          </Reveal>
          <Parallax speed={-0.07} style={{ position: "absolute", right: 0, bottom: 0, width: "42%", height: "40%", border: "6px solid #8FA98F", background: "repeating-linear-gradient(45deg,#F6F9F4 0 12px,#E6EEE4 12px 24px)", display: "flex", alignItems: "flex-end", padding: 10 }}>
            <span style={{ font: `400 10px ${O}`, color: "#6b6a60" }}>PHOTO · hands, leather collar</span>
          </Parallax>
        </div>
        <div>
          <Reveal style={{ ...eyebrow("#2E2E2A"), marginBottom: 20 }}>Our story</Reveal>
          <Reveal index={1} as="h2" style={{ margin: "0 0 28px", font: `700 clamp(38px,5.4vw,84px)/1 ${M}`, letterSpacing: "-.045em" }}>
            Because <span style={{ font: `300 1.05em ${M}` }}>They’re</span> Family.
          </Reveal>
          <Reveal index={2} as="p" style={{ ...p, margin: "0 0 18px" }}>
            We started Whiskers &amp; Wags because the things our animals live with should be as considered as the things we do. Honest materials. Quiet design. Nothing that ends up in a landfill by spring.
          </Reveal>
          <Reveal index={3} as="p" style={{ ...p, margin: "0 0 34px" }}>Every piece is tested at home — by a very critical panel of one beagle and two cats.</Reveal>
          <Reveal index={4}>
            <GoLink href="/about" magnetic style={{ background: "#5E6F55", color: "#F6F9F4", padding: "18px 30px", font: `600 14px ${J}`, minHeight: 52, display: "inline-flex", alignItems: "center" }}>
              Read our story →
            </GoLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
