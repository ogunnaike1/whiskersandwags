import type { Metadata } from "next";
import { Manrope, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductDetail from "@/components/ProductDetail";
import Toast from "@/components/Toast";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], weight: ["500", "600", "700"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["300", "400", "500"] });

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Whiskers & Wags — Premium pet lifestyle", template: "%s" },
  description: "Thoughtfully chosen essentials for the pets who make life extraordinary.",
  applicationName: "Whiskers & Wags",
  openGraph: {
    type: "website",
    siteName: "Whiskers & Wags",
    title: "Whiskers & Wags — Premium pet lifestyle",
    description: "Thoughtfully chosen essentials for the pets who make life extraordinary.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${jakarta.variable} ${outfit.variable}`}>
      <body>
        <CartProvider>
          <div style={{ minHeight: "100vh", position: "relative", overflowX: "clip" }}>
            <Nav />
            {children}
            <Footer />
            <CartDrawer />
            <ProductDetail />
            <Toast />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
