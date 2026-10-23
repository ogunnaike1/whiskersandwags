"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { FAQS, emailOk } from "@/lib/data";
import { Reveal } from "./Motion";
import { J, M, eyebrow } from "./ui";

type Errs = { name?: string; email?: string; message?: string };

export default function ContactView() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState<Errs>({});
  const [state, setState] = useState<"idle" | "error" | "sending" | "done">("idle");
  const [status, setStatus] = useState("");
  const [faq, setFaq] = useState(-1);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Errs = {};
    if (f.name.trim().length < 2) er.name = "Please enter your name.";
    if (!emailOk(f.email)) er.email = "Enter a valid email address.";
    if (f.message.trim().length < 10) er.message = "Tell us a little more (10+ characters).";
    if (Object.keys(er).length) {
      setErr(er);
      setState("error");
      setStatus("Please fix the highlighted fields.");
      return;
    }
    setErr({});
    setState("sending");
    setStatus("");
    setTimeout(() => {
      setState("done");
      setStatus("Looks good — but this demo has no mail service connected, so your message was not sent. Please email hello@whiskersandwags.example directly.");
    }, 900);
  };

  const field = (k: keyof Errs) => ({
    "aria-invalid": !!err[k],
    "aria-describedby": `e-${k}`,
    style: { width: "100%", padding: "14px 0", border: 0, borderBottom: `1.5px solid ${err[k] ? "#B4482A" : "#2E2E2A"}`, background: "none", fontSize: 16, minHeight: 48 } as const,
  });
  const lbl = { display: "block", font: `600 13px ${J}`, marginBottom: 8 } as const;
  const errStyle = { color: "#B4482A", fontSize: 13, minHeight: 16, marginTop: 4 } as const;
  const sending = state === "sending";

  return (
    <main>
      <section style={{ position: "relative", padding: "clamp(40px,6vw,90px) clamp(20px,5vw,72px) clamp(56px,8vw,100px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: "clamp(32px,5vw,80px)", alignItems: "start", maxWidth: 1500, margin: "0 auto" }}>
        <div>
          <div style={{ ...eyebrow(), marginBottom: 18 }}>Contact</div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} style={{ margin: "0 0 28px", font: `700 clamp(44px,7vw,104px)/.97 ${M}`, letterSpacing: "-.05em" }}>
            Say <span style={{ font: `300 1.05em ${M}`, color: "#5E6F55" }}>hello.</span>
          </motion.h1>
          <p style={{ maxWidth: 420, lineHeight: 1.6, color: "#4a4d47", margin: "0 0 36px" }}>Questions about sizing, an order, or which bed suits a senior dog? We read everything.</p>
          <div style={{ position: "relative", isolation: "isolate", maxWidth: 440, padding: "26px 28px", background: "rgba(255,255,255,.55)", backdropFilter: "blur(18px) saturate(1.3)", WebkitBackdropFilter: "blur(18px) saturate(1.3)", border: "1px solid rgba(255,255,255,.8)", boxShadow: "0 24px 60px rgba(34,37,33,.10)" }}>
            <div style={{ position: "absolute", zIndex: -1, right: -30, top: -30, width: 120, height: 120, borderRadius: "50%", background: "#8FA98F" }} />
            <div style={{ font: "400 11px var(--font-outfit)", color: "#5E6F55", marginBottom: 10 }}>DIRECT</div>
            <a href="mailto:hello@whiskersandwags.example" style={{ font: `700 20px ${J}`, letterSpacing: "-.02em", color: "#2E2E2A", wordBreak: "break-word" }}>hello@whiskersandwags.example</a>
            <div style={{ fontSize: 13, color: "#6b6a60", margin: "6px 0 18px" }}>Replies within one working day (demo address).</div>
            <div style={{ display: "flex", gap: 18, font: `600 13px ${J}` }}>
              <a href="#">Instagram</a>
              <a href="#">Pinterest</a>
              <a href="#">TikTok</a>
            </div>
          </div>
        </div>
        <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 22, background: "#fff", padding: "clamp(24px,3.5vw,48px)", border: "1px solid #D7E4D6" }}>
          <div>
            <label htmlFor="f-name" style={lbl}>Name</label>
            <input id="f-name" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} {...field("name")} />
            <div id="e-name" style={errStyle}>{err.name}</div>
          </div>
          <div>
            <label htmlFor="f-email" style={lbl}>Email</label>
            <input id="f-email" type="email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} {...field("email")} />
            <div id="e-email" style={errStyle}>{err.email}</div>
          </div>
          <div>
            <label htmlFor="f-msg" style={lbl}>Message</label>
            <textarea id="f-msg" rows={5} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} {...field("message")} style={{ ...field("message").style, resize: "vertical", minHeight: undefined }} />
            <div id="e-message" style={errStyle}>{err.message}</div>
          </div>
          <button type="submit" disabled={sending} className="hv-charcoal" style={{ alignSelf: "flex-start", background: "#5E6F55", color: "#F6F9F4", border: 0, padding: "0 32px", font: `600 14px ${J}`, minHeight: 52, opacity: sending ? 0.6 : 1 }}>
            {sending ? "Sending…" : "Send message"}
          </button>
          <div aria-live="polite" style={{ fontSize: 14, lineHeight: 1.5, padding: "14px 16px", background: "#D7E4D6", display: status ? "block" : "none" }}>{status}</div>
        </form>
      </section>
      <section style={{ background: "#D7E4D6", padding: "clamp(56px,8vw,120px) clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Reveal as="h2" style={{ margin: "0 0 36px", font: `700 clamp(32px,4vw,56px)/1 ${M}`, letterSpacing: "-.04em" }}>Good to know</Reveal>
          {FAQS.map(([q, a], i) => {
            const open = faq === i;
            return (
              <div key={q} style={{ borderTop: "1.5px solid #2E2E2A" }}>
                <button onClick={() => setFaq(open ? -1 : i)} aria-expanded={open} aria-controls={`faq-${i}`} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, background: "none", border: 0, padding: "24px 0", textAlign: "left", font: `700 clamp(17px,1.8vw,22px) ${J}`, letterSpacing: "-.02em", color: "#2E2E2A", minHeight: 56 }}>
                  {q}
                  <span aria-hidden style={{ font: `300 28px ${M}`, color: "#5E6F55", transition: "transform .5s cubic-bezier(.16,1,.3,1)", transform: `rotate(${open ? 45 : 0}deg)` }}>+</span>
                </button>
                <div id={`faq-${i}`} role="region" style={{ display: "grid", transition: "grid-template-rows .6s cubic-bezier(.16,1,.3,1)", gridTemplateRows: open ? "1fr" : "0fr" }}>
                  <div style={{ overflow: "hidden" }}>
                    <p style={{ margin: 0, padding: "0 0 26px", maxWidth: 640, lineHeight: 1.65, color: "#4a4d47" }}>{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: "1.5px solid #2E2E2A" }} />
        </div>
      </section>
    </main>
  );
}
