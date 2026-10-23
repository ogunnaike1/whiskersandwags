import { Parallax, Reveal } from "../Motion";
import { GoLink } from "../GoLink";
import Photo from "../Photo";
import { BRAND_PHOTOS } from "@/lib/images";
import { J, M, eyebrow } from "../ui";

const p = { fontSize: "clamp(16px,1.3vw,19px)", lineHeight: 1.65, maxWidth: 480, color: "#2E2E2A" } as const;

export default function BrandStory() {
  return (
    <section style={{ background: "#8FA98F", padding: "clamp(56px,8vw,130px) clamp(20px,5vw,72px)", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: "clamp(32px,6vw,100px)", alignItems: "center", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ position: "relative", height: "clamp(420px,52vw,680px)" }}>
          <Reveal mask style={{ position: "absolute", inset: "0 12% 10% 0", overflow: "hidden" }}>
            <Parallax speed={0.05} style={{ position: "absolute", inset: "-8% 0", background: "#C5D6C4" }}>
              <Photo photo={BRAND_PHOTOS.main} sizes="(max-width:860px) 90vw, 45vw" />
            </Parallax>
          </Reveal>
          <Parallax speed={-0.07} style={{ position: "absolute", right: 0, bottom: 0, width: "42%", height: "40%", border: "6px solid #8FA98F", background: "#E6EEE4" }}>
            <Photo photo={BRAND_PHOTOS.detail} sizes="25vw" />
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
