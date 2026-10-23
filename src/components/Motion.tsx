"use client";

import { motion, useInView, useReducedMotion as useFmReduced } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useParallax, useWidth } from "./hooks";

const EASE = [0.16, 1, 0.3, 1] as const;
const WIPE = [0.76, 0, 0.24, 1] as const;

/** Scroll reveal: fade + 28px rise, or a clip-path mask wipe. `index` staggers siblings (70ms, max 5). */
export function Reveal({
  children,
  index = 0,
  mask = false,
  style,
  as = "div",
}: {
  children: ReactNode;
  index?: number;
  mask?: boolean;
  style?: CSSProperties;
  as?: "div" | "p" | "h2" | "article" | "button";
}) {
  const reduced = useFmReduced();
  const M = motion[as] as typeof motion.div;
  if (reduced) return <M style={style}>{children}</M>;
  const delay = Math.min(index, 5) * 0.07;
  return (
    <M
      style={style}
      initial={mask ? { clipPath: "inset(0 0 100% 0)" } : { opacity: 0, y: 28 }}
      whileInView={mask ? { clipPath: "inset(0 0 0% 0)" } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -6% 0px" }}
      transition={
        mask
          ? { duration: 1.3, ease: WIPE }
          : { opacity: { duration: 0.9, ease: EASE, delay }, y: { duration: 1.1, ease: EASE, delay } }
      }
    >
      {children}
    </M>
  );
}

export function Parallax({ speed, style, children }: { speed: number; style?: CSSProperties; children?: ReactNode }) {
  const ref = useParallax<HTMLDivElement>(speed);
  return (
    <div ref={ref} style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}

/** Button that drifts toward the pointer (desktop only). */
export function Magnetic({
  children,
  style,
  className,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const w = useWidth();
  const reduced = useFmReduced();
  const on = !reduced && w > 900;
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      className={className}
      style={{ ...style, transition: "transform .25s cubic-bezier(.16,1,.3,1), background .3s, color .3s" }}
      onPointerMove={(e) => {
        if (!on || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        ref.current.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px,${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </button>
  );
}

export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useFmReduced();
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    if (!inView) return;
    if (reduced) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 1600);
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to]);
  return <span ref={ref}>{(reduced ? to : (n ?? 0)).toLocaleString("en-US")}</span>;
}
