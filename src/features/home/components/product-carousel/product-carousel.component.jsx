import { cookies } from "next/headers";

import ProductSliderComponent from "../product-slider/product-slider.component";

export default async function ProductCarouselComponent({ title, url, brand }) {
  try {
    const cookieStore = cookies();

    const response = await fetch(url, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "force-cache",
    });

    const result = await response.json();
    const products = result.products;

    if (!response.ok) {
      throw new Error(
        result.error || "دریافت محصولات از سرور با مشکل مواجه شده است",
      );
    }

    if (!Array.isArray(products)) {
      throw new Error("ساختار محصولات دریافت شده از سرور معتبر نیست");
    }

    return (
      <ProductSliderComponent title={title} products={products} brand={brand} />
    );
  } catch (error) {
    console.error("Carousel Error:", error.message);

    return (
      <p>
        در حال حاضر امکان دریافت محصولات وجود ندارد. لطفاً بعداً دوباره تلاش
        کنید.
      </p>
    );
  }
}
