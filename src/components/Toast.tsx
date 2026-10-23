"use client";

import { useCart } from "./CartProvider";
import { J } from "./ui";

export default function Toast() {
  const { toast } = useCart();
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed", left: "50%", bottom: 24, zIndex: 120, background: "#2E2E2A", color: "#F6F9F4", padding: "14px 22px", font: `600 13px ${J}`, pointerEvents: "none", whiteSpace: "nowrap",
        transform: `translateX(-50%) translateY(${toast.on ? 0 : 20}px)`, transition: "transform .6s cubic-bezier(.16,1,.3,1),opacity .4s", opacity: toast.on ? 1 : 0,
      }}
    >
      {toast.text}
    </div>
  );
}
