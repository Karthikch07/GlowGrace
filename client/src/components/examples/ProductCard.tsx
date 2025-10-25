import { ProductCard } from '../ProductCard';
import productImage from '@assets/stock_images/luxury_beauty_produc_fb9b44be.jpg';

export default function ProductCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ProductCard
        image={productImage}
        brand="Luxe Beauty"
        name="Hydrating Serum with Vitamin C & Hyaluronic Acid"
        rating={4.5}
        reviews={234}
        price={49.99}
        originalPrice={79.99}
      />
    </div>
  );
}
