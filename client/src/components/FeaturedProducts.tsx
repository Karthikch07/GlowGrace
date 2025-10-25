import { ProductCard } from "./ProductCard";
import { allProducts } from "@/lib/catalog";
import { useCart } from "@/lib/cart";


const featuredProducts = allProducts.slice(0, 4);

export function FeaturedProducts() {
  const { addToCart } = useCart();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
              Trending Products
            </h2>
            <p className="text-muted-foreground text-lg">
              Popular picks from our product catalog — visit the Products page to see everything
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={index} {...product} onAddToCart={() => addToCart(product)} />
          ))}
        </div>
      </div>
    </section>
  );
}
