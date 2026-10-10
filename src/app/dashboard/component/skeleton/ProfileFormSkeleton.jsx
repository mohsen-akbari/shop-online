"use client";

import styles from "./ProfileFormSkeleton.module.css";

export default function ProfileFormSkeleton() {
  return (
    <div className={styles["profile-form-skeleton"]}>
      <div className={styles["skeleton-title"]} />

      <div className={styles["skeleton-form"]}>
        <div className={styles["skeleton-field"]}>
          <div className={styles["skeleton-label"]} />
          <div className={styles["skeleton-input"]} />
        </div>

        <div className={styles["skeleton-field"]}>
          <div className={styles["skeleton-label"]} />
          <div className={styles["skeleton-input"]} />
        </div>

        <div className={styles["skeleton-field"]}>
          <div className={styles["skeleton-label"]} />
          <div className={styles["skeleton-input"]} />
        </div>

        <div className={styles["skeleton-field"]}>
          <div className={styles["skeleton-label"]} />
          <div className={styles["skeleton-input"]} />
        </div>

        <div className={styles["btn-container"]}>
          <div className={styles["skeleton-button"]} />
        </div>
      </div>
    </div>
  );
}
