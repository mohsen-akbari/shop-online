import React from "react";

import Image from "next/image";

import styles from "./banner.module.css";

export default function BannerComponent({ bannerImg, height = 300 }) {
  return (
    <>
      <Image
        src={bannerImg}
        alt="banner"
        className={styles.img}
        style={{ height }}
      />
    </>
  );
}
