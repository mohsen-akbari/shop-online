"use client";

import { useContext } from "react";

import { ProductsContext } from "../../providers/products/products.provider";
import ProductList from "../prodcut-list/Products-List.component";

export default function LatestProducts() {
  const { products } = useContext(ProductsContext);

  return (
    <div className="new-products">
      {/* {products.length > 0 && <ProductList />} */}
      <ProductList />
    </div>
  );
}
