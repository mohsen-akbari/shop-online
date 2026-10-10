"use client";

import { useContext, useState } from "react";

import Image from "next/image";

import { CartContext } from "@/contexts/CartContext";

import MingcuteDelete2Line from "@/icons/MingcuteDelete2Line";

import { enTofa } from "@/utils/Utilities";

import CartComponent from "./component/Cart.component";
import CartEmptyComponent from "./component/cart-empty.component";
import CartShopComponent from "./component/cart-shop.component";

import styles from "./page.module.css";

// export function generateMetadata(){
//     return {
//         title: "Home | Your Online Cart",
//         description: "View and manage the items in your cart.",
//         openGraph: {
//             title: "Your Online Cart",
//             description: "Easily view and manage your shopping cart items.",
//         }
//     }
// }

export default function Cart() {
  let { cart, removeFromCart, updateQuantity, getTotal, clearCart } =
    useContext(CartContext);

  return (
    <div className={styles["cart-grid"]}>
      {cart?.length === 0 && <CartEmptyComponent />}

      {cart?.length > 0 && <CartShopComponent />}
    </div>
  );
}
