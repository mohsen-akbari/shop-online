"use client";

import { useContext } from "react";

import { CartContext } from "@/features/cart/context/CartContext";

import CartEmptyComponent from "../../features/cart/component/cart-empty/cart-empty.component";
import CartShopComponent from "../../features/cart/component/cart-shop/cart-shop.component";

import styles from "./page.module.css";

export default function Cart() {
  let { cart } = useContext(CartContext);

  return (
    <div className={styles["cart-grid"]}>
      {cart?.length === 0 && <CartEmptyComponent />}

      {cart?.length > 0 && <CartShopComponent />}
    </div>
  );
}
