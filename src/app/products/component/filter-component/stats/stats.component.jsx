"use client";

import { useContext } from "react";

import { ProductsContext } from "@/app/products/providers/products/products.provider";

import styles from "./stats.module.css";

export default function StatsComponent() {
  const { products } = useContext( ProductsContext);

  return (
    <div className={styles.stats}>
      {products.length?.toLocaleString()} نتیجه
    </div>
  );
}
