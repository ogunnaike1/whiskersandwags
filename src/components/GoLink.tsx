"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { Magnetic } from "./Motion";

/** Button-styled link that navigates with the router (optionally magnetic). */
export function GoLink({ href, children, style, magnetic = false, className = "hv-charcoal" }: { href: string; children: ReactNode; style?: CSSProperties; magnetic?: boolean; className?: string }) {
  const router = useRouter();
  if (magnetic)
    return (
      <Magnetic className={className} onClick={() => router.push(href)} style={{ border: 0, ...style }}>
        {children}
      </Magnetic>
    );
  return (
    <button className={className} onClick={() => router.push(href)} style={{ border: 0, ...style }}>
      {children}
    </button>
  );
}
