// "use client";

// import { useCallback, useContext, useEffect, useRef, useState } from "react";

// import { ColorRing } from "react-loader-spinner";

// import { ProductsContext } from "../../providers/products/products.provider";
// import { FiltersContext } from "../../providers/filters/filters.provider";
// import InventoryFilterComponent from "../filter-component/Inventory-filter/Inventory-filter.component";
// import StatsComponent from "../filter-component/stats/stats.component";
// import FilteringProductsComponent from "../filtering-box/filtering-products.component";
// import ProductBox from "../product-box/Product-Box.component";
// import SortingProductsComponent from "../sorting-box/sorting-products.component";

// import styles from "./product-List.module.css";
// import ShowFilterComponent from "../filter-component/show-filter/Show-filter.component";

// export default function ProductList() {
//   const { products, error } = useContext(ProductsContext);
//   const { filters } = useContext(FiltersContext);

//   const [visibleProducts, setVisibleProducts] = useState(products);
//   const [page, setPage] = useState(2);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [isError, setIsError] = useState(null);

//   const observer = useRef();

//   function getValues(obj) {
//     let list = [];
//     for (const [key, value] of Object.entries(obj)) {
//       if (typeof value === "object" && value !== null) {
//         list.push(`${key}=${value.value}`);
//         // list = [...list, `${key}=${value.value}`];
//         // setList([...list, `${key}=${value.value}`]);
//       } else {
//         list.push(`${key}=${value}`);
//         // setList([`${key}=${value}`]);
//       }
//     }
//     return list;
//   }

//   const getData = useCallback(async () => {
//     let urlFilter;
//     if (Object.keys(filters).length > 0) {
//       urlFilter = `http://localhost:3000/api/products?${getValues(filters).join("&")}&page=${page}`;
//     } else {
//       urlFilter = "http://localhost:3000/api/products?sort=بهترین&page=1";
//     }
//     setLoading(true);
//     try {
//       const response = await fetch(urlFilter);
//       if (!response.ok) {
//         throw new Error("ارتباط با سرور دچار مشکل شده است");
//       }

//       const result = await response.json();

//       if (result.length === 0) {
//         setHasMore(false);
//         return;
//       }

//       setVisibleProducts((prev) => [...prev, ...result]);
//       // setPage((prev) => prev + 1);
//     } catch (error) {
//       setIsError("دریافت محصولات با مشکل مواجه شد");
//       setHasMore(false);
//     } finally {
//       setLoading(false);
//     }
//   }, [page]);

//   // useEffect(() => {
//   //   getData();
//   // }, []);

//   const config = {
//     root: null,
//     rootMargin: "20px",
//     threshold: 0.1,
//   };
//   // const observer = new IntersectionObserver((entries) => {
//   //   const entry = entries[0];
//   //   setMyElementVisible(entry.isIntersecting);
//   //   if (entry.isIntersecting && hasMore && !loading) {
//   //     setPage((prev) => prev + 1);
//   //   }
//   // }, config);

//   // useEffect(() => {
//   //   observer.observe(myRef.current);
//   // }, []);

//   const lastPostElementRef = useCallback(
//     (node) => {
//       if (loading) return;

//       if (observer.current) observer.current.disconnect();

//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore && !loading) {
//           setPage((prevPage) => prevPage + 1);
//         }
//       }, config);

//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore],
//   );

//   useEffect(() => {
//     getData();
//   }, [page]);

//   return (
//     <div className={styles["container-filter"]}>
//       {products.length > 0 && (
//         <div className={styles["header-filter"]}>
//           <SortingProductsComponent />
//           {/* <StatsComponent /> */}
//         </div>
//       )}
//       {products.length > 0 && (
//         <div className={styles["side-filter"]}>
//           {/* <ShowFilterComponent /> */}
//           <FilteringProductsComponent />
//           <InventoryFilterComponent />
//         </div>
//       )}
//       <div className={styles["body-filter"]}>
//         {visibleProducts.map((product, index) => (
//           <ProductBox product={product} key={index} />
//         ))}
//         <div ref={lastPostElementRef}>
//           {loading && hasMore ? (
//             <ColorRing
//               visible={true}
//               height="70"
//               width="70"
//               ariaLabel="color-ring-loading"
//               wrapperStyle={{}}
//               wrapperClass="color-ring-wrapper"
//               colors={["#3167f1", "#3167f1", "#3167f1", "#3167f1", "#3167f1"]}
//             />
//           ) : (
//             <h1></h1>
//           )}
//         </div>
//         {isError && <h3>{isError}</h3>}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useCallback, useContext, useEffect, useState } from "react";

// import { ColorRing } from "react-loader-spinner";

// import { FiltersContext } from "../../providers/filters/filters.provider";
// import { ProductsContext } from "../../providers/products/products.provider";
// import InventoryFilterComponent from "../filter-component/Inventory-filter/Inventory-filter.component";
// import FilteringProductsComponent from "../filtering-box/filtering-products.component";
// import ProductBox from "../product-box/Product-Box.component";
// import SkeletonBoxComponent from "../skeleton/skeleton-box.component";
// import SortingProductsComponent from "../sorting-box/sorting-products.component";

// import styles from "./product-List.module.css";

// export default function ProductList() {
//   // const { products } = useContext(ProductsContext);
//   const { filters } = useContext(FiltersContext);

//   const [visibleProducts, setVisibleProducts] = useState([]);

//   const [page, setPage] = useState(1);

//   const [pagination, setPagination] = useState({
//     total: 0,
//     totalPages: 0,
//     hasNextPage: false,
//     hasPreviousPage: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [isError, setIsError] = useState(null);

//   function getValues(obj) {
//     const list = [];

//     for (const [key, value] of Object.entries(obj)) {
//       if (typeof value === "object" && value !== null) {
//         list.push(`${key}=${encodeURIComponent(value.value)}`);
//       } else {
//         list.push(`${key}=${encodeURIComponent(value)}`);
//       }
//     }

//     return list;
//   }

//   const getData = useCallback(
//     async (controller) => {
//       setLoading(true);
//       setIsError(null);

//       try {
//         let query = "";

//         if (Object.keys(filters).length > 0) {
//           query = getValues(filters).join("&");
//         }

//         if (!query) {
//           query = "sort=بهترین";
//         }

//         const url =
//           `http://localhost:3000/api/products?` + `${query}&page=${page}`;

//         const response = await fetch(url, {
//           signal: controller.signal,
//         });

//         if (!response.ok) {
//           throw new Error("دریافت محصولات ناموفق بود");
//         }

//         const result = await response.json();

//         setVisibleProducts(result.products);

//         setPagination(result.pagination);
//       } catch (error) {
//         if (error.name !== "AbortError") {
//           console.error(error);
//           setIsError("دریافت محصولات با مشکل مواجه شد");
//         }
//         setVisibleProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [filters, page],
//   );

//   useEffect(() => {
//     const controller = new AbortController();

//     getData(controller);

//     return () => controller.abort();
//   }, [getData]);

//   useEffect(() => {
//     setPage(1);
//   }, [filters]);

//   const changePage = (newPage) => {
//     if (loading) return;

//     if (newPage < 1) return;

//     if (newPage > pagination.totalPages) {
//       return;
//     }

//     setPage(newPage);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const renderPages = () => {
//     const pages = [];

//     for (let i = 1; i <= pagination.totalPages; i++) {
//       pages.push(
//         <button
//           key={i}
//           type="button"
//           onClick={() => changePage(i)}
//           disabled={loading}
//           className={page === i ? styles.activePage : ""}
//         >
//           {i}
//         </button>,
//       );
//     }

//     return pages;
//   };

//   const skeletons = Array.from({ length: 20 });

//   return (
//     <div className={styles["container-filter"]}>
//       <div className={styles["header-filter"]}>
//         <SortingProductsComponent />
//       </div>
//       <div className={styles["side-filter"]}>
//         <FilteringProductsComponent />
//         <InventoryFilterComponent />
//       </div>
//       <div className={styles["body-filter"]}>
//         {
//           loading ? (
//             <div className={styles["skeleton-container"]}>
//               {skeletons.map((_, index) => (
//                 <div key={index}>
//                   <SkeletonBoxComponent />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             visibleProducts.length > 0 && (
//               <>
//                 <div className={styles["products-grid"]}>
//                   {visibleProducts.map((product) => (
//                     <ProductBox key={product.id} product={product} />
//                   ))}
//                 </div>

//                 {pagination.totalPages > 1 && (
//                   <div className={styles.pagination}>
//                     {/* Previous */}
//                     <button
//                       type="button"
//                       disabled={!pagination.hasPreviousPage || loading}
//                       onClick={() => changePage(page - 1)}
//                     >
//                       قبلی
//                     </button>

//                     {/* Pages */}
//                     {renderPages()}

//                     {/* Next */}
//                     <button
//                       type="button"
//                       disabled={!pagination.hasNextPage || loading}
//                       onClick={() => changePage(page + 1)}
//                     >
//                       بعدی
//                     </button>
//                   </div>
//                 )}
//               </>
//             )
//           )
//           // : (
//           //   <div className={styles.empty}>محصولی پیدا نشد</div>
//           // )
//         }

//         {/* Error */}
//         {isError && <div className={styles.error}>{isError}</div>}
//       </div>
//     </div>
//   );
// }

"use client";

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { enTofaNum } from "@/utils/Utilities";

import { FiltersContext } from "../../providers/filters/filters.provider";
import InventoryFilterComponent from "../filter-component/Inventory-filter/Inventory-filter.component";
import FilteringProductsComponent from "../filtering-box/filtering-products.component";
import ProductBox from "../product-box/Product-Box.component";
import SkeletonBoxComponent from "../skeleton/skeleton-box.component";
import SortingProductsComponent from "../sorting-box/sorting-products.component";

import styles from "./product-List.module.css";

export default function ProductList() {
  const { filters } = useContext(FiltersContext);

  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  // ساخت query پایدار از فیلترها
  const query = useMemo(() => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
      const filterValue =
        typeof value === "object" && value !== null ? value.value : value;

      if (filterValue !== undefined && filterValue !== null) {
        params.set(key, String(filterValue));
      }
    }

    if (params.size === 0) {
      params.set("sort", "بهترین");
    }

    return params.toString();
  }, [filters]);

  // آخرین query مشاهده‌شده
  const previousQuery = useRef(query);

  // محافظت در برابر پاسخ‌های قدیمی
  const requestId = useRef(0);

  // const getData = useCallback(
  //   async (signal, currentRequestId) => {
  //     setLoading(true);
  //     setIsError(null);

  //     try {
  //       // const url = `http://localhost:3000/api/products?${query}&page=${page}`;
  //       const url = `/api/products?${query}&page=${page}`;
  //       // const response = await fetch(url, { signal });
  //       const response = await fetch(url, {
  //         signal,
  //         cache: "no-store",
  //       });

  //       if (!response.ok) {
  //         throw new Error("دریافت محصولات ناموفق بود");
  //       }

  //       const result = await response.json();

  //       // فقط آخرین درخواست اجازه تغییر state دارد
  //       if (signal.aborted || currentRequestId !== requestId.current) {
  //         return;
  //       }

  //       if (!Array.isArray(result.products) || !result.pagination) {
  //         throw new Error("ساختار پاسخ سرور معتبر نیست");
  //       }

  //       setVisibleProducts(result.products);
  //       setPagination(result.pagination);
  //     } catch (error) {
  //       if (
  //         error.name === "AbortError" ||
  //         signal.aborted ||
  //         currentRequestId !== requestId.current
  //       ) {
  //         return;
  //       }

  //       console.error("Products API Error:", error);

  //       setIsError("دریافت محصولات با مشکل مواجه شد");
  //       setVisibleProducts([]);
  //     } finally {
  //       // درخواست قدیمی نباید Loading درخواست جدید را تغییر دهد
  //       if (!signal.aborted && currentRequestId === requestId.current) {
  //         setLoading(false);
  //       }
  //     }
  //   },
  //   [query, page],
  // );

  const getData = useCallback(
    async (signal, currentRequestId) => {
      setLoading(true);
      setIsError(null);

      try {
        const url = `/api/products?${query}&page=${page}`;

        const response = await fetch(url, {
          signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const result = await response.json();

        if (signal.aborted || currentRequestId !== requestId.current) {
          return;
        }

        if (!Array.isArray(result.products) || !result.pagination) {
          throw new Error("Invalid API response structure");
        }

        setVisibleProducts(result.products);
        setPagination(result.pagination);
      } catch (error) {
        // catch (error) {
        //   if (
        //     error.name === "AbortError" ||
        //     signal.aborted ||
        //     currentRequestId !== requestId.current
        //   ) {
        //     return;
        //   }

        //   console.error("Products Fetch Error:", error);

        //   setIsError("دریافت محصولات با مشکل مواجه شد");
        //   setVisibleProducts([]);
        // }

        // }
        // درخواست لغوشده نباید خطا محسوب شود
        if (
          error.name === "AbortError" ||
          signal.aborted ||
          currentRequestId !== requestId.current
        ) {
          return;
        }

        console.log("salam");
        console.error("Products Fetch Error:", error);

        setIsError("دریافت محصولات با مشکل مواجه شد");
        setVisibleProducts([]);
      } finally {
        if (!signal.aborted && currentRequestId === requestId.current) {
          setLoading(false);
        }
      }
    },
    [query, page],
  );
  // useEffect(() => {
  //   // اگر فیلتر عوض شده و صفحه فعلی ۱ نیست،
  //   // ابتدا صفحه را اصلاح کن و درخواست نفرست.
  //   if (previousQuery.current !== query) {
  //     previousQuery.current = query;

  //     if (page !== 1) {
  //       setPage(1);
  //       setLoading(false);
  //       return;
  //     }
  //   }

  //   const controller = new AbortController();
  //   const currentRequestId = ++requestId.current;

  //   getData(controller.signal, currentRequestId);

  //   return () => {
  //     controller.abort();
  //   };
  // }, [query, page, getData]);

  useEffect(() => {
    if (previousQuery.current !== query) {
      previousQuery.current = query;

      if (page !== 1) {
        setPage(1);
        return;
      }
    }

    const controller = new AbortController();
    const currentRequestId = ++requestId.current;

    getData(controller.signal, currentRequestId);

    return () => {
      controller.abort();
    };
  }, [query, page, getData]);

  const changePage = (newPage) => {
    if (loading) return;
    if (newPage < 1) return;
    if (newPage > pagination.totalPages) return;
    if (newPage === page) return;

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const renderPages = () => {
    const pages = [];

    for (let i = 1; i <= pagination.totalPages; i++) {
      pages.push(
        <button
          key={i}
          type="button"
          onClick={() => changePage(i)}
          disabled={loading}
          className={page === i ? styles.activePage : ""}
        >
          {i}
        </button>,
      );
    }

    return pages;
  };

  const skeletons = Array.from({ length: 20 });

  return (
    <div className={styles["container-filter"]}>
      <div className={styles["header-filter"]}>
        <SortingProductsComponent />
        {loading && page === 1 ? (
          <p className={styles.dotted}>...</p>
        ) : (
          <p className={styles["total-product"]}>
            {enTofaNum(pagination.total)} کالا
          </p>
        )}
      </div>

      <div className={styles["side-filter"]}>
        <FilteringProductsComponent />
        <InventoryFilterComponent />
      </div>

      <div className={styles["body-filter"]}>
        {loading ? (
          <div className={styles["skeleton-container"]}>
            {skeletons.map((_, index) => (
              <div key={index}>
                <SkeletonBoxComponent />
              </div>
            ))}
          </div>
        ) : (
          <>
            {
              visibleProducts.length > 0 && (
                <div className={styles["products-grid"]}>
                  {visibleProducts.map((product) => (
                    <ProductBox key={product.id} product={product} />
                  ))}
                </div>
              )
              //  : (
              //   isError && <div className={styles.empty}>محصولی پیدا نشد</div>
              // )
            }

            {pagination.totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  type="button"
                  disabled={!pagination.hasPreviousPage || loading}
                  onClick={() => changePage(page - 1)}
                >
                  قبلی
                </button>

                {renderPages()}

                <button
                  type="button"
                  disabled={!pagination.hasNextPage || loading}
                  onClick={() => changePage(page + 1)}
                >
                  بعدی
                </button>
              </div>
            )}
          </>
        )}

        {isError && <div className={styles.error}>{isError}</div>}
      </div>
    </div>
  );
}
