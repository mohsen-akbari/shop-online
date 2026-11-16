import React from "react";

import styles from "./skeleton-box.module.css";

export default function SkeletonBoxComponent() {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles["product-image-box"]}></div>
          <div className={styles["product-info-box"]}>
            <div className={styles["product-title"]}></div>
            <div className={styles["product-rate"]}></div>
            <div className={styles["product-actions"]}>
              <div className={styles["product-view"]}></div>
              <div className={styles["product-add-cart"]}></div>
            </div>
            <div className={styles["product-price-row"]}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
