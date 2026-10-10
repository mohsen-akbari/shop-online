import React from "react";
import Image from "next/image";
import styles from './banner.module.css';

export default function BannerComponent({bannerImg, height}) {
  return <>
    <Image src={bannerImg} alt="banner" className={styles.img} />
  </>;
}
