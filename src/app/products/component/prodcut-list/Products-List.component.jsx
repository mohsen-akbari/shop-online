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
// import SortingProductsComponent from "../sorting-box/sorting-products.component";

// import styles from "./product-List.module.css";

// export default function ProductList() {
//   const { products } = useContext(ProductsContext);
//   const { filters } = useContext(FiltersContext);

//   const [visibleProducts, setVisibleProducts] = useState([]);
//   const [page, setPage] = useState(1);

//   const [loading, setLoading] = useState(false);
//   const [isError, setIsError] = useState(null);

//   const [hasNextPage, setHasNextPage] = useState(true);

//   // --------------------------------------------------
//   // ساخت query string
//   // --------------------------------------------------

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

//   // --------------------------------------------------
//   // دریافت محصولات
//   // --------------------------------------------------

//   const getData = useCallback(async () => {
//     setLoading(true);
//     setIsError(null);

//     try {
//       let query = "";

//       if (Object.keys(filters).length > 0) {
//         query = getValues(filters).join("&");
//       } else {
//         query = "sort=بهترین";
//       }

//       const url =
//         `http://localhost:3000/api/products?` + `${query}&page=${page}`;

//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error("ارتباط با سرور دچار مشکل شده است");
//       }

//       const result = await response.json();

//       // ----------------------------------------------
//       // اگر صفحه خالی بود
//       // ----------------------------------------------

//       if (!Array.isArray(result) || result.length === 0) {
//         setVisibleProducts([]);
//         setHasNextPage(false);
//         return;
//       }

//       // ----------------------------------------------
//       // محصولات همین صفحه
//       // ----------------------------------------------

//       setVisibleProducts(result);

//       // اگر API تعداد محصولات صفحه را کمتر از limit
//       // برگرداند، یعنی صفحه بعدی نداریم.
//       //
//       // مثلاً اگر API در هر صفحه 12 محصول بدهد:
//       //
//       // result.length === 12 -> احتمالاً صفحه بعد هست
//       // result.length < 12   -> صفحه آخر
//       //
//       // عدد 12 را متناسب با API خودت تغییر بده.
//       setHasNextPage(result.length >= 12);
//     } catch (error) {
//       console.error(error);

//       setIsError("دریافت محصولات با مشکل مواجه شد");

//       setVisibleProducts([]);
//       setHasNextPage(false);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters, page]);

//   // --------------------------------------------------
//   // هر بار page یا filter تغییر کرد
//   // فقط لیست محصولات fetch می‌شود
//   // --------------------------------------------------

//   useEffect(() => {
//     getData();
//   }, [getData]);

//   // --------------------------------------------------
//   // تغییر فیلتر
//   // --------------------------------------------------

//   useEffect(() => {
//     setPage(1);
//   }, [filters]);

//   // --------------------------------------------------
//   // Pagination
//   // --------------------------------------------------

//   const handlePageChange = (newPage) => {
//     if (loading) return;

//     if (newPage < 1) return;

//     if (!hasNextPage && newPage > page) return;

//     setPage(newPage);

//     // برگشت به ابتدای لیست
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className={styles["container-filter"]}>
//       {/* -------------------------------------------
//           Header / Sorting
//       -------------------------------------------- */}

//       {products?.length > 0 && (
//         <div className={styles["header-filter"]}>
//           <SortingProductsComponent />
//         </div>
//       )}

//       {/* -------------------------------------------
//           Filters
//       -------------------------------------------- */}

//       {products?.length > 0 && (
//         <div className={styles["side-filter"]}>
//           <FilteringProductsComponent />

//           <InventoryFilterComponent />
//         </div>
//       )}

//       {/* -------------------------------------------
//           Products
//       -------------------------------------------- */}

//       <div className={styles["body-filter"]}>
//         {/* Loading */}
//         {loading ? (
//           <div className={styles.loading}>
//             <ColorRing
//               visible={true}
//               height="70"
//               width="70"
//               ariaLabel="color-ring-loading"
//               wrapperClass="color-ring-wrapper"
//               colors={["#3167f1", "#3167f1", "#3167f1", "#3167f1", "#3167f1"]}
//             />
//           </div>
//         ) : visibleProducts.length > 0 ? (
//           <>
//             {/* Products */}
//             <div className={styles["products-grid"]}>
//               {visibleProducts.map((product) => (
//                 <ProductBox product={product} key={product.id} />
//               ))}
//             </div>

//             {/* ---------------------------------------
//                 Pagination
//             ---------------------------------------- */}

//             <div className={styles.pagination}>
//               {/* Previous */}
//               <button
//                 type="button"
//                 disabled={page === 1 || loading}
//                 onClick={() => handlePageChange(page - 1)}
//                 className={page === 1 ? styles.disabled : ""}
//               >
//                 قبلی
//               </button>

//               {/* Current page */}
//               <button type="button" className={styles.activePage}>
//                 {page}
//               </button>

//               {/* Next */}
//               <button
//                 type="button"
//                 disabled={!hasNextPage || loading}
//                 onClick={() => handlePageChange(page + 1)}
//                 className={!hasNextPage ? styles.disabled : ""}
//               >
//                 بعدی
//               </button>
//             </div>
//           </>
//         ) : (
//           !loading && <div className={styles.empty}>محصولی پیدا نشد</div>
//         )}

//         {/* Error */}
//         {isError && <div className={styles.error}>{isError}</div>}
//       </div>
//     </div>
//   );
// }

"use client";

import { useCallback, useContext, useEffect, useState } from "react";

import { ColorRing } from "react-loader-spinner";

import { FiltersContext } from "../../providers/filters/filters.provider";
import { ProductsContext } from "../../providers/products/products.provider";
import InventoryFilterComponent from "../filter-component/Inventory-filter/Inventory-filter.component";
import FilteringProductsComponent from "../filtering-box/filtering-products.component";
import ProductBox from "../product-box/Product-Box.component";
import SortingProductsComponent from "../sorting-box/sorting-products.component";

import styles from "./product-List.module.css";

export default function ProductList() {
  // const { products } = useContext(ProductsContext);
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

  function getValues(obj) {
    const list = [];

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null) {
        list.push(`${key}=${encodeURIComponent(value.value)}`);
      } else {
        list.push(`${key}=${encodeURIComponent(value)}`);
      }
    }

    return list;
  }

  const getData = useCallback(async () => {
    setLoading(true);
    setIsError(null);

    try {
      let query = "";

      if (Object.keys(filters).length > 0) {
        query = getValues(filters).join("&");
      }

      if (!query) {
        query = "sort=بهترین";
      }

      const url =
        `http://localhost:3000/api/products?` + `${query}&page=${page}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("دریافت محصولات ناموفق بود");
      }

      const result = await response.json();

      setVisibleProducts(result.products);

      setPagination(result.pagination);
    } catch (error) {
      console.error(error);

      setIsError("دریافت محصولات با مشکل مواجه شد");

      setVisibleProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const changePage = (newPage) => {
    if (loading) return;

    if (newPage < 1) return;

    if (newPage > pagination.totalPages) {
      return;
    }

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

  return (
    <div className={styles["container-filter"]}>
      <div className={styles["header-filter"]}>
        <SortingProductsComponent />
      </div>
      {/* )} */}

      <div className={styles["side-filter"]}>
        <FilteringProductsComponent />

        <InventoryFilterComponent />
      </div>
      {/* )} */}

      <div className={styles["body-filter"]}>
        {
          loading ? (
            // Loading
            <div className={styles.loading}>
              <ColorRing
                visible={true}
                height="70"
                width="70"
                ariaLabel="color-ring-loading"
                wrapperClass="color-ring-wrapper"
                colors={["#3167f1", "#3167f1", "#3167f1", "#3167f1", "#3167f1"]}
              />
            </div>
          ) : (
            visibleProducts.length > 0 && (
              <>
                <div className={styles["products-grid"]}>
                  {visibleProducts.map((product) => (
                    <ProductBox key={product.id} product={product} />
                  ))}
                </div>

                {pagination.totalPages > 1 && (
                  <div className={styles.pagination}>
                    {/* Previous */}
                    <button
                      type="button"
                      disabled={!pagination.hasPreviousPage || loading}
                      onClick={() => changePage(page - 1)}
                    >
                      قبلی
                    </button>

                    {/* Pages */}
                    {renderPages()}

                    {/* Next */}
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
            )
          )
          // : (
          //   <div className={styles.empty}>محصولی پیدا نشد</div>
          // )
        }

        {/* Error */}
        {isError && <div className={styles.error}>{isError}</div>}
      </div>
    </div>
  );
}
