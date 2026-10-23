"use client";

import { useEffect, useRef, useState } from "react";
import { CHAPTERS, TONES } from "@/lib/data";
import { Parallax } from "../Motion";
import Photo from "../Photo";
import { CHAPTER_PHOTOS, LIFE_PHOTOS } from "@/lib/images";
import { M, O } from "../ui";

export default function Lifestyle() {
  const story = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const on = () => {
      const el = story.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(0.999, Math.max(0, -r.top / (r.height - innerHeight)));
      setStep(Math.floor(p * CHAPTERS.length));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <section className="on-dark" style={{ background: "#2E2E2A", color: "#F6F9F4", position: "relative", overflow: "hidden", padding: "clamp(80px,12vw,200px) 0 clamp(60px,8vw,120px)" }}>
      <div style={{ position: "relative", height: "clamp(520px,70vw,900px)" }}>
        <Parallax speed={0.04} style={{ position: "absolute", left: "clamp(20px,5vw,72px)", top: 0, zIndex: 1 }}>
          <h2 style={{ margin: 0, font: `700 clamp(64px,15vw,240px)/.88 ${M}`, letterSpacing: "-.06em" }}>
            Slow<br />
            <span style={{ font: `300 1em ${M}`, color: "#8FA98F", letterSpacing: "-.03em" }}>mornings.</span>
          </h2>
        </Parallax>
        <Parallax speed={-0.12} style={{ position: "absolute", right: "clamp(20px,6vw,100px)", top: "6%", width: "clamp(180px,30vw,440px)", aspectRatio: "3/4", background: "#33372f", zIndex: 2 }}>
          <Photo photo={LIFE_PHOTOS.cat} sizes="(max-width:860px) 40vw, 30vw" />
        </Parallax>
        <Parallax speed={0.1} style={{ position: "absolute", left: "clamp(40px,14vw,220px)", bottom: 0, width: "clamp(200px,36vw,540px)", aspectRatio: "4/3", background: "#839C83", zIndex: 3 }}>
          <Photo photo={LIFE_PHOTOS.dog} sizes="(max-width:860px) 60vw, 36vw" />
        </Parallax>
        <Parallax speed={-0.04} style={{ position: "absolute", right: "clamp(20px,8vw,140px)", bottom: "4%", maxWidth: 300, padding: "22px 24px", background: "rgba(246,249,244,.10)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(246,249,244,.22)", zIndex: 4 }}>
          <div style={{ font: `400 11px ${O}`, color: "#8FA98F", marginBottom: 8 }}>THE LIVING EDIT</div>
          <div style={{ font: `300 22px/1.3 ${M}` }}>Pieces that belong in your home as much as theirs.</div>
        </Parallax>
      </div>

      {/* sticky storytelling */}
      <div ref={story} style={{ height: "320vh", position: "relative", marginTop: "clamp(40px,6vw,100px)" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "clamp(20px,5vw,80px)", alignItems: "center", padding: "80px clamp(20px,5vw,72px) 40px" }}>
          <div>
            <div style={{ font: `400 12px ${O}`, color: "#8FA98F", letterSpacing: ".1em", marginBottom: 22 }}>0{step + 1} / 0{CHAPTERS.length}</div>
            <div style={{ position: "relative", minHeight: "clamp(220px,28vw,320px)" }}>
              {CHAPTERS.map((ch, i) => (
                <div key={ch.title} aria-hidden={step !== i} style={{ position: "absolute", inset: "0 0 auto 0", transition: "opacity .8s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)", opacity: step === i ? 1 : 0, transform: `translateY(${step === i ? 0 : step > i ? -30 : 30}px)` }}>
                  <h3 style={{ margin: "0 0 18px", font: `700 clamp(36px,5vw,72px)/1 ${M}`, letterSpacing: "-.045em" }}>{ch.title}</h3>
                  <p style={{ margin: 0, maxWidth: 400, fontSize: "clamp(16px,1.3vw,19px)", lineHeight: 1.6, color: "#d9dfd6" }}>{ch.body}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              {CHAPTERS.map((ch, i) => (
                <span key={ch.title} style={{ height: 2, width: step === i ? 48 : 20, background: step === i ? "#8FA98F" : "#5a5e56", transition: "all .6s" }} />
              ))}
            </div>
          </div>
          <div style={{ position: "relative", height: "min(68vh,620px)" }}>
            {CHAPTERS.map((ch, i) => (
              <div key={ch.title} style={{ position: "absolute", inset: 0, background: TONES[ch.tone][1], transition: "clip-path 1.1s cubic-bezier(.76,0,.24,1),transform 1.4s cubic-bezier(.16,1,.3,1)", clipPath: step >= i ? "inset(0 0 0 0)" : "inset(100% 0 0 0)", transform: `scale(${step === i ? 1 : 1.08})`, }}>
                <Photo photo={CHAPTER_PHOTOS[i]} sizes="(max-width:860px) 90vw, 45vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
