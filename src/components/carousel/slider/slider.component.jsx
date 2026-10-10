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

// export default function SwiperSlider({ title, products, brand }) {
//   const swiperRef = useRef(null);
//   const animationRef = useRef(null);
//   const isPausedRef = useRef(false);

//   // سرعت حرکت خودکار
//   const AUTO_SPEED = 0.8;

//   // --------------------------------
//   // حرکت کاملاً پیوسته
//   // --------------------------------
//   useEffect(() => {
//     const animate = () => {
//       const swiper = swiperRef.current;

//       if (swiper && !swiper.destroyed && !isPausedRef.current) {
//         swiper.setTranslate(swiper.translate - AUTO_SPEED);

//         // بررسی loop
//         swiper.updateProgress();
//       }

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);

//     return () => {
//       cancelAnimationFrame(animationRef.current);
//     };
//   }, []);

//   // --------------------------------
//   // حرکت به کارت بعدی
//   // --------------------------------
//   const handleNext = () => {
//     const swiper = swiperRef.current;

//     if (!swiper || swiper.destroyed) return;

//     isPausedRef.current = true;

//     swiper.slideNext(500);

//     setTimeout(() => {
//       isPausedRef.current = false;
//     }, 550);
//   };

//   // --------------------------------
//   // حرکت به کارت قبلی
//   // --------------------------------
//   const handlePrev = () => {
//     const swiper = swiperRef.current;

//     if (!swiper || swiper.destroyed) return;

//     isPausedRef.current = true;

//     swiper.slidePrev(500);

//     setTimeout(() => {
//       isPausedRef.current = false;
//     }, 550);
//   };

//   // --------------------------------
//   // توقف هنگام hover
//   // --------------------------------
//   const handleMouseEnter = () => {
//     isPausedRef.current = true;
//   };

//   const handleMouseLeave = () => {
//     isPausedRef.current = false;
//   };

//   return (
//     <div className={styles["swiper-container"]}>
//       {/* Header */}
//       <div className={styles["swiper-container-header"]}>
//         <h3>{title}</h3>

//         <Link href={`/products?brand=${brand}`}>
//           همه موارد
//           <MaterialSymbolsArrowBackIosRounded />
//         </Link>
//       </div>

//       {/* Swiper */}
//       <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//         <Swiper
//           dir="rtl"
//           loop={true}
//           slidesPerView="auto"
//           spaceBetween={10}
//           grabCursor={true}
//           speed={500}
//           onSwiper={(swiper) => {
//             swiperRef.current = swiper;
//           }}
//           className={styles["swiper-container-body"]}
//         >
//           {products?.slice(0, 13).map((product) => (
//             <SwiperSlide key={product.id} className={styles["swiper-slide"]}>
//               <Link href={`/products/${product.id}`}>
//                 <Image
//                   width={150}
//                   height={150}
//                   className={styles["swiper-slide-img"]}
//                   src={product.image}
//                   alt={product.title}
//                 />

//                 <h3>{product.title}</h3>

//                 <div className={styles["product-price"]}>
//                   {enTofa(product.price)}
//                   <span>تومان</span>
//                 </div>
//               </Link>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Buttons */}
//       <div className={styles["swiper-buttons"]}>
//         {/* جلو */}
//         <button
//           type="button"
//           onClick={handlePrev}
//           className={styles["next-btn"]}
//         >
//           -{/* <MingcuteArrowLeftLine color="#4f4f4f" /> */}
//         </button>

//         {/* عقب */}
//         <button
//           type="button"
//           onClick={handleNext}
//           className={styles["prev-btn"]}
//         >
//           {/* +<MingcuteArrowRightLine color="#4f4f4f" /> */}
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useRef } from "react";

// import Image from "next/image";
// import Link from "next/link";

// import "swiper/css";
// import "swiper/css/navigation";
// import { Autoplay, FreeMode, Keyboard } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// import MaterialSymbolsArrowBackIosRounded from "@/icons/MaterialSymbolsArrowBackIosRounded";

// import { enTofa } from "@/utils/Utilities";

// import styles from "./slider.module.css";

// export default function SwiperSlider({ title, products, brand }) {
//   const swiperRef = useRef(null);

//   const handleNext = () => {
//     const swiper = swiperRef.current;

//     if (!swiper) return;

//     swiper.autoplay.stop();

//     // حرکت فوری
//     swiper.slideNext(0);

//     // شروع مجدد autoplay
//     setTimeout(() => {
//       if (swiper && !swiper.destroyed) {
//         swiper.autoplay.start();
//       }
//     }, 100);
//   };

//   const handlePrev = () => {
//     const swiper = swiperRef.current;

//     if (!swiper) return;

//     swiper.autoplay.stop();

//     // حرکت فوری
//     swiper.slidePrev(0);

//     // شروع مجدد autoplay
//     setTimeout(() => {
//       if (swiper && !swiper.destroyed) {
//         swiper.autoplay.start();
//       }
//     }, 100);
//   };

//   return (
//     <div className={styles["swiper-container"]}>
//       <div className={styles["swiper-container-header"]}>
//         <h3>{title}</h3>
//         <Link href={`/products?brand=${brand}`}>
//           همه موارد
//           <MaterialSymbolsArrowBackIosRounded />
//         </Link>
//       </div>
//       <Swiper
//         dir="ltr"
//         loop={true}
//         // freeMode={true}
//         centeredSlides={false}
//         grabCursor={true}
//         speed={3000}
//         slidesPerView="auto"
//         spaceBetween={10}
//         autoplay={{
//           delay: 0,
//           disableOnInteraction: false,
//           pauseOnMouseEnter: true,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         breakpoints={{
//           0: {
//             slidesPerView: 1,
//             spaceBetween: 10,
//           },
//           480: {
//             slidesPerView: 2,
//             spaceBetween: 10,
//           },
//           768: {
//             slidesPerView: 3,
//             spaceBetween: 15,
//           },
//           1024: {
//             slidesPerView: 4.7,
//             spaceBetween: 10,
//           },
//           1280: {
//             slidesPerView: 5.7,
//             spaceBetween: 10,
//           },
//         }}
//         scrollbar={true}
//         keyboard={{
//           enabled: true,
//         }}
//         onSwiper={(swiper) => {
//           swiperRef.current = swiper;
//         }}
//         modules={[Keyboard, FreeMode, Autoplay]}
//         className={styles["swiper-container-body"]}
//       >
//         {products.length > 0 &&
//           products.slice(0, 20).map((product) => (
//             <SwiperSlide key={product.id} className={styles["swiper-slide"]}>
//               <Link href={`/products/${product.id}`}>
//                 <Image
//                   width={150}
//                   height={150}
//                   className={styles["swiper-slide-img"]}
//                   src={product.image}
//                   alt={product.title}
//                 />
//                 <h3>{product.title}</h3>
//                 <div className={styles["product-price"]}>
//                   {enTofa(product.price)}
//                   <span>تومان</span>
//                 </div>
//               </Link>
//             </SwiperSlide>
//           ))}
//         {/* <div className={styles["swiper-buttons"]}>
//           <div className="swiper-button-next"></div>
//           <div className="swiper-button-prev"></div>
//         </div> */}
//       </Swiper>
//       <div className={styles["swiper-buttons"]}>
//         <button
//           type="button"
//           className={styles["next-btn"]}
//           onClick={handleNext}
//         >
//           -
//         </button>

//         <button
//           type="button"
//           className={styles["prev-btn"]}
//           onClick={handlePrev}
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function SwiperSlider({ title, products, brand }) {
//   const swiperRef = useRef(null);

//   const handleNext = () => {
//     const swiper = swiperRef.current;

//     if (!swiper || swiper.destroyed) return;

//     // توقف autoplay
//     swiper.autoplay.stop();

//     // حرکت دستی
//     swiper.slideNext(200);

//     // بعد از اتمام حرکت، autoplay دوباره شروع شود
//     setTimeout(() => {
//       if (swiper && !swiper.destroyed) {
//         swiper.autoplay.start();
//       }
//     }, 600);
//   };

//   const handlePrev = () => {
//     const swiper = swiperRef.current;

//     if (!swiper || swiper.destroyed) return;

//     // توقف autoplay
//     swiper.autoplay.stop();

//     // حرکت دستی
//     swiper.slidePrev(200);

//     // بعد از اتمام حرکت، autoplay دوباره شروع شود
//     setTimeout(() => {
//       if (swiper && !swiper.destroyed) {
//         swiper.autoplay.start();
//       }
//     }, 600);
//   };

//   return (
//     <div className={styles["swiper-container"]}>
//       <div className={styles["swiper-container-header"]}>
//         <h3>{title}</h3>

//         <Link href={`/products?brand=${brand}`}>
//           همه موارد
//           <MaterialSymbolsArrowBackIosRounded />
//         </Link>
//       </div>

//       <Swiper
//         dir="rtl"
//         loop={true}
//         // slidesPerView="auto"
//         // spaceBetween={10}
//         grabCursor={true}
//         breakpoints={{
//           0: {
//             slidesPerView: 5,
//             spaceBetween: 10,
//           },
//           480: {
//             slidesPerView: 6,
//             spaceBetween: 10,
//           },
//           768: {
//             slidesPerView: 5.4,
//             spaceBetween: 10,
//           },
//           1024: {
//             slidesPerView: 5.7,
//             spaceBetween: 10,
//           },
//           1280: {
//             slidesPerView: 6,
//             spaceBetween: 10,
//           },
//         }}
//         // سرعت حرکت دستی
//         speed={600}
//         autoplay={{
//           // هر 1.5 ثانیه حرکت کند
//           delay: 1500,

//           // بعد از کلیک autoplay خاموش نشود
//           disableOnInteraction: false,

//           pauseOnMouseEnter: false,
//         }}
//         modules={[Autoplay]}
//         onSwiper={(swiper) => {
//           swiperRef.current = swiper;
//         }}
//         className={styles["swiper-container-body"]}
//       >
//         {products?.slice(0, 13).map((product) => (
//           <SwiperSlide key={product.id} className={styles["swiper-slide"]}>
//             <Link href={`/products/${product.id}`}>
//               <Image
//                 width={150}
//                 height={150}
//                 className={styles["swiper-slide-img"]}
//                 src={product.image}
//                 alt={product.title}
//               />

//               <h3>{product.title}</h3>

//               <div className={styles["product-price"]}>
//                 {enTofa(product.price)}
//                 <span>تومان</span>
//               </div>
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <div className={styles["swiper-buttons"]}>
//         <button
//           type="button"
//           onClick={handleNext}
//           className={styles["next-btn"]}
//         >
//           <MaterialSymbolsKeyboardArrowRight />
//         </button>
//         <button
//           type="button"
//           onClick={handlePrev}
//           className={styles["prev-btn"]}
//         >
//           <MaterialSymbolsKeyboardArrowLeft />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function SwiperSlider({ title, products, brand }) {
//   // const swiperRef = useRef(null);
//   // const restartTimer = useRef(null);

//   // const stopAndResetSwiper = (swiper) => {
//   //   if (!swiper || swiper.destroyed) return;

//   //   // توقف autoplay
//   //   swiper.autoplay.stop();

//   //   // حذف تایمر قبلی
//   //   if (restartTimer.current) {
//   //     clearTimeout(restartTimer.current);
//   //     restartTimer.current = null;
//   //   }

//   //   // موقعیت فعلی اسلایدر
//   //   const translate = swiper.getTranslate();

//   //   // transition فعلی را فوراً متوقف کن
//   //   swiper.setTransition(0);

//   //   // موقعیت فعلی را حفظ کن
//   //   swiper.setTranslate(translate);

//   //   // اجازه بده دستور بعدی slideNext/slidePrev اجرا شود
//   //   swiper.animating = false;
//   // };

//   // const startAutoplayAgain = (swiper) => {
//   //   if (!swiper || swiper.destroyed) return;

//   //   restartTimer.current = setTimeout(() => {
//   //     if (!swiper.destroyed) {
//   //       swiper.autoplay.start();
//   //     }
//   //   }, 100);
//   // };

//   // const handleNext = () => {
//   //   const swiper = swiperRef.current;

//   //   if (!swiper || swiper.destroyed) return;

//   //   stopAndResetSwiper(swiper);

//   //   // اجرای فوری Next
//   //   swiper.slideNext(600);

//   //   swiper.once("transitionEnd", () => {
//   //     startAutoplayAgain(swiper);
//   //   });
//   // };

//   // const handlePrev = () => {
//   //   const swiper = swiperRef.current;

//   //   if (!swiper || swiper.destroyed) return;

//   //   stopAndResetSwiper(swiper);

//   //   // اجرای فوری Prev
//   //   swiper.slidePrev(600);

//   //   swiper.once("transitionEnd", () => {
//   //     startAutoplayAgain(swiper);
//   //   });
//   // };

//   const swiperRef = useRef(null);

//   const isManualMoving = useRef(false);
//   const pendingAction = useRef(null);
//   const autoplayTimer = useRef(null);

//   const restartAutoplay = (swiper) => {
//     if (!swiper || swiper.destroyed) return;

//     clearTimeout(autoplayTimer.current);

//     autoplayTimer.current = setTimeout(() => {
//       if (!swiper.destroyed) {
//         swiper.autoplay.start();
//       }
//     }, 100);
//   };

//   const runSlide = (swiper, direction) => {
//     if (!swiper || swiper.destroyed) return;

//     isManualMoving.current = true;

//     if (direction === "next") {
//       swiper.slideNext(600);
//     } else {
//       swiper.slidePrev(600);
//     }
//   };

//   const handleNext = () => {
//     const swiper = swiperRef.current;

//     if (!swiper || swiper.destroyed) return;

//     // autoplay متوقف شود
//     swiper.autoplay.stop();

//     // اگر در حال حرکت دستی هستیم،
//     // فقط درخواست را ذخیره کن
//     if (isManualMoving.current || swiper.animating) {
//       pendingAction.current = "next";
//       return;
//     }

//     runSlide(swiper, "next");
//   };

//   const handlePrev = () => {
//     const swiper = swiperRef.current;

//     if (!swiper || swiper.destroyed) return;

//     // autoplay متوقف شود
//     swiper.autoplay.stop();

//     // اگر در حال حرکت دستی هستیم،
//     // فقط درخواست را ذخیره کن
//     if (isManualMoving.current || swiper.animating) {
//       pendingAction.current = "prev";
//       return;
//     }

//     runSlide(swiper, "prev");
//   };

//   return (
//     <div className={styles["swiper-container"]}>
//       <div className={styles["swiper-container-header"]}>
//         <h3>{title}</h3>

//         <Link href={`/products?brand=${brand}`}>
//           همه موارد
//           <MaterialSymbolsArrowBackIosRounded />
//         </Link>
//       </div>

//       <Swiper
//         dir="rtl"
//         loop={true}
//         grabCursor={true}
//         speed={600}
//         breakpoints={{
//           0: {
//             slidesPerView: 5,
//             spaceBetween: 10,
//           },
//           480: {
//             slidesPerView: 6,
//             spaceBetween: 10,
//           },
//           768: {
//             slidesPerView: 5.4,
//             spaceBetween: 10,
//           },
//           1024: {
//             slidesPerView: 5.7,
//             spaceBetween: 10,
//           },
//           1280: {
//             slidesPerView: 6,
//             spaceBetween: 10,
//           },
//         }}
//         autoplay={{
//           delay: 1500,
//           disableOnInteraction: false,
//           pauseOnMouseEnter: false,
//         }}
//         modules={[Autoplay]}
//         onSwiper={(swiper) => {
//           swiperRef.current = swiper;
//         }}
//         onTransitionEnd={(swiper) => {
//           isManualMoving.current = false;

//           // اگر کلیک دیگری در صف وجود دارد
//           if (pendingAction.current) {
//             const action = pendingAction.current;

//             pendingAction.current = null;

//             // حرکت بعدی را در frame بعدی اجرا کن
//             requestAnimationFrame(() => {
//               if (!swiper.destroyed) {
//                 runSlide(swiper, action);
//               }
//             });

//             return;
//           }

//           // هیچ کلیک دیگری نیست
//           // autoplay دوباره شروع شود
//           restartAutoplay(swiper);
//         }}
//         className={styles["swiper-container-body"]}
//       >
//         {products?.slice(0, 13).map((product) => (
//           <SwiperSlide key={product.id} className={styles["swiper-slide"]}>
//             <Link href={`/products/${product.id}`}>
//               <Image
//                 width={150}
//                 height={150}
//                 className={styles["swiper-slide-img"]}
//                 src={product.image}
//                 alt={product.title}
//               />

//               <h3>{product.title}</h3>

//               <div className={styles["product-price"]}>
//                 {enTofa(product.price)}
//                 <span>تومان</span>
//               </div>
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <div className={styles["swiper-buttons"]}>
//         <button
//           type="button"
//           onClick={handleNext}
//           className={styles["next-btn"]}
//         >
//           <MaterialSymbolsKeyboardArrowRight />
//         </button>

//         <button
//           type="button"
//           onClick={handlePrev}
//           className={styles["prev-btn"]}
//         >
//           <MaterialSymbolsKeyboardArrowLeft />
//         </button>
//       </div>
//     </div>
//   );
// }

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
