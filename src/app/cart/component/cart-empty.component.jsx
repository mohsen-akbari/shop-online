import React from "react";

import Image from "next/image";

import emptyImg from "@/assets/image/cart2.jpg";

import styles from "./cart-empty.module.css";

export default function CartEmptyComponent() {
  return (
    <div className={styles.container}>
      <h3>سبد خرید شما</h3>
      <div className={styles.card}>
        <Image src={emptyImg} alt="cart-empty" width={200} height={200} />
        <h3>سبد خرید شما خالیه!</h3>
      </div>
    </div>
  );
}
