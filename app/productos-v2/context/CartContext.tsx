"use client";
import { useLocalStorage } from "@/app/hooks";
import { CartProduct } from "@/app/models";
import { createContext, useContext, ReactNode, useState, useMemo } from "react";

interface CartContextProps {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  decrementQuantityCart: (productId: string) => void;
  openMenuCart: () => void;
  closeMenuCart: () => void;
  toggleCartMenu: () => void;
  openCart: boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

type Props = { children: ReactNode };
function CartProvider({ children }: Props) {
  const [cart, setCart] = useLocalStorage<CartProduct[]>("cart", []);
  const [openCart, setOpenCart] = useState<boolean>(false);

  const addToCart = (product: CartProduct) => {
    const updatedCart = cart.map((item: CartProduct) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    if (!updatedCart.some((item: CartProduct) => item.id === product.id)) {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart: CartProduct[]) =>
      prevCart.filter((product) => product.id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const decrementQuantityCart = (productId: string) => {
    setCart((prevCart: CartProduct[]) =>
      prevCart.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, product.quantity - 1) }
          : product
      )
    );
  };

  const closeMenuCart = () => {
    setOpenCart(false);
  };
  const openMenuCart = () => {
    setOpenCart(true);
  };

  const toggleCartMenu = () => {
    setOpenCart(!openCart);
  };
  const contextValue = useMemo(
    () => ({
      cart,
      openCart,
      addToCart,
      removeFromCart,
      clearCart,
      decrementQuantityCart,
      closeMenuCart,
      openMenuCart,
      toggleCartMenu,
    }),
    [cart, openCart]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser utilizado dentro de CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
