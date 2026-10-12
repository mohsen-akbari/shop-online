"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { FiltersContext } from "../filters/filters.provider";

export const ProductsContext = createContext({
  products: [],
  error: null,
});

export default function ProductsProvider({ children }) {
  const { filters } = useContext(FiltersContext);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const { push } = useRouter();

  function getValues(obj) {
    let list = [];
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null) {
        list.push(`${key}=${value.value}`);
      } else {
        list.push(`${key}=${value}`);
      }
    }
    return list;
  }

  const getData = async () => {
    let urlFilter;
    if (Object.keys(filters).length > 0) {
      urlFilter = `http://localhost:3000/api/products?${getValues(filters).join("&")}&page=1`;
      push(`http://localhost:3000/products?${getValues(filters).join("&")}`);
    } else {
      urlFilter = "http://localhost:3000/api/products?sort=بهترین&page=1";
      push("http://localhost:3000/products?sort=بهترین");
    }

    try {
      let res = await fetch(urlFilter);
      if (!res.ok) {
        throw new Error("ارتباط با سرور دچار مشکل شده است");
      }
      let result = await res.json();
      setProducts(result);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // setLoading(true);

    getData();
  }, [filters]);

  return (
    <ProductsContext.Provider value={{ products, error }}>
      {children}
    </ProductsContext.Provider>
  );
}
