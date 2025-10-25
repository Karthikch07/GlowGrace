import { Hero } from "@/components/Hero";
import { CategorySection } from "@/components/CategorySection";
import { FeaturedServices } from "@/components/FeaturedServices";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <CategorySection />
      <FeaturedServices />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}
