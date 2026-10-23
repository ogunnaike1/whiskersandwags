/** Photography slots → files in /public/images. Credits: see public/images/CREDITS.md */
export interface Photo {
  src: string;
  alt: string;
  /** CSS object-position for cropping into wide/tall frames */
  pos?: string;
}

const img = (name: string, alt: string, pos?: string): Photo => ({ src: `/images/${name}.jpg`, alt, pos });

export const HERO_PHOTOS: Photo[] = [
  img("hero-dogs", "Someone walking their dog on a lead along an autumn path", "50% 55%"),
  img("hero-cats", "A long-haired cat sitting calmly on a bed", "50% 45%"),
  img("hero-comfort", "A dog resting on a bed in a bright, quiet room", "50% 62%"),
  img("hero-story", "A dog on a cushion in a sunlit living room", "50% 60%"),
];

export const CATEGORY_PHOTOS: Record<string, Photo> = {
  Dogs: img("cat-dogs", "A dog on a lead beside its owner", "50% 35%"),
  Cats: img("cat-cats", "A tabby cat asleep on a slatted wooden bench"),
  "Toys & Enrichment": img("cat-toys", "A pug playing with a rope toy", "50% 40%"),
  "Beds & Comfort": img("cat-beds", "A curly-coated dog lying on a white bed"),
  Accessories: img("cat-accessories", "A black dog wearing a red collar"),
};

export const PRODUCT_PHOTOS: Record<number, Photo> = {
  1: img("p1", "A dog in a bright harness out on a walk", "50% 40%"),
  2: img("p2", "A tabby cat resting on a cushioned wooden perch"),
  3: img("p3", "A pug tugging a knotted rope toy", "50% 40%"),
  4: img("p4", "A dog curled up on striped linen bedding", "50% 40%"),
  5: img("p5", "A tan leather collar on a white dog form"),
  6: img("p6", "A dog eating from a pale ceramic bowl"),
  7: img("p7", "A puppy drinking from a bowl on the floor", "50% 55%"),
  8: img("p8", "A cat peeking out of a felted cave bed", "50% 40%"),
  9: img("p9", "A small dog on a lead walking along a pavement"),
  10: img("p10", "A kitten in a basket on a bright blanket"),
  11: img("p11", "A pug lying in a cushioned dog bed", "50% 45%"),
  12: img("p12", "A cat beside a sisal scratching post"),
};

export const BRAND_PHOTOS = {
  main: img("brand-main", "A woman in a long coat walking her dalmatian by a lake", "50% 50%"),
  detail: img("brand-detail", "A dog wearing a collar, close up"),
};

export const LIFE_PHOTOS = {
  cat: img("life-cat", "A cat resting on a sunlit windowsill"),
  dog: img("life-dog", "A beagle asleep on soft white linen"),
};

export const CHAPTER_PHOTOS: Photo[] = [
  img("chapter-1", "A dog stretching out on a bed in morning light", "50% 55%"),
  img("chapter-2", "A dog sitting beside its owner outdoors", "50% 35%"),
  img("chapter-3", "A tabby cat curled up on soft bedding", "50% 50%"),
];

export const ABOUT_PHOTOS = {
  hero: img("about-hero", "A woman walking her dog beside a lake", "50% 55%"),
  studio: img("about-studio", "A small dog lying on a cushion at home", "50% 45%"),
  cat: img("about-cat", "A cat curled in a basket with a woollen blanket", "50% 40%"),
};
