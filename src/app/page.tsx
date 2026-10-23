import HeroCarousel from "@/components/home/HeroCarousel";
import Categories from "@/components/home/Categories";
import Featured from "@/components/home/Featured";
import BrandStory from "@/components/home/BrandStory";
import Lifestyle from "@/components/home/Lifestyle";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <Categories />
      <Featured />
      <BrandStory />
      <Lifestyle />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
