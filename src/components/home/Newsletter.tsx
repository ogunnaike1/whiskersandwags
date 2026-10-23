"use client";

import { useState } from "react";
import { emailOk } from "@/lib/data";
import { Parallax, Reveal } from "../Motion";
import { J, M } from "../ui";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const bad = state === "error";
  return (
    <section style={{ position: "relative", background: "#D7E4D6", padding: "clamp(48px,7vw,100px) clamp(20px,5vw,72px)", overflow: "hidden" }}>
      <Parallax speed={0.08} style={{ position: "absolute", right: "-6%", top: "-20%", width: "46vw", maxWidth: 620, aspectRatio: "1", background: "#8FA98F", borderRadius: "50%" }} />
      <Reveal style={{ position: "relative", maxWidth: 1000, margin: "0 auto", padding: "clamp(28px,5vw,64px)", background: "rgba(255,255,255,.5)", backdropFilter: "blur(22px) saturate(1.3)", WebkitBackdropFilter: "blur(22px) saturate(1.3)", border: "1px solid rgba(255,255,255,.75)", boxShadow: "0 30px 80px rgba(34,37,33,.10)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 32, alignItems: "center" }}>
        <div>
          <h2 style={{ margin: "0 0 12px", font: `700 clamp(30px,3.8vw,52px)/1.05 ${M}`, letterSpacing: "-.04em" }}>
            Letters from <span style={{ font: `300 1.05em ${M}`, color: "#5E6F55" }}>the pack</span>
          </h2>
          <p style={{ margin: 0, color: "#4a4d47", lineHeight: 1.55 }}>New arrivals and care notes, once a month. Never more.</p>
        </div>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            setState(emailOk(email) ? "done" : "error");
          }}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <input
              type="email"
              aria-label="Email address"
              aria-invalid={bad}
              placeholder="you@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
              style={{ flex: "1 1 200px", minWidth: 0, padding: "16px 18px", border: `1.5px solid ${bad ? "#B4482A" : "transparent"}`, background: "rgba(255,255,255,.8)", fontSize: 15, minHeight: 52 }}
            />
            <button type="submit" className="hv-charcoal" style={{ background: "#5E6F55", color: "#F6F9F4", border: 0, padding: "0 26px", font: `600 14px ${J}`, minHeight: 52 }}>Subscribe</button>
          </div>
          <div aria-live="polite" style={{ fontSize: 13, minHeight: 18, color: bad ? "#B4482A" : "#4a4d47" }}>
            {bad ? "Please enter a valid email address." : state === "done" ? "Thanks — demo only: no email service is connected, so nothing was stored." : ""}
          </div>
        </form>
      </Reveal>
    </section>
  );
}
