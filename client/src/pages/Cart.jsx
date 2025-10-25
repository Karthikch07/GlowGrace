import { useCart } from "../lib/cart.jsx";
import { Button } from "../components/ui/button";
import { formatCurrency } from "../lib/format";
import { useLocation } from "wouter";

export default function CartPage() {
  const { items, removeFromCart, clearCart, updateQuantity } = useCart();
  const [, setLocation] = useLocation();

  const subtotal = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);
  const taxRate = 0.08; 
  const shipping = subtotal > 0 ? 5.0 : 0.0;
  const tax = +(subtotal * taxRate).toFixed(2);
  const total = +(subtotal + tax + shipping).toFixed(2);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-muted-foreground">Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-4">
              <img src={it.image} alt={it.name} className="w-20 h-20 object-contain rounded bg-muted p-1" />
              <div className="flex-1">
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-muted-foreground">{it.brand}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">{formatCurrency(it.price)}</div>
                <div className="text-sm text-muted-foreground text-center">Qty: {it.quantity}</div>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(it.id, -1)}
                    disabled={it.quantity <= 1}
                    aria-label={`Decrease quantity of ${it.name}`}
                    className="transition-transform active:scale-95"
                  >
                    -
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(it.id, 1)}
                    aria-label={`Increase quantity of ${it.name}`}
                    className="transition-transform active:scale-95"
                  >
                    +
                  </Button>
                </div>
                <div className="mt-2 flex items-center justify-center">
                  <Button variant="ghost" onClick={() => removeFromCart(it.id)} aria-label={`Remove ${it.name}`}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col items-end gap-4">
            <div className="w-full md:w-1/3 p-4 bg-muted/10 rounded">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Tax (5%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Shipping</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
              <div className="h-px bg-border my-3" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 w-full md:w-1/3">
              <Button variant="outline" onClick={clearCart} aria-label="Clear cart">Clear Cart</Button>
              <Button onClick={() => setLocation('/checkout')} aria-label="Proceed to checkout">Checkout</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
