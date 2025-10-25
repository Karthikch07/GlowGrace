export interface CartItem {
  id: string;
  image?: string;
  brand?: string;
  name: string;
  price: number;
  quantity?: number;
}

export function useCart(): {
  items: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
};
