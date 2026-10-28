"use client";

import { ThreeDots } from "react-loader-spinner";

import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.three}>
      <ThreeDots
        visible={true}
        height="50"
        width="50"
        color="#6d69f9"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
