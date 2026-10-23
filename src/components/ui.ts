import type { CSSProperties } from "react";

export const M = "var(--font-manrope)";
export const J = "var(--font-jakarta)";
export const O = "var(--font-outfit)";

export const eyebrow = (color = "#5E6F55"): CSSProperties => ({
  font: `500 12px ${J}`,
  letterSpacing: ".18em",
  textTransform: "uppercase",
  color,
});

export const btnPrimary: CSSProperties = {
  background: "#5E6F55",
  color: "#F6F9F4",
  border: 0,
  font: `600 14px ${J}`,
  letterSpacing: ".02em",
  minHeight: 52,
};

export const gutter = "clamp(20px,5vw,72px)";
