import img4 from "@/../public/images/banner/banner-1.gif";
import img3 from "@/../public/images/banner/banner-3.webp";

import BannerComponent from "@/components/shared/banner/banner.component";
import CarouselComponent from "@/features/home/components/product-carousel/product-carousel.component";
import SliderBannerComponent from "@/features/home/components/banner-slider/banner-slider.component";
import FeaturesComponent from "@/features/home/components/store-benefits/Store-Benefits.component";

import styles from "./page.module.css";

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
