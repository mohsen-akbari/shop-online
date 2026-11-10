"use client";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const cartLocal = localStorage.getItem("cart");

    if (cartLocal) {
      try {
        const parsedCart = JSON.parse(cartLocal);

        setCart(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error("Cart parse error:", error);
        setCart([]);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, isLoaded]);

  function addToCart(product) {
    setCart((prev) => {
      const selectedProduct = prev.find((item) => item.id === product.id);

      if (!selectedProduct) {
        return [
          ...prev,
          {
            ...product,
            quantity: 1,
          },
        ];
      }

      return prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId, newQuantity) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item,
      ),
    );
  }

  function clearCart() {
    setCart([]);
  }

  function getTotal() {
    return cart.reduce(
      (total, item) => total + item.quantity * Number(item.price),
      0,
    );
  }

  function getAny(product) {
    return product.quantity * Number(product.price);
  }

  function getInsurance(product) {
    return product.quantity * Number(product.price) * 0.015;
  }

  function getInsuranceTotal() {
    return cart.reduce((total, product) => {
      if (product.insurance === true) {
        return total + product.quantity * Number(product.price) * 0.015;
      }

      return total;
    }, 0);
  }

  function getTotalAll() {
    return cart.reduce((total, item) => {
      const price = item.quantity * Number(item.price);

      const insurance = item.insurance ? price * 0.015 : 0;

      return total + price + insurance;
    }, 0);
  }

  function changeInsurance(product, checkInsurance) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              insurance: checkInsurance,
            }
          : item,
      ),
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        getAny,
        getTotal,
        clearCart,
        getInsurance,
        changeInsurance,
        getInsuranceTotal,
        getTotalAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
