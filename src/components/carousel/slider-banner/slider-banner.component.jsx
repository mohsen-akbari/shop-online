"use client";

import React, { useRef } from "react";

import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Autoplay,
  HashNavigation,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import img1 from "@/assets/image/banner/banner-slider-1.webp";
import img2 from "@/assets/image/banner/banner-slider-2.png";
import img3 from "@/assets/image/banner/banner-slider-3.webp";

import MingcuteArrowLeftLine from "@/icons/MingcuteArrowLeftLine";
import MingcuteArrowRightLine from "@/icons/MingcuteArrowRightLine";

import styles from "./slider-banner.module.css";

export default function SliderBannerComponent() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const handleNext = () => {
    const swiper = swiperRef.current;

    if (!swiper) return;
    swiper.autoplay.stop();
    swiper.params.speed = 50;
    swiper.slideNext();

    setTimeout(() => {
      if (swiper && !swiper.destroyed) {
        swiper.params.speed = 800;
        swiper.autoplay.start();
      }
    }, 50);
  };

  const handlePrev = () => {
    const swiper = swiperRef.current;

    if (!swiper) return;

    swiper.autoplay.stop();
    swiper.params.speed = 50;
    swiper.slidePrev();

    setTimeout(() => {
      if (swiper && !swiper.destroyed) {
        swiper.params.speed = 800;
        swiper.autoplay.start();
      }
    }, 50);
  };

  return (
    <div className={styles["my-swiper"]}>
      <Swiper
        dir="rtl"
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        speed={800}
        freeMode={false}
        centeredSlides={false}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        spaceBetween={30}
        hashNavigation={{
          watchState: true,
        }}
        modules={[Pagination, Navigation, HashNavigation, Autoplay]}
        className={styles.swiper}
      >
        <SwiperSlide className={styles["swiper-slide"]}>
          <Image src={img1} alt="banner" />
        </SwiperSlide>
        <SwiperSlide className={styles["swiper-slide"]}>
          {" "}
          <Image src={img2} alt="banner" />
        </SwiperSlide>
        <SwiperSlide className={styles["swiper-slide"]}>
          {" "}
          <Image src={img3} alt="banner" />
        </SwiperSlide>
      </Swiper>
      <div className={styles["custom-navigation"]}>
        <button
          ref={prevRef}
          className={styles["prev-btn"]}
          onClick={handlePrev}
        >
          <MingcuteArrowRightLine color="#4f4f4f" />
        </button>

        <button
          ref={nextRef}
          className={styles["next-btn"]}
          onClick={handleNext}
        >
          <MingcuteArrowLeftLine color="#4f4f4f" />
        </button>
      </div>
    </div>
  );
}
