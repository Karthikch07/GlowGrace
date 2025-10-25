import { useEffect, useState } from "react";

const STORAGE_KEY = "gg_cart";

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read cart from localStorage", e);
    return [];
  }
}

function writeToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    try {
      
      if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
        window.dispatchEvent(new CustomEvent('gg_cart_update', { detail: { items } }));
      }
    } catch (e) {
      
    }
  } catch (e) {
    console.error("Failed to write cart to localStorage", e);
  }
}

export function useCart() {
  const [items, setItems] = useState(() => (typeof window !== 'undefined' ? readFromStorage() : []));

  useEffect(() => {
    writeToStorage(items);
  }, [items]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handler = () => {
      try {
        setItems(readFromStorage());
      } catch (e) {
        
      }
    };

    
    window.addEventListener('gg_cart_update', handler);
    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('gg_cart_update', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  function addToCart(product, quantity = 1) {
    setItems((prev) => {
      const existingIndex = prev.findIndex((p) => p.id === product.id || p.name === product.name);
      if (existingIndex !== -1) {
        const copy = [...prev];
        copy[existingIndex].quantity = (copy[existingIndex].quantity || 1) + quantity;
        return copy;
      }
      const id = product.id ?? product.name ?? `${Date.now()}`;
      const entry = { id, image: product.image, brand: product.brand, name: product.name, price: product.price, quantity };
      return [...prev, entry];
    });
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function updateQuantity(id, delta) {
    setItems((prev) => prev.map((p) => {
      if (p.id !== id) return p;
      const newQty = (p.quantity || 1) + delta;
      return { ...p, quantity: Math.max(1, newQty) };
    }));
  }

  function clearCart() {
    setItems([]);
  }

  return { items, addToCart, removeFromCart, updateQuantity, clearCart };
}
