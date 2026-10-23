import type { Metadata } from "next";
import { CountUp, Reveal } from "@/components/Motion";
import AboutHero from "@/components/AboutHero";
import { GoLink } from "@/components/GoLink";
import { PHILOSOPHY, STATS } from "@/lib/data";
import Photo from "@/components/Photo";
import { ABOUT_PHOTOS } from "@/lib/images";
import { J, M, O, eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "About — Whiskers & Wags" };

export default function About() {
  return (
    <main>
      <AboutHero />
      <section style={{ padding: "clamp(64px,9vw,140px) clamp(20px,5vw,72px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "clamp(28px,6vw,100px)", maxWidth: 1400, margin: "0 auto" }}>
        <Reveal style={eyebrow()}>Our mission</Reveal>
        <Reveal as="p" index={1} style={{ margin: 0, font: `300 clamp(28px,3.6vw,50px)/1.18 ${M}` }}>
          To make the everyday life of pets better — with fewer, better things, made honestly, and chosen with love.
        </Reveal>
      </section>
      <section style={{ padding: "0 clamp(20px,5vw,72px) clamp(64px,9vw,140px)", display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: 14, maxWidth: 1400, margin: "0 auto" }}>
        <Reveal mask style={{ gridColumn: "span 7", minWidth: 0, aspectRatio: "4/3", overflow: "hidden", background: "#C5D6C4", position: "relative" }}>
          <Photo photo={ABOUT_PHOTOS.studio} sizes="(max-width:860px) 60vw, 55vw" />
        </Reveal>
        <Reveal mask style={{ gridColumn: "span 5", minWidth: 0, marginTop: "clamp(30px,8vw,120px)", aspectRatio: "3/4", overflow: "hidden", background: "#839C83", position: "relative" }}>
          <Photo photo={ABOUT_PHOTOS.cat} sizes="(max-width:860px) 40vw, 40vw" />
        </Reveal>
      </section>
      <section style={{ background: "#D7E4D6", padding: "clamp(64px,9vw,130px) clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal style={{ ...eyebrow(), marginBottom: 40 }}>Our philosophy</Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: "clamp(28px,4vw,56px)" }}>
            {PHILOSOPHY.map((ph, i) => (
              <Reveal key={ph.n} index={i} style={{ borderTop: "1.5px solid #2E2E2A", paddingTop: 20 }}>
                <div style={{ font: `400 12px ${O}`, color: "#5E6F55" }}>{ph.n}</div>
                <h3 style={{ margin: "12px 0", font: `700 clamp(26px,2.8vw,38px)/1.05 ${M}`, letterSpacing: "-.04em" }}>{ph.t}</h3>
                <p style={{ margin: 0, lineHeight: 1.6, color: "#4a4d47" }}>{ph.b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="on-dark" style={{ background: "#2E2E2A", color: "#F6F9F4", padding: "clamp(56px,8vw,110px) clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: 36 }}>
          {STATS.map((s) => (
            <div key={s.l}>
              <div style={{ font: `700 clamp(52px,7vw,104px)/1 ${M}`, letterSpacing: "-.05em" }}>
                <CountUp to={s.v} />
                <span style={{ color: "#8FA98F" }}>{s.suf}</span>
              </div>
              <div style={{ marginTop: 8, color: "#8FA98F", fontSize: 14 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ font: `400 11px ${O}`, color: "#8a8d84", marginTop: 36, maxWidth: 1400, marginInline: "auto" }}>Illustrative figures — replace with real brand data.</div>
      </section>
      <section style={{ padding: "clamp(64px,9vw,130px) clamp(20px,5vw,72px)", textAlign: "center" }}>
        <Reveal as="h2" style={{ margin: "0 0 28px", font: `700 clamp(34px,5vw,72px)/1 ${M}`, letterSpacing: "-.045em" }}>
          Come meet <span style={{ font: `300 1.05em ${M}`, color: "#5E6F55" }}>the collection.</span>
        </Reveal>
        <GoLink href="/shop" magnetic style={{ background: "#5E6F55", color: "#F6F9F4", padding: "18px 32px", font: `600 14px ${J}`, minHeight: 52 }}>Shop now →</GoLink>
      </section>
    </main>
  );
}
