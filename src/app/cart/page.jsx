"use client";

import { useContext, useState } from "react";

import { CartContext } from "@/contexts/CartContext";

import CartEmptyComponent from "./component/cart-empty.component";
import CartShopComponent from "./component/cart-shop.component";

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
