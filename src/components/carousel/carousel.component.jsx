import React from "react";

import SwiperSlider from "./slider/slider.component";

export default async function CarouselComponent({ title, url, brand }) {
  try {
    const response = await fetch(url);
    const products = await response.json();

    const filterProducts = products.filter((product) => product.price > 0);
    return (
      <>
        <SwiperSlider title={title} products={filterProducts} brand={brand} />
      </>
    );
  } catch (error) {
    return <h1>{error.message}</h1>;
  }
}
