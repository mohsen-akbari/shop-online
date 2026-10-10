import React from "react";

import Image from "next/image";

import styles from "./featuers.module.css";

export default function FeaturesComponent() {
  const items = [
    {
      id: 1,
      title: "ضمانت اصل بودن کالا",
      description:
        "لاوین با همکاری با معتبرترین فروشگاه‌های موبایل در سراسر ایران، اصالت کالای دریافتی شما را تضمین می‌کند.",
      icon: "https://img.icons8.com/external-anggara-basic-outline-anggara-putra/96/7950F2/external-social-social-media-basic-others-anggara-putra-7.png",
      alt: "external-protected-shipping-delivery-thin-kawalan-studio",
    },
    {
      id: 2,
      title: "امکان تحویل سریع",
      description:
        "لاوین از طریق همکاری با هزاران فروشگاه محلی امکان تحویل گوشی زیر ۳ ساعت در سراسر ایران را فراهم کرده است.",
      icon: "https://img.icons8.com/pulsar-line/96/7950F2/rocket.png",
      alt: "rocket",
    },
    {
      id: 3,
      title: "قیمت منصفانه",
      description:
        "لاوین با پایش روزانه قیمت‌ها براساس نوسانات بازار، قیمت منصفانه محصول را برای یک معامله برد-برد بین فروشنده و خریدار تضمین می‌کند.",
      icon: "https://img.icons8.com/external-flatart-icons-solid-flatarticons/64/7950F2/external-law-usa-flatart-icons-solid-flatarticons.png",
      alt: "external-justice-womens-day-flatart-icons-solid-flatarticons",
    },
    {
      id: 4,
      title: "پرداخت امن",
      description:
        "لاوین با ایجاد کیف پول امن بین خریدار و فروشنده این تضمین را می‌دهد که مبلغ خرید شما بعد از تایید دریافت محصول به فروشنده منتقل خواهد شد.",
      icon: "https://img.icons8.com/ios/50/7950F2/card-security.png",
      alt: "card-security",
    },
  ];
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.icon}>
            <Image width="48" height="48" src={item.icon} alt={item.alt} />
          </div>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.description}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
