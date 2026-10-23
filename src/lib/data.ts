export type Category = "Dogs" | "Cats" | "Toys & Enrichment" | "Beds & Comfort" | "Accessories";
export type Tone = "sage" | "sand" | "terra";

export interface Product {
  id: number;
  name: string;
  cat: Category;
  price: number;
  tag?: string;
  tone: Tone;
  desc: string;
  details: string[];
}

export const CATS: Category[] = ["Dogs", "Cats", "Toys & Enrichment", "Beds & Comfort", "Accessories"];
export const CAT_SPAN: Record<Category, number> = {
  Dogs: 2,
  Cats: 1,
  "Toys & Enrichment": 1,
  "Beds & Comfort": 1,
  Accessories: 2,
};
export const CAT_TONE: Record<Category, Tone> = {
  Dogs: "sand",
  Cats: "sage",
  "Toys & Enrichment": "terra",
  "Beds & Comfort": "sand",
  Accessories: "sage",
};

/** [solid, striped placeholder] — swap for next/image once photography exists. */
export const TONES: Record<Tone, [string, string]> = {
  sage: ["#8FA98F", "repeating-linear-gradient(45deg,#8FA98F 0 14px,#839C83 14px 28px)"],
  sand: ["#D7E4D6", "repeating-linear-gradient(135deg,#D7E4D6 0 14px,#C5D6C4 14px 28px)"],
  terra: ["#B7CBB5", "repeating-linear-gradient(45deg,#B7CBB5 0 14px,#AFC4AD 14px 28px)"],
};

const PRODUCTS: Product[] = [
  { id: 1, name: "Merino Walking Harness", cat: "Dogs", price: 68, tag: "New", tone: "sage", desc: "A soft, structured harness with a no-pull front clip and merino-lined chest panel for all-day comfort.", details: ["Merino wool lining", "Rust-proof brass hardware", "Sizes XS–XL"] },
  { id: 2, name: "Oak & Wool Cat Perch", cat: "Cats", price: 124, tone: "sand", desc: "A sculptural window perch in solid oak with a removable felted wool cushion.", details: ["FSC-certified oak", "Holds up to 9 kg", "Machine-washable cushion"] },
  { id: 3, name: "Natural Rope Tug", cat: "Toys & Enrichment", price: 24, tone: "terra", desc: "Hand-knotted cotton rope for tug, fetch and gentle chewing.", details: ["Undyed organic cotton", "Hand-knotted", "Two sizes"] },
  { id: 4, name: "Linen Cloud Bed", cat: "Beds & Comfort", price: 148, tag: "Bestseller", tone: "sand", desc: "Deep, supportive and washable — a bed that looks as good as it feels.", details: ["Stonewashed linen cover", "Recycled fibre fill", "Removable, washable"] },
  { id: 5, name: "Vegetable-tan Leather Collar", cat: "Accessories", price: 56, tone: "terra", desc: "Cut from a single hide and finished by hand. It patinas beautifully with age.", details: ["Italian leather", "Solid brass buckle", "Sizes S–L"] },
  { id: 6, name: "Slow-Feed Puzzle Bowl", cat: "Toys & Enrichment", price: 38, tone: "sage", desc: "Turns mealtime into a calm, rewarding game and slows fast eaters.", details: ["Food-safe ceramic", "Dishwasher safe", "Non-slip base"] },
  { id: 7, name: "Stoneware Water Bowl", cat: "Accessories", price: 42, tone: "sand", desc: "A weighty, glazed bowl that stays put and stays cool.", details: ["Lead-free glaze", "Dishwasher safe", "Holds 900 ml"] },
  { id: 8, name: "Bouclé Cat Cave", cat: "Beds & Comfort", price: 96, tag: "New", tone: "sage", desc: "A cosy hideaway in textured bouclé with a pillow-soft floor.", details: ["Bouclé exterior", "Removable cushion", "Spot-clean"] },
  { id: 9, name: "Waxed Canvas Leash", cat: "Dogs", price: 48, tone: "terra", desc: "A supple, weatherproof leash with a padded grip that softens with use.", details: ["Waxed cotton canvas", "1.5 m length", "Brass clip"] },
  { id: 10, name: "Catnip Felt Set", cat: "Cats", price: 22, tone: "sage", desc: "Three wool-felt toys stuffed with organic catnip.", details: ["100% wool felt", "Organic catnip", "Set of three"] },
  { id: 11, name: "Orthopedic Lounger", cat: "Beds & Comfort", price: 189, tone: "sand", desc: "Memory-foam support for senior dogs and big sleepers.", details: ["Medical-grade foam", "Water-resistant base", "Washable cover"] },
  { id: 12, name: "Sisal Scratch Arc", cat: "Cats", price: 64, tone: "terra", desc: "An arched scratcher in natural sisal that doubles as a lounge.", details: ["Natural sisal", "Solid base", "Quiet, stable"] },
];

/* Data-access layer — swap the bodies for real backend calls later. */
export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}
export function getProductSync(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
export function getProductsSync(): Product[] {
  return PRODUCTS;
}

export const QUOTES = [
  { text: "Moss hasn’t left the Linen Cloud Bed since it arrived. I’m not sure I’m allowed on the sofa anymore.", who: "Sample reviewer A.", pet: "Moss, Labrador" },
  { text: "The leather collar looks better every month. Finally, something that matches the house.", who: "Sample reviewer B.", pet: "Juniper, Whippet" },
  { text: "Our two cats fought over the oak perch for a week. We ordered a second one.", who: "Sample reviewer C.", pet: "Pip & Olive, Tabbies" },
];

export const CHAPTERS: { title: string; body: string; tone: Tone; ph: string }[] = [
  { title: "Morning light.", body: "Slow starts, warm floors and a favourite spot by the window.", tone: "sand", ph: "PHOTO · dog stretching on rug" },
  { title: "Out the door.", body: "Leashes, harnesses and collars made for the long way round.", tone: "sage", ph: "PHOTO · walk, autumn path" },
  { title: "Home again.", body: "Beds and bowls that belong in the room, not hidden from it.", tone: "terra", ph: "PHOTO · cat curled in a cave bed" },
];

export const FAQS: [string, string][] = [
  ["How long does delivery take?", "Orders ship within two working days. Standard delivery takes 3–5 days; express arrives next day. (Demo copy.)"],
  ["What is your returns policy?", "Unused items can be returned within 30 days for a full refund. Beds must be unwashed. (Demo copy.)"],
  ["How do I choose the right size?", "Each product page lists sizing. Measure your pet’s chest or length and email us if they sit between sizes."],
  ["Are your materials pet-safe?", "Everything is tested for pets and made with natural, food-safe or undyed materials wherever possible."],
];

export const HERO: { tag: string; l: string[]; desc: string; cta: string; cat: Category | ""; ft: number; bg: string }[] = [
  { tag: "01 — Dogs", l: ["Walks worth", "wandering."], desc: "Harnesses, leashes and collars made for the long way home.", cta: "Shop for dogs", cat: "Dogs", ft: 0, bg: "repeating-linear-gradient(135deg,#6f8566 0 18px,#667c5e 18px 36px)" },
  { tag: "02 — Cats", l: ["Quiet corners,", "perfectly claimed."], desc: "Perches, caves and scratchers designed for how cats actually live.", cta: "Shop for cats", cat: "Cats", ft: 1, bg: "repeating-linear-gradient(45deg,#7d977d 0 18px,#738d73 18px 36px)" },
  { tag: "03 — Comfort", l: ["Rest, beautifully", "made."], desc: "Linen beds and loungers that belong in the room, not hidden from it.", cta: "Shop beds", cat: "Beds & Comfort", ft: 3, bg: "repeating-linear-gradient(135deg,#566a4f 0 18px,#4f6249 18px 36px)" },
  { tag: "04 — Our story", l: ["Because they’re", "family."], desc: "Honest materials and quiet design for the whole household.", cta: "Our story", cat: "", ft: 5, bg: "repeating-linear-gradient(45deg,#8aa38a 0 18px,#809980 18px 36px)" },
];

export const PHILOSOPHY = [
  { n: "01", t: "Fewer, better.", b: "We stock what we’d buy ourselves — and stop there." },
  { n: "02", t: "Honest materials.", b: "Wool, oak, linen, leather. Things that age well instead of wearing out." },
  { n: "03", t: "Pets first.", b: "Comfort and safety lead every decision. Design follows." },
];

export const STATS = [
  { v: 12000, suf: "+", l: "Happy pets (demo figure)" },
  { v: 48, suf: "", l: "Considered products" },
  { v: 9, suf: "", l: "Independent makers" },
  { v: 100, suf: "%", l: "Pet-safe materials" },
];

export const NAV: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const fmt = (n: number) => "$" + n.toFixed(n % 1 ? 2 : 0);
export const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
