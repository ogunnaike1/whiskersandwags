"use client";

import { motion } from "motion/react";
import { Parallax } from "./Motion";
import Photo from "./Photo";
import { ABOUT_PHOTOS } from "@/lib/images";
import { M, eyebrow } from "./ui";

export default function AboutHero() {
  return (
    <section className="on-dark" style={{ position: "relative", height: "min(88vh,860px)", minHeight: 520, overflow: "hidden", background: "#2E2E2A", color: "#F6F9F4" }}>
      <Parallax speed={0.12} style={{ position: "absolute", inset: "-12% 0", background: "#33372f" }}>
        <Photo photo={ABOUT_PHOTOS.hero} sizes="100vw" priority />
      </Parallax>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(24px,5vw,72px)", background: "linear-gradient(transparent,rgba(34,37,33,.85))" }}>
        <div style={{ ...eyebrow("#8FA98F"), marginBottom: 16 }}>About us</div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ margin: 0, maxWidth: 1000, font: `700 clamp(44px,8.5vw,130px)/.95 ${M}`, letterSpacing: "-.05em" }}
        >
          Made for the ones who <span style={{ font: `300 1.05em ${M}`, color: "#8FA98F" }}>wait by the door.</span>
        </motion.h1>
      </div>
    </section>
  );
}
