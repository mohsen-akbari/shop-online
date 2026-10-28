// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// import { useRouter } from "next/navigation";

// import { FiltersContext } from "../filters/filters.provider";

// export const ProductsContext = createContext({
//   products: [],
//   error: null,
// });

// export default function ProductsProvider({ children }) {
//   const { filters } = useContext(FiltersContext);

//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState();
//   const { push } = useRouter();

//   function getValues(obj) {
//     let list = [];
//     for (const [key, value] of Object.entries(obj)) {
//       if (typeof value === "object" && value !== null) {
//         list.push(`${key}=${value.value}`);
//       } else {
//         list.push(`${key}=${value}`);
//       }
//     }
//     return list;
//   }

//   const getData = async () => {
//     let urlFilter;
//     if (Object.keys(filters).length > 0) {
//       urlFilter = `http://localhost:3000/api/products?${getValues(filters).join("&")}&page=1`;
//       push(`http://localhost:3000/products?${getValues(filters).join("&")}`);
//     } else {
//       urlFilter = "http://localhost:3000/api/products?sort=بهترین&page=1";
//       push("http://localhost:3000/products?sort=بهترین");
//     }

//     try {
//       let res = await fetch(urlFilter);
//       if (!res.ok) {
//         throw new Error("ارتباط با سرور دچار مشکل شده است");
//       }
//       let result = await res.json();
//       setProducts(result);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   useEffect(() => {

//     getData();
//   }, [filters]);

//   return (
//     <ProductsContext.Provider value={{ products, error }}>
//       {children}
//     </ProductsContext.Provider>
//   );
// }

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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    async function getData() {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      for (const [key, value] of Object.entries(filters)) {
        const filterValue =
          typeof value === "object" && value !== null ? value.value : value;

        if (filterValue != null) {
          params.set(key, String(filterValue));
        }
      }

      if (params.size === 0) {
        params.set("sort", "بهترین");
      }

      params.set("page", "1");

      const query = params.toString();

      router.replace(`/products?${query}`, {
        scroll: false,
      });

      try {
        const response = await fetch(`/api/products?${query}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("ارتباط با سرور دچار مشکل شده است");
        }

        const result = await response.json();
        setProducts(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "خطایی رخ داده است");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getData();

    return () => controller.abort();
  }, [filters, router]);

  return (
    <ProductsContext.Provider value={{ products, error, loading }}>
      {children}
    </ProductsContext.Provider>
  );
}
