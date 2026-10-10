import { Suspense } from "react";

// import img1 from "@/assets/image/banner/banner-1.webp";
import img2 from "@/assets/image/banner/banner-2.webp";
import img3 from "@/assets/image/banner/banner-3.webp";
import img4 from "@/assets/image/banner/banner-1.gif";


import BannerComponent from "@/components/banner/banner.component";
import CarouselComponent from "@/components/carousel/carousel.component";
import SwiperSlider from "@/components/carousel/slider/slider.component";
import FeaturesComponent from "@/components/features/Features.component";
import FooterComponent from "@/components/footer/footer.component";
import HeaderComponent from "@/components/header/header.component";

import styles from "./page.module.css";
import SliderBannerComponent from "@/components/carousel/slider-banner/slider-banner.component";

export default async function Home() {
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.content}>
          <SliderBannerComponent />
          <CarouselComponent
            title="گوشی های شیائومی"
            url="http://localhost:3000/api/products?sort=بهترین&brand=شیائومی&page=1"
            brand="شیائومی"
          />
          <BannerComponent bannerImg={img4} />
          <CarouselComponent
            title="گوشی های سامسونگ"
            url="http://localhost:3000/api/products?sort=بهترین&brand=سامسونگ&page=1"
            brand="سامسونگ"
          />
          <BannerComponent bannerImg={img3} />
          <CarouselComponent
            title="گوشی های اپل"
            url="http://localhost:3000/api/products?sort=بهترین&brand=اپل&page=1"
            brand="اپل"
          />
          <FeaturesComponent />
        </div>
      </div>
    </>
  );
}
