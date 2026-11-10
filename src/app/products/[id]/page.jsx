import React from "react";

import ProductDetailComponent from "../component/product-detail/Product-Detail.component";
import NotFoundShop from "../not-found";

export default async function ProductDetail({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`);
    const product = await res.json();

    if (!res.ok) {
      throw new Error("خطا پیش اومده");
    }

    return (
      <>
        {product === null ? (
          <NotFoundShop />
        ) : (
          <ProductDetailComponent product={product} id={id} />
        )}
      </>
    );
  } catch (error) {
    return <h1>{error.message}</h1>;
  }
}
