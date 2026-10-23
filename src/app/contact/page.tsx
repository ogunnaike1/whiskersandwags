import type { Metadata } from "next";
import ContactView from "@/components/ContactView";

export const metadata: Metadata = { title: "Contact — Whiskers & Wags" };

export default function ContactPage() {
  return <ContactView />;
}
