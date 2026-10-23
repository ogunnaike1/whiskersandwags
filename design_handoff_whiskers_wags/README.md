# Handoff: Whiskers & Wags — Premium Pet Lifestyle Site

## Overview
Four-page premium pet e-commerce/lifestyle site (Home, Shop, About, Contact) with cart, product detail, animated hero carousel and scroll-driven motion. Target stack requested: **Next.js (App Router) + TypeScript + Tailwind + Motion + shadcn/ui + Lucide**.

## About the Design Files
`Whiskers-and-Wags.dc.html` is a **design reference built in HTML** — a working prototype of intended look and behavior, not production code. Recreate it in Next.js using that codebase's patterns. All state, data and handlers live in the single file's logic class (bottom of file); markup is inline-styled.

## Fidelity
**High-fidelity** for layout, color, type, motion and interaction. **Imagery is placeholder** (striped blocks with captions) — replace with real dog/cat/lifestyle photography via `next/image`, consistent aspect ratios and lighting.

## Design Tokens
Colors (Sage & Forest): Soft White `#F6F9F4` (bg) · Mint `#D7E4D6` (soft sections/cards) · Sage `#8FA98F` (brand, accents on dark) · Forest `#5E6F55` (buttons, accents, links; white text on it) · Charcoal `#2E2E2A` (text, dark sections). Muted text `#4a4d47` / `#6b6a60`. Error `#B4482A`. Placeholder stripes: mint/sage/forest tints in 135°/45° repeating gradients.

Typography (only these three):
- **Manrope** — headlines/section titles: weight 700, letter-spacing −.04 to −.05em, line-height .95–1.05; sizes `clamp(34px,4.6vw,68px)` sections, `clamp(44px,8vw,120px)` page heroes, `clamp(42px,7vw,104px)` carousel. Accent words: Manrope 300, forest.
- **Plus Jakarta Sans** — nav (600/14px), buttons (600/14px, .02em), product titles (700/17px), eyebrows (500/12px, uppercase, .18em).
- **Outfit** — body (300–400, 16–19px, line-height 1.6), captions/labels (11px, .08–.14em).

Spacing: page gutter `clamp(20px,5vw,72px)`; section padding `clamp(56px,8vw,120px)` vertical; grid gaps 14–40px. Radius: mostly 0 (editorial); circles/arch only for decorative. Glass: `rgba(255,255,255,.5–.55)` (light) / `rgba(246,249,244,.14)` (on dark), `backdrop-filter: blur(16–22px) saturate(1.3–1.5)`, 1px border `rgba(255,255,255,.7)`/`rgba(246,249,244,.28)`, shadow `0 18–30px 50–80px rgba(46,46,42,.10–.18)`.
Easings: reveal `cubic-bezier(.16,1,.3,1)`; masks/wipes `cubic-bezier(.76,0,.24,1)`.

## Screens / Views
**Global nav** (sticky): wordmark "Whiskers & Wags" (Manrope 700 20px, "&" Manrope 300 forest); links Home/Shop/About/Contact with animated underline on active; search icon (→ Shop, focuses search), cart icon with live count badge. Transparent at top; after 30px scroll: `rgba(246,249,244,.72)` + blur 16px + hairline border. <860px: hamburger → full-screen charcoal menu revealed by `clip-path inset(0 0 100% 0)→inset(0)` .7s, links 44–72px staggered in.

**Home**
1. *Hero carousel* — full-width, height `calc(100vh − 80px)` (min 580, max 1000). 4 slides: Dogs "Walks worth wandering." / Cats "Quiet corners, perfectly claimed." / Comfort "Rest, beautifully made." / Our story "Because they're family." Each: tag, 2-line headline (line masks), description, CTA (Shop for dogs/cats/beds → filtered Shop; Our story → About). Transition: incoming image wipes via clip-path 1.5s, scale 1.2→1 over 2.6s, outgoing drifts 5% and scales 1.06; text lines slide up from 112% with 120ms stagger (start .4–.5s). Parallax: whole image stack scrolls at 0.06 speed; pointer shifts image layer ±17px/11px (desktop). Bottom-left glass bar: prev/next (44px), 01–04 indicators each with 2px progress fill (5.6s linear) — active indicator 72px wide (44 mobile). Bottom-right glass "Featured" card (desktop) opens product detail. Autoplay 5.6s (paused on hidden tab; off with reduced motion); manual nav resets timer; touch swipe >50px.
2. *Categories* — 5 image cards (Dogs, Cats, Toys & Enrichment, Beds & Comfort, Accessories), rows height `clamp(260px,30vw,380px)`, Dogs/Accessories span 2 cols. Hover: image scale 1.06 (1.1s), arrow nudges and turns forest. Click → Shop filtered.
3. *Featured products* — 6 cards, 4:5 image, name/category/price; hover zooms image and slides up "Quick add — $X" button (always visible <900px); optional tag (New/Bestseller).
4. *Brand story* — sage bg split: masked/parallax photo + small offset photo; "Because They're Family."; two paragraphs; CTA.
5. *Lifestyle showcase* — charcoal; oversized "Slow mornings." (up to 240px) with two photos and a glass note moving at different parallax speeds (±0.04–0.12); then **sticky storytelling**: 320vh tall, 100vh sticky stage, 3 chapters (Morning light / Out the door / Home again) switched by scroll progress (text fade/translate .8s, image clip-path reveal 1.1s, counter 01/03, progress bars).
6. *Testimonials* — centered serif-weight quote slider (3 items, prev/next, fade .35s). **Demo content — labelled; replace with real reviews.**
7. *Newsletter* — mint bg, glass panel, email validation; states idle/error/done. No backend: done message says nothing was stored.

**Shop** — hero heading "Everyday essentials."; sticky toolbar (top 80px): search input, sort select (Featured, price asc/desc, A–Z), category chips (All + 5); on <860px chips collapse behind a "Filters" button. Result count; responsive grid `repeat(auto-fill,minmax(260px,1fr))`; empty state with Clear filters. Product detail modal (image, category, name, price, description, bullet details, qty stepper, Add to cart → closes and opens cart).

**Cart drawer** — right, `min(100%,440px)`, slide .7s; scrim; line items (thumb, name, category, line total, −/+ qty, Remove); subtotal; free-shipping note (≥$60); Checkout is a stub ("payments aren't connected"). Persisted to `localStorage` key `ww-cart` (`[{id,qty}]`). Toast on add.

**About** — cinematic hero (88vh, image parallax 0.12, headline "Made for the ones who wait by the door."); mission statement; 12-col image composition (7/5 cols, offset) with mask reveals; philosophy (3 numbered columns on mint); stats on charcoal with count-up (12,000+ [demo], 48, 9, 100%) — illustrative, replace with real data; closing CTA.

**Contact** — hero "Say hello." with floating glass contact card (email, Instagram/Pinterest/TikTok placeholders); form: name (≥2 chars), email (regex), message (≥10 chars); inline errors under fields (underline turns `#B4482A`, `aria-invalid`); states idle/error/sending(900ms)/done. Done message is honest: no mail service connected, message not sent. FAQ accordion (4 items; grid-rows 0fr→1fr .6s, "+" rotates 45°).

**Footer** — charcoal, 5 columns (brand, Explore, Shop categories, Connect), legal line.

## Interactions & Behavior
- Scroll reveals: elements translateY(28px)+fade (.9–1.1s), sibling stagger 70ms (max 5); image masks via `clip-path inset(0 0 100% 0)→inset(0)` 1.3s; IntersectionObserver threshold .12.
- Magnetic buttons (desktop >900px): translate by 22% x / 30% y of pointer offset, reset on leave.
- Parallax via `data-speed` × (element-centre − viewport-centre), translate3d, passive scroll.
- Page transitions: route change scrolls top and replays entrance; implement with Motion `AnimatePresence`.
- `prefers-reduced-motion`: no parallax/reveals/autoplay/magnetic; transitions ~0.
- Min touch target 44px; visible keyboard focus should be added (prototype relies on defaults).

## State Management
Page/route; scrolled; menu open; cart `[{id,qty}]` + drawer open; detail product + qty; shop `q`, `cat`, `sort`, filtersOpen; carousel `hs`, `hp`, `dir`; story step (from scroll progress); testimonial index; FAQ open index; newsletter `{email,state}`; contact `{fields, errors, status}`. Map to Next.js: routes `/`, `/shop`, `/about`, `/contact`; cart in context + localStorage; product data typed (`Product {id,name,cat,price,tag?,desc,details[]}`) from a local module behind a data-access layer ready for a real backend.

## Assets
No photography included. Required image slots (consistent warm natural light, same ratios): hero ×4 (16:9+), 5 category (4:5ish), 12 product (4:5), brand story 4:5 + 1:1, lifestyle 3:4 + 4:3, story chapters ×3, about hero 16:9 + 4:3 + 3:4. Icons: Lucide (search, shopping-bag, menu, x, arrow-left/right).

## Files
- `Whiskers-and-Wags.dc.html` — full prototype (template + logic class `Component`; data constants `PRODUCTS`, `HERO`, `QUOTES`, `CHAPTERS`, `FAQS` at top of script).
