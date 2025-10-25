import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "../lib/format";
import { useCart } from "@/lib/cart";

interface ProductCardProps {
  image: string;
  brand: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  onAddToCart?: () => void;
}

export function ProductCard({
  image,
  brand,
  name,
  rating,
  reviews,
  price,
  originalPrice,
  onAddToCart,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const existing = items.find((p) => p.id === name || p.name === name);
  const qty = existing ? (existing.quantity || 1) : 0;

  return (
    <Card 
      className="overflow-hidden group cursor-pointer hover-elevate transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="aspect-square overflow-hidden relative bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <Badge variant="destructive" className="absolute top-4 left-4" data-testid="badge-discount">
            -{discount}%
          </Badge>
        )}
        {/* Removed floating image overlay — add controls are rendered inline next to the product name */}
      </div>
      <div className="p-4 space-y-2">
        <div className="text-sm text-muted-foreground">{brand}</div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-medium line-clamp-2 min-h-[2.5rem]">{name}</h3>
          <div className="flex items-center gap-2">
            {qty > 0 ? (
              <div className="inline-flex items-center border rounded-md overflow-hidden">
                <button
                  aria-label={`decrease-${name}`}
                  className="px-2 py-1 hover:bg-muted"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (existing) {
                      if ((existing.quantity || 1) <= 1) {
                        removeFromCart(existing.id ?? name);
                      } else {
                        updateQuantity(existing.id ?? name, -1);
                      }
                    }
                  }}
                >
                  −
                </button>
                <div className="px-3 py-1">{qty}</div>
                <button
                  aria-label={`increase-${name}`}
                  className="px-2 py-1 hover:bg-muted"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(existing ? (existing.id ?? name) : name, 1);
                  }}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary text-white hover:opacity-90"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({ id: name, image, brand, name, price }, 1);
                  onAddToCart?.();
                }}
                data-testid={`button-add-to-cart-inline-${name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <ShoppingCart className="h-4 w-4" />
                Add
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">{formatCurrency(price)}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatCurrency(originalPrice)}</span>
          )}
        </div>
      </div>
    </Card>
  );
}
