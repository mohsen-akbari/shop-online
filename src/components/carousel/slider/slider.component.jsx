"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import MaterialSymbolsArrowBackIosRounded from "@/icons/MaterialSymbolsArrowBackIosRounded";
import MaterialSymbolsKeyboardArrowLeft from "@/icons/MaterialSymbolsKeyboardArrowLeft";
import MaterialSymbolsKeyboardArrowRight from "@/icons/MaterialSymbolsKeyboardArrowRight";
import MaterialSymbolsStarRounded from "@/icons/MaterialSymbolsStarRounded";

import { enTofa } from "@/utils/Utilities";

import styles from "./slider.module.css";

export default function SwiperSlider({ title, products, brand }) {
  const swiperRef = useRef(null);

  const isManualMoving = useRef(false);
  const pendingAction = useRef(null);
  const autoplayTimer = useRef(null);

  const restartAutoplay = (swiper) => {
    if (!swiper || swiper.destroyed) return;

    clearTimeout(autoplayTimer.current);

    autoplayTimer.current = setTimeout(() => {
      if (!swiper.destroyed) {
        swiper.autoplay.start();
      }
    }, 100);
  };

  const runSlide = (swiper, direction) => {
    if (!swiper || swiper.destroyed) return;

    isManualMoving.current = true;

    if (direction === "next") {
      swiper.slideNext(600);
    } else {
      swiper.slidePrev(600);
    }
  };

  const handleNext = () => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed) return;

    // autoplay متوقف شود
    swiper.autoplay.stop();

    // اگر در حال حرکت دستی هستیم،
    // فقط درخواست را ذخیره کن
    if (isManualMoving.current || swiper.animating) {
      pendingAction.current = "next";
      return;
    }

    runSlide(swiper, "next");
  };

  const handlePrev = () => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed) return;

    // autoplay متوقف شود
    swiper.autoplay.stop();

    // اگر در حال حرکت دستی هستیم،
    // فقط درخواست را ذخیره کن
    if (isManualMoving.current || swiper.animating) {
      pendingAction.current = "prev";
      return;
    }

    runSlide(swiper, "prev");
  };

  return (
    <div className={styles["swiper-container"]}>
      <div className={styles["swiper-container-header"]}>
        <h3>{title}</h3>

        <Link href={`/products?brand=${brand}`}>
          همه موارد
          <MaterialSymbolsArrowBackIosRounded />
        </Link>
      </div>

      <Swiper
        dir="rtl"
        loop={true}
        grabCursor={true}
        speed={600}
        breakpoints={{
          0: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 5.4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5.7,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        modules={[Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onTransitionEnd={(swiper) => {
          isManualMoving.current = false;

          // اگر کلیک دیگری در صف وجود دارد
          if (pendingAction.current) {
            const action = pendingAction.current;

            pendingAction.current = null;

            // حرکت بعدی را در frame بعدی اجرا کن
            requestAnimationFrame(() => {
              if (!swiper.destroyed) {
                runSlide(swiper, action);
              }
            });

            return;
          }

          // هیچ کلیک دیگری نیست
          // autoplay دوباره شروع شود
          restartAutoplay(swiper);
        }}
        className={styles["swiper-container-body"]}
      >
        {products?.slice(0, 13).map((product) => (
          <SwiperSlide key={product.id} className={styles["swiper-slide"]}>
            <Link href={`/products/${product.id}`}>
              <Image
                width={150}
                height={150}
                className={styles["swiper-slide-img"]}
                src={product.image}
                alt={product.title}
              />

              <h2>{product.title}</h2>
              <div className={styles["product-rate"]}>
                <span>{enTofa(product.rate)}</span>
                <MaterialSymbolsStarRounded
                  color="#ffc400"
                  width="1.2rem"
                  height="1.2rem"
                />
              </div>
              <div className={styles["product-price"]}>
                {enTofa(product.price)}
                <span>تومان</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles["swiper-buttons"]}>
        <button
          type="button"
          onClick={handleNext}
          className={styles["next-btn"]}
        >
          <MaterialSymbolsKeyboardArrowRight />
        </button>

        <button
          type="button"
          onClick={handlePrev}
          className={styles["prev-btn"]}
        >
          <MaterialSymbolsKeyboardArrowLeft />
        </button>
      </div>
    </div>
  );
}
